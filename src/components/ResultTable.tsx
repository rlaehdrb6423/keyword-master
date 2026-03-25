"use client";

import GradeBadge from "./GradeBadge";
import type { Grade } from "@/types/keyword";

interface Column {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface ResultTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  emptyMessage?: string;
}

function formatNumber(num: unknown): string {
  if (num === null || num === undefined) return "-";
  if (typeof num === "number") return num.toLocaleString("ko-KR");
  return String(num);
}

export default function ResultTable({
  columns,
  data,
  emptyMessage = "검색 결과가 없습니다.",
}: ResultTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-sm whitespace-nowrap ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : formatNumber(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 미리 정의된 컬럼 헬퍼
export const gradeColumn: Column = {
  key: "grade",
  label: "등급",
  align: "center",
  render: (value, row) => (
    <GradeBadge
      grade={value as Grade}
      label={row.gradeLabel as string}
    />
  ),
};
