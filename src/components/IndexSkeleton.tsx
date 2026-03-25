"use client";

export default function IndexSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* 레벨 카드 */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-1" />
              <div className="h-3 w-12 bg-gray-100 dark:bg-gray-800 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
      {/* 포스트 목록 */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        {[1,2,3,4,5].map(i => (
          <div key={i} className="px-6 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
              <div className="h-3 w-1/3 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
