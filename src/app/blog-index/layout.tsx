import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 지수 - KeywordView",
  description: "네이버 블로그 ID를 입력하면 11단계 레벨, 포스팅 주기, 포스트별 SEO 점수를 분석합니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
