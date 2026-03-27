import type { Metadata } from "next";
import BlogAnalysisClient from "./BlogAnalysisClient";

export const metadata: Metadata = {
  title: "블로그 분석 (BETA) — 경쟁 블로그 틈새 주제 추천",
  description:
    "경쟁 블로그의 주제를 분석하여 내 블로그에 없는 틈새 주제를 검색량과 함께 추천합니다. 로그인 후 하루 3회 무료로 이용할 수 있습니다.",
  alternates: { canonical: "https://keywordview.kr/blog-analysis" },
};

export default function Page() {
  return (
    <>
      <BlogAnalysisClient />

      <section className="max-w-5xl mx-auto mt-12 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            블로그 분석(BETA)이란?
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            블로그 분석은 경쟁 블로그가 다루고 있지만 내 블로그에는 없는 틈새 주제를
            발굴해주는 기능입니다. 경쟁 블로그의 포스팅 주제를 크롤링하고, 각 주제의
            네이버 검색량을 함께 분석하여 검색 수요가 있는 미작성 주제를 추천합니다.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            블로그를 운영하다 보면 "다음에 무슨 글을 쓸까?"라는 고민이 빠지기 쉽습니다.
            블로그 분석 기능은 이 문제를 데이터로 해결합니다. 같은 분야에서 활동하는
            블로거가 어떤 주제로 글을 쓰는지 파악하고, 그중 검색량이 높은데 내가 아직
            다루지 않은 주제를 우선적으로 추천하여 콘텐츠 전략을 효율적으로 수립할 수 있습니다.
          </p>

          <h3 className="font-semibold text-gray-900 text-sm mb-3">주요 기능</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">경쟁 블로그 주제 크롤링</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                입력한 경쟁 블로그의 최근 포스팅 주제를 자동으로 수집합니다. 네이버 블로그, 티스토리, 워드프레스를 모두 지원합니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">틈새 주제 발굴</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                경쟁 블로그에는 있지만 내 블로그에는 없는 주제를 자동으로 필터링합니다. 중복 주제를 제외하고 새로운 콘텐츠 아이디어만 추천합니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">검색량 기반 우선순위</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                추천된 틈새 주제 각각의 네이버 월간 검색량을 함께 표시합니다. 검색량이 높은 주제를 먼저 작성하면 트래픽 효과를 극대화할 수 있습니다.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <h4 className="font-medium text-gray-900 text-xs mb-1">로그인 전용 기능</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                블로그 분석은 네이버 또는 구글 소셜 로그인 후 하루 3회까지 무료로 이용 가능합니다. 로그인은 간편하며 이름, 이메일, 프로필 이미지만 수집합니다.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm mb-3">활용 가이드</h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              1단계: 네이버 또는 구글 계정으로 로그인합니다. 로그인 버튼은 상단 메뉴에서 찾을 수 있습니다.
            </p>
            <p>
              2단계: 내 블로그 주소와 경쟁 블로그 주소를 입력합니다. 같은 분야에서 활동하는 블로거를 선택하면 더 유용한 결과를 얻을 수 있습니다.
            </p>
            <p>
              3단계: 추천된 틈새 주제 목록에서 검색량이 높은 주제를 선택하여 글을 작성합니다.
              블로그 키워드 분석 기능과 함께 활용하면 해당 주제의 세부 경쟁도까지 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
