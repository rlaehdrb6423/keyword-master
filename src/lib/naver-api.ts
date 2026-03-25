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

  const params = new URLSearchParams({
    hintKeywords: keyword,
    showDetail: "1",
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(
      `https://api.naver.com/keywordstool?${params}`,
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
      console.error(`네이버 검색광고 API 에러: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const items: RelKwdStatItem[] = data.keywordList || [];

    if (items.length === 0) return null;

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
  type: "blog" | "shop"
): Promise<number | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

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

export async function getShoppingProductCount(
  keyword: string
): Promise<number | null> {
  return naverSearchCount(keyword, "shop");
}
