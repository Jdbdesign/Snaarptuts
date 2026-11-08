"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ArrowLeft, Sparkles } from "lucide-react";

type Props = {
  tl: Timeline;
};

const MONTHS = [
  "Apr 2026",
  "May 2026",
  "Jun 2026",
  "Jul 2026",
  "Aug 2026",
  "Sep 2026",
  "Oct 2026",
  "Nov 2026",
  "Dec 2026",
  "Jan 2027",
  "Feb 2027",
  "Mar 2027",
];

const DEFAULT_ACCOUNTS = [
  { name: "Shipping Charges", type: "Income" },
  { name: "Late Fee Income", type: "Income" },
  { name: "Cost of Goods Sold", type: "Expense" },
  { name: "Insurance", type: "Expense" },
];

export function BooksBudgetDetailView({ tl }: Props) {
  const activeTab = useTimelineVar<string>(tl, "booksBudgetGridTab", "income-expense");
  const gridValues = useTimelineVar<Record<string, number>>(tl, "booksBudgetGridValues", {});

  // Compute row totals and column totals
  const getVal = (row: number, col: number) => {
    const k = `${row}-${col}`;
    return gridValues[k] !== undefined ? gridValues[k] : 0;
  };

  const getRowTotal = (row: number) => {
    let sum = 0;
    for (let c = 0; c < 12; c++) {
      sum += getVal(row, c);
    }
    return sum;
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-back-budgets"
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Expenses (Apr 2026 - Mar 2027)</h2>
            <p className="text-xs text-gray-500">Period: Monthly | Currency: GBP (£)</p>
          </div>
        </div>

        <button
          type="button"
          data-tl="btn-prefill-actuals"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>Pre-fill from Previous Years&apos; Actuals</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-6">
        <button
          type="button"
          data-tl="tab-budget-income-expense"
          className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "income-expense"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Income and Expense Accounts
        </button>
        <button
          type="button"
          data-tl="tab-budget-balance-sheet"
          className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "balance-sheet"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Assets, Liability and Equity
        </button>
      </div>

      {/* Grid Container */}
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-4 py-3 min-w-[180px] sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                  Account
                </th>
                {MONTHS.map((m) => (
                  <th key={m} className="px-3 py-3 min-w-[90px] text-right">
                    {m}
                  </th>
                ))}
                <th className="px-4 py-3 min-w-[100px] text-right bg-blue-50/50 text-blue-900 border-l border-gray-200">
                  TOTAL (£)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {DEFAULT_ACCOUNTS.map((acc, rowIdx) => {
                const rowTotal = getRowTotal(rowIdx);
                return (
                  <tr key={acc.name} className="hover:bg-gray-50/50">
                    <td className="px-4 py-2.5 font-sans font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-200">
                      <div>
                        <span>{acc.name}</span>
                        <span className="block text-[10px] text-gray-400 font-normal uppercase">
                          {acc.type}
                        </span>
                      </div>
                    </td>
                    {MONTHS.map((m, colIdx) => {
                      const val = getVal(rowIdx, colIdx);
                      return (
                        <td key={colIdx} className="px-2 py-1.5 text-right">
                          <input
                            type="text"
                            data-tl={`input-cell-${rowIdx}-${colIdx}`}
                            value={val > 0 ? val.toLocaleString() : ""}
                            placeholder="0"
                            readOnly
                            className="w-full text-right px-1.5 py-1 bg-gray-50/80 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded text-xs text-gray-900 font-mono transition-colors"
                          />
                        </td>
                      );
                    })}
                    <td className="px-4 py-2.5 text-right font-bold text-gray-900 bg-blue-50/30 border-l border-gray-200">
                      £{rowTotal.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-6">
          <button
            type="button"
            data-tl="btn-save-budget-grid"
            className="px-6 py-2.5 bg-[#145CFB] hover:bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            data-tl="btn-cancel-budget-grid"
            className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
