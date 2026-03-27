import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function ServicesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary-600 font-semibold tracking-widest uppercase text-sm">Services</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold font-jakarta text-gray-900 tracking-tight">반복 작업 없이, 데이터로 판단하세요</h2>
          <p className="mt-4 text-lg text-gray-500">직관적인 지표와 자동화된 리포트로 의사결정 속도를 높입니다.</p>
        </ScrollReveal>

        <div className="space-y-28">
          {/* Service 1: Blog keyword */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <ScrollReveal className="flex-1 order-2 md:order-1">
              <div className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-gray-100 p-6 overflow-hidden h-[400px] flex flex-col">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-50 mb-4">
                    <span className="text-sm font-bold text-gray-700">키워드 분석 리포트</span>
                    <span className="text-xs text-gray-400">8분 전 업데이트</span>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">검색량 (PC/MO)</span>
                      <span className="text-sm font-bold text-gray-900">12,400 / 45,100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">발행 문서 수</span>
                      <span className="text-sm font-bold text-gray-900">142,030</span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">경쟁 강도</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700">매우 높음</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="text-xs text-gray-400 mb-2">연관 추천 키워드</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-md text-xs font-medium">수면유도제</span>
                        <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-md text-xs font-medium">불면증 해결</span>
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">숙면 꿀팁</span>
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">깊은 수면</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal className="flex-1 order-1 md:order-2">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">블로그 키워드 분석</h3>
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                기존에 2시간씩 걸리던 키워드 발굴 작업을 <strong className="text-gray-900">키워드당 8분</strong>으로 단축합니다. 검색량, 문서 수, 경쟁 강도를 한 화면에서 확인하세요.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  PC / 모바일 검색량 통합 조회
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  실시간 포스팅 난이도 스코어링
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  롱테일 연관 키워드 자동 추출
                </li>
              </ul>
              <Link href="/blog-keyword" className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors">
                블로그 키워드 분석하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </ScrollReveal>
          </div>

          {/* Service 2: Seller keyword */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <ScrollReveal className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">셀러 키워드 분석</h3>
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                광고비 지출 전, 구매 전환율이 낮은 키워드를 미리 필터링하세요. 쇼핑 탭 적합도 점수(0-100점)로 실질적인 매출을 견인합니다.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  쇼핑 전환율 기반 키워드 필터링
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  신상품 노출을 위한 Top 10 키워드 자동 추출
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-accent-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  카테고리별 매칭 정확도 분석
                </li>
              </ul>
              <Link href="/seller-keyword" className="inline-flex items-center gap-1.5 mt-6 text-accent-600 font-semibold text-sm hover:text-accent-700 transition-colors">
                셀러 키워드 분석하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </ScrollReveal>
            <ScrollReveal className="flex-1">
              <div className="relative rounded-2xl bg-gradient-to-tr from-teal-50 to-white border border-gray-100 p-6 overflow-hidden h-[400px] flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-7 w-full max-w-xs text-center">
                  <div className="text-sm font-semibold text-gray-500 mb-3">쇼핑 탭 적합도 스코어</div>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path stroke="#f1f5f9" strokeWidth="3" fill="none" d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0-31.831" />
                      <path stroke="#0d9488" strokeWidth="3" fill="none" strokeLinecap="round" className="animate-dash-draw" d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0-31.831" strokeDasharray="0,100" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-extrabold text-gray-900">85</span>
                      <span className="text-[10px] text-gray-400 font-medium">최상위</span>
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 text-xs font-medium px-3 py-2 rounded-lg mb-4">
                    구매 의도가 매우 높은 키워드입니다
                  </div>
                  <div className="border-t border-gray-100 pt-3 text-xs text-gray-500 space-y-2 text-left">
                    <div className="flex justify-between"><span>예상 클릭당 단가</span><span className="font-semibold text-gray-700">450원</span></div>
                    <div className="flex justify-between"><span>최근 한 달 전환율</span><span className="font-semibold text-gray-700">3.2%</span></div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Service 3: Blog analysis */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <ScrollReveal className="flex-1 order-2 md:order-1">
              <div className="relative rounded-2xl bg-gradient-to-bl from-purple-50 to-white border border-gray-100 p-6 overflow-hidden h-[400px]">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full flex flex-col justify-center">
                  <div className="text-sm font-bold text-gray-800 text-center mb-6">내 블로그 vs 상위 1% 블로그</div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-600">포스팅 빈도</span>
                        <span className="text-red-500 font-medium">격차: -12%</span>
                      </div>
                      <div className="flex h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-primary-500" style={{ width: "60%" }} />
                        <div className="bg-gray-200" style={{ width: "40%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-600">체류 시간</span>
                        <span className="text-emerald-600 font-medium">우위: +5%</span>
                      </div>
                      <div className="flex h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-primary-500" style={{ width: "85%" }} />
                        <div className="bg-gray-200" style={{ width: "15%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-600">전문성 지수 (C-Rank)</span>
                        <span className="text-red-500 font-medium">격차: -35%</span>
                      </div>
                      <div className="flex h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-primary-500" style={{ width: "45%" }} />
                        <div className="bg-gray-200" style={{ width: "55%" }} />
                      </div>
                    </div>
                    <div className="mt-2 p-3.5 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="text-xs font-bold text-purple-800 mb-1">AI 인사이트</div>
                      <div className="text-xs text-purple-700 leading-relaxed">다음 달 랭킹 상승 잠재력이 높습니다. &apos;전문성 지수&apos;를 높이기 위해 한 주제로 심도 있는 포스팅을 3건 이상 추가하세요.</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal className="flex-1 order-1 md:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-md">BETA</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">블로그 지수 분석 + 경쟁 블로그 분석</h3>
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                내 블로그 지수를 10가지 세부 항목으로 채점하고, 상위 블로그와의 격차를 시각적으로 비교 분석합니다.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  10가지 다면 지표 기반 블로그 스코어링
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Top 5 경쟁 블로그와의 정밀 갭(Gap) 분석
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  다음 달 랭킹 상승 잠재력 AI 예측
                </li>
              </ul>
              <Link href="/blog-analysis" className="inline-flex items-center gap-1.5 mt-6 text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors">
                블로그 분석 시작하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
