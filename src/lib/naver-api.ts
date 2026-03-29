import crypto from "crypto";
import type { KeywordVolume } from "@/types/keyword";

// ===== 네이버 검색광고 API (검색량 조회) =====

function generateSignature(
  timestamp: number,
  method: string,
  uri: string
): string {
  const message = `${timestamp}.${method}.${uri}`;
  const hmac = crypto.createHmac("sha256", process.env.NAVER_AD_SECRET_KEY!);
  hmac.update(message);
  return hmac.digest("base64");
}

interface RelKwdStatItem {
  relKeyword: string;
  monthlyPcQcCnt: number | string;
  monthlyMobileQcCnt: number | string;
  compIdx: string;
  monthlyAvePcClkCnt: number;
  monthlyAveMobileClkCnt: number;
  monthlyAvePcCtr: number;
  monthlyAveMobileCtr: number;
  plAvgDepth: number;
}

function parseVolume(val: number | string): number {
  if (typeof val === "string") {
    if (val === "< 10") return 5;
    return parseInt(val, 10) || 0;
  }
  return val || 0;
}

export async function getSearchVolume(
  keyword: string
): Promise<KeywordVolume | null> {
  const timestamp = Date.now();
  const method = "GET";
  const uri = "/keywordstool";
  const signature = generateSignature(timestamp, method, uri);

  const cleanKeyword = keyword.replace(/\s+/g, "");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://api.naver.com/keywordstool?hintKeywords=${encodeURIComponent(cleanKeyword)}&showDetail=1`,
      {
        method: "GET",
        headers: {
          "X-Timestamp": timestamp.toString(),
          "X-API-KEY": process.env.NAVER_AD_API_KEY!,
          "X-Customer": process.env.NAVER_AD_CUSTOMER_ID!,
          "X-Signature": signature,
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`네이버 검색광고 API 에러: status=${response.status}`);
      return null;
    }

    const data = await response.json();
    const items: RelKwdStatItem[] = data.keywordList || [];

    if (items.length === 0) {
      console.error(`네이버 검색광고 API 결과 없음: keyword="${keyword.slice(0, 20)}", itemCount=${items.length}`);
      return null;
    }

    // 첫 번째 항목이 입력 키워드 자체
    const main = items[0];
    const relatedKeywords = items
      .slice(1, 16)
      .map((item) => item.relKeyword);

    return {
      keyword: main.relKeyword,
      pcVolume: parseVolume(main.monthlyPcQcCnt),
      mobileVolume: parseVolume(main.monthlyMobileQcCnt),
      relatedKeywords,
      compIdx: main.compIdx || "정보없음",
      avgClickCnt: (main.monthlyAvePcClkCnt || 0) + (main.monthlyAveMobileClkCnt || 0),
      avgCtr: Math.round(((main.monthlyAvePcCtr || 0) + (main.monthlyAveMobileCtr || 0)) / 2 * 100) / 100,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error("네이버 검색광고 API 타임아웃");
    }
    return null;
  }
}

// ===== 네이버 검색 API (문서수 조회) =====

interface NaverSearchResponse {
  total: number;
}

async function naverSearchCount(
  query: string,
  type: "blog" | "shop" | "news" | "cafearticle" | "webkr"
): Promise<number | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/${type}?query=${encodeURIComponent(query)}&display=1`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`네이버 검색 API(${type}) 에러: ${response.status}`);
      return null;
    }

    const data: NaverSearchResponse = await response.json();
    return data.total;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`네이버 검색 API(${type}) 타임아웃`);
    }
    return null;
  }
}

export async function getBlogDocCount(keyword: string): Promise<number | null> {
  return naverSearchCount(keyword, "blog");
}

export async function getNewsCount(keyword: string): Promise<number | null> {
  return naverSearchCount(keyword, "news");
}

export async function getCafeCount(keyword: string): Promise<number | null> {
  return naverSearchCount(keyword, "cafearticle");
}

export async function getWebDocCount(keyword: string): Promise<number | null> {
  return naverSearchCount(keyword, "webkr");
}

export async function getShoppingProductCount(
  keyword: string
): Promise<number | null> {
  return naverSearchCount(keyword, "shop");
}

// ===== 쇼핑 검색에서 관련 키워드 추출 =====

export async function getShoppingRelatedKeywords(keyword: string): Promise<string[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/shop?query=${encodeURIComponent(keyword)}&display=20&sort=sim`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) return [];

    const data = await response.json();
    const items: { title: string }[] = data.items || [];

    if (items.length === 0) return [];

    // 상품 제목에서 HTML 태그 제거 후 단어 추출
    const wordCount = new Map<string, number>();
    const cleanKeyword = keyword.replace(/\s+/g, "").toLowerCase();

    for (const item of items) {
      const title = item.title.replace(/<[^>]*>/g, "").replace(/[^\w가-힣\s]/g, " ");
      // 2글자 이상 한글 단어만 추출
      const words = title.match(/[가-힣]{2,}/g) || [];
      for (const word of words) {
        if (word.toLowerCase() === cleanKeyword) continue;
        if (word.length < 2 || word.length > 10) continue;
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    }

    // 2회 이상 등장한 단어를 빈도순 정렬, 조합 키워드 생성
    const frequent = Array.from(wordCount.entries())
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word);

    // 자주 등장하는 단어들을 키워드로 조합
    const related = new Set<string>();
    for (const word of frequent.slice(0, 10)) {
      related.add(word);
      // 원래 키워드의 핵심 단어와 조합
      if (keyword.length <= 5) {
        related.add(`${word} ${keyword}`);
      }
    }

    return Array.from(related).slice(0, 15);
  } catch {
    clearTimeout(timeoutId);
    return [];
  }
}

// ===== 블로그 플랫폼별 노출 현황 =====

export interface PlatformCount {
  naver: number;
  tistory: number;
  wordpress: number;
  other: number;
}

export async function getBlogPlatformCount(keyword: string): Promise<PlatformCount> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(keyword)}&display=20&sort=sim`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) return { naver: 0, tistory: 0, wordpress: 0, other: 0 };

    const data = await response.json();
    const items: { link: string; bloggerlink: string }[] = data.items || [];

    let naver = 0, tistory = 0, wordpress = 0, other = 0;

    for (const item of items) {
      const link = (item.link || item.bloggerlink || "").toLowerCase();
      if (link.includes("blog.naver.com")) naver++;
      else if (link.includes("tistory.com")) tistory++;
      else if (link.includes("wordpress.com") || link.includes("/wp-content/") || link.includes("wp-json")) wordpress++;
      else other++;
    }

    return { naver, tistory, wordpress: wordpress + other, other: 0 };
  } catch {
    clearTimeout(timeoutId);
    return { naver: 0, tistory: 0, wordpress: 0, other: 0 };
  }
}
