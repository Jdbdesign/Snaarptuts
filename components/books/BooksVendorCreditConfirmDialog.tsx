"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import { BOOKS_URLS, type VendorCredit } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksVendorCreditConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksVendorCreditConfirmOpen", false);
  const toDelete = useTimelineVar<VendorCredit | null>(
    tl,
    "booksVendorCreditToDelete",
    null
  );

  if (!isOpen || !toDelete) return null;

  const handleClose = () => {
    tl.setVar("booksVendorCreditConfirmOpen", false);
  };

  const handleConfirm = () => {
    const list = tl.getVar<VendorCredit[]>("booksVendorCredits", []);
    const updated = list.filter((c) => c.id !== toDelete.id && c.creditNoteNumber !== toDelete.creditNoteNumber);
    tl.setVar("booksVendorCredits", updated);
    tl.setVar("booksVendorCreditConfirmOpen", false);
    tl.setVar("booksToastText", "Vendor credit deleted successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "vendor-credits");
    tl.setUrl(BOOKS_URLS.vendorCredits);
  };

  return (
    <div
      data-tl="modal-delete-vendor-credit-confirm"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              Delete {toDelete.creditNoteNumber}? This cannot be undone.
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this vendor credit note? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            data-tl="btn-cancel-delete-vendor-credit"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-delete-vendor-credit"
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-xs font-medium text-white hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
