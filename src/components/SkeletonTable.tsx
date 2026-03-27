"use client";

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
  statusText?: string;
}

export default function SkeletonTable({ rows = 5, cols = 6, statusText }: SkeletonTableProps) {
  return (
    <div className="card overflow-hidden animate-pulse">
      {statusText && (
        <div className="px-6 pt-4 flex items-center gap-1 text-sm text-primary-600 font-medium">
          <span>{statusText}</span>
          <span className="flex gap-0.5 ml-0.5">
            <span className="inline-block w-1 h-1 rounded-full bg-current animate-[bounce_1s_0ms_infinite]" />
            <span className="inline-block w-1 h-1 rounded-full bg-current animate-[bounce_1s_200ms_infinite]" />
            <span className="inline-block w-1 h-1 rounded-full bg-current animate-[bounce_1s_400ms_infinite]" />
          </span>
        </div>
      )}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-56 bg-gray-100 rounded mt-2" />
      </div>
      <div className="p-4">
        {/* 헤더 */}
        <div className="flex gap-4 mb-4 pb-3 border-b border-gray-100">
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="h-3 bg-gray-200 rounded flex-1"
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
                    ? "bg-gray-200 max-w-[120px]"
                    : "bg-gray-100"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
