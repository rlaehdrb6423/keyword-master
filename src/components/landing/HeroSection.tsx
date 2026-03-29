import DashboardMockup from "./DashboardMockup";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-28 overflow-hidden">
      {/* BG blobs */}
      <div className="blob w-[600px] h-[600px] bg-blue-100/60 top-[-15%] left-[-10%]" />
      <div className="blob w-[500px] h-[500px] bg-teal-100/50 bottom-[-10%] right-[-8%]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-8 border border-primary-100">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse-opacity" />
          셀러 분석 엔진 v2.0 출시
        </div>

        {/* H1 */}
        <h1 className="animate-fade-up-2 text-3xl sm:text-5xl md:text-6xl font-extrabold font-jakarta tracking-tight text-gray-900 leading-[1.15] mb-6">
          키워드 분석,<br className="hidden md:block" />
          이제 <span className="gradient-text">클릭 한 번으로</span> 끝납니다
        </h1>

        {/* Sub */}
        <p className="animate-fade-up-3 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 leading-relaxed">
          블로그 상위노출부터 스마트스토어 셀러 키워드까지 —<br className="hidden md:block" />
          하루 3시간씩 쓰던 리서치를 자동화하세요.<br className="hidden md:block" />
          데이터 기반으로 경쟁자보다 먼저 기회를 잡습니다.
        </p>

        {/* CTA */}
        <div className="animate-fade-up-4 mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 w-full sm:w-auto justify-center"
          >
            무료로 키워드 분석 시작하기
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <p className="animate-fade-up-5 mt-3 text-sm text-gray-400">100% 무료 · 가입 없이 바로 분석</p>

        {/* Dashboard mockup */}
        <div className="animate-fade-up-5 mt-20 mx-auto max-w-5xl">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
