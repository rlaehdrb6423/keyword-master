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
import WritingGuide from "@/components/WritingGuide";
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          블로그 키워드 분석
        </h1>
        <p className="text-gray-600">
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
          {/* 검색 키워드 sticky 바 */}
          <div className="sticky top-16 z-40 -mx-4 px-4 py-3 mb-4 bg-white/90gray-900/90 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">분석 키워드</span>
              <span className="text-lg font-bold text-primary-600">&ldquo;{result.keyword}&rdquo;</span>
              <GradeBadge grade={result.grade} />
              <span className="text-sm text-gray-500 ml-auto">
                총 검색량 {result.totalVolume.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 시각화 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* PC/모바일 비율 */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">PC / 모바일 비율</h3>
              <PcMobileChart pcVolume={result.pcVolume} mobileVolume={result.mobileVolume} />
            </div>

            {/* 채널별 점유율 */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">채널별 콘텐츠 점유율</h3>
              <ChannelShareChart
                blogCount={result.blogDocCount}
                newsCount={result.newsCount}
                cafeCount={result.cafeCount}
                webDocCount={result.webDocCount}
              />
            </div>
          </div>

          {/* 추가 시각화 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">채널별 경쟁도</h3>
              <CompetitionRadar
                blogCount={result.blogDocCount}
                newsCount={result.newsCount}
                cafeCount={result.cafeCount}
                webDocCount={result.webDocCount}
                totalVolume={result.totalVolume}
              />
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">관련 키워드 검색량</h3>
              <KeywordBubbleChart
                keywords={allResults.map((r) => ({ keyword: r.keyword, totalVolume: r.totalVolume, grade: r.grade }))}
                onKeywordClick={handleSearch}
              />
            </div>
          </div>

          {/* 채널별 경쟁도 숫자 카드 */}
          <div className="card p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                &ldquo;{result.keyword}&rdquo; 종합 경쟁 현황
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-600">종합 경쟁도:</span>
                <GradeBadge grade={result.competitionGrade as Grade} label={result.competitionLabel} />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary-50primary-900/20">
                  <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-[11px] font-bold text-primary-700">
                    상위 노출 확률 {result.successRate}%
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="text-center p-2 bg-blue-50blue-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-blue-600 truncate">{result.blogDocCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">블로그</div>
              </div>
              <div className="text-center p-2 bg-red-50red-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-red-600 truncate">{result.newsCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">뉴스</div>
              </div>
              <div className="text-center p-2 bg-green-50green-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-green-600 truncate">{result.cafeCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">카페</div>
              </div>
              <div className="text-center p-2 bg-purple-50purple-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-purple-600 truncate">{result.webDocCount.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">웹문서</div>
              </div>
              <div className="text-center p-2 bg-orange-50orange-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-orange-600 truncate">{result.totalCompetition.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">합계</div>
              </div>
            </div>
            {/* 광고 경쟁 데이터 */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-center p-2 bg-indigo-50indigo-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-indigo-600 truncate">{result.compIdx}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">광고 경쟁</div>
              </div>
              <div className="text-center p-2 bg-cyan-50cyan-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-cyan-600 truncate">{result.avgClickCnt.toFixed(1)}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">월 평균 클릭</div>
              </div>
              <div className="text-center p-2 bg-teal-50teal-900/20 rounded-lg">
                <div className="text-sm sm:text-lg font-bold text-teal-600 truncate">{result.avgCtr}%</div>
                <div className="text-[10px] sm:text-xs text-gray-500">평균 클릭률</div>
              </div>
            </div>
          </div>

          {/* 플랫폼별 노출 현황 */}
          <div className="card p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              플랫폼별 노출 현황 <span className="text-xs font-normal text-gray-400">(상위 20개 결과 기준)</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-green-50green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{result.platformCount.naver}</div>
                <div className="text-xs text-gray-500">네이버 블로그</div>
                <div className="mt-1 h-1.5 bg-gray-200gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(result.platformCount.naver / 20) * 100}%` }} />
                </div>
              </div>
              <div className="text-center p-3 bg-orange-50orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{result.platformCount.tistory}</div>
                <div className="text-xs text-gray-500">티스토리</div>
                <div className="mt-1 h-1.5 bg-gray-200gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(result.platformCount.tistory / 20) * 100}%` }} />
                </div>
              </div>
              <div className="text-center p-3 bg-blue-50blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{result.platformCount.wordpress}</div>
                <div className="text-xs text-gray-500">워드프레스/기타</div>
                <div className="mt-1 h-1.5 bg-gray-200gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(result.platformCount.wordpress / 20) * 100}%` }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 text-center">
              {result.platformCount.naver > result.platformCount.tistory && result.platformCount.naver > result.platformCount.wordpress
                ? "네이버 블로그가 우세합니다. 네이버 블로그로 공략하면 유리합니다."
                : result.platformCount.tistory > result.platformCount.naver
                ? "티스토리가 우세합니다. 티스토리로 공략하면 경쟁에 참여할 수 있습니다."
                : "다양한 플랫폼이 노출됩니다. 어떤 플랫폼이든 기회가 있습니다."}
            </p>
          </div>

          {/* 키워드 비교 */}
          <div className="card p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">키워드 비교</h3>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  compareMode
                    ? "bg-primary-100 text-primary-700primary-900/30"
                    : "bg-gray-100 text-gray-600gray-800"
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
          {result.relatedKeywords.length > 0 && (() => {
            const goldenKeywords = new Set(
              allResults
                .filter(r => r.grade === "A" || r.competitionGrade === "A")
                .map(r => r.keyword)
            );
            return (
              <>
                <div className="card p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">관련 키워드</h3>
                    {goldenKeywords.size > 0 && (
                      <span className="text-xs text-yellow-600 flex items-center gap-1">
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
                              ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300 hover:bg-yellow-200yellow-900/30 font-medium"
                              : "bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700gray-800:bg-primary-900/30:text-primary-300"
                          }`}
                        >
                          {isGolden && "★ "}{kw}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {goldenKeywords.size > 0 && (
                  <div className="card p-4 mb-6 border-yellow-200 bg-yellow-50/50yellow-900/10">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <h3 className="text-sm font-bold text-yellow-800">황금 키워드 추천</h3>
                    </div>
                    <p className="text-xs text-yellow-700 mb-3">
                      검색량 대비 경쟁이 낮아 상위 노출 가능성이 높은 키워드입니다. 바로 글을 쓰거나 상품을 등록해보세요!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {allResults.filter(r => r.grade === "A" || r.competitionGrade === "A").map(r => (
                        <button
                          key={r.keyword}
                          onClick={() => handleSearch(r.keyword)}
                          className="px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-800 text-sm font-medium hover:bg-yellow-200yellow-900/30 transition-colors flex items-center gap-1"
                        >
                          ★ {r.keyword}
                          <span className="text-[10px] text-yellow-600">
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

          <TagGenerator keywords={result.relatedKeywords} />

          <GradeGuide />

          <WritingGuide
            keyword={result.keyword}
            grade={result.grade}
            totalVolume={result.totalVolume}
            platformCount={result.platformCount}
          />

          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">분석 결과</h2>
              <p className="text-xs text-gray-500 mt-1">
                종합경쟁 = 블로그+뉴스+카페+웹문서 대비 검색량 비율
              </p>
            </div>
            <ResultTable
              columns={columns}
              data={allResults as unknown as Record<string, unknown>[]}
            />
          </div>

          <div className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-whitegray-900 border border-gray-100">
            <span className="text-sm text-gray-500">
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
