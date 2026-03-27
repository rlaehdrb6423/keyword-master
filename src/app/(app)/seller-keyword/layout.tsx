import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "셀러 키워드 분석",
  description:
    "네이버쇼핑 상품수 대비 검색량을 분석하여 시장 진입 가능성을 평가합니다. 블루오션 키워드를 찾아보세요.",
  alternates: { canonical: "https://keywordview.kr/seller-keyword" },
  openGraph: {
    title: "셀러 키워드 분석 - KeywordView",
    description:
      "네이버쇼핑 상품수 대비 검색량을 분석하여 블루오션 키워드를 찾아보세요.",
    url: "https://keywordview.kr/seller-keyword",
    images: [{ url: "https://keywordview.kr/api/og?page=seller-keyword" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
