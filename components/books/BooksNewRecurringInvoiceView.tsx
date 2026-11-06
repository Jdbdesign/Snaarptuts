"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type RecurringLineItem,
  type RecurringInvoiceItem,
  INITIAL_RECURRING_INVOICES,
  INITIAL_ACTIVE_ITEMS,
} from "./books-data";
import {
  Calendar,
  Settings,
  ChevronDown,
  Plus,
  Trash2,
  Layers,
  X,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksNewRecurringInvoiceView({ tl }: Props) {
  const customer = useTimelineVar<string>(tl, "booksRecurringCustomer", "");
  const customerDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringCustomerDropdownOpen",
    false
  );
  const profileName = useTimelineVar<string>(
    tl,
    "booksRecurringProfileName",
    ""
  );
  const orderNumber = useTimelineVar<string>(
    tl,
    "booksRecurringOrderNumber",
    ""
  );

  const frequency = useTimelineVar<string>(
    tl,
    "booksRecurringFrequency",
    "Month"
  );
  const frequencyDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringFrequencyDropdownOpen",
    false
  );

  const startDate = useTimelineVar<string>(
    tl,
    "booksRecurringStartDate",
    "11/05/2026"
  );
  const startDatePickerOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringStartDatePickerOpen",
    false
  );
  const neverExpires = useTimelineVar<boolean>(
    tl,
    "booksRecurringNeverExpires",
    true
  );
  const endDate = useTimelineVar<string>(
    tl,
    "booksRecurringEndDate",
    "11/05/2027"
  );
  const endDatePickerOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringEndDatePickerOpen",
    false
  );

  const paymentTerms = useTimelineVar<string>(
    tl,
    "booksRecurringTerms",
    "Net 15"
  );
  const termsDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringTermsDropdownOpen",
    false
  );
  const accountsReceivable = useTimelineVar<string>(
    tl,
    "booksRecurringAR",
    "Accounts Receivable"
  );
  const salesperson = useTimelineVar<string>(
    tl,
    "booksRecurringSalesperson",
    "None"
  );
  const salespersonDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringSalespersonDropdownOpen",
    false
  );
  const subject = useTimelineVar<string>(tl, "booksRecurringSubject", "");

  const rawLineItems = useTimelineVar<RecurringLineItem[]>(
    tl,
    "booksRecurringLineItems",
    []
  );
  const lineItems: RecurringLineItem[] =
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

  const discount = useTimelineVar<number>(tl, "booksRecurringDiscount", 0);
  const shipping = useTimelineVar<number>(tl, "booksRecurringShipping", 0);
  const adjustment = useTimelineVar<number>(tl, "booksRecurringAdjustment", 0);
  const roundOff = useTimelineVar<number>(tl, "booksRecurringRoundOff", 0);

  const customerNotes = useTimelineVar<string>(
    tl,
    "booksRecurringCustomerNotes",
    ""
  );
  const termsText = useTimelineVar<string>(tl, "booksRecurringTermsText", "");

  const preferences = useTimelineVar<string>(
    tl,
    "booksRecurringPreferences",
    "Create Invoices as Drafts"
  );

  const subTotal = lineItems.reduce((acc, it) => acc + (it.amount || 0), 0);
  const discountVal = discount > 0 ? (subTotal * discount) / 100 : 0;
  const taxableSubTotal = Math.max(0, subTotal - discountVal);
  const taxVal = taxableSubTotal * 0.2;
  const total = Math.max(
    0,
    taxableSubTotal + taxVal + shipping + adjustment + roundOff
  );

  const handleSelectItem = (
    idx: number,
    item: { name: string; description?: string; rate: number }
  ) => {
    const updated = [...lineItems];
    const qty = updated[idx]?.quantity || 1;
    const rate = item.rate;
    updated[idx] = {
      id: updated[idx]?.id || `row-${idx}`,
      name: item.name,
      description: item.description || "",
      quantity: qty,
      rate: rate,
      tax: "VAT Standard (20%)",
      amount: qty * rate,
    };
    tl.setVar("booksRecurringLineItems", updated);
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
      tl.setVar("booksRecurringLineItems", updated);
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
      tl.setVar("booksRecurringLineItems", updated);
    }
  };

  const handleAddRow = () => {
    const nextIdx = lineItems.length;
    tl.setVar("booksRecurringLineItems", [
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
    tl.setVar("booksRecurringLineItems", updated);
  };

  const handleSave = () => {
    const newProfile: RecurringInvoiceItem = {
      id: `rec-${Date.now()}`,
      profileName: profileName || "Weekly Produce Box",
      customerName: customer || "Harvest Tables Ltd",
      frequency: (frequency as RecurringInvoiceItem["frequency"]) || "Month",
      startDate: startDate || "11/05/2026",
      neverExpires,
      endDate: neverExpires ? undefined : endDate || "11/05/2027",
      orderNumber: orderNumber || undefined,
      paymentTerms: paymentTerms || "Net 15",
      accountsReceivable: accountsReceivable || "Accounts Receivable",
      salesperson: salesperson !== "None" ? salesperson : undefined,
      subject: subject || undefined,
      amount: total || 800.0,
      status: "Active",
      preferences: (preferences as RecurringInvoiceItem["preferences"]) || "Create Invoices as Drafts",
      lineItems: lineItems.filter((it) => it.name.trim().length > 0),
      discount: discountVal,
      shipping,
      adjustment,
      roundOff,
      customerNotes,
      termsText,
    };

    const currentProfiles = tl.getVar<RecurringInvoiceItem[]>(
      "booksRecurringInvoices",
      INITIAL_RECURRING_INVOICES
    );
    tl.setVar("booksRecurringInvoices", [newProfile, ...currentProfiles]);
    tl.setVar("booksActiveRecurring", newProfile);
    tl.setVar("booksRecurringEmpty", false);
    tl.setVar("booksView", "recurring-detail");
    tl.setUrl(BOOKS_URLS.recurringDetails);
    tl.setVar("booksToastText", "Recurring invoice created successfully");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="books-new-recurring-invoice-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-breadcrumb-back"
            onClick={() => {
              tl.setVar("booksView", "recurring");
              tl.setUrl(BOOKS_URLS.recurringInvoices);
            }}
            className="hover:text-gray-900 cursor-pointer font-medium"
          >
            ← Back
          </button>
          <span>|</span>
          <button
            type="button"
            data-tl="breadcrumb-home"
            onClick={() => {
              tl.setVar("booksView", "home");
              tl.setUrl(BOOKS_URLS.dashboard);
            }}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Home
          </button>
          <span>&gt;</span>
          <button
            type="button"
            data-tl="breadcrumb-recurring"
            onClick={() => {
              tl.setVar("booksView", "recurring");
              tl.setUrl(BOOKS_URLS.recurringInvoices);
            }}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Recurring Invoices
          </button>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">New</span>
        </div>

        {/* Title & Close */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            New Recurring Invoice
          </h1>
          <button
            type="button"
            data-tl="btn-close-new-recurring"
            onClick={() => {
              tl.setVar("booksView", "recurring");
              tl.setUrl(BOOKS_URLS.recurringInvoices);
            }}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
                data-tl="select-recurring-customer"
                onClick={() =>
                  tl.setVar(
                    "booksRecurringCustomerDropdownOpen",
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
                  {customer || "Select a customer"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {customerDropdownOpen && (
                <div
                  data-tl="menu-recurring-customers"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 max-h-48 overflow-y-auto"
                >
                  <button
                    type="button"
                    data-tl="customer-opt-harvest"
                    onClick={() => {
                      tl.setVar("booksRecurringCustomer", "Harvest Tables Ltd");
                      tl.setVar("booksRecurringCustomerDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Harvest Tables Ltd
                  </button>
                  <button
                    type="button"
                    data-tl="customer-opt-acme"
                    onClick={() => {
                      tl.setVar("booksRecurringCustomer", "Acme Foods Ltd");
                      tl.setVar("booksRecurringCustomerDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Acme Foods Ltd
                  </button>
                  <button
                    type="button"
                    data-tl="customer-opt-brightway"
                    onClick={() => {
                      tl.setVar("booksRecurringCustomer", "Brightway Stores");
                      tl.setVar("booksRecurringCustomerDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Brightway Stores
                  </button>
                </div>
              )}
            </div>

            {/* Profile Name */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 block">
                Profile Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-recurring-profile-name"
                value={profileName}
                onChange={(e) =>
                  tl.setVar("booksRecurringProfileName", e.target.value)
                }
                placeholder="e.g. Weekly Produce Box"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Order Number */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 block">
                Order Number
              </label>
              <input
                type="text"
                data-tl="input-recurring-order-number"
                value={orderNumber}
                onChange={(e) =>
                  tl.setVar("booksRecurringOrderNumber", e.target.value)
                }
                placeholder="e.g. PO-3041"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Repeat Every (Frequency) */}
            <div className="space-y-1.5 relative">
              <label className="font-semibold text-gray-700 block">
                Repeat Every <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-recurring-frequency"
                onClick={() =>
                  tl.setVar(
                    "booksRecurringFrequencyDropdownOpen",
                    !frequencyDropdownOpen
                  )
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-gray-900 font-medium">{frequency}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {frequencyDropdownOpen && (
                <div
                  data-tl="menu-recurring-frequency"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  <button
                    type="button"
                    data-tl="freq-opt-week"
                    onClick={() => {
                      tl.setVar("booksRecurringFrequency", "Week");
                      tl.setVar("booksRecurringFrequencyDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    data-tl="freq-opt-month"
                    onClick={() => {
                      tl.setVar("booksRecurringFrequency", "Month");
                      tl.setVar("booksRecurringFrequencyDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Month
                  </button>
                  <button
                    type="button"
                    data-tl="freq-opt-year"
                    onClick={() => {
                      tl.setVar("booksRecurringFrequency", "Year");
                      tl.setVar("booksRecurringFrequencyDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Year
                  </button>
                </div>
              )}
            </div>

            {/* Start Date */}
            <div className="space-y-1.5 relative">
              <label className="font-semibold text-gray-700 block">
                Start On <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="btn-recurring-start-date"
                onClick={() =>
                  tl.setVar(
                    "booksRecurringStartDatePickerOpen",
                    !startDatePickerOpen
                  )
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-gray-900 font-medium">{startDate}</span>
                <Calendar className="w-4 h-4 text-gray-400" />
              </button>

              {startDatePickerOpen && (
                <div
                  data-tl="popover-recurring-start-date"
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-30 w-64 space-y-2 text-xs"
                >
                  <span className="font-semibold text-gray-800 block pb-1 border-b">
                    November 2026
                  </span>
                  <div className="grid grid-cols-7 gap-1 text-center py-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <button
                        key={num}
                        type="button"
                        data-tl={num === 5 ? "cal-day-5" : `cal-day-${num}`}
                        onClick={() => {
                          tl.setVar("booksRecurringStartDate", "11/05/2026");
                          tl.setVar(
                            "booksRecurringStartDatePickerOpen",
                            false
                          );
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
                </div>
              )}
            </div>

            {/* Ends On & Never Expires */}
            <div className="space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700 block">
                  Ends On
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    data-tl="checkbox-recurring-never-expires"
                    checked={neverExpires}
                    onChange={(e) =>
                      tl.setVar(
                        "booksRecurringNeverExpires",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-[#7014D9] rounded border-gray-300 focus:ring-[#7014D9]"
                  />
                  <span className="text-xs text-gray-600 font-medium">
                    Never Expires
                  </span>
                </label>
              </div>

              {!neverExpires ? (
                <button
                  type="button"
                  data-tl="btn-recurring-end-date"
                  onClick={() =>
                    tl.setVar(
                      "booksRecurringEndDatePickerOpen",
                      !endDatePickerOpen
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-gray-900 font-medium">{endDate}</span>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </button>
              ) : (
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400">
                  Runs indefinitely until stopped
                </div>
              )}

              {endDatePickerOpen && (
                <div
                  data-tl="popover-recurring-end-date"
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-30 w-64 space-y-2 text-xs"
                >
                  <span className="font-semibold text-gray-800 block pb-1 border-b">
                    November 2027
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      tl.setVar("booksRecurringEndDate", "11/05/2027");
                      tl.setVar("booksRecurringEndDatePickerOpen", false);
                    }}
                    className="w-full text-center py-1.5 bg-purple-50 text-[#7014D9] rounded-md font-semibold cursor-pointer hover:bg-purple-100"
                  >
                    11/05/2027 (1 Year)
                  </button>
                </div>
              )}
            </div>

            {/* Payment Terms */}
            <div className="space-y-1.5 relative">
              <label className="font-semibold text-gray-700 block">
                Payment Terms <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-recurring-terms"
                onClick={() =>
                  tl.setVar("booksRecurringTermsDropdownOpen", !termsDropdownOpen)
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-gray-900 font-medium">{paymentTerms}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {termsDropdownOpen && (
                <div
                  data-tl="menu-recurring-terms"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  <button
                    type="button"
                    data-tl="terms-opt-net15"
                    onClick={() => {
                      tl.setVar("booksRecurringTerms", "Net 15");
                      tl.setVar("booksRecurringTermsDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Net 15
                  </button>
                  <button
                    type="button"
                    data-tl="terms-opt-net30"
                    onClick={() => {
                      tl.setVar("booksRecurringTerms", "Net 30");
                      tl.setVar("booksRecurringTermsDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Net 30
                  </button>
                  <button
                    type="button"
                    data-tl="terms-opt-due-on-receipt"
                    onClick={() => {
                      tl.setVar("booksRecurringTerms", "Due on Receipt");
                      tl.setVar("booksRecurringTermsDropdownOpen", false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Due on Receipt
                  </button>
                </div>
              )}
            </div>

            {/* Accounts Receivable */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 block">
                Accounts Receivable
              </label>
              <div
                data-tl="select-recurring-ar"
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 font-medium"
              >
                {accountsReceivable}
              </div>
            </div>

            {/* Salesperson */}
            <div className="space-y-1.5 relative">
              <label className="font-semibold text-gray-700 block">
                Salesperson
              </label>
              <button
                type="button"
                data-tl="select-recurring-salesperson"
                onClick={() =>
                  tl.setVar(
                    "booksRecurringSalespersonDropdownOpen",
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
                  data-tl="menu-recurring-salesperson"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  <button
                    type="button"
                    data-tl="salesperson-opt-sam"
                    onClick={() => {
                      tl.setVar("booksRecurringSalesperson", "Sam Taylor");
                      tl.setVar(
                        "booksRecurringSalespersonDropdownOpen",
                        false
                      );
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-800 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    Sam Taylor
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      tl.setVar("booksRecurringSalesperson", "None");
                      tl.setVar(
                        "booksRecurringSalespersonDropdownOpen",
                        false
                      );
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    None
                  </button>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 block">
                Subject
              </label>
              <input
                type="text"
                data-tl="input-recurring-subject"
                value={subject}
                onChange={(e) =>
                  tl.setVar("booksRecurringSubject", e.target.value)
                }
                placeholder="e.g. Monthly produce box"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
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
                    data-tl={`row-recurring-item-${idx}`}
                    className="group hover:bg-gray-50/50"
                  >
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
                              handleSelectItem(idx, {
                                name: "Organic Rice 25kg",
                                description: "Premium grade organic white rice",
                                rate: 200.0,
                              })
                            }
                            className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs border-b border-gray-50 cursor-pointer"
                          >
                            <span className="font-semibold text-gray-900 block">
                              Organic Rice 25kg
                            </span>
                            <span className="text-gray-500 text-[11px]">
                              Rate: £200.00
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
                            data-tl="item-opt-delivery"
                            onClick={() =>
                              handleSelectItem(idx, INITIAL_ACTIVE_ITEMS[3])
                            }
                            className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs cursor-pointer"
                          >
                            <span className="font-semibold text-gray-900 block">
                              Delivery Fee
                            </span>
                            <span className="text-gray-500 text-[11px]">
                              Rate: £10.00
                            </span>
                          </button>
                        </div>
                      )}
                    </td>

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

                    <td className="py-2 px-3">
                      <span
                        data-tl={`select-item-tax-${idx}`}
                        className="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 block truncate"
                      >
                        {row.tax || "VAT Standard (20%)"}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-right font-semibold text-gray-900">
                      <span data-tl={`text-item-amount-${idx}`}>
                        £{(row.amount || row.quantity * row.rate).toFixed(2)}
                      </span>
                    </td>

                    <td className="py-2 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(idx)}
                        className="text-gray-400 hover:text-rose-500 p-1 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-3 bg-gray-50/50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleAddRow}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:text-[#5E10B7] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add another line</span>
              </button>

              <button
                type="button"
                data-tl="btn-recurring-bulk-actions"
                onClick={() =>
                  tl.setVar("booksRecurringBulkItemsDialogOpen", true)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-gray-500" />
                <span>Bulk Actions</span>
              </button>
            </div>
          </div>

          {/* Totals & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Customer Notes
                </label>
                <textarea
                  data-tl="textarea-recurring-customer-notes"
                  rows={3}
                  value={customerNotes}
                  onChange={(e) =>
                    tl.setVar("booksRecurringCustomerNotes", e.target.value)
                  }
                  placeholder="Thanks for your business..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Terms & Conditions
                </label>
                <textarea
                  data-tl="textarea-recurring-terms"
                  rows={2}
                  value={termsText}
                  onChange={(e) =>
                    tl.setVar("booksRecurringTermsText", e.target.value)
                  }
                  placeholder="Enter recurring terms..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>
            </div>

            {/* Totals Box with Round Off */}
            <div className="bg-gray-50/70 p-5 rounded-xl border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total</span>
                <span
                  data-tl="text-recurring-subtotal"
                  className="font-semibold text-gray-900"
                >
                  £{subTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">Discount (%)</span>
                <input
                  type="number"
                  data-tl="input-recurring-discount"
                  value={discount || ""}
                  placeholder="0"
                  onChange={(e) =>
                    tl.setVar("booksRecurringDiscount", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">Shipping Charges (£)</span>
                <input
                  type="number"
                  data-tl="input-recurring-shipping"
                  value={shipping || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    tl.setVar("booksRecurringShipping", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">Adjustment (£)</span>
                <input
                  type="number"
                  data-tl="input-recurring-adjustment"
                  value={adjustment || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    tl.setVar(
                      "booksRecurringAdjustment",
                      Number(e.target.value)
                    )
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              {/* Round Off Row */}
              <div
                data-tl="row-recurring-roundoff"
                className="flex items-center justify-between gap-3 py-1 text-gray-600"
              >
                <span>Round Off (£)</span>
                <input
                  type="number"
                  data-tl="input-recurring-roundoff"
                  value={roundOff || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    tl.setVar("booksRecurringRoundOff", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex justify-between text-gray-600">
                <span>VAT (20%)</span>
                <span
                  data-tl="text-recurring-tax"
                  className="font-semibold text-gray-900"
                >
                  £{taxVal.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total (£)</span>
                <span
                  data-tl="text-recurring-total"
                  className="text-[#7014D9]"
                >
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Preferences:</span>
              <span
                data-tl="recurring-preferences-display"
                className="font-semibold text-gray-900"
              >
                {preferences}
              </span>
            </div>
            <button
              type="button"
              data-tl="btn-recurring-preferences"
              onClick={() =>
                tl.setVar("booksRecurringPreferencesDialogOpen", true)
              }
              className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Configure Recurring Preferences"
            >
              <Settings className="w-3.5 h-3.5 text-gray-500" />
              <span>Configure</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-save-recurring"
              onClick={handleSave}
              className="px-5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              data-tl="btn-cancel-recurring"
              onClick={() => {
                tl.setVar("booksView", "recurring");
                tl.setUrl(BOOKS_URLS.recurringInvoices);
              }}
              className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="text-xs text-gray-500">
            PDF Template: <span className="font-medium text-gray-700">&apos;Standard Template&apos;</span> <span className="text-[#7014D9] hover:underline cursor-pointer">Change</span>
          </div>
        </div>
      </div>
    </div>
  );
}
