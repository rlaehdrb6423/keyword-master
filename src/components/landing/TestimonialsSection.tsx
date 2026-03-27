import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-primary-50/40 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-bold font-jakarta text-gray-900 tracking-tight">먼저 써본 사람들의 실제 이야기</h2>
          <p className="mt-3 text-lg text-gray-500">데이터가 만드는 확실한 변화를 경험하고 있습니다.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
          {/* Review 1 */}
          <ScrollReveal>
            <div className="card-hover bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden h-full">
              <svg className="absolute top-5 left-5 w-12 h-12 text-primary-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <div className="relative">
                <p className="text-base text-gray-600 leading-relaxed italic mb-7">
                  &ldquo;키워드 찾고 분석하는 데만 하루가 시작됐었는데, 이제 10분 안에 끝납니다. 어떤 글을 써야 노출될지 명확해지니 스트레스가 확 줄었어요. 덕분에 <strong className="text-gray-900 bg-primary-50 px-1 rounded not-italic">블로그 방문자 트래픽이 2.3배 상승</strong>했습니다.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">박</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">박지수</div>
                    <div className="text-xs text-gray-400">뷰티 수익형 블로그 운영자 (8개월 차)</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Review 2 */}
          <ScrollReveal>
            <div className="card-hover bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden h-full">
              <svg className="absolute top-5 left-5 w-12 h-12 text-accent-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <div className="relative">
                <p className="text-base text-gray-600 leading-relaxed italic mb-7">
                  &ldquo;기존에 쓰던 키워드 중 37%가 실제 구매 전환이 거의 없는 키워드라는 걸 처음 발견했습니다. 교체 후 <strong className="text-gray-900 bg-accent-50 px-1 rounded not-italic">광고 클릭당 전환율이 1.2% → 3.1%로 뛰었어요.</strong> 데이터를 사람 언어로 번역해주는 느낌입니다.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-400 to-accent-600 flex items-center justify-center text-white font-bold text-sm">김</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">김태현</div>
                    <div className="text-xs text-gray-400">생활용품 스마트스토어 운영자 (월 매출 2,800만 원)</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
