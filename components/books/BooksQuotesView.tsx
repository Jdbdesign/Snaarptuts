"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type QuoteItem,
  type QuoteStatus,
  INITIAL_QUOTES,
} from "./books-data";
import { Search, ChevronDown, Plus } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksQuotesView({ tl }: Props) {
  const quotes = useTimelineVar<QuoteItem[]>(tl, "booksQuotes", INITIAL_QUOTES);
  const filter = useTimelineVar<string>(tl, "booksQuoteFilter", "all");
  const searchQuery = useTimelineVar<string>(tl, "booksQuoteSearch", "");
  const statusDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksQuoteStatusDropdownOpen",
    false
  );

  const filteredQuotes = quotes.filter((q) => {
    // Status filter
    if (filter !== "all" && q.status.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchCustomer = q.customerName.toLowerCase().includes(query);
      const matchNumber = q.quoteNumber.toLowerCase().includes(query);
      if (!matchCustomer && !matchNumber) return false;
    }
    return true;
  });

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Sent":
        return "bg-amber-100 text-amber-700";
      case "Accepted":
        return "bg-emerald-100 text-emerald-800";
      case "Declined":
        return "bg-rose-100 text-rose-700";
      case "Expired":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const currentFilterLabel =
    filter === "all"
      ? "All"
      : filter.charAt(0).toUpperCase() + filter.slice(1);

  return (
    <div
      data-tl="books-quotes-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <h1
            data-tl="quotes-header-title"
            className="text-2xl font-bold text-gray-900"
          >
            All Quotes
          </h1>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                data-tl="input-search-quotes"
                placeholder="Search in Quotes..."
                value={searchQuery}
                onChange={(e) => tl.setVar("booksQuoteSearch", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] transition-all"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-tl="dropdown-quotes-status"
                onClick={() =>
                  tl.setVar(
                    "booksQuoteStatusDropdownOpen",
                    !statusDropdownOpen
                  )
                }
                className="h-9 px-3.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>{currentFilterLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {statusDropdownOpen && (
                <div
                  data-tl="menu-quotes-status"
                  className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {[
                    { id: "all", label: "All", tl: "status-opt-all" },
                    { id: "draft", label: "Draft", tl: "status-opt-draft" },
                    { id: "sent", label: "Sent", tl: "status-opt-sent" },
                    {
                      id: "accepted",
                      label: "Accepted",
                      tl: "status-opt-accepted",
                    },
                    {
                      id: "declined",
                      label: "Declined",
                      tl: "status-opt-declined",
                    },
                    {
                      id: "expired",
                      label: "Expired",
                      tl: "status-opt-expired",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      data-tl={opt.tl}
                      onClick={() => {
                        tl.setVar("booksQuoteFilter", opt.id);
                        tl.setVar("booksQuoteStatusDropdownOpen", false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 transition-colors cursor-pointer ${
                        filter === opt.id
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

          {/* Right Action: + New Button */}
          <button
            type="button"
            data-tl="btn-new-quote"
            onClick={() => {
              tl.setVar("booksView", "new-quote");
              tl.setUrl(BOOKS_URLS.newQuote);
            }}
            className="h-9 px-4 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ New</span>
          </button>
        </div>

        {/* Quotes Table */}
        <div
          data-tl="quotes-table-card"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th data-tl="th-quote-number" className="py-3 px-5">
                  Quote#
                </th>
                <th data-tl="th-customer-name" className="py-3 px-5">
                  Customer Name
                </th>
                <th data-tl="th-quote-date" className="py-3 px-5">
                  Date
                </th>
                <th data-tl="th-quote-amount" className="py-3 px-5 text-right">
                  Amount
                </th>
                <th
                  data-tl="th-quote-status"
                  className="py-3 px-5 text-center"
                >
                  All
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredQuotes.map((q, idx) => (
                <tr
                  key={q.id}
                  data-tl={`quote-row-${idx + 1}`}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  <td className="py-3.5 px-5 font-medium">
                    <button
                      type="button"
                      data-tl={`quote-link-${idx + 1}`}
                      onClick={() => {
                        tl.setVar("booksActiveQuote", q);
                        tl.setVar("booksView", "quote-detail");
                        tl.setUrl(BOOKS_URLS.quoteDetails);
                      }}
                      className="text-gray-900 hover:text-[#7014D9] cursor-pointer"
                    >
                      {q.quoteNumber}
                    </button>
                  </td>
                  <td className="py-3.5 px-5 text-gray-700">
                    {q.customerName}
                  </td>
                  <td className="py-3.5 px-5 text-gray-500">{q.date}</td>
                  <td className="py-3.5 px-5 text-right font-medium text-gray-900">
                    GBP {q.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <span
                      data-tl={`badge-status-${idx + 1}`}
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getStatusBadge(
                        q.status
                      )}`}
                    >
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredQuotes.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-400 text-xs"
                  >
                    No quotes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
