import { redis } from "@/lib/redis";

const FULL_RESULT_TTL = 86400; // 24시간 (완전 결과)
const PARTIAL_RESULT_TTL = 3600; // 1시간 (부분 결과 - 쿠팡 누락)

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get<T>(key);
    return data;
  } catch {
    return null;
  }
}

export async function setCache<T>(
  key: string,
  data: T,
  isPartial: boolean = false
): Promise<void> {
  try {
    const ttl = isPartial ? PARTIAL_RESULT_TTL : FULL_RESULT_TTL;
    await redis.set(key, data, { ex: ttl });
  } catch {
    // 캐시 실패는 무시 - API 호출로 fallback
  }
}

export function makeCacheKey(prefix: string, keyword: string): string {
  return `km:${prefix}:${keyword.toLowerCase().trim()}`;
}
