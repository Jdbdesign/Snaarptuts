"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type SalesReceiptItem,
  INITIAL_RECEIPTS,
} from "./books-data";
import { Search, ChevronDown, Plus } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksReceiptsView({ tl }: Props) {
  const receipts = useTimelineVar<SalesReceiptItem[]>(
    tl,
    "booksReceipts",
    INITIAL_RECEIPTS
  );
  const searchQuery = useTimelineVar<string>(tl, "booksReceiptSearch", "");

  const filteredReceipts = receipts.filter((rec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      rec.customerName.toLowerCase().includes(q) ||
      rec.receiptNumber.toLowerCase().includes(q) ||
      rec.paymentMode.toLowerCase().includes(q)
    );
  });

  return (
    <div
      data-tl="books-receipts-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="receipts-title"
              className="text-2xl font-bold text-gray-900"
            >
              All Sales Receipts
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
                data-tl="input-receipt-search"
                placeholder="Search in Sales Receipts..."
                value={searchQuery}
                onChange={(e) => tl.setVar("booksReceiptSearch", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] transition-all"
              />
            </div>
          </div>

          {/* Right Actions: + New Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="btn-new-receipt"
              onClick={() => {
                tl.setVar("booksView", "new-receipt");
                tl.setUrl(BOOKS_URLS.newReceipt);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New</span>
            </button>
          </div>
        </div>

        {/* Receipts Table Card */}
        <div
          data-tl="card-receipts-table"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th data-tl="th-receipt-number" className="py-3 px-5">
                  Receipt#
                </th>
                <th data-tl="th-customer-name" className="py-3 px-5">
                  Customer Name
                </th>
                <th data-tl="th-receipt-date" className="py-3 px-5">
                  Date
                </th>
                <th data-tl="th-receipt-amount" className="py-3 px-5 text-right">
                  Amount
                </th>
                <th data-tl="th-payment-mode" className="py-3 px-5">
                  Payment Mode
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredReceipts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-gray-500 italic"
                  >
                    No sales receipts found
                  </td>
                </tr>
              ) : (
                filteredReceipts.map((rec) => {
                  return (
                    <tr
                      key={rec.id}
                      data-tl={
                        rec.receiptNumber === "SR-00002"
                          ? "receipt-row-sr-2"
                          : rec.receiptNumber === "SR-00001"
                          ? "receipt-row-sr-1"
                          : `receipt-row-${rec.receiptNumber.toLowerCase().replace(/[^a-z0-9]/g, "-")}`
                      }
                      onClick={() => {
                        tl.setVar("booksActiveReceipt", rec);
                        tl.setVar("booksView", "receipt-detail");
                        tl.setUrl(BOOKS_URLS.receiptDetails);
                      }}
                      className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-5 font-semibold text-[#7014D9]">
                        {rec.receiptNumber}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-gray-900">
                        {rec.customerName}
                      </td>
                      <td className="py-3.5 px-5 text-gray-600">
                        {rec.receiptDate}
                      </td>
                      <td className="py-3.5 px-5 text-right font-semibold text-gray-900">
                        £{rec.amount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-5 text-gray-700 font-medium">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-gray-100 text-gray-800 border border-gray-200">
                          {rec.paymentMode}
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
