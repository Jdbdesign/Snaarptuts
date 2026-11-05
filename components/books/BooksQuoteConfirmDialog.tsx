"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Trash2 } from "lucide-react";
import {
  BOOKS_URLS,
  type QuoteItem,
  INITIAL_QUOTES,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksQuoteConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksQuoteConfirmDialogOpen",
    false
  );
  const targetId = useTimelineVar<string>(
    tl,
    "booksQuoteConfirmQuoteId",
    ""
  );
  const quotes = useTimelineVar<QuoteItem[]>(tl, "booksQuotes", INITIAL_QUOTES);

  if (!isOpen) return null;

  const handleCancel = () => {
    tl.setVar("booksQuoteConfirmDialogOpen", false);
  };

  const handleConfirmDelete = () => {
    // Remove quote from list
    const updatedQuotes = quotes.filter((q) => q.id !== targetId);
    tl.setVar("booksQuotes", updatedQuotes);
    tl.setVar("booksQuoteConfirmDialogOpen", false);
    tl.setVar("booksToastText", "Quote deleted successfully.");
    tl.setVar("booksToastOpen", true);

    // Return to quotes list
    tl.setVar("booksView", "quotes");
    tl.setUrl(BOOKS_URLS.quotes);
  };

  return (
    <div
      data-tl="quote-confirm-dialog-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="quote-confirm-dialog"
        className="w-[400px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 text-center space-y-4"
      >
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6 text-rose-600" />
        </div>

        <div className="space-y-1.5">
          <h2
            data-tl="quote-confirm-title"
            className="text-base font-bold text-gray-900"
          >
            Delete this quote?
          </h2>
          <p
            data-tl="quote-confirm-desc"
            className="text-xs text-gray-500"
          >
            This cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-delete-quote"
            onClick={handleCancel}
            className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-delete-quote"
            onClick={handleConfirmDelete}
            className="flex-1 py-2 bg-rose-600 text-white hover:bg-rose-700 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
