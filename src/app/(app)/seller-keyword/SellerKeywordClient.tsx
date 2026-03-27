"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import KeywordInput from "@/components/KeywordInput";
import ShareButtons from "@/components/ShareButtons";
import ResultTable, { gradeColumn } from "@/components/ResultTable";
import GradeBadge from "@/components/GradeBadge";
import ErrorMessage from "@/components/ErrorMessage";
import SearchHistory, { addToHistory } from "@/components/SearchHistory";
import { PcMobileChart, ChannelShareChart, CompareBarChart, CompetitionRadar, KeywordBubbleChart } from "@/components/KeywordCharts";
import SkeletonTable from "@/components/SkeletonTable";
import GradeGuide from "@/components/GradeGuide";
import TagGenerator from "@/components/TagGenerator";
import type { SellerKeywordResult, Grade } from "@/types/keyword";

const columns = [
  { key: "keyword", label: "키워드", align: "left" as const },
  { key: "pcVolume", label: "PC", align: "right" as const },
  { key: "mobileVolume", label: "모바일", align: "right" as const },
  { key: "totalVolume", label: "총 검색량", align: "right" as const },
  { key: "naverProductCount", label: "상품수", align: "right" as const },
  { key: "blogCount", label: "블로그", align: "right" as const },
  { key: "naverRatio", label: "비율", align: "right" as const },
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

export default function SellerKeywordPage() {
  const [result, setResult] = useState<SellerKeywordResult | null>(null);
  const [relatedResults, setRelatedResults] = useState<SellerKeywordResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareResult, setCompareResult] = useState<SellerKeywordResult | null>(null);
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
    router.replace(`/seller-keyword?q=${encodeURIComponent(keyword)}`, { scroll: false });
    setLoading(true);
    setLoadingStatus("검색량 확인 중");
    setError(null);
    setResult(null);
    setRelatedResults([]);
    setCompareResult(null);

    try {
      addToHistory(keyword, "seller");
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
      setResult(data);
      setLoadingStatus("관련 키워드 분석 중");

      if (data.relatedKeywords && data.relatedKeywords.length > 0) {
        try {
          const bulkRes = await fetch("/api/keyword/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              keywords: data.relatedKeywords.slice(0, 10),
              type: "seller",
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
      const res = await fetch("/api/keyword/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });
      if (res.ok) {
        const data: SellerKeywordResult = await res.json();
        setCompareResult(data);
      }
    } catch {} finally {
      setCompareLoading(false);
    }
  };

  const allResults = result ? [result, ...relatedResults] : [];

  const compareData = result && compareResult ? [
    { label: "총 검색량", value1: result.totalVolume, value2: compareResult.totalVolume },
    { label: "상품수", value1: result.naverProductCount, value2: compareResult.naverProductCount },
    { label: "블로그", value1: result.blogCount, value2: compareResult.blogCount },
    { label: "뉴스", value1: result.newsCount, value2: compareResult.newsCount },
  ] : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          셀러 키워드 분석
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          네이버쇼핑 상품수 대비 검색량과 채널별 경쟁도를 종합 분석합니다.
        </p>
      </div>

      <div className="card p-6 mb-6">
        <KeywordInput
          onSearch={handleSearch}
          loading={loading}
          placeholder="분석할 상품 키워드를 입력하세요 (예: 텀블러)"
        />
        <SearchHistory type="seller" onSelect={handleSearch} />
      </div>

      {loading && <SkeletonTable rows={5} cols={7} statusText={loadingStatus} />}

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {result && (
        <>
          {/* 검색 키워드 sticky 바 */}
          <div className="sticky top-16 z-40 -mx-4 px-4 py-3 mb-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">분석 키워드</span>
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">&ldquo;{result.keyword}&rdquo;</span>
              <GradeBadge grade={result.grade} />
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                검색량 {result.totalVolume.toLocaleString()} · 상품수 {result.naverProductCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 시각화 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">PC / 모바일 비율</h3>
              <PcMobileChart pcVolume={result.pcVolume} mobileVolume={result.mobileVolume} />
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">채널별 콘텐츠 점유율</h3>
              <ChannelShareChart
                blogCount={result.blogCount}
                newsCount={result.newsCount}
                cafeCount={result.cafeCount}
                webDocCount={result.naverProductCount}
              />
            </div>
          </div>

          {/* 추가 시각화 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">채널별 경쟁도</h3>
              <CompetitionRadar
                blogCount={result.blogCount}
                newsCount={result.newsCount}
                cafeCount={result.cafeCount}
                webDocCount={result.naverProductCount}
                totalVolume={result.totalVolume}
              />
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">관련 키워드 검색량</h3>
              <KeywordBubbleChart
                keywords={allResults.map((r) => ({ keyword: r.keyword, totalVolume: r.totalVolume, grade: r.grade }))}
              />
            </div>
          </div>

          {/* 채널별 경쟁도 숫자 카드 */}
          <div className="card p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                &ldquo;{result.keyword}&rdquo; 종합 경쟁 현황
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">종합 경쟁도:</span>
                <GradeBadge grade={result.competitionGrade as Grade} label={result.competitionLabel} />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20">
                  <svg className="w-3 h-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-[11px] font-bold text-primary-700 dark:text-primary-300">
                    상위 노출 확률 {result.successRate}%
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-green-600 dark:text-green-400 truncate">{result.naverProductCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">쇼핑 상품</div>
              </div>
              <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-blue-600 dark:text-blue-400 truncate">{result.blogCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">블로그</div>
              </div>
              <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-red-600 dark:text-red-400 truncate">{result.newsCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">뉴스</div>
              </div>
              <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-purple-600 dark:text-purple-400 truncate">{result.cafeCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">카페</div>
              </div>
              <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-orange-600 dark:text-orange-400 truncate">{result.totalCompetition.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">합계</div>
              </div>
            </div>
            {/* 광고 경쟁 데이터 */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 truncate">{result.compIdx}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">광고 경쟁</div>
              </div>
              <div className="text-center p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-cyan-600 dark:text-cyan-400 truncate">{result.avgClickCnt.toFixed(1)}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">월 평균 클릭</div>
              </div>
              <div className="text-center p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-teal-600 dark:text-teal-400 truncate">{result.avgCtr}%</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">평균 클릭률</div>
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
          {result.relatedKeywords && result.relatedKeywords.length > 0 && (() => {
            const goldenKeywords = new Set(
              allResults
                .filter(r => r.grade === "A" || r.competitionGrade === "A")
                .map(r => r.keyword)
            );
            return (
              <>
                <div className="card p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">관련 키워드</h3>
                    {goldenKeywords.size > 0 && (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        황금 키워드 {goldenKeywords.size}개 발견
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.relatedKeywords.map((kw) => {
                      const isGolden = goldenKeywords.has(kw);
                      return (
                        <button
                          key={kw}
                          onClick={() => handleSearch(kw)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            isGolden
                              ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-yellow-700 dark:hover:bg-yellow-900/50 font-medium"
                              : "bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-300"
                          }`}
                        >
                          {isGolden && "★ "}{kw}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {goldenKeywords.size > 0 && (
                  <div className="card p-4 mb-6 border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-300">황금 키워드 추천</h3>
                    </div>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-3">
                      검색량 대비 경쟁이 낮아 상위 노출 가능성이 높은 키워드입니다. 바로 글을 쓰거나 상품을 등록해보세요!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {allResults.filter(r => r.grade === "A" || r.competitionGrade === "A").map(r => (
                        <button
                          key={r.keyword}
                          onClick={() => handleSearch(r.keyword)}
                          className="px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-800 text-sm font-medium hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50 transition-colors flex items-center gap-1"
                        >
                          ★ {r.keyword}
                          <span className="text-[10px] text-yellow-600 dark:text-yellow-500">
                            ({r.totalVolume.toLocaleString()})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          <TagGenerator keywords={result.relatedKeywords ?? []} />

          <GradeGuide />

          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">분석 결과</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                종합경쟁 = 쇼핑상품+블로그+뉴스+카페 대비 검색량 비율
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
              title={`"${result.keyword}" 셀러 키워드 분석 - KeywordView`}
              description={`검색량 ${result.totalVolume.toLocaleString()} · 종합경쟁 ${result.competitionLabel}`}
              path={`/seller-keyword?q=${encodeURIComponent(result.keyword)}`}
            />
          </div>
        </>
      )}
    </div>
  );
}
