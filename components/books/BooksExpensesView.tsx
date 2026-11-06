"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_EXPENSES,
  type ExpenseItem,
} from "./books-data";
import {
  ChevronDown,
  Plus,
  Star,
  Trash2,
  CheckCircle2,
  CreditCard,
  Circle,
  FileText,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksExpensesView({ tl }: Props) {
  const expenses = useTimelineVar<ExpenseItem[]>(
    tl,
    "booksExpenses",
    INITIAL_EXPENSES
  );
  const currentViewName = useTimelineVar<string>(
    tl,
    "booksExpenseViewName",
    "All Expenses"
  );
  const [dropdownOpen, setDropdownOpen] = useState(
    tl.getVar<boolean>("booksExpenseViewsDropdownOpen", false)
  );

  const VIEWS = [
    { id: "all", label: "All" },
    { id: "unbilled", label: "Unbilled" },
    { id: "invoiced", label: "Invoiced" },
    { id: "reimbursed", label: "Reimbursed" },
    { id: "non-billable", label: "Non-Billable" },
    { id: "with-receipts", label: "With Receipts" },
    { id: "without-receipts", label: "Without Receipts" },
  ];

  const isEmptyView =
    currentViewName === "Invoiced" ||
    currentViewName === "Reimbursed" ||
    currentViewName === "Non-Billable" ||
    currentViewName === "With Receipts" ||
    currentViewName === "Without Receipts";

  const handleRowClick = (expense: ExpenseItem) => {
    tl.setVar("booksActiveExpense", expense);
    tl.setVar("booksView", "expense-details");
    tl.setUrl(BOOKS_URLS.expenseDetails);
  };

  const handleNewExpense = () => {
    tl.setVar("booksView", "new-expense");
    tl.setUrl(BOOKS_URLS.newExpense);
  };

  const handleDeleteClick = (e: React.MouseEvent, expense: ExpenseItem) => {
    e.stopPropagation();
    tl.setVar("booksExpenseToDeleteLabel", expense.reference !== "-" ? expense.reference : expense.date);
    tl.setVar("booksExpenseToDeleteId", expense.id);
    tl.setVar("booksExpenseConfirmOpen", true);
  };

  const handleSelectView = (viewLabel: string) => {
    tl.setVar(
      "booksExpenseViewName",
      viewLabel === "All" ? "All Expenses" : viewLabel
    );
    setDropdownOpen(false);
    tl.setVar("booksExpenseViewsDropdownOpen", false);
  };

  return (
    <div
      data-tl="books-expenses-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 relative">
            <span className="text-sm font-medium text-gray-400">
              Receipts Inbox
            </span>
            <div className="relative">
              <button
                type="button"
                data-tl="btn-expense-views-dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 text-xl font-bold text-[#111827] hover:text-gray-700 transition-colors cursor-pointer"
              >
                <span data-tl="title-expenses-view">{currentViewName}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Views Dropdown */}
              {dropdownOpen && (
                <div
                  data-tl="dropdown-expense-views"
                  className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30"
                >
                  <div className="space-y-0.5">
                    {VIEWS.map((v) => {
                      const isSelected =
                        (v.label === "All" && currentViewName === "All Expenses") ||
                        currentViewName === v.label;
                      return (
                        <div
                          key={v.id}
                          data-tl={`view-opt-${v.id}`}
                          onClick={() => handleSelectView(v.label)}
                          className={`flex items-center justify-between px-3.5 py-1.5 text-xs cursor-pointer transition-colors ${
                            isSelected
                              ? "text-[#2563EB] font-medium bg-[#EFF6FF]"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{v.label}</span>
                          <Star className="w-3.5 h-3.5 text-gray-300" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-100 mt-1.5 pt-1.5 px-3.5">
                    <button
                      type="button"
                      data-tl="btn-new-view"
                      className="flex items-center gap-1.5 text-xs text-[#2563EB] hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New View</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-expenses-import"
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
            >
              Import
            </button>
            <button
              type="button"
              data-tl="btn-new-expense"
              onClick={handleNewExpense}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>
          </div>
        </div>

        {/* Content: Either Empty State or Table */}
        {isEmptyView ? (
          <div
            data-tl="card-expenses-empty-state"
            className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-2xl mx-auto space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Time To Manage Your Expenses!
              </h2>
              <p className="text-xs text-gray-500 mt-1.5 max-w-md">
                Create and manage expenses that are part of your organization&apos;s operating costs.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                data-tl="btn-empty-record-expense"
                onClick={handleNewExpense}
                className="px-6 py-2.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Record Expense
              </button>
              <button
                type="button"
                className="text-xs text-[#2563EB] hover:underline font-medium cursor-pointer"
              >
                Import Expenses
              </button>
            </div>

            {/* Life Cycle Flow */}
            <div className="w-full pt-4 space-y-3">
              <h3 className="text-xs font-semibold text-gray-700">
                Life cycle of an Expense
              </h3>
              <div className="flex items-center justify-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] text-[#1E40AF] font-medium">
                  <CreditCard className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>EXPENSE INCURRED</span>
                </div>
                <span className="text-gray-300">→</span>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium">
                  <Circle className="w-3 h-3 text-blue-500 fill-blue-500" />
                  <span>RECORD EXPENSE</span>
                </div>
                <span className="text-gray-300">→</span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded border border-dashed border-[#A7F3D0] bg-[#ECFDF5] text-[#065F46] font-medium text-[10px]">
                    <span>BILLABLE</span>
                    <span className="text-gray-400">→</span>
                    <FileText className="w-3 h-3 text-emerald-600" />
                    <span>CONVERT TO INVOICE</span>
                    <span className="text-gray-400">→</span>
                    <span>GET REIMBURSED</span>
                  </div>
                  <div className="px-2.5 py-0.5 rounded border border-dashed border-[#A7F3D0] bg-[#ECFDF5] text-[#065F46] font-medium text-[10px] text-left">
                    <span>NON-BILLABLE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="text-left bg-gray-50/70 border border-gray-100 rounded-xl p-5 w-full space-y-2.5">
              <div className="text-xs font-semibold text-gray-900">
                In the Expenses module, you can:
              </div>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Record a single expense or record expenses in bulk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Set mileage rates and record expenses based on the distance travelled.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Record and track billable and non-billable expenses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Convert billable expenses directly to invoices.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Table */
          <div
            data-tl="table-expenses"
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] border-b border-gray-200 text-gray-600 font-medium">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Reference#</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      No expenses recorded
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp, idx) => (
                    <tr
                      key={exp.id}
                      data-tl={`expense-row-${idx}`}
                      onClick={() => handleRowClick(exp)}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-medium text-gray-900">
                        {exp.date}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {exp.reference}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        GBP {exp.amount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF08A] text-[#854D0E]">
                          {exp.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          data-tl={`btn-delete-expense-${idx}`}
                          onClick={(e) => handleDeleteClick(e, exp)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
