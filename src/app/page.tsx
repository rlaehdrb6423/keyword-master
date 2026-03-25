"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface TrendingItem {
  rank: number;
  keyword: string;
  traffic: string;
}

const features = [
  {
    href: "/blog-keyword",
    title: "블로그 키워드 분석",
    description: "네이버 검색량, 블로그 문서 수, 경쟁도 분석",
    icon: "📝",
    color: "border-blue-200 hover:border-blue-400 bg-blue-50/50 dark:border-blue-800 dark:hover:border-blue-600 dark:bg-blue-950/30",
  },
  {
    href: "/seller-keyword",
    title: "셀러 키워드 분석",
    description: "네이버쇼핑/쿠팡 상품수 대비 검색량 비교",
    icon: "🛒",
    color: "border-green-200 hover:border-green-400 bg-green-50/50 dark:border-green-800 dark:hover:border-green-600 dark:bg-green-950/30",
  },
  {
    href: "/blog-index",
    title: "블로그 지수",
    description: "키워드별 상위노출 난이도 A~D 등급 분석",
    icon: "📊",
    color: "border-purple-200 hover:border-purple-400 bg-purple-50/50 dark:border-purple-800 dark:hover:border-purple-600 dark:bg-purple-950/30",
  },
  {
    href: "/seller-index",
    title: "셀러 지수",
    description: "키워드별 시장 진입 가능성 A~D 등급 분석",
    icon: "💰",
    color: "border-orange-200 hover:border-orange-400 bg-orange-50/50 dark:border-orange-800 dark:hover:border-orange-600 dark:bg-orange-950/30",
  },
];

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
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          KeywordMaster
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          블로거 & 셀러를 위한 키워드 분석 도구
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className={`block p-6 rounded-xl border-2 transition-all ${feature.color}`}
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {feature.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* 실시간 인기 검색어 */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔥</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">실시간 인기 검색어</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">Google Trends KR</span>
          </div>
          {trendLoading ? (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-6 w-6 text-primary-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : trending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {trending.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className={`text-sm font-bold w-6 text-center ${
                    item.rank <= 3 ? "text-red-500" : "text-gray-400 dark:text-gray-500"
                  }`}>
                    {item.rank}
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 flex-1">
                    {item.keyword}
                  </span>
                  {item.traffic && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {item.traffic}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 dark:text-gray-500 py-4">
              트렌딩 데이터를 불러올 수 없습니다.
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500">
        <p>네이버 검색광고 API + 네이버 검색 API 기반</p>
        <p className="mt-1">※ 지수 등급 임계값은 초기 추정치이며, 실데이터 기반으로 조정 예정</p>
      </div>
    </div>
  );
}
