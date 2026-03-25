import { NextResponse } from "next/server";
import {
  parseStoreId,
  fetchStoreInfo,
  checkStoreSearchVisibility,
  calculateStoreLevel,
} from "@/lib/store-analyzer";
import { getSearchVolume } from "@/lib/naver-api";
import type { ApiErrorResponse } from "@/types/keyword";

// 상품명 SEO 분석
async function analyzeProductSEO(
  products: { title: string }[]
): Promise<{ title: string; seoScore: number; seoTips: string[] }[]> {
  const results = [];
  const checkProducts = products.slice(0, 10);

  for (const product of checkProducts) {
    let score = 0;
    const tips: string[] = [];
    const title = product.title;

    // 1. 상품명 길이 (20~50자 적정)
    if (title.length >= 20 && title.length <= 50) {
      score += 30;
    } else if (title.length >= 10 && title.length <= 60) {
      score += 20;
      tips.push("상품명은 20~50자가 검색 노출에 유리합니다.");
    } else {
      score += 5;
      tips.push("상품명이 너무 짧거나 깁니다. 20~50자로 조정하세요.");
    }

    // 2. 특수문자 남용 체크
    const specialChars = title.replace(/[\wㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");
    if (specialChars.length <= 3) {
      score += 20;
    } else {
      score += 5;
      tips.push("특수문자를 줄이면 검색 노출이 개선됩니다.");
    }

    // 3. 키워드 구성 (단어 수)
    const words = title.split(/\s+/).filter((w) => w.length >= 2);
    if (words.length >= 3 && words.length <= 8) {
      score += 20;
    } else if (words.length >= 2) {
      score += 10;
      tips.push("핵심 키워드 3~8개를 포함한 상품명이 효과적입니다.");
    } else {
      score += 5;
      tips.push("키워드가 부족합니다. 검색어를 더 포함시키세요.");
    }

    // 4. 검색량 확인 (상위 3개만)
    if (results.length < 3 && words.length > 0) {
      try {
        const vol = await getSearchVolume(words[0]);
        if (vol && (vol.pcVolume + vol.mobileVolume) > 100) {
          score += 30;
        } else if (vol && (vol.pcVolume + vol.mobileVolume) > 10) {
          score += 15;
          tips.push("메인 키워드의 검색량이 적습니다. 인기 키워드를 활용해보세요.");
        } else {
          score += 5;
          tips.push("검색량이 거의 없는 키워드입니다. 키워드를 변경해보세요.");
        }
      } catch {
        score += 10;
      }
    } else {
      score += 10;
    }

    if (tips.length === 0) tips.push("SEO 최적화가 잘 되어있습니다!");

    results.push({
      title,
      seoScore: Math.min(100, score),
      seoTips: tips,
    });
  }

  return results;
}

export async function POST(request: Request) {
  let body: { storeId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "잘못된 요청 형식입니다.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const rawInput = body.storeId?.trim();
  if (!rawInput) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "스토어 ID 또는 URL을 입력해주세요.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const storeId = parseStoreId(rawInput);
  if (!storeId) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "올바른 스토어 ID 형식이 아닙니다. (예: storeId 또는 smartstore.naver.com/storeId)", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const storeData = await fetchStoreInfo(storeId);
  if (!storeData) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "스토어를 찾을 수 없습니다. ID를 확인해주세요.", code: "INVALID_INPUT" },
      { status: 404 }
    );
  }

  const { storeName, products } = storeData;
  const totalProducts = products.length;

  const searchVisibility = await checkStoreSearchVisibility(storeId, products);
  const { level, label, tips } = calculateStoreLevel(totalProducts, searchVisibility);

  // 상품명 SEO 분석
  const productSEO = await analyzeProductSEO(products);

  // 평균 SEO 점수
  const avgSeoScore = productSEO.length > 0
    ? Math.round(productSEO.reduce((sum, p) => sum + p.seoScore, 0) / productSEO.length)
    : 0;

  return NextResponse.json({
    storeId,
    storeName,
    totalProducts,
    recentProducts: products.slice(0, 10).map((p, i) => ({
      title: p.title,
      link: p.link,
      seoScore: productSEO[i]?.seoScore ?? 0,
      seoTips: productSEO[i]?.seoTips ?? [],
    })),
    searchVisibility,
    avgSeoScore,
    level,
    levelLabel: label,
    tips,
  });
}
