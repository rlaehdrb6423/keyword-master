"use client";

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
}

export default function SkeletonTable({ rows = 5, cols = 6 }: SkeletonTableProps) {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-56 bg-gray-100 dark:bg-gray-800 rounded mt-2" />
      </div>
      <div className="p-4">
        {/* 헤더 */}
        <div className="flex gap-4 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="h-3 bg-gray-200 dark:bg-gray-700 rounded flex-1"
            />
          ))}
        </div>
        {/* 행 */}
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="flex gap-4 py-3"
          >
            {Array.from({ length: cols }).map((_, colIdx) => (
              <div
                key={colIdx}
                className={`h-4 rounded flex-1 ${
                  colIdx === 0
                    ? "bg-gray-200 dark:bg-gray-700 max-w-[120px]"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
