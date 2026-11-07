"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import type { Bill } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksBillConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksBillConfirmOpen", false);
  const toDeleteNumber = useTimelineVar<string>(
    tl,
    "booksBillToDeleteNumber",
    "BILL-004"
  );
  const toDeleteId = useTimelineVar<string>(
    tl,
    "booksBillToDeleteId",
    "BILL-004"
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksBillConfirmOpen", false);
  };

  const handleConfirm = () => {
    const list = tl.getVar<Bill[]>("booksBills", []);
    const updated = list.filter((b) => b.id !== toDeleteId && b.billNumber !== toDeleteNumber);
    tl.setVar("booksBills", updated);
    tl.setVar("booksBillConfirmOpen", false);
    tl.setVar("booksToastText", "Bill deleted");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="modal-bill-confirm"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              Delete {toDeleteNumber}? This cannot be undone.
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this bill? This cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            data-tl="btn-cancel-bill-delete"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-bill-delete"
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
