"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import { ProductLogo } from "@/components/icons";
import { INITIAL_BILLS, type Bill } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksBillPdfPreviewModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksBillPdfPreviewOpen",
    false
  );
  const bill = useTimelineVar<Bill>(
    tl,
    "booksActiveBill",
    INITIAL_BILLS[4] // BILL-002
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksBillPdfPreviewOpen", false);
  };

  return (
    <div
      data-tl="modal-bill-pdf-preview"
      className="fixed inset-0 z-50 bg-[#333333] flex flex-col items-center select-none overflow-hidden"
    >
      {/* Dark PDF Viewer Top Bar */}
      <div className="h-12 w-full bg-[#2A2B2E] border-b border-[#3D3E42] px-6 flex items-center justify-between text-white text-xs shrink-0">
        <div className="flex items-center gap-3">
          <ProductLogo name="books" size={20} />
          <span className="font-semibold text-gray-200">
            Bill PDF — {bill.billNumber || "BILL-002"}.pdf
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
          data-tl="btn-close-bill-pdf-preview"
          onClick={handleClose}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
          title="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* PDF Document Canvas Viewport */}
      <div className="flex-1 w-full overflow-y-auto py-8 px-4 flex justify-center bg-[#4F5056]">
        <div
          data-tl="pdf-document-paper"
          className="w-[720px] bg-white rounded-sm shadow-2xl p-10 text-gray-900 text-xs min-h-[900px] flex flex-col justify-between"
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-start border-b border-gray-200 pb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                  BILL
                </h1>
                <p className="text-gray-500 mt-1"># {bill.billNumber || "BILL-002"}</p>
                <p className="text-gray-500">Balance Due: £0.00</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 font-semibold rounded text-xs uppercase tracking-wider mb-2">
                  {bill.status}
                </span>
                <p className="text-gray-500 text-[11px]">Date: {bill.date}</p>
                <p className="text-gray-500 text-[11px]">Due: {bill.dueDate}</p>
              </div>
            </div>

            {/* Vendor & Billed To */}
            <div className="grid grid-cols-2 gap-8 my-6">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Bill From:
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  {bill.vendorName || "Victor Stationery"}
                </p>
                <p className="text-gray-600">5 High Street, London, EC2M 4AA</p>
                <p className="text-gray-600">accounts@example.com</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Billed To:
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  Acme Studio Ltd
                </p>
                <p className="text-gray-600">14 King Street, London</p>
                <p className="text-gray-600">billing@acme-studio.com</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mt-8 border border-gray-200 rounded-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#1E3A8A] text-white text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">#</th>
                    <th className="py-2.5 px-3 font-semibold">Item & Description</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Qty</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Rate</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[11px]">
                  {(bill.items || []).map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3 px-3 text-gray-500">{idx + 1}</td>
                      <td className="py-3 px-3 font-medium text-gray-900">{item.name}</td>
                      <td className="py-3 px-3 text-right">{item.quantity}</td>
                      <td className="py-3 px-3 text-right">£{item.rate.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-medium">£{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="flex justify-end mt-6">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span>£{(bill.subTotal || 200).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>£{(bill.taxAmount || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 border-t border-gray-300 pt-2 text-sm">
                  <span>Total</span>
                  <span>£{(bill.total || 200).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 text-center text-gray-400 text-[11px]">
            <p>Thank you for your business. Generated by Snaarp Books.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
