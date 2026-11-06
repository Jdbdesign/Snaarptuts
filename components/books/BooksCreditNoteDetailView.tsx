"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type CreditNoteItem,
  INITIAL_CREDIT_NOTES,
} from "./books-data";
import {
  ArrowLeft,
  Mail,
  Download,
  Eye,
  Edit2,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksCreditNoteDetailView({ tl }: Props) {
  const creditNote = useTimelineVar<CreditNoteItem>(
    tl,
    "booksActiveCreditNote",
    INITIAL_CREDIT_NOTES[0] // CN-00002
  );

  const handleBack = () => {
    tl.setVar("booksView", "credit-notes");
    tl.setUrl(BOOKS_URLS.creditNotes);
  };

  const handleSend = () => {
    tl.setVar("booksToastText", "Credit note emailed successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleDownloadPdf = () => {
    tl.setVar("booksToastText", "Credit note PDF downloaded successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handlePreviewPdf = () => {
    tl.setVar("booksCreditNotePdfPreviewOpen", true);
  };

  return (
    <div
      data-tl="books-credit-note-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-credit-notes"
            onClick={handleBack}
            className="flex items-center gap-1 text-[#7014D9] hover:underline font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>|</span>
          <span
            onClick={handleBack}
            className="cursor-pointer hover:text-gray-700"
          >
            Home
          </span>
          <span>&gt;</span>
          <span
            onClick={handleBack}
            className="cursor-pointer hover:text-gray-700"
          >
            Credit Notes
          </span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Details</span>
        </div>

        {/* Top Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1
              data-tl="text-credit-note-title"
              className="text-2xl font-bold text-gray-900"
            >
              Credit Note {creditNote?.creditNoteNumber || "CN-00002"}
            </h1>
            <span
              data-tl="chip-credit-note-status"
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
            >
              {creditNote?.status || "Open"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="btn-send-credit-note"
              onClick={handleSend}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Credit Note</span>
            </button>

            <button
              type="button"
              data-tl="btn-download-credit-note-pdf"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-preview-credit-note-pdf"
              onClick={handlePreviewPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-edit-credit-note"
              onClick={() => {
                tl.setVar("booksView", "new-credit-note");
                tl.setUrl(BOOKS_URLS.newCreditNote);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Details & Items Grid */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs border-b border-gray-100 pb-4">
            <div>
              <p className="text-gray-400 font-medium">Customer</p>
              <p className="font-semibold text-gray-900 mt-1">
                {creditNote?.customerName || "Harvest Tables Ltd"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Credit Note Date</p>
              <p className="font-medium text-gray-900 mt-1">
                {creditNote?.creditNoteDate || "10/25/2026"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Reference#</p>
              <p className="font-medium text-gray-900 mt-1">
                {creditNote?.reference || "RET-002"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Salesperson</p>
              <p className="font-medium text-gray-900 mt-1">
                {creditNote?.salesperson || "Sam Taylor"}
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900">Items</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4">ITEM DETAILS</th>
                    <th className="py-2.5 px-4">ACCOUNT</th>
                    <th className="py-2.5 px-4 text-center">QUANTITY</th>
                    <th className="py-2.5 px-4 text-right">RATE</th>
                    <th className="py-2.5 px-4">TAX</th>
                    <th className="py-2.5 px-4 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(creditNote?.items ?? []).map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {item.account || "Sales"}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        £{item.rate.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {item.tax}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">
                        £{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Block */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total:</span>
                <span>£{(creditNote?.subTotal ?? 150).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-sm border-t border-gray-200 pt-2">
                <span>Total (GBP):</span>
                <span className="text-[#7014D9]">
                  £{(creditNote?.total ?? 150).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
