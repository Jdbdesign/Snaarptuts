"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type QuoteItem,
  type QuoteStatus,
  INITIAL_QUOTES,
} from "./books-data";
import {
  Send,
  Download,
  Eye,
  Trash2,
  Home,
  Loader2,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksQuoteDetailView({ tl }: Props) {
  const quote = useTimelineVar<QuoteItem>(
    tl,
    "booksActiveQuote",
    INITIAL_QUOTES[0]
  );
  const isSending = useTimelineVar<boolean>(tl, "booksQuoteSending", false);
  const isPreparingPdf = useTimelineVar<boolean>(
    tl,
    "booksQuotePreparingPdf",
    false
  );

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

  const navToList = () => {
    tl.setVar("booksView", "quotes");
    tl.setUrl(BOOKS_URLS.quotes);
  };

  return (
    <div
      data-tl="books-quote-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-breadcrumb-back"
            onClick={navToList}
            className="hover:text-gray-900 cursor-pointer font-medium"
          >
            ← Back
          </button>
          <span>|</span>
          <button
            type="button"
            data-tl="breadcrumb-home"
            onClick={() => {
              tl.setVar("booksView", "home");
              tl.setUrl(BOOKS_URLS.dashboard);
            }}
            className="hover:text-gray-900 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <span>&gt;</span>
          <button
            type="button"
            data-tl="breadcrumb-quotes"
            onClick={navToList}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Quotes
          </button>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Details</span>
        </div>

        {/* Title & Action Buttons Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1
              data-tl="quote-detail-title"
              className="text-2xl font-bold text-gray-900"
            >
              Quote {quote.quoteNumber}
            </h1>
            <span
              data-tl="quote-detail-status"
              className={`px-3 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                quote.status
              )}`}
            >
              {quote.status}
            </span>
            {isSending && (
              <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Sending...
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Send Quote */}
            <button
              type="button"
              data-tl="btn-send-quote"
              onClick={() => {
                tl.setVar("booksQuoteSending", true);
              }}
              className="h-9 px-3.5 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? "Sending..." : "Send Quote"}</span>
            </button>

            {/* Download PDF */}
            <button
              type="button"
              data-tl="btn-download-pdf"
              onClick={() => {
                tl.setVar("booksQuotePreparingPdf", true);
              }}
              className="h-9 px-3.5 bg-white border border-purple-200 text-[#7014D9] hover:bg-purple-50 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isPreparingPdf ? "Preparing PDF..." : "Download PDF"}</span>
            </button>

            {/* Preview PDF */}
            <button
              type="button"
              data-tl="btn-preview-pdf"
              onClick={() => {
                tl.setVar("booksQuotePdfPreviewOpen", true);
              }}
              className="h-9 px-3.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span>Preview PDF</span>
            </button>

            {/* Edit */}
            <button
              type="button"
              data-tl="btn-edit-quote"
              onClick={() => {
                tl.setVar("booksView", "edit-quote");
                tl.setUrl(BOOKS_URLS.editQuote);
              }}
              className="h-9 px-3.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
            >
              Edit
            </button>

            {/* Delete */}
            <button
              type="button"
              data-tl="btn-delete-quote"
              onClick={() => {
                tl.setVar("booksQuoteConfirmQuoteId", quote.id);
                tl.setVar("booksQuoteConfirmDialogOpen", true);
              }}
              className="h-9 px-3.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Delete</span>
            </button>

            {/* Back to Quotes link */}
            <button
              type="button"
              data-tl="btn-back-to-quotes"
              onClick={navToList}
              className="ml-2 text-xs text-gray-600 hover:text-gray-900 cursor-pointer font-medium"
            >
              Back to Quotes
            </button>
          </div>
        </div>

        {/* Card 1: Quote Details */}
        <div
          data-tl="card-quote-details"
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Quote Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="block text-gray-400 font-medium mb-1">
                Customer
              </span>
              <span
                data-tl="detail-customer-name"
                className="font-medium text-gray-900"
              >
                {quote.customerName}
              </span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium mb-1">
                Quote Date
              </span>
              <span
                data-tl="detail-quote-date"
                className="font-medium text-gray-900"
              >
                {quote.date}
              </span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium mb-1">
                Expiry Date
              </span>
              <span
                data-tl="detail-expiry-date"
                className="font-medium text-gray-900"
              >
                {quote.expiryDate}
              </span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium mb-1">
                Reference#
              </span>
              <span
                data-tl="detail-reference-number"
                className="font-medium text-gray-900"
              >
                {quote.referenceNumber || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Items Table & Totals */}
        <div
          data-tl="card-quote-items"
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4"
        >
          <h2 className="text-sm font-semibold text-gray-900">Items</h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-500 font-medium">
                  <th className="py-2.5 px-4">Item Details</th>
                  <th className="py-2.5 px-4 text-center">Quantity</th>
                  <th className="py-2.5 px-4 text-right">Rate</th>
                  <th className="py-2.5 px-4 text-center">Tax</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quote.items.map((item, idx) => (
                  <tr
                    key={item.id}
                    data-tl={`detail-item-row-${idx + 1}`}
                    className="hover:bg-gray-50/50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {item.rate.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-500">
                      {item.tax}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total</span>
                <span data-tl="detail-sub-total" className="font-medium">
                  {quote.subTotal.toFixed(2)}
                </span>
              </div>

              {quote.discountPercent > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount ({quote.discountPercent}%)</span>
                  <span data-tl="detail-discount" className="font-medium text-rose-600">
                    -{quote.discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              {quote.shipping > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span data-tl="detail-shipping" className="font-medium">
                    {quote.shipping.toFixed(2)}
                  </span>
                </div>
              )}

              {quote.adjustment > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Adjustment</span>
                  <span data-tl="detail-adjustment" className="font-medium">
                    {quote.adjustment.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-[#2563EB] pt-2 border-t border-gray-100">
                <span>Total (GBP)</span>
                <span data-tl="detail-total-amount">
                  {quote.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 & 4: Customer Notes & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            data-tl="detail-customer-notes"
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-xs"
          >
            <h2 className="font-semibold text-gray-900 mb-2">Customer Notes</h2>
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
              {quote.customerNotes || "Looking forward for your business."}
            </p>
          </div>

          <div
            data-tl="detail-terms-conditions"
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-xs"
          >
            <h2 className="font-semibold text-gray-900 mb-2">
              Terms &amp; Conditions
            </h2>
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
              {quote.termsAndConditions || "Payment due within 14 days of acceptance."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
