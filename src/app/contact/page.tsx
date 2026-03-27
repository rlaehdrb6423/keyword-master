import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "KeywordView 서비스 이용 중 궁금한 점이나 불편한 점이 있으시면 이메일로 문의해 주세요. 자주 묻는 질문도 확인하실 수 있습니다.",
  alternates: { canonical: "https://keywordview.kr/contact" },
};

const faqs = [
  {
    q: "KeywordView는 정말 무료인가요?",
    a: "네, 키워드 분석, 셀러 키워드 분석, 블로그 지수, 셀러 지수 등 주요 기능을 회원가입 없이 무료로 이용하실 수 있습니다. 블로그 분석(BETA) 기능은 로그인 후 하루 3회까지 무료로 제공됩니다.",
  },
  {
    q: "검색량 데이터는 어디서 가져오나요?",
    a: "네이버 검색광고 API에서 제공하는 공식 월간 검색량 데이터를 사용합니다. PC와 모바일 검색량을 각각 확인할 수 있으며, 실시간으로 API를 호출하여 최신 데이터를 제공합니다.",
  },
  {
    q: "A~D 등급은 어떤 기준으로 매겨지나요?",
    a: "검색량 대비 블로그 문서 수(경쟁도)를 기반으로 등급을 산출합니다. A등급은 검색량은 높은데 경쟁 문서가 적어 상위 노출 가능성이 높은 키워드이며, D등급은 경쟁이 치열하여 신규 진입이 어려운 키워드입니다.",
  },
  {
    q: "블로그 지수는 어떻게 측정되나요?",
    a: "블로그의 RSS 피드를 분석하여 총 포스팅 수, 주간 포스팅 빈도, 평균 본문 길이, 검색 노출률 등을 종합적으로 평가합니다. 네이버 블로그, 티스토리, 워드프레스를 모두 지원하며 11단계 레벨로 결과를 제공합니다.",
  },
  {
    q: "셀러 키워드에서 '비율'은 무엇을 의미하나요?",
    a: "월간 검색량을 네이버 쇼핑 상품 수로 나눈 값입니다. 비율이 높을수록 검색 수요 대비 공급(상품)이 적다는 뜻이므로, 해당 키워드로 상품을 등록하면 노출 기회가 더 많습니다.",
  },
  {
    q: "하루에 몇 번까지 검색할 수 있나요?",
    a: "키워드 분석, 블로그 지수, 셀러 지수 등 기본 기능은 일일 사용 횟수 제한이 있으며, IP 기준으로 관리됩니다. 블로그 분석(BETA)은 로그인 후 하루 3회까지 이용 가능합니다. 제한은 매일 자정에 초기화됩니다.",
  },
  {
    q: "개인정보는 안전하게 보호되나요?",
    a: "KeywordView는 소셜 로그인 시 이름, 이메일, 프로필 이미지만 수집하며, 별도의 비밀번호를 저장하지 않습니다. 수집된 정보는 로그인 기능 제공 목적으로만 사용되며, 개인정보처리방침에 따라 관리됩니다.",
  },
  {
    q: "데이터를 엑셀로 다운로드할 수 있나요?",
    a: "네, 키워드 분석 결과 페이지에서 엑셀(XLSX) 파일로 다운로드할 수 있습니다. 메인 키워드와 관련 키워드 10개의 검색량, 경쟁도, 등급 정보가 모두 포함됩니다.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          홈으로 돌아가기
        </Link>
      </div>

      {/* 문의 안내 */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">문의하기</h1>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          KeywordView 서비스 이용 중 궁금한 점, 오류 제보, 기능 제안 등 어떤 내용이든 편하게 문의해 주세요.
          이메일로 접수된 문의는 영업일 기준 1~2일 이내에 답변드립니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">이메일 문의</h3>
            <a
              href="mailto:rlaehdrb6423@gmail.com"
              className="text-sm text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              rlaehdrb6423@gmail.com
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              서비스 이용 문의, 오류 제보, 기능 제안, 제휴 문의 등
            </p>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">운영 블로그</h3>
            <a
              href="https://igetmindset.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              igetmindset.com
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              키워드 분석 활용법, 블로그 운영 팁, 서비스 업데이트 소식
            </p>
          </div>
        </div>
      </section>

      {/* 자주 묻는 질문 */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">자주 묻는 질문</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="pb-6 border-b border-gray-100 dark:border-gray-800 last:border-b-0 last:pb-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                Q. {faq.q}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 하단 링크 */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">서비스 소개</Link>
        <Link href="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">이용약관</Link>
        <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">개인정보처리방침</Link>
      </div>
    </div>
  );
}
