"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_RECURRING_EXPENSES,
  type RecurringExpenseProfile,
} from "./books-data";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecurringExpenseDetailView({ tl }: Props) {
  const profile = useTimelineVar<RecurringExpenseProfile>(
    tl,
    "booksActiveRecurringExpense",
    INITIAL_RECURRING_EXPENSES[0]
  );

  const handleBack = () => {
    tl.setVar("booksView", "recurring-expenses");
    tl.setUrl(BOOKS_URLS.recurringExpenses);
  };

  const handleDelete = () => {
    tl.setVar("booksRecExpenseToDeleteName", profile.profileName);
    tl.setVar("booksRecExpenseToDeleteId", profile.id);
    tl.setVar("booksRecExpenseConfirmOpen", true);
  };

  return (
    <div
      data-tl="books-recurring-expense-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 pb-36 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-recurring-expenses"
            onClick={handleBack}
            className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span>Recurring Expenses</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-900 font-medium">Details</span>
          </div>
        </div>

        {/* Title and Action Buttons */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h1 className="text-xl font-bold text-gray-900">
            Recurring Expense Details
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-back-to-list"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Back to List
            </button>
            <button
              type="button"
              data-tl="btn-delete-detail-rec-exp"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Details Card */}
        <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm space-y-6">
          <div className="grid grid-cols-1 gap-6 text-xs">
            <div data-tl="detail-profile-name">
              <span className="block text-gray-400 font-medium mb-1">
                Profile Name
              </span>
              <span className="text-gray-900 font-semibold text-sm">
                {profile.profileName}
              </span>
            </div>

            <div data-tl="detail-frequency">
              <span className="block text-gray-400 font-medium mb-1">
                Frequency
              </span>
              <span className="text-gray-800 font-medium">
                {profile.frequency}
              </span>
            </div>

            <div data-tl="detail-start-date">
              <span className="block text-gray-400 font-medium mb-1">
                Start Date
              </span>
              <span className="text-gray-800 font-medium">
                {profile.startDate}
              </span>
            </div>

            <div data-tl="detail-never-expires">
              <span className="block text-gray-400 font-medium mb-1">
                Never Expires
              </span>
              <span className="text-gray-800 font-medium">
                {profile.neverExpires !== false ? "Yes" : "No"}
              </span>
            </div>

            <div data-tl="detail-expense-account">
              <span className="block text-gray-400 font-medium mb-1">
                Expense Account
              </span>
              <span className="text-gray-800 font-medium">
                {profile.expenseAccount}
              </span>
            </div>

            <div data-tl="detail-amount">
              <span className="block text-gray-400 font-medium mb-1">
                Amount
              </span>
              <span className="text-gray-900 font-semibold">
                GBP {profile.amount.toFixed(2)}
              </span>
            </div>

            <div data-tl="detail-amount-is">
              <span className="block text-gray-400 font-medium mb-1">
                Amount Is
              </span>
              <span className="text-gray-800 font-medium">
                {profile.amountIs}
              </span>
            </div>

            <div data-tl="detail-paid-through">
              <span className="block text-gray-400 font-medium mb-1">
                Paid Through
              </span>
              <span className="text-gray-800 font-medium">
                {profile.paidThrough}
              </span>
            </div>

            <div data-tl="detail-vendor">
              <span className="block text-gray-400 font-medium mb-1">
                Vendor
              </span>
              <span className="text-gray-800 font-medium">
                {profile.vendor}
              </span>
            </div>

            <div data-tl="detail-status">
              <span className="block text-gray-400 font-medium mb-1">
                Status
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-700">
                {profile.status}
              </span>
            </div>

            <div data-tl="detail-created">
              <span className="block text-gray-400 font-medium mb-1">
                Created
              </span>
              <span className="text-gray-800 font-medium">
                {profile.created || profile.startDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
