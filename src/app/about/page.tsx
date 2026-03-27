import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개 — KeywordView란?",
  description:
    "KeywordView는 네이버 검색광고 API와 검색 API 데이터를 기반으로 블로거와 셀러에게 키워드 검색량, 경쟁도, SEO 점수를 무료로 분석해주는 키워드 분석 도구입니다.",
  alternates: { canonical: "https://keywordview.kr/about" },
};

const features = [
  {
    title: "블로그 키워드 분석",
    desc: "네이버 PC/모바일 검색량, 블로그·뉴스·카페 경쟁도, A~D 등급 평가를 통해 상위 노출 가능성이 높은 키워드를 찾아줍니다. 관련 키워드 10개를 함께 제공하여 콘텐츠 전략을 세울 수 있습니다.",
    color: "blue",
  },
  {
    title: "셀러 키워드 분석",
    desc: "네이버 쇼핑 상품수 대비 검색량 비율을 분석하여 경쟁이 적은 틈새 키워드를 발굴합니다. 스마트스토어, 쿠팡 셀러가 상품 등록 전 시장 경쟁 상황을 파악하는 데 활용할 수 있습니다.",
    color: "green",
  },
  {
    title: "블로그 지수 분석",
    desc: "네이버 블로그, 티스토리, 워드프레스의 RSS 데이터를 분석하여 포스팅 빈도, 본문 길이, 검색 노출률을 기반으로 11단계 레벨을 산출합니다. 개별 포스트별 SEO 점수와 개선 팁도 제공합니다.",
    color: "purple",
  },
  {
    title: "셀러 지수 분석",
    desc: "네이버 스마트스토어의 상품 수, 리뷰, 찜 수 등을 분석하여 스토어 레벨을 측정합니다. 개별 상품의 제목 SEO 점수와 개선 방향도 함께 안내합니다.",
    color: "orange",
  },
  {
    title: "블로그 분석 (BETA)",
    desc: "경쟁 블로그의 주제를 크롤링하여 내 블로그에 없는 틈새 주제를 검색량과 함께 추천합니다. 로그인 후 하루 3회까지 무료로 이용할 수 있습니다.",
    color: "primary",
  },
];

const dataSources = [
  {
    name: "네이버 검색광고 API",
    desc: "월간 PC/모바일 검색량, 클릭률, 경쟁 지수 등 공식 키워드 데이터",
  },
  {
    name: "네이버 검색 API",
    desc: "블로그, 뉴스, 카페, 쇼핑 등 채널별 문서 수와 검색 결과",
  },
  {
    name: "RSS 피드",
    desc: "네이버 블로그, 티스토리, 워드프레스의 공개 RSS를 통한 포스팅 데이터",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          홈으로 돌아가기
        </Link>
      </div>

      {/* 히어로 */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          KeywordView 소개
        </h1>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          KeywordView는 블로거와 온라인 셀러를 위한 무료 키워드 분석 도구입니다.
          네이버 검색광고 API와 네이버 검색 API의 공식 데이터를 실시간으로 분석하여
          검색량, 경쟁도, SEO 점수 등 콘텐츠 전략에 필요한 핵심 지표를 제공합니다.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          복잡한 키워드 분석을 누구나 쉽게 할 수 있도록, 직관적인 A~D 등급 시스템으로
          키워드의 경쟁 난이도를 한눈에 파악할 수 있게 설계했습니다. 회원가입 없이도
          대부분의 기능을 바로 사용할 수 있습니다.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          KeywordView는 데이터 기반의 콘텐츠 전략 수립을 돕는 것을 목표로 합니다.
          블로그 상위 노출을 위한 키워드 선정부터, 스마트스토어 상품 등록을 위한
          시장 분석까지 — 검색 데이터가 필요한 모든 순간에 활용할 수 있습니다.
        </p>
      </section>

      {/* 주요 기능 */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">주요 기능</h2>
        <div className="space-y-6">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className={`flex-shrink-0 w-2 rounded-full bg-${f.color}-500`} />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 데이터 출처 */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">데이터 출처</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          KeywordView의 모든 분석 결과는 공식 API와 공개 데이터를 기반으로 합니다.
          자체적으로 데이터를 생성하거나 추정하지 않으며, 신뢰할 수 있는 원본 데이터를
          가공하여 제공합니다.
        </p>
        <div className="space-y-4">
          {dataSources.map((s) => (
            <div key={s.name} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {s.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 운영 정보 */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">운영 정보</h2>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex gap-3">
            <span className="text-gray-400 dark:text-gray-500 flex-shrink-0 w-20">서비스명</span>
            <span>KeywordView (키워드뷰)</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-400 dark:text-gray-500 flex-shrink-0 w-20">운영</span>
            <span>개인 운영</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-400 dark:text-gray-500 flex-shrink-0 w-20">이메일</span>
            <a href="mailto:keywordview.kr@gmail.com" className="underline hover:text-gray-900 dark:hover:text-white transition-colors">
              keywordview.kr@gmail.com
            </a>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-400 dark:text-gray-500 flex-shrink-0 w-20">블로그</span>
            <a href="https://igetmindset.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900 dark:hover:text-white transition-colors">
              igetmindset.com
            </a>
          </div>
        </div>
      </section>

      {/* 하단 링크 */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">이용약관</Link>
        <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">개인정보처리방침</Link>
        <Link href="/contact" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">문의하기</Link>
      </div>
    </div>
  );
}
