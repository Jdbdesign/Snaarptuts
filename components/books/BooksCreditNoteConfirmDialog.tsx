"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import {
  BOOKS_URLS,
  type CreditNoteItem,
  INITIAL_CREDIT_NOTES,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCreditNoteConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksCreditNoteConfirmDialogOpen",
    false
  );
  const activeCreditNote = useTimelineVar<CreditNoteItem>(
    tl,
    "booksActiveCreditNote",
    INITIAL_CREDIT_NOTES[0] // CN-00002
  );

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    const notes = tl.getVar<CreditNoteItem[]>(
      "booksCreditNotes",
      INITIAL_CREDIT_NOTES
    );
    const updated = notes.filter((n) => n.id !== activeCreditNote?.id);
    tl.setVar("booksCreditNotes", updated);
    tl.setVar("booksCreditNoteConfirmDialogOpen", false);
    tl.setVar("booksView", "credit-notes");
    tl.setUrl(BOOKS_URLS.creditNotes);
    tl.setVar("booksToastText", "Credit note deleted successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleCancel = () => {
    tl.setVar("booksCreditNoteConfirmDialogOpen", false);
  };

  return (
    <div
      data-tl="credit-note-confirm-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="p-2.5 bg-rose-50 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-base font-bold text-gray-900">
            Delete Credit Note
          </h2>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Are you sure you want to delete credit note{" "}
          <span className="font-semibold text-gray-900">
            {activeCreditNote?.creditNoteNumber || "CN-00002"}
          </span>
          ? This transaction will be permanently removed.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-credit-note-delete"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-credit-note-delete"
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
