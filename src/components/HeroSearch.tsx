"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();
  const [heroTab, setHeroTab] = useState<"blog" | "seller">("blog");
  const [heroQuery, setHeroQuery] = useState("");

  function handleHeroSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = heroQuery.trim();
    if (!q) return;
    const path = heroTab === "blog" ? "/blog-keyword" : "/seller-keyword";
    router.push(`${path}?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="mt-8 max-w-lg mx-auto">
      <div className="flex gap-1 mb-3 p-1 rounded-xl bg-gray-100 w-fit mx-auto">
        <button
          type="button"
          onClick={() => setHeroTab("blog")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            heroTab === "blog"
              ? "bg-white text-primary-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          블로그 키워드
        </button>
        <button
          type="button"
          onClick={() => setHeroTab("seller")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            heroTab === "seller"
              ? "bg-white text-primary-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          셀러 키워드
        </button>
      </div>
      <form onSubmit={handleHeroSearch} className="flex gap-2">
        <input
          type="text"
          value={heroQuery}
          onChange={(e) => setHeroQuery(e.target.value)}
          placeholder={heroTab === "blog" ? "블로그 키워드를 입력하세요" : "셀러 키워드를 입력하세요"}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500:ring-primary-400 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          분석
        </button>
      </form>
    </div>
  );
}
