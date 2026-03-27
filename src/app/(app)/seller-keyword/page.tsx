import type { Metadata } from "next";
import SellerKeywordClient from "./SellerKeywordClient";

export const metadata: Metadata = {
  title: "셀러 키워드 분석 — 상품수 대비 검색량 분석",
  description:
    "네이버 쇼핑 상품수와 검색량 비율을 분석하여 경쟁이 적은 틈새 키워드를 찾아줍니다. 스마트스토어, 쿠팡 셀러를 위한 무료 키워드 분석 도구입니다.",
  alternates: { canonical: "https://keywordview.kr/seller-keyword" },
};

export default function Page() {
  return (
    <>
      <SellerKeywordClient />

      <section className="max-w-5xl mx-auto mt-12 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            셀러 키워드 분석이란?
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            셀러 키워드 분석은 온라인 판매자가 상품을 등록하기 전에 해당 키워드의 시장
            경쟁 상황을 파악할 수 있는 기능입니다. 네이버 검색광고 API의 검색량 데이터와
            네이버 검색 API의 쇼핑 상품수를 결합하여 분석합니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            핵심 지표인 "비율"은 월간 검색량을 상품수로 나눈 값입니다. 비율이 높을수록
            수요(검색)는 많은데 공급(상품)이 적다는 뜻이므로, 해당 키워드로 상품을
            등록하면 노출 기회가 더 많습니다. A등급 키워드는 이 비율이 가장 유리한
            키워드를 의미합니다.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">분석 항목</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">검색량 vs 상품수</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                월간 PC/모바일 검색량과 네이버 쇼핑 탭의 전체 상품수를 비교합니다. 검색량은 높은데 상품수가 적은 키워드가 틈새 시장입니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">검색량/상품수 비율</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                비율이 1 이상이면 검색 수요가 상품 공급보다 많다는 의미입니다. 비율이 높을수록 경쟁 우위를 확보하기 유리합니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">블로그 마케팅 경쟁도</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                해당 키워드의 블로그 문서수도 함께 확인합니다. 블로그 체험단, 리뷰 마케팅이 많은 키워드는 광고비 경쟁도 치열할 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">관련 키워드 비교</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                연관 키워드 10개의 상품수와 검색량을 한 번에 비교하여, 메인 키워드 외에도 상품명에 포함할 서브 키워드를 발굴할 수 있습니다.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">활용 가이드</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              1단계: 판매하려는 상품의 대표 키워드를 입력합니다. "무선 이어폰"보다 "노이즈캔슬링 이어폰"처럼
              구체적인 키워드가 더 정확한 시장 분석 결과를 제공합니다.
            </p>
            <p>
              2단계: 비율과 등급을 확인합니다. A~B등급 키워드를 상품 제목에 포함하면
              네이버 쇼핑 상위 노출 가능성이 높아집니다.
            </p>
            <p>
              3단계: 관련 키워드 목록에서 상품명, 태그, 상세 설명에 활용할 서브 키워드를 선별합니다.
              엑셀 다운로드 기능으로 키워드 리스트를 체계적으로 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
