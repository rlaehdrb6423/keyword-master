import ScrollReveal from "./ScrollReveal";

export default function ProblemSection() {
  return (
    <section id="solution" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-3">혹시 이런 상황?</p>
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-gray-900 tracking-tight">
            감에 의존하는 방식은<br />시간과 기회를 낭비합니다
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <ScrollReveal>
            <div className="card-hover bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">
                2~3<span className="text-lg font-semibold text-gray-400">시간</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">키워드 조사에 매일 소모</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                탭 10개 열어놓고 복붙하다 반나절이 지납니다. 그렇게 고른 키워드가 맞는지는 글 올려봐야 알고, 틀리면 처음부터 다시 시작합니다.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal>
            <div className="card-hover bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">
                3개월<span className="text-lg font-semibold text-gray-400">째 정체</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">노력해도 늘지 않는 트래픽</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                포스팅 수는 늘어나는데 방문자는 제자리. 내 블로그 지수가 어느 수준인지, 어떤 키워드를 공략해야 하는지 기준 자체가 없습니다.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal>
            <div className="card-hover bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">
                항상<span className="text-lg font-semibold text-gray-400"> 나보다 위</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">경쟁사에 밀리는 상품 노출</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                상세페이지도, 가격도 비슷한데 저 셀러는 왜 항상 상단에? 경쟁자가 어떤 키워드를 쓰는지 들여다볼 방법이 없었습니다. 지금까지는요.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
