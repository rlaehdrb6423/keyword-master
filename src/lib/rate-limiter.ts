import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

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
    // Rate limiter 실패 시 차단 (보안 우선)
    return { success: false, remaining: 0 };
  }
}

export function getClientIp(request: Request): string {
  // Vercel이 설정하는 신뢰할 수 있는 IP 헤더 우선 사용
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  if (vercelIp) {
    return vercelIp.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}
