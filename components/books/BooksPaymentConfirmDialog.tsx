"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle } from "lucide-react";
import {
  BOOKS_URLS,
  type PaymentReceivedItem,
  INITIAL_PAYMENTS,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksPaymentConfirmDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksPaymentConfirmDialogOpen",
    false
  );
  const activePayment = useTimelineVar<PaymentReceivedItem>(
    tl,
    "booksActivePayment",
    INITIAL_PAYMENTS[1] // PAY-00002
  );

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    const payments = tl.getVar<PaymentReceivedItem[]>(
      "booksPayments",
      INITIAL_PAYMENTS
    );
    const updated = payments.filter((p) => p.id !== activePayment?.id);
    tl.setVar("booksPayments", updated);
    tl.setVar("booksPaymentConfirmDialogOpen", false);
    tl.setVar("booksView", "payments");
    tl.setUrl(BOOKS_URLS.paymentsReceived);
    tl.setVar("booksToastText", "Payment has been deleted.");
    tl.setVar("booksToastOpen", true);
  };

  const handleCancel = () => {
    tl.setVar("booksPaymentConfirmDialogOpen", false);
  };

  return (
    <div
      data-tl="payment-confirm-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="p-2.5 bg-rose-50 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-base font-bold text-gray-900">
            Delete Payment
          </h2>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Are you sure you want to delete this payment?
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-payment-delete"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-payment-delete"
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
