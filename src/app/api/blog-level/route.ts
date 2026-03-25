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
  const allTitles = posts.map((p) => p.title);

  for (const post of checkPosts) {
    let score = 0;
    const tips: string[] = [];
    const titleKeywords = extractKeywords(post.title);

    // 1. 제목 길이 (15~40자 적정)
    if (post.title.length >= 15 && post.title.length <= 40) {
      score += 12;
    } else if (post.title.length > 40) {
      score += 6;
      tips.push(`제목이 ${post.title.length}자로 너무 깁니다. 15~40자가 검색 노출에 최적입니다.`);
    } else if (post.title.length >= 10) {
      score += 8;
      tips.push("제목을 15~40자 사이로 조정하면 검색 결과에서 잘리지 않습니다.");
    } else {
      score += 3;
      tips.push("제목이 너무 짧습니다. 핵심 키워드 + 부가 설명 형태로 작성하세요.");
    }

    // 2. 키워드 위치 (제목 앞쪽에 핵심 키워드)
    if (titleKeywords.length > 0) {
      const firstKeywordPos = post.title.indexOf(titleKeywords[0]);
      if (firstKeywordPos <= 5) {
        score += 10;
      } else {
        score += 4;
        tips.push("핵심 키워드를 제목 앞쪽에 배치하면 검색 노출에 유리합니다.");
      }
    }

    // 3. 본문 길이 (설명 기준)
    if (post.description.length >= 150) {
      score += 12;
    } else if (post.description.length >= 80) {
      score += 8;
      tips.push("본문이 다소 짧습니다. 1500자 이상 작성하면 상위 노출 확률이 높아집니다.");
    } else {
      score += 3;
      tips.push("본문이 매우 짧습니다. 충실한 정보를 담은 1500자 이상의 글을 작성하세요.");
    }

    // 4. 제목 키워드가 본문에 포함되는지
    if (titleKeywords.length > 0) {
      const keywordInBody = titleKeywords.filter((kw) => post.description.includes(kw));
      if (keywordInBody.length >= 2) {
        score += 10;
      } else if (keywordInBody.length === 1) {
        score += 6;
        tips.push("제목의 핵심 키워드를 본문에서도 자연스럽게 2~3회 반복하세요.");
      } else {
        score += 2;
        tips.push("제목 키워드가 본문에 없습니다. 제목과 본문의 키워드를 일치시키세요.");
      }
    }

    // 5. 키워드 검색량 확인 (상위 3개 포스트만)
    let hasVolume = false;
    if (results.length < 3 && titleKeywords.length > 0) {
      try {
        const vol = await getSearchVolume(titleKeywords[0]);
        if (vol && (vol.pcVolume + vol.mobileVolume) > 100) {
          score += 15;
          hasVolume = true;
        } else if (vol && (vol.pcVolume + vol.mobileVolume) > 10) {
          score += 8;
          hasVolume = true;
          tips.push(`"${titleKeywords[0]}" 검색량이 적습니다. 월 검색량 100 이상인 키워드를 노려보세요.`);
        } else {
          score += 3;
          tips.push(`"${titleKeywords[0]}" 검색량이 거의 없습니다. 키워드 도구로 수요가 있는 키워드를 찾아보세요.`);
        }
      } catch {
        score += 5;
      }
    } else {
      score += 5;
    }

    // 6. 특수문자/이모지 남용
    const specialChars = post.title.replace(/[\wㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");
    if (specialChars.length <= 2) {
      score += 8;
    } else if (specialChars.length <= 5) {
      score += 4;
      tips.push("제목에 특수문자를 줄이세요. 검색엔진은 텍스트 기반으로 키워드를 인식합니다.");
    } else {
      score += 1;
      tips.push("제목에 특수문자/이모지가 너무 많습니다. 검색 노출에 불리합니다.");
    }

    // 7. 이미지 포함 여부 (description에 img 태그 흔적)
    const hasImage = /<img|src=|image/i.test(post.description);
    if (hasImage) {
      score += 8;
    } else {
      score += 2;
      tips.push("이미지가 없거나 적습니다. 3~5장의 관련 이미지를 포함하면 체류 시간이 늘어납니다.");
    }

    // 8. 포스팅 시간 (오전 6~10시, 오후 6~10시 최적)
    const pubHour = new Date(post.pubDate).getHours();
    if ((pubHour >= 6 && pubHour <= 10) || (pubHour >= 18 && pubHour <= 22)) {
      score += 8;
    } else {
      score += 3;
      tips.push("오전 6~10시 또는 오후 6~10시에 발행하면 초기 유입이 더 많습니다.");
    }

    // 9. 다른 포스트와 키워드 중복 체크
    if (titleKeywords.length > 0) {
      const duplicateCount = allTitles.filter(
        (t) => t !== post.title && titleKeywords.some((kw) => t.includes(kw))
      ).length;
      if (duplicateCount === 0) {
        score += 7;
      } else if (duplicateCount <= 2) {
        score += 4;
        tips.push("비슷한 키워드의 글이 있습니다. 같은 키워드로 여러 글을 쓰면 서로 경쟁할 수 있습니다.");
      } else {
        score += 1;
        tips.push(`동일 키워드 포스트가 ${duplicateCount}개 있습니다. 키워드를 다양화하세요.`);
      }
    } else {
      score += 3;
    }

    if (tips.length === 0) tips.push("SEO 최적화가 잘 되어있습니다! 이 패턴을 유지하세요.");

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
