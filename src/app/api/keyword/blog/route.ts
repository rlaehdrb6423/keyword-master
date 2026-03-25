import { NextResponse } from "next/server";
import { getSearchVolume, getBlogDocCount, getNewsCount, getCafeCount, getWebDocCount } from "@/lib/naver-api";
import { calculateBlogIndex } from "@/lib/index-calculator";
import { getCached, setCache, makeCacheKey } from "@/lib/cache";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import type { BlogKeywordResult, ApiErrorResponse } from "@/types/keyword";

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

  // 캐시 확인
  const cacheKey = makeCacheKey("blog2", keyword);
  const cached = await getCached<BlogKeywordResult>(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // 네이버 API 병렬 호출 (채널별 경쟁도 포함)
  const [volumeData, blogDocCount, newsCount, cafeCount, webDocCount] = await Promise.all([
    getSearchVolume(keyword),
    getBlogDocCount(keyword),
    getNewsCount(keyword),
    getCafeCount(keyword),
    getWebDocCount(keyword),
  ]);

  if (!volumeData) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "검색량 데이터를 가져올 수 없습니다. 잠시 후 다시 시도해주세요.", code: "TIMEOUT" },
      { status: 503 }
    );
  }

  const totalVolume = volumeData.pcVolume + volumeData.mobileVolume;
  const docCount = blogDocCount ?? 0;
  const news = newsCount ?? 0;
  const cafe = cafeCount ?? 0;
  const webDoc = webDocCount ?? 0;

  const ratio = docCount > 0 ? totalVolume / docCount : 0;
  const indexResult = calculateBlogIndex(totalVolume, docCount);

  // 종합 경쟁도 계산
  const totalCompetition = docCount + news + cafe + webDoc;
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

  const result: BlogKeywordResult = {
    keyword: volumeData.keyword,
    pcVolume: volumeData.pcVolume,
    mobileVolume: volumeData.mobileVolume,
    totalVolume,
    blogDocCount: docCount,
    newsCount: news,
    cafeCount: cafe,
    webDocCount: webDoc,
    totalCompetition,
    competitionGrade,
    competitionLabel,
    ratio: Math.round(ratio * 100) / 100,
    grade: indexResult.grade,
    gradeLabel: indexResult.label,
    relatedKeywords: volumeData.relatedKeywords,
  };

  await setCache(cacheKey, result);

  return NextResponse.json(result);
}
