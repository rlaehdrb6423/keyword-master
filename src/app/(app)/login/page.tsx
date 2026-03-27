"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              로그인
            </h1>
            <p className="text-sm text-gray-500">
              블로그 분석 기능을 이용하려면 로그인이 필요합니다
            </p>
          </div>

          <div className="space-y-3">
            {/* 네이버 로그인 */}
            <button
              onClick={() => signIn("naver", { callbackUrl: "/blog-analysis" })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#03C75A" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.5 10.5L6.5 3H3v14h3.5V9.5L13.5 17H17V3h-3.5v7.5z" fill="white"/>
              </svg>
              네이버로 시작하기
            </button>

            {/* 구글 로그인 */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/blog-analysis" })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google로 시작하기
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            로그인 시{" "}
            <Link href="/terms" className="underline">
              이용약관
            </Link>
            {" "}및{" "}
            <Link href="/privacy" className="underline">
              개인정보처리방침
            </Link>
            에 동의합니다
          </p>
        </div>
      </div>
    </div>
  );
}
