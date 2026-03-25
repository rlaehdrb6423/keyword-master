"use client";

import { useState } from "react";
import KeywordInput from "@/components/KeywordInput";
import GradeBadge from "@/components/GradeBadge";
import DataSourceBadge from "@/components/DataSourceBadge";
import ErrorMessage from "@/components/ErrorMessage";
import type { SellerKeywordResult } from "@/types/keyword";

interface IndexEntry extends SellerKeywordResult {
  indexScore: number;
}

export default function SellerIndexPage() {
  const [entries, setEntries] = useState<IndexEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/keyword/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "분석에 실패했습니다.");
      }

      const data: SellerKeywordResult = await res.json();
      const indexScore =
        data.naverProductCount > 0
          ? (data.totalVolume / data.naverProductCount) * 100
          : data.totalVolume >= 10
          ? 9999
          : 0;

      setEntries((prev) => {
        const filtered = prev.filter((e) => e.keyword !== data.keyword);
        return [
          { ...data, indexScore: Math.round(indexScore * 100) / 100 },
          ...filtered,
        ];
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">셀러 지수</h1>
        <p className="text-gray-600">
          키워드별 시장 진입 가능성을 점수와 등급으로 표시합니다.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <KeywordInput
          onSearch={handleSearch}
          loading={loading}
          placeholder="셀러 지수를 확인할 상품 키워드 입력"
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
            <GradeBadge grade="A" /> <span className="text-gray-600">블루오션 (30+)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradeBadge grade="B" /> <span className="text-gray-600">유망 (10~30)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradeBadge grade="C" /> <span className="text-gray-600">보통 (3~10)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradeBadge grade="D" /> <span className="text-gray-600">레드오션 (3 미만)</span>
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
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {entry.grade === "N/A"
                  ? "-"
                  : entry.indexScore === 9999
                  ? "NEW"
                  : entry.indexScore}
              </div>
              <p className="text-sm text-gray-500 mb-3">{entry.gradeLabel}</p>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                <div>
                  <span className="text-gray-400">검색량</span>
                  <div className="font-medium">
                    {entry.totalVolume.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">네이버 상품</span>
                  <div className="font-medium">
                    {entry.naverProductCount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">쿠팡 상품</span>
                  <div className="font-medium">
                    {entry.coupangProductCount !== null
                      ? entry.coupangProductCount.toLocaleString()
                      : "N/A"}
                  </div>
                </div>
              </div>
              <DataSourceBadge sources={entry.dataSources} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
