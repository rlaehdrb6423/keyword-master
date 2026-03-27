export default function DashboardMockup() {
  return (
    <div className="rounded-2xl bg-white shadow-2xl shadow-gray-200/80 border border-gray-100 overflow-hidden" style={{ height: 500, display: "flex", flexDirection: "column" }}>
      {/* Browser bar */}
      <div className="h-11 border-b border-gray-100 bg-gray-50 flex items-center px-4 gap-3 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-300" />
          <div className="w-3 h-3 rounded-full bg-yellow-300" />
          <div className="w-3 h-3 rounded-full bg-green-300" />
        </div>
        <div className="flex-1 max-w-xs mx-auto">
          <div className="h-6 bg-white rounded border border-gray-200 flex items-center px-3 text-xs text-gray-400">
            <svg className="w-3 h-3 mr-1.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            키워드를 검색하세요...
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-48 border-r border-gray-100 bg-gray-50/40 p-3 gap-1 shrink-0">
          <div className="h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center px-3 gap-2">
            <div className="w-3.5 h-3.5 rounded bg-primary-200 shrink-0" />
            <div className="h-2.5 w-14 bg-primary-300/50 rounded" />
          </div>
          <div className="h-8 rounded-lg flex items-center px-3 gap-2 hover:bg-gray-100">
            <div className="w-3.5 h-3.5 rounded bg-gray-200 shrink-0" />
            <div className="h-2.5 w-16 bg-gray-200 rounded" />
          </div>
          <div className="h-8 rounded-lg flex items-center px-3 gap-2">
            <div className="w-3.5 h-3.5 rounded bg-gray-200 shrink-0" />
            <div className="h-2.5 w-10 bg-gray-200 rounded" />
          </div>
          <div className="mt-auto pt-3 border-t border-gray-200">
            <div className="h-2 w-8 bg-gray-200 rounded mb-2 mx-3" />
            <div className="h-8 rounded-lg flex items-center px-3 gap-2">
              <div className="w-3.5 h-3.5 rounded bg-gray-200 shrink-0" />
              <div className="h-2.5 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 p-5 overflow-hidden">
          <div className="flex justify-between items-end mb-5">
            <div>
              <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-7 w-44 bg-gray-800 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-white border border-gray-200 rounded-lg" />
              <div className="h-8 w-8 bg-primary-50 border border-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </div>
          </div>
          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
              <div className="h-2.5 w-14 bg-gray-200 rounded mb-2.5" />
              <div className="h-5 w-16 bg-gray-800 rounded mb-1.5" />
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                <div className="h-2 w-10 bg-emerald-100 rounded" />
              </div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
              <div className="h-2.5 w-18 bg-gray-200 rounded mb-2.5" />
              <div className="h-5 w-20 bg-gray-800 rounded mb-1.5" />
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                <div className="h-2 w-12 bg-emerald-100 rounded" />
              </div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
              <div className="h-2.5 w-12 bg-gray-200 rounded mb-2.5" />
              <div className="h-5 w-14 bg-gray-800 rounded mb-1.5" />
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
                <div className="h-2 w-8 bg-red-100 rounded" />
              </div>
            </div>
          </div>
          {/* Charts */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="h-3 w-28 bg-gray-200 rounded mb-5" />
              <div className="space-y-3.5">
                {[80, 65, 45, 30, 15].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-14 h-2.5 bg-gray-100 rounded shrink-0" />
                    <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full animate-grow-width ${i < 3 ? "bg-primary-" + (500 - i * 100) : "bg-gray-" + (300 - (i - 3) * 100)}`}
                        style={{ width: `${w}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
              <div className="space-y-2">
                {[
                  { score: 85, color: "green" },
                  { score: 72, color: "green" },
                  { score: 45, color: "yellow" },
                  { score: 12, color: "red" },
                ].map((item, i) => (
                  <div key={i} className={`flex justify-between items-center p-2 ${i % 2 === 0 ? "bg-gray-50" : ""} rounded-lg`}>
                    <div className={`h-2.5 ${i === 3 ? "w-24" : i === 1 ? "w-20" : i === 2 ? "w-14" : "w-16"} bg-gray-${i === 0 ? "300" : "200"} rounded`} />
                    <div className={`text-[10px] font-bold text-${item.color}-700 bg-${item.color}-100 px-1.5 py-0.5 rounded`}>
                      {item.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
