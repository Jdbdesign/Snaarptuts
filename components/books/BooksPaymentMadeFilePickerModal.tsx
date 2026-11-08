"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FileText, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksPaymentMadeFilePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksPaymentFileModalOpen", false);

  if (!isOpen) return null;

  const handleSelectFile = (fileName: string) => {
    tl.setVar("booksPaymentMadeAttachedFile", fileName);
    tl.setVar("booksPaymentFileModalOpen", false);
  };

  const handleClose = () => {
    tl.setVar("booksPaymentFileModalOpen", false);
  };

  return (
    <div
      data-tl="modal-payment-file-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Upload File</h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-gray-500">
            Select a document to attach to this payment:
          </p>

          <div className="space-y-2">
            <button
              type="button"
              data-tl="opt-payment-file-receipt"
              onClick={() => handleSelectFile("payment_receipt.pdf")}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors text-left cursor-pointer"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">
                  payment_receipt.pdf
                </p>
                <p className="text-[11px] text-gray-400">1.2 MB • PDF Document</p>
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end px-5 py-3 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-1.5 text-xs text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
