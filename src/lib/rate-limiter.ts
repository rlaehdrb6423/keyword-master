import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// IP 기반 분당 30회 제한
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: false,
});

export async function checkRateLimit(
  ip: string
): Promise<{ success: boolean; remaining: number }> {
  try {
    const result = await ratelimit.limit(ip);
    return { success: result.success, remaining: result.remaining };
  } catch {
    // Rate limiter 실패 시 허용 (가용성 우선)
    return { success: true, remaining: -1 };
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}
