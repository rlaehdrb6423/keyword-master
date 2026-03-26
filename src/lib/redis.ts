import { Redis } from "@upstash/redis";

// Redis 싱글턴 인스턴스
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
