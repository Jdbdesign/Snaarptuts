"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Loader2 } from "lucide-react";
import type { CustomerItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCustomerConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksCustomerConfirmOpen", false);
  const isDeleting = useTimelineVar(tl, "booksCustomerDeleting", false);
  const target = useTimelineVar<CustomerItem | null>(
    tl,
    "booksTargetDeleteCustomer",
    null
  );

  if (!isOpen) return null;

  const handleConfirm = () => {
    tl.setVar("booksCustomerDeleting", true);
    setTimeout(() => {
      tl.setVar("booksCustomerDeleting", false);
      tl.setVar("booksCustomerConfirmOpen", false);
      if (target) {
        const active = tl.getVar<CustomerItem[]>("booksCustomers", []);
        tl.setVar(
          "booksCustomers",
          active.filter((x) => x.id !== target.id)
        );
        const inactive = tl.getVar<CustomerItem[]>("booksInactiveCustomers", []);
        tl.setVar(
          "booksInactiveCustomers",
          inactive.filter((x) => x.id !== target.id)
        );
      }
      tl.setVar("booksToastMessage", "Customer deleted successfully.");
      tl.setVar("booksToastOpen", true);
    }, 600);
  };

  return (
    <div
      data-tl="books-confirm-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] select-none"
    >
      <div
        data-tl="books-confirm-card"
        className="w-[380px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
      >
        <h3 className="text-base font-semibold text-gray-900">
          Delete customer?
        </h3>
        <p className="mt-2 text-xs text-gray-600 leading-relaxed">
          This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            data-tl="btn-confirm-cancel"
            onClick={() => tl.setVar("booksCustomerConfirmOpen", false)}
            className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-delete"
            disabled={isDeleting}
            onClick={handleConfirm}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-5 py-2 text-xs font-medium text-white hover:bg-red-700 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
