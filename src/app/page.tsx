"use client";

import Link from "next/link";

const features = [
  {
    href: "/blog-keyword",
    title: "블로그 키워드 분석",
    description: "네이버 검색량, 블로그 문서 수, 경쟁도 분석",
    icon: "📝",
    color: "border-blue-200 hover:border-blue-400 bg-blue-50/50",
  },
  {
    href: "/seller-keyword",
    title: "셀러 키워드 분석",
    description: "네이버쇼핑/쿠팡 상품수 대비 검색량 비교",
    icon: "🛒",
    color: "border-green-200 hover:border-green-400 bg-green-50/50",
  },
  {
    href: "/blog-index",
    title: "블로그 지수",
    description: "키워드별 상위노출 난이도 A~D 등급 분석",
    icon: "📊",
    color: "border-purple-200 hover:border-purple-400 bg-purple-50/50",
  },
  {
    href: "/seller-index",
    title: "셀러 지수",
    description: "키워드별 시장 진입 가능성 A~D 등급 분석",
    icon: "💰",
    color: "border-orange-200 hover:border-orange-400 bg-orange-50/50",
  },
];

export default function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          KeywordMaster
        </h1>
        <p className="text-lg text-gray-600">
          블로거 & 셀러를 위한 키워드 분석 도구
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className={`block p-6 rounded-xl border-2 transition-all ${feature.color}`}
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {feature.title}
            </h2>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-400">
        <p>네이버 검색광고 API + 네이버 검색 API 기반</p>
        <p className="mt-1">※ 지수 등급 임계값은 초기 추정치이며, 실데이터 기반으로 조정 예정</p>
      </div>
    </div>
  );
}
