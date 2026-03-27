import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "KeywordView는 무료인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 모든 기능을 회원가입 없이 100% 무료로 사용할 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "A등급 키워드는 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "검색량 대비 경쟁이 낮아 블로그 글이나 상품 등록 시 상위 노출 가능성이 높은 키워드입니다.",
      },
    },
    {
      "@type": "Question",
      name: "어떤 데이터를 기반으로 분석하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네이버 검색광고 API와 네이버 검색 API의 공식 데이터를 실시간으로 분석합니다.",
      },
    },
    {
      "@type": "Question",
      name: "블로그 지수는 어떻게 측정하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네이버 블로그 RSS를 분석하여 포스팅 수, 주기, 본문 길이, 검색 노출률을 기반으로 11단계 레벨을 산출합니다.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
