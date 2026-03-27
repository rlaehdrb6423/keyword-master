import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "KeywordView 개인정보처리방침입니다.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">개인정보처리방침</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">시행일: 2026년 3월 27일</p>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          키워드뷰(KeywordView, 이하 "서비스")는 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를
          보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
        </p>

        <div className="space-y-8 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">

          {/* 제1조 수집하는 개인정보 항목 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제1조 (수집하는 개인정보 항목)
            </h2>
            <p className="mb-3">서비스는 회원가입 시 소셜 로그인 플랫폼으로부터 다음 항목을 수집합니다.</p>

            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 mt-4">네이버 로그인</h3>
            <ul className="space-y-1.5 list-none pl-3">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>이름(닉네임), 이메일 주소, 프로필 이미지</span>
              </li>
            </ul>

            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 mt-4">구글 로그인</h3>
            <ul className="space-y-1.5 list-none pl-3">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>이름, 이메일 주소, 프로필 이미지</span>
              </li>
            </ul>

            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 mt-4">서비스 이용 과정에서 자동 수집되는 정보</h3>
            <ul className="space-y-1.5 list-none pl-3">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>서비스 이용 횟수 (Upstash Redis에 저장, 일일 이용 한도 관리 목적)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>접속 IP, 브라우저 정보, 방문 페이지 (Google Analytics, Microsoft Clarity, Meta Pixel을 통해 수집)</span>
              </li>
            </ul>
          </section>

          {/* 제2조 개인정보의 수집 및 이용 목적 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제2조 (개인정보의 수집 및 이용 목적)
            </h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>회원 식별 및 로그인 처리</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>블로그 분석 등 회원 전용 기능의 이용 횟수 관리 및 제공</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">3.</span>
                <span>서비스 품질 향상 및 이용 현황 분석</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">4.</span>
                <span>불법 이용 방지 및 보안 관리</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">5.</span>
                <span>법령 준수 및 민원 처리</span>
              </li>
            </ul>
          </section>

          {/* 제3조 개인정보의 보유 및 이용 기간 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제3조 (개인정보의 보유 및 이용 기간)
            </h2>
            <p className="mb-3">
              수집된 개인정보는 회원 탈퇴 시 즉시 파기합니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우
              해당 기간 동안 보관 후 파기합니다.
            </p>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>전자상거래 관련 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>접속 로그 기록: 3개월 (통신비밀보호법)</span>
              </li>
            </ul>
            <p className="mt-3">
              Upstash Redis에 저장된 이용 횟수 데이터는 24시간 단위로 초기화됩니다.
            </p>
          </section>

          {/* 제4조 개인정보의 제3자 제공 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p className="mb-3">
              서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.
            </p>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>이용자가 사전에 동의한 경우</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>법령의 규정에 의하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</span>
              </li>
            </ul>

            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 mt-5">개인정보 처리 위탁</h3>
            <p className="mb-3">서비스는 원활한 운영을 위해 다음과 같이 개인정보 처리를 위탁합니다.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300">수탁 업체</th>
                    <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300">위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Vercel Inc.</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">서비스 호스팅 및 서버 운영</td>
                  </tr>
                  <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Upstash Inc.</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">이용 횟수 데이터 저장(Redis)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Google LLC</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">소셜 로그인, 서비스 이용 분석(GA4)</td>
                  </tr>
                  <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Microsoft Corporation</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">서비스 이용 행태 분석(Clarity)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Meta Platforms Inc.</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">광고 성과 측정(Meta Pixel)</td>
                  </tr>
                  <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Naver Corp.</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">소셜 로그인</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 제5조 개인정보의 파기 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제5조 (개인정보의 파기)
            </h2>
            <p className="mb-3">
              서비스는 개인정보의 보유 기간이 경과하거나 처리 목적이 달성된 경우 개인정보를 지체 없이 파기합니다.
            </p>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>전자적 파일 형태의 정보: 복원이 불가능한 방법으로 영구 삭제</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>그 외의 기록·출력물: 분쇄 또는 소각</span>
              </li>
            </ul>
          </section>

          {/* 제6조 이용자의 권리 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제6조 (이용자의 권리)
            </h2>
            <p className="mb-3">이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">1.</span>
                <span>개인정보 열람 요청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">2.</span>
                <span>오류 정정 요청</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">3.</span>
                <span>삭제 요청 (탈퇴)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">4.</span>
                <span>처리 정지 요청</span>
              </li>
            </ul>
            <p className="mt-3">
              위 권리 행사는{" "}
              <a href="mailto:keywordview.lr@gmail.com" className="underline hover:text-gray-900 dark:hover:text-white transition-colors">
                keywordview.kr@gmail.com
              </a>
              으로 이메일을 통해 요청하실 수 있으며, 운영자는 지체 없이 처리합니다.
            </p>
          </section>

          {/* 제7조 쿠키 사용 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제7조 (쿠키 사용)
            </h2>
            <p className="mb-3">
              서비스는 이용자에게 개인화된 서비스를 제공하기 위해 쿠키(Cookie)를 사용합니다.
              쿠키는 웹사이트가 이용자의 브라우저에 저장하는 소량의 정보입니다.
            </p>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">사용 목적</h3>
            <ul className="space-y-1.5 list-none pl-3 mb-4">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>로그인 세션 유지 (NextAuth.js 세션 쿠키)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>다크모드 설정 저장</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>Google Analytics, Microsoft Clarity, Meta Pixel을 통한 이용 분석</span>
              </li>
            </ul>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">쿠키 거부 방법</h3>
            <p>
              이용자는 브라우저 설정을 통해 쿠키를 허용하거나 거부할 수 있습니다. 단, 쿠키를 거부할 경우
              로그인이 필요한 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          {/* 제8조 개인정보 보호책임자 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제8조 (개인정보 보호책임자)
            </h2>
            <p className="mb-3">
              서비스는 개인정보 처리에 관한 업무를 총괄하고 개인정보와 관련한 이용자의 불만 처리 및
              피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-1.5">
              <p><span className="text-gray-500 dark:text-gray-400">담당자:</span> 키워드뷰 운영자</p>
              <p>
                <span className="text-gray-500 dark:text-gray-400">이메일:</span>{" "}
                <a href="mailto:keywordview.kr@gmail.com" className="underline hover:text-gray-900 dark:hover:text-white transition-colors">
                  keywordview.kr@gmail.com
                </a>
              </p>
            </div>
            <p className="mt-3">
              개인정보 침해로 인한 신고나 상담이 필요한 경우 아래 기관에 문의하실 수 있습니다.
            </p>
            <ul className="space-y-1.5 list-none pl-3 mt-2">
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>개인정보분쟁조정위원회: 1833-6972 / www.kopico.go.kr</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>개인정보침해신고센터: 118 / privacy.kisa.or.kr</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>대검찰청 사이버수사과: 1301 / www.spo.go.kr</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">-</span>
                <span>경찰청 사이버안전국: 182 / ecrm.cyber.go.kr</span>
              </li>
            </ul>
          </section>

          {/* 제9조 시행일 */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              제9조 (시행일)
            </h2>
            <p>
              이 개인정보처리방침은 2026년 3월 27일부터 시행됩니다.
              내용 변경 시 변경 사항을 서비스 내 공지하며, 변경 전 이용자가 확인할 수 있도록 합니다.
            </p>
          </section>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400">시행일: 2026년 3월 27일</p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              문의:{" "}
              <a href="mailto:keywordview.kr@gmail.com" className="underline hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                keywordview.kr@gmail.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
