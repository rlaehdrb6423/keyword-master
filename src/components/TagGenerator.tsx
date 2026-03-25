"use client";

import { useState } from "react";

interface TagGeneratorProps {
  keywords: string[];
}

type FormatTab = "comma" | "space" | "hashtag";

function formatKeywords(keywords: string[], tab: FormatTab): string {
  if (tab === "comma") return keywords.join(", ");
  if (tab === "space") return keywords.join(" ");
  return keywords.map((kw) => `#${kw}`).join(" ");
}

export default function TagGenerator({ keywords }: TagGeneratorProps) {
  const [activeTab, setActiveTab] = useState<FormatTab>("comma");
  const [copied, setCopied] = useState(false);

  if (keywords.length === 0) return null;

  const formatted = formatKeywords(keywords, activeTab);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback for environments without clipboard API
      const el = document.createElement("textarea");
      el.value = formatted;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const tabs: { id: FormatTab; label: string }[] = [
    { id: "comma", label: "쉼표 구분" },
    { id: "space", label: "공백 구분" },
    { id: "hashtag", label: "#해시태그" },
  ];

  return (
    <div className="card p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">태그 생성</h3>
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                activeTab === tab.id
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-2">
        <p className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 break-all leading-relaxed">
          {formatted}
        </p>
        <button
          onClick={handleCopy}
          className={`shrink-0 text-xs px-3 py-2 rounded-lg transition-colors ${
            copied
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {copied ? "복사됨!" : "복사"}
        </button>
      </div>
    </div>
  );
}
