"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_PAYMENTS_MADE, type PaymentMade } from "./books-data";
import { ArrowLeft, Home } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksPaymentMadeDetailView({ tl }: Props) {
  const activePayment = useTimelineVar<PaymentMade>(
    tl,
    "booksActivePaymentMade",
    INITIAL_PAYMENTS_MADE[0]
  );

  const handleBack = () => {
    tl.setVar("booksView", "payments-made");
    tl.setUrl(BOOKS_URLS.paymentsMade);
  };

  return (
    <div
      data-tl="books-payment-made-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              data-tl="btn-payment-made-breadcrumb-back"
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
              Payments Made
            </span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">Details</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-payment-made-back"
              onClick={handleBack}
              className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              data-tl="btn-delete-payment-made"
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Title */}
        <h1
          data-tl="payment-made-details-title"
          className="text-xl font-bold text-gray-900"
        >
          Payment #{activePayment.paymentNumber}
        </h1>

        {/* Summary Card */}
        <div
          data-tl="payment-made-details-card"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
        >
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
            <div>
              <p className="text-gray-400">Vendor</p>
              <p className="font-medium text-gray-900 mt-1">
                {activePayment.vendorName}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Amount</p>
              <p className="font-medium text-gray-900 mt-1">
                GBP {activePayment.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Payment Date</p>
              <p className="font-medium text-gray-900 mt-1">
                {activePayment.date}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Payment Mode</p>
              <p className="font-medium text-gray-900 mt-1">
                {activePayment.paymentMode}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <p className="font-medium text-gray-900 mt-1">
                {activePayment.status.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Bills Paid */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Bills Paid</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table
              data-tl="table-payment-made-bills-paid"
              className="w-full text-left text-xs"
            >
              <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-3 px-6">Bill#</th>
                  <th className="py-3 px-6">Bill Date</th>
                  <th className="py-3 px-6">Bill Amount</th>
                  <th className="py-3 px-6 text-right">Payment Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activePayment.billsPaid.map((bp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium text-blue-600">
                      {bp.billNumber}
                    </td>
                    <td className="py-3 px-6 text-gray-600">{bp.billDate}</td>
                    <td className="py-3 px-6 text-gray-600">
                      {bp.billAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-right font-medium text-gray-900">
                      {bp.paymentApplied.toFixed(2)}
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
