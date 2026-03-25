import { getShoppingProductCount } from "./naver-api";

export interface StoreProduct {
  title: string;
  link: string;
}

export interface StoreAnalysis {
  storeId: string;
  storeName: string;
  totalProducts: number;
  recentProducts: StoreProduct[];
  searchVisibility: number;
  level: number;
  levelLabel: string;
  tips: string[];
}

export function parseStoreId(input: string): string | null {
  const trimmed = input.trim();

  // smartstore.naver.com/storeId 형식
  const urlMatch = trimmed.match(/smartstore\.naver\.com\/([a-zA-Z0-9_-]+)/);
  if (urlMatch) return urlMatch[1];

  // brand.naver.com/storeId 형식
  const brandMatch = trimmed.match(/brand\.naver\.com\/([a-zA-Z0-9_-]+)/);
  if (brandMatch) return brandMatch[1];

  // storeId만 입력
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed) && trimmed.length >= 2) {
    return trimmed;
  }

  return null;
}

export async function fetchStoreInfo(storeId: string): Promise<{
  storeName: string;
  products: StoreProduct[];
} | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    // 스마트스토어 페이지에서 상품 목록 가져오기
    const response = await fetch(
      `https://smartstore.naver.com/${storeId}/category/ALL?st=RECENT&free=false&dt=LIST&page=1&size=40`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const html = await response.text();

    // 스토어 이름 추출
    const nameMatch = html.match(/<title>(.*?)[\s|<]/);
    const storeName = nameMatch ? nameMatch[1].replace(/ : 네이버.*$/, "").trim() : storeId;

    // 상품 수 추출 시도
    const products: StoreProduct[] = [];
    const productRegex = /"name":"(.*?)"/g;
    const linkRegex = /"linkUrl":"(.*?)"/g;

    const names: string[] = [];
    const links: string[] = [];
    let match;

    while ((match = productRegex.exec(html)) !== null) {
      names.push(match[1]);
    }
    while ((match = linkRegex.exec(html)) !== null) {
      links.push(match[1]);
    }

    for (let i = 0; i < Math.min(names.length, 20); i++) {
      products.push({
        title: names[i],
        link: links[i] || `https://smartstore.naver.com/${storeId}`,
      });
    }

    return { storeName, products };
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

export async function checkStoreSearchVisibility(
  storeId: string,
  products: StoreProduct[]
): Promise<number> {
  if (products.length === 0) return 0;

  const checkProducts = products.slice(0, 5);
  let visibleCount = 0;

  for (const product of checkProducts) {
    try {
      const count = await getShoppingProductCount(
        `${product.title.slice(0, 20)} ${storeId}`
      );
      if (count !== null && count > 0) {
        visibleCount++;
      }
    } catch {
      // 무시
    }
  }

  return Math.round((visibleCount / checkProducts.length) * 100);
}

export function calculateStoreLevel(
  totalProducts: number,
  searchVisibility: number
): { level: number; label: string; tips: string[] } {
  let score = 0;
  const tips: string[] = [];

  // 총 상품 수 (최대 50점)
  if (totalProducts >= 200) score += 50;
  else if (totalProducts >= 100) score += 40;
  else if (totalProducts >= 50) score += 30;
  else if (totalProducts >= 20) score += 20;
  else if (totalProducts >= 10) score += 12;
  else if (totalProducts >= 5) score += 7;
  else {
    score += 2;
    tips.push("상품 수를 늘려보세요. 카테고리별 다양한 상품 구성이 중요합니다.");
  }

  // 검색 노출률 (최대 50점)
  if (searchVisibility >= 80) score += 50;
  else if (searchVisibility >= 60) score += 40;
  else if (searchVisibility >= 40) score += 30;
  else if (searchVisibility >= 20) score += 20;
  else {
    score += 5;
    tips.push("상품명에 검색 키워드를 포함시켜 검색 노출을 개선해보세요.");
  }

  if (tips.length === 0) {
    tips.push("스토어 지수가 우수합니다. 리뷰 관리와 고객 응대에 집중해보세요!");
    tips.push("시즌 키워드와 트렌드 상품을 활용하면 매출 성장에 효과적입니다.");
  }

  const level = Math.min(10, Math.floor(score / 10));

  const labels = [
    "입문 셀러",
    "초보 셀러",
    "성장 셀러",
    "활동 셀러",
    "우수 셀러",
    "인기 셀러",
    "파워 셀러",
    "상위 셀러",
    "최상위 셀러",
    "탑 셀러",
    "마스터 셀러",
  ];

  return { level, label: labels[level], tips };
}
