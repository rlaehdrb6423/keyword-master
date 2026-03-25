"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Comments from "@/components/Comments";

interface TrendingItem {
  rank: number;
  keyword: string;
  traffic: string;
}

export default function Home() {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [trendLoading, setTrendLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => setTrending(data.items || []))
      .catch(() => setTrending([]))
      .finally(() => setTrendLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
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
        </div>
      </section>

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

      {/* 실시간 인기 검색어 */}
      <section className="mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">실시간 인기 검색어</h2>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-600">Google Trends</span>
          </div>
          <div className="p-4">
            {trendLoading ? (
              <div className="flex items-center justify-center py-8">
                <svg className="animate-spin h-5 w-5 text-gray-300" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : trending.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {trending.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <span className={`text-xs font-bold w-5 text-center ${
                      item.rank <= 3 ? "text-red-500" : "text-gray-300 dark:text-gray-600"
                    }`}>
                      {item.rank}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                      {item.keyword}
                    </span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {item.traffic && (
                        <span className="text-[10px] text-gray-300 dark:text-gray-600 mr-1">
                          {item.traffic}
                        </span>
                      )}
                      <a
                        href={`https://search.naver.com/search.naver?query=${encodeURIComponent(item.keyword)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 transition-colors"
                      >
                        N
                      </a>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(item.keyword)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition-colors"
                      >
                        G
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 dark:text-gray-500 py-4 text-sm">
                트렌딩 데이터를 불러올 수 없습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 사용 가이드 */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="absolute top-5 right-5 text-4xl font-black text-gray-100 dark:text-gray-800">01</div>
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">키워드 입력</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                분석하고 싶은 키워드를 입력하면 검색량과 경쟁도를 바로 확인할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="absolute top-5 right-5 text-4xl font-black text-gray-100 dark:text-gray-800">02</div>
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">데이터 분석</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                채널별 경쟁도, PC/모바일 비율, 관련 키워드를 차트와 함께 분석합니다.
              </p>
            </div>
          </div>
          <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="absolute top-5 right-5 text-4xl font-black text-gray-100 dark:text-gray-800">03</div>
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">전략 수립</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                경쟁이 낮은 A등급 키워드를 찾아 블로그와 스토어에 바로 활용하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 댓글 */}
      <section className="mb-10">
        <Comments />
      </section>

      {/* 푸터 */}
      <footer className="text-center pb-8">
        <p className="text-xs text-gray-300 dark:text-gray-700">
          KeywordView &middot; 네이버 검색광고 API + 검색 API 기반 &middot; 모든 기능 무료
        </p>
      </footer>
    </div>
  );
}
