"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type RecurringInvoiceItem,
  INITIAL_RECURRING_INVOICES,
  RECURRING_STATUS_FILTERS,
} from "./books-data";
import { Search, ChevronDown, Plus } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecurringInvoicesView({ tl }: Props) {
  const isEmpty = useTimelineVar<boolean>(tl, "booksRecurringEmpty", false);
  const recurringInvoices = useTimelineVar<RecurringInvoiceItem[]>(
    tl,
    "booksRecurringInvoices",
    INITIAL_RECURRING_INVOICES
  );
  const searchQuery = useTimelineVar<string>(tl, "booksRecurringSearch", "");
  const statusFilter = useTimelineVar<string>(
    tl,
    "booksRecurringStatusFilter",
    "all"
  );
  const statusDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringStatusDropdownOpen",
    false
  );

  const filteredInvoices = recurringInvoices.filter((inv) => {
    // Status
    if (statusFilter !== "all") {
      if (inv.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        inv.profileName.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q) ||
        inv.frequency.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: RecurringInvoiceItem["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Stopped":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "Expired":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const currentFilterLabel =
    RECURRING_STATUS_FILTERS.find((f) => f.id === statusFilter)?.label || "All";

  // Step 97: Empty State
  if (isEmpty) {
    return (
      <div
        data-tl="books-recurring-invoices-view"
        data-scroller="true"
        className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1
                data-tl="recurring-invoices-title"
                className="text-2xl font-bold text-gray-900"
              >
                Recurring Invoices
              </h1>
              <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>
            <button
              type="button"
              data-tl="btn-new-recurring"
              onClick={() => {
                tl.setVar("booksView", "new-recurring");
                tl.setUrl(BOOKS_URLS.newRecurring);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New</span>
            </button>
          </div>

          <div className="flex items-center justify-center min-h-[460px]">
            <div
              data-tl="recurring-empty-state"
              className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm space-y-4"
            >
              <h1
                data-tl="recurring-empty-heading"
                className="text-xl font-bold text-gray-900"
              >
                Automate your billing
              </h1>
              <p
                data-tl="recurring-empty-subtext"
                className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto"
              >
                Set up recurring invoices to automatically generate and send
                invoices to your customers on a schedule.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  data-tl="btn-create-recurring-empty"
                  onClick={() => {
                    tl.setVar("booksView", "new-recurring");
                    tl.setUrl(BOOKS_URLS.newRecurring);
                  }}
                  className="px-5 py-2.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer uppercase tracking-wider"
                >
                  CREATE RECURRING INVOICE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-tl="books-recurring-invoices-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="recurring-invoices-title"
              className="text-2xl font-bold text-gray-900"
            >
              Recurring Invoices
            </h1>
            <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                data-tl="input-recurring-search"
                placeholder="Search in Recurring Invoices..."
                value={searchQuery}
                onChange={(e) =>
                  tl.setVar("booksRecurringSearch", e.target.value)
                }
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] transition-all"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-tl="select-recurring-status-filter"
                onClick={() =>
                  tl.setVar(
                    "booksRecurringStatusDropdownOpen",
                    !statusDropdownOpen
                  )
                }
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>Status: {currentFilterLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {statusDropdownOpen && (
                <div
                  data-tl="menu-recurring-status-filters"
                  className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {RECURRING_STATUS_FILTERS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      data-tl={`status-opt-${opt.id}`}
                      onClick={() => {
                        tl.setVar("booksRecurringStatusFilter", opt.id);
                        tl.setVar("booksRecurringStatusDropdownOpen", false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 transition-colors cursor-pointer ${
                        statusFilter === opt.id
                          ? "bg-purple-50 text-[#7014D9] font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions: + New Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="btn-new-recurring"
              onClick={() => {
                tl.setVar("booksView", "new-recurring");
                tl.setUrl(BOOKS_URLS.newRecurring);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New</span>
            </button>
          </div>
        </div>

        {/* Recurring Invoices Table Card */}
        <div
          data-tl="card-recurring-table"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th data-tl="th-profile-name" className="py-3 px-5">
                  Profile Name
                </th>
                <th data-tl="th-customer-name" className="py-3 px-5">
                  Customer Name
                </th>
                <th data-tl="th-frequency" className="py-3 px-5">
                  Frequency
                </th>
                <th data-tl="th-start-date" className="py-3 px-5">
                  Start Date
                </th>
                <th data-tl="th-amount" className="py-3 px-5 text-right">
                  Amount
                </th>
                <th data-tl="th-status" className="py-3 px-5 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-gray-500 italic"
                  >
                    No recurring invoice profiles found
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  return (
                    <tr
                      key={inv.id}
                      data-tl={
                        inv.id.includes("rec-1")
                          ? "recurring-row-rec-1"
                          : inv.id.includes("rec-2")
                          ? "recurring-row-rec-2"
                          : `recurring-row-${inv.id}`
                      }
                      onClick={() => {
                        tl.setVar("booksActiveRecurring", inv);
                        tl.setVar("booksView", "recurring-detail");
                        tl.setUrl(BOOKS_URLS.recurringDetails);
                      }}
                      className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-5 font-semibold text-[#7014D9]">
                        {inv.profileName}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-gray-900">
                        {inv.customerName}
                      </td>
                      <td className="py-3.5 px-5 text-gray-600">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-purple-50 text-[#7014D9] font-medium">
                          {inv.frequency}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-gray-600">
                        {inv.startDate}
                      </td>
                      <td className="py-3.5 px-5 text-right font-semibold text-gray-900">
                        £{inv.amount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${getStatusBadge(
                            inv.status
                          )}`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
