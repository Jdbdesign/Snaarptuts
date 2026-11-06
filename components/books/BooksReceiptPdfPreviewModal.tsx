"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { INITIAL_RECEIPTS, type SalesReceiptItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksReceiptPdfPreviewModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptPdfPreviewOpen",
    false
  );
  const receipt = useTimelineVar<SalesReceiptItem>(
    tl,
    "booksActiveReceipt",
    INITIAL_RECEIPTS[0]
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksReceiptPdfPreviewOpen", false);
  };

  const subTotal = (receipt?.lineItems ?? []).reduce(
    (acc, it) => acc + (it.amount || it.quantity * it.rate),
    0
  );
  const taxAmount = subTotal * 0.2;
  const total = receipt?.amount ?? subTotal + taxAmount;

  return (
    <div
      data-tl="modal-receipt-pdf-preview"
      className="fixed inset-0 z-50 bg-[#333333] flex flex-col items-center select-none overflow-hidden"
    >
      {/* Dark PDF Viewer Top Bar */}
      <div className="h-12 w-full bg-[#2A2B2E] border-b border-[#3D3E42] px-6 flex items-center justify-between text-white text-xs shrink-0">
        <div className="flex items-center gap-3">
          <ProductLogo name="books" size={20} />
          <span className="font-semibold text-gray-200">
            Sales Receipt PDF — {receipt?.receiptNumber || "SR-00002"}.pdf
          </span>
        </div>

        {/* Center Page Indicator */}
        <div
          data-tl="text-pdf-page-indicator"
          className="bg-[#3E3F44] px-3.5 py-1 rounded text-[11px] font-medium text-gray-300"
        >
          Page 1 of 1
        </div>

        {/* Close Button */}
        <button
          type="button"
          data-tl="btn-close-pdf-preview"
          onClick={handleClose}
          className="p-1.5 hover:bg-[#3D3E42] rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* PDF Canvas area */}
      <div className="flex-1 w-full overflow-y-auto p-8 flex justify-center bg-[#404040]">
        <div className="w-[680px] bg-white rounded-lg shadow-2xl p-10 space-y-6 text-gray-900 text-xs my-auto">
          {/* Receipt Top Header */}
          <div className="flex justify-between items-start border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#7014D9] uppercase tracking-wide">
                Sales Receipt
              </h1>
              <p className="text-gray-500 font-medium mt-1">
                Receipt#: {receipt?.receiptNumber || "SR-00002"}
              </p>
              <p className="text-gray-500">Date: {receipt?.receiptDate}</p>
              <p className="text-gray-500">
                Payment Mode: {receipt?.paymentMode}
              </p>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-gray-900 block">
                Acme Studio
              </span>
              <span className="text-gray-500 block">123 Business Street</span>
              <span className="text-gray-500 block">London, UK</span>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between">
            <div>
              <span className="text-[11px] text-gray-400 font-semibold uppercase block">
                Received From:
              </span>
              <span className="font-bold text-gray-900 text-sm">
                {receipt?.customerName}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-400 font-semibold uppercase block">
                Deposit Account:
              </span>
              <span className="font-medium text-gray-700">
                {receipt?.depositTo || "Bank Account"}
              </span>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold">
                <th className="py-2">Item</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Rate</th>
                <th className="py-2 text-right">Tax</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(receipt?.lineItems ?? []).map((it) => (
                <tr key={it.id}>
                  <td className="py-2.5 font-medium">{it.name}</td>
                  <td className="py-2.5 text-right">{it.quantity}</td>
                  <td className="py-2.5 text-right">£{it.rate.toFixed(2)}</td>
                  <td className="py-2.5 text-right text-gray-500">{it.tax}</td>
                  <td className="py-2.5 text-right font-semibold">
                    £{(it.amount || it.quantity * it.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="w-56 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total:</span>
                <span>£{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (20%):</span>
                <span>£{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-2">
                <span>Total Paid:</span>
                <span className="text-[#7014D9]">£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
