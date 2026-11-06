"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import {
  BOOKS_URLS,
  type RecurringInvoiceItem,
  INITIAL_RECURRING_INVOICES,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksRecurringConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringConfirmDialogOpen",
    false
  );
  const activeProfile = useTimelineVar<RecurringInvoiceItem>(
    tl,
    "booksActiveRecurring",
    INITIAL_RECURRING_INVOICES[0]
  );

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    const profiles = tl.getVar<RecurringInvoiceItem[]>(
      "booksRecurringInvoices",
      INITIAL_RECURRING_INVOICES
    );
    const updated = profiles.filter((p) => p.id !== activeProfile?.id);
    tl.setVar("booksRecurringInvoices", updated);
    tl.setVar("booksRecurringConfirmDialogOpen", false);
    tl.setVar("booksView", "recurring");
    tl.setUrl(BOOKS_URLS.recurringInvoices);
    tl.setVar("booksToastText", "Recurring invoice deleted successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleCancel = () => {
    tl.setVar("booksRecurringConfirmDialogOpen", false);
  };

  return (
    <div
      data-tl="recurring-confirm-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="p-2.5 bg-rose-50 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-base font-bold text-gray-900">
            Delete Recurring Invoice
          </h2>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Are you sure you want to stop and delete the recurring schedule for{" "}
          <span className="font-semibold text-gray-900">
            {activeProfile?.profileName || "Monthly Retainer"}
          </span>
          ? Invoices will no longer be generated automatically.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-recurring-delete"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-recurring-delete"
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
