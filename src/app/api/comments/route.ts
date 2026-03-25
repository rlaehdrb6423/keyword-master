import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const COMMENTS_KEY = "kv:comments";
const MAX_COMMENTS = 50;

interface Comment {
  id: string;
  nickname: string;
  message: string;
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
  let body: { nickname?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const nickname = body.nickname?.trim().slice(0, 20);
  const message = body.message?.trim().slice(0, 500);

  if (!nickname || !message) {
    return NextResponse.json({ error: "닉네임과 댓글을 입력해주세요." }, { status: 400 });
  }

  const comment: Comment = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    nickname,
    message,
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
