"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Camera, ScanLine } from "lucide-react";
import type { QuoteLineItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksQuoteScanDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksQuoteScanDialogOpen",
    false
  );
  const scanInput = useTimelineVar<string>(tl, "booksQuoteScanInput", "");
  const currentLineItems = useTimelineVar<QuoteLineItem[]>(
    tl,
    "booksQuoteLineItems",
    []
  );

  if (!isOpen) return null;

  const handleAdd = () => {
    // Adds Ground Pepper 500g (qty 1, rate 6.50) as requested in Step 47
    const scannedItem: QuoteLineItem = {
      id: "scan-ground-pepper",
      name: "Ground Pepper 500g",
      quantity: 1,
      rate: 6.5,
      tax: "-",
      amount: 6.5,
    };

    tl.setVar("booksQuoteLineItems", [...currentLineItems, scannedItem]);
    tl.setVar("booksQuoteScanDialogOpen", false);
    tl.setVar("booksQuoteScanInput", "");
  };

  const handleClose = () => {
    tl.setVar("booksQuoteScanDialogOpen", false);
  };

  return (
    <div
      data-tl="modal-scan-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-scan-card"
        className="w-[480px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanLine className="w-4 h-4 text-[#7014D9]" />
            <h2
              data-tl="modal-scan-title"
              className="text-base font-bold text-gray-900"
            >
              Scan Item / Barcode
            </h2>
          </div>
          <button
            type="button"
            data-tl="btn-close-scan-x"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera Viewport Box */}
        <div
          data-tl="scan-camera-viewport"
          className="h-44 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 flex flex-col items-center justify-center text-gray-400 p-4 text-center space-y-2"
        >
          <Camera className="w-8 h-8 text-gray-400" />
          <p className="text-xs text-gray-500 max-w-[280px]">
            Point camera at barcode or use physical barcode scanner
          </p>
        </div>

        {/* Barcode input row */}
        <div className="space-y-1.5 text-xs">
          <label className="block text-gray-700 font-medium">
            Barcode / Item ID
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              data-tl="input-barcode"
              placeholder="Scan or enter barcode..."
              value={scanInput}
              onChange={(e) => tl.setVar("booksQuoteScanInput", e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9]"
            />
            <button
              type="button"
              data-tl="btn-add-barcode"
              onClick={handleAdd}
              className="px-4 py-2 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
            >
              Add
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center pt-1">
          <button
            type="button"
            data-tl="btn-close-scan"
            onClick={handleClose}
            className="text-xs text-[#7014D9] hover:underline font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
