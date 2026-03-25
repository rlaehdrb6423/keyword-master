interface DataSourceBadgeProps {
  sources: string[];
}

const sourceLabels: Record<string, { label: string; color: string }> = {
  naver: { label: "네이버", color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
  coupang: { label: "쿠팡", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300" },
};

export default function DataSourceBadge({ sources }: DataSourceBadgeProps) {
  return (
    <div className="flex gap-1">
      {sources.map((source) => {
        const info = sourceLabels[source] || {
          label: source,
          color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        };
        return (
          <span
            key={source}
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${info.color}`}
          >
            {info.label}
          </span>
        );
      })}
    </div>
  );
}
