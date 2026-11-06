"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type PaymentReceivedItem,
  INITIAL_PAYMENTS,
} from "./books-data";
import { ArrowLeft, X, Calendar, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksEditPaymentView({ tl }: Props) {
  const activePayment = useTimelineVar<PaymentReceivedItem>(
    tl,
    "booksActivePayment",
    INITIAL_PAYMENTS[1] // PAY-00002
  );

  const [amount, setAmount] = useState(
    activePayment?.amount?.toFixed(2) || "20.00"
  );
  const [bankCharges, setBankCharges] = useState(
    activePayment?.bankCharges?.toFixed(2) || "0.00"
  );
  const [date, setDate] = useState(
    activePayment?.paymentDate || "10/21/2026"
  );
  const [mode, setMode] = useState(activePayment?.paymentMode || "CASH");
  const [depositTo, setDepositTo] = useState(
    activePayment?.depositTo || "Petty Cash"
  );
  const [reference, setReference] = useState(
    activePayment?.reference || "PARTIAL-PAYMENT"
  );
  const [status, setStatus] = useState<"Paid" | "Draft">(
    activePayment?.status || "Paid"
  );
  const [notes, setNotes] = useState(
    activePayment?.notes || "Partial payment (sample record)"
  );
  const [sendThankYou, setSendThankYou] = useState(false);

  const handleBack = () => {
    tl.setVar("booksView", "payment-details");
    tl.setUrl(BOOKS_URLS.paymentDetails);
  };

  const handleSave = () => {
    const updatedPayment: PaymentReceivedItem = {
      ...activePayment,
      amount: parseFloat(amount) || activePayment.amount,
      bankCharges: parseFloat(bankCharges) || 0,
      paymentDate: date,
      paymentMode: mode,
      depositTo: depositTo,
      reference: reference,
      status: status,
      notes: notes,
      sendThankYou: sendThankYou,
    };

    const payments = tl.getVar<PaymentReceivedItem[]>(
      "booksPayments",
      INITIAL_PAYMENTS
    );
    const updatedList = payments.map((p) =>
      p.id === activePayment.id ? updatedPayment : p
    );

    tl.setVar("booksActivePayment", updatedPayment);
    tl.setVar("booksPayments", updatedList);
    tl.setVar("booksView", "payment-details");
    tl.setUrl(BOOKS_URLS.paymentDetails);
    tl.setVar("booksToastText", "Payment updated successfully");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="books-edit-payment-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              data-tl="btn-back-edit-payment"
              onClick={handleBack}
              className="flex items-center gap-1 text-[#7014D9] hover:underline font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span>|</span>
            <span
              onClick={handleBack}
              className="cursor-pointer hover:text-gray-700"
            >
              Home
            </span>
            <span>&gt;</span>
            <span
              onClick={handleBack}
              className="cursor-pointer hover:text-gray-700"
            >
              Payments Received
            </span>
            <span>&gt;</span>
            <span
              onClick={handleBack}
              className="cursor-pointer hover:text-gray-700"
            >
              Details
            </span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">Edit</span>
          </div>

          <button
            type="button"
            data-tl="btn-close-edit-payment"
            onClick={handleBack}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-6">
          <h1
            data-tl="text-edit-payment-title"
            className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4"
          >
            Edit Payment {activePayment?.paymentNumber || "PAY-00002"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Customer (Disabled) */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Customer Name
              </label>
              <input
                type="text"
                disabled
                data-tl="input-edit-payment-customer"
                value={activePayment?.customerName || "Harvest Tables Ltd"}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 cursor-not-allowed"
              />
            </div>

            {/* Payment Number (Disabled) */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Payment #
              </label>
              <input
                type="text"
                disabled
                data-tl="input-edit-payment-number"
                value={activePayment?.paymentNumber || "PAY-00002"}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 cursor-not-allowed"
              />
            </div>

            {/* Amount Received* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Amount Received*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  £
                </span>
                <input
                  type="text"
                  data-tl="input-edit-payment-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>
            </div>

            {/* Bank Charges */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Bank Charges (if any)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  £
                </span>
                <input
                  type="text"
                  data-tl="input-edit-payment-bank-charges"
                  value={bankCharges}
                  onChange={(e) => setBankCharges(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>
            </div>

            {/* Payment Date* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Payment Date*
              </label>
              <div className="relative">
                <input
                  type="text"
                  data-tl="input-edit-payment-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 pr-9 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Payment Mode
              </label>
              <select
                data-tl="select-edit-payment-mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              >
                <option value="CASH">CASH</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            {/* Deposit To* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Deposit To*
              </label>
              <select
                data-tl="select-edit-payment-deposit-to"
                value={depositTo}
                onChange={(e) => setDepositTo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              >
                <option value="Petty Cash">Petty Cash</option>
                <option value="Bank Account">Bank Account</option>
                <option value="Undeposited Funds">Undeposited Funds</option>
              </select>
            </div>

            {/* Reference# */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Reference#
              </label>
              <input
                type="text"
                data-tl="input-edit-payment-ref"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Status
              </label>
              <select
                data-tl="select-edit-payment-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "Paid" | "Draft")}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              >
                <option value="Paid">Paid</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Tax Deducted */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Tax Deducted
              </label>
              <div className="py-2 text-xs text-gray-600">
                No Tax deducted
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="text-xs space-y-1.5">
            <label className="block text-gray-600 font-medium">
              Notes (Internal use. Not visible to customer)
            </label>
            <textarea
              data-tl="textarea-edit-payment-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          {/* Thank You Note Checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              data-tl="checkbox-edit-payment-thank-you"
              onClick={() => setSendThankYou(!sendThankYou)}
              className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${
                sendThankYou
                  ? "bg-[#7014D9] text-white"
                  : "border border-gray-300 bg-white"
              }`}
            >
              {sendThankYou && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span className="text-xs text-gray-700">
              Send a &quot;Thank you&quot; note for this payment
            </span>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              data-tl="btn-cancel-edit-payment"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-save-edit-payment"
              onClick={handleSave}
              className="px-5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
