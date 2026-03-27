import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관",
  description: "KeywordView 서비스 이용약관입니다.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
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

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">이용약관</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">시행일: 2026년 3월 27일</p>

        <div className="space-y-8 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">

          {/* 제1조 목적 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제1조 (목적)
            </h2>
            <p>
              이 약관은 키워드뷰(KeywordView, 이하 "서비스")의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및
              책임 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 용어의 정의 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제2조 (용어의 정의)
            </h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>"서비스"란 운영자가 제공하는 키워드 분석, 블로그 분석 등 일체의 온라인 서비스를 의미합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>"이용자"란 이 약관에 동의하고 서비스를 이용하는 모든 사람을 의미합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">3.</span>
                <span>"회원"이란 소셜 로그인을 통해 계정을 등록하고 서비스의 특정 기능을 이용하는 이용자를 의미합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">4.</span>
                <span>"운영자"란 서비스를 개발·운영하는 개인 운영자를 의미합니다.</span>
              </li>
            </ul>
          </section>

          {/* 제3조 서비스의 제공 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제3조 (서비스의 제공)
            </h2>
            <p className="mb-3">서비스는 다음과 같은 기능을 제공합니다.</p>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>블로그 키워드 분석: 네이버 검색량, 경쟁도, SEO 점수 분석</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>셀러 키워드 분석: 상품수, 검색량, 시장 경쟁 분석</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">3.</span>
                <span>블로그 지수 분석: 블로그 레벨 및 SEO 진단 (회원 전용)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">4.</span>
                <span>기타 운영자가 추가로 정하는 서비스</span>
              </li>
            </ul>
            <p className="mt-3">
              운영자는 서비스의 내용, 제공 방식, 이용 조건을 변경할 수 있으며, 변경 시 서비스 내 공지합니다.
              서비스는 연중무휴 제공을 원칙으로 하되, 시스템 점검·장애·천재지변 등의 사유로 일시 중단될 수 있습니다.
            </p>
          </section>

          {/* 제4조 회원가입 및 관리 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제4조 (회원가입 및 관리)
            </h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>회원가입은 네이버 또는 구글 소셜 로그인을 통해 이루어지며, 이용자가 이 약관에 동의함으로써 성립됩니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>회원은 소셜 계정 정보의 변경이 있을 경우 해당 플랫폼에서 직접 수정해야 합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">3.</span>
                <span>회원 탈퇴를 원하는 경우 운영자 이메일(rlaehdrb6423@gmail.com)로 요청하면 처리됩니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">4.</span>
                <span>만 14세 미만은 회원으로 가입할 수 없습니다.</span>
              </li>
            </ul>
          </section>

          {/* 제5조 서비스 이용제한 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제5조 (서비스 이용제한)
            </h2>
            <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>서비스의 API를 무단으로 크롤링하거나 자동화된 방법으로 대량 요청하는 행위</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>서비스의 안정적 운영을 방해하는 행위</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">3.</span>
                <span>타인의 계정을 도용하거나 허위 정보를 이용해 가입하는 행위</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">4.</span>
                <span>서비스를 이용해 얻은 데이터를 상업적 목적으로 무단 재판매·배포하는 행위</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">5.</span>
                <span>법령 및 이 약관을 위반하는 기타 행위</span>
              </li>
            </ul>
            <p className="mt-3">
              위 행위가 확인될 경우 운영자는 사전 통보 없이 해당 이용자의 서비스 이용을 제한하거나 계정을 삭제할 수 있습니다.
            </p>
          </section>

          {/* 제6조 면책조항 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제6조 (면책조항)
            </h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>
                  서비스에서 제공하는 키워드 분석 데이터는 참고용으로, 실제 마케팅 결과를 보장하지 않습니다.
                  이용자는 데이터 활용에 대한 판단 및 책임을 직접 부담합니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>
                  운영자는 서비스 제공을 위해 외부 API(네이버 검색광고 API 등)를 활용하며,
                  외부 API의 정책 변경·중단으로 인한 서비스 변경에 대해 책임을 지지 않습니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">3.</span>
                <span>
                  운영자의 귀책 없이 발생한 서비스 장애, 데이터 손실에 대해 운영자는 책임을 지지 않습니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">4.</span>
                <span>
                  이용자 간 또는 이용자와 제3자 간의 분쟁에 대해 운영자는 개입 의무가 없으며 책임을 지지 않습니다.
                </span>
              </li>
            </ul>
          </section>

          {/* 제7조 저작권 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제7조 (저작권)
            </h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>서비스 내 모든 콘텐츠(디자인, 텍스트, UI 구성 등)의 저작권은 운영자에게 귀속됩니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>
                  이용자는 서비스를 통해 얻은 결과물을 개인적·비상업적 목적으로 사용할 수 있으나,
                  운영자의 사전 동의 없이 상업적으로 이용하거나 제3자에게 배포할 수 없습니다.
                </span>
              </li>
            </ul>
          </section>

          {/* 제8조 약관 변경 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제8조 (약관 변경)
            </h2>
            <p>
              운영자는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
              약관이 변경될 경우 변경 내용과 시행일을 서비스 내 공지합니다.
              변경된 약관의 시행일 이후에도 서비스를 계속 이용하는 경우, 변경된 약관에 동의한 것으로 간주합니다.
            </p>
          </section>

          {/* 제9조 준거법 및 관할 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제9조 (준거법 및 관할)
            </h2>
            <p>
              이 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 분쟁이 발생할 경우
              대한민국 법원을 관할 법원으로 합니다.
            </p>
          </section>

          {/* 시행일 */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400">시행일: 2026년 3월 27일</p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              문의: <a href="mailto:rlaehdrb6423@gmail.com" className="underline hover:text-gray-700 dark:hover:text-gray-200 transition-colors">rlaehdrb6423@gmail.com</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
