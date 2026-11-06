"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CheckCircle2 } from "lucide-react";
import { type InvoiceItem, INITIAL_INVOICES } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksInvoiceMarkPaidDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksInvoiceMarkPaidDialogOpen",
    false
  );
  const activeInvoice = useTimelineVar<InvoiceItem>(
    tl,
    "booksActiveInvoice",
    INITIAL_INVOICES[1] // INV10008
  );
  const invoices = useTimelineVar<InvoiceItem[]>(
    tl,
    "booksInvoices",
    INITIAL_INVOICES
  );

  if (!isOpen) return null;

  const handleCancel = () => {
    tl.setVar("booksInvoiceMarkPaidDialogOpen", false);
  };

  const handleConfirm = () => {
    const updatedInvoice: InvoiceItem = {
      ...activeInvoice,
      status: "Paid",
      amountPaid: activeInvoice.total,
      balanceDue: 0.0,
    };

    const updatedList = invoices.map((inv) =>
      inv.id === activeInvoice.id ? updatedInvoice : inv
    );

    tl.setVar("booksActiveInvoice", updatedInvoice);
    tl.setVar("booksInvoices", updatedList);
    tl.setVar("booksInvoiceMarkPaidDialogOpen", false);
    tl.setVar("booksToastText", "Invoice marked as paid.");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="modal-mark-paid-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-mark-paid-card"
        className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 text-center space-y-4"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>

        <div className="space-y-1.5">
          <h2
            data-tl="mark-paid-confirm-title"
            className="text-base font-bold text-gray-900"
          >
            Mark this invoice as fully paid?
          </h2>
          <p
            data-tl="mark-paid-confirm-desc"
            className="text-xs text-gray-500 leading-relaxed"
          >
            This records a payment of{" "}
            <span className="font-semibold text-gray-800">
              £{activeInvoice.balanceDue.toFixed(2)}
            </span>{" "}
            and emails a receipt to{" "}
            <span className="font-semibold text-gray-800">
              {activeInvoice.customerName}
            </span>
            .
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            data-tl="btn-cancel-mark-paid"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-mark-paid"
            onClick={handleConfirm}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
