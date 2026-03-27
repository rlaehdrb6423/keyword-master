"use client";
import { useEffect, useState } from "react";

export default function AnalysisCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then(r => r.json())
      .then(data => setCount(data.count || 0))
      .catch(() => {});
  }, []);

  if (count === null || count < 100) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-50 mb-10">
      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <span className="text-sm font-medium text-primary-700">
        지금까지 <strong className="text-primary-600">{count.toLocaleString()}</strong>건의 키워드가 분석되었습니다
      </span>
    </div>
  );
}
