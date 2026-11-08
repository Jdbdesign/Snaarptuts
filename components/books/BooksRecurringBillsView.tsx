"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_RECURRING_BILLS, type RecurringBill } from "./books-data";
import { ChevronDown, Plus, Search, Trash2, CheckCircle2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecurringBillsView({ tl }: Props) {
  const recurringBills = useTimelineVar<RecurringBill[]>(
    tl,
    "booksRecurringBills",
    INITIAL_RECURRING_BILLS
  );
  const statusFilter = useTimelineVar<string>(
    tl,
    "booksRecurringBillStatusFilter",
    "Status"
  );
  const isStatusMenuOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringBillStatusDropdownOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(
    tl,
    "booksRecurringBillSearchQuery",
    ""
  );

  const handleRowClick = (bill: RecurringBill) => {
    tl.setVar("booksActiveRecurringBill", bill);
    tl.setVar("booksView", "recurring-bill-detail");
    tl.setUrl(BOOKS_URLS.recurringBillDetails);
  };

  const handleNew = () => {
    tl.setVar("booksView", "new-recurring-bill");
    tl.setUrl(BOOKS_URLS.newRecurringBill);
  };

  const handleDelete = (e: React.MouseEvent, bill: RecurringBill) => {
    e.stopPropagation();
    tl.setVar("booksRecBillToDelete", bill);
    tl.setVar("booksRecBillConfirmOpen", true);
  };

  const filteredBills = recurringBills.filter((b) => {
    const matchesSearch =
      b.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === "Status" || statusFilter === "All") return true;
    return b.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div
      data-tl="books-recurring-bills-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="recurring-bills-title"
              className="text-xl font-bold text-gray-900 flex items-center gap-2"
            >
              All Recurring Bills
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </h1>
          </div>

          <button
            type="button"
            data-tl="btn-new-recurring-bill"
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
              data-tl="input-recurring-bills-search"
              value={searchQuery}
              onChange={(e) => tl.setVar("booksRecurringBillSearchQuery", e.target.value)}
              placeholder="Search in Recurring Bills..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="btn-recurring-bill-status-dropdown"
              onClick={() =>
                tl.setVar(
                  "booksRecurringBillStatusDropdownOpen",
                  !isStatusMenuOpen
                )
              }
              className="flex items-center justify-between w-36 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isStatusMenuOpen && (
              <div
                data-tl="menu-recurring-bill-status-filter"
                className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-xs"
              >
                {[
                  { label: "Status", tlKey: "opt-rec-bill-status-all" },
                  { label: "Active", tlKey: "opt-rec-bill-status-active" },
                  { label: "Paused", tlKey: "opt-rec-bill-status-paused" },
                  { label: "Expired", tlKey: "opt-rec-bill-status-expired" },
                  { label: "Draft", tlKey: "opt-rec-bill-status-draft" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    data-tl={opt.tlKey}
                    onClick={() => {
                      tl.setVar("booksRecurringBillStatusFilter", opt.label);
                      tl.setVar("booksRecurringBillStatusDropdownOpen", false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                      statusFilter === opt.label
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* List or Empty State */}
        {filteredBills.length === 0 ? (
          <div
            data-tl="empty-state-recurring-bills"
            className="flex flex-col items-center justify-center py-12 px-4 text-center"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Create. Set. Repeat.
            </h2>
            <p className="text-xs text-gray-500 max-w-md mb-6">
              Automate your routine bills and let Snaarp Books do the heavy lifting.
            </p>

            <button
              type="button"
              data-tl="btn-empty-new-recurring-bill"
              onClick={handleNew}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors mb-10"
            >
              + New Recurring Bill
            </button>

            <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-6">
                Life cycle of a Recurring Bill
              </h3>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div
                  data-tl="chip-lifecycle-active"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Active
                </div>
                <div className="w-6 border-t border-dashed border-gray-300" />
                <div
                  data-tl="chip-lifecycle-paused"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Paused
                </div>
                <div className="w-6 border-t border-dashed border-gray-300" />
                <div
                  data-tl="chip-lifecycle-expired"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Expired
                </div>
                <div className="w-6 border-t border-dashed border-gray-300" />
                <div
                  data-tl="chip-lifecycle-draft"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400" />
                  Draft
                </div>
              </div>

              <div className="text-left max-w-lg mx-auto space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Create recurring bills with flexible schedules</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automatically generate bills at chosen intervals</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Keep full control to pause, resume, or edit anytime</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-3 px-6">Profile Name</th>
                  <th className="py-3 px-6">Vendor Name</th>
                  <th className="py-3 px-6">Frequency</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Start Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBills.map((bill) => {
                  const rowTl =
                    bill.id === "rec-bill-1"
                      ? "row-rec-bill-office-cleaning"
                      : "row-rec-bill-monthly-packaging";
                  const delTl =
                    bill.id === "rec-bill-1"
                      ? "btn-delete-rec-bill-office-cleaning"
                      : "btn-delete-rec-bill-monthly-packaging";
                  return (
                    <tr
                      key={bill.id}
                      data-tl={rowTl}
                      onClick={() => handleRowClick(bill)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-6 font-medium text-gray-900">
                        {bill.profileName}
                      </td>
                      <td className="py-3 px-6 text-gray-600">{bill.vendorName}</td>
                      <td className="py-3 px-6 text-gray-600">{bill.frequency}</td>
                      <td className="py-3 px-6">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                          {bill.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-gray-600">{bill.startDate}</td>
                      <td className="py-3 px-6 text-right">
                        <button
                          type="button"
                          data-tl={delTl}
                          onClick={(e) => handleDelete(e, bill)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
