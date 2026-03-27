import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <Link href="/" className="font-extrabold text-gray-700">
            <span className="text-primary-600">Keyword</span><span className="text-accent-600">View</span>
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
