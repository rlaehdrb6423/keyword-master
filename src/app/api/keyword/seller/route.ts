import { NextResponse } from "next/server";
import { getSearchVolume, getShoppingProductCount, getBlogDocCount, getNewsCount, getCafeCount } from "@/lib/naver-api";
import { calculateSellerIndex } from "@/lib/index-calculator";
import { getCached, setCache, makeCacheKey } from "@/lib/cache";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import type { SellerKeywordResult, ApiErrorResponse } from "@/types/keyword";

function calculateSuccessRate(totalVolume: number, totalCompetition: number, grade: string): number {
  if (totalCompetition === 0) return 95;
  const ratio = totalVolume / totalCompetition;

  let base = 0;
  if (ratio >= 30) base = 85;
  else if (ratio >= 10) base = 65;
  else if (ratio >= 3) base = 40;
  else base = 15;

  if (totalVolume >= 100 && totalVolume <= 5000) base += 10;
  else if (totalVolume > 5000) base += 5;

  return Math.min(99, Math.max(5, base));
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { success } = await checkRateLimit(ip);
  if (!success) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.", code: "API_LIMIT" },
      { status: 429 }
    );
  }

  let body: { keyword?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "잘못된 요청 형식입니다.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const keyword = body.keyword?.trim();
  if (!keyword) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "키워드를 입력해주세요.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const cacheKey = makeCacheKey("seller2", keyword);
  const cached = await getCached<SellerKeywordResult>(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // 네이버 API 병렬 호출 (채널별 경쟁도 포함)
  const [volumeData, naverProductCount, blogCount, newsCount, cafeCount] = await Promise.all([
    getSearchVolume(keyword),
    getShoppingProductCount(keyword),
    getBlogDocCount(keyword),
    getNewsCount(keyword),
    getCafeCount(keyword),
  ]);

  if (!volumeData) {
    return NextResponse.json<ApiErrorResponse>(
      { error: `"${keyword}"의 검색량 데이터가 없습니다. 검색량이 너무 적거나 등록되지 않은 키워드입니다. 다른 키워드를 시도해주세요.`, code: "NO_DATA" },
      { status: 404 }
    );
  }

  const totalVolume = volumeData.pcVolume + volumeData.mobileVolume;
  const naverCount = naverProductCount ?? 0;
  const blog = blogCount ?? 0;
  const news = newsCount ?? 0;
  const cafe = cafeCount ?? 0;
  const naverRatio = naverCount > 0 ? totalVolume / naverCount : 0;

  const indexResult = calculateSellerIndex(totalVolume, naverCount);

  // 종합 경쟁도 (쇼핑 상품 + 블로그 + 뉴스 + 카페)
  const totalCompetition = naverCount + blog + news + cafe;
  let competitionGrade: string;
  let competitionLabel: string;
  if (totalCompetition === 0) {
    competitionGrade = "A";
    competitionLabel = "경쟁 없음";
  } else {
    const compRatio = totalVolume / totalCompetition;
    if (compRatio >= 30) { competitionGrade = "A"; competitionLabel = "매우 낮음"; }
    else if (compRatio >= 10) { competitionGrade = "B"; competitionLabel = "낮음"; }
    else if (compRatio >= 3) { competitionGrade = "C"; competitionLabel = "보통"; }
    else { competitionGrade = "D"; competitionLabel = "높음"; }
  }

  const result: SellerKeywordResult = {
    keyword: volumeData.keyword,
    pcVolume: volumeData.pcVolume,
    mobileVolume: volumeData.mobileVolume,
    totalVolume,
    naverProductCount: naverCount,
    blogCount: blog,
    newsCount: news,
    cafeCount: cafe,
    totalCompetition,
    competitionGrade,
    competitionLabel,
    naverRatio: Math.round(naverRatio * 100) / 100,
    grade: indexResult.grade,
    gradeLabel: indexResult.label,
    relatedKeywords: volumeData.relatedKeywords,
    successRate: calculateSuccessRate(totalVolume, totalCompetition, competitionGrade),
  };

  await setCache(cacheKey, result, false);

  // 카운터 증가 (실패 무시)
  try {
    const { Redis } = await import("@upstash/redis");
    const counterRedis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
    await counterRedis.incr("kv:analysis-count");
  } catch {}

  return NextResponse.json(result);
}
