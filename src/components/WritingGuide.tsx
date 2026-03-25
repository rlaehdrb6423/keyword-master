"use client";

import { useState } from "react";

interface WritingGuideProps {
  keyword: string;
  grade: string;
  totalVolume: number;
  platformCount?: { naver: number; tistory: number; wordpress: number };
}

export default function WritingGuide({ keyword, grade, totalVolume: _totalVolume, platformCount }: WritingGuideProps) {
  const [open, setOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"naver" | "tistory" | "wordpress">("naver");

  // 가장 유리한 플랫폼 자동 추천
  const recommended = platformCount
    ? platformCount.naver >= platformCount.tistory && platformCount.naver >= platformCount.wordpress
      ? "naver"
      : platformCount.tistory > platformCount.wordpress
      ? "tistory"
      : "wordpress"
    : "naver";

  const guides = {
    naver: {
      label: "네이버 블로그",
      color: "green",
      tips: [
        { title: "제목", desc: `"${keyword}" 키워드를 제목 앞쪽에 배치하세요. 15~40자가 적당합니다.` },
        { title: "본문 길이", desc: "최소 1500자 이상 작성하세요. 네이버는 충실한 콘텐츠를 선호합니다." },
        { title: "이미지", desc: "직접 촬영한 이미지 5~10장을 포함하세요. 네이버는 원본 이미지를 높이 평가합니다." },
        { title: "키워드 반복", desc: `"${keyword}"를 본문에 3~5회 자연스럽게 반복하세요. 소제목에도 포함하면 좋습니다.` },
        { title: "발행 시간", desc: "오전 6~9시 또는 오후 6~9시에 발행하면 초기 유입이 가장 많습니다." },
        { title: "태그", desc: "관련 키워드를 태그로 10개 이상 추가하세요." },
      ],
    },
    tistory: {
      label: "티스토리",
      color: "orange",
      tips: [
        { title: "제목", desc: `"${keyword}" + 부가 설명 형태로 작성하세요. 구글 SEO에도 유리한 50자 이내가 좋습니다.` },
        { title: "본문 길이", desc: "2000자 이상 작성하세요. 티스토리는 구글 검색에 강하므로 긴 글이 유리합니다." },
        { title: "H2/H3 소제목", desc: "소제목 태그(H2, H3)를 활용하세요. 구글은 구조화된 글을 선호합니다." },
        { title: "메타 설명", desc: "글 설정에서 메타 설명을 직접 입력하세요. 검색 결과에 표시됩니다." },
        { title: "이미지 alt 태그", desc: "모든 이미지에 alt 태그를 넣으세요. 구글 이미지 검색 유입에 도움됩니다." },
        { title: "내부 링크", desc: "관련 글끼리 링크를 연결하세요. 체류 시간이 늘어나 SEO에 유리합니다." },
      ],
    },
    wordpress: {
      label: "워드프레스",
      color: "blue",
      tips: [
        { title: "제목 (H1)", desc: `"${keyword}"를 H1 태그에 포함하세요. Yoast/RankMath SEO 플러그인의 가이드를 따르세요.` },
        { title: "본문 길이", desc: "2500자 이상 작성하세요. 워드프레스는 구글 SEO에 최적화되어 긴 글이 더 유리합니다." },
        { title: "URL 슬러그", desc: `슬러그에 영문 키워드를 포함하세요. 예: /best-${keyword.replace(/\s/g, "-")}/` },
        { title: "메타 설명", desc: "SEO 플러그인에서 메타 설명 150자 이내로 작성하세요. 핵심 키워드를 포함하세요." },
        { title: "스키마 마크업", desc: "FAQ, HowTo 스키마를 추가하면 구글 리치 스니펫에 노출됩니다." },
        { title: "사이트 속도", desc: "이미지 압축(WebP), 캐시 플러그인을 사용하세요. 페이지 속도가 SEO 순위에 영향을 줍니다." },
      ],
    },
  };

  const guide = guides[selectedPlatform];

  return (
    <div className="card mb-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            &ldquo;{keyword}&rdquo; 글쓰기 가이드
          </span>
          {grade === "A" && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              지금 쓰면 좋아요!
            </span>
          )}
        </div>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4">
          {/* 플랫폼 탭 */}
          <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 w-fit mb-4">
            {(["naver", "tistory", "wordpress"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPlatform === p
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {p === "naver" ? "네이버" : p === "tistory" ? "티스토리" : "워드프레스"}
                {p === recommended && " ★"}
              </button>
            ))}
          </div>

          {/* 가이드 목록 */}
          <div className="space-y-3">
            {guide.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  guide.color === "green" ? "bg-green-500" : guide.color === "orange" ? "bg-orange-500" : "bg-blue-500"
                }`}>
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{tip.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
