"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import type { RecurringExpenseProfile } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksRecurringExpenseConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksRecExpenseConfirmOpen", false);
  const toDeleteName = useTimelineVar<string>(
    tl,
    "booksRecExpenseToDeleteName",
    "Monthly Office Supplies"
  );
  const toDeleteId = useTimelineVar<string>(
    tl,
    "booksRecExpenseToDeleteId",
    "rec-exp-2"
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksRecExpenseConfirmOpen", false);
  };

  const handleConfirm = () => {
    const list = tl.getVar<RecurringExpenseProfile[]>("booksRecurringExpenses", []);
    const updated = list.filter((p) => p.id !== toDeleteId && p.profileName !== toDeleteName);
    tl.setVar("booksRecurringExpenses", updated);
    tl.setVar("booksRecExpenseConfirmOpen", false);
    tl.setVar("booksToastText", `Deleted ${toDeleteName}`);
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="modal-rec-confirm"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              Delete {toDeleteName}? This cannot be undone.
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this recurring expense profile? Future scheduled expenses will not be generated.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            data-tl="btn-cancel-rec-delete"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-rec-delete"
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
