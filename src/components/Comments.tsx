"use client";

import { useState, useEffect, FormEvent } from "react";

interface Comment {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), adminCode: adminCode || undefined }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [data.comment, ...prev]);
        setMessage("");
      }
    } catch {
      // 무시
    } finally {
      setLoading(false);
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "방금 전";
    if (mins < 60) return `${mins}분 전`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        💬 피드백 & 댓글
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="댓글을 입력하세요"
            maxLength={500}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors dark:disabled:bg-gray-700"
          >
            {loading ? "..." : "등록"}
          </button>
        </div>
        {/* 운영자 모드 (숨김) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-xs text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-600"
          >
            •
          </button>
          {showAdmin && (
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="운영자 코드"
              className="px-2 py-1 border border-gray-200 rounded text-xs w-32 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          )}
        </div>
      </form>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex gap-3 p-3 rounded-lg ${
                comment.isAdmin
                  ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                comment.isAdmin
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}>
                {comment.isAdmin ? "★" : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {comment.isAdmin ? (
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">운영자</span>
                  ) : (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">익명</span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 break-words">
                  {comment.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
