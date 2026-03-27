import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="font-extrabold text-gray-700">KeywordView</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">이용약관</Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">개인정보처리방침</Link>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">고객센터</Link>
            <Link href="/about" className="hover:text-gray-700 transition-colors">서비스 소개</Link>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} KeywordView. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
