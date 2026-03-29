import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Origin 검증 (CSRF 방지) - POST/PATCH/DELETE 요청에 대해
  const method = request.method;
  if (method === "POST" || method === "PATCH" || method === "DELETE") {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin) {
      // Origin이 있으면 host와 비교
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
      // Origin이 없는 경우 Sec-Fetch-Site로 추가 검증
      const secFetchSite = request.headers.get("sec-fetch-site");
      if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "none") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      // Referer로 이중 검증
      const referer = request.headers.get("referer");
      if (referer) {
        try {
          const refererHost = new URL(referer).host;
          if (refererHost !== host) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
          }
        } catch {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
