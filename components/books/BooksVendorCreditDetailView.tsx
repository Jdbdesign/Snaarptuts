"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_VENDOR_CREDITS, type VendorCredit } from "./books-data";
import { ArrowLeft, Home } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksVendorCreditDetailView({ tl }: Props) {
  const activeCredit = useTimelineVar<VendorCredit>(
    tl,
    "booksActiveVendorCredit",
    INITIAL_VENDOR_CREDITS[0]
  );

  const handleBack = () => {
    tl.setVar("booksView", "vendor-credits");
    tl.setUrl(BOOKS_URLS.vendorCredits);
  };

  const handleDelete = () => {
    tl.setVar("booksVendorCreditToDelete", activeCredit);
    tl.setVar("booksVendorCreditConfirmOpen", true);
  };

  return (
    <div
      data-tl="books-vendor-credit-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              data-tl="btn-vendor-credit-breadcrumb-back"
              onClick={handleBack}
              className="flex items-center gap-1 hover:text-gray-900 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span>|</span>
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <span>&gt;</span>
            <span
              onClick={handleBack}
              className="hover:text-gray-900 cursor-pointer"
            >
              Vendor Credits
            </span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">Details</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-vendor-credit-back"
              onClick={handleBack}
              className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              data-tl="btn-vendor-credit-apply-to-bills"
              className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Apply to Bills
            </button>
            <button
              type="button"
              data-tl="btn-delete-vendor-credit"
              onClick={handleDelete}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Title */}
        <h1
          data-tl="vendor-credit-details-title"
          className="text-xl font-bold text-gray-900"
        >
          {activeCredit.creditNoteNumber}
        </h1>

        {/* Summary Card */}
        <div
          data-tl="vendor-credit-details-card"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
        >
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
            <div>
              <p className="text-gray-400">Vendor</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeCredit.vendorName}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Credit Date</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeCredit.date}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Subject</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeCredit.subject || "—"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Total</p>
              <p className="font-medium text-gray-900 mt-1">
                GBP {activeCredit.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Balance Remaining</p>
              <p className="font-medium text-gray-900 mt-1">
                GBP {activeCredit.balanceRemaining.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <p className="font-medium text-blue-700 mt-1">
                {activeCredit.status.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Navy Blue Items Table */}
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table
              data-tl="table-vendor-credit-items"
              className="w-full text-left text-xs"
            >
              <thead className="bg-[#1E3A8A] text-white font-medium">
                <tr>
                  <th className="py-2.5 px-6 w-12">#</th>
                  <th className="py-2.5 px-6">Item</th>
                  <th className="py-2.5 px-6 text-center">Qty</th>
                  <th className="py-2.5 px-6 text-center">Rate</th>
                  <th className="py-2.5 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {activeCredit.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-6 text-gray-500">{idx + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      {item.itemDetails}
                    </td>
                    <td className="py-3 px-6 text-center text-gray-600">
                      {item.quantity.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-center text-gray-600">
                      {item.rate.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-right font-medium text-gray-900">
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
