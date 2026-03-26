"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "대시보드" },
  { href: "/blog-keyword", label: "블로그 키워드" },
  { href: "/seller-keyword", label: "셀러 키워드" },
  { href: "/blog-index", label: "블로그 지수" },
  { href: "/seller-index", label: "셀러 지수" },
  { href: "/blog-analysis", label: "블로그 분석", badge: "BETA" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            KeywordView
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  pathname === item.href
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <ThemeToggle />
            {session ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-4 py-1.5 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="메뉴"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 모바일 드롭다운 */}
        {menuOpen && (
          <div className="md:hidden pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            {session ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block mx-3 mt-2 px-4 py-2 rounded-md text-sm font-medium text-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
