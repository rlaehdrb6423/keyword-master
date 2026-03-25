"use client";

import { useState } from "react";
import KeywordInput from "@/components/KeywordInput";
import GradeBadge from "@/components/GradeBadge";
import ErrorMessage from "@/components/ErrorMessage";
import type { BlogKeywordResult } from "@/types/keyword";

interface IndexEntry extends BlogKeywordResult {
  indexScore: number;
}

export default function BlogIndexPage() {
  const [entries, setEntries] = useState<IndexEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    setError(null);

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
      const indexScore =
        data.blogDocCount > 0
          ? (data.totalVolume / data.blogDocCount) * 100
          : 0;

      setEntries((prev) => {
        const filtered = prev.filter((e) => e.keyword !== data.keyword);
        return [{ ...data, indexScore: Math.round(indexScore * 100) / 100 }, ...filtered];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">블로그 지수</h1>
        <p className="text-gray-600">
          키워드별 블로그 상위노출 난이도를 점수와 등급으로 표시합니다.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <KeywordInput
          onSearch={handleSearch}
          loading={loading}
          placeholder="블로그 지수를 확인할 키워드 입력"
        />
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* 등급 안내 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">등급 기준</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <GradeBadge grade="A" /> <span className="text-gray-600">매우 좋음 (50+)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradeBadge grade="B" /> <span className="text-gray-600">좋음 (20~50)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradeBadge grade="C" /> <span className="text-gray-600">보통 (5~20)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradeBadge grade="D" /> <span className="text-gray-600">어려움 (5 미만)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradeBadge grade="N/A" /> <span className="text-gray-600">데이터 부족</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">※ 임계값은 초기 추정치이며 조정 예정</p>
      </div>

      {/* 지수 카드 */}
      {entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <div
              key={entry.keyword}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg">
                  {entry.keyword}
                </h3>
                <GradeBadge grade={entry.grade} />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {entry.grade === "N/A" ? "-" : entry.indexScore}
              </div>
              <p className="text-sm text-gray-500 mb-3">{entry.gradeLabel}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="text-gray-400">검색량</span>
                  <div className="font-medium">{entry.totalVolume.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">문서수</span>
                  <div className="font-medium">{entry.blogDocCount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
