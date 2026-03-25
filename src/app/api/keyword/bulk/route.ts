import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import type { BulkRequest, BulkResponse, ApiErrorResponse } from "@/types/keyword";

const BULK_MAX = 10;
const CONCURRENCY = 5;

export async function POST(request: Request) {
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
  const apiUrl = type === "seller"
    ? `${getBaseUrl(request)}/api/keyword/seller`
    : `${getBaseUrl(request)}/api/keyword/blog`;

  // p-limit 스타일 동시성 제한
  const results: BulkResponse = { results: [], errors: [] };
  const keywords = body.keywords.map((k) => k.trim()).filter(Boolean);

  for (let i = 0; i < keywords.length; i += CONCURRENCY) {
    const batch = keywords.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.allSettled(
      batch.map(async (keyword) => {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": ip,
          },
          body: JSON.stringify({ keyword }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "API 호출 실패");
        }
        return res.json();
      })
    );

    batchResults.forEach((result, idx) => {
      if (result.status === "fulfilled") {
        results.results.push(result.value);
      } else {
        results.errors.push({
          keyword: batch[idx],
          error: result.reason?.message || "알 수 없는 오류",
        });
      }
    });
  }

  return NextResponse.json(results);
}

function getBaseUrl(request: Request): string {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
