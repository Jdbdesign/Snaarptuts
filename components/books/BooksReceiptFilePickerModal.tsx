"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, FileText, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksReceiptFilePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptFilePickerOpen",
    false
  );
  const [selectedFile, setSelectedFile] = useState<string>("payment_slip.png");

  if (!isOpen) return null;

  const handleConfirm = () => {
    const current = tl.getVar<string[]>("booksReceiptFiles", []);
    if (!current.includes(selectedFile)) {
      tl.setVar("booksReceiptFiles", [...current, selectedFile]);
    }
    tl.setVar("booksReceiptFilePickerOpen", false);
    tl.setVar("booksToastText", `File "${selectedFile}" attached`);
    tl.setVar("booksToastOpen", true);
  };

  const handleClose = () => {
    tl.setVar("booksReceiptFilePickerOpen", false);
  };

  return (
    <div
      data-tl="modal-receipt-file-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[440px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            Attach Files from Document Hub
          </h2>
          <button
            type="button"
            data-tl="btn-close-file-picker"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <p className="text-gray-600">
            Choose a receipt proof or bank transfer confirmation:
          </p>

          <div
            data-tl="file-opt-payment-slip"
            onClick={() => setSelectedFile("payment_slip.png")}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
              selectedFile === "payment_slip.png"
                ? "border-[#7014D9] bg-purple-50/60"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#7014D9]" />
              <div>
                <span className="font-semibold text-gray-900 block">
                  payment_slip.png
                </span>
                <span className="text-[11px] text-gray-500">
                  Image PNG • 342 KB • Uploaded today
                </span>
              </div>
            </div>
            {selectedFile === "payment_slip.png" && (
              <Check className="w-4 h-4 text-[#7014D9] stroke-[3]" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-file-upload"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-file-upload"
            onClick={handleConfirm}
            className="px-4 py-2 bg-[#7014D9] hover:bg-[#5b0fb3] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Attach Selected
          </button>
        </div>
      </div>
    </div>
  );
}
