import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "셀러 지수 - KeywordView",
  description: "네이버 스마트스토어 ID를 입력하면 11단계 레벨, 상품명 SEO 점수, 검색 노출률을 분석합니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
