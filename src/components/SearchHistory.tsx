"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "kv:search-history";
const MAX_ITEMS = 10;

export function addToHistory(keyword: string, type: "blog" | "seller") {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const history: { keyword: string; type: string; time: number }[] = raw ? JSON.parse(raw) : [];
    const filtered = history.filter((h) => !(h.keyword === keyword && h.type === type));
    filtered.unshift({ keyword, type, time: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
  } catch {}
}

interface SearchHistoryProps {
  type: "blog" | "seller";
  onSelect: (keyword: string) => void;
}

export default function SearchHistory({ type, onSelect }: SearchHistoryProps) {
  const [history, setHistory] = useState<{ keyword: string; type: string; time: number }[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const all = JSON.parse(raw);
        setHistory(all.filter((h: { type: string }) => h.type === type).slice(0, 5));
      }
    } catch {}
  }, [type]);

  if (history.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      <span className="text-xs text-gray-400">최근:</span>
      {history.map((h, i) => (
        <button
          key={i}
          onClick={() => onSelect(h.keyword)}
          className="px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 transition-colors"
        >
          {h.keyword}
        </button>
      ))}
    </div>
  );
}
