"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import type { ExpenseItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksExpenseConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksExpenseConfirmOpen", false);
  const expenseToDeleteLabel = useTimelineVar<string>(
    tl,
    "booksExpenseToDeleteLabel",
    "11/2/2026"
  );
  const expenseToDeleteId = useTimelineVar<string>(
    tl,
    "booksExpenseToDeleteId",
    "exp-1"
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksExpenseConfirmOpen", false);
  };

  const handleConfirm = () => {
    const currentExpenses = tl.getVar<ExpenseItem[]>("booksExpenses", []);
    const updated = currentExpenses.filter(
      (e) => e.id !== expenseToDeleteId && e.date !== expenseToDeleteLabel
    );
    tl.setVar("booksExpenses", updated);
    tl.setVar("booksExpenseConfirmOpen", false);
    tl.setVar("booksToastText", "Expense deleted");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="modal-expense-confirm"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              Delete {expenseToDeleteLabel}? This cannot be undone.
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this expense transaction? This cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            data-tl="btn-cancel-expense-delete"
            onClick={handleClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-expense-delete"
            onClick={handleConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
