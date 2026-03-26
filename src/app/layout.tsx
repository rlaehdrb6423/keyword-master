import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AuthProvider from "@/components/AuthProvider";
import {
  GoogleAnalytics,
  MicrosoftClarity,
  NaverVerification,
} from "@/components/Analytics";
import Footer from "@/components/Footer";

const SITE_URL = "https://keywordview.kr";
const SITE_NAME = "KeywordView";
const SITE_DESCRIPTION =
  "네이버 검색량, 경쟁도, SEO 점수까지 — 블로거와 셀러에게 필요한 키워드 데이터를 한곳에서 무료로 분석하세요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KeywordView - 무료 키워드 분석 도구 | 블로그 & 셀러",
    template: "%s | KeywordView",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "키워드 분석",
    "네이버 키워드",
    "블로그 키워드",
    "셀러 키워드",
    "네이버 검색량",
    "블로그 지수",
    "셀러 지수",
    "스마트스토어 키워드",
    "쿠팡 키워드",
    "키워드 도구",
    "SEO 분석",
    "경쟁도 분석",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "KeywordView - 무료 키워드 분석 도구",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: "KeywordView - 무료 키워드 분석 도구",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KeywordView - 무료 키워드 분석 도구",
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "FwndSPjkAuLGdO8WgR0Hshgx5XMCwMiP53dp6fOnrHE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  featureList: [
    "네이버 키워드 검색량 분석",
    "블로그 경쟁도 분석",
    "셀러 키워드 분석",
    "블로그 지수 측정",
    "스마트스토어 셀러 지수 측정",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <NaverVerification />
        <meta name="google-adsense-account" content="ca-pub-4740331651949774" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4740331651949774"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <GoogleAnalytics />
          <MicrosoftClarity />
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
