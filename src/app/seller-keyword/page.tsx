"use client";

import { useState } from "react";
import KeywordInput from "@/components/KeywordInput";
import ResultTable, { gradeColumn } from "@/components/ResultTable";
import ErrorMessage from "@/components/ErrorMessage";
import DataSourceBadge from "@/components/DataSourceBadge";
import type { SellerKeywordResult } from "@/types/keyword";

const columns = [
  { key: "keyword", label: "키워드", align: "left" as const },
  { key: "totalVolume", label: "총 검색량", align: "right" as const },
  { key: "naverProductCount", label: "네이버 상품수", align: "right" as const },
  {
    key: "coupangProductCount",
    label: "쿠팡 상품수",
    align: "right" as const,
    render: (value: unknown) =>
      value !== null ? Number(value).toLocaleString("ko-KR") : "N/A",
  },
  { key: "naverRatio", label: "네이버 비율", align: "right" as const },
  {
    key: "coupangRatio",
    label: "쿠팡 비율",
    align: "right" as const,
    render: (value: unknown) => (value !== null ? String(value) : "N/A"),
  },
  gradeColumn,
  {
    key: "dataSources",
    label: "데이터 소스",
    align: "center" as const,
    render: (value: unknown) => (
      <DataSourceBadge sources={value as string[]} />
    ),
  },
];

export default function SellerKeywordPage() {
  const [results, setResults] = useState<SellerKeywordResult[]>([]);
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
      setResults((prev) => {
        const filtered = prev.filter((r) => r.keyword !== data.keyword);
        return [data, ...filtered];
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          셀러 키워드 분석
        </h1>
        <p className="text-gray-600">
          네이버쇼핑/쿠팡 상품수 대비 검색량을 분석하여 시장 진입 가능성을 평가합니다.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <KeywordInput
          onSearch={handleSearch}
          loading={loading}
          placeholder="분석할 상품 키워드를 입력하세요 (예: 텀블러)"
        />
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">분석 결과</h2>
            <p className="text-xs text-gray-500 mt-1">
              셀러 지수는 네이버쇼핑 데이터 기준입니다. 쿠팡 데이터는 참고용입니다.
            </p>
          </div>
          <ResultTable
            columns={columns}
            data={results as unknown as Record<string, unknown>[]}
          />
        </div>
      )}
    </div>
  );
}
