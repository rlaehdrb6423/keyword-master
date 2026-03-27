export default function DashboardMockup() {
  const keywords = [
    { keyword: "다이어트 식단", pc: "5,400", mobile: "18,200", total: "23,600", blog: "342,100", ratio: "0.07", grade: "A", gradeColor: "blue", comp: "낮음", compColor: "blue" },
    { keyword: "간헐적 단식", pc: "3,100", mobile: "12,800", total: "15,900", blog: "89,400", ratio: "0.18", grade: "A", gradeColor: "blue", comp: "낮음", compColor: "blue" },
    { keyword: "저탄수화물 다이어트", pc: "1,200", mobile: "8,900", total: "10,100", blog: "156,200", ratio: "0.06", grade: "B", gradeColor: "green", comp: "보통", compColor: "yellow" },
    { keyword: "다이어트 도시락", pc: "2,800", mobile: "9,400", total: "12,200", blog: "45,600", ratio: "0.27", grade: "A", gradeColor: "blue", comp: "낮음", compColor: "blue" },
    { keyword: "다이어트 레시피", pc: "4,100", mobile: "15,600", total: "19,700", blog: "521,300", ratio: "0.04", grade: "C", gradeColor: "yellow", comp: "높음", compColor: "red" },
    { keyword: "키토제닉 식단", pc: "890", mobile: "6,200", total: "7,090", blog: "28,100", ratio: "0.25", grade: "A", gradeColor: "blue", comp: "낮음", compColor: "blue" },
    { keyword: "다이어트 식단 배달", pc: "1,600", mobile: "7,300", total: "8,900", blog: "12,400", ratio: "0.72", grade: "A", gradeColor: "blue", comp: "매우 낮음", compColor: "blue" },
  ];

  return (
    <div className="rounded-2xl bg-white shadow-2xl shadow-gray-200/80 border border-gray-100 overflow-hidden" style={{ display: "flex", flexDirection: "column" }}>
      {/* Browser bar */}
      <div className="h-11 border-b border-gray-100 bg-gray-50 flex items-center px-4 gap-3 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-300" />
          <div className="w-3 h-3 rounded-full bg-yellow-300" />
          <div className="w-3 h-3 rounded-full bg-green-300" />
        </div>
        <div className="flex-1 max-w-sm mx-auto">
          <div className="h-6 bg-white rounded border border-gray-200 flex items-center px-3 text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            keywordview.kr
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] text-gray-400 mb-0.5">블로그 키워드 분석</div>
            <div className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
              &ldquo;다이어트 식단&rdquo;
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">A등급</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-7 px-3 bg-white border border-gray-200 rounded-lg flex items-center text-[10px] text-gray-500">엑셀 저장</div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          <div className="bg-gray-50 p-2.5 sm:p-3 rounded-xl">
            <div className="text-[10px] text-gray-400 mb-1">총 검색량</div>
            <div className="text-sm sm:text-lg font-bold text-gray-900">23,600</div>
            <div className="text-[10px] text-gray-400">PC 5,400 / MO 18,200</div>
          </div>
          <div className="bg-gray-50 p-2.5 sm:p-3 rounded-xl">
            <div className="text-[10px] text-gray-400 mb-1">발행 문서 수</div>
            <div className="text-sm sm:text-lg font-bold text-gray-900">342,100</div>
            <div className="text-[10px] text-emerald-500 font-medium">경쟁 적음</div>
          </div>
          <div className="bg-gray-50 p-2.5 sm:p-3 rounded-xl">
            <div className="text-[10px] text-gray-400 mb-1">검색 비율</div>
            <div className="text-sm sm:text-lg font-bold text-primary-600">0.07</div>
            <div className="text-[10px] text-gray-400">상위노출 가능성 높음</div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
          <table className="w-full text-[10px] sm:text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-2 font-semibold text-gray-500">키워드</th>
                <th className="text-right py-2 px-1 font-semibold text-gray-500 hidden sm:table-cell">PC</th>
                <th className="text-right py-2 px-1 font-semibold text-gray-500 hidden sm:table-cell">모바일</th>
                <th className="text-right py-2 px-1 font-semibold text-gray-500">총 검색량</th>
                <th className="text-right py-2 px-1 font-semibold text-gray-500 hidden sm:table-cell">블로그</th>
                <th className="text-right py-2 px-1 font-semibold text-gray-500">비율</th>
                <th className="text-center py-2 px-1 font-semibold text-gray-500">등급</th>
                <th className="text-center py-2 pl-1 font-semibold text-gray-500">경쟁</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((row, i) => (
                <tr key={i} className={`border-b border-gray-50 ${i === 0 ? "bg-primary-50/30" : ""}`}>
                  <td className="py-1.5 sm:py-2 pr-2 font-medium text-gray-800 whitespace-nowrap">{row.keyword}</td>
                  <td className="py-1.5 sm:py-2 px-1 text-right text-gray-600 hidden sm:table-cell">{row.pc}</td>
                  <td className="py-1.5 sm:py-2 px-1 text-right text-gray-600 hidden sm:table-cell">{row.mobile}</td>
                  <td className="py-1.5 sm:py-2 px-1 text-right font-semibold text-gray-800">{row.total}</td>
                  <td className="py-1.5 sm:py-2 px-1 text-right text-gray-500 hidden sm:table-cell">{row.blog}</td>
                  <td className="py-1.5 sm:py-2 px-1 text-right text-gray-600">{row.ratio}</td>
                  <td className="py-1.5 sm:py-2 px-1 text-center">
                    <span className={`inline-flex px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-${row.gradeColor}-100 text-${row.gradeColor}-700`}>
                      {row.grade}
                    </span>
                  </td>
                  <td className="py-1.5 sm:py-2 pl-1 text-center">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium bg-${row.compColor}-50 text-${row.compColor}-600`}>
                      {row.comp}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
