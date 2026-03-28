import { NextResponse } from "next/server";
import { analyzeSellerKeyword } from "@/lib/keyword-analyzer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import type { ApiErrorResponse } from "@/types/keyword";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { success } = await checkRateLimit(ip);
  if (!success) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.", code: "API_LIMIT" },
      { status: 429 }
    );
  }

  let body: { keyword?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "잘못된 요청 형식입니다.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const keyword = body.keyword?.trim();
  if (!keyword) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "키워드를 입력해주세요.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }
  if (keyword.length > 100) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "키워드는 100자 이내로 입력해주세요.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const result = await analyzeSellerKeyword(keyword);

  if (!result) {
    const safeKeyword = keyword.replace(/[<>"'&]/g, "").slice(0, 50);
    return NextResponse.json<ApiErrorResponse>(
      { error: `"${safeKeyword}"의 검색량 데이터가 없습니다. 검색량이 너무 적거나 등록되지 않은 키워드입니다. 다른 키워드를 시도해주세요.`, code: "NO_DATA" },
      { status: 404 }
    );
  }

  // 카운터 증가 (실패 무시)
  try {
    const { redis: counterRedis } = await import("@/lib/redis");
    await counterRedis.incr("kv:analysis-count");
  } catch {}

  return NextResponse.json(result);
}
