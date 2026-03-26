import { NextResponse } from "next/server";

interface TrendingItem {
  rank: number;
  keyword: string;
  traffic: string;
}

export const revalidate = 600; // 10분 캐시

async function fetchGoogleTrends(): Promise<TrendingItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      "https://trends.google.co.kr/trending/rss?geo=KR",
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) return [];

    const xml = await response.text();
    const items: TrendingItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch;
    let rank = 0;

    while ((itemMatch = itemRegex.exec(xml)) !== null && rank < 20) {
      const block = itemMatch[1];
      const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
      const trafficMatch = block.match(/<ht:approx_traffic>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/ht:approx_traffic>/);

      if (titleMatch && titleMatch[1]) {
        rank++;
        items.push({
          rank,
          keyword: titleMatch[1].trim(),
          traffic: trafficMatch ? trafficMatch[1].trim() : "",
        });
      }
    }

    return items;
  } catch {
    return [];
  }
}

async function fetchNaverTrends(): Promise<TrendingItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      "https://openapi.naver.com/v1/search/blog?query=오늘&display=20&sort=date",
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

    // 네이버 DataLab 쇼핑인사이트 대신 네이버 검색어 트렌드 사용
    // 네이버 공식 실시간 검색어 API가 없으므로 signal.bz 활용
    const signalRes = await fetch("https://www.signal.bz/news", {
      signal: controller.signal,
    });

    if (!signalRes.ok) return [];

    const html = await signalRes.text();
    const items: TrendingItem[] = [];

    // signal.bz에서 실시간 검색어 파싱
    const keywordRegex = /<span class="rank-text">\s*(.*?)\s*<\/span>/g;
    let match;
    let rank = 0;

    while ((match = keywordRegex.exec(html)) !== null && rank < 20) {
      rank++;
      items.push({
        rank,
        keyword: match[1].trim().replace(/<[^>]*>/g, ""),
        traffic: "",
      });
    }

    return items;
  } catch {
    return [];
  }
}

export async function GET() {
  const [google, naver] = await Promise.all([
    fetchGoogleTrends(),
    fetchNaverTrends(),
  ]);

  return NextResponse.json({ google, naver });
}
