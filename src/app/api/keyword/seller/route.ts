import { NextResponse } from "next/server";
import { getSearchVolume, getShoppingProductCount } from "@/lib/naver-api";
import { calculateSellerIndex } from "@/lib/index-calculator";
import { getCached, setCache, makeCacheKey } from "@/lib/cache";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import type { SellerKeywordResult, ApiErrorResponse } from "@/types/keyword";

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
  const cacheKey = makeCacheKey("seller", keyword);
  const cached = await getCached<SellerKeywordResult>(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // 네이버 API 병렬 호출
  const [volumeData, naverProductCount] = await Promise.all([
    getSearchVolume(keyword),
    getShoppingProductCount(keyword),
  ]);

  if (!volumeData) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "검색량 데이터를 가져올 수 없습니다. 잠시 후 다시 시도해주세요.", code: "TIMEOUT" },
      { status: 503 }
    );
  }

  const totalVolume = volumeData.pcVolume + volumeData.mobileVolume;
  const naverCount = naverProductCount ?? 0;
  const naverRatio = naverCount > 0 ? totalVolume / naverCount : 0;

  const indexResult = calculateSellerIndex(totalVolume, naverCount);

  const result: SellerKeywordResult = {
    keyword: volumeData.keyword,
    pcVolume: volumeData.pcVolume,
    mobileVolume: volumeData.mobileVolume,
    totalVolume,
    naverProductCount: naverCount,
    naverRatio: Math.round(naverRatio * 100) / 100,
    grade: indexResult.grade,
    gradeLabel: indexResult.label,
  };

  await setCache(cacheKey, result, false);

  return NextResponse.json(result);
}
