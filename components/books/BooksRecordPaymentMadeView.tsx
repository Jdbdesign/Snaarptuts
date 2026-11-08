"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_PAYMENTS_MADE,
  PAYMENT_MADE_MODES,
  PAYMENT_MADE_PAID_THROUGH,
  type PaymentMade,
} from "./books-data";
import {
  AlertTriangle,
  ArrowLeft,
  CreditCard,
  ChevronDown,
  Paperclip,
  UploadCloud,
  Check,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecordPaymentMadeView({ tl }: Props) {
  // Form variables
  const vendor = useTimelineVar<string>(tl, "booksPaymentMadeVendor", "");
  const amount = useTimelineVar<string>(tl, "booksPaymentMadeAmount", "0");
  const payFullAmount = useTimelineVar<boolean>(tl, "booksPaymentMadePayFull", false);
  const paymentDate = useTimelineVar<string>(tl, "booksPaymentMadeDate", "11/08/2026");
  const paymentMode = useTimelineVar<string>(tl, "booksPaymentMadeMode", "Cash");
  const paidThrough = useTimelineVar<string>(tl, "booksPaymentMadePaidThrough", "Select an account");
  const reference = useTimelineVar<string>(tl, "booksPaymentMadeReference", "");
  const deductTds = useTimelineVar<boolean>(tl, "booksPaymentMadeDeductTds", false);
  const notes = useTimelineVar<string>(tl, "booksPaymentMadeNotes", "");
  const attachedFile = useTimelineVar<string>(tl, "booksPaymentMadeAttachedFile", "");

  // Dropdown open states
  const vendorOpen = useTimelineVar<boolean>(tl, "booksPaymentVendorDropdownOpen", false);
  const modeOpen = useTimelineVar<boolean>(tl, "booksPaymentModeDropdownOpen", false);
  const paidThroughOpen = useTimelineVar<boolean>(tl, "booksPaymentPaidThroughDropdownOpen", false);

  const numAmount = parseFloat(amount) || 0;
  // If payFullAmount is true, applied is 4800. If false and amount is 1000, applied is 0 unless set.
  const appliedAmount = payFullAmount ? 4800 : 0;
  const excessAmount = Math.max(0, numAmount - appliedAmount);

  const handleBack = () => {
    tl.setVar("booksView", "payments-made");
    tl.setUrl(BOOKS_URLS.paymentsMade);
  };

  const handleTogglePayFull = () => {
    const nextVal = !payFullAmount;
    tl.setVar("booksPaymentMadePayFull", nextVal);
    if (nextVal) {
      tl.setVar("booksPaymentMadeAmount", "4800");
    }
  };

  const handleSaveAsPaid = () => {
    const list = tl.getVar<PaymentMade[]>("booksPaymentsMade", INITIAL_PAYMENTS_MADE);
    const newPayment: PaymentMade = {
      id: "pm-" + (list.length + 1),
      paymentNumber: (list.length + 2).toString(),
      date: paymentDate || "11/08/2026",
      vendorName: vendor || "Greenfield Packaging Ltd",
      paymentMode: paymentMode || "Bank Transfer",
      amount: numAmount || 4800,
      unusedAmount: excessAmount > 0 ? excessAmount.toFixed(2) : "—",
      status: "Paid",
      referenceNumber: reference || "PAY-3301",
      paidThroughAccount: paidThrough || "Accounts Receivable",
      notes: notes,
      billsPaid: [
        {
          billNumber: "BILL-007",
          billDate: "11/08/2026",
          billAmount: 4800,
          paymentApplied: appliedAmount || 4800,
        },
      ],
    };

    tl.setVar("booksPaymentsMade", [newPayment, ...list]);
    tl.setVar("booksToastText", "Payment recorded successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "payments-made");
    tl.setUrl(BOOKS_URLS.paymentsMade);
  };

  return (
    <div
      data-tl="books-record-payment-made-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-record-payment-back"
            onClick={handleBack}
            className="flex items-center gap-1 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>|</span>
          <span
            onClick={handleBack}
            className="hover:text-gray-900 cursor-pointer"
          >
            Payments Made
          </span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">New</span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h1
            data-tl="record-payment-title"
            className="text-xl font-bold text-gray-900"
          >
            Record Payment
          </h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 max-w-3xl">
          {/* Vendor Name* */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-red-600">
              Vendor Name*
            </label>
            <div className="col-span-3 relative">
              <button
                type="button"
                data-tl="select-payment-made-vendor"
                onClick={() => tl.setVar("booksPaymentVendorDropdownOpen", !vendorOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300 text-left"
              >
                <span className={vendor ? "text-gray-900" : "text-gray-400"}>
                  {vendor || "Select a vendor"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {vendorOpen && (
                <div
                  data-tl="menu-payment-made-vendor"
                  className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  <button
                    type="button"
                    data-tl="opt-payment-vendor-greenfield"
                    onClick={() => {
                      tl.setVar("booksPaymentMadeVendor", "Greenfield Packaging Ltd");
                      tl.setVar("booksPaymentVendorDropdownOpen", false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Greenfield Packaging Ltd
                  </button>
                  <button
                    type="button"
                    data-tl="opt-payment-vendor-victor"
                    onClick={() => {
                      tl.setVar("booksPaymentMadeVendor", "Victor Stationery");
                      tl.setVar("booksPaymentVendorDropdownOpen", false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Victor Stationery
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Payment Made* */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-red-600">
              Payment Made*
            </label>
            <div className="col-span-3 flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500">
                <span className="px-2.5 py-1.5 bg-gray-50 border-r border-gray-200 text-xs text-gray-500 font-medium">
                  GBP
                </span>
                <input
                  type="text"
                  data-tl="input-payment-made-amount"
                  value={amount}
                  onChange={(e) => tl.setVar("booksPaymentMadeAmount", e.target.value)}
                  className="w-32 px-3 py-1.5 text-xs text-gray-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Bank Charges (if any)</span>
                <input
                  type="text"
                  defaultValue="0"
                  className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-center text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Pay Full Amount Checkbox */}
          <div className="grid grid-cols-4 items-center gap-4">
            <div />
            <div className="col-span-3">
              <button
                type="button"
                data-tl="checkbox-pay-full"
                onClick={handleTogglePayFull}
                className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    payFullAmount
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {payFullAmount && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Pay full amount (GBP4,800.00)</span>
              </button>
            </div>
          </div>

          {/* Payment Date* */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-red-600">
              Payment Date*
            </label>
            <div className="col-span-3">
              <input
                type="text"
                data-tl="input-payment-made-date"
                value={paymentDate}
                onChange={(e) => tl.setVar("booksPaymentMadeDate", e.target.value)}
                className="w-48 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-900"
              />
            </div>
          </div>

          {/* Payment Mode */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Payment Mode
            </label>
            <div className="col-span-3 relative">
              <button
                type="button"
                data-tl="select-payment-made-mode"
                onClick={() => tl.setVar("booksPaymentModeDropdownOpen", !modeOpen)}
                className="w-56 flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300"
              >
                <span>{paymentMode}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {modeOpen && (
                <div
                  data-tl="menu-payment-made-mode"
                  className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {PAYMENT_MADE_MODES.map((mode) => {
                    const optTl =
                      mode === "Bank Transfer"
                        ? "opt-mode-bank-transfer"
                        : mode === "Cash"
                        ? "opt-mode-cash"
                        : mode === "Credit Card"
                        ? "opt-mode-credit-card"
                        : "opt-mode-cheque";
                    return (
                      <button
                        key={mode}
                        type="button"
                        data-tl={optTl}
                        onClick={() => {
                          tl.setVar("booksPaymentMadeMode", mode);
                          tl.setVar("booksPaymentModeDropdownOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Paid Through* */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-red-600">
              Paid Through*
            </label>
            <div className="col-span-3 relative">
              <button
                type="button"
                data-tl="select-payment-made-paid-through"
                onClick={() => tl.setVar("booksPaymentPaidThroughDropdownOpen", !paidThroughOpen)}
                className="w-72 flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300"
              >
                <span>{paidThrough}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {paidThroughOpen && (
                <div
                  data-tl="menu-payment-made-paid-through"
                  className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {PAYMENT_MADE_PAID_THROUGH.map((acc) => {
                    const optTl =
                      acc === "Accounts Receivable"
                        ? "opt-paid-through-ar"
                        : acc === "Undeposited Funds"
                        ? "opt-paid-through-petty-cash"
                        : "opt-paid-through-bank";
                    return (
                      <button
                        key={acc}
                        type="button"
                        data-tl={optTl}
                        onClick={() => {
                          tl.setVar("booksPaymentMadePaidThrough", acc);
                          tl.setVar("booksPaymentPaidThroughDropdownOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {acc}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Reference# */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Reference#
            </label>
            <div className="col-span-3">
              <input
                type="text"
                data-tl="input-payment-made-reference"
                value={reference}
                onChange={(e) => tl.setVar("booksPaymentMadeReference", e.target.value)}
                className="w-64 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* TDS */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">TDS</label>
            <div className="col-span-3">
              <button
                type="button"
                data-tl="checkbox-deduct-tds"
                onClick={() => tl.setVar("booksPaymentMadeDeductTds", !deductTds)}
                className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    deductTds
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {deductTds && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Deduct TDS Tax</span>
              </button>
            </div>
          </div>
        </div>

        {/* Open Bills Section */}
        <div className="space-y-2 pt-4">
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Clear Applied Amount
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Bill#</th>
                  <th className="py-2.5 px-4">Bill Amount</th>
                  <th className="py-2.5 px-4">Amount Due</th>
                  <th className="py-2.5 px-4">Payment Made on</th>
                  <th className="py-2.5 px-4 text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4">
                    <p className="text-gray-900 font-medium">07 Nov 2026</p>
                    <p className="text-[11px] text-gray-400">Due Date: 09 Nov 2026</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-blue-600">BILL-007</td>
                  <td className="py-3 px-4 text-gray-600">4,800.00</td>
                  <td className="py-3 px-4 text-gray-600">4,800.00</td>
                  <td className="py-3 px-4 text-gray-600">{paymentDate}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-block text-right">
                      <input
                        type="text"
                        data-tl="input-bill-payment-applied"
                        value={appliedAmount ? appliedAmount.toString() : "0"}
                        readOnly
                        className="w-20 px-2 py-1 border border-gray-200 rounded text-xs text-right text-gray-800"
                      />
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            tl.setVar("booksPaymentMadePayFull", true);
                            tl.setVar("booksPaymentMadeAmount", "4800");
                          }}
                          className="text-[11px] text-blue-600 hover:underline mt-0.5 cursor-pointer"
                        >
                          Pay in Full
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50/50 font-medium text-gray-800">
                  <td colSpan={5} className="py-2.5 px-4 text-right">
                    Total :
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold">
                    {appliedAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Card on the Right */}
        <div className="flex justify-end pt-2">
          <div
            data-tl="payment-summary-box"
            className="w-80 bg-[#FAFBFD] border border-gray-200 rounded-xl p-5 space-y-2 text-xs"
          >
            <div className="flex justify-between text-gray-600">
              <span>Amount Paid:</span>
              <span className="font-medium text-gray-900">{numAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Amount used for Payments:</span>
              <span className="font-medium text-gray-900">{appliedAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Amount Refunded:</span>
              <span className="font-medium text-gray-900">0.00</span>
            </div>

            {/* Excess warning */}
            {excessAmount > 0 ? (
              <div
                data-tl="payment-excess-warning"
                className="flex items-center justify-between text-amber-600 font-semibold pt-1 border-t border-amber-100"
              >
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Amount in Excess:</span>
                </div>
                <span>GBP {excessAmount.toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-200">
                <span>Amount in Excess:</span>
                <span className="font-medium text-gray-900">GBP 0.00</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Bank Charges :</span>
              <span className="font-medium text-gray-900">GBP 0.00</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5 max-w-xl">
          <label className="text-xs font-medium text-gray-700">
            Notes (Internal use. Not visible to vendor)
          </label>
          <textarea
            data-tl="input-payment-made-notes"
            value={notes}
            onChange={(e) => tl.setVar("booksPaymentMadeNotes", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Attachments */}
        <div className="space-y-2 max-w-xl">
          <label className="text-xs font-medium text-gray-700">Attachments</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-upload-payment-file"
              onClick={() => tl.setVar("booksPaymentFileModalOpen", true)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <UploadCloud className="w-4 h-4 text-gray-500" />
              <span>Upload File</span>
            </button>
            <span className="text-[11px] text-gray-400">
              You can upload a maximum of 5 files, 10MB each
            </span>
          </div>

          {/* Attached file chip */}
          {attachedFile && (
            <div
              data-tl="chip-attached-file-receipt"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>{attachedFile}</span>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            data-tl="btn-save-as-paid-payment"
            onClick={handleSaveAsPaid}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer transition-colors"
          >
            Save as Paid
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
