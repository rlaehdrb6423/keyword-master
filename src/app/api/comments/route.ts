import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const COMMENTS_KEY = "kv:comments";
const MAX_COMMENTS = 50;
const ADMIN_CODE = process.env.ADMIN_CODE || "keywordview2026";

interface Comment {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

// XSS 방지: HTML 태그 제거 및 특수문자 이스케이프
function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export async function GET() {
  try {
    const comments = await redis.lrange<Comment>(COMMENTS_KEY, 0, MAX_COMMENTS - 1);
    return NextResponse.json({ comments: comments || [] });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: Request) {
  // Rate limit: 댓글은 분당 5회로 제한
  const ip = getClientIp(request);
  const { success } = await checkRateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "너무 많은 요청입니다. 잠시 후 다시 시도해주세요." },
      { status: 429 }
    );
  }

  let body: { message?: string; adminCode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const rawMessage = body.message?.trim();
  if (!rawMessage || rawMessage.length < 2) {
    return NextResponse.json({ error: "댓글을 2자 이상 입력해주세요." }, { status: 400 });
  }

  if (rawMessage.length > 500) {
    return NextResponse.json({ error: "댓글은 500자까지 가능합니다." }, { status: 400 });
  }

  // URL 스팸 필터
  const urlPattern = /https?:\/\/[^\s]+/gi;
  if (urlPattern.test(rawMessage)) {
    return NextResponse.json({ error: "댓글에 링크를 포함할 수 없습니다." }, { status: 400 });
  }

  const message = sanitize(rawMessage.slice(0, 500));
  const isAdmin = body.adminCode === ADMIN_CODE;

  const comment: Comment = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    message,
    isAdmin,
    createdAt: new Date().toISOString(),
  };

  try {
    await redis.lpush(COMMENTS_KEY, comment);
    await redis.ltrim(COMMENTS_KEY, 0, MAX_COMMENTS - 1);
    return NextResponse.json({ comment });
  } catch {
    return NextResponse.json({ error: "댓글 저장에 실패했습니다." }, { status: 500 });
  }
}
