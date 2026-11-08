"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ArrowLeft, ChevronDown, Check, Plus } from "lucide-react";
import { BUDGET_FISCAL_YEARS, BUDGET_PERIODS } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksNewBudgetView({ tl }: Props) {
  const budgetName = useTimelineVar<string>(tl, "booksNewBudgetName", "");
  const fiscalYear = useTimelineVar<string>(tl, "booksNewBudgetYear", "Jan 2026 - Dec 2026");
  const fiscalYearOpen = useTimelineVar<boolean>(tl, "booksNewBudgetYearOpen", false);
  const period = useTimelineVar<string>(tl, "booksNewBudgetPeriod", "Monthly");
  const periodOpen = useTimelineVar<boolean>(tl, "booksNewBudgetPeriodOpen", false);

  const incomeAccounts = useTimelineVar<string[]>(tl, "booksNewBudgetIncome", []);
  const expenseAccounts = useTimelineVar<string[]>(tl, "booksNewBudgetExpense", []);
  const includeBalanceSheet = useTimelineVar<boolean>(tl, "booksNewBudgetIncludeBalanceSheet", false);
  const assetAccounts = useTimelineVar<string[]>(tl, "booksNewBudgetAsset", []);
  const liabilityAccounts = useTimelineVar<string[]>(tl, "booksNewBudgetLiability", []);
  const equityAccounts = useTimelineVar<string[]>(tl, "booksNewBudgetEquity", []);

  const [localYearOpen, setLocalYearOpen] = useState(false);
  const [localPeriodOpen, setLocalPeriodOpen] = useState(false);

  const showYearDropdown = fiscalYearOpen || localYearOpen;
  const showPeriodDropdown = periodOpen || localPeriodOpen;

  const totalIncomeExpenseCount = incomeAccounts.length + expenseAccounts.length;
  const totalBalanceSheetCount =
    assetAccounts.length + liabilityAccounts.length + equityAccounts.length;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-back-budgets"
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">New Budget</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-4xl mx-auto w-full space-y-6 pb-24">
        {/* Setup Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Budget Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-budget-name"
                placeholder="e.g. Expenses"
                value={budgetName}
                readOnly
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Fiscal Year <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  data-tl="select-budget-fiscal-year"
                  onClick={() => setLocalYearOpen(!localYearOpen)}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 flex items-center justify-between text-left shadow-sm"
                >
                  <span>{fiscalYear}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showYearDropdown && (
                  <div
                    data-tl="menu-budget-fiscal-years"
                    className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
                  >
                    {BUDGET_FISCAL_YEARS.map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        data-tl={`opt-year-${yr.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        onClick={() => setLocalYearOpen(false)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-gray-800 hover:text-blue-600 flex items-center justify-between"
                      >
                        <span>{yr}</span>
                        {fiscalYear === yr && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Period <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  data-tl="select-budget-period"
                  onClick={() => setLocalPeriodOpen(!localPeriodOpen)}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 flex items-center justify-between text-left shadow-sm"
                >
                  <span>{period}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showPeriodDropdown && (
                  <div
                    data-tl="menu-budget-periods"
                    className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
                  >
                    {BUDGET_PERIODS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        data-tl={`opt-period-${p.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        onClick={() => setLocalPeriodOpen(false)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-gray-800 hover:text-blue-600 flex items-center justify-between"
                      >
                        <span>{p}</span>
                        {period === p && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Income and Expense Accounts Section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Income and Expense Accounts</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure the revenue and expense line items for this budget cycle.
                </p>
              </div>
              <button
                type="button"
                data-tl="btn-add-accounts-income-expense"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Accounts</span>
              </button>
            </div>
            {totalIncomeExpenseCount > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {[...incomeAccounts, ...expenseAccounts].map((acc) => (
                  <span
                    key={acc}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-3 p-3 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-xs text-gray-500">
                No income/expense accounts selected. Click &quot;+ Add Accounts&quot; above.
              </div>
            )}
          </div>

          {/* Balance Sheet Checkbox & Section */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                data-tl="chk-include-balance-sheet"
                checked={includeBalanceSheet}
                readOnly
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-900">
                Include Assets, Liability, and Equity Accounts in Budget
              </span>
            </label>

            {includeBalanceSheet && (
              <div className="pl-6 pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Track balance sheet forecasts alongside operational profit & loss.
                  </p>
                  <button
                    type="button"
                    data-tl="btn-add-accounts-balance-sheet"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Accounts</span>
                  </button>
                </div>
                {totalBalanceSheetCount > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {[...assetAccounts, ...liabilityAccounts, ...equityAccounts].map((acc) => (
                      <span
                        key={acc}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"
                      >
                        {acc}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-xs text-gray-500">
                    No balance sheet accounts selected yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-create-budget"
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
          >
            Create Budget
          </button>
          <button
            type="button"
            data-tl="btn-cancel-new-budget"
            className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
