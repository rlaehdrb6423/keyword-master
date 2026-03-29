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
    key: "competitionLabel",
    label: "종합경쟁",
    align: "center" as const,
    sortable: false,
    render: (value: unknown) => {
      const label = value as string;
      const colorMap: Record<string, string> = {
        "매우낮음": "text-blue-600 bg-blue-50",
        "낮음": "text-green-600 bg-green-50",
        "보통": "text-yellow-600 bg-yellow-50",
        "높음": "text-orange-600 bg-orange-50",
        "매우높음": "text-red-600 bg-red-50",
      };
      const style = colorMap[label] || "text-gray-600 bg-gray-50";
      return (
        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${style}`}>
          {label}
        </span>
      );
    },
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
        // 메인 검색 후 rate limit 여유를 위해 잠시 대기
        await new Promise(r => setTimeout(r, 500));
        const keywords = data.relatedKeywords.slice(0, 10);
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const bulkRes = await fetch("/api/keyword/bulk", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ keywords, type: "blog" }),
            });
            if (bulkRes.ok) {
              const bulkData = await bulkRes.json();
              setRelatedResults(bulkData.results || []);
              break;
            }
            if (bulkRes.status === 429 && attempt === 0) {
              await new Promise(r => setTimeout(r, 2000));
              continue;
            }
          } catch {
            if (attempt === 0) {
              await new Promise(r => setTimeout(r, 1000));
            }
          }
        }
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
    { label: "PC 검색량", value1: result.pcVolume, value2: compareResult.pcVolume },
    { label: "모바일 검색량", value1: result.mobileVolume, value2: compareResult.mobileVolume },
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
          {/* 헤더: 키워드 + 등급 */}
          <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
              <div>
                <div className="text-xs text-gray-400 mb-1">블로그 키워드 분석</div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 break-words">&ldquo;{result.keyword}&rdquo;</h2>
                  <GradeBadge grade={result.grade} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">상위노출 {result.successRate}%</span>
              </div>
            </div>

            {/* KPI 3개 */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="text-center p-2 sm:p-4 bg-white rounded-xl border border-gray-100">
                <div className="text-[10px] sm:text-xs text-gray-400 mb-1">총 검색량</div>
                <div className="text-base sm:text-2xl font-bold text-gray-900 truncate">{result.totalVolume.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1 truncate">PC {result.pcVolume.toLocaleString()} / MO {result.mobileVolume.toLocaleString()}</div>
              </div>
              <div className="text-center p-2 sm:p-4 bg-white rounded-xl border border-gray-100">
                <div className="text-[10px] sm:text-xs text-gray-400 mb-1">발행 문서 수</div>
                <div className="text-base sm:text-2xl font-bold text-gray-900 truncate">{result.blogDocCount.toLocaleString()}</div>
                <div className={`text-[10px] sm:text-xs font-medium mt-1 ${result.competitionGrade === "A" || result.competitionGrade === "B" ? "text-primary-600" : result.competitionGrade === "C" ? "text-yellow-600" : "text-red-500"}`}>
                  {result.competitionLabel}
                </div>
              </div>
              <div className="text-center p-2 sm:p-4 bg-white rounded-xl border border-gray-100">
                <div className="text-[10px] sm:text-xs text-gray-400 mb-1">검색 비율</div>
                <div className="text-base sm:text-2xl font-bold text-primary-600 truncate">{result.ratio}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1 truncate">
                  {Number(result.ratio) >= 0.1 ? "상위노출 가능성 높음" : Number(result.ratio) >= 0.05 ? "보통" : "경쟁 치열"}
                </div>
              </div>
            </div>
          </div>

          {/* 분석 결과 테이블 */}
          <div className="card overflow-hidden mb-6">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">키워드 분석 결과</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                종합경쟁 = 블로그+뉴스+카페+웹문서 대비 검색량 비율
              </p>
            </div>
            <ResultTable
              columns={columns}
              data={allResults as unknown as Record<string, unknown>[]}
            />
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
                {goldenKeywords.size > 0 && (
                  <div className="card p-4 mb-6 border-yellow-200 bg-yellow-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <h3 className="text-sm font-bold text-yellow-800">황금 키워드 {goldenKeywords.size}개 발견</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allResults.filter(r => r.grade === "A" || r.competitionGrade === "A").map(r => (
                        <button
                          key={r.keyword}
                          onClick={() => handleSearch(r.keyword)}
                          className="px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-800 text-sm font-medium hover:bg-yellow-200 transition-colors flex items-center gap-1"
                        >
                          ★ {r.keyword}
                          <span className="text-[10px] text-yellow-600">({r.totalVolume.toLocaleString()})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="card p-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">관련 키워드</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.relatedKeywords.map((kw) => {
                      const isGolden = goldenKeywords.has(kw);
                      return (
                        <button
                          key={kw}
                          onClick={() => handleSearch(kw)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            isGolden
                              ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300 hover:bg-yellow-200 font-medium"
                              : "bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                          }`}
                        >
                          {isGolden && "★ "}{kw}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}

          <TagGenerator keywords={result.relatedKeywords} />

          {/* 시각화 차트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">PC / 모바일 비율</h3>
              <PcMobileChart pcVolume={result.pcVolume} mobileVolume={result.mobileVolume} />
            </div>
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

          {/* 키워드 비교 */}
          <div className="card p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">키워드 비교</h3>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  compareMode ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"
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
                    <KeywordInput onSearch={handleCompare} loading={compareLoading} placeholder="비교할 키워드 입력" />
                  </div>
                </div>
                {compareResult && <CompareBarChart data={compareData} name1={result.keyword} name2={compareResult.keyword} />}
              </div>
            )}
          </div>

          <GradeGuide />

          <WritingGuide
            keyword={result.keyword}
            grade={result.grade}
            totalVolume={result.totalVolume}
            platformCount={result.platformCount}
          />

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 rounded-2xl bg-white border border-gray-100">
            <span className="text-sm text-gray-500 break-words">&ldquo;{result.keyword}&rdquo; 분석 결과 공유하기</span>
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
