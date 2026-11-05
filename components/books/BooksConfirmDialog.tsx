"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Loader2 } from "lucide-react";
import type { BookItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksConfirmOpen", false);
  const text = useTimelineVar(tl, "booksConfirmText", "");
  const isDeleting = useTimelineVar(tl, "booksConfirmDeleting", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="books-confirm-modal"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-100"
    >
      <div
        data-tl="books-confirm-card"
        className="w-[380px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
      >
        <h3 className="text-base font-semibold text-gray-900">
          books.snaarp.com says
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {text}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            data-tl="btn-confirm-cancel"
            onClick={() => tl.setVar("booksConfirmOpen", false)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-ok"
            disabled={isDeleting}
            onClick={() => {
              tl.setVar("booksConfirmDeleting", true);
              const action = tl.getVar<string>("booksConfirmAction", "");
              setTimeout(() => {
                tl.setVar("booksConfirmDeleting", false);
                tl.setVar("booksConfirmOpen", false);

                if (action === "delete-single") {
                  const currentItem = tl.getVar<BookItem | null>("booksCurrentItem", null);
                  if (currentItem) {
                    const active = tl.getVar<BookItem[]>("booksItems", []);
                    tl.setVar("booksItems", active.filter((x) => x.id !== currentItem.id));
                    const inactive = tl.getVar<BookItem[]>("booksInactiveItems", []);
                    tl.setVar("booksInactiveItems", inactive.filter((x) => x.id !== currentItem.id));
                  }
                  tl.setVar("booksView", "products");
                  tl.setVar("booksToastMessage", "Item deleted.");
                  tl.setVar("booksToastOpen", true);
                } else if (action === "delete-bulk") {
                  const selectedIds = tl.getVar<string[]>("booksSelectedIds", []);
                  const count = selectedIds.length;
                  const active = tl.getVar<BookItem[]>("booksItems", []);
                  tl.setVar("booksItems", active.filter((x) => !selectedIds.includes(x.id)));
                  tl.setVar("booksSelectedIds", []);
                  tl.setVar("booksToastMessage", `${count} items deleted.`);
                  tl.setVar("booksToastOpen", true);
                }
              }, 400);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-70"
          >
            {isDeleting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>OK</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
