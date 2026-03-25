"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import KeywordInput from "@/components/KeywordInput";
import ShareButtons from "@/components/ShareButtons";
import ResultTable, { gradeColumn } from "@/components/ResultTable";
import GradeBadge from "@/components/GradeBadge";
import ErrorMessage from "@/components/ErrorMessage";
import SearchHistory, { addToHistory } from "@/components/SearchHistory";
import { PcMobileChart, ChannelShareChart, CompareBarChart } from "@/components/KeywordCharts";
import SkeletonTable from "@/components/SkeletonTable";
import GradeGuide from "@/components/GradeGuide";
import TagGenerator from "@/components/TagGenerator";
import type { BlogKeywordResult, Grade } from "@/types/keyword";

const columns = [
  { key: "keyword", label: "키워드", align: "left" as const },
  { key: "pcVolume", label: "PC", align: "right" as const },
  { key: "mobileVolume", label: "모바일", align: "right" as const },
  { key: "totalVolume", label: "총 검색량", align: "right" as const },
  { key: "blogDocCount", label: "블로그", align: "right" as const },
  { key: "newsCount", label: "뉴스", align: "right" as const },
  { key: "cafeCount", label: "카페", align: "right" as const },
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
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareResult, setCompareResult] = useState<BlogKeywordResult | null>(null);
  const [compareLoading, setCompareLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !result && !loading) {
      handleSearch(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = async (keyword: string) => {
    router.replace(`/blog-keyword?q=${encodeURIComponent(keyword)}`, { scroll: false });
    setLoading(true);
    setLoadingStatus("검색량 확인 중");
    setError(null);
    setResult(null);
    setRelatedResults([]);
    setCompareResult(null);

    try {
      addToHistory(keyword, "blog");
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
      setLoadingStatus("관련 키워드 분석 중");

      if (data.relatedKeywords.length > 0) {
        try {
          const bulkRes = await fetch("/api/keyword/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              keywords: data.relatedKeywords.slice(0, 10),
              type: "blog",
            }),
          });
          if (bulkRes.ok) {
            const bulkData = await bulkRes.json();
            setRelatedResults(bulkData.results || []);
          }
        } catch {}
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setLoadingStatus("");
    }
  };

  const handleCompare = async (keyword: string) => {
    setCompareLoading(true);
    try {
      const res = await fetch("/api/keyword/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });
      if (res.ok) {
        const data: BlogKeywordResult = await res.json();
        setCompareResult(data);
      }
    } catch {} finally {
      setCompareLoading(false);
    }
  };

  const allResults = result ? [result, ...relatedResults] : [];

  const compareData = result && compareResult ? [
    { label: "총 검색량", value1: result.totalVolume, value2: compareResult.totalVolume },
    { label: "블로그", value1: result.blogDocCount, value2: compareResult.blogDocCount },
    { label: "뉴스", value1: result.newsCount, value2: compareResult.newsCount },
    { label: "카페", value1: result.cafeCount, value2: compareResult.cafeCount },
  ] : [];

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
        <SearchHistory type="blog" onSelect={handleSearch} />
      </div>

      {loading && <SkeletonTable rows={5} cols={8} statusText={loadingStatus} />}

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onRetry={() => result && handleSearch(result.keyword)} />
        </div>
      )}

      {result && (
        <>
          {/* 시각화 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* PC/모바일 비율 */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">PC / 모바일 비율</h3>
              <PcMobileChart pcVolume={result.pcVolume} mobileVolume={result.mobileVolume} />
            </div>

            {/* 채널별 점유율 */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">채널별 콘텐츠 점유율</h3>
              <ChannelShareChart
                blogCount={result.blogDocCount}
                newsCount={result.newsCount}
                cafeCount={result.cafeCount}
                webDocCount={result.webDocCount}
              />
            </div>
          </div>

          {/* 채널별 경쟁도 숫자 카드 */}
          <div className="card p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                "{result.keyword}" 종합 경쟁 현황
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">종합 경쟁도:</span>
                <GradeBadge grade={result.competitionGrade as Grade} label={result.competitionLabel} />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{result.blogDocCount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">블로그</div>
              </div>
              <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{result.newsCount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">뉴스</div>
              </div>
              <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{result.cafeCount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">카페</div>
              </div>
              <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{result.webDocCount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">웹문서</div>
              </div>
              <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{result.totalCompetition.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">합계</div>
              </div>
            </div>
          </div>

          {/* 키워드 비교 */}
          <div className="card p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">키워드 비교</h3>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  compareMode
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {compareMode ? "비교 닫기" : "비교하기"}
              </button>
            </div>
            {compareMode && (
              <div>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1">
                    <div className="text-xs text-blue-500 mb-1">키워드 1: {result.keyword}</div>
                  </div>
                  <div className="flex-1">
                    <KeywordInput
                      onSearch={handleCompare}
                      loading={compareLoading}
                      placeholder="비교할 키워드 입력"
                    />
                  </div>
                </div>
                {compareResult && (
                  <CompareBarChart
                    data={compareData}
                    name1={result.keyword}
                    name2={compareResult.keyword}
                  />
                )}
              </div>
            )}
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

          <TagGenerator keywords={result.relatedKeywords} />

          <GradeGuide />

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

          <div className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              &ldquo;{result.keyword}&rdquo; 분석 결과 공유하기
            </span>
            <ShareButtons
              title={`"${result.keyword}" 블로그 키워드 분석 - KeywordView`}
              description={`검색량 ${result.totalVolume.toLocaleString()} · 종합경쟁 ${result.competitionLabel}`}
              path={`/blog-keyword?q=${encodeURIComponent(result.keyword)}`}
            />
          </div>
        </>
      )}
    </div>
  );
}
