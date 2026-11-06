"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { INITIAL_CREDIT_NOTES, type CreditNoteItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCreditNotePdfPreviewModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksCreditNotePdfPreviewOpen",
    false
  );
  const creditNote = useTimelineVar<CreditNoteItem>(
    tl,
    "booksActiveCreditNote",
    INITIAL_CREDIT_NOTES[0] // CN-00002
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksCreditNotePdfPreviewOpen", false);
  };

  const subTotal = creditNote?.subTotal ?? 150.0;
  const total = creditNote?.total ?? 150.0;

  return (
    <div
      data-tl="modal-credit-note-pdf-preview"
      className="fixed inset-0 z-50 bg-[#333333] flex flex-col items-center select-none overflow-hidden"
    >
      {/* Dark PDF Viewer Top Bar */}
      <div className="h-12 w-full bg-[#2A2B2E] border-b border-[#3D3E42] px-6 flex items-center justify-between text-white text-xs shrink-0">
        <div className="flex items-center gap-3">
          <ProductLogo name="books" size={20} />
          <span className="font-semibold text-gray-200">
            Credit Note PDF — {creditNote?.creditNoteNumber || "CN-00002"}.pdf
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
          data-tl="btn-close-credit-note-pdf-preview"
          onClick={handleClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3D3E42] hover:bg-[#4E4F55] text-gray-200 hover:text-white transition-colors cursor-pointer font-medium text-xs"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      </div>

      {/* PDF Canvas Simulation */}
      <div className="flex-1 w-full overflow-y-auto p-8 flex justify-center items-start">
        <div
          data-tl="card-credit-note-pdf-paper"
          className="w-[680px] min-h-[750px] bg-white rounded-md shadow-2xl p-10 text-gray-800 space-y-8 border border-gray-300 my-auto"
        >
          {/* PDF Document Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ProductLogo name="books" size={24} />
                <span className="font-bold text-base text-gray-900 tracking-tight">
                  SNAARP BOOKS
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Official Credit Note
              </p>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                CREDIT NOTE
              </h1>
              <p className="text-xs font-semibold text-[#7014D9] mt-1">
                #{creditNote?.creditNoteNumber || "CN-00002"}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="text-gray-400 font-medium mb-1">Credit To:</p>
              <p className="font-semibold text-gray-900 text-sm">
                {creditNote?.customerName || "Harvest Tables Ltd"}
              </p>
              <p className="text-gray-500 mt-1">
                Reference: {creditNote?.reference || "RET-002"}
              </p>
            </div>
            <div className="space-y-1.5 text-right">
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="font-medium text-gray-900">
                  {creditNote?.creditNoteDate || "10/25/2026"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-medium text-gray-900">
                  {creditNote?.status || "Open"}
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold">
                <th className="py-2">Item</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Rate</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(creditNote?.items ?? []).map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-2.5 text-center text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="py-2.5 text-right text-gray-600">
                    £{item.rate.toFixed(2)}
                  </td>
                  <td className="py-2.5 text-right font-semibold text-gray-900">
                    £{item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4 flex justify-end text-xs">
            <div className="w-48 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total:</span>
                <span>£{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-sm border-t border-gray-200 pt-2">
                <span>Total Credit:</span>
                <span className="text-[#7014D9]">£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          <div className="border-t border-gray-100 pt-6 text-[11px] text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700">Notes:</p>
            <p>{creditNote?.customerNotes || "Standard credit note."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
