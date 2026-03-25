"use client";

import { useState, FormEvent } from "react";
import ErrorMessage from "@/components/ErrorMessage";

interface StoreLevelResult {
  storeId: string;
  storeName: string;
  totalProducts: number;
  recentProducts: { title: string; link: string }[];
  searchVisibility: number;
  level: number;
  levelLabel: string;
  tips: string[];
}

const levelColors = [
  "bg-gray-400", "bg-gray-500", "bg-yellow-500", "bg-yellow-400",
  "bg-green-400", "bg-green-500", "bg-blue-400", "bg-blue-500",
  "bg-purple-400", "bg-purple-500", "bg-red-500",
];

export default function SellerIndexPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<StoreLevelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/store-level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId: trimmed }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "분석에 실패했습니다.");
      }

      const data: StoreLevelResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">셀러 지수</h1>
        <p className="text-gray-600 dark:text-gray-400">
          네이버 스마트스토어의 기본 지수 확인과 함께 상품별 상세 분석이 가능합니다.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          smartstore.naver.com/storeId 형식 또는 storeId만 입력 가능합니다.
        </p>
      </div>

      <div className="card p-6 mb-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="스토어 ID 또는 URL (예: smartstore.naver.com/myStore)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                분석중
              </span>
            ) : (
              "분석"
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* 레벨 등급 안내 */}
      <div className="card p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">셀러 지수 등급 (11단계)</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className={`inline-block w-8 h-6 rounded text-xs font-bold text-white flex items-center justify-center ${levelColors[i]}`}>
                {i}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>셀러 지수를 올리기 위해서는 꾸준한 상품 등록과 키워드 최적화가 중요합니다.</p>
          <p>리뷰 관리와 상품명 SEO는 검색 노출에 핵심적인 요소입니다.</p>
        </div>
      </div>

      {result && (
        <>
          {/* 레벨 결과 카드 */}
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{result.storeName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{result.storeId}</p>
              </div>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${levelColors[result.level]}`}>
                  {result.level}
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{result.levelLabel}</p>
              </div>
            </div>

            {/* 레벨 바 */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
                <span>Level 0</span>
                <span>Level 10</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${levelColors[result.level]}`}
                  style={{ width: `${(result.level / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* 상세 지표 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{result.totalProducts}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">총 상품수</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.searchVisibility}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">검색 노출률</div>
              </div>
            </div>
          </div>

          {/* 팁 */}
          <div className="card p-5 mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">분석 및 추천</h3>
            <ul className="space-y-2">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-primary-500 mt-0.5">*</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* 최근 상품 */}
          {result.recentProducts.length > 0 && (
            <div className="card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">등록 상품</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {result.recentProducts.map((product, i) => (
                  <div key={i} className="px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {product.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
