"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ChevronLeft,
  Home,
  Download,
  Printer,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";

interface Props {
  tl: Timeline;
}

export function BooksBalanceSheetView({ tl }: Props) {
  const asOfDate = useTimelineVar<string>(tl, "booksBsAsOfDate", "11/09/2026");
  const reportBasis = useTimelineVar<string>(tl, "booksBsBasis", "Accrual");
  const isRan = useTimelineVar<boolean>(tl, "booksBsRan", false);

  return (
    <div
      data-tl="balance-sheet-container"
      className="flex flex-col h-full w-full bg-white select-none overflow-hidden"
    >
      {/* 1. Breadcrumbs */}
      <div
        data-tl="balance-sheet-header"
        className="flex items-center gap-2 px-8 pt-4 pb-2 text-xs text-gray-500 border-b border-gray-100"
      >
        <button
          type="button"
          data-tl="btn-bs-back"
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
        <span className="font-semibold text-gray-900">Balance Sheet</span>
      </div>

      {/* 2. Top Title Bar */}
      <div className="flex items-center justify-between px-8 py-3 bg-white">
        <div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            Business Overview
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Balance Sheet
            </h1>
            <span className="text-gray-400">•</span>
            <span className="text-sm font-normal text-gray-500">
              As of 09 Nov 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-bs-download"
            title="Download"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-tl="btn-bs-print"
            title="Print"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Filters Row */}
      <div className="flex items-center gap-4 px-8 py-2.5 bg-[#FAFAFA] border-y border-gray-200 text-xs">
        <span className="text-gray-600 font-medium">As of :</span>
        <div className="relative w-36">
          <input
            type="text"
            data-tl="input-bs-date"
            value={asOfDate}
            onChange={(e) => tl.setVar("booksBsAsOfDate", e.target.value)}
            className="w-full h-8 pl-3 pr-8 text-xs bg-white border border-gray-200 rounded-lg text-gray-800"
          />
          <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <span className="text-gray-600 font-medium ml-2">Report Basis :</span>
        <select
          data-tl="select-bs-basis"
          value={reportBasis}
          onChange={(e) => tl.setVar("booksBsBasis", e.target.value)}
          className="h-8 px-2.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 cursor-pointer"
        >
          <option value="Accrual">Accrual</option>
          <option value="Cash">Cash</option>
        </select>

        <button
          type="button"
          data-tl="btn-bs-more-filters"
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer font-medium ml-2"
        >
          + More Filters
        </button>

        <button
          type="button"
          data-tl="btn-bs-run"
          onClick={() => tl.setVar("booksBsRan", true)}
          className="ml-auto px-4 py-1.5 bg-[#145CFB] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Run Report
        </button>
      </div>

      {/* 4. Body Area */}
      <div
        data-tl="bs-content-scroll"
        data-scroller="true"
        className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F6F6F8] flex flex-col items-center"
      >
        {!isRan ? (
          <div
            data-tl="bs-empty-state"
            className="my-auto max-w-[420px] text-center p-8 bg-white border border-gray-200/90 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Set your filters, then run the report.
            </h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Adjust the filters above and click &quot;Run Report&quot;.
            </p>
            <button
              type="button"
              data-tl="btn-empty-bs-run"
              onClick={() => tl.setVar("booksBsRan", true)}
              className="px-5 py-2 bg-[#145CFB] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Run Report
            </button>
          </div>
        ) : (
          <div
            data-tl="bs-report-sheet"
            className="w-full max-w-[800px] bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
          >
            <div className="text-center pb-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Balance Sheet
              </h2>
              <div className="text-xs font-semibold text-gray-400 mt-1">
                Basis : {reportBasis.toUpperCase()}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                As of 09 Nov 2026
              </div>
            </div>

            <table className="w-full text-xs mt-6 border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-semibold text-[11px] uppercase">
                  <th className="py-2 text-left">ACCOUNT</th>
                  <th className="py-2 text-right w-[160px]">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {/* Current Assets */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={2} className="py-2 px-2">Current Assets</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-gray-700">Undeposited Funds</td>
                  <td className="py-1.5 text-right font-medium">420.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-gray-700">Accounts Receivable</td>
                  <td className="py-1.5 text-right font-medium">2,449.60</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-gray-700">Prepaid Expenses</td>
                  <td className="py-1.5 text-right font-medium">293.91</td>
                </tr>
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pl-4">Total Current Assets</td>
                  <td className="py-2 text-right border-t border-gray-200">3,163.51</td>
                </tr>

                {/* Fixed Assets */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={2} className="py-2 px-2">Fixed Assets</td>
                </tr>
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pl-4">Total Fixed Assets</td>
                  <td className="py-2 text-right border-t border-gray-200">0.00</td>
                </tr>

                {/* Total Assets */}
                <tr className="bg-blue-50/40 font-bold text-gray-900 border-t border-b border-gray-200">
                  <td className="py-2.5 px-2">Total Assets</td>
                  <td className="py-2.5 px-2 text-right">3,163.51</td>
                </tr>

                {/* Liabilities */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={2} className="py-2 px-2">Current Liabilities</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-gray-700">Accounts Payable</td>
                  <td className="py-1.5 text-right font-medium">500.00</td>
                </tr>
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pl-4">Total Current Liabilities</td>
                  <td className="py-2 text-right border-t border-gray-200">500.00</td>
                </tr>

                {/* Equities */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={2} className="py-2 px-2">Equities</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-gray-700">Retained Earnings</td>
                  <td className="py-1.5 text-right font-medium">1,500.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-gray-700">Current Year Earnings</td>
                  <td className="py-1.5 text-right font-medium">1,163.51</td>
                </tr>
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pl-4">Total Equities</td>
                  <td className="py-2 text-right border-t border-gray-200">2,663.51</td>
                </tr>

                {/* Total Liabilities & Equities */}
                <tr className="bg-emerald-50/50 font-bold text-gray-900 text-sm border-t-2 border-b-2 border-gray-300">
                  <td className="py-3 px-2">Total Liabilities and Equities</td>
                  <td className="py-3 px-2 text-right text-emerald-700">3,163.51</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
