import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div>
            <div className="text-lg font-bold mb-2">
              <span className="text-gray-900 dark:text-white">Keyword</span>
              <span className="text-primary-600 dark:text-primary-400">View</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
              네이버 검색광고 API + 검색 API 기반<br />
              실시간 키워드 분석 도구
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">서비스</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog-keyword" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  블로그 키워드 분석
                </Link>
              </li>
              <li>
                <Link href="/seller-keyword" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  셀러 키워드 분석
                </Link>
              </li>
              <li>
                <Link href="/blog-index" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  블로그 지수 분석
                </Link>
              </li>
              <li>
                <Link href="/seller-index" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  셀러 지수 분석
                </Link>
              </li>
            </ul>
          </div>

          {/* 안내 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">안내</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  문의하기
                </Link>
              </li>
              <li>
                <a href="https://igetmindset.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  블로그
                </a>
              </li>
              <li>
                <a href="mailto:keywordview.kr@gmail.com" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  이메일: keywordview.kr@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* 법적 고지 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">법적 고지</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-gray-300 dark:text-gray-700">
            &copy; {new Date().getFullYear()} KeywordView. 모든 기능 무료 제공.
          </p>
          <p className="text-[11px] text-gray-300 dark:text-gray-700">
            데이터 출처: 네이버 검색광고 API &middot; 네이버 검색 API &middot; Google Trends
          </p>
        </div>
      </div>
    </footer>
  );
}
