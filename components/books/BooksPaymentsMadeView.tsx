"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_PAYMENTS_MADE, type PaymentMade } from "./books-data";
import { ChevronDown, Plus, Search, Trash2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksPaymentsMadeView({ tl }: Props) {
  const payments = useTimelineVar<PaymentMade[]>(
    tl,
    "booksPaymentsMade",
    INITIAL_PAYMENTS_MADE
  );
  const statusFilter = useTimelineVar<string>(
    tl,
    "booksPaymentMadeStatusFilter",
    "Status"
  );
  const isStatusMenuOpen = useTimelineVar<boolean>(
    tl,
    "booksPaymentMadeStatusDropdownOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(
    tl,
    "booksPaymentMadeSearchQuery",
    ""
  );

  const handleRowClick = (payment: PaymentMade) => {
    tl.setVar("booksActivePaymentMade", payment);
    tl.setVar("booksView", "payment-made-detail");
    tl.setUrl(BOOKS_URLS.paymentMadeDetails);
  };

  const handleNew = () => {
    tl.setVar("booksView", "new-payment-made");
    tl.setUrl(BOOKS_URLS.newPaymentMade);
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.paymentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === "Status" || statusFilter === "All") return true;
    return p.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div
      data-tl="books-payments-made-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="payments-made-title"
              className="text-xl font-bold text-gray-900 flex items-center gap-2"
            >
              All Payments
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </h1>
          </div>

          <button
            type="button"
            data-tl="btn-new-payment-made"
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
              data-tl="input-payments-made-search"
              value={searchQuery}
              onChange={(e) => tl.setVar("booksPaymentMadeSearchQuery", e.target.value)}
              placeholder="Search in Payments Made..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="btn-payment-made-status-dropdown"
              onClick={() =>
                tl.setVar(
                  "booksPaymentMadeStatusDropdownOpen",
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
                data-tl="menu-payment-made-status-filter"
                className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-xs"
              >
                <button
                  type="button"
                  data-tl="opt-payment-status-all"
                  onClick={() => {
                    tl.setVar("booksPaymentMadeStatusFilter", "Status");
                    tl.setVar("booksPaymentMadeStatusDropdownOpen", false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    statusFilter === "Status"
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Status
                </button>
                <button
                  type="button"
                  data-tl="opt-payment-status-paid"
                  onClick={() => {
                    tl.setVar("booksPaymentMadeStatusFilter", "Paid");
                    tl.setVar("booksPaymentMadeStatusDropdownOpen", false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    statusFilter === "Paid"
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Paid
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Payment #</th>
                <th className="py-3 px-6">Vendor Name</th>
                <th className="py-3 px-6">Mode</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Unused Amount</th>
                <th className="py-3 px-6">Payment Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((p) => {
                const rowTl =
                  p.paymentNumber === "2"
                    ? "row-payment-made-2"
                    : "row-payment-made-3";
                const delTl =
                  p.paymentNumber === "2"
                    ? "btn-delete-payment-made-2"
                    : "btn-delete-payment-made-3";
                return (
                  <tr
                    key={p.id}
                    data-tl={rowTl}
                    onClick={() => handleRowClick(p)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-6 text-gray-600">{p.date}</td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      {p.paymentNumber}
                    </td>
                    <td className="py-3 px-6 text-gray-600">{p.vendorName}</td>
                    <td className="py-3 px-6 text-gray-600">
                      {p.paymentMode || p.mode}
                    </td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      GBP{p.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-gray-400">
                      {typeof p.unusedAmount === "number"
                        ? `GBP${p.unusedAmount.toFixed(2)}`
                        : p.unusedAmount || "—"}
                    </td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        type="button"
                        data-tl={delTl}
                        onClick={(e) => e.stopPropagation()}
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
      </div>
    </div>
  );
}
