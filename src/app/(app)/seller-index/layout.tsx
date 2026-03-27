import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "셀러 지수 분석",
  description:
    "네이버 스마트스토어 ID를 입력하면 11단계 레벨, 상품명 SEO 점수, 검색 노출률을 분석합니다.",
  alternates: { canonical: "https://keywordview.kr/seller-index" },
  openGraph: {
    title: "셀러 지수 분석 - KeywordView",
    description:
      "스마트스토어의 11단계 레벨과 상품 SEO 점수를 무료로 분석하세요.",
    url: "https://keywordview.kr/seller-index",
    images: [{ url: "https://keywordview.kr/api/og?page=seller-index" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
