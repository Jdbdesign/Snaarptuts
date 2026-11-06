"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type ReceiptLineItem,
  type SalesReceiptItem,
  INITIAL_RECEIPTS,
  INITIAL_ACTIVE_ITEMS,
} from "./books-data";
import {
  Calendar,
  Settings,
  ChevronDown,
  Plus,
  Trash2,
  Paperclip,
  Barcode,
  Layers,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksNewReceiptView({ tl }: Props) {
  const customer = useTimelineVar<string>(tl, "booksReceiptCustomer", "");
  const customerDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptCustomerDropdownOpen",
    false
  );
  const date = useTimelineVar<string>(tl, "booksReceiptDate", "11/05/2026");
  const datePickerOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptDatePickerOpen",
    false
  );
  const receiptNumber = useTimelineVar<string>(
    tl,
    "booksReceiptNumber",
    "SR-00003"
  );
  const salesperson = useTimelineVar<string>(
    tl,
    "booksReceiptSalesperson",
    "None"
  );
  const salespersonDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptSalespersonDropdownOpen",
    false
  );

  const rawLineItems = useTimelineVar<ReceiptLineItem[]>(
    tl,
    "booksReceiptLineItems",
    []
  );
  // Ensure there's always at least one row with id row-0
  const lineItems: ReceiptLineItem[] =
    rawLineItems.length > 0
      ? rawLineItems
      : [
          {
            id: "row-0",
            name: "",
            quantity: 1,
            rate: 0,
            tax: "VAT Standard (20%)",
            amount: 0,
          },
        ];

  const [activeItemMenuIdx, setActiveItemMenuIdx] = useState<number | null>(null);

  const discount = useTimelineVar<number>(tl, "booksReceiptDiscount", 0);
  const shipping = useTimelineVar<number>(tl, "booksReceiptShipping", 0);
  const adjustment = useTimelineVar<number>(tl, "booksReceiptAdjustment", 0);
  const customerNotes = useTimelineVar<string>(
    tl,
    "booksReceiptCustomerNotes",
    ""
  );
  const terms = useTimelineVar<string>(tl, "booksReceiptTerms", "");
  const files = useTimelineVar<string[]>(tl, "booksReceiptFiles", []);

  const paymentMode = useTimelineVar<string>(
    tl,
    "booksReceiptPaymentMode",
    "Bank Transfer"
  );
  const paymentModeDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptPaymentModeDropdownOpen",
    false
  );
  const depositTo = useTimelineVar<string>(
    tl,
    "booksReceiptDepositTo",
    "Bank Account"
  );
  const depositToDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptDepositToDropdownOpen",
    false
  );
  const reference = useTimelineVar<string>(tl, "booksReceiptReference", "");

  const subTotal = lineItems.reduce((acc, it) => acc + (it.amount || 0), 0);
  const discountVal = discount > 0 ? (subTotal * discount) / 100 : 0;
  const taxableSubTotal = Math.max(0, subTotal - discountVal);
  const taxVal = taxableSubTotal * 0.2;
  const total = Math.max(0, taxableSubTotal + taxVal + shipping + adjustment);

  const handleSelectItem = (idx: number, item: (typeof INITIAL_ACTIVE_ITEMS)[0]) => {
    const updated = [...lineItems];
    const qty = updated[idx]?.quantity || 1;
    const rate = item.rate;
    updated[idx] = {
      id: updated[idx]?.id || `row-${idx}`,
      name: item.name,
      description: item.description,
      quantity: qty,
      rate: rate,
      tax: "VAT Standard (20%)",
      amount: qty * rate,
    };
    tl.setVar("booksReceiptLineItems", updated);
    setActiveItemMenuIdx(null);
  };

  const handleQtyChange = (idx: number, qty: number) => {
    const updated = [...lineItems];
    if (updated[idx]) {
      const q = Math.max(1, qty);
      updated[idx] = {
        ...updated[idx],
        quantity: q,
        amount: q * updated[idx].rate,
      };
      tl.setVar("booksReceiptLineItems", updated);
    }
  };

  const handleRateChange = (idx: number, rate: number) => {
    const updated = [...lineItems];
    if (updated[idx]) {
      const r = Math.max(0, rate);
      updated[idx] = {
        ...updated[idx],
        rate: r,
        amount: updated[idx].quantity * r,
      };
      tl.setVar("booksReceiptLineItems", updated);
    }
  };

  const handleAddRow = () => {
    const nextIdx = lineItems.length;
    tl.setVar("booksReceiptLineItems", [
      ...lineItems,
      {
        id: `row-${nextIdx}`,
        name: "",
        quantity: 1,
        rate: 0,
        tax: "VAT Standard (20%)",
        amount: 0,
      },
    ]);
  };

  const handleRemoveRow = (idx: number) => {
    if (lineItems.length <= 1) return;
    const updated = lineItems.filter((_, i) => i !== idx);
    tl.setVar("booksReceiptLineItems", updated);
  };

  const handleSave = (status: "Paid" | "Sent" = "Paid") => {
    const newRec: SalesReceiptItem = {
      id: `rec-${receiptNumber.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
      receiptNumber: receiptNumber || "SR-00003",
      customerName: customer || "Acme Foods Ltd",
      date: date || "11/05/2026",
      receiptDate: date || "11/05/2026",
      amount: total || 120.0,
      paymentMode: (paymentMode as SalesReceiptItem["paymentMode"]) || "Bank Transfer",
      depositTo: (depositTo as SalesReceiptItem["depositTo"]) || "Bank Account",
      reference: reference || "",
      salesperson: salesperson !== "None" ? salesperson : undefined,
      lineItems: lineItems.filter((it) => it.name.trim().length > 0),
      discount: discountVal,
      shipping,
      adjustment,
      customerNotes,
      terms,
      files,
      status,
    };

    const currentReceipts = tl.getVar<SalesReceiptItem[]>(
      "booksReceipts",
      INITIAL_RECEIPTS
    );
    tl.setVar("booksReceipts", [newRec, ...currentReceipts]);
    tl.setVar("booksActiveReceipt", newRec);
    tl.setVar("booksView", "receipt-detail");
    tl.setUrl(BOOKS_URLS.receiptDetails);

    if (status === "Sent") {
      tl.setVar("booksToastText", "Sales receipt sent successfully");
    } else {
      tl.setVar("booksToastText", "Sales receipt saved");
    }
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="books-new-receipt-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            New Sales Receipt
          </h1>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          {/* Top Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Customer Picker */}
            <div className="space-y-1.5 relative">
              <label className="font-semibold text-gray-700 block">
                Customer Name <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-receipt-customer"
                onClick={() =>
                  tl.setVar(
                    "booksReceiptCustomerDropdownOpen",
                    !customerDropdownOpen
                  )
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span
                  className={
                    customer ? "text-gray-900 font-medium" : "text-gray-400"
                  }
                >
                  {customer || "Type the customer's name"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {customerDropdownOpen && (
                <div
                  data-tl="menu-receipt-customers"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 max-h-48 overflow-y-auto"
                >
                  <button
                    type="button"
                    data-tl="customer-opt-sterling"
                    onClick={() => {
                      tl.setVar("booksReceiptCustomer", "Sterling Interiors");
                      tl.setVar("booksReceiptCustomerDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Sterling Interiors
                  </button>
                  <button
                    type="button"
                    data-tl="customer-opt-acme"
                    onClick={() => {
                      tl.setVar("booksReceiptCustomer", "Acme Foods Ltd");
                      tl.setVar("booksReceiptCustomerDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Acme Foods Ltd
                  </button>
                  <button
                    type="button"
                    data-tl="customer-opt-harvest"
                    onClick={() => {
                      tl.setVar("booksReceiptCustomer", "Harvest Tables Ltd");
                      tl.setVar("booksReceiptCustomerDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Harvest Tables Ltd
                  </button>
                  <button
                    type="button"
                    data-tl="customer-opt-brightway"
                    onClick={() => {
                      tl.setVar("booksReceiptCustomer", "Brightway Stores");
                      tl.setVar("booksReceiptCustomerDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Brightway Stores
                  </button>
                </div>
              )}
            </div>

            {/* Receipt Number with Gear */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 block">
                Sales Receipt# <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={receiptNumber}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 font-medium focus:outline-none"
                />
                <button
                  type="button"
                  data-tl="btn-receipt-numbering-settings"
                  onClick={() =>
                    tl.setVar("booksReceiptNumberingDialogOpen", true)
                  }
                  className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Configure Receipt Numbering"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-1.5 relative">
              <label className="font-semibold text-gray-700 block">
                Sales Receipt Date <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="btn-receipt-date-picker"
                onClick={() =>
                  tl.setVar("booksReceiptDatePickerOpen", !datePickerOpen)
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-gray-900 font-medium">{date}</span>
                <Calendar className="w-4 h-4 text-gray-400" />
              </button>

              {datePickerOpen && (
                <div
                  data-tl="popover-receipt-date"
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-30 w-64 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-gray-800 pb-1 border-b border-gray-100">
                    <span>November 2026</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center py-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <span key={d} className="text-[10px] text-gray-400 font-bold">
                        {d}
                      </span>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <button
                        key={num}
                        type="button"
                        data-tl={num === 5 ? "cal-day-5" : `cal-day-${num}`}
                        onClick={() => {
                          tl.setVar("booksReceiptDate", "11/05/2026");
                          tl.setVar("booksReceiptDatePickerOpen", false);
                        }}
                        className={`p-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                          num === 5
                            ? "bg-[#7014D9] text-white font-bold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    data-tl="date-opt-today"
                    onClick={() => {
                      tl.setVar("booksReceiptDate", "11/05/2026");
                      tl.setVar("booksReceiptDatePickerOpen", false);
                    }}
                    className="w-full text-center py-1 bg-purple-50 text-[#7014D9] rounded-md font-semibold cursor-pointer hover:bg-purple-100"
                  >
                    Today (11/05/2026)
                  </button>
                </div>
              )}
            </div>

            {/* Salesperson */}
            <div className="space-y-1.5 relative">
              <label className="font-semibold text-gray-700 block">
                Salesperson
              </label>
              <button
                type="button"
                data-tl="select-receipt-salesperson"
                onClick={() =>
                  tl.setVar(
                    "booksReceiptSalespersonDropdownOpen",
                    !salespersonDropdownOpen
                  )
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-gray-900 font-medium">
                  {salesperson || "None"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {salespersonDropdownOpen && (
                <div
                  data-tl="menu-receipt-salesperson"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  <button
                    type="button"
                    data-tl="salesperson-opt-sam"
                    onClick={() => {
                      tl.setVar("booksReceiptSalesperson", "Sam Taylor");
                      tl.setVar("booksReceiptSalespersonDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Sam Taylor
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      tl.setVar("booksReceiptSalesperson", "None");
                      tl.setVar("booksReceiptSalespersonDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    None
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-gray-200 rounded-xl overflow-visible">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4 w-1/3">Item Details</th>
                  <th className="py-2.5 px-3 text-right w-20">Quantity</th>
                  <th className="py-2.5 px-3 text-right w-24">Rate (£)</th>
                  <th className="py-2.5 px-3 text-left w-36">Tax</th>
                  <th className="py-2.5 px-3 text-right w-24">Amount (£)</th>
                  <th className="py-2.5 px-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lineItems.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    data-tl={`row-receipt-item-${idx}`}
                    className="group hover:bg-gray-50/50"
                  >
                    {/* Item Select Input & Dropdown */}
                    <td className="py-2 px-4 relative">
                      <input
                        type="text"
                        data-tl={idx === 0 ? "input-item-select-0" : `input-item-select-${idx}`}
                        placeholder="Click to select an item"
                        value={row.name}
                        onClick={() =>
                          setActiveItemMenuIdx(
                            activeItemMenuIdx === idx ? null : idx
                          )
                        }
                        readOnly
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 cursor-pointer hover:border-purple-300 focus:outline-none focus:border-[#7014D9]"
                      />

                      {activeItemMenuIdx === idx && (
                        <div
                          data-tl={`menu-item-select-${idx}`}
                          className="absolute top-full left-4 w-72 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-40 max-h-52 overflow-y-auto"
                        >
                          <button
                            type="button"
                            data-tl="item-opt-rice"
                            onClick={() =>
                              handleSelectItem(idx, INITIAL_ACTIVE_ITEMS[0])
                            }
                            className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs border-b border-gray-50 cursor-pointer"
                          >
                            <span className="font-semibold text-gray-900 block">
                              Organic Rice 25kg
                            </span>
                            <span className="text-gray-500 text-[11px]">
                              Rate: £20.00
                            </span>
                          </button>
                          <button
                            type="button"
                            data-tl="item-opt-oil"
                            onClick={() =>
                              handleSelectItem(idx, INITIAL_ACTIVE_ITEMS[1])
                            }
                            className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs border-b border-gray-50 cursor-pointer"
                          >
                            <span className="font-semibold text-gray-900 block">
                              Palm Oil 5L
                            </span>
                            <span className="text-gray-500 text-[11px]">
                              Rate: £15.00
                            </span>
                          </button>
                          <button
                            type="button"
                            data-tl="item-opt-flour"
                            onClick={() =>
                              handleSelectItem(idx, INITIAL_ACTIVE_ITEMS[2])
                            }
                            className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs border-b border-gray-50 cursor-pointer"
                          >
                            <span className="font-semibold text-gray-900 block">
                              Cassava Flour 10kg
                            </span>
                            <span className="text-gray-500 text-[11px]">
                              Rate: £12.00
                            </span>
                          </button>
                          <button
                            type="button"
                            data-tl="item-opt-delivery"
                            onClick={() =>
                              handleSelectItem(idx, INITIAL_ACTIVE_ITEMS[3])
                            }
                            className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs border-b border-gray-50 cursor-pointer"
                          >
                            <span className="font-semibold text-gray-900 block">
                              Delivery Fee
                            </span>
                            <span className="text-gray-500 text-[11px]">
                              Rate: £10.00
                            </span>
                          </button>
                          <button
                            type="button"
                            data-tl="item-opt-tote"
                            onClick={() =>
                              handleSelectItem(idx, INITIAL_ACTIVE_ITEMS[4])
                            }
                            className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs cursor-pointer"
                          >
                            <span className="font-semibold text-gray-900 block">
                              Reusable Tote Bag
                            </span>
                            <span className="text-gray-500 text-[11px]">
                              Rate: £5.00
                            </span>
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Qty */}
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        data-tl={idx === 0 ? "input-item-qty-0" : `input-item-qty-${idx}`}
                        value={row.quantity}
                        onChange={(e) =>
                          handleQtyChange(idx, Number(e.target.value))
                        }
                        className="w-16 px-2 py-1.5 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                      />
                    </td>

                    {/* Rate */}
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        data-tl={`input-item-rate-${idx}`}
                        value={row.rate}
                        onChange={(e) =>
                          handleRateChange(idx, Number(e.target.value))
                        }
                        className="w-20 px-2 py-1.5 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                      />
                    </td>

                    {/* Tax */}
                    <td className="py-2 px-3">
                      <span
                        data-tl={`select-item-tax-${idx}`}
                        className="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 block truncate"
                      >
                        {row.tax || "VAT Standard (20%)"}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-2 px-3 text-right font-semibold text-gray-900">
                      <span data-tl={`text-item-amount-${idx}`}>
                        £{(row.amount || row.quantity * row.rate).toFixed(2)}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-2 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(idx)}
                        className="text-gray-400 hover:text-rose-500 p-1 rounded transition-colors cursor-pointer"
                        title="Remove row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table Footer Actions */}
            <div className="p-3 bg-gray-50/50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                data-tl="btn-add-line-item"
                onClick={handleAddRow}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:text-[#5E10B7] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add another line</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-tl="btn-receipt-scan-item"
                  onClick={() => tl.setVar("booksReceiptScanDialogOpen", true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
                >
                  <Barcode className="w-3.5 h-3.5 text-gray-500" />
                  <span>Scan Item</span>
                </button>

                <button
                  type="button"
                  data-tl="btn-receipt-bulk-actions"
                  onClick={() =>
                    tl.setVar("booksReceiptBulkItemsDialogOpen", true)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-gray-500" />
                  <span>Bulk Actions</span>
                </button>
              </div>
            </div>
          </div>

          {/* Totals & Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Notes & Terms */}
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Customer Notes
                </label>
                <textarea
                  data-tl="textarea-receipt-notes"
                  rows={2}
                  value={customerNotes}
                  onChange={(e) =>
                    tl.setVar("booksReceiptCustomerNotes", e.target.value)
                  }
                  placeholder="Thank you for your business..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              {/* Attach File */}
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Attach File(s)
                </label>
                <button
                  type="button"
                  data-tl="btn-receipt-attach-file"
                  onClick={() =>
                    tl.setVar("booksReceiptFilePickerOpen", true)
                  }
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-dashed border-gray-300 hover:border-[#7014D9] rounded-lg text-xs text-gray-600 hover:text-[#7014D9] transition-colors cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
                {files.map((file, i) => (
                  <div
                    key={file}
                    data-tl={`attached-file-${i}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-[#7014D9] border border-purple-200 rounded-lg text-xs font-medium mr-2"
                  >
                    <span>{file}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Terms & Conditions
                </label>
                <textarea
                  data-tl="textarea-receipt-terms"
                  rows={2}
                  value={terms}
                  onChange={(e) =>
                    tl.setVar("booksReceiptTerms", e.target.value)
                  }
                  placeholder="Enter terms and conditions..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>
            </div>

            {/* Totals Summary */}
            <div className="bg-gray-50/70 p-5 rounded-xl border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total</span>
                <span
                  data-tl="text-receipt-subtotal"
                  className="font-semibold text-gray-900"
                >
                  £{subTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">Discount (%)</span>
                <input
                  type="number"
                  data-tl="input-receipt-discount"
                  value={discount || ""}
                  placeholder="0"
                  onChange={(e) =>
                    tl.setVar("booksReceiptDiscount", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">Shipping Charges (£)</span>
                <input
                  type="number"
                  data-tl="input-receipt-shipping"
                  value={shipping || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    tl.setVar("booksReceiptShipping", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">Adjustment (£)</span>
                <input
                  type="number"
                  data-tl="input-receipt-adjustment"
                  value={adjustment || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    tl.setVar("booksReceiptAdjustment", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex justify-between text-gray-600">
                <span>VAT (20%)</span>
                <span
                  data-tl="text-receipt-tax"
                  className="font-semibold text-gray-900"
                >
                  £{taxVal.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total (£)</span>
                <span
                  data-tl="text-receipt-total"
                  className="text-[#7014D9]"
                >
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="border-t border-gray-100 pt-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-900">Payment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Payment Mode */}
              <div className="space-y-1.5 relative">
                <label className="font-semibold text-gray-700 block">
                  Payment Mode <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  data-tl="select-receipt-payment-mode"
                  onClick={() =>
                    tl.setVar(
                      "booksReceiptPaymentModeDropdownOpen",
                      !paymentModeDropdownOpen
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-gray-900 font-medium">
                    {paymentMode}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {paymentModeDropdownOpen && (
                  <div
                    data-tl="menu-receipt-payment-mode"
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                  >
                    <button
                      type="button"
                      data-tl="payment-mode-opt-bank-transfer"
                      onClick={() => {
                        tl.setVar("booksReceiptPaymentMode", "Bank Transfer");
                        tl.setVar("booksReceiptPaymentModeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      Bank Transfer
                    </button>
                    <button
                      type="button"
                      data-tl="payment-mode-opt-cash"
                      onClick={() => {
                        tl.setVar("booksReceiptPaymentMode", "Cash");
                        tl.setVar("booksReceiptPaymentModeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      Cash
                    </button>
                    <button
                      type="button"
                      data-tl="payment-mode-opt-credit-card"
                      onClick={() => {
                        tl.setVar("booksReceiptPaymentMode", "Credit Card");
                        tl.setVar("booksReceiptPaymentModeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      data-tl="payment-mode-opt-cheque"
                      onClick={() => {
                        tl.setVar("booksReceiptPaymentMode", "Cheque");
                        tl.setVar("booksReceiptPaymentModeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      Cheque
                    </button>
                  </div>
                )}
              </div>

              {/* Deposit To */}
              <div className="space-y-1.5 relative">
                <label className="font-semibold text-gray-700 block">
                  Deposit To <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  data-tl="select-receipt-deposit-to"
                  onClick={() =>
                    tl.setVar(
                      "booksReceiptDepositToDropdownOpen",
                      !depositToDropdownOpen
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-gray-900 font-medium">{depositTo}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {depositToDropdownOpen && (
                  <div
                    data-tl="menu-receipt-deposit-to"
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                  >
                    <button
                      type="button"
                      data-tl="deposit-opt-bank-account"
                      onClick={() => {
                        tl.setVar("booksReceiptDepositTo", "Bank Account");
                        tl.setVar("booksReceiptDepositToDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      Bank Account
                    </button>
                    <button
                      type="button"
                      data-tl="deposit-opt-petty-cash"
                      onClick={() => {
                        tl.setVar("booksReceiptDepositTo", "Petty Cash");
                        tl.setVar("booksReceiptDepositToDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      Petty Cash
                    </button>
                    <button
                      type="button"
                      data-tl="deposit-opt-undeposited-funds"
                      onClick={() => {
                        tl.setVar("booksReceiptDepositTo", "Undeposited Funds");
                        tl.setVar("booksReceiptDepositToDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                    >
                      Undeposited Funds
                    </button>
                  </div>
                )}
              </div>

              {/* Reference */}
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Reference#
                </label>
                <input
                  type="text"
                  data-tl="input-receipt-reference"
                  value={reference}
                  onChange={(e) =>
                    tl.setVar("booksReceiptReference", e.target.value)
                  }
                  placeholder="e.g. BT-5521"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-receipt"
            onClick={() => {
              tl.setVar("booksView", "receipts");
              tl.setUrl(BOOKS_URLS.salesReceipts);
            }}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-save-and-send-receipt"
            onClick={() => handleSave("Sent")}
            className="px-4 py-2 bg-white border border-[#7014D9] text-[#7014D9] hover:bg-purple-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Save and Send
          </button>

          <button
            type="button"
            data-tl="btn-save-receipt"
            onClick={() => handleSave("Paid")}
            className="px-5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
