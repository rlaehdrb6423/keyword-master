"use client";

import { useState, FormEvent } from "react";

interface KeywordInputProps {
  onSearch: (keyword: string) => void;
  loading: boolean;
  placeholder?: string;
}

export default function KeywordInput({
  onSearch,
  loading,
  placeholder = "키워드를 입력하세요",
}: KeywordInputProps) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        aria-label="키워드 입력"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !keyword.trim()}
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
  );
}
