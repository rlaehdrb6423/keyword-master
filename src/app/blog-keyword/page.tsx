"use client";

import { useState } from "react";
import KeywordInput from "@/components/KeywordInput";
import ResultTable, { gradeColumn } from "@/components/ResultTable";
import ErrorMessage from "@/components/ErrorMessage";
import type { BlogKeywordResult } from "@/types/keyword";

const columns = [
  { key: "keyword", label: "키워드", align: "left" as const },
  { key: "pcVolume", label: "PC 검색량", align: "right" as const },
  { key: "mobileVolume", label: "모바일 검색량", align: "right" as const },
  { key: "totalVolume", label: "총 검색량", align: "right" as const },
  { key: "blogDocCount", label: "블로그 문서수", align: "right" as const },
  { key: "ratio", label: "비율", align: "right" as const },
  gradeColumn,
];

export default function BlogKeywordPage() {
  const [result, setResult] = useState<BlogKeywordResult | null>(null);
  const [relatedResults, setRelatedResults] = useState<BlogKeywordResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setRelatedResults([]);

    try {
      const res = await fetch("/api/keyword/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "분석에 실패했습니다.");
      }

      const data: BlogKeywordResult = await res.json();
      setResult(data);

      // 관련 키워드도 분석 (상위 15개)
      if (data.relatedKeywords.length > 0) {
        const relatedPromises = data.relatedKeywords.slice(0, 15).map(async (kw) => {
          try {
            const r = await fetch("/api/keyword/blog", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ keyword: kw }),
            });
            if (r.ok) return r.json();
            return null;
          } catch {
            return null;
          }
        });

        const relatedData = await Promise.all(relatedPromises);
        setRelatedResults(relatedData.filter(Boolean));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const allResults = result ? [result, ...relatedResults] : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          블로그 키워드 분석
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          네이버 검색량 대비 블로그 문서수를 분석하여 상위노출 가능성을 평가합니다.
        </p>
      </div>

      <div className="card p-6 mb-6">
        <KeywordInput
          onSearch={handleSearch}
          loading={loading}
          placeholder="분석할 키워드를 입력하세요 (예: 다이어트)"
        />
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onRetry={() => result && handleSearch(result.keyword)} />
        </div>
      )}

      {result && (
        <>
          {/* 관련 키워드 태그 */}
          {result.relatedKeywords.length > 0 && (
            <div className="card p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">관련 키워드</h3>
              <div className="flex flex-wrap gap-2">
                {result.relatedKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleSearch(kw)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-300 transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">분석 결과</h2>
            </div>
            <ResultTable
              columns={columns}
              data={allResults as unknown as Record<string, unknown>[]}
            />
          </div>
        </>
      )}
    </div>
  );
}
