"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Trash2 } from "lucide-react";
import {
  BOOKS_URLS,
  type InvoiceItem,
  INITIAL_INVOICES,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksInvoiceConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksInvoiceConfirmDialogOpen",
    false
  );
  const activeInvoice = useTimelineVar<InvoiceItem>(
    tl,
    "booksActiveInvoice",
    INITIAL_INVOICES[5] // INV10000
  );
  const invoices = useTimelineVar<InvoiceItem[]>(
    tl,
    "booksInvoices",
    INITIAL_INVOICES
  );

  if (!isOpen) return null;

  const handleCancel = () => {
    tl.setVar("booksInvoiceConfirmDialogOpen", false);
  };

  const handleConfirmDelete = () => {
    const updatedInvoices = invoices.filter((i) => i.id !== activeInvoice.id);
    tl.setVar("booksInvoices", updatedInvoices);
    tl.setVar("booksInvoiceConfirmDialogOpen", false);
    tl.setVar("booksToastText", "Invoice deleted successfully.");
    tl.setVar("booksToastOpen", true);

    tl.setVar("booksView", "invoices");
    tl.setUrl(BOOKS_URLS.invoices);
  };

  return (
    <div
      data-tl="invoice-confirm-dialog-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="invoice-confirm-dialog"
        className="w-[400px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 text-center space-y-4"
      >
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6 text-rose-600" />
        </div>

        <div className="space-y-1.5">
          <h2
            data-tl="invoice-confirm-title"
            className="text-base font-bold text-gray-900"
          >
            Delete this invoice?
          </h2>
          <p
            data-tl="invoice-confirm-desc"
            className="text-xs text-gray-500"
          >
            This action cannot be undone. Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-gray-800">
              {activeInvoice.invoiceNumber}
            </span>
            ?
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            data-tl="btn-cancel-invoice-delete"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-invoice-delete"
            onClick={handleConfirmDelete}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
