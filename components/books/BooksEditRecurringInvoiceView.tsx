"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type RecurringInvoiceItem,
  INITIAL_RECURRING_INVOICES,
} from "./books-data";
import {
  ChevronDown,
  ArrowLeft,
  Home,
  Calendar,
  CheckCircle2,
  Plus,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksEditRecurringInvoiceView({ tl }: Props) {
  const activeProfile = useTimelineVar<RecurringInvoiceItem>(
    tl,
    "booksActiveRecurring",
    INITIAL_RECURRING_INVOICES[0]
  );

  const [customer] = useState<string>(
    activeProfile?.customerName || "Harvest Tables Ltd"
  );
  const [profileName, setProfileName] = useState<string>(
    activeProfile?.profileName || "Weekly Produce Box"
  );
  const [frequency, setFrequency] = useState<string>(
    activeProfile?.frequency || "Month"
  );
  const [startDate, setStartDate] = useState<string>(
    activeProfile?.startDate || "11/05/2026"
  );
  const [endDate, setEndDate] = useState<string>(activeProfile?.endDate || "");
  const [neverExpires, setNeverExpires] = useState<boolean>(
    activeProfile?.neverExpires ?? true
  );
  const [paymentTerms, setPaymentTerms] = useState<string>(
    activeProfile?.paymentTerms || "Net 15"
  );
  const [termsDropdownOpen, setTermsDropdownOpen] = useState(false);
  const [freqDropdownOpen, setFreqDropdownOpen] = useState(false);

  const [itemText, setItemText] = useState<string>(
    activeProfile?.lineItems?.[0]?.name || "Organic Rice 25kg"
  );
  const [itemQty, setItemQty] = useState<number>(
    activeProfile?.lineItems?.[0]?.quantity || 4
  );
  const [itemRate, setItemRate] = useState<number>(
    activeProfile?.lineItems?.[0]?.rate || 200
  );

  const [discount, setDiscount] = useState<number>(
    activeProfile?.discount || 0
  );
  const [shipping, setShipping] = useState<number>(
    activeProfile?.shipping || 0
  );
  const [adjustment, setAdjustment] = useState<number>(
    activeProfile?.adjustment || 0
  );

  const [customerNotes, setCustomerNotes] = useState<string>(
    activeProfile?.customerNotes || "Thanks for your business."
  );
  const [termsText, setTermsText] = useState<string>(
    activeProfile?.termsText || ""
  );

  const subTotal = itemQty * itemRate;
  const total = Math.max(0, subTotal - discount + shipping + adjustment);

  const handleSave = () => {
    const updated: RecurringInvoiceItem = {
      ...activeProfile,
      profileName,
      customerName: customer,
      frequency: frequency as RecurringInvoiceItem["frequency"],
      startDate,
      neverExpires,
      endDate: neverExpires ? undefined : endDate,
      paymentTerms,
      amount: total,
      customerNotes,
      termsText,
      lineItems: [
        {
          id: activeProfile?.lineItems?.[0]?.id || "row-0",
          name: itemText,
          quantity: itemQty,
          rate: itemRate,
          tax: "VAT Standard (20%)",
          amount: subTotal,
        },
      ],
    };
    tl.setVar("booksActiveRecurring", updated);

    const profiles = tl.getVar<RecurringInvoiceItem[]>(
      "booksRecurringInvoices",
      INITIAL_RECURRING_INVOICES
    );
    tl.setVar(
      "booksRecurringInvoices",
      profiles.map((p) => (p.id === updated.id ? updated : p))
    );

    tl.setVar("booksView", "recurring-detail");
    tl.setUrl(BOOKS_URLS.recurringDetails);
    tl.setVar("booksToastText", "Recurring invoice updated successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleCancel = () => {
    tl.setVar("booksView", "recurring-detail");
    tl.setUrl(BOOKS_URLS.recurringDetails);
  };

  return (
    <div
      data-tl="books-edit-recurring-invoice-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-cancel-edit-recurring"
            onClick={handleCancel}
            className="flex items-center gap-1 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-gray-300">|</span>
          <Home className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-500">Recurring Invoices</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-500">Details</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900 font-medium">Edit</span>
        </div>

        {/* Title row */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h1
            data-tl="title-edit-recurring"
            className="text-2xl font-bold text-gray-900"
          >
            Edit Recurring Invoice
          </h1>
          <button
            type="button"
            data-tl="btn-cancel-top-edit-recurring"
            onClick={handleCancel}
            className="text-xs text-gray-500 hover:text-gray-800 font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Three-column Form Grid */}
        <div className="space-y-4 text-xs">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="font-semibold text-gray-700 block mb-1.5">
                Customer <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  data-tl="select-edit-recurring-customer"
                  value={customer}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1.5">
                Profile Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-edit-recurring-profile-name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <div className="relative">
              <label className="font-semibold text-gray-700 block mb-1.5">
                Repeat Every <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-edit-recurring-frequency"
                onClick={() => setFreqDropdownOpen(!freqDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 cursor-pointer"
              >
                <span className="font-medium text-gray-900">{frequency}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {freqDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
                  {["Week", "Month", "Year"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setFrequency(f);
                        setFreqDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            <div>
              <label className="font-semibold text-gray-700 block mb-1.5">
                Start On <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  data-tl="input-edit-recurring-start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900"
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1.5">
                Ends On
              </label>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                disabled={neverExpires}
                data-tl="input-edit-recurring-end-date"
                value={neverExpires ? "" : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 ${
                  neverExpires ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>

            <div className="pt-5 flex items-center gap-2">
              <button
                type="button"
                data-tl="check-edit-recurring-never-expires"
                onClick={() => setNeverExpires(!neverExpires)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {neverExpires ? (
                  <CheckCircle2 className="w-4 h-4 text-[#7014D9] fill-[#7014D9]/20" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300" />
                )}
                <span className="font-semibold text-gray-800">Never Expires</span>
              </button>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="relative">
              <label className="font-semibold text-gray-700 block mb-1.5">
                Payment Terms
              </label>
              <button
                type="button"
                data-tl="select-edit-recurring-terms"
                onClick={() => setTermsDropdownOpen(!termsDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-gray-900">{paymentTerms}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {termsDropdownOpen && (
                <div
                  data-tl="menu-edit-recurring-terms"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  {["Due on Receipt", "Net 15", "Net 30", "Net 45", "Net 60"].map(
                    (t) => (
                      <button
                        key={t}
                        type="button"
                        data-tl={
                          t === "Net 30"
                            ? "terms-opt-net30"
                            : t === "Net 15"
                            ? "terms-opt-net15"
                            : `terms-opt-${t.toLowerCase().replace(/[^a-z0-9]/g, "")}`
                        }
                        onClick={() => {
                          setPaymentTerms(t);
                          setTermsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-6" />

        {/* Line Items Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Line Items</h2>
            <button
              type="button"
              data-tl="btn-edit-recurring-add-item"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-gray-500" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Items Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/60 text-gray-600 font-semibold">
                  <th className="py-2.5 px-4">Item Details</th>
                  <th className="py-2.5 px-4 w-28">Qty</th>
                  <th className="py-2.5 px-4 w-32">Rate</th>
                  <th className="py-2.5 px-4 w-32 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      data-tl="input-edit-recurring-item-name"
                      value={itemText}
                      onChange={(e) => setItemText(e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      data-tl="input-edit-recurring-item-qty"
                      value={itemQty}
                      onChange={(e) => setItemQty(Number(e.target.value) || 1)}
                      className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      data-tl="input-edit-recurring-item-rate"
                      value={itemRate}
                      onChange={(e) => setItemRate(Number(e.target.value) || 0)}
                      className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {subTotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end pt-3">
            <div className="w-72 space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>Sub Total</span>
                <span className="font-semibold text-gray-900">{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Discount %</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  className="w-16 px-2 py-1 border border-gray-200 rounded text-right text-xs"
                />
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Shipping</span>
                <input
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(Number(e.target.value) || 0)}
                  className="w-16 px-2 py-1 border border-gray-200 rounded text-right text-xs"
                />
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Adjustment</span>
                <input
                  type="number"
                  value={adjustment}
                  onChange={(e) => setAdjustment(Number(e.target.value) || 0)}
                  className="w-16 px-2 py-1 border border-gray-200 rounded text-right text-xs"
                />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 font-bold text-sm">
                <span className="text-gray-900">Total</span>
                <span className="text-[#2563EB]">
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Textareas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 text-xs">
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">
              Customer Notes
            </label>
            <textarea
              rows={3}
              data-tl="textarea-edit-recurring-notes"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">
              Terms &amp; Conditions
            </label>
            <textarea
              rows={3}
              data-tl="textarea-edit-recurring-terms"
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              placeholder="Enter the terms and conditions of your business"
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-cancel-bottom-edit-recurring"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-recurring-changes"
            onClick={handleSave}
            className="px-5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
