import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const COUNTER_KEY = "kv:analysis-count";

export async function GET() {
  try {
    const count = await redis.get<number>(COUNTER_KEY) || 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
