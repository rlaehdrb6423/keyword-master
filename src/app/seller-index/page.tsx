import type { Metadata } from "next";
import SellerIndexClient from "./SellerIndexClient";

export const metadata: Metadata = {
  title: "셀러 지수 분석 — 스마트스토어 레벨 + 상품 SEO",
  description:
    "네이버 스마트스토어의 상품 수, 리뷰, 찜 수를 분석하여 스토어 레벨을 측정합니다. 개별 상품의 제목 SEO 점수와 개선 팁을 무료로 제공합니다.",
  alternates: { canonical: "https://keywordview.kr/seller-index" },
};

export default function Page() {
  return (
    <>
      <SellerIndexClient />

      <section className="max-w-5xl mx-auto mt-12 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            셀러 지수 분석이란?
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            셀러 지수 분석은 네이버 스마트스토어의 전반적인 경쟁력을 측정하는 기능입니다.
            스토어의 상품 수, 리뷰 수, 찜(위시리스트) 수 등을 분석하여 스토어의 현재
            레벨을 평가하고, 성장에 필요한 구체적인 방향을 제시합니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            스토어 전체 분석 외에도 개별 상품의 제목에 대한 SEO 점수를 측정합니다.
            상품명에 검색량이 높은 키워드가 포함되어 있는지, 제목 길이가 적절한지,
            핵심 키워드가 앞쪽에 배치되어 있는지 등을 분석하여 네이버 쇼핑 검색
            상위 노출에 도움이 되는 구체적인 개선 팁을 제공합니다.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">측정 항목</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">스토어 레벨</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                등록 상품 수, 누적 리뷰, 찜 수, 스토어 운영 기간 등을 종합하여 스토어의 현재 경쟁력을 레벨로 표시합니다. 동일 카테고리 내 상대적 위치를 파악하는 데 활용할 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">상품 제목 SEO 점수</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                각 상품의 제목을 분석하여 키워드 포함 여부, 제목 길이, 키워드 위치 등을 100점 만점으로 평가합니다. 점수가 낮은 상품부터 우선 개선하면 검색 노출 효과를 극대화할 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">경쟁 스토어 벤치마킹</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                내 스토어 뿐 아니라 경쟁 스토어의 지수도 분석할 수 있습니다. 같은 카테고리에서 상위권 스토어의 상품 수, 리뷰 전략을 참고하여 성장 로드맵을 세울 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">개선 팁 제공</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                분석 결과에 따라 상품명 최적화, 리뷰 확보 전략, 카테고리 설정 등 실행 가능한 개선 방향을 안내합니다. 각 팁은 실제 네이버 쇼핑 알고리즘 특성을 반영합니다.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">활용 가이드</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              1단계: 분석하려는 스마트스토어의 주소나 스토어명을 입력합니다. 내 스토어뿐 아니라 경쟁 스토어도 분석할 수 있습니다.
            </p>
            <p>
              2단계: 스토어 레벨과 개별 상품 SEO 점수를 확인합니다. SEO 점수가 낮은 상품의 제목을 우선적으로 수정하면 빠른 효과를 볼 수 있습니다.
            </p>
            <p>
              3단계: 제공되는 개선 팁을 참고하여 상품명을 최적화합니다. 셀러 키워드 분석 기능과 함께 사용하면 검색량이 높은 키워드를 상품명에 반영할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
