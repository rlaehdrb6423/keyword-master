"use client";

import { useState } from "react";
import type { BlogGapAnalysisResult } from "@/lib/blog-gap-analyzer";

export default function BlogAnalysisPage() {
  const [myBlogId, setMyBlogId] = useState("");
  const [rivalIds, setRivalIds] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BlogGapAnalysisResult | null>(null);

  const addRival = () => {
    if (rivalIds.length < 3) {
      setRivalIds([...rivalIds, ""]);
    }
  };

  const removeRival = (index: number) => {
    if (rivalIds.length > 1) {
      setRivalIds(rivalIds.filter((_, i) => i !== index));
    }
  };

  const updateRival = (index: number, value: string) => {
    const updated = [...rivalIds];
    updated[index] = value;
    setRivalIds(updated);
  };

  const handleAnalyze = async () => {
    const my = myBlogId.trim();
    const rivals = rivalIds.map((id) => id.trim()).filter((id) => id.length > 0);

    if (!my) {
      setError("내 블로그 ID를 입력해주세요.");
      return;
    }
    if (rivals.length === 0) {
      setError("경쟁 블로그 ID를 최소 1개 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/blog-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myBlogId: my, rivalBlogIds: rivals }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "분석에 실패했습니다.");
      }

      const data: BlogGapAnalysisResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            블로그 분석
          </h1>
          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            BETA
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          경쟁 블로그를 분석하고, 내 블로그에 아직 다루지 않은 틈새 주제를 찾아보세요.
        </p>
      </div>

      {/* 입력 폼 */}
      <div className="card p-6 mb-6">
        <div className="space-y-4">
          {/* 내 블로그 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              내 블로그 ID
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
                blog.naver.com/
              </span>
              <input
                type="text"
                value={myBlogId}
                onChange={(e) => setMyBlogId(e.target.value)}
                placeholder="myblog123"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* 경쟁 블로그 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                경쟁 블로그 ID (최대 3개)
              </label>
              {rivalIds.length < 3 && (
                <button
                  onClick={addRival}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                >
                  + 추가
                </button>
              )}
            </div>
            <div className="space-y-2">
              {rivalIds.map((id, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    blog.naver.com/
                  </span>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => updateRival(index, e.target.value)}
                    placeholder={`경쟁 블로그 ${index + 1}`}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                  {rivalIds.length > 1 && (
                    <button
                      onClick={() => removeRival(index)}
                      className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 분석 버튼 */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                분석 중... (최대 30초 소요)
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                분석 시작
              </>
            )}
          </button>
        </div>
      </div>

      {/* 에러 */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* 결과 */}
      {result && (
        <div className="space-y-6">
          {/* ① 경쟁 트렌드 TOP 20 */}
          <div className="card p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              경쟁 트렌드 TOP {result.rivalTrends.length}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              경쟁 블로그들이 최근 자주 다루는 키워드
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">순위</th>
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">키워드</th>
                    <th className="text-right py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">빈도</th>
                    <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">작성 블로그</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rivalTrends.map((item, i) => (
                    <tr key={item.keyword} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-3 text-gray-400">{i + 1}</td>
                      <td className="py-2 px-3 font-medium text-gray-900 dark:text-white">{item.keyword}</td>
                      <td className="py-2 px-3 text-right text-gray-700 dark:text-gray-300">{item.count}회</td>
                      <td className="py-2 px-3 text-gray-500 dark:text-gray-400 text-xs">{item.blogs.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ② 내 블로그 현황 TOP 20 */}
          <div className="card p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              내 블로그 현황 TOP {result.myKeywords.length}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              내가 주로 다루는 키워드
            </p>
            {result.myKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.myKeywords.map((item) => (
                  <span
                    key={item.keyword}
                    className="px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium"
                  >
                    {item.keyword}
                    <span className="ml-1 text-xs text-primary-500 dark:text-primary-400">
                      {item.count}
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">블로그 글을 찾을 수 없습니다. ID를 확인해주세요.</p>
            )}
          </div>

          {/* ③ 틈새 주제 추천 */}
          <div className="card p-5 border-2 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                틈새 주제 추천
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              경쟁자는 다루는데 내 블로그에 없는 주제 (검색량 순)
            </p>
            {result.gapTopics.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">순위</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">키워드</th>
                      <th className="text-right py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">월간 검색량</th>
                      <th className="text-center py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">광고 경쟁</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">경쟁자 참고 글</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.gapTopics.map((topic, i) => (
                      <tr key={topic.keyword} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            i < 3
                              ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                          }`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">
                          {topic.keyword}
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-gray-700 dark:text-gray-300">
                          {topic.monthlyVolume.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            topic.competition === "낮음"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : topic.competition === "중간"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : topic.competition === "높음"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }`}>
                            {topic.competition}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs text-gray-500 dark:text-gray-400 max-w-[200px] truncate">
                          {topic.rivalPosts[0]?.title || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 dark:text-gray-500">
                  틈새 주제를 찾지 못했습니다. 경쟁 블로그와 주제가 유사하거나 데이터가 부족합니다.
                </p>
              </div>
            )}
          </div>

          {/* ④ 참고할 경쟁 글 */}
          {result.gapTopics.some((t) => t.rivalPosts.length > 0) && (
            <div className="card p-5">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                참고할 경쟁 글
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                틈새 주제별 경쟁 블로그의 실제 글 제목
              </p>
              <div className="space-y-3">
                {result.gapTopics
                  .filter((t) => t.rivalPosts.length > 0)
                  .map((topic) => (
                    <div
                      key={topic.keyword}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold">
                          {topic.keyword}
                        </span>
                        <span className="text-xs text-gray-400">
                          월 {topic.monthlyVolume.toLocaleString()}회 검색
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {topic.rivalPosts.map((post, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-gray-300 dark:text-gray-600 mt-0.5">-</span>
                            <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
                            <span className="text-xs text-gray-400 whitespace-nowrap">({post.blogId})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
