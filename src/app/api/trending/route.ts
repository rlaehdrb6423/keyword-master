import { NextResponse } from "next/server";

interface TrendingItem {
  rank: number;
  keyword: string;
  traffic: string;
}

export const revalidate = 600; // 10분 캐시

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      "https://trends.google.co.kr/trending/rss?geo=KR",
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ items: [] });
    }

    const xml = await response.text();

    // <item> 블록 추출
    const items: TrendingItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch;
    let rank = 0;

    while ((itemMatch = itemRegex.exec(xml)) !== null && rank < 20) {
      const block = itemMatch[1];

      // title 추출 (CDATA 또는 일반 텍스트)
      const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
      // traffic 추출
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

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
