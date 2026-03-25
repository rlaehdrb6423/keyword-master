import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 지수 분석",
  description:
    "네이버 블로그 ID를 입력하면 11단계 레벨, 포스팅 주기, 포스트별 SEO 점수를 분석합니다.",
  alternates: { canonical: "https://keywordview.kr/blog-index" },
  openGraph: {
    title: "블로그 지수 분석 - KeywordView",
    description:
      "네이버 블로그의 11단계 레벨과 SEO 점수를 무료로 분석하세요.",
    url: "https://keywordview.kr/blog-index",
    images: [{ url: "https://keywordview.kr/api/og?page=blog-index" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
