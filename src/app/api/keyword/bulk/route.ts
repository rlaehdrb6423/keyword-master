import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { analyzeBlogKeyword, analyzeSellerKeyword } from "@/lib/keyword-analyzer";
import type { BulkRequest, BulkResponse, ApiErrorResponse } from "@/types/keyword";

const BULK_MAX = 10;
const CONCURRENCY = 5;

export async function POST(request: Request) {
  // 내부 호출 인증: Referer 확인 또는 INTERNAL_API_SECRET 검증
  const referer = request.headers.get("referer") || "";
  const apiSecret = request.headers.get("x-api-secret");
  const isInternal = referer.includes("keywordview.kr") || referer.includes("localhost");
  const isAuthorized = apiSecret === process.env.INTERNAL_API_SECRET;

  if (!isInternal && !isAuthorized) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "인증이 필요합니다.", code: "SERVER_ERROR" },
      { status: 401 }
    );
  }

  const ip = getClientIp(request);
  const { success } = await checkRateLimit(ip);
  if (!success) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.", code: "API_LIMIT" },
      { status: 429 }
    );
  }

  let body: BulkRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "잘못된 요청 형식입니다.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  if (!body.keywords || !Array.isArray(body.keywords) || body.keywords.length === 0) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "키워드 배열을 입력해주세요.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  if (body.keywords.length > BULK_MAX) {
    return NextResponse.json<ApiErrorResponse>(
      { error: `최대 ${BULK_MAX}개 키워드까지 가능합니다.`, code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const type = body.type || "blog";
  const analyzeFn = type === "seller" ? analyzeSellerKeyword : analyzeBlogKeyword;

  const results: BulkResponse = { results: [], errors: [] };
  const keywords = body.keywords.map((k) => k.trim()).filter(Boolean);

  for (let i = 0; i < keywords.length; i += CONCURRENCY) {
    const batch = keywords.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.allSettled(
      batch.map((keyword) => analyzeFn(keyword))
    );

    batchResults.forEach((result, idx) => {
      if (result.status === "fulfilled" && result.value) {
        results.results.push(result.value);
      } else {
        results.errors.push({
          keyword: batch[idx],
          error: result.status === "rejected" ? (result.reason?.message || "알 수 없는 오류") : "검색량 데이터 없음",
        });
      }
    });
  }

  return NextResponse.json(results);
}
