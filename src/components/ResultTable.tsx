"use client";

import React, { useState, useMemo } from "react";
import ExcelJS from "exceljs";
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

async function handleExcelDownload(columns: Column[], data: Record<string, unknown>[]) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("분석결과");

  ws.addRow(columns.map((col) => col.label));
  for (const row of data) {
    ws.addRow(
      columns.map((col) => {
        const val = row[col.key];
        if (val === null || val === undefined) return "";
        if (typeof val === "number") return val;
        return String(val);
      })
    );
  }

  const today = new Date();
  const dateStr =
    String(today.getFullYear()) +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `keywordview_분석결과_${dateStr}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
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
      <div className="text-center py-12 text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div>
      <div className="flex justify-end px-4 py-2">
        <button
          onClick={() => handleExcelDownload(columns, sortedData)}
          className="text-xs px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
        >
          엑셀 다운로드
        </button>
      </div>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            {columns.map((col, colIdx) => {
              const isSortable = col.sortable !== false && !col.render;
              const isActive = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  onClick={() => isSortable && handleSort(col.key)}
                  className={`px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-gray-100 last:border-r-0 ${colIdx === 0 ? "sticky left-0 bg-gray-50 z-10" : ""} ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left"
                  } ${isSortable ? "cursor-pointer select-none hover:text-gray-900 hover:bg-gray-100 transition-colors" : ""}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {isSortable && (
                      <span className="inline-flex flex-col text-[8px] leading-none">
                        <span className={isActive && sortDir === "asc" ? "text-primary-600" : "text-gray-300"}>&#9650;</span>
                        <span className={isActive && sortDir === "desc" ? "text-primary-600" : "text-gray-300"}>&#9660;</span>
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIdx) => (
            <tr key={rowIdx} className={`border-b border-gray-100 hover:bg-primary-50/30 transition-colors ${rowIdx === 0 ? "bg-primary-50/20" : ""}`}>
              {columns.map((col, colIdx) => (
                <td
                  key={col.key}
                  className={`px-4 py-3.5 text-sm whitespace-nowrap border-r border-gray-50 last:border-r-0 ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left"
                  } ${colIdx === 0 ? "font-semibold text-gray-900 sticky left-0 bg-white z-10" : col.key === "totalVolume" || col.key === "naverProductCount" ? "font-bold text-gray-900" : "text-gray-600"}`}
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
