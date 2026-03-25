import { NextResponse } from "next/server";
import {
  parseBlogId,
  fetchBlogRSS,
  checkSearchVisibility,
  calculateBlogLevel,
} from "@/lib/blog-analyzer";
import type { ApiErrorResponse } from "@/types/keyword";

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

  // RSS 피드에서 블로그 정보 + 최근 포스트 가져오기
  const rssData = await fetchBlogRSS(blogId);
  if (!rssData) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "블로그를 찾을 수 없습니다. ID를 확인해주세요.", code: "INVALID_INPUT" },
      { status: 404 }
    );
  }

  const { title: blogTitle, posts } = rssData;
  const totalPosts = posts.length; // RSS에서 가져온 포스트 수

  // 최근 30일 포스팅 빈도 계산
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const recentPosts = posts.filter((p) => {
    const d = new Date(p.pubDate).getTime();
    return d >= thirtyDaysAgo;
  });
  const postingFrequency = recentPosts.length;

  // 평균 포스트 설명 길이 (본문 대리 지표)
  const avgPostLength =
    posts.length > 0
      ? Math.round(posts.reduce((sum, p) => sum + p.description.length, 0) / posts.length)
      : 0;

  // 검색 노출률 확인
  const searchVisibility = await checkSearchVisibility(blogId, posts);

  // 레벨 계산
  const { level, label, tips } = calculateBlogLevel(
    totalPosts,
    postingFrequency,
    avgPostLength,
    searchVisibility
  );

  return NextResponse.json({
    blogId,
    blogTitle,
    totalPosts,
    recentPosts: posts.slice(0, 10).map((p) => ({
      title: p.title,
      link: p.link,
      pubDate: p.pubDate,
      descriptionLength: p.description.length,
    })),
    postingFrequency,
    avgPostLength,
    searchVisibility,
    level,
    levelLabel: label,
    tips,
  });
}
