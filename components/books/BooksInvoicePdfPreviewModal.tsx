"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { INITIAL_INVOICES, type InvoiceItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksInvoicePdfPreviewModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksInvoicePdfPreviewOpen",
    false
  );
  const invoice = useTimelineVar<InvoiceItem>(
    tl,
    "booksActiveInvoice",
    INITIAL_INVOICES[1] // INV10008
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksInvoicePdfPreviewOpen", false);
  };

  return (
    <div
      data-tl="modal-invoice-pdf-preview"
      className="fixed inset-0 z-50 bg-[#333333] flex flex-col items-center select-none overflow-hidden"
    >
      {/* Dark PDF Viewer Top Bar */}
      <div className="h-12 w-full bg-[#2A2B2E] border-b border-[#3D3E42] px-6 flex items-center justify-between text-white text-xs shrink-0">
        <div className="flex items-center gap-3">
          <ProductLogo name="books" size={20} />
          <span className="font-semibold text-gray-200">
            Invoice PDF — {invoice.invoiceNumber}.pdf
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
          data-tl="invoice-pdf-sheet"
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
                  Invoice Pdf
                </h1>
                <p className="text-xs font-semibold text-gray-700 mt-1">
                  # {invoice.invoiceNumber}
                </p>
                <div className="mt-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                    BALANCE DUE
                  </span>
                  <span className="text-xl font-extrabold text-gray-900">
                    £{invoice.balanceDue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bill To & Invoice Info */}
            <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Bill To
                </p>
                <p className="font-bold text-gray-900 text-sm">
                  {invoice.customerName}
                </p>
                <p className="text-gray-600 mt-0.5">Commercial Accounts</p>
                <p className="text-gray-500">London, United Kingdom</p>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-right">
                <span className="text-gray-500 font-medium">Invoice Date:</span>
                <span className="text-gray-900 font-semibold">{invoice.date}</span>
                <span className="text-gray-500 font-medium">Terms:</span>
                <span className="text-gray-900 font-semibold">{invoice.terms}</span>
                <span className="text-gray-500 font-medium">Due Date:</span>
                <span className="text-gray-900 font-semibold">{invoice.dueDate}</span>
                {invoice.orderNumber && (
                  <>
                    <span className="text-gray-500 font-medium">Order #:</span>
                    <span className="text-gray-900 font-semibold">
                      {invoice.orderNumber}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="pt-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b-2 border-gray-900 text-gray-900 font-bold">
                    <th className="py-2 text-left">#</th>
                    <th className="py-2 text-left">Item & Description</th>
                    <th className="py-2 text-right">Qty</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoice.items.map((it, idx) => (
                    <tr key={it.id || idx}>
                      <td className="py-3 text-gray-400 font-medium">
                        {idx + 1}
                      </td>
                      <td className="py-3 font-semibold text-gray-900">
                        {it.name}
                      </td>
                      <td className="py-3 text-right text-gray-700">
                        {it.quantity}
                      </td>
                      <td className="py-3 text-right text-gray-700">
                        £{it.rate.toFixed(2)}
                      </td>
                      <td className="py-3 text-right font-semibold text-gray-900">
                        £{it.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="flex justify-end pt-4">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span className="font-semibold text-gray-900">
                    £{invoice.subTotal.toFixed(2)}
                  </span>
                </div>
                {invoice.discountAmount ? (
                  <div className="flex justify-between text-gray-600">
                    <span>Discount ({invoice.discountPercent}%)</span>
                    <span className="font-semibold text-gray-900">
                      -£{invoice.discountAmount.toFixed(2)}
                    </span>
                  </div>
                ) : null}
                {invoice.shipping ? (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Charges</span>
                    <span className="font-semibold text-gray-900">
                      £{invoice.shipping.toFixed(2)}
                    </span>
                  </div>
                ) : null}
                {invoice.adjustment ? (
                  <div className="flex justify-between text-gray-600">
                    <span>Adjustment</span>
                    <span className="font-semibold text-gray-900">
                      £{invoice.adjustment.toFixed(2)}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between py-2 border-t border-gray-200 text-sm font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#7014D9]">
                    £{invoice.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Payment Made</span>
                  <span className="font-semibold text-emerald-600">
                    (-) £{invoice.amountPaid.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-t border-gray-200 text-xs font-bold text-gray-900 bg-gray-50 px-2 rounded">
                  <span>Balance Due</span>
                  <span className="text-gray-900">
                    £{invoice.balanceDue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notes & Terms */}
          <div className="pt-8 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
            <div>
              <p className="font-semibold text-gray-700">Notes:</p>
              <p>{invoice.customerNotes}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Terms & Conditions:</p>
              <p>{invoice.termsAndConditions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
