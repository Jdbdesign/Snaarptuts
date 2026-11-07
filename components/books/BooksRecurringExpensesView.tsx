"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_RECURRING_EXPENSES, type RecurringExpenseProfile } from "./books-data";
import { ChevronDown, Plus, Search, Trash2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecurringExpensesView({ tl }: Props) {
  const recurringList = useTimelineVar<RecurringExpenseProfile[]>(
    tl,
    "booksRecurringExpenses",
    INITIAL_RECURRING_EXPENSES
  );
  const [search, setSearch] = useState("");

  const handleRowClick = (profile: RecurringExpenseProfile) => {
    tl.setVar("booksActiveRecurringExpense", profile);
    tl.setVar("booksView", "recurring-expense-detail");
    tl.setUrl(BOOKS_URLS.recurringExpenseDetails);
  };

  const handleNew = () => {
    tl.setVar("booksView", "new-recurring-expense");
    tl.setUrl(BOOKS_URLS.newRecurringExpense);
  };

  const handleDelete = (e: React.MouseEvent, profile: RecurringExpenseProfile) => {
    e.stopPropagation();
    tl.setVar("booksRecExpenseToDeleteName", profile.profileName);
    tl.setVar("booksRecExpenseToDeleteId", profile.id);
    tl.setVar("booksRecExpenseConfirmOpen", true);
  };

  const filtered = recurringList.filter((p) =>
    p.profileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      data-tl="books-recurring-expenses-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="recurring-expenses-title"
              className="text-xl font-bold text-gray-900 flex items-center gap-2"
            >
              All Profiles
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </h1>
          </div>

          <button
            type="button"
            data-tl="btn-new-recurring-expense"
            onClick={handleNew}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              data-tl="input-recurring-expenses-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in Recurring Expenses..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="py-3 px-6">Profile Name</th>
                <th className="py-3 px-6">Frequency</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Start Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filtered.map((profile) => (
                <tr
                  key={profile.id}
                  data-tl={`recurring-expense-row-${profile.id}`}
                  onClick={() => handleRowClick(profile)}
                  className="hover:bg-gray-50/70 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {profile.profileName}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {profile.frequency}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    GBP {profile.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-700">
                      {profile.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {profile.startDate}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      data-tl={`btn-delete-rec-exp-${profile.id}`}
                      onClick={(e) => handleDelete(e, profile)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
