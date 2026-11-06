"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type CreditNoteItem,
  type CreditNoteLineItem,
  INITIAL_CREDIT_NOTES,
  INITIAL_ACTIVE_ITEMS,
} from "./books-data";
import {
  ArrowLeft,
  X,
  Settings,
  Calendar,
  Info,
  Plus,
  Trash2,
  FileSpreadsheet,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksNewCreditNoteView({ tl }: Props) {
  const customer = useTimelineVar<string>(tl, "booksCreditNoteCustomer", "");
  const creditNoteNumber = useTimelineVar<string>(
    tl,
    "booksCreditNoteNumber",
    "CN-00003"
  );
  const reference = useTimelineVar<string>(
    tl,
    "booksCreditNoteReference",
    ""
  );
  const date = useTimelineVar<string>(
    tl,
    "booksCreditNoteDate",
    "11/05/2026"
  );
  const accountsReceivable = "Accounts Receivable";
  const salesperson = useTimelineVar<string>(
    tl,
    "booksCreditNoteSalesperson",
    "None"
  );
  const subject = useTimelineVar<string>(tl, "booksCreditNoteSubject", "");

  const lineItems = useTimelineVar<CreditNoteLineItem[]>(
    tl,
    "booksCreditNoteLineItems",
    [
      {
        id: "cn-row-0",
        name: "",
        account: "Sales",
        quantity: 1,
        rate: 0,
        tax: "VAT Standard (20%)",
        amount: 0,
      },
    ]
  );

  const discountPercent = useTimelineVar<number>(
    tl,
    "booksCreditNoteDiscount",
    0
  );
  const shippingCharges = useTimelineVar<number>(
    tl,
    "booksCreditNoteShipping",
    0
  );
  const adjustment = useTimelineVar<number>(
    tl,
    "booksCreditNoteAdjustment",
    0
  );

  const customerNotes = useTimelineVar<string>(
    tl,
    "booksCreditNoteCustomerNotes",
    ""
  );
  const terms = useTimelineVar<string>(tl, "booksCreditNoteTerms", "");

  // Computations
  const subTotal = lineItems.reduce((acc, it) => acc + (it.amount || it.quantity * it.rate), 0);
  const discountAmount = (subTotal * discountPercent) / 100;
  const taxableSubTotal = Math.max(0, subTotal - discountAmount);
  // Calculate tax for items that have "VAT Standard (20%)"
  const taxAmount = lineItems.reduce((acc, it) => {
    if (it.tax.includes("20%")) {
      const itemSub = it.amount || it.quantity * it.rate;
      const proportion = subTotal > 0 ? (itemSub / subTotal) : 0;
      const itemTaxable = taxableSubTotal * proportion;
      return acc + itemTaxable * 0.2;
    }
    return acc;
  }, 0);

  const total = taxableSubTotal + taxAmount + shippingCharges + adjustment;

  const handleBack = () => {
    tl.setVar("booksView", "credit-notes");
    tl.setUrl(BOOKS_URLS.creditNotes);
  };

  const handleAddRow = () => {
    const newRow: CreditNoteLineItem = {
      id: `cn-row-${lineItems.length + 1}`,
      name: "",
      account: "Sales",
      quantity: 1,
      rate: 0,
      tax: "VAT Standard (20%)",
      amount: 0,
    };
    tl.setVar("booksCreditNoteLineItems", [...lineItems, newRow]);
  };

  const handleDeleteRow = (idx: number) => {
    if (lineItems.length <= 1) {
      tl.setVar("booksCreditNoteLineItems", [
        {
          id: `cn-row-reset`,
          name: "",
          account: "Sales",
          quantity: 1,
          rate: 0,
          tax: "VAT Standard (20%)",
          amount: 0,
        },
      ]);
      return;
    }
    const updated = lineItems.filter((_, i) => i !== idx);
    tl.setVar("booksCreditNoteLineItems", updated);
  };

  const handleItemChange = (idx: number, itemName: string) => {
    const foundItem = INITIAL_ACTIVE_ITEMS.find((it) => it.name === itemName);
    const updated = [...lineItems];
    const qty = updated[idx].quantity || 1;
    const rate = foundItem ? (foundItem.sellingPrice || foundItem.rate) : updated[idx].rate;
    updated[idx] = {
      ...updated[idx],
      name: itemName,
      description: foundItem?.description || "",
      rate: rate,
      tax: foundItem?.tax || "VAT Standard (20%)",
      amount: qty * rate,
    };
    tl.setVar("booksCreditNoteLineItems", updated);
  };

  const handleQtyChange = (idx: number, qtyStr: string) => {
    const qty = parseFloat(qtyStr) || 0;
    const updated = [...lineItems];
    updated[idx] = {
      ...updated[idx],
      quantity: qty,
      amount: qty * updated[idx].rate,
    };
    tl.setVar("booksCreditNoteLineItems", updated);
  };

  const handleRateChange = (idx: number, rateStr: string) => {
    const rate = parseFloat(rateStr) || 0;
    const updated = [...lineItems];
    updated[idx] = {
      ...updated[idx],
      rate: rate,
      amount: updated[idx].quantity * rate,
    };
    tl.setVar("booksCreditNoteLineItems", updated);
  };

  const handleSave = (status: "Open" | "Draft") => {
    const newCreditNote: CreditNoteItem = {
      id: `cn-${(creditNoteNumber || "3").toLowerCase().replace(/[^a-z0-9]/g, "")}`,
      creditNoteNumber: creditNoteNumber || "CN-00003",
      customerName: customer || "Harvest Tables Ltd",
      creditNoteDate: date || "11/05/2026",
      reference: reference || "RET-2026-004",
      accountsReceivable: accountsReceivable,
      salesperson: salesperson,
      subject: subject,
      status: status,
      items: lineItems.filter((it) => it.name.trim() !== ""),
      subTotal: subTotal,
      discountPercent: discountPercent,
      discountAmount: discountAmount,
      taxAmount: taxAmount,
      shippingCharges: shippingCharges,
      adjustment: adjustment,
      total: total,
      customerNotes: customerNotes,
      termsAndConditions: terms,
      pdfTemplate: "Standard Template",
    };

    const currentNotes = tl.getVar<CreditNoteItem[]>(
      "booksCreditNotes",
      INITIAL_CREDIT_NOTES
    );
    tl.setVar("booksCreditNotes", [newCreditNote, ...currentNotes]);
    tl.setVar("booksActiveCreditNote", newCreditNote);
    tl.setVar("booksView", "credit-notes");
    tl.setUrl(BOOKS_URLS.creditNotes);
    tl.setVar("booksToastText", "Credit Note saved successfully");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="books-new-credit-note-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              data-tl="btn-back-new-credit-note"
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
              Credit Notes
            </span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">New</span>
          </div>

          <button
            type="button"
            data-tl="btn-close-new-credit-note"
            onClick={handleBack}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Credit Note Form Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-6">
          <h1
            data-tl="text-new-credit-note-title"
            className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4"
          >
            New Credit Note
          </h1>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Customer Name* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Customer Name*
              </label>
              <select
                data-tl="select-credit-note-customer"
                value={customer}
                onChange={(e) =>
                  tl.setVar("booksCreditNoteCustomer", e.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              >
                <option value="">Select Customer</option>
                <option value="Harvest Tables Ltd">Harvest Tables Ltd</option>
                <option value="Acme Foods Ltd">Acme Foods Ltd</option>
                <option value="Brightway Stores">Brightway Stores</option>
                <option value="Sterling Interiors">Sterling Interiors</option>
              </select>
            </div>

            {/* Credit Note #* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Credit Note#*
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  data-tl="input-credit-note-number"
                  value={creditNoteNumber}
                  onChange={(e) =>
                    tl.setVar("booksCreditNoteNumber", e.target.value)
                  }
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <button
                  type="button"
                  data-tl="btn-credit-note-numbering"
                  onClick={() =>
                    tl.setVar("booksCreditNoteNumberingDialogOpen", true)
                  }
                  title="Configure numbering"
                  className="p-2 border border-gray-200 text-gray-500 hover:text-gray-800 rounded-lg cursor-pointer transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reference# */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Reference#
              </label>
              <input
                type="text"
                data-tl="input-credit-note-reference"
                placeholder="Enter reference"
                value={reference}
                onChange={(e) =>
                  tl.setVar("booksCreditNoteReference", e.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Credit Note Date* */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                Credit Note Date*
              </label>
              <div className="relative">
                <input
                  type="text"
                  data-tl="input-credit-note-date"
                  value={date}
                  onChange={(e) =>
                    tl.setVar("booksCreditNoteDate", e.target.value)
                  }
                  className="w-full px-3 py-2 pr-9 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Accounts Receivable */}
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label className="text-gray-600 font-medium">
                  Accounts Receivable
                </label>
                <Info className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <input
                type="text"
                disabled
                value={accountsReceivable}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Salesperson */}
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Salesperson
              </label>
              <select
                data-tl="select-credit-note-salesperson"
                value={salesperson}
                onChange={(e) =>
                  tl.setVar("booksCreditNoteSalesperson", e.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              >
                <option value="None">None</option>
                <option value="Sam Taylor">Sam Taylor</option>
                <option value="Alex Morgan">Alex Morgan</option>
              </select>
            </div>

            {/* Subject */}
            <div className="md:col-span-2">
              <label className="block text-gray-600 font-medium mb-1.5">
                Subject
              </label>
              <textarea
                data-tl="textarea-credit-note-subject"
                rows={2}
                placeholder="Let your customer know what this credit note is for"
                value={subject}
                onChange={(e) =>
                  tl.setVar("booksCreditNoteSubject", e.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Item Details
              </h2>
              <button
                type="button"
                data-tl="btn-credit-note-bulk-items"
                onClick={() =>
                  tl.setVar("booksCreditNoteBulkItemsDialogOpen", true)
                }
                className="text-xs text-[#7014D9] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Add Items in Bulk</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4 w-[34%]">ITEM DETAILS</th>
                    <th className="py-2.5 px-4 w-[18%]">ACCOUNT</th>
                    <th className="py-2.5 px-4 w-[10%] text-center">QUANTITY</th>
                    <th className="py-2.5 px-4 w-[12%] text-right">RATE</th>
                    <th className="py-2.5 px-4 w-[14%]">TAX</th>
                    <th className="py-2.5 px-4 w-[12%] text-right">AMOUNT</th>
                    <th className="py-2.5 px-2 w-[4%] text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {lineItems.map((row, idx) => (
                    <tr
                      key={row.id || idx}
                      data-tl={`credit-note-line-row-${idx}`}
                      className="hover:bg-gray-50/50"
                    >
                      <td className="py-3 px-4">
                        <select
                          data-tl={`input-credit-note-item-${idx}`}
                          value={row.name}
                          onChange={(e) => handleItemChange(idx, e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
                        >
                          <option value="">Select or scan item</option>
                          {INITIAL_ACTIVE_ITEMS.map((it) => (
                            <option key={it.id} value={it.name}>
                              {it.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          data-tl={`select-credit-note-account-${idx}`}
                          value={row.account}
                          onChange={(e) => {
                            const updated = [...lineItems];
                            updated[idx].account = e.target.value;
                            tl.setVar("booksCreditNoteLineItems", updated);
                          }}
                          className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded text-xs text-gray-700 focus:outline-none focus:border-[#7014D9]"
                        >
                          <option value="Sales">Sales</option>
                          <option value="Discount">Discount</option>
                          <option value="Goods Returned">Goods Returned</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="text"
                          data-tl={`input-credit-note-qty-${idx}`}
                          value={row.quantity}
                          onChange={(e) => handleQtyChange(idx, e.target.value)}
                          className="w-16 px-2 py-1.5 text-center bg-white border border-gray-200 rounded text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <input
                          type="text"
                          data-tl={`input-credit-note-rate-${idx}`}
                          value={row.rate.toFixed(2)}
                          onChange={(e) => handleRateChange(idx, e.target.value)}
                          className="w-20 px-2 py-1.5 text-right bg-white border border-gray-200 rounded text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          data-tl={`select-credit-note-tax-${idx}`}
                          value={row.tax}
                          onChange={(e) => {
                            const updated = [...lineItems];
                            updated[idx].tax = e.target.value;
                            tl.setVar("booksCreditNoteLineItems", updated);
                          }}
                          className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded text-xs text-gray-700 focus:outline-none focus:border-[#7014D9]"
                        >
                          <option value="VAT Standard (20%)">VAT Standard (20%)</option>
                          <option value="No Tax">No Tax</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">
                        <span data-tl={`text-credit-note-amount-${idx}`}>
                          £{row.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          type="button"
                          data-tl={`btn-delete-credit-note-row-${idx}`}
                          onClick={() => handleDeleteRow(idx)}
                          className="p-1 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              data-tl="btn-credit-note-add-row"
              onClick={handleAddRow}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer pt-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add New Row</span>
            </button>
          </div>

          {/* Totals Block */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="w-80 space-y-3 text-xs">
              <div className="flex items-center justify-between text-gray-600">
                <span>Sub Total</span>
                <span
                  data-tl="credit-note-sub-total"
                  className="font-semibold text-gray-900"
                >
                  £{subTotal.toFixed(2)}
                </span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1">
                  <span>Discount</span>
                  <input
                    type="text"
                    data-tl="input-credit-note-discount"
                    value={discountPercent}
                    onChange={(e) =>
                      tl.setVar(
                        "booksCreditNoteDiscount",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-12 px-1.5 py-0.5 text-center bg-gray-50 border border-gray-200 rounded text-xs"
                  />
                  <span>%</span>
                </span>
                <span className="text-gray-900">
                  -£{discountAmount.toFixed(2)}
                </span>
              </div>

              {/* Tax */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Tax</span>
                <span
                  data-tl="credit-note-tax"
                  className="font-medium text-gray-900"
                >
                  £{taxAmount.toFixed(2)}
                </span>
              </div>

              {/* Shipping Charges */}
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-1">
                  <span>Shipping Charges</span>
                  <button
                    type="button"
                    data-tl="btn-configure-shipping-account"
                    className="text-[10px] text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Configure Account
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span>£</span>
                  <input
                    type="text"
                    data-tl="input-credit-note-shipping"
                    value={shippingCharges}
                    onChange={(e) =>
                      tl.setVar(
                        "booksCreditNoteShipping",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-16 px-1.5 py-0.5 text-right bg-white border border-gray-200 rounded text-xs"
                  />
                </div>
              </div>

              {/* Adjustment */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Adjustment</span>
                <div className="flex items-center gap-1">
                  <span>£</span>
                  <input
                    type="text"
                    data-tl="input-credit-note-adjustment"
                    value={adjustment}
                    onChange={(e) =>
                      tl.setVar(
                        "booksCreditNoteAdjustment",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-16 px-1.5 py-0.5 text-right bg-white border border-gray-200 rounded text-xs"
                  />
                </div>
              </div>

              {/* Total (GBP) */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-900 text-sm">
                  Total ( GBP )
                </span>
                <span
                  data-tl="credit-note-total-amount"
                  className="font-bold text-[#2563EB] text-lg"
                >
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Notes & Terms */}
          <div className="space-y-4 pt-4 border-t border-gray-100 text-xs">
            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Customer Notes
              </label>
              <textarea
                data-tl="textarea-credit-note-customer-notes"
                rows={2}
                placeholder="Thanks for your business."
                value={customerNotes}
                onChange={(e) =>
                  tl.setVar("booksCreditNoteCustomerNotes", e.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1.5">
                Terms &amp; Conditions
              </label>
              <textarea
                data-tl="textarea-credit-note-terms"
                rows={3}
                placeholder="Enter credit note terms and conditions"
                value={terms}
                onChange={(e) =>
                  tl.setVar("booksCreditNoteTerms", e.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <p
              data-tl="text-credit-note-additional-fields"
              className="text-[11px] text-[#2563EB] pt-1"
            >
              Additional Fields: You can add more fields from Settings &gt; Preferences &gt; Credit Notes.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-cancel-new-credit-note"
                onClick={handleBack}
                className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-save-credit-note-draft"
                onClick={() => handleSave("Draft")}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                data-tl="btn-save-credit-note-open"
                onClick={() => handleSave("Open")}
                className="px-5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
              >
                Save as Open
              </button>
            </div>

            <button
              type="button"
              data-tl="btn-credit-note-template"
              className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              PDF Template: <span className="font-semibold text-gray-900">&apos;Standard Template&apos;</span> <span className="text-[#2563EB] underline">Change</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
