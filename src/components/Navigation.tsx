"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

type NavItem = { href: string; label: string; badge?: string };

const appNavItems: NavItem[] = [
  { href: "/blog-keyword", label: "블로그 키워드" },
  { href: "/seller-keyword", label: "셀러 키워드" },
  { href: "/blog-index", label: "블로그 지수" },
  { href: "/seller-index", label: "셀러 지수" },
  { href: "/blog-analysis", label: "블로그 분석", badge: "BETA" },
];

const landingNavItems: NavItem[] = [
  { href: "#solution", label: "문제" },
  { href: "#features", label: "기능" },
  { href: "#testimonials", label: "후기" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isHomepage = pathname === "/";
  const navItems = isHomepage ? landingNavItems : appNavItems;

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 ${isHomepage ? "glass border-b border-black/[0.06]" : "bg-white border-b border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-sm shadow-primary-500/40">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              <span className="text-primary-600">Keyword</span>
              <span className="text-accent-600">View</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              isHomepage ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    pathname === item.href
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-primary-100 text-primary-600">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            ))}

            {session ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-xs text-gray-500">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              isHomepage ? (
                <a
                  href="#"
                  className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  로그인
                </a>
              ) : (
                <Link
                  href="/login"
                  className="ml-2 px-4 py-1.5 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  로그인
                </Link>
              )
            )}
            {isHomepage && (
              <a
                href="#cta"
                className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
              >
                무료 시작하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
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

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-3 space-y-1">
            {navItems.map((item) => (
              isHomepage ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-primary-100 text-primary-600">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            ))}
            {session ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-gray-500">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              isHomepage ? (
                <a
                  href="#cta"
                  onClick={() => setMenuOpen(false)}
                  className="block mx-3 mt-2 px-4 py-2 rounded-md text-sm font-medium text-center bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  무료 시작하기
                </a>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block mx-3 mt-2 px-4 py-2 rounded-md text-sm font-medium text-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  로그인
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
