"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { INITIAL_QUOTES, type QuoteItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksQuotePdfPreviewModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksQuotePdfPreviewOpen",
    false
  );
  const quote = useTimelineVar<QuoteItem>(
    tl,
    "booksActiveQuote",
    INITIAL_QUOTES[0]
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksQuotePdfPreviewOpen", false);
  };

  return (
    <div
      data-tl="modal-pdf-preview"
      className="fixed inset-0 z-50 bg-[#333333] flex flex-col items-center select-none overflow-hidden"
    >
      {/* Dark PDF Viewer Top Bar */}
      <div className="h-12 w-full bg-[#2A2B2E] border-b border-[#3D3E42] px-6 flex items-center justify-between text-white text-xs shrink-0">
        <div className="flex items-center gap-3">
          <ProductLogo name="books" size={20} />
          <span className="font-semibold text-gray-200">
            Estimate PDF — {quote.quoteNumber}.pdf
          </span>
        </div>

        {/* Center Page Indicator */}
        <div
          data-tl="pdf-page-indicator"
          className="bg-[#3E3F44] px-3.5 py-1 rounded text-[11px] font-medium text-gray-300"
        >
          Page 1 of 1
        </div>

        {/* Right Close Button */}
        <button
          type="button"
          data-tl="btn-close-pdf-preview"
          onClick={handleClose}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
          title="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable PDF Preview Canvas */}
      <div
        data-tl="pdf-preview-scroll-body"
        className="flex-1 w-full overflow-y-auto p-8 flex justify-center bg-[#4A4B4F]"
      >
        {/* White PDF Document Sheet */}
        <div
          data-tl="pdf-sheet"
          className="w-[680px] min-h-[920px] bg-white text-gray-900 shadow-2xl p-10 flex flex-col justify-between rounded-xs"
        >
          <div className="space-y-6">
            {/* Top Row: Logo & Heading */}
            <div className="flex items-start justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#7014D9] flex items-center justify-center text-white font-bold text-xl shadow-md mb-2">
                  S
                </div>
                <div className="text-xs text-gray-700 font-medium">
                  <p className="font-bold text-gray-900">Snaarp Books</p>
                  <p>Snaarp Business Suite</p>
                  <p className="text-gray-500">+44 7442 815899</p>
                  <p className="text-gray-500">hello@snaarp.com</p>
                </div>
              </div>

              <div className="text-right">
                <h1 className="text-2xl font-bold text-[#7014D9] tracking-tight">
                  Estimate Pdf
                </h1>
                <p className="text-xs font-semibold text-gray-700 mt-1">
                  # {quote.quoteNumber}
                </p>
                <div className="mt-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                    TOTAL
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    £{quote.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Purple Divider */}
            <div className="h-0.5 w-full bg-[#7014D9]" />

            {/* Bill To & Quote Metadata */}
            <div className="grid grid-cols-2 gap-8 text-xs pt-2">
              <div>
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block mb-1">
                  BILL TO
                </span>
                <p className="font-bold text-gray-900 text-sm">
                  {quote.customerName}
                </p>
                <p className="text-gray-600 mt-1">
                  {quote.customerAddress?.street || "14 Market Street"}
                </p>
                <p className="text-gray-600">
                  {quote.customerAddress?.city || "Leeds"},{" "}
                  {quote.customerAddress?.state || "West Yorkshire"},{" "}
                  {quote.customerAddress?.zip || "LS1 6BG"}
                </p>
                <p className="text-gray-600">
                  {quote.customerAddress?.country || "United Kingdom"}
                </p>
                <p className="text-gray-500 mt-1">{quote.customerEmail}</p>
              </div>

              <div className="space-y-1.5 text-right">
                <div className="flex justify-end gap-3">
                  <span className="text-gray-500 font-medium">Quote # :</span>
                  <span className="font-bold text-gray-900">
                    {quote.quoteNumber}
                  </span>
                </div>
                <div className="flex justify-end gap-3">
                  <span className="text-gray-500 font-medium">Quote Date :</span>
                  <span className="text-gray-800">{quote.date}</span>
                </div>
                <div className="flex justify-end gap-3">
                  <span className="text-gray-500 font-medium">Expiry Date :</span>
                  <span className="text-gray-800">{quote.expiryDate}</span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="pt-4">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#7014D9] text-white text-[11px] font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-3 w-8 text-center">#</th>
                    <th className="py-2.5 px-3">ITEM &amp; DESCRIPTION</th>
                    <th className="py-2.5 px-3 text-center w-16">QTY</th>
                    <th className="py-2.5 px-3 text-right w-24">RATE</th>
                    <th className="py-2.5 px-3 text-right w-24">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quote.items.map((it, idx) => (
                    <tr key={it.id} className="text-gray-800">
                      <td className="py-3 px-3 text-center text-gray-500">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-3 font-medium text-gray-900">
                        {it.name}
                      </td>
                      <td className="py-3 px-3 text-center">{it.quantity}</td>
                      <td className="py-3 px-3 text-right">
                        £{it.rate.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-medium">
                        £{it.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Section */}
              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600 px-3 py-1">
                    <span>Sub Total</span>
                    <span>£{quote.subTotal.toFixed(2)}</span>
                  </div>
                  {quote.discountPercent > 0 && (
                    <div className="flex justify-between text-gray-600 px-3 py-1">
                      <span>Discount ({quote.discountPercent}%)</span>
                      <span className="text-rose-600">
                        -£{quote.discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {quote.shipping > 0 && (
                    <div className="flex justify-between text-gray-600 px-3 py-1">
                      <span>Shipping</span>
                      <span>£{quote.shipping.toFixed(2)}</span>
                    </div>
                  )}
                  {quote.adjustment > 0 && (
                    <div className="flex justify-between text-gray-600 px-3 py-1">
                      <span>Adjustment</span>
                      <span>£{quote.adjustment.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 bg-[#F4EBFF] px-3 py-2 rounded">
                    <span>Total</span>
                    <span>£{quote.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Notes & Terms */}
          <div className="pt-8 space-y-4 text-xs border-t border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                NOTES
              </span>
              <p className="text-gray-600">
                {quote.customerNotes || "Looking forward for your business."}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                TERMS &amp; CONDITIONS
              </span>
              <p className="text-gray-600">
                {quote.termsAndConditions ||
                  "Payment due within 14 days of acceptance. Prices are valid until the expiry date."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
