"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_EXPENSES,
  type ExpenseItem,
} from "./books-data";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksExpenseDetailView({ tl }: Props) {
  const activeExpense = useTimelineVar<ExpenseItem>(
    tl,
    "booksActiveExpense",
    INITIAL_EXPENSES[0]
  );

  const handleBack = () => {
    tl.setVar("booksView", "expenses");
    tl.setUrl(BOOKS_URLS.expenses);
  };

  const handleDelete = () => {
    tl.setVar(
      "booksExpenseToDeleteLabel",
      activeExpense.reference !== "-" ? activeExpense.reference : activeExpense.date
    );
    tl.setVar("booksExpenseToDeleteId", activeExpense.id);
    tl.setVar("booksExpenseConfirmOpen", true);
  };

  return (
    <div
      data-tl="books-expense-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-expenses"
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>|</span>
          <Home className="w-3.5 h-3.5 text-gray-400" />
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Expenses</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-medium">Details</span>
        </div>

        {/* Title Row */}
        <div className="flex items-center justify-between pt-2">
          <h1
            data-tl="title-expense-details"
            className="text-xl font-bold text-gray-900"
          >
            Expense Details
          </h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-back-expenses-outline"
              onClick={handleBack}
              className="px-3.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
            >
              Back to Expenses
            </button>
            <button
              type="button"
              data-tl="btn-delete-expense-detail"
              onClick={handleDelete}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded-lg transition-colors shadow-xs"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Details Card */}
        <div
          data-tl="card-expense-details"
          className="border border-gray-200 rounded-xl p-6 bg-white shadow-xs space-y-4 text-xs"
        >
          <div>
            <div className="text-gray-500 font-medium">Date</div>
            <div className="mt-0.5 text-gray-900 font-medium">{activeExpense.date}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Expense Account</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.expenseAccount}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Amount</div>
            <div className="mt-0.5 text-gray-900 font-semibold">
              GBP {activeExpense.amount.toFixed(2)}
            </div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Amount Is</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.amountIs}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Total</div>
            <div className="mt-0.5 text-gray-900 font-semibold">
              GBP {activeExpense.amount.toFixed(2)}
            </div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Paid Through</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.paidThrough}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Vendor</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.vendor || "-"}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Reference#</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.reference || "-"}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Notes</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.notes || "-"}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Billable</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.billable ? "Yes" : "No"}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Status</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.status}</div>
          </div>

          <div>
            <div className="text-gray-500 font-medium">Created</div>
            <div className="mt-0.5 text-gray-900">{activeExpense.created || activeExpense.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
