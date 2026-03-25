import * as cheerio from "cheerio";

export async function getCoupangProductCount(
  keyword: string
): Promise<number | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const url = `https://www.coupang.com/np/search?component=&q=${encodeURIComponent(keyword)}&channel=user`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`쿠팡 스크래핑 에러: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 검색 결과 총 상품 수 추출 시도
    const totalCountText = $(".search-result-count .total-count, .search-count .count, #productCount").text();
    const match = totalCountText.replace(/,/g, "").match(/(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }

    // fallback: 상품 리스트 아이템 수로 추정
    const productItems = $(".search-product, li.search-product, .baby-product").length;
    if (productItems > 0) {
      return productItems;
    }

    return null;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error("쿠팡 스크래핑 타임아웃");
    }
    return null;
  }
}
