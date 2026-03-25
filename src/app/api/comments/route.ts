import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

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

export async function GET() {
  try {
    const comments = await redis.lrange<Comment>(COMMENTS_KEY, 0, MAX_COMMENTS - 1);
    return NextResponse.json({ comments: comments || [] });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: Request) {
  let body: { message?: string; adminCode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const message = body.message?.trim().slice(0, 500);
  if (!message) {
    return NextResponse.json({ error: "댓글을 입력해주세요." }, { status: 400 });
  }

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
