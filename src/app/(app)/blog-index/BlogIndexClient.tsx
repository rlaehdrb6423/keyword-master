"use client";

import { useState, FormEvent } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ErrorMessage from "@/components/ErrorMessage";
import IndexSkeleton from "@/components/IndexSkeleton";

interface PostInfo {
  title: string;
  link: string;
  pubDate: string;
  descriptionLength: number;
  seoScore: number;
  seoTips: string[];
  hasVolume: boolean;
}

interface BlogLevelResult {
  blogId: string;
  platform: string;
  blogTitle: string;
  totalPosts: number;
  recentPosts: PostInfo[];
  postingFrequency: number;
  avgPostLength: number;
  searchVisibility: number;
  level: number;
  levelLabel: string;
  tips: string[];
  postingTimeline: { week: string; count: number }[];
}

const levelColors = [
  "bg-gray-400", "bg-gray-500", "bg-yellow-500", "bg-yellow-400",
  "bg-green-400", "bg-green-500", "bg-blue-400", "bg-blue-500",
  "bg-purple-400", "bg-purple-500", "bg-red-500",
];

function seoScoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function seoScoreBg(score: number) {
  if (score >= 80) return "bg-green-100";
  if (score >= 50) return "bg-yellow-100";
  return "bg-red-100";
}

export default function BlogIndexPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<BlogLevelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/blog-level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: trimmed }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "분석에 실패했습니다.");
      }

      const data: BlogLevelResult = await res.json();
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">블로그 지수 분석</h1>
        <p className="text-gray-600">
          블로그의 기본 지수 확인과 함께 최근 포스팅별 SEO 상세 분석이 가능합니다.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          네이버: blogId 또는 blog.naver.com/blogId &nbsp;|&nbsp; 티스토리: xxx.tistory.com &nbsp;|&nbsp; 워드프레스: https://example.com
        </p>
      </div>

      <div className="card p-6 mb-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="블로그 URL 입력 (네이버, 티스토리, 워드프레스 지원)"
            aria-label="블로그 URL 입력"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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

      {loading && !result && <IndexSkeleton />}

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* 레벨 등급 안내 */}
      <div className="card p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">블로그 지수 등급 (11단계)</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className={`inline-block w-8 h-6 rounded text-xs font-bold text-white flex items-center justify-center ${levelColors[i]}`}>
                {i}
              </span>
            </div>
          ))}
        </div>
      </div>

      {result && (
        <>
          {/* 레벨 결과 카드 */}
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{result.blogTitle}</h2>
                <p className="text-sm text-gray-500">
                  @{result.blogId}
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                    result.platform === "naver" ? "bg-green-100 text-green-700"
                    : result.platform === "tistory" ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                  }`}>
                    {result.platform === "naver" ? "네이버" : result.platform === "tistory" ? "티스토리" : "워드프레스"}
                  </span>
                </p>
              </div>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${levelColors[result.level]}`}>
                  {result.level}
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">{result.levelLabel}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Level 0</span>
                <span>Level 10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${levelColors[result.level]}`}
                  style={{ width: `${(result.level / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary-600 truncate">{result.totalPosts}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">총 포스트</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-green-600 truncate">{result.postingFrequency}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">최근 30일 포스팅</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-purple-600 truncate">{result.avgPostLength}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">평균 글 길이</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-orange-600 truncate">{result.searchVisibility}%</div>
                <div className="text-[10px] sm:text-xs text-gray-500">검색 노출률</div>
              </div>
            </div>
          </div>

          {/* 포스팅 주기 그래프 */}
          {result.postingTimeline && (
            <div className="card p-5 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">포스팅 주기 (최근 8주)</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.postingTimeline}>
                    <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17,24,39,0.9)",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value}개`, "포스팅"]}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 팁 */}
          <div className="card p-5 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">분석 및 추천</h3>
            <ul className="space-y-2">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary-500 mt-0.5">*</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* 최근 포스트 + SEO 점수 */}
          {result.recentPosts.length > 0 && (
            <div className="card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">최근 포스팅 SEO 분석</h3>
                <span className="text-xs text-primary-500 animate-pulse flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                  클릭하면 SEO 개선 팁을 확인할 수 있어요
                </span>
              </div>
              <div className="divide-y divide-gray-200">
                {result.recentPosts.map((post, i) => (
                  <div key={i} className="px-6 py-3">
                    <div
                      className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                      onClick={() => setExpandedPost(expandedPost === i ? null : i)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${seoScoreBg(post.seoScore)} ${seoScoreColor(post.seoScore)}`}>
                          {post.seoScore}
                        </div>
                        <div className="flex-1 min-w-0">
                          {post.link && post.link.startsWith("http") ? (
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-800 hover:text-primary-600 truncate block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {post.title}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-800 truncate block">
                              {post.title}
                            </span>
                          )}
                          <div className="flex gap-3 text-xs text-gray-400">
                            <span>{post.descriptionLength}자</span>
                            <span>{new Date(post.pubDate).toLocaleDateString("ko-KR")}</span>
                            {post.hasVolume && <span className="text-green-500">검색량 있음</span>}
                          </div>
                        </div>
                      </div>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedPost === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {expandedPost === i && (
                      <div className="mt-2 ml-13 pl-13 space-y-1">
                        {post.seoTips.map((tip, j) => (
                          <p key={j} className="text-xs text-gray-500 flex items-start gap-1">
                            <span className="text-primary-500">-</span> {tip}
                          </p>
                        ))}
                      </div>
                    )}
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
