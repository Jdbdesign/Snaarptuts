"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_RECURRING_BILLS, type RecurringBill } from "./books-data";
import { ArrowLeft, Home } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecurringBillDetailView({ tl }: Props) {
  const activeBill = useTimelineVar<RecurringBill>(
    tl,
    "booksActiveRecurringBill",
    INITIAL_RECURRING_BILLS[0]
  );

  const handleBack = () => {
    tl.setVar("booksView", "recurring-bills");
    tl.setUrl(BOOKS_URLS.recurringBills);
  };

  const handleDelete = () => {
    tl.setVar("booksRecBillToDelete", activeBill);
    tl.setVar("booksRecBillConfirmOpen", true);
  };

  const totalAmount = activeBill.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  return (
    <div
      data-tl="books-recurring-bill-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              data-tl="btn-recurring-bill-breadcrumb-back"
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
              Recurring Bills
            </span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">Details</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-recurring-bill-back-to-list"
              onClick={handleBack}
              className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Back to List
            </button>
            <button
              type="button"
              data-tl="btn-delete-recurring-bill"
              onClick={handleDelete}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Title */}
        <h1
          data-tl="recurring-bill-details-title"
          className="text-xl font-bold text-gray-900"
        >
          Recurring Bill Details
        </h1>

        {/* Summary Card */}
        <div
          data-tl="recurring-bill-details-card"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
        >
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
            <div>
              <p className="text-gray-400">Profile Name</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeBill.profileName}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Vendor</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeBill.vendorName}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Frequency</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeBill.frequency}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Start Date</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeBill.startDate}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Never Expires</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeBill.neverExpires ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Payment Terms</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeBill.paymentTerms}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Currency</p>
              <p className="font-medium text-gray-900 mt-1">GBP</p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                  {activeBill.status}
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-400">Created</p>
              <p className="font-medium text-gray-900 mt-1">
                {activeBill.createdDate}
              </p>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Line Items</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-3 px-6">Item Details</th>
                  <th className="py-3 px-6">Description</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Rate</th>
                  <th className="py-3 px-6">Tax</th>
                  <th className="py-3 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeBill.lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium text-gray-900">
                      {item.itemDetails}
                    </td>
                    <td className="py-3 px-6 text-gray-500">
                      {item.description || "—"}
                    </td>
                    <td className="py-3 px-6 text-gray-600">
                      {item.quantity.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-gray-600">
                      {item.rate.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-gray-600">{item.tax}</td>
                    <td className="py-3 px-6 text-right font-medium text-gray-900">
                      {(item.quantity * item.rate).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold text-gray-900">
                  <td colSpan={5} className="py-3 px-6 text-right">
                    Total
                  </td>
                  <td className="py-3 px-6 text-right font-bold text-gray-900">
                    {totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
