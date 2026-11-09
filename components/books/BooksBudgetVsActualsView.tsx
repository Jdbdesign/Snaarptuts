"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ChevronLeft,
  Home,
  Download,
  Printer,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";

interface Props {
  tl: Timeline;
}

export function BooksBudgetVsActualsView({ tl }: Props) {
  const selectedBudget = useTimelineVar<string>(tl, "booksBvaBudget", "Expenses (FY2026)");
  const selectedBasis = useTimelineVar<string>(tl, "booksBvaBasis", "Accrual");

  const rows = [
    { account: "3001 - Retained Earnings", period: "2026-12", budget: "0.00", actual: "0.00", diff: "0.00", pct: "-" },
    { account: "1300 - Prepaid Expenses", period: "2026-09", budget: "0.00", actual: "36.49", diff: "36.49", pct: "-" },
    { account: "5106 - Insurance", period: "2026-09", budget: "150.00", actual: "120.00", diff: "-30.00", pct: "80%" },
    { account: "5200 - Advertising and Marketing", period: "2026-09", budget: "500.00", actual: "420.00", diff: "-80.00", pct: "84%" },
    { account: "5200 - Advertising and Marketing", period: "2026-10", budget: "500.00", actual: "520.00", diff: "20.00", pct: "104%" },
    { account: "5200 - Advertising and Marketing", period: "2026-11", budget: "500.00", actual: "310.00", diff: "-190.00", pct: "62%" },
    { account: "5300 - Bank Fees and Charges", period: "2026-09", budget: "50.00", actual: "35.00", diff: "-15.00", pct: "70%" },
    { account: "5300 - Bank Fees and Charges", period: "2026-10", budget: "50.00", actual: "45.00", diff: "-5.00", pct: "90%" },
    { account: "5300 - Bank Fees and Charges", period: "2026-11", budget: "50.00", actual: "50.00", diff: "0.00", pct: "100%" },
    { account: "5400 - IT and Internet Expenses", period: "2026-09", budget: "120.00", actual: "115.00", diff: "-5.00", pct: "96%" },
    { account: "5400 - IT and Internet Expenses", period: "2026-10", budget: "120.00", actual: "120.00", diff: "0.00", pct: "100%" },
    { account: "5400 - IT and Internet Expenses", period: "2026-11", budget: "120.00", actual: "135.00", diff: "15.00", pct: "113%" },
    { account: "5500 - Office Supplies", period: "2026-09", budget: "80.00", actual: "65.00", diff: "-15.00", pct: "81%" },
    { account: "5500 - Office Supplies", period: "2026-10", budget: "80.00", actual: "90.00", diff: "10.00", pct: "113%" },
    { account: "5500 - Office Supplies", period: "2026-11", budget: "80.00", actual: "40.00", diff: "-40.00", pct: "50%" },
    { account: "5600 - Rent Expense", period: "2026-09", budget: "1,200.00", actual: "1,200.00", diff: "0.00", pct: "100%" },
    { account: "5600 - Rent Expense", period: "2026-10", budget: "1,200.00", actual: "1,200.00", diff: "0.00", pct: "100%" },
    { account: "5600 - Rent Expense", period: "2026-11", budget: "1,200.00", actual: "1,200.00", diff: "0.00", pct: "100%" },
    { account: "5700 - Telephone & Utilities", period: "2026-09", budget: "90.00", actual: "85.00", diff: "-5.00", pct: "94%" },
    { account: "5700 - Telephone & Utilities", period: "2026-10", budget: "90.00", actual: "95.00", diff: "5.00", pct: "106%" },
    { account: "5700 - Telephone & Utilities", period: "2026-11", budget: "90.00", actual: "88.00", diff: "-2.00", pct: "98%" },
    { account: "5800 - Travel & Subsistence", period: "2026-09", budget: "250.00", actual: "210.00", diff: "-40.00", pct: "84%" },
    { account: "5800 - Travel & Subsistence", period: "2026-10", budget: "250.00", actual: "275.00", diff: "25.00", pct: "110%" },
    { account: "5800 - Travel & Subsistence", period: "2026-11", budget: "250.00", actual: "180.00", diff: "-70.00", pct: "72%" },
    { account: "5900 - Professional Fees", period: "2026-09", budget: "300.00", actual: "300.00", diff: "0.00", pct: "100%" },
    { account: "5900 - Professional Fees", period: "2026-10", budget: "300.00", actual: "350.00", diff: "50.00", pct: "117%" },
    { account: "5900 - Professional Fees", period: "2026-11", budget: "300.00", actual: "250.00", diff: "-50.00", pct: "83%" },
    { account: "6000 - Miscellaneous Expenses", period: "2026-09", budget: "50.00", actual: "20.00", diff: "-30.00", pct: "40%" },
    { account: "6000 - Miscellaneous Expenses", period: "2026-10", budget: "50.00", actual: "45.00", diff: "-5.00", pct: "90%" },
    { account: "6000 - Miscellaneous Expenses", period: "2026-11", budget: "50.00", actual: "30.00", diff: "-20.00", pct: "60%" },
  ];

  return (
    <div
      data-tl="bva-page-container"
      className="flex flex-col h-full w-full bg-white select-none overflow-hidden"
    >
      {/* 1. Breadcrumbs */}
      <div
        data-tl="bva-header"
        className="flex items-center gap-2 px-8 pt-4 pb-2 text-xs text-gray-500 border-b border-gray-100"
      >
        <button
          type="button"
          data-tl="btn-bva-back"
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
        <span className="font-semibold text-gray-900">Budget Vs Actuals</span>
      </div>

      {/* 2. Top Title Bar */}
      <div className="flex items-center justify-between px-8 py-3 bg-white">
        <div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            Budget
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Budget vs Actuals
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-bva-download"
            title="Download"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-tl="btn-bva-print"
            title="Print"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Filters Row */}
      <div className="flex items-center gap-6 px-8 py-2.5 bg-[#FAFAFA] border-y border-gray-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Budget :</span>
          <select
            data-tl="select-bva-budget"
            value={selectedBudget}
            onChange={(e) => tl.setVar("booksBvaBudget", e.target.value)}
            className="h-8 px-3 text-xs bg-white border border-blue-500 ring-2 ring-blue-100 rounded-lg text-gray-800 font-medium cursor-pointer"
          >
            <option value="Expenses (FY2026)">Expenses (FY2026)</option>
            <option value="Revenue (FY2026)">Revenue (FY2026)</option>
            <option value="Operations (FY2026)">Operations (FY2026)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Basis :</span>
          <select
            data-tl="select-bva-basis"
            value={selectedBasis}
            onChange={(e) => tl.setVar("booksBvaBasis", e.target.value)}
            className="h-8 px-3 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 font-medium cursor-pointer"
          >
            <option value="Accrual">Accrual</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
      </div>

      {/* 4. Table Area with inner scroll */}
      <div
        data-tl="bva-table-scroll"
        data-scroller="true"
        className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F6F6F8]"
      >
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#FAFAFA] text-gray-500 font-semibold text-[11px] uppercase">
                <th className="py-2.5 px-4 text-left">ACCOUNT</th>
                <th className="py-2.5 px-3 text-center w-[100px]">PERIOD</th>
                <th className="py-2.5 px-3 text-right w-[120px]">BUDGET</th>
                <th className="py-2.5 px-3 text-right w-[120px]">ACTUAL</th>
                <th className="py-2.5 px-3 text-right w-[120px]">DIFFERENCE</th>
                <th className="py-2.5 px-3 text-center w-[90px]">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-2 px-4 font-medium text-gray-900">{r.account}</td>
                  <td className="py-2 px-3 text-center text-gray-500 font-mono text-[11px]">
                    {r.period}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-700 font-medium">{r.budget}</td>
                  <td className="py-2 px-3 text-right text-emerald-600 font-semibold">
                    {r.actual}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-700 font-medium">{r.diff}</td>
                  <td className="py-2 px-3 text-center text-gray-500 font-medium">{r.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
