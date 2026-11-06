"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Camera, ScanLine } from "lucide-react";
import type { InvoiceLineItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksInvoiceScanDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksInvoiceScanDialogOpen",
    false
  );
  const scanInput = useTimelineVar<string>(tl, "booksInvoiceScanInput", "");
  const currentLineItems = useTimelineVar<InvoiceLineItem[]>(
    tl,
    "booksInvoiceLineItems",
    []
  );

  if (!isOpen) return null;

  const handleAdd = () => {
    // Adds Delivery Fee £10.00 as requested in Step 70
    const scannedItem: InvoiceLineItem = {
      id: "scan-delivery-fee",
      name: "Delivery Fee",
      quantity: 1,
      rate: 10.0,
      tax: "-",
      amount: 10.0,
    };

    tl.setVar("booksInvoiceLineItems", [...currentLineItems, scannedItem]);
    tl.setVar("booksInvoiceScanDialogOpen", false);
    tl.setVar("booksInvoiceScanInput", "");
    tl.setVar("booksToastText", "Item added from barcode.");
    tl.setVar("booksToastOpen", true);
  };

  const handleClose = () => {
    tl.setVar("booksInvoiceScanDialogOpen", false);
  };

  return (
    <div
      data-tl="modal-invoice-scan-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-invoice-scan-card"
        className="w-[480px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanLine className="w-4 h-4 text-[#7014D9]" />
            <h2
              data-tl="modal-invoice-scan-title"
              className="text-base font-bold text-gray-900"
            >
              Scan Item / Barcode
            </h2>
          </div>
          <button
            type="button"
            data-tl="btn-close-invoice-scan-x"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera / Scanner Frame simulation */}
        <div className="w-full h-44 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-[#7014D9] flex items-center justify-center mb-2">
            <Camera className="w-6 h-6 text-[#7014D9]" />
          </div>
          <p className="text-xs font-semibold text-gray-800">
            Point your camera at a barcode
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            or enter the barcode number below
          </p>
        </div>

        {/* Manual Barcode Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Barcode / SKU Number
          </label>
          <div className="relative">
            <input
              type="text"
              data-tl="input-invoice-barcode"
              value={scanInput}
              onChange={(e) =>
                tl.setVar("booksInvoiceScanInput", e.target.value)
              }
              placeholder="e.g. 5012345678900"
              className="w-full h-10 px-3 pr-24 rounded-lg border border-gray-300 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
            <button
              type="button"
              data-tl="btn-invoice-submit-scan"
              onClick={handleAdd}
              className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-[#7014D9] hover:bg-[#5b0fb3] text-white text-xs font-semibold rounded-md cursor-pointer transition-colors"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-cancel-invoice-scan"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
