"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import {
  BOOKS_URLS,
  type SalesReceiptItem,
  INITIAL_RECEIPTS,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksReceiptConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptConfirmDialogOpen",
    false
  );
  const activeReceipt = useTimelineVar<SalesReceiptItem>(
    tl,
    "booksActiveReceipt",
    INITIAL_RECEIPTS[0]
  );

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    const receipts = tl.getVar<SalesReceiptItem[]>(
      "booksReceipts",
      INITIAL_RECEIPTS
    );
    const updated = receipts.filter((r) => r.id !== activeReceipt?.id);
    tl.setVar("booksReceipts", updated);
    tl.setVar("booksReceiptConfirmDialogOpen", false);
    tl.setVar("booksView", "receipts");
    tl.setUrl(BOOKS_URLS.salesReceipts);
    tl.setVar("booksToastText", "Sales receipt deleted successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleCancel = () => {
    tl.setVar("booksReceiptConfirmDialogOpen", false);
  };

  return (
    <div
      data-tl="receipt-confirm-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="p-2.5 bg-rose-50 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-base font-bold text-gray-900">
            Delete Sales Receipt
          </h2>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Are you sure you want to delete sales receipt{" "}
          <span className="font-semibold text-gray-900">
            {activeReceipt?.receiptNumber || "SR-00001"}
          </span>
          ? This transaction will be permanently removed.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-receipt-delete"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-receipt-delete"
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
