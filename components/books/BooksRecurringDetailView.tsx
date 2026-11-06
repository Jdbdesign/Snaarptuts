"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type RecurringInvoiceItem,
  INITIAL_RECURRING_INVOICES,
} from "./books-data";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Repeat,
  CheckCircle2,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecurringDetailView({ tl }: Props) {
  const activeProfile = useTimelineVar<RecurringInvoiceItem>(
    tl,
    "booksActiveRecurring",
    INITIAL_RECURRING_INVOICES[0]
  );

  const handleBack = () => {
    tl.setVar("booksView", "recurring");
    tl.setUrl(BOOKS_URLS.recurringInvoices);
  };

  const handleEdit = () => {
    tl.setVar("booksView", "edit-recurring");
    tl.setUrl(BOOKS_URLS.editRecurring);
  };

  const handleDelete = () => {
    tl.setVar("booksRecurringConfirmDialogOpen", true);
  };

  const subTotal = (activeProfile?.lineItems ?? []).reduce(
    (acc, it) => acc + (it.amount || it.quantity * it.rate),
    0
  );
  const taxAmount = subTotal * 0.2;
  const total = activeProfile?.amount ?? subTotal + taxAmount;

  return (
    <div
      data-tl="books-recurring-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            data-tl="btn-back-recurring"
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recurring Invoices</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-edit-recurring"
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5 text-gray-500" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              data-tl="btn-delete-recurring"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-[#7014D9] rounded-xl flex items-center justify-center">
              <Repeat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900">
                  {activeProfile?.profileName || "Monthly Retainer"}
                </h1>
                <span
                  data-tl="recurring-status-badge"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {activeProfile?.status || "Active"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Customer:{" "}
                <span className="font-semibold text-gray-700">
                  {activeProfile?.customerName}
                </span>{" "}
                • Repeats {activeProfile?.frequency}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-500 block">Recurring Amount</span>
            <span className="text-2xl font-bold text-gray-900">
              £{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Schedule Details Card */}
        <div
          data-tl="card-recurring-schedule-details"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 text-xs"
        >
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
            Schedule Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-gray-500 block">Customer</span>
              <span className="font-semibold text-gray-900">
                {activeProfile?.customerName}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Frequency</span>
              <span className="font-semibold text-gray-900">
                {activeProfile?.frequency}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Start Date</span>
              <span className="font-semibold text-gray-900">
                {activeProfile?.startDate}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Ends On</span>
              <span className="font-semibold text-gray-900">
                {activeProfile?.neverExpires
                  ? "Never (Indefinite)"
                  : activeProfile?.endDate || "11/05/2027"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Payment Terms</span>
              <span className="font-semibold text-gray-900">
                {activeProfile?.paymentTerms || "Net 15"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Invoice Preferences</span>
              <span className="font-semibold text-gray-900">
                {activeProfile?.preferences || "Create Invoices as Drafts"}
              </span>
            </div>
            {activeProfile?.orderNumber && (
              <div>
                <span className="text-gray-500 block">Order Number</span>
                <span className="font-semibold text-gray-900">
                  {activeProfile.orderNumber}
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-500 block">Accounts Receivable</span>
              <span className="font-semibold text-gray-900">
                {activeProfile?.accountsReceivable || "Accounts Receivable"}
              </span>
            </div>
          </div>
        </div>

        {/* Items Card */}
        <div
          data-tl="card-recurring-items-table"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-900">
              Recurring Line Items
            </h2>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30 text-[11px] font-semibold text-gray-500 uppercase">
                <th className="py-2.5 px-5">Item Details</th>
                <th className="py-2.5 px-5 text-right">Quantity</th>
                <th className="py-2.5 px-5 text-right">Rate</th>
                <th className="py-2.5 px-5 text-right">Tax</th>
                <th className="py-2.5 px-5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(activeProfile?.lineItems ?? []).map((it) => (
                <tr key={it.id}>
                  <td className="py-3 px-5 font-medium text-gray-900">
                    {it.name || "Item"}
                  </td>
                  <td className="py-3 px-5 text-right text-gray-700">
                    {it.quantity}
                  </td>
                  <td className="py-3 px-5 text-right text-gray-700">
                    £{it.rate.toFixed(2)}
                  </td>
                  <td className="py-3 px-5 text-right text-gray-500">
                    {it.tax}
                  </td>
                  <td className="py-3 px-5 text-right font-semibold text-gray-900">
                    £{(it.amount || it.quantity * it.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes Card */}
        <div
          data-tl="card-recurring-notes"
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3 text-xs"
        >
          <h2 className="text-sm font-bold text-gray-900">Notes & Terms</h2>
          <div>
            <span className="text-gray-500 block mb-0.5 font-medium">
              Customer Notes
            </span>
            <p className="text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              {activeProfile?.customerNotes || "Thanks for your business."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
