import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { analyzeGap } from "@/lib/blog-gap-analyzer";
import { getCached, setCache, makeCacheKey } from "@/lib/cache";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import type { BlogGapAnalysisResult } from "@/lib/blog-gap-analyzer";
import { Redis } from "@upstash/redis";

const DAILY_LIMIT = 3;

async function checkDailyLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const today = new Date().toISOString().slice(0, 10);
    const key = `kv:blog-analysis:${userId}:${today}`;
    const count = (await redis.get<number>(key)) || 0;

    if (count >= DAILY_LIMIT) {
      return { allowed: false, remaining: 0 };
    }

    await redis.incr(key);
    await redis.expire(key, 86400);

    return { allowed: true, remaining: DAILY_LIMIT - count - 1 };
  } catch {
    return { allowed: true, remaining: DAILY_LIMIT };
  }
}

export async function POST(request: Request) {
  // 로그인 체크
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  const userId = (session.user as { id?: string }).id || session.user.email || "";

  // 일일 사용량 체크
  const { allowed, remaining } = await checkDailyLimit(userId);
  if (!allowed) {
    return NextResponse.json(
      { error: "오늘 분석 횟수(3회)를 모두 사용했습니다. 내일 다시 이용해주세요." },
      { status: 429 }
    );
  }

  const ip = getClientIp(request);
  const { success } = await checkRateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요." },
      { status: 429 }
    );
  }

  let body: { myBlogId?: string; rivalBlogIds?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청 형식입니다." },
      { status: 400 }
    );
  }

  const myBlogId = body.myBlogId?.trim();
  const rivalBlogIds = body.rivalBlogIds
    ?.map((id) => id.trim())
    .filter((id) => id.length > 0);

  if (!myBlogId) {
    return NextResponse.json(
      { error: "내 블로그 ID를 입력해주세요." },
      { status: 400 }
    );
  }

  if (!rivalBlogIds || rivalBlogIds.length === 0) {
    return NextResponse.json(
      { error: "경쟁 블로그 ID를 최소 1개 입력해주세요." },
      { status: 400 }
    );
  }

  if (rivalBlogIds.length > 3) {
    return NextResponse.json(
      { error: "경쟁 블로그는 최대 3개까지 입력 가능합니다." },
      { status: 400 }
    );
  }

  // 캐시 확인
  const cacheKey = makeCacheKey("bloganalysis", `${myBlogId}:${rivalBlogIds.sort().join(",")}`);
  const cached = await getCached<BlogGapAnalysisResult>(cacheKey);
  if (cached) {
    return NextResponse.json({ ...cached, remaining });
  }

  try {
    const result = await analyzeGap(myBlogId, rivalBlogIds);

    if (result.rivalTrends.length === 0 && result.myKeywords.length === 0) {
      return NextResponse.json(
        { error: "블로그 글을 찾을 수 없습니다. 블로그 ID를 확인해주세요." },
        { status: 404 }
      );
    }

    await setCache(cacheKey, result);
    return NextResponse.json({ ...result, remaining });
  } catch (error) {
    console.error("블로그 분석 에러:", error);
    return NextResponse.json(
      { error: "분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
