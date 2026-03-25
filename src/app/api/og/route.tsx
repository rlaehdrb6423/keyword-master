import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const PAGE_INFO: Record<string, { title: string; subtitle: string; color: string }> = {
  "blog-keyword": {
    title: "블로그 키워드 분석",
    subtitle: "검색량 · 경쟁도 · 채널 분석",
    color: "#3b82f6",
  },
  "seller-keyword": {
    title: "셀러 키워드 분석",
    subtitle: "상품수 · 검색량 · 시장 분석",
    color: "#22c55e",
  },
  "blog-index": {
    title: "블로그 지수 분석",
    subtitle: "11단계 레벨 · SEO 분석",
    color: "#a855f7",
  },
  "seller-index": {
    title: "셀러 지수 분석",
    subtitle: "스토어 레벨 · 상품 SEO",
    color: "#f97316",
  },
};

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") || "";
  const info = PAGE_INFO[page];

  const title = info?.title || "무료 키워드 분석 도구";
  const subtitle = info?.subtitle || "검색량, 경쟁도, SEO 점수까지 한곳에서";
  const accent = info?.color || "#2563eb";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                fontSize: "64px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              Keyword
            </span>
            <span
              style={{
                fontSize: "64px",
                fontWeight: 800,
                color: accent,
              }}
            >
              View
            </span>
          </div>

          <div
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "#f1f5f9",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "48px",
              padding: "12px 32px",
              borderRadius: "9999px",
              background: accent,
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            100% 무료 · keywordview.kr
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
