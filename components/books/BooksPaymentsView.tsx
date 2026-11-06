"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type PaymentReceivedItem,
  INITIAL_PAYMENTS,
} from "./books-data";
import { Search, ChevronDown, Plus, Trash2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksPaymentsView({ tl }: Props) {
  const payments = useTimelineVar<PaymentReceivedItem[]>(
    tl,
    "booksPayments",
    INITIAL_PAYMENTS
  );
  const searchQuery = useTimelineVar<string>(tl, "booksPaymentSearch", "");

  const filteredPayments = payments.filter((pay) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      pay.customerName.toLowerCase().includes(q) ||
      pay.paymentNumber.toLowerCase().includes(q) ||
      pay.paymentMode.toLowerCase().includes(q)
    );
  });

  const handleDeleteClick = (e: React.MouseEvent, pay: PaymentReceivedItem) => {
    e.stopPropagation();
    tl.setVar("booksActivePayment", pay);
    tl.setVar("booksPaymentConfirmDialogOpen", true);
  };

  const handleRowClick = (pay: PaymentReceivedItem) => {
    tl.setVar("booksActivePayment", pay);
    tl.setVar("booksView", "payment-details");
    tl.setUrl(BOOKS_URLS.paymentDetails);
  };

  return (
    <div
      data-tl="books-payments-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="payments-title"
              className="text-2xl font-bold text-gray-900"
            >
              All Received Payments
            </h1>
            <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                data-tl="input-search-payments"
                placeholder="Search in Payments Received..."
                value={searchQuery}
                onChange={(e) => tl.setVar("booksPaymentSearch", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] transition-all"
              />
            </div>
          </div>

          {/* Right Actions: + New Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="btn-new-payment"
              onClick={() => {
                tl.setVar("booksView", "new-payment");
                tl.setUrl(BOOKS_URLS.newPayment);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New</span>
            </button>
          </div>
        </div>

        {/* Payments Table Card */}
        <div
          data-tl="card-payments-table"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th data-tl="th-payment-number" className="py-3 px-5">
                  Payment#
                </th>
                <th data-tl="th-customer-name" className="py-3 px-5">
                  Customer Name
                </th>
                <th data-tl="th-payment-date" className="py-3 px-5">
                  Date
                </th>
                <th data-tl="th-payment-amount" className="py-3 px-5 text-right">
                  Amount
                </th>
                <th data-tl="th-payment-mode" className="py-3 px-5">
                  Mode
                </th>
                <th data-tl="th-payment-status" className="py-3 px-5">
                  Status
                </th>
                <th data-tl="th-payment-actions" className="py-3 px-5 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-500 italic"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((pay) => {
                  const paySlug = pay.id; // e.g. "pay-2", "pay-3"
                  return (
                    <tr
                      key={pay.id}
                      data-tl={`payment-row-${paySlug}`}
                      onClick={() => handleRowClick(pay)}
                      className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-5 font-semibold text-[#7014D9]">
                        <span data-tl={`link-payment-${paySlug}`}>
                          {pay.paymentNumber}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-gray-900">
                        {pay.customerName}
                      </td>
                      <td className="py-3.5 px-5 text-gray-600">
                        {pay.paymentDate}
                      </td>
                      <td className="py-3.5 px-5 text-right font-semibold text-gray-900">
                        £{pay.amount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-5 text-gray-700 font-medium uppercase text-xs">
                        {pay.paymentMode}
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            pay.status === "Paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <button
                          type="button"
                          data-tl={`btn-delete-payment-${paySlug}`}
                          onClick={(e) => handleDeleteClick(e, pay)}
                          title="Delete payment"
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
