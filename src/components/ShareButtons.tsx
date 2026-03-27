"use client";

import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

interface ShareButtonsProps {
  title?: string;
  description?: string;
  path?: string;
}

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const SITE_URL = "https://keywordview.kr";

export default function ShareButtons({
  title = "KeywordView - 무료 키워드 분석 도구",
  description = "검색량, 경쟁도, SEO 점수까지 한곳에서",
  path = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    if (!KAKAO_KEY) return;

    if (window.Kakao?.isInitialized()) {
      setKakaoReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_KEY);
      }
      setKakaoReady(true);
    };
    document.head.appendChild(script);
  }, []);

  const shareUrl = `${SITE_URL}${path}`;

  const handleKakaoShare = useCallback(() => {
    if (!window.Kakao) return;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl: `${SITE_URL}/api/og${path ? `?page=${path.replace("/", "")}` : ""}`,
        link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
      },
      buttons: [
        {
          title: "키워드 분석하기",
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
      ],
    });
  }, [title, description, path, shareUrl]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  return (
    <div className="flex items-center gap-2">
      {/* 카카오톡 공유 */}
      {kakaoReady && (
        <button
          onClick={handleKakaoShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD835] transition-colors"
          title="카카오톡 공유"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.8 5.108 4.516 6.467-.197.735-.715 2.665-.82 3.079-.13.516.19.51.398.371.164-.109 2.61-1.774 3.67-2.494.717.1 1.456.152 2.236.152 5.523 0 10-3.463 10-7.575C22 6.463 17.523 3 12 3z" />
          </svg>
          카카오톡
        </button>
      )}

      {/* 링크 복사 */}
      <button
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          copied
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        title="링크 복사"
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        )}
        {copied ? "복사됨!" : "링크 복사"}
      </button>

      {/* X(트위터) 공유 */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        title="X(트위터) 공유"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
}
