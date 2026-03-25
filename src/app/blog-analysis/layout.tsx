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
};

export default function BlogAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
