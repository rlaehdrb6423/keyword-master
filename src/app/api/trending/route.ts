import { NextResponse } from "next/server";

interface TrendingItem {
  rank: number;
  keyword: string;
  traffic: string;
}

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      "https://trends.google.co.kr/trending/rss?geo=KR",
      { signal: controller.signal, next: { revalidate: 600 } }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ items: [] });
    }

    const xml = await response.text();

    // XML에서 트렌딩 키워드 추출
    const items: TrendingItem[] = [];
    const titleRegex = /<title><!\[CDATA\[(.+?)\]\]><\/title>/g;
    const trafficRegex = /<ht:approx_traffic><!\[CDATA\[(.+?)\]\]><\/ht:approx_traffic>/g;

    const titles: string[] = [];
    const traffics: string[] = [];

    let match;
    while ((match = titleRegex.exec(xml)) !== null) {
      titles.push(match[1]);
    }
    while ((match = trafficRegex.exec(xml)) !== null) {
      traffics.push(match[1]);
    }

    // 첫 번째 title은 피드 제목이므로 skip
    for (let i = 1; i < titles.length && i <= 20; i++) {
      items.push({
        rank: i,
        keyword: titles[i],
        traffic: traffics[i - 1] || "",
      });
    }

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
