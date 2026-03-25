import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 키워드 분석 - KeywordView",
  description: "네이버 검색량 대비 블로그/뉴스/카페/웹문서 경쟁도를 종합 분석합니다. 관련 키워드 15개와 종합 경쟁도 등급을 확인하세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
