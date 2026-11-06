"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Barcode } from "lucide-react";
import type { ReceiptLineItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksReceiptScanDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptScanDialogOpen",
    false
  );
  const scanInput = useTimelineVar<string>(tl, "booksReceiptScanInput", "");

  if (!isOpen) return null;

  const handleConfirm = () => {
    const current = tl.getVar<ReceiptLineItem[]>("booksReceiptLineItems", []);
    const nextIdx = current.length;
    const newItem: ReceiptLineItem = {
      id: `row-${nextIdx}`,
      name: "Delivery Fee",
      description: "Standard delivery fee",
      quantity: 1,
      rate: 10.0,
      tax: "VAT Standard (20%)",
      amount: 10.0,
    };
    tl.setVar("booksReceiptLineItems", [...current, newItem]);
    tl.setVar("booksReceiptScanDialogOpen", false);
    tl.setVar("booksToastText", "Item added via scanner");
    tl.setVar("booksToastOpen", true);
  };

  const handleClose = () => {
    tl.setVar("booksReceiptScanDialogOpen", false);
  };

  return (
    <div
      data-tl="modal-receipt-scan"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-50 text-[#7014D9] rounded-lg">
              <Barcode className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">
              Scan Barcode / Item Code
            </h2>
          </div>
          <button
            type="button"
            data-tl="btn-close-scan"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <p className="text-gray-600">
            Scan a barcode with your scanner, or enter the item code manually:
          </p>
          <input
            type="text"
            data-tl="input-scan-barcode"
            value={scanInput}
            onChange={(e) => tl.setVar("booksReceiptScanInput", e.target.value)}
            placeholder="Scan or enter item code..."
            className="w-full h-10 px-3 rounded-lg border border-gray-300 font-mono text-gray-900 focus:outline-none focus:border-[#7014D9]"
          />
          <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-[11px] text-gray-500">
            Simulated item: <span className="font-semibold text-gray-900">Delivery Fee (£10.00)</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-scan"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-scan"
            onClick={handleConfirm}
            className="px-4 py-2 bg-[#7014D9] hover:bg-[#5b0fb3] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Add to Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
