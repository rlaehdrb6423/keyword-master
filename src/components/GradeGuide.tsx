"use client";

import { useState } from "react";

const grades = [
  {
    grade: "A",
    label: "추천",
    color: "blue",
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
    description: "검색량 대비 경쟁이 낮아 진입하기 좋은 키워드",
    action: "바로 콘텐츠를 작성하세요",
  },
  {
    grade: "B",
    label: "양호",
    color: "green",
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    description: "적당한 경쟁률로 노력하면 상위 노출 가능",
    action: "양질의 콘텐츠로 충분히 경쟁 가능",
  },
  {
    grade: "C",
    label: "보통",
    color: "yellow",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
    description: "경쟁이 다소 치열하여 상위 노출이 어려울 수 있음",
    action: "롱테일 키워드로 세분화를 추천",
  },
  {
    grade: "D",
    label: "경쟁 치열",
    color: "red",
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
    description: "검색량 대비 경쟁이 매우 높아 상위 노출이 힘듦",
    action: "다른 키워드를 찾아보세요",
  },
];

export default function GradeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        등급 해석 가이드
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {grades.map((g) => (
            <div
              key={g.grade}
              className={`p-3 rounded-xl border ${g.border} ${g.bg}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${g.text} ${g.bg}`}>
                  {g.grade}등급
                </span>
                <span className={`text-xs font-medium ${g.text}`}>{g.label}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-1">
                {g.description}
              </p>
              <p className="text-[11px] text-gray-400">
                {g.action}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
