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

export function BooksTaxSummaryView({ tl }: Props) {
  const fromDate = useTimelineVar<string>(tl, "booksTaxFromDate", "01/01/2026");
  const toDate = useTimelineVar<string>(tl, "booksTaxToDate", "11/09/2026");
  const isRan = useTimelineVar<boolean>(tl, "booksTaxRan", true);

  return (
    <div
      data-tl="tax-summary-container"
      className="flex flex-col h-full w-full bg-white select-none overflow-hidden"
    >
      {/* 1. Breadcrumbs */}
      <div
        data-tl="tax-summary-header"
        className="flex items-center gap-2 px-8 pt-4 pb-2 text-xs text-gray-500 border-b border-gray-100"
      >
        <button
          type="button"
          data-tl="btn-tax-back"
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
        <span className="font-semibold text-gray-900">Tax Summary</span>
      </div>

      {/* 2. Top Title Bar */}
      <div className="flex items-center justify-between px-8 py-3 bg-white">
        <div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            Taxes
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Tax Summary
            </h1>
            <span className="text-gray-400">•</span>
            <span className="text-sm font-normal text-gray-500">
              From 01 Jan 2026 To 09 Nov 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-tax-download"
            title="Download"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-tl="btn-tax-print"
            title="Print"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Filters Row */}
      <div className="flex items-center gap-4 px-8 py-2.5 bg-[#FAFAFA] border-y border-gray-200 text-xs">
        <span className="text-gray-600 font-medium">From :</span>
        <div className="relative w-36">
          <input
            type="text"
            data-tl="input-tax-from"
            value={fromDate}
            onChange={(e) => tl.setVar("booksTaxFromDate", e.target.value)}
            className="w-full h-8 pl-3 pr-8 text-xs bg-white border border-gray-200 rounded-lg text-gray-800"
          />
          <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <span className="text-gray-600 font-medium">To :</span>
        <div className="relative w-36">
          <input
            type="text"
            data-tl="input-tax-to"
            value={toDate}
            onChange={(e) => tl.setVar("booksTaxToDate", e.target.value)}
            className="w-full h-8 pl-3 pr-8 text-xs bg-white border border-gray-200 rounded-lg text-gray-800"
          />
          <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          type="button"
          data-tl="btn-tax-more-filters"
          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer font-medium ml-2"
        >
          + More Filters
        </button>

        <button
          type="button"
          data-tl="btn-tax-run"
          onClick={() => tl.setVar("booksTaxRan", true)}
          className="ml-auto px-4 py-1.5 bg-[#145CFB] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Run Report
        </button>
      </div>

      {/* 4. Body Sheet */}
      <div
        data-tl="tax-content-scroll"
        data-scroller="true"
        className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F6F6F8] flex flex-col items-center"
      >
        {isRan && (
          <div
            data-tl="tax-report-sheet"
            className="w-full max-w-[800px] bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
          >
            <div className="text-center pb-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Tax Summary</h2>
              <div className="text-xs text-gray-500 mt-1">
                From 01 Jan 2026 To 09 Nov 2026
              </div>
            </div>

            <table className="w-full text-xs mt-6 border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#FAFAFA] text-gray-500 font-semibold text-[11px] uppercase">
                  <th className="py-2.5 px-3 text-left">TAX NAME</th>
                  <th className="py-2.5 px-3 text-right">TAX RATE</th>
                  <th className="py-2.5 px-3 text-right">TAXABLE AMOUNT</th>
                  <th className="py-2.5 px-3 text-right">TAX AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-gray-900">Standard Rate VAT (20%)</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">20.00%</td>
                  <td className="py-2.5 px-3 text-right font-medium">1,144.00</td>
                  <td className="py-2.5 px-3 text-right font-bold text-gray-900">228.80</td>
                </tr>
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-gray-900">Zero Rate VAT (0%)</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">0.00%</td>
                  <td className="py-2.5 px-3 text-right font-medium">0.00</td>
                  <td className="py-2.5 px-3 text-right font-bold text-gray-900">0.00</td>
                </tr>
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-gray-900">Exempt (0%)</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">0.00%</td>
                  <td className="py-2.5 px-3 text-right font-medium">0.00</td>
                  <td className="py-2.5 px-3 text-right font-bold text-gray-900">0.00</td>
                </tr>
                <tr className="bg-gray-50/80 font-bold text-gray-900 border-t-2 border-gray-300">
                  <td className="py-3 px-3">Total</td>
                  <td className="py-3 px-3 text-right"></td>
                  <td className="py-3 px-3 text-right">1,144.00</td>
                  <td className="py-3 px-3 text-right text-blue-700">228.80</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
