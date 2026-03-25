"use client";

import { useState } from "react";
import KeywordInput from "@/components/KeywordInput";
import ResultTable, { gradeColumn } from "@/components/ResultTable";
import GradeBadge from "@/components/GradeBadge";
import ErrorMessage from "@/components/ErrorMessage";
import type { BlogKeywordResult, Grade } from "@/types/keyword";

const columns = [
  { key: "keyword", label: "키워드", align: "left" as const },
  { key: "pcVolume", label: "PC 검색량", align: "right" as const },
  { key: "mobileVolume", label: "모바일 검색량", align: "right" as const },
  { key: "totalVolume", label: "총 검색량", align: "right" as const },
  { key: "blogDocCount", label: "블로그", align: "right" as const },
  { key: "newsCount", label: "뉴스", align: "right" as const },
  { key: "cafeCount", label: "카페", align: "right" as const },
  { key: "webDocCount", label: "웹문서", align: "right" as const },
  { key: "ratio", label: "비율", align: "right" as const },
  gradeColumn,
  {
    key: "competitionGrade",
    label: "종합경쟁",
    align: "center" as const,
    render: (value: unknown, row: Record<string, unknown>) => (
      <GradeBadge grade={value as Grade} label={row.competitionLabel as string} />
    ),
  },
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
          네이버 검색량 대비 블로그/뉴스/카페/웹문서 경쟁도를 종합 분석합니다.
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
          {/* 채널별 경쟁도 요약 카드 */}
          <div className="card p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              "{result.keyword}" 채널별 경쟁 현황
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {result.blogDocCount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">블로그</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">
                  {result.newsCount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">뉴스</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {result.cafeCount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">카페</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {result.webDocCount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">웹문서</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {result.totalCompetition.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">종합 경쟁</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">종합 경쟁도:</span>
              <GradeBadge grade={result.competitionGrade as Grade} label={result.competitionLabel} />
            </div>
          </div>

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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                종합경쟁 = 블로그+뉴스+카페+웹문서 대비 검색량 비율
              </p>
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
