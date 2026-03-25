"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Comments from "@/components/Comments";

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
    description: "네이버쇼핑 상품수 대비 검색량 비교 분석",
    icon: "🛒",
    color: "border-green-200 hover:border-green-400 bg-green-50/50 dark:border-green-800 dark:hover:border-green-600 dark:bg-green-950/30",
  },
  {
    href: "/blog-index",
    title: "블로그 지수",
    description: "네이버 블로그 레벨 분석 (11단계 지수)",
    icon: "📊",
    color: "border-purple-200 hover:border-purple-400 bg-purple-50/50 dark:border-purple-800 dark:hover:border-purple-600 dark:bg-purple-950/30",
  },
  {
    href: "/seller-index",
    title: "셀러 지수",
    description: "네이버 스마트스토어 레벨 분석 (11단계 지수)",
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
          KeywordView
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          블로거 & 셀러를 위한 키워드를 한눈에
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
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {item.traffic && (
                      <span className="text-xs text-gray-400 dark:text-gray-500 mr-1">
                        {item.traffic}
                      </span>
                    )}
                    <a
                      href={`https://search.naver.com/search.naver?query=${encodeURIComponent(item.keyword)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60 transition-colors"
                    >
                      N
                    </a>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(item.keyword)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60 transition-colors"
                    >
                      G
                    </a>
                  </div>
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

      {/* 사용 가이드 */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            이렇게 사용하세요
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl mb-2">1</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">키워드 분석</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                "다이어트", "텀블러" 같은 키워드를 입력하면 검색량, 경쟁도, 등급을 한눈에 볼 수 있어요.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl mb-2">2</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">지수 확인</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                블로그 ID나 스마트스토어 ID를 입력하면 11단계 레벨과 SEO 점수를 분석해줍니다.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl mb-2">3</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">전략 수립</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A등급 키워드를 찾아 블로그 포스팅이나 상품 등록에 활용하세요. 경쟁이 낮을수록 유리합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="mt-8 max-w-4xl mx-auto">
        <Comments />
      </div>

      <div className="mt-8 text-center text-sm text-gray-400 dark:text-gray-500">
        <p>네이버 검색광고 API + 네이버 검색 API 기반 | 모든 기능 무료</p>
      </div>
    </div>
  );
}
