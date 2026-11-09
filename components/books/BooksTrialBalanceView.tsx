"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ChevronLeft,
  Home,
  Download,
  Printer,
  Calendar,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";

interface Props {
  tl: Timeline;
}

export function BooksTrialBalanceView({ tl }: Props) {
  const asOfDate = useTimelineVar<string>(tl, "booksTbAsOfDate", "11/09/2026");
  const reportBasis = useTimelineVar<string>(tl, "booksTbBasis", "Accrual");
  const isRan = useTimelineVar<boolean>(tl, "booksTbRan", true);

  return (
    <div
      data-tl="trial-balance-container"
      className="flex flex-col h-full w-full bg-white select-none overflow-hidden"
    >
      {/* 1. Breadcrumbs */}
      <div
        data-tl="trial-balance-header"
        className="flex items-center gap-2 px-8 pt-4 pb-2 text-xs text-gray-500 border-b border-gray-100"
      >
        <button
          type="button"
          data-tl="btn-tb-back"
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
        <span className="font-semibold text-gray-900">Trial Balance</span>
      </div>

      {/* 2. Top Title Bar */}
      <div className="flex items-center justify-between px-8 py-3 bg-white">
        <div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            Accountant
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Trial Balance
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
            data-tl="btn-tb-download"
            title="Download"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-tl="btn-tb-print"
            title="Print"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Filters Row */}
      <div className="flex items-center gap-4 px-8 py-2.5 bg-[#FAFAFA] border-y border-gray-200 text-xs">
        <span className="text-gray-600 font-medium">As of Date :</span>
        <div className="relative w-36">
          <input
            type="text"
            data-tl="input-tb-date"
            value={asOfDate}
            onChange={(e) => tl.setVar("booksTbAsOfDate", e.target.value)}
            className="w-full h-8 pl-3 pr-8 text-xs bg-white border border-gray-200 rounded-lg text-gray-800"
          />
          <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <span className="text-gray-600 font-medium ml-2">Report Basis :</span>
        <select
          data-tl="select-tb-basis"
          value={reportBasis}
          onChange={(e) => tl.setVar("booksTbBasis", e.target.value)}
          className="h-8 px-2.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 cursor-pointer"
        >
          <option value="Accrual">Accrual</option>
          <option value="Cash">Cash</option>
        </select>

        <button
          type="button"
          data-tl="btn-tb-more-filters"
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer font-medium ml-2"
        >
          + More Filters
        </button>

        <button
          type="button"
          data-tl="btn-tb-run"
          onClick={() => tl.setVar("booksTbRan", true)}
          className="ml-auto px-4 py-1.5 bg-[#145CFB] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Run Report
        </button>
      </div>

      {/* 4. Body Sheet */}
      <div
        data-tl="tb-content-scroll"
        data-scroller="true"
        className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F6F6F8] flex flex-col items-center"
      >
        {isRan && (
          <div
            data-tl="tb-report-sheet"
            className="w-full max-w-[800px] bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
          >
            <div className="text-center pb-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Trial Balance
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
                <tr className="border-b border-gray-200 bg-[#FAFAFA] text-gray-500 font-semibold text-[11px] uppercase">
                  <th className="py-2.5 px-3 text-left">ACCOUNT</th>
                  <th className="py-2.5 px-3 text-right w-[150px]">NET DEBIT</th>
                  <th className="py-2.5 px-3 text-right w-[150px]">NET CREDIT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {/* Assets */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={3} className="py-2 px-3">Assets</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Undeposited Funds</td>
                  <td className="py-1.5 px-3 text-right font-medium">420.00</td>
                  <td className="py-1.5 px-3 text-right"></td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Accounts Receivable</td>
                  <td className="py-1.5 px-3 text-right font-medium">2,449.60</td>
                  <td className="py-1.5 px-3 text-right"></td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Prepaid Expenses</td>
                  <td className="py-1.5 px-3 text-right font-medium">293.91</td>
                  <td className="py-1.5 px-3 text-right"></td>
                </tr>

                {/* Liabilities */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={3} className="py-2 px-3">Liabilities</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Accounts Payable</td>
                  <td className="py-1.5 px-3 text-right"></td>
                  <td className="py-1.5 px-3 text-right font-medium">500.00</td>
                </tr>

                {/* Equities */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={3} className="py-2 px-3">Equities</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Retained Earnings</td>
                  <td className="py-1.5 px-3 text-right"></td>
                  <td className="py-1.5 px-3 text-right font-medium">1,500.00</td>
                </tr>

                {/* Income */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={3} className="py-2 px-3">Income</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Sales</td>
                  <td className="py-1.5 px-3 text-right"></td>
                  <td className="py-1.5 px-3 text-right font-medium">4,820.00</td>
                </tr>

                {/* Expense */}
                <tr className="bg-gray-50/50 font-bold text-gray-900">
                  <td colSpan={3} className="py-2 px-3">Expense</td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Advertising and Marketing</td>
                  <td className="py-1.5 px-3 text-right font-medium">2,156.49</td>
                  <td className="py-1.5 px-3 text-right"></td>
                </tr>
                <tr>
                  <td className="py-1.5 pl-6 text-[#1D4ED8] hover:underline cursor-pointer">Bank Fees and Charges</td>
                  <td className="py-1.5 px-3 text-right font-medium">1,500.00</td>
                  <td className="py-1.5 px-3 text-right"></td>
                </tr>

                {/* Total Row */}
                <tr className="bg-gray-50/80 font-bold text-gray-900 border-t-2 border-b-2 border-gray-300">
                  <td className="py-3 px-3">Total for Trial Balance</td>
                  <td className="py-3 px-3 text-right font-bold text-gray-900">6,820.00</td>
                  <td className="py-3 px-3 text-right font-bold text-gray-900">6,820.00</td>
                </tr>
              </tbody>
            </table>

            <div className="text-xs text-gray-400 mt-4 italic">
              **Amount is displayed in your base currency (GBP)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
