"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  const router = useRouter();
  const [tab, setTab] = useState<"blog" | "seller">("blog");
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const path = tab === "blog" ? "/blog-keyword" : "/seller-keyword";
    router.push(`${path}?q=${encodeURIComponent(q)}`);
  }

  return (
    <section id="cta" className="py-24 bg-white relative overflow-hidden">
      <div className="blob w-96 h-96 bg-primary-500/10 top-1/2 left-0 -translate-y-1/2 -translate-x-1/2" />
      <div className="blob w-96 h-96 bg-accent-500/10 top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />

      <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold font-jakarta text-white mb-5 tracking-tight">오늘 딱 하나만 해보세요</h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            지금 분석하고 싶은 키워드를 입력해 보세요.<br />
            리포트는 <strong className="text-white">바로</strong> 나옵니다. 첫 분석은 무료입니다.<br />
            <span className="text-white font-semibold">가입도, 카드 등록도 필요 없습니다.</span>
          </p>

          {/* Tab */}
          <div className="flex gap-1 mb-4 p-1 rounded-xl bg-white/10 w-fit mx-auto">
            <button
              type="button"
              onClick={() => setTab("blog")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                tab === "blog"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              블로그 키워드
            </button>
            <button
              type="button"
              onClick={() => setTab("seller")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                tab === "seller"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              셀러 키워드
            </button>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white p-2 rounded-xl flex flex-col sm:flex-row gap-2 shadow-xl mb-7">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3 sm:py-0">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tab === "blog" ? "분석할 블로그 키워드 입력..." : "분석할 셀러 키워드 입력..."}
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex-none bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 sm:py-3 px-7 rounded-lg transition-colors whitespace-nowrap text-sm"
            >
              무료 분석 시작하기
            </button>
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>신용카드 불필요</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>가입 즉시 사용 가능</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>첫 리포트 무료 제공</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
