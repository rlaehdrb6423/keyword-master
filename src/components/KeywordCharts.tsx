"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#a855f7", "#f97316"];

interface PcMobileChartProps {
  pcVolume: number;
  mobileVolume: number;
}

export function PcMobileChart({ pcVolume, mobileVolume }: PcMobileChartProps) {
  const total = pcVolume + mobileVolume;
  if (total === 0) return null;

  const data = [
    { name: "PC", value: pcVolume, pct: Math.round((pcVolume / total) * 100) },
    { name: "모바일", value: mobileVolume, pct: Math.round((mobileVolume / total) * 100) },
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={40} innerRadius={20}>
              <Cell fill="#3b82f6" />
              <Cell fill="#f97316" />
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(17,24,39,0.9)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
              formatter={(value: number) => [value.toLocaleString(), ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-gray-600 dark:text-gray-400">PC {data[0].pct}%</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{pcVolume.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-gray-600 dark:text-gray-400">모바일 {data[1].pct}%</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{mobileVolume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

interface ChannelShareChartProps {
  blogCount: number;
  newsCount: number;
  cafeCount: number;
  webDocCount: number;
}

export function ChannelShareChart({ blogCount, newsCount, cafeCount, webDocCount }: ChannelShareChartProps) {
  const total = blogCount + newsCount + cafeCount + webDocCount;
  if (total === 0) return null;

  const data = [
    { name: "블로그", value: blogCount, color: "#3b82f6" },
    { name: "뉴스", value: newsCount, color: "#ef4444" },
    { name: "카페", value: cafeCount, color: "#22c55e" },
    { name: "웹문서", value: webDocCount, color: "#a855f7" },
  ].filter((d) => d.value > 0);

  return (
    <div className="flex items-center gap-4">
      <div className="w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={48} innerRadius={24} paddingAngle={2}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(17,24,39,0.9)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
              formatter={(value: number) => [value.toLocaleString(), ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-1">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-gray-600 dark:text-gray-400 w-12">{d.name}</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{d.value.toLocaleString()}</span>
            <span className="text-xs text-gray-400">({Math.round((d.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CompareBarChartProps {
  data: { label: string; value1: number; value2: number }[];
  name1: string;
  name2: string;
}

export function CompareBarChart({ data, name1, name2 }: CompareBarChartProps) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(17,24,39,0.9)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
          />
          <Bar dataKey="value1" name={name1} fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="value2" name={name2} fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface CompetitionRadarProps {
  blogCount: number;
  newsCount: number;
  cafeCount: number;
  webDocCount: number;
  totalVolume: number;
}

export function CompetitionRadar({ blogCount, newsCount, cafeCount, webDocCount, totalVolume }: CompetitionRadarProps) {
  if (totalVolume === 0) return null;

  const normalize = (count: number) => Math.min(Math.round((count / totalVolume) * 100), 100);

  const data = [
    { subject: "블로그", value: normalize(blogCount) },
    { subject: "뉴스", value: normalize(newsCount) },
    { subject: "카페", value: normalize(cafeCount) },
    { subject: "웹문서", value: normalize(webDocCount) },
  ];

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#9ca3af" }} />
          <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(17,24,39,0.9)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
            formatter={(value: number) => [`${value}`, "경쟁도"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

const GRADE_COLORS: Record<string, string> = {
  A: "#3b82f6",
  B: "#22c55e",
  C: "#eab308",
  D: "#ef4444",
};

interface KeywordBubbleProps {
  keywords: { keyword: string; totalVolume: number; grade: string }[];
}

export function KeywordBubbleChart({ keywords }: KeywordBubbleProps) {
  if (keywords.length === 0) return null;

  const data = keywords.map((k, i) => ({ ...k, index: i }));

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
          <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={(v) => v.toLocaleString()} />
          <YAxis type="category" dataKey="keyword" tick={{ fontSize: 10, fill: "#9ca3af" }} width={60} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(17,24,39,0.9)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
            formatter={(value: number, _name: string, props: { payload?: { grade?: string } }) => [
              value.toLocaleString(),
              `검색량 (${props.payload?.grade ?? ""})`,
            ]}
          />
          <Bar dataKey="totalVolume" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={GRADE_COLORS[entry.grade] ?? "#6b7280"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
