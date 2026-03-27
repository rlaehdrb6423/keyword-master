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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState("");

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

  const handleDelete = async (id: string) => {
    if (!adminCode) return;
    try {
      const res = await fetch("/api/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminCode, action: "delete" }),
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } catch {
      // 무시
    }
  };

  const handleEdit = async (id: string) => {
    if (!adminCode || !editMessage.trim()) return;
    try {
      const res = await fetch("/api/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminCode, action: "edit", message: editMessage.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, message: data.message } : c))
        );
        setEditingId(null);
        setEditMessage("");
      }
    } catch {
      // 무시
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

  const isAdminMode = showAdmin && adminCode.length > 0;

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "..." : "등록"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-xs text-gray-300 hover:text-gray-400"
          >
            •
          </button>
          {showAdmin && (
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="운영자 코드"
              className="px-2 py-1 border border-gray-200 rounded text-xs w-32 outline-none"
            />
          )}
        </div>
      </form>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex gap-3 p-3 rounded-lg ${
                comment.isAdmin
                  ? "bg-primary-50 border border-primary-200"
                  : "bg-gray-50"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                comment.isAdmin
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}>
                {comment.isAdmin ? "★" : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {comment.isAdmin ? (
                    <span className="text-sm font-bold text-primary-600">운영자</span>
                  ) : (
                    <span className="text-sm font-medium text-gray-500">익명</span>
                  )}
                  <span className="text-xs text-gray-400">
                    {timeAgo(comment.createdAt)}
                  </span>
                  {isAdminMode && (
                    <div className="flex gap-1 ml-auto">
                      <button
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditMessage(comment.message);
                        }}
                        className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                {editingId === comment.id ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none"
                    />
                    <button
                      onClick={() => handleEdit(comment.id)}
                      className="text-xs px-2 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => { setEditingId(null); setEditMessage(""); }}
                      className="text-xs px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mt-0.5 break-words">
                    {comment.message}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
