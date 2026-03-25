import { NextResponse } from "next/server";
import {
  parseBlogId,
  fetchBlogRSS,
  checkSearchVisibility,
  calculateBlogLevel,
} from "@/lib/blog-analyzer";
import { getSearchVolume } from "@/lib/naver-api";
import type { ApiErrorResponse } from "@/types/keyword";

// 포스트 제목에서 주요 키워드 추출 (2글자 이상 단어)
function extractKeywords(title: string): string[] {
  return title
    .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 2)
    .slice(0, 3);
}

// 포스트 SEO 점수 계산
async function analyzePostSEO(
  posts: { title: string; description: string; pubDate: string }[]
): Promise<{ title: string; seoScore: number; seoTips: string[]; hasVolume: boolean }[]> {
  const results = [];
  const checkPosts = posts.slice(0, 10);

  for (const post of checkPosts) {
    let score = 0;
    const tips: string[] = [];

    // 1. 제목 길이 (15~40자 적정)
    if (post.title.length >= 15 && post.title.length <= 40) {
      score += 25;
    } else if (post.title.length >= 10) {
      score += 15;
      tips.push("제목을 15~40자 사이로 조정하면 좋습니다.");
    } else {
      score += 5;
      tips.push("제목이 너무 짧습니다. 키워드를 포함한 구체적인 제목을 작성하세요.");
    }

    // 2. 본문 길이 (설명 기준)
    if (post.description.length >= 100) {
      score += 25;
    } else if (post.description.length >= 50) {
      score += 15;
      tips.push("본문을 좀 더 충실하게 작성하면 검색 노출에 유리합니다.");
    } else {
      score += 5;
      tips.push("본문이 짧습니다. 1000자 이상의 충실한 콘텐츠를 작성하세요.");
    }

    // 3. 키워드 검색량 확인 (상위 3개 포스트만)
    let hasVolume = false;
    if (results.length < 3) {
      const keywords = extractKeywords(post.title);
      if (keywords.length > 0) {
        try {
          const vol = await getSearchVolume(keywords[0]);
          if (vol && (vol.pcVolume + vol.mobileVolume) > 100) {
            score += 30;
            hasVolume = true;
          } else if (vol && (vol.pcVolume + vol.mobileVolume) > 10) {
            score += 15;
            hasVolume = true;
            tips.push("검색량이 적은 키워드입니다. 더 인기 있는 키워드를 노려보세요.");
          } else {
            score += 5;
            tips.push("검색량이 거의 없는 키워드입니다. 키워드 전략을 재검토하세요.");
          }
        } catch {
          score += 10;
        }
      }
    } else {
      score += 10;
    }

    // 4. 특수문자/이모지 남용 체크
    const specialChars = post.title.replace(/[\wㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");
    if (specialChars.length <= 2) {
      score += 20;
    } else {
      score += 5;
      tips.push("제목에 특수문자가 많으면 검색 노출에 불리할 수 있습니다.");
    }

    if (tips.length === 0) tips.push("SEO 최적화가 잘 되어있습니다!");

    results.push({
      title: post.title,
      seoScore: Math.min(100, score),
      seoTips: tips,
      hasVolume,
    });
  }

  return results;
}

export async function POST(request: Request) {
  let body: { blogId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "잘못된 요청 형식입니다.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const rawInput = body.blogId?.trim();
  if (!rawInput) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "블로그 ID 또는 URL을 입력해주세요.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const blogId = parseBlogId(rawInput);
  if (!blogId) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "올바른 블로그 ID 형식이 아닙니다. (예: blogId 또는 blog.naver.com/blogId)", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const rssData = await fetchBlogRSS(blogId);
  if (!rssData) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "블로그를 찾을 수 없습니다. ID를 확인해주세요.", code: "INVALID_INPUT" },
      { status: 404 }
    );
  }

  const { title: blogTitle, posts } = rssData;
  const totalPosts = posts.length;

  // 최근 30일 포스팅 빈도
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const recentPosts = posts.filter((p) => new Date(p.pubDate).getTime() >= thirtyDaysAgo);
  const postingFrequency = recentPosts.length;

  // 평균 포스트 길이
  const avgPostLength =
    posts.length > 0
      ? Math.round(posts.reduce((sum, p) => sum + p.description.length, 0) / posts.length)
      : 0;

  // 검색 노출률
  const searchVisibility = await checkSearchVisibility(blogId, posts);

  // 레벨 계산
  const { level, label, tips } = calculateBlogLevel(
    totalPosts, postingFrequency, avgPostLength, searchVisibility
  );

  // 포스트별 SEO 점수
  const postSEO = await analyzePostSEO(posts);

  // 포스팅 주기 데이터 (주별 집계)
  const postingTimeline: { week: string; count: number }[] = [];
  for (let i = 0; i < 8; i++) {
    const weekEnd = now - i * 7 * 24 * 60 * 60 * 1000;
    const weekStart = weekEnd - 7 * 24 * 60 * 60 * 1000;
    const count = posts.filter((p) => {
      const d = new Date(p.pubDate).getTime();
      return d >= weekStart && d < weekEnd;
    }).length;
    const weekLabel = `${i === 0 ? "이번주" : `${i}주전`}`;
    postingTimeline.unshift({ week: weekLabel, count });
  }

  return NextResponse.json({
    blogId,
    blogTitle,
    totalPosts,
    recentPosts: posts.slice(0, 10).map((p, i) => ({
      title: p.title,
      link: p.link,
      pubDate: p.pubDate,
      descriptionLength: p.description.length,
      seoScore: postSEO[i]?.seoScore ?? 0,
      seoTips: postSEO[i]?.seoTips ?? [],
      hasVolume: postSEO[i]?.hasVolume ?? false,
    })),
    postingFrequency,
    avgPostLength,
    searchVisibility,
    level,
    levelLabel: label,
    tips,
    postingTimeline,
  });
}
