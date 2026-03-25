"use client";

import { useEffect, useState } from "react";

interface TrendingItem {
  rank: number;
  keyword: string;
  traffic: string;
}

export default function TrendingKeywords() {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [trendLoading, setTrendLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchTrending = () => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.items || []);
        const now = new Date();
        setLastUpdate(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
      })
      .catch(() => setTrending([]))
      .finally(() => setTrendLoading(false));
  };

  useEffect(() => {
    fetchTrending();
    const interval = setInterval(fetchTrending, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">실시간 인기 검색어</h2>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-600">
            {lastUpdate && `${lastUpdate} 업데이트 · `}Google Trends
          </span>
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
  );
}
