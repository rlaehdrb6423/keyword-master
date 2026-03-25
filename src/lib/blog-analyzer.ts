import { getBlogDocCount } from "./naver-api";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export interface BlogAnalysis {
  blogId: string;
  blogTitle: string;
  totalPosts: number;
  recentPosts: BlogPost[];
  postingFrequency: number; // 최근 30일 포스팅 수
  avgPostLength: number;
  searchVisibility: number; // 검색 노출 비율 (0~100)
  level: number; // 0~10
  levelLabel: string;
  tips: string[];
}

export function parseBlogId(input: string): string | null {
  const trimmed = input.trim();

  // blog.naver.com/blogId 형식
  const urlMatch = trimmed.match(/blog\.naver\.com\/([a-zA-Z0-9_-]+)/);
  if (urlMatch) return urlMatch[1];

  // https://blog.naver.com/blogId 형식
  const fullUrlMatch = trimmed.match(/https?:\/\/blog\.naver\.com\/([a-zA-Z0-9_-]+)/);
  if (fullUrlMatch) return fullUrlMatch[1];

  // blogId만 입력한 경우 (영문, 숫자, _, - 만 허용)
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed) && trimmed.length >= 2) {
    return trimmed;
  }

  return null;
}

export async function fetchBlogRSS(blogId: string): Promise<{
  title: string;
  posts: BlogPost[];
} | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`https://rss.blog.naver.com/${blogId}.xml`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const xml = await response.text();

    // 블로그 제목 추출
    const channelTitleMatch = xml.match(/<channel>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const blogTitle = channelTitleMatch ? channelTitleMatch[1] : blogId;

    // 포스트 추출
    const posts: BlogPost[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const block = match[1];
      const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = block.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = block.match(/<pubDate>(.*?)<\/pubDate>/);
      const descMatch = block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);

      if (titleMatch) {
        posts.push({
          title: titleMatch[1],
          link: linkMatch ? linkMatch[1] : "",
          pubDate: pubDateMatch ? pubDateMatch[1] : "",
          description: descMatch ? descMatch[1].replace(/<[^>]*>/g, "").slice(0, 200) : "",
        });
      }
    }

    return { title: blogTitle, posts };
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

export async function fetchBlogPostCount(blogId: string): Promise<number> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `https://blog.naver.com/NVisitorg498Ajax.naver?blogId=${blogId}`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);
    // 실패시 RSS 포스트 수로 대체
    if (!response.ok) return 0;
    return 0; // fallback
  } catch {
    clearTimeout(timeoutId);
    return 0;
  }
}

export async function checkSearchVisibility(
  blogId: string,
  posts: BlogPost[]
): Promise<number> {
  if (posts.length === 0) return 0;

  // 최근 5개 포스트의 검색 노출 여부 확인
  const checkPosts = posts.slice(0, 5);
  let visibleCount = 0;

  for (const post of checkPosts) {
    try {
      const count = await getBlogDocCount(`site:blog.naver.com/${blogId} ${post.title.slice(0, 20)}`);
      if (count !== null && count > 0) {
        visibleCount++;
      }
    } catch {
      // 무시
    }
  }

  return Math.round((visibleCount / checkPosts.length) * 100);
}

export function calculateBlogLevel(
  totalPosts: number,
  postingFrequency: number,
  avgPostLength: number,
  searchVisibility: number
): { level: number; label: string; tips: string[] } {
  let score = 0;
  const tips: string[] = [];

  // 총 포스트 수 (최대 25점)
  if (totalPosts >= 1000) score += 25;
  else if (totalPosts >= 500) score += 20;
  else if (totalPosts >= 200) score += 15;
  else if (totalPosts >= 100) score += 10;
  else if (totalPosts >= 50) score += 7;
  else if (totalPosts >= 20) score += 4;
  else {
    score += 1;
    tips.push("포스팅 수를 꾸준히 늘려보세요. 최소 50개 이상을 목표로 하세요.");
  }

  // 포스팅 빈도 - 최근 30일 기준 (최대 25점)
  if (postingFrequency >= 20) score += 25;
  else if (postingFrequency >= 15) score += 20;
  else if (postingFrequency >= 10) score += 15;
  else if (postingFrequency >= 5) score += 10;
  else if (postingFrequency >= 2) score += 5;
  else {
    score += 1;
    tips.push("꾸준한 포스팅이 중요합니다. 주 3회 이상 포스팅을 추천합니다.");
  }

  // 평균 포스트 길이 (최대 25점)
  if (avgPostLength >= 150) score += 25;
  else if (avgPostLength >= 100) score += 20;
  else if (avgPostLength >= 70) score += 15;
  else if (avgPostLength >= 40) score += 10;
  else {
    score += 3;
    tips.push("포스트 본문 길이를 늘려보세요. 충실한 내용은 검색 노출에 도움이 됩니다.");
  }

  // 검색 노출률 (최대 25점)
  if (searchVisibility >= 80) score += 25;
  else if (searchVisibility >= 60) score += 20;
  else if (searchVisibility >= 40) score += 15;
  else if (searchVisibility >= 20) score += 10;
  else {
    score += 2;
    tips.push("SEO에 맞는 키워드 사용으로 검색 노출을 개선해보세요.");
  }

  if (tips.length === 0) {
    tips.push("지수가 충분히 높습니다. 인플루언서 도전에 매우 유리합니다!");
    tips.push("경쟁 콘텐츠가 오래되었다면 최신성 전략도 효과적입니다.");
  }

  // 점수 → 레벨 (0~10)
  const level = Math.min(10, Math.floor(score / 10));

  const labels = [
    "입문 블로거",
    "초보 블로거",
    "성장 블로거",
    "활동 블로거",
    "우수 블로거",
    "인기 블로거",
    "파워 블로거",
    "상위 블로거",
    "최상위 블로거",
    "인플루언서급",
    "탑 인플루언서",
  ];

  return { level, label: labels[level], tips };
}
