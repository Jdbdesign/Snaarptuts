"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type PaymentReceivedItem,
  INITIAL_PAYMENTS,
} from "./books-data";
import {
  ArrowLeft,
  X,
  Settings,
  Calendar,
  Info,
  Upload,
  Check,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecordPaymentView({ tl }: Props) {
  const customer = useTimelineVar<string>(tl, "booksPaymentCustomer", "");
  const amount = useTimelineVar<string>(tl, "booksPaymentAmount", "");
  const bankCharges = useTimelineVar<string>(tl, "booksPaymentBankCharges", "");
  const date = useTimelineVar<string>(tl, "booksPaymentDate", "11/05/2026");
  const paymentNumber = useTimelineVar<string>(
    tl,
    "booksPaymentNumber",
    "PAY-00004"
  );
  const paymentMode = useTimelineVar<string>(
    tl,
    "booksPaymentMode",
    "CASH"
  );
  const depositTo = useTimelineVar<string>(
    tl,
    "booksPaymentDepositTo",
    "Petty Cash"
  );
  const reference = useTimelineVar<string>(tl, "booksPaymentReference", "");
  const taxDeducted = useTimelineVar<string>(
    tl,
    "booksPaymentTaxDeducted",
    "no"
  );
  const appliedAmount = useTimelineVar<string>(
    tl,
    "booksPaymentAppliedAmount",
    "500.00"
  );
  const appliedDate = useTimelineVar<string>(
    tl,
    "booksPaymentAppliedDate",
    "11/05/2026"
  );
  const notes = useTimelineVar<string>(tl, "booksPaymentNotes", "");
  const files = useTimelineVar<string[]>(tl, "booksPaymentFiles", []);
  const sendThankYou = useTimelineVar<boolean>(
    tl,
    "booksPaymentSendThankYou",
    true
  );
  const isSaving = useTimelineVar<boolean>(tl, "booksPaymentSaving", false);

  const numAmount = parseFloat(amount) || 0;
  const numApplied = customer === "Acme Foods Ltd" ? (parseFloat(appliedAmount) || 0) : 0;
  const excess = Math.max(0, numAmount - numApplied);

  const handleBack = () => {
    tl.setVar("booksView", "payments");
    tl.setUrl(BOOKS_URLS.paymentsReceived);
  };

  const handleClearApplied = () => {
    tl.setVar("booksPaymentAppliedAmount", "0.00");
  };

  const handleSave = async (status: "Paid" | "Draft") => {
    tl.setVar("booksPaymentSaving", true);
    await tl.wait(600);

    const newPayment: PaymentReceivedItem = {
      id: `pay-${Date.now()}`,
      paymentNumber: paymentNumber || "PAY-00004",
      customerName: customer || "Acme Foods Ltd",
      paymentDate: date || "11/05/2026",
      amount: numAmount || 500.0,
      paymentMode: paymentMode,
      depositTo: depositTo,
      reference: reference || "REF-2026-PAY",
      status: status,
      taxDeducted: taxDeducted === "yes" ? "Yes, TDS" : "No Tax deducted",
      bankCharges: parseFloat(bankCharges) || 0,
      notes: notes,
      sendThankYou: sendThankYou,
    };

    const currentPayments = tl.getVar<PaymentReceivedItem[]>(
      "booksPayments",
      INITIAL_PAYMENTS
    );
    tl.setVar("booksPayments", [newPayment, ...currentPayments]);
    tl.setVar("booksActivePayment", newPayment);
    tl.setVar("booksPaymentSaving", false);
    tl.setVar("booksView", "payments");
    tl.setUrl(BOOKS_URLS.paymentsReceived);
    tl.setVar("booksToastText", "Payment recorded successfully");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="books-record-payment-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              data-tl="btn-back-record-payment"
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
            <span className="text-gray-900 font-medium">New</span>
          </div>

          <button
            type="button"
            data-tl="btn-close-record-payment"
            onClick={handleBack}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Record Payment Form Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-6">
          <h1
            data-tl="text-record-payment-title"
            className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4"
          >
            Record Payment
          </h1>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Customer Name* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Customer Name*
              </label>
              <select
                data-tl="select-payment-customer"
                value={customer}
                onChange={(e) => tl.setVar("booksPaymentCustomer", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              >
                <option value="">Select Customer</option>
                <option value="Acme Foods Ltd">Acme Foods Ltd</option>
                <option value="Harvest Tables Ltd">Harvest Tables Ltd</option>
                <option value="Brightway Stores">Brightway Stores</option>
                <option value="Sterling Interiors">Sterling Interiors</option>
              </select>
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
                  data-tl="input-payment-amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => tl.setVar("booksPaymentAmount", e.target.value)}
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
                  data-tl="input-payment-bank-charges"
                  placeholder="0.00"
                  value={bankCharges}
                  onChange={(e) =>
                    tl.setVar("booksPaymentBankCharges", e.target.value)
                  }
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
                  data-tl="input-payment-date"
                  value={date}
                  onChange={(e) => tl.setVar("booksPaymentDate", e.target.value)}
                  className="w-full px-3 py-2 pr-9 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Payment #* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Payment #*
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  data-tl="input-payment-number"
                  value={paymentNumber}
                  onChange={(e) =>
                    tl.setVar("booksPaymentNumber", e.target.value)
                  }
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <button
                  type="button"
                  data-tl="btn-payment-numbering"
                  onClick={() =>
                    tl.setVar("booksPaymentNumberingDialogOpen", true)
                  }
                  title="Configure numbering"
                  className="p-2 border border-gray-200 text-gray-500 hover:text-gray-800 rounded-lg cursor-pointer transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Payment Mode
              </label>
              <select
                data-tl="select-payment-mode"
                value={paymentMode}
                onChange={(e) => tl.setVar("booksPaymentMode", e.target.value)}
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
                data-tl="select-payment-deposit-to"
                value={depositTo}
                onChange={(e) =>
                  tl.setVar("booksPaymentDepositTo", e.target.value)
                }
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
                data-tl="input-payment-reference"
                placeholder="Enter reference"
                value={reference}
                onChange={(e) =>
                  tl.setVar("booksPaymentReference", e.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Tax Deducted Radio */}
            <div className="md:col-span-2">
              <label className="block text-gray-600 font-medium mb-2">
                Tax deducted?
              </label>
              <div className="flex items-center gap-6 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentTaxDeducted"
                    data-tl="radio-payment-no-tax"
                    checked={taxDeducted === "no"}
                    onChange={() =>
                      tl.setVar("booksPaymentTaxDeducted", "no")
                    }
                    className="text-[#7014D9] focus:ring-[#7014D9]"
                  />
                  <span className="text-gray-700">No Tax deducted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentTaxDeducted"
                    data-tl="radio-payment-tax-tds"
                    checked={taxDeducted === "yes"}
                    onChange={() =>
                      tl.setVar("booksPaymentTaxDeducted", "yes")
                    }
                    className="text-[#7014D9] focus:ring-[#7014D9]"
                  />
                  <span className="text-gray-700">Yes, TDS</span>
                </label>
              </div>
            </div>
          </div>

          {/* Unpaid Invoices Section */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-900">
                  Unpaid Invoices
                </span>
                <select
                  data-tl="select-unpaid-invoices-filter"
                  className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded text-[11px] text-gray-600 focus:outline-none"
                >
                  <option>Filter by Date Range</option>
                  <option>This Month</option>
                  <option>Previous Month</option>
                  <option>All Time</option>
                </select>
              </div>
              <button
                type="button"
                data-tl="btn-clear-applied-amount"
                onClick={handleClearApplied}
                className="text-xs text-[#2563EB] hover:underline font-medium cursor-pointer"
              >
                Clear Applied Amount
              </button>
            </div>

            {/* Unpaid Invoices Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4">DATE</th>
                    <th className="py-2.5 px-4">INVOICE NUMBER</th>
                    <th className="py-2.5 px-4 text-right">INVOICE AMOUNT</th>
                    <th className="py-2.5 px-4 text-right">AMOUNT DUE</th>
                    <th className="py-2.5 px-4">
                      <div className="flex items-center gap-1">
                        <span>PAYMENT RECEIVED ON</span>
                        <Info className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </th>
                    <th className="py-2.5 px-4 text-right">PAYMENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customer === "Acme Foods Ltd" ? (
                    <tr data-tl="row-unpaid-inv-1" className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 text-gray-600">10/20/2026</td>
                      <td className="py-3 px-4 font-semibold text-[#7014D9]">
                        INV10005
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        £500.00
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">
                        £500.00
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          data-tl="input-payment-applied-date-0"
                          value={appliedDate}
                          onChange={(e) =>
                            tl.setVar("booksPaymentAppliedDate", e.target.value)
                          }
                          className="w-28 px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <input
                          type="text"
                          data-tl="input-payment-applied-amount-0"
                          value={appliedAmount}
                          onChange={(e) =>
                            tl.setVar("booksPaymentAppliedAmount", e.target.value)
                          }
                          className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-xs text-right font-semibold text-gray-900 focus:outline-none focus:border-[#7014D9]"
                        />
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-6 text-center text-gray-400 italic"
                      >
                        {customer
                          ? "No unpaid invoices found for this customer"
                          : "Please select a customer to view unpaid invoices"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-gray-400">
              **List contains only SENT invoices
            </p>
          </div>

          {/* Summary Block */}
          <div className="flex justify-end pt-2">
            <div className="w-80 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Amount Received</span>
                <span
                  data-tl="summary-amount-received"
                  className="font-semibold text-gray-900"
                >
                  £{numAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Amount used for Payments</span>
                <span
                  data-tl="summary-amount-used"
                  className="font-semibold text-gray-900"
                >
                  £{numApplied.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Amount Refunded</span>
                <span className="font-semibold text-gray-900">£0.00</span>
              </div>

              {/* Excess Warning Box */}
              <div
                data-tl="alert-amount-in-excess"
                className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-amber-800"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-medium text-xs">Amount in Excess</span>
                </div>
                <span className="font-bold text-xs">£{excess.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes & Attachments */}
          <div className="space-y-4 pt-4 border-t border-gray-100 text-xs">
            {/* Notes */}
            <div className="space-y-1.5">
              <label className="block text-gray-600 font-medium">
                Notes (Internal use. Not visible to customer)
              </label>
              <textarea
                data-tl="textarea-payment-notes"
                rows={3}
                placeholder="Enter internal notes..."
                value={notes}
                onChange={(e) => tl.setVar("booksPaymentNotes", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <label className="block text-gray-600 font-medium">
                Attachments
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  data-tl="btn-payment-upload-file"
                  onClick={() =>
                    tl.setVar("booksPaymentFilePickerOpen", true)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
                <span className="text-[11px] text-gray-400">
                  You can upload files up to 5MB each
                </span>
              </div>

              {files.length > 0 && (
                <div
                  data-tl="payment-attached-files"
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {files.map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-2 px-2.5 py-1 bg-purple-50 border border-purple-200 rounded-lg text-xs text-[#7014D9]"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="font-medium">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Send Thank You Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                data-tl="checkbox-payment-thank-you"
                onClick={() =>
                  tl.setVar("booksPaymentSendThankYou", !sendThankYou)
                }
                className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${
                  sendThankYou
                    ? "bg-[#7014D9] text-white"
                    : "border border-gray-300 bg-white"
                }`}
              >
                {sendThankYou && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
              <span className="text-gray-700">
                Send a &quot;Thank you&quot; note for this payment
              </span>
            </div>

            {/* Additional Fields Note */}
            <p
              data-tl="text-payment-additional-fields"
              className="text-[11px] text-[#2563EB] pt-1"
            >
              Additional Fields: You can add more fields from Settings &gt; Preferences &gt; Payments Received.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              data-tl="btn-cancel-record-payment"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-save-payment-draft"
              onClick={() => handleSave("Draft")}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              data-tl="btn-save-payment-paid"
              onClick={() => handleSave("Paid")}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save as Paid</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
