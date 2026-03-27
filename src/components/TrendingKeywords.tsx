"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TrendingItem {
  rank: number;
  keyword: string;
  traffic: string;
}

export default function TrendingKeywords() {
  const [google, setGoogle] = useState<TrendingItem[]>([]);
  const [naver, setNaver] = useState<TrendingItem[]>([]);
  const [tab, setTab] = useState<"naver" | "google">("naver");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const router = useRouter();

  const fetchTrending = () => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        setGoogle(data.google || []);
        setNaver(data.naver || []);
        if ((data.naver || []).length === 0 && (data.google || []).length > 0) {
          setTab("google");
        }
        const now = new Date();
        setLastUpdate(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrending();
    const interval = setInterval(fetchTrending, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const items = tab === "naver" ? naver : google;

  const handleKeywordClick = (keyword: string) => {
    if (tab === "naver") {
      window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`, "_blank");
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`, "_blank");
    }
  };

  return (
    <section className="mb-10">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="font-bold text-gray-900 text-sm">실시간 인기 검색어</h2>
            {/* 탭 */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setTab("naver")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  tab === "naver"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Naver
              </button>
              <button
                onClick={() => setTab("google")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  tab === "google"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Google
              </button>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            {lastUpdate && `${lastUpdate} 업데이트`}
          </span>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-5 w-5 text-gray-300" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {items.map((item) => (
                <button
                  key={item.rank}
                  onClick={() => handleKeywordClick(item.keyword)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left w-full"
                >
                  <span className={`text-xs font-bold w-5 text-center ${
                    item.rank <= 3 ? "text-red-500" : "text-gray-300"
                  }`}>
                    {item.rank}
                  </span>
                  <span className="text-sm text-gray-700 flex-1 truncate hover:text-primary-600 transition-colors">
                    {item.keyword}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {item.traffic && (
                      <span className="text-[10px] text-gray-300 mr-1">
                        {item.traffic}
                      </span>
                    )}
                    <span
                      onClick={(e) => { e.stopPropagation(); router.push(`/blog-keyword?q=${encodeURIComponent(item.keyword)}`); }}
                      className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors cursor-pointer"
                      title="키워드 분석"
                    >
                      K
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-4 text-sm">
              {tab === "naver" ? "네이버" : "구글"} 트렌딩 데이터를 불러올 수 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
