import type { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "블로그 지수 분석 — 11단계 레벨 + SEO 진단",
  description:
    "네이버 블로그, 티스토리, 워드프레스의 RSS를 분석하여 11단계 블로그 레벨을 측정합니다. 포스팅 빈도, 본문 길이, 검색 노출률 기반 SEO 진단과 개선 팁을 무료로 제공합니다.",
  alternates: { canonical: "https://keywordview.kr/blog-index" },
};

export default function Page() {
  return (
    <>
      <BlogIndexClient />

      <section className="max-w-5xl mx-auto mt-12 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            블로그 지수 분석이란?
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            블로그 지수 분석은 블로그의 전반적인 건강도를 측정하는 기능입니다. 블로그의
            RSS 피드를 분석하여 포스팅 수, 작성 주기, 평균 본문 길이, 검색 노출률 등을
            종합적으로 평가하고 11단계 레벨로 결과를 제공합니다.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            네이버 블로그, 티스토리, 워드프레스를 모두 지원하며, 블로그 주소만 입력하면
            자동으로 플랫폼을 감지합니다. 개별 포스트의 SEO 점수와 구체적인 개선 팁도
            함께 제공하여 검색 노출을 높이는 데 실질적인 도움을 줍니다.
          </p>

          <h3 className="font-semibold text-gray-900 text-sm mb-3">측정 항목</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">11단계 블로그 레벨</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                총 포스팅 수, 주간 포스팅 빈도, 평균 본문 길이, 검색 노출률을 종합하여 Lv.1부터 Lv.11까지의 레벨을 산출합니다. 레벨이 높을수록 검색 엔진에서 더 잘 노출됩니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">포스팅 빈도 분석</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                최근 포스팅의 작성 주기를 주간 단위 타임라인 차트로 시각화합니다. 규칙적인 포스팅 습관이 블로그 지수 향상에 핵심적인 역할을 합니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">포스트별 SEO 점수</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                각 포스트의 제목 길이, 본문 길이, 키워드 검색량, 구조 등 9가지 SEO 항목을 100점 만점으로 평가합니다. 개선이 필요한 항목별로 구체적인 팁을 제공합니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">검색 노출률</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                최근 포스트 중 네이버 검색에 실제로 노출되는 비율을 측정합니다. 노출률이 높을수록 블로그의 검색 경쟁력이 우수하다는 것을 의미합니다.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm mb-3">지원 플랫폼</h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              네이버 블로그: 블로그 ID를 입력하면 됩니다. (예: blog.naver.com/블로그ID에서 블로그ID 부분)
            </p>
            <p>
              티스토리: 블로그 주소를 입력하면 자동으로 RSS를 감지합니다. (예: example.tistory.com)
            </p>
            <p>
              워드프레스: 도메인 주소를 입력하면 RSS 피드를 자동으로 찾습니다. 셀프호스팅과 WordPress.com 모두 지원합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
