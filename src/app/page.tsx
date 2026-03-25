import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import TrendingKeywords from "@/components/TrendingKeywords";
import TrustBadges from "@/components/TrustBadges";
import Comments from "@/components/Comments";
import ShareButtons from "@/components/ShareButtons";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "KeywordView는 무료인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 모든 기능을 회원가입 없이 100% 무료로 사용할 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "A등급 키워드는 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "검색량 대비 경쟁이 낮아 블로그 글이나 상품 등록 시 상위 노출 가능성이 높은 키워드입니다.",
      },
    },
    {
      "@type": "Question",
      name: "어떤 데이터를 기반으로 분석하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네이버 검색광고 API와 네이버 검색 API의 공식 데이터를 실시간으로 분석합니다.",
      },
    },
    {
      "@type": "Question",
      name: "블로그 지수는 어떻게 측정하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네이버 블로그 RSS를 분석하여 포스팅 수, 주기, 본문 길이, 검색 노출률을 기반으로 11단계 레벨을 산출합니다.",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 히어로 */}
      <section className="relative py-16 mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-purple-600/5 dark:from-primary-400/5 dark:to-purple-400/5 rounded-3xl" />
        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            100% 무료 키워드 분석 도구
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-900 dark:text-white">Keyword</span>
            <span className="text-primary-600 dark:text-primary-400">View</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            검색량, 경쟁도, SEO 점수까지<br className="sm:hidden" /> 블로거와 셀러에게 필요한 데이터를 한곳에서
          </p>

          {/* 히어로 검색 폼 (Client Component) */}
          <HeroSearch />
        </div>
      </section>

      {/* 신뢰 배지 */}
      <TrustBadges />

      {/* 기능 카드 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <Link href="/blog-keyword" className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">블로그 키워드</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">검색량 · 경쟁도 · 채널 분석</p>
        </Link>

        <Link href="/seller-keyword" className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg hover:shadow-green-500/5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">셀러 키워드</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">상품수 · 검색량 · 시장 분석</p>
        </Link>

        <Link href="/blog-index" className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg hover:shadow-purple-500/5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">블로그 지수</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">11단계 레벨 · SEO 분석</p>
        </Link>

        <Link href="/seller-index" className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">셀러 지수</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">스토어 레벨 · 상품 SEO</p>
        </Link>
      </section>

      {/* 실시간 인기 검색어 (Client Component) */}
      <TrendingKeywords />

      {/* 사용 가이드 */}
      <section className="mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">사용 방법</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">3단계로 끝나는 키워드 분석</p>
          </div>
          <div className="p-6">
            {/* 3단계 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">키워드 입력</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    위 검색창에 분석하고 싶은 키워드를 입력하세요. 블로그/셀러 탭을 선택할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">결과 확인</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    PC/모바일 검색량, 채널별 경쟁도, 관련 키워드 10개를 한눈에 확인하세요.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">등급으로 판단</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    A~D 등급을 보고 키워드 전략을 바로 세울 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 등급 해석 */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">등급 해석 가이드</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">A</span>
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">추천</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">경쟁 낮음. 바로 글을 쓰세요!</p>
                </div>
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">B</span>
                    <span className="text-xs font-medium text-green-700 dark:text-green-300">양호</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">충실한 콘텐츠로 경쟁 가능</p>
                </div>
                <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">C</span>
                    <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">보통</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">롱테일 키워드로 세분화 추천</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">D</span>
                    <span className="text-xs font-medium text-red-700 dark:text-red-300">경쟁 치열</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">다른 키워드를 찾아보세요</p>
                </div>
              </div>
            </div>

            {/* 활용 팁 */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">활용 팁</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-primary-500 mt-0.5 flex-shrink-0">*</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">블로거</strong> — A등급 키워드로 글을 쓰면 상위 노출 확률이 높아집니다. 관련 키워드에서 추가 글감을 찾아보세요.
                  </p>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-primary-500 mt-0.5 flex-shrink-0">*</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">셀러</strong> — 상품 등록 전에 셀러 키워드로 검색량 대비 상품수를 확인하세요. 경쟁이 적은 틈새 키워드가 매출의 핵심입니다.
                  </p>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-primary-500 mt-0.5 flex-shrink-0">*</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">태그 복사</strong> — 분석 결과에서 관련 키워드를 해시태그 형식으로 바로 복사할 수 있습니다.
                  </p>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-primary-500 mt-0.5 flex-shrink-0">*</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">엑셀 저장</strong> — 분석 결과를 엑셀 파일로 다운로드해서 키워드 목록을 관리하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 공유 */}
      <section className="mb-10">
        <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">친구에게 공유하기</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">유용하셨다면 공유해 주세요!</p>
          </div>
          <ShareButtons />
        </div>
      </section>

      {/* 댓글 */}
      <section className="mb-10">
        <Comments />
      </section>
    </div>
  );
}
