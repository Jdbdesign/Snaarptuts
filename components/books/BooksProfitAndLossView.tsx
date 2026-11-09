"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ChevronLeft,
  ChevronDown,
  Home,
  SlidersHorizontal,
  Download,
  Printer,
  Calendar,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";

interface Props {
  tl: Timeline;
}

export function BooksProfitAndLossView({ tl }: Props) {
  const dateRange = useTimelineVar<string>(tl, "booksPnlDateRange", "This Month");
  const reportBasis = useTimelineVar<string>(tl, "booksPnlBasis", "Accrual");
  const compareWith = useTimelineVar<string>(tl, "booksPnlCompareWith", "None");
  const isDateRangeOpen = useTimelineVar<boolean>(tl, "booksPnlDateRangeOpen", false);
  const isBasisOpen = useTimelineVar<boolean>(tl, "booksPnlBasisOpen", false);
  const isCompareOpen = useTimelineVar<boolean>(tl, "booksPnlCompareOpen", false);
  const isDrawerOpen = useTimelineVar<boolean>(tl, "booksPnlDrawerOpen", false);
  const isRan = useTimelineVar<boolean>(tl, "booksPnlRan", false);
  const customFrom = useTimelineVar<string>(
    tl,
    "booksPnlCustomFrom",
    dateRange === "Last Year" ? "01/01/2025" : "11/01/2026"
  );
  const customTo = useTimelineVar<string>(
    tl,
    "booksPnlCustomTo",
    dateRange === "Last Year" ? "12/31/2025" : "11/09/2026"
  );
  const activeTab = useTimelineVar<"table" | "chart">(tl, "booksPnlTab", "table");

  const isCash = reportBasis === "Cash";
  const isLastYear = dateRange === "Last Year";

  const periodLabel = isLastYear
    ? "From 01 Jan 2025 To 31 Dec 2025"
    : "From 01 Nov 2026 To 09 Nov 2026";
  const periodColumn = isLastYear ? "JAN 2025 TOTAL" : "NOV 2026 / TOTAL";

  const data = isLastYear
    ? {
        operatingIncome: "38,400.00",
        totalOperatingIncome: "38,400.00",
        cogs: "14,200.00",
        totalCogs: "14,200.00",
        grossProfit: "24,200.00",
        operatingExpenses: "11,890.00",
        totalOperatingExpenses: "11,890.00",
        operatingProfit: "12,310.00",
        nonOperatingIncome: "0.00",
        totalNonOperatingIncome: "0.00",
        nonOperatingExpenses: "0.00",
        totalNonOperatingExpenses: "0.00",
        netProfit: "12,310.00",
      }
    : {
        operatingIncome: "4,820.00",
        totalOperatingIncome: "4,820.00",
        cogs: "1,640.00",
        totalCogs: "1,640.00",
        grossProfit: "3,180.00",
        operatingExpenses: "1,250.00",
        totalOperatingExpenses: "1,250.00",
        operatingProfit: "1,930.00",
        nonOperatingIncome: "60.00",
        totalNonOperatingIncome: "60.00",
        nonOperatingExpenses: "45.00",
        totalNonOperatingExpenses: "45.00",
        netProfit: "1,945.00",
      };

  return (
    <div
      data-tl="pnl-page-container"
      className="relative flex flex-col h-full w-full bg-white select-none overflow-hidden"
    >
      {/* 1. Breadcrumbs */}
      <div
        data-tl="breadcrumb-reports"
        className="flex items-center gap-2 px-8 pt-4 pb-2 text-xs text-gray-500 border-b border-gray-100"
      >
        <button
          type="button"
          data-tl="btn-pnl-back"
          onClick={() => {
            tl.setVar("booksView", "reports-center");
            tl.setUrl(BOOKS_URLS.reportsCenter);
          }}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-gray-300">|</span>
        <Home className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-400">&gt;</span>
        <button
          type="button"
          onClick={() => {
            tl.setVar("booksView", "reports-center");
            tl.setUrl(BOOKS_URLS.reportsCenter);
          }}
          className="text-gray-600 hover:underline cursor-pointer"
        >
          Reports
        </button>
        <span className="text-gray-400">&gt;</span>
        <span className="font-semibold text-gray-900">Profit And Loss</span>
      </div>

      {/* 2. Top Title Bar */}
      <div className="flex items-center justify-between px-8 py-3 bg-white">
        <div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            Business Overview
          </div>
          <div className="flex items-center gap-2">
            <h1
              data-tl="pnl-title"
              className="text-xl font-bold text-gray-900 tracking-tight"
            >
              Profit and Loss
            </h1>
            <span className="text-gray-400">•</span>
            <span
              data-tl="pnl-range-label"
              className="text-sm font-normal text-gray-500"
            >
              {periodLabel}
            </span>
          </div>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-report-compare"
            title="Compare"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-tl="btn-report-download"
            title="Download"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-tl="btn-report-print"
            title="Print"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Filters Row */}
      <div className="flex items-center gap-3 px-8 py-2.5 bg-[#FAFAFA] border-y border-gray-200 text-xs">
        <span className="text-gray-600 font-medium">Filters :</span>

        {/* Date Range dropdown */}
        <div className="relative">
          <button
            type="button"
            data-tl="select-date-range"
            onClick={() => tl.setVar("booksPnlDateRangeOpen", !isDateRangeOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-50 cursor-pointer"
          >
            <span className="text-gray-500">Date Range :</span>
            <span className="font-medium">{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
          </button>
          {isDateRangeOpen && (
            <div className="absolute left-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
              {[
                "This Month",
                "This Quarter",
                "This Year",
                "Last Month",
                "Last Year",
                "Custom",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  data-tl={`date-range-option-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => {
                    tl.setVar("booksPnlDateRange", opt);
                    tl.setVar("booksPnlDateRangeOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Report Basis dropdown */}
        <div className="relative">
          <button
            type="button"
            data-tl="select-report-basis"
            onClick={() => tl.setVar("booksPnlBasisOpen", !isBasisOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-50 cursor-pointer"
          >
            <span className="text-gray-500">Report Basis :</span>
            <span className="font-medium">{reportBasis}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
          </button>
          {isBasisOpen && (
            <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
              {["Accrual", "Cash"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  data-tl={`basis-option-${opt.toLowerCase()}`}
                  onClick={() => {
                    tl.setVar("booksPnlBasis", opt);
                    tl.setVar("booksPnlBasisOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          data-tl="btn-more-filters"
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer font-medium"
        >
          + More Filters
        </button>

        <button
          type="button"
          data-tl="btn-run-report"
          onClick={() => {
            tl.setVar("booksPnlRan", true);
            tl.setVar("booksPnlDrawerOpen", true);
          }}
          className="ml-auto px-4 py-1.5 bg-[#145CFB] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Run Report
        </button>
      </div>

      {/* 4. Sub-Bar: Tabs & Compare */}
      <div className="flex items-center justify-between px-8 py-2 border-b border-gray-200 text-xs">
        <div className="flex items-center gap-4">
          <button
            type="button"
            data-tl="tab-table-view"
            onClick={() => tl.setVar("booksPnlTab", "table")}
            className={`pb-1 font-semibold cursor-pointer border-b-2 transition-colors ${
              activeTab === "table"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Table View
          </button>
          <button
            type="button"
            data-tl="tab-chart-view"
            onClick={() => tl.setVar("booksPnlTab", "chart")}
            className={`pb-1 font-medium cursor-pointer border-b-2 transition-colors ${
              activeTab === "chart"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Chart View
          </button>
        </div>

        {/* Compare With dropdown */}
        <div className="relative">
          <button
            type="button"
            data-tl="select-compare-with"
            onClick={() => tl.setVar("booksPnlCompareOpen", !isCompareOpen)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <span className="text-gray-500">Compare With :</span>
            <span className="font-medium">{compareWith}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
          </button>
          {isCompareOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
              {[
                "None",
                "Previous Period",
                "Previous 2 Periods",
                "Previous 3 Periods",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  data-tl={`compare-option-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => {
                    tl.setVar("booksPnlCompareWith", opt);
                    tl.setVar("booksPnlCompareOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Main Body Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Customize Report Drawer */}
        {isDrawerOpen && (
          <aside
            data-tl="drawer-customize-report"
            className="w-[280px] shrink-0 border-r border-gray-200 bg-white p-4 flex flex-col gap-4 overflow-y-auto no-scrollbar z-20"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-900">
                Customize Report
              </span>
              <button
                type="button"
                data-tl="btn-close-customize-drawer"
                onClick={() => tl.setVar("booksPnlDrawerOpen", false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Date Range chips */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                Date Range
              </label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  { label: "This Month", key: "This Month" },
                  { label: "This Quarter", key: "This Quarter" },
                  { label: "This Year", key: "This Year" },
                  { label: "Last Month", key: "Last Month" },
                  { label: "Last Year", key: "Last Year" },
                ].map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    data-tl={`chip-${chip.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => {
                      tl.setVar("booksPnlDateRange", chip.key);
                      if (chip.key === "Last Year") {
                        tl.setVar("booksPnlCustomFrom", "01/01/2025");
                        tl.setVar("booksPnlCustomTo", "12/31/2025");
                      } else {
                        tl.setVar("booksPnlCustomFrom", "11/01/2026");
                        tl.setVar("booksPnlCustomTo", "11/09/2026");
                      }
                    }}
                    className={`px-2.5 py-1 text-[11px] rounded-md border font-medium cursor-pointer transition-colors ${
                      dateRange === chip.key
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Date inputs */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    data-tl="input-custom-from"
                    value={customFrom}
                    onChange={(e) => tl.setVar("booksPnlCustomFrom", e.target.value)}
                    className="w-full h-8 pl-3 pr-8 text-xs bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                  <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    data-tl="input-custom-to"
                    value={customTo}
                    onChange={(e) => tl.setVar("booksPnlCustomTo", e.target.value)}
                    className="w-full h-8 pl-3 pr-8 text-xs bg-white border border-gray-200 rounded-lg text-gray-800"
                  />
                  <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="text-[11px] text-gray-400 mt-1.5 italic">
                Press &quot;Run Report&quot; to apply custom dates.
              </div>
            </div>

            {/* Report Basis */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Report Basis
              </label>
              <select
                data-tl="select-custom-basis"
                value={reportBasis}
                onChange={(e) => tl.setVar("booksPnlBasis", e.target.value)}
                className="w-full h-8 px-2.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 cursor-pointer"
              >
                <option value="Accrual">Accrual</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            {/* Compare With */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Compare With
              </label>
              <select
                data-tl="select-custom-compare"
                value={compareWith}
                onChange={(e) => tl.setVar("booksPnlCompareWith", e.target.value)}
                className="w-full h-8 px-2.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 cursor-pointer"
              >
                <option value="None">No Comparison</option>
                <option value="Previous Period">Previous Period</option>
                <option value="Previous 2 Periods">Previous 2 Periods</option>
                <option value="Previous 3 Periods">Previous 3 Periods</option>
              </select>
            </div>

            <button
              type="button"
              data-tl="btn-drawer-run-report"
              onClick={() => {
                tl.setVar("booksPnlRan", true);
              }}
              className="mt-2 w-full py-2 bg-[#145CFB] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Run Report
            </button>
          </aside>
        )}

        {/* Content Sheet Area */}
        <div
          data-tl="pnl-content-scroll"
          data-scroller="true"
          className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F6F6F8] flex flex-col items-center"
        >
          {!isRan ? (
            /* Empty State */
            <div
              data-tl="pnl-empty-state"
              className="my-auto max-w-[420px] text-center p-8 bg-white border border-gray-200/90 rounded-2xl shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Set your filters, then run the report.
              </h3>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                Choose a date range and basis above and click &quot;Run Report&quot;.
              </p>
              <button
                type="button"
                data-tl="btn-empty-run-report"
                onClick={() => {
                  tl.setVar("booksPnlRan", true);
                  tl.setVar("booksPnlDrawerOpen", true);
                }}
                className="px-5 py-2 bg-[#145CFB] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Run Report
              </button>
            </div>
          ) : (
            /* Result Sheet */
            <div className="w-full max-w-[760px] flex flex-col gap-4">
              {/* Cash Basis Notice Banner */}
              {isCash && (
                <div
                  data-tl="cash-basis-banner"
                  className="w-full bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-4 py-2.5 text-xs text-[#1E40AF] font-medium"
                >
                  Cash basis recognizes income when payment is received and expenses when paid.
                </div>
              )}

              {/* The White Financial Sheet */}
              <div
                data-tl="pnl-report-sheet"
                className="w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
              >
                {/* Header in sheet */}
                <div className="text-center pb-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">
                    Profit and Loss
                  </h2>
                  <div className="text-xs font-semibold text-gray-400 mt-1">
                    Basis : {reportBasis.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {periodLabel}
                  </div>
                </div>

                {/* Financial Table */}
                <table className="w-full text-xs mt-6 border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 font-semibold text-[11px] uppercase">
                      <th className="py-2 text-left">ACCOUNT</th>
                      <th
                        data-tl="th-period-total"
                        className="py-2 text-right w-[160px]"
                      >
                        {periodColumn}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-800">
                    {/* Operating Income */}
                    <tr className="bg-gray-50/50 font-semibold">
                      <td className="py-2 px-2">Operating Income</td>
                      <td className="py-2 px-2 text-right"></td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pl-6 text-gray-600">Operating Income</td>
                      <td className="py-1.5 text-right">{data.operatingIncome}</td>
                    </tr>
                    <tr className="font-semibold text-gray-900">
                      <td className="py-2 pl-4">Total for Operating Income</td>
                      <td className="py-2 text-right border-t border-gray-200">
                        {data.totalOperatingIncome}
                      </td>
                    </tr>

                    {/* Cost of Goods Sold */}
                    <tr className="bg-gray-50/50 font-semibold">
                      <td className="py-2 px-2">Cost of Goods Sold</td>
                      <td className="py-2 px-2 text-right"></td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pl-6 text-gray-600">Cost of Goods Sold</td>
                      <td className="py-1.5 text-right">{data.cogs}</td>
                    </tr>
                    <tr className="font-semibold text-gray-900">
                      <td className="py-2 pl-4">Total for Cost of Goods Sold</td>
                      <td className="py-2 text-right border-t border-gray-200">
                        {data.totalCogs}
                      </td>
                    </tr>

                    {/* Gross Profit */}
                    <tr className="bg-blue-50/40 font-bold text-gray-900 border-t border-b border-gray-200">
                      <td className="py-2.5 px-2">Gross Profit</td>
                      <td className="py-2.5 px-2 text-right">{data.grossProfit}</td>
                    </tr>

                    {/* Operating Expenses */}
                    <tr className="bg-gray-50/50 font-semibold">
                      <td className="py-2 px-2">Operating Expenses</td>
                      <td className="py-2 px-2 text-right"></td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pl-6 text-gray-600">Operating Expenses</td>
                      <td className="py-1.5 text-right">{data.operatingExpenses}</td>
                    </tr>
                    <tr className="font-semibold text-gray-900">
                      <td className="py-2 pl-4">Total for Operating Expenses</td>
                      <td className="py-2 text-right border-t border-gray-200">
                        {data.totalOperatingExpenses}
                      </td>
                    </tr>

                    {/* Operating Profit */}
                    <tr className="font-bold text-gray-900 border-t border-gray-200">
                      <td className="py-2.5 px-2">Operating Profit</td>
                      <td className="py-2.5 px-2 text-right">{data.operatingProfit}</td>
                    </tr>

                    {/* Non-Operating Income */}
                    <tr className="bg-gray-50/50 font-semibold">
                      <td className="py-2 px-2">Non-Operating Income</td>
                      <td className="py-2 px-2 text-right"></td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pl-6 text-gray-600">Non-Operating Income</td>
                      <td className="py-1.5 text-right">{data.nonOperatingIncome}</td>
                    </tr>
                    <tr className="font-semibold text-gray-900">
                      <td className="py-2 pl-4">Total for Non-Operating Income</td>
                      <td className="py-2 text-right border-t border-gray-200">
                        {data.totalNonOperatingIncome}
                      </td>
                    </tr>

                    {/* Non-Operating Expenses */}
                    <tr className="bg-gray-50/50 font-semibold">
                      <td className="py-2 px-2">Non-Operating Expenses</td>
                      <td className="py-2 px-2 text-right"></td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pl-6 text-gray-600">Non-Operating Expenses</td>
                      <td className="py-1.5 text-right">{data.nonOperatingExpenses}</td>
                    </tr>
                    <tr className="font-semibold text-gray-900">
                      <td className="py-2 pl-4">Total for Non-Operating Expenses</td>
                      <td className="py-2 text-right border-t border-gray-200">
                        {data.totalNonOperatingExpenses}
                      </td>
                    </tr>

                    {/* Net Profit */}
                    <tr className="bg-emerald-50/50 font-bold text-gray-900 text-sm border-t-2 border-b-2 border-gray-300">
                      <td className="py-3 px-2">Net Profit</td>
                      <td className="py-3 px-2 text-right text-emerald-700">
                        {data.netProfit}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
