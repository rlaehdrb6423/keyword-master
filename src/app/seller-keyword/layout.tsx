import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "셀러 키워드 분석 - KeywordView",
  description: "네이버쇼핑 상품수 대비 검색량을 분석하여 시장 진입 가능성을 평가합니다. 블루오션 키워드를 찾아보세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
