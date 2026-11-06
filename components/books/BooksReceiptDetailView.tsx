"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type SalesReceiptItem,
  INITIAL_RECEIPTS,
} from "./books-data";
import {
  ArrowLeft,
  Send,
  Download,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  Loader2,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksReceiptDetailView({ tl }: Props) {
  const activeReceipt = useTimelineVar<SalesReceiptItem>(
    tl,
    "booksActiveReceipt",
    INITIAL_RECEIPTS[0]
  );
  const isSending = useTimelineVar<boolean>(tl, "booksReceiptSending", false);

  const handleSend = () => {
    tl.setVar("booksReceiptSending", true);
    setTimeout(() => {
      tl.setVar("booksReceiptSending", false);
      tl.setVar(
        "booksActiveReceipt",
        activeReceipt ? { ...activeReceipt, status: "Sent" } : activeReceipt
      );
      tl.setVar("booksToastText", "Sales receipt sent successfully");
      tl.setVar("booksToastOpen", true);
    }, 600);
  };

  const handleDownloadPdf = () => {
    tl.setVar("booksToastText", "Sales receipt downloaded successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleDelete = () => {
    tl.setVar("booksReceiptConfirmDialogOpen", true);
  };

  const handleBack = () => {
    tl.setVar("booksView", "receipts");
    tl.setUrl(BOOKS_URLS.salesReceipts);
  };

  const handleEdit = () => {
    tl.setVar("booksView", "edit-receipt");
    tl.setUrl(BOOKS_URLS.editReceipt);
  };

  const subTotal = (activeReceipt?.lineItems ?? []).reduce(
    (acc, it) => acc + (it.amount || it.quantity * it.rate),
    0
  );
  const taxAmount = (subTotal * 0.2);
  const total = activeReceipt?.amount ?? (subTotal + taxAmount);

  return (
    <div
      data-tl="books-receipt-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top bar with back and actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            data-tl="btn-back-receipts"
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sales Receipts</span>
          </button>

          <div className="flex items-center gap-2">
            {isSending ? (
              <span
                data-tl="chip-sending-receipt"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-[#7014D9] border border-purple-200 rounded-lg text-xs font-medium"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending...</span>
              </span>
            ) : (
              <button
                type="button"
                data-tl="btn-send-receipt"
                onClick={handleSend}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Receipt</span>
              </button>
            )}

            <button
              type="button"
              data-tl="btn-download-pdf"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-preview-pdf"
              onClick={() => tl.setVar("booksReceiptPdfPreviewOpen", true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span>Preview PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-edit-receipt"
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5 text-gray-500" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              data-tl="btn-delete-receipt"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Receipt Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900">
                {activeReceipt?.receiptNumber || "SR-00002"}
              </h1>
              <span
                data-tl="receipt-status-badge"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {activeReceipt?.status || "Paid"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Sales receipt for {activeReceipt?.customerName || "Customer"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Total Paid</span>
            <span className="text-2xl font-bold text-gray-900">
              £{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Receipt Details Card */}
        <div
          data-tl="card-receipt-details"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
        >
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
            Receipt Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-500 block">Customer Name</span>
              <span className="font-semibold text-gray-900">
                {activeReceipt?.customerName}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Receipt Date</span>
              <span className="font-semibold text-gray-900">
                {activeReceipt?.receiptDate}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Payment Mode</span>
              <span className="font-semibold text-gray-900">
                {activeReceipt?.paymentMode}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Deposit To</span>
              <span className="font-semibold text-gray-900">
                {activeReceipt?.depositTo || "Bank Account"}
              </span>
            </div>
            {activeReceipt?.reference && (
              <div>
                <span className="text-gray-500 block">Reference#</span>
                <span className="font-semibold text-gray-900">
                  {activeReceipt.reference}
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-500 block">Salesperson</span>
              <span className="font-semibold text-gray-900">
                {activeReceipt?.salesperson || "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Items Table Card */}
        <div
          data-tl="card-receipt-items"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-900">Items</h2>
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
              {(activeReceipt?.lineItems ?? []).map((it) => (
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

        {/* Totals & Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes Card */}
          <div
            data-tl="card-receipt-notes"
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3 text-xs"
          >
            <h2 className="text-sm font-bold text-gray-900">Notes & Terms</h2>
            <div>
              <span className="text-gray-500 block mb-0.5 font-medium">
                Customer Notes
              </span>
              <p className="text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                {activeReceipt?.customerNotes || "Thank you for your business."}
              </p>
            </div>
            {activeReceipt?.terms && (
              <div>
                <span className="text-gray-500 block mb-0.5 font-medium">
                  Terms & Conditions
                </span>
                <p className="text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  {activeReceipt.terms}
                </p>
              </div>
            )}
          </div>

          {/* Totals Card */}
          <div
            data-tl="card-receipt-totals"
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2 text-xs"
          >
            <div className="flex justify-between py-1 text-gray-600">
              <span>Sub Total</span>
              <span className="font-semibold text-gray-900">
                £{subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-1 text-gray-600">
              <span>VAT (20%)</span>
              <span className="font-semibold text-gray-900">
                £{taxAmount.toFixed(2)}
              </span>
            </div>
            {activeReceipt?.discount ? (
              <div className="flex justify-between py-1 text-emerald-600">
                <span>Discount</span>
                <span>-£{activeReceipt.discount.toFixed(2)}</span>
              </div>
            ) : null}
            {activeReceipt?.shipping ? (
              <div className="flex justify-between py-1 text-gray-600">
                <span>Shipping Charges</span>
                <span>£{activeReceipt.shipping.toFixed(2)}</span>
              </div>
            ) : null}
            {activeReceipt?.adjustment ? (
              <div className="flex justify-between py-1 text-gray-600">
                <span>Adjustment</span>
                <span>£{activeReceipt.adjustment.toFixed(2)}</span>
              </div>
            ) : null}
            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-gray-900">
              <span>Total</span>
              <span className="text-[#7014D9]">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
