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

    const response = await fetch("https://api.signal.bz/news/realtime", {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (!response.ok) return [];

    const data = await response.json();
    const top10: { rank: number; keyword: string }[] = data.top10 || [];

    return top10.map((item) => ({
      rank: item.rank,
      keyword: item.keyword,
      traffic: "",
    }));
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
