import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 분석 (BETA) - 경쟁 블로그 틈새 주제 발굴",
  description:
    "경쟁 블로그를 분석하고, 내 블로그에 아직 다루지 않은 틈새 주제를 찾아보세요. 검색량 데이터와 함께 추천합니다.",
  keywords: [
    "블로그 분석",
    "경쟁 블로그",
    "틈새 키워드",
    "블로그 주제 추천",
    "네이버 블로그 분석",
  ],
  alternates: { canonical: "https://keywordview.kr/blog-analysis" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://keywordview.kr/blog-analysis",
    siteName: "KeywordView",
    title: "블로그 분석 (BETA) - 경쟁 블로그 틈새 주제 발굴 | KeywordView",
    description:
      "경쟁 블로그를 분석하고, 내 블로그에 아직 다루지 않은 틈새 주제를 찾아보세요. 검색량 데이터와 함께 추천합니다.",
    images: [
      {
        url: "https://keywordview.kr/api/og",
        width: 1200,
        height: 630,
        alt: "블로그 분석 (BETA) | KeywordView",
      },
    ],
  },
};

export default function BlogAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
