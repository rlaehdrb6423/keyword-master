import type { Metadata } from "next";
import BlogKeywordClient from "./BlogKeywordClient";

export const metadata: Metadata = {
  title: "블로그 키워드 분석 — 검색량·경쟁도·등급 한눈에",
  description:
    "네이버 검색광고 API 기반으로 블로그 키워드의 PC/모바일 검색량, 블로그·뉴스·카페 경쟁도, A~D 등급을 실시간 분석합니다. 관련 키워드 10개와 채널별 점유율까지 무료로 확인하세요.",
  alternates: { canonical: "https://keywordview.kr/blog-keyword" },
};

export default function Page() {
  return (
    <>
      <BlogKeywordClient />

      {/* SSR SEO 콘텐츠 — Googlebot이 읽을 수 있는 고유 텍스트 */}
      <section className="max-w-5xl mx-auto mt-12 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            블로그 키워드 분석이란?
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            블로그 키워드 분석은 네이버 검색광고 API에서 제공하는 공식 데이터를 기반으로
            특정 키워드의 월간 PC/모바일 검색량, 블로그·뉴스·카페 문서 수를 실시간으로
            조회하여 경쟁도와 상위 노출 가능성을 평가하는 기능입니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            검색량 대비 경쟁 문서 수의 비율을 계산하여 A~D 등급으로 키워드의 난이도를
            표시합니다. A등급은 검색량은 충분하면서 경쟁이 적어 블로그 상위 노출 확률이
            높은 키워드를 의미합니다. 관련 키워드 10개도 동일한 기준으로 함께 분석되어
            콘텐츠 아이디어를 확장하는 데 활용할 수 있습니다.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">분석 항목</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">PC/모바일 검색량</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                네이버 검색광고 API에서 제공하는 최근 30일 기준 월간 검색량입니다. PC와 모바일을 분리하여 사용자 행동 패턴을 파악할 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">채널별 경쟁도</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                네이버 검색 API로 블로그, 뉴스, 카페 각 채널의 문서 수를 조회합니다. 채널별 점유율 차트로 어떤 채널에서 경쟁이 심한지 시각적으로 확인할 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">A~D 등급 평가</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                검색량/문서수 비율로 등급을 산출합니다. A등급(추천) → B등급(양호) → C등급(보통) → D등급(경쟁 치열) 순으로, 블로그 글 작성 우선순위를 쉽게 정할 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">관련 키워드 10개</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                입력한 키워드와 연관성이 높은 키워드 10개를 자동으로 분석합니다. 롱테일 키워드 발굴과 시리즈 콘텐츠 기획에 활용할 수 있습니다.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">활용 가이드</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              1단계: 작성하려는 주제의 대표 키워드를 입력합니다. 예를 들어 "에어프라이어 레시피"처럼
              구체적인 키워드를 입력하면 더 정확한 분석 결과를 얻을 수 있습니다.
            </p>
            <p>
              2단계: 분석 결과에서 등급과 검색량을 확인합니다. A등급이면서 월간 검색량이 1,000 이상인
              키워드가 블로그 상위 노출에 가장 유리합니다.
            </p>
            <p>
              3단계: 관련 키워드 목록에서 추가 글감을 발굴합니다. 태그 복사 기능으로 관련 키워드를
              해시태그 형식으로 바로 복사할 수 있고, 엑셀 다운로드로 키워드 목록을 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
