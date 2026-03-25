"use client";

import { useState, useMemo } from "react";
import GradeBadge from "./GradeBadge";
import type { Grade } from "@/types/keyword";

interface Column {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface ResultTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  emptyMessage?: string;
}

type SortDir = "asc" | "desc" | null;

function formatNumber(num: unknown): string {
  if (num === null || num === undefined) return "-";
  if (typeof num === "number") return num.toLocaleString("ko-KR");
  return String(num);
}

function getSortValue(value: unknown): number | string {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const num = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(num)) return num;
    return value.toLowerCase();
  }
  return 0;
}

export default function ResultTable({
  columns,
  data,
  emptyMessage = "검색 결과가 없습니다.",
}: ResultTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "desc") setSortDir("asc");
      else if (sortDir === "asc") {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const aVal = getSortValue(a[sortKey]);
      const bVal = getSortValue(b[sortKey]);
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDir === "asc"
        ? aStr.localeCompare(bStr, "ko")
        : bStr.localeCompare(aStr, "ko");
    });
  }, [data, sortKey, sortDir]);

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((col) => {
              const isSortable = col.sortable !== false && !col.render;
              const isActive = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  onClick={() => isSortable && handleSort(col.key)}
                  className={`px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left"
                  } ${isSortable ? "cursor-pointer select-none hover:text-gray-900 dark:hover:text-white transition-colors" : ""}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {isSortable && (
                      <span className="inline-flex flex-col text-[8px] leading-none">
                        <span className={isActive && sortDir === "asc" ? "text-primary-600 dark:text-primary-400" : "text-gray-300 dark:text-gray-600"}>&#9650;</span>
                        <span className={isActive && sortDir === "desc" ? "text-primary-600 dark:text-primary-400" : "text-gray-300 dark:text-gray-600"}>&#9660;</span>
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-sm whitespace-nowrap text-gray-900 dark:text-gray-200 ${
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
  sortable: false,
  render: (value, row) => (
    <GradeBadge
      grade={value as Grade}
      label={row.gradeLabel as string}
    />
  ),
};
