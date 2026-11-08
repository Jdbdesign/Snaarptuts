"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_RECURRING_BILLS,
  RECURRING_BILL_REPEAT_EVERY,
  ACCOUNTS_PAYABLE_OPTIONS,
  PURCHASES_PAYMENT_TERMS,
  TAX_MODE_OPTIONS,
  LEVEL_OPTIONS,
  PURCHASES_ITEM_ACCOUNTS,
  CUSTOMER_DETAILS_OPTIONS,
  type RecurringBill,
} from "./books-data";
import { ArrowLeft, Calendar, Check, ChevronDown, Trash2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksNewRecurringBillView({ tl }: Props) {
  // Form variables
  const vendor = useTimelineVar<string>(tl, "booksNewRecBillVendor", "");
  const profileName = useTimelineVar<string>(tl, "booksNewRecBillProfileName", "");
  const repeatEvery = useTimelineVar<string>(tl, "booksNewRecBillRepeatEvery", "Month");
  const startDate = useTimelineVar<string>(tl, "booksNewRecBillStartDate", "11/08/2026");
  const endsOn = useTimelineVar<string>(tl, "booksNewRecBillEndsOn", "");
  const neverExpires = useTimelineVar<boolean>(tl, "booksNewRecBillNeverExpires", true);
  const accountsPayable = useTimelineVar<string>(tl, "booksNewRecBillAccountsPayable", "Select account");
  const paymentTerms = useTimelineVar<string>(tl, "booksNewRecBillPaymentTerms", "Due on Receipt");
  const taxMode = useTimelineVar<string>(tl, "booksNewRecBillTaxMode", "Tax Exclusive");
  const taxLevel = useTimelineVar<string>(tl, "booksNewRecBillTaxLevel", "At Transaction Level");

  // Item line 0
  const itemName = useTimelineVar<string>(tl, "booksNewRecBillItemName", "");
  const account = useTimelineVar<string>(tl, "booksNewRecBillAccount", "Select an account");
  const qty = useTimelineVar<string>(tl, "booksNewRecBillQty", "1");
  const rate = useTimelineVar<string>(tl, "booksNewRecBillRate", "0");
  const tax = useTimelineVar<string>(tl, "booksNewRecBillTax", "Select a...");
  const customer = useTimelineVar<string>(tl, "booksNewRecBillCustomer", "Select...");
  const notes = useTimelineVar<string>(tl, "booksNewRecBillNotes", "");

  // Dropdown open states
  const vendorOpen = useTimelineVar<boolean>(tl, "booksRecBillVendorDropdownOpen", false);
  const repeatOpen = useTimelineVar<boolean>(tl, "booksRecBillRepeatDropdownOpen", false);
  const apOpen = useTimelineVar<boolean>(tl, "booksRecBillApDropdownOpen", false);
  const termsOpen = useTimelineVar<boolean>(tl, "booksRecBillTermsDropdownOpen", false);
  const taxModeOpen = useTimelineVar<boolean>(tl, "booksRecBillTaxModeDropdownOpen", false);
  const taxLevelOpen = useTimelineVar<boolean>(tl, "booksRecBillTaxLevelDropdownOpen", false);
  const itemOpen = useTimelineVar<boolean>(tl, "booksRecBillItemDropdownOpen", false);
  const accountOpen = useTimelineVar<boolean>(tl, "booksRecBillAccountDropdownOpen", false);
  const taxOpen = useTimelineVar<boolean>(tl, "booksRecBillTaxDropdownOpen", false);
  const customerOpen = useTimelineVar<boolean>(tl, "booksRecBillCustomerDropdownOpen", false);

  const numQty = parseFloat(qty) || 0;
  const numRate = parseFloat(rate) || 0;
  const lineAmount = numQty * numRate;
  const subTotal = lineAmount;
  const taxRate = tax.includes("20") ? 0.2 : tax.includes("5") ? 0.05 : 0;
  const taxAmount = subTotal * taxRate;
  const total = subTotal + taxAmount;

  const handleBack = () => {
    tl.setVar("booksView", "recurring-bills");
    tl.setUrl(BOOKS_URLS.recurringBills);
  };

  const handleSave = () => {
    const list = tl.getVar<RecurringBill[]>("booksRecurringBills", INITIAL_RECURRING_BILLS);
    const newBill: RecurringBill = {
      id: "rec-bill-" + (list.length + 1),
      profileName: profileName || "Monthly Packaging Supplies",
      vendorName: vendor || "Greenfield Packaging Ltd",
      frequency: repeatEvery || "Monthly",
      status: "Active",
      startDate: startDate || "11/08/2026",
      neverExpires: neverExpires,
      paymentTerms: paymentTerms || "Due on Receipt",
      currency: "GBP",
      createdDate: "11/08/2026",
      lineItems: [
        {
          itemDetails: itemName || "Organic Rice 25kg",
          account: account || "Cost of Goods Sold",
          quantity: numQty || 2,
          rate: numRate || 200,
          tax: tax || "20%",
          customerDetails: customer !== "Select..." ? customer : undefined,
          amount: (numQty || 2) * (numRate || 200),
        },
      ],
      items: [
        {
          itemDetails: itemName || "Organic Rice 25kg",
          account: account || "Cost of Goods Sold",
          quantity: numQty || 2,
          rate: numRate || 200,
          tax: tax || "20%",
          customerDetails: customer !== "Select..." ? customer : undefined,
          amount: (numQty || 2) * (numRate || 200),
        },
      ],
    };

    tl.setVar("booksRecurringBills", [newBill, ...list]);
    tl.setVar("booksToastText", "Recurring bill created successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "recurring-bills");
    tl.setUrl(BOOKS_URLS.recurringBills);
  };

  return (
    <div
      data-tl="books-new-recurring-bill-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-new-rec-bill-back"
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
            Recurring Bills
          </span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">New</span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h1
            data-tl="new-recurring-bill-title"
            className="text-xl font-bold text-gray-900"
          >
            New Recurring Bill
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
                data-tl="select-rec-bill-vendor"
                onClick={() => tl.setVar("booksRecBillVendorDropdownOpen", !vendorOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300 text-left"
              >
                <span className={vendor ? "text-gray-900" : "text-gray-400"}>
                  {vendor || "Select a vendor"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {vendorOpen && (
                <div
                  data-tl="menu-rec-bill-vendor"
                  className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  <button
                    type="button"
                    data-tl="opt-rec-bill-vendor-greenfield"
                    onClick={() => {
                      tl.setVar("booksNewRecBillVendor", "Greenfield Packaging Ltd");
                      tl.setVar("booksRecBillVendorDropdownOpen", false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Greenfield Packaging Ltd
                  </button>
                  <button
                    type="button"
                    data-tl="opt-rec-bill-vendor-victor"
                    onClick={() => {
                      tl.setVar("booksNewRecBillVendor", "Victor Stationery");
                      tl.setVar("booksRecBillVendorDropdownOpen", false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Victor Stationery
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Name* */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-red-600">
              Profile Name*
            </label>
            <div className="col-span-3">
              <input
                type="text"
                data-tl="input-rec-bill-profile-name"
                value={profileName}
                onChange={(e) => tl.setVar("booksNewRecBillProfileName", e.target.value)}
                placeholder="Enter profile name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Repeat Every* */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-red-600">
              Repeat Every*
            </label>
            <div className="col-span-3 relative">
              <button
                type="button"
                data-tl="select-rec-bill-repeat-every"
                onClick={() => tl.setVar("booksRecBillRepeatDropdownOpen", !repeatOpen)}
                className="w-48 flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300"
              >
                <span>{repeatEvery}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {repeatOpen && (
                <div
                  data-tl="menu-rec-bill-repeat-every"
                  className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {RECURRING_BILL_REPEAT_EVERY.map((rep) => {
                    const optTl =
                      rep === "Week"
                        ? "opt-repeat-every-week"
                        : rep === "Month"
                        ? "opt-repeat-every-month"
                        : "opt-repeat-every-year";
                    return (
                      <button
                        key={rep}
                        type="button"
                        data-tl={optTl}
                        onClick={() => {
                          tl.setVar("booksNewRecBillRepeatEvery", rep);
                          tl.setVar("booksRecBillRepeatDropdownOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {rep}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Schedule: Start On, Ends On, Never Expires */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Schedule
            </label>
            <div className="col-span-3 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Start On</span>
                <input
                  type="text"
                  data-tl="input-rec-bill-start-date"
                  value={startDate}
                  onChange={(e) => tl.setVar("booksNewRecBillStartDate", e.target.value)}
                  className="w-32 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Ends On</span>
                <input
                  type="text"
                  data-tl="input-rec-bill-ends-on"
                  value={endsOn}
                  placeholder="mm/dd/yyyy"
                  disabled={neverExpires}
                  onChange={(e) => tl.setVar("booksNewRecBillEndsOn", e.target.value)}
                  className="w-32 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-400 bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="button"
                data-tl="toggle-rec-bill-never-expires"
                onClick={() => tl.setVar("booksNewRecBillNeverExpires", !neverExpires)}
                className="flex items-center gap-2 text-xs text-purple-700 font-medium cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    neverExpires
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {neverExpires && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Never Expires</span>
              </button>
            </div>
          </div>

          {/* Accounts Payable */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Accounts Payable
            </label>
            <div className="col-span-3 relative">
              <button
                type="button"
                data-tl="select-rec-bill-ap"
                onClick={() => tl.setVar("booksRecBillApDropdownOpen", !apOpen)}
                className="w-72 flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300"
              >
                <span>{accountsPayable}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {apOpen && (
                <div
                  data-tl="menu-rec-bill-ap"
                  className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {ACCOUNTS_PAYABLE_OPTIONS.map((ap) => (
                    <button
                      key={ap}
                      type="button"
                      data-tl="opt-ap-accounts-payable"
                      onClick={() => {
                        tl.setVar("booksNewRecBillAccountsPayable", ap);
                        tl.setVar("booksRecBillApDropdownOpen", false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {ap}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Payment Terms */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Payment Terms
            </label>
            <div className="col-span-3 relative">
              <button
                type="button"
                data-tl="select-rec-bill-terms"
                onClick={() => tl.setVar("booksRecBillTermsDropdownOpen", !termsOpen)}
                className="w-72 flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300"
              >
                <span>{paymentTerms}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {termsOpen && (
                <div
                  data-tl="menu-rec-bill-terms"
                  className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {PURCHASES_PAYMENT_TERMS.map((term) => {
                    const optTl =
                      term === "Due on Receipt"
                        ? "opt-terms-due-on-receipt"
                        : term === "Net 30"
                        ? "opt-terms-net-30"
                        : term === "Net 15"
                        ? "opt-terms-net-15"
                        : "opt-terms-net-60";
                    return (
                      <button
                        key={term}
                        type="button"
                        data-tl={optTl}
                        onClick={() => {
                          tl.setVar("booksNewRecBillPaymentTerms", term);
                          tl.setVar("booksRecBillTermsDropdownOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {term}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Tax Mode & Tax Level */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              {/* Tax Mode */}
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-rec-bill-tax-mode"
                  onClick={() => tl.setVar("booksRecBillTaxModeDropdownOpen", !taxModeOpen)}
                  className="flex items-center justify-between w-36 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                >
                  <span>{taxMode}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {taxModeOpen && (
                  <div
                    data-tl="menu-rec-bill-tax-mode"
                    className="absolute left-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                  >
                    {TAX_MODE_OPTIONS.map((tm) => (
                      <button
                        key={tm}
                        type="button"
                        data-tl={tm === "Tax Exclusive" ? "opt-tax-exclusive" : "opt-tax-inclusive"}
                        onClick={() => {
                          tl.setVar("booksNewRecBillTaxMode", tm);
                          tl.setVar("booksRecBillTaxModeDropdownOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                      >
                        {tm}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-gray-400">•</span>

              {/* Tax Level */}
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-rec-bill-tax-level"
                  onClick={() => tl.setVar("booksRecBillTaxLevelDropdownOpen", !taxLevelOpen)}
                  className="flex items-center justify-between w-44 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                >
                  <span>{taxLevel}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {taxLevelOpen && (
                  <div
                    data-tl="menu-rec-bill-tax-level"
                    className="absolute left-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                  >
                    {LEVEL_OPTIONS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        data-tl={lvl === "At Transaction Level" ? "opt-at-transaction-level" : "opt-at-item-level"}
                        onClick={() => {
                          tl.setVar("booksNewRecBillTaxLevel", lvl);
                          tl.setVar("booksRecBillTaxLevelDropdownOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              data-tl="btn-rec-bill-bulk-actions"
              className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Bulk Actions
            </button>
          </div>
        </div>

        {/* Item Table (7 Columns) */}
        <div className="space-y-2 pt-2">
          <div className="border border-gray-200 rounded-xl overflow-visible shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">ITEM DETAILS</th>
                  <th className="py-2.5 px-3">ACCOUNT</th>
                  <th className="py-2.5 px-3 w-16 text-center">QUANTITY</th>
                  <th className="py-2.5 px-3 w-20 text-center">RATE</th>
                  <th className="py-2.5 px-3">TAX</th>
                  <th className="py-2.5 px-3">CUSTOMER DETAILS</th>
                  <th className="py-2.5 px-3 w-20 text-right">AMOUNT</th>
                  <th className="py-2.5 px-2 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  {/* Item Details */}
                  <td className="py-2.5 px-3 relative">
                    <input
                      type="text"
                      data-tl="input-rec-bill-item-0"
                      value={itemName}
                      onFocus={() => tl.setVar("booksRecBillItemDropdownOpen", true)}
                      onChange={(e) => tl.setVar("booksNewRecBillItemName", e.target.value)}
                      placeholder="Type or click to select an item"
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400"
                    />
                    {itemOpen && (
                      <div
                        data-tl="menu-rec-bill-items-0"
                        className="absolute left-3 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                      >
                        <button
                          type="button"
                          data-tl="opt-rec-bill-item-rice"
                          onClick={() => {
                            tl.setVar("booksNewRecBillItemName", "Organic Rice 25kg");
                            tl.setVar("booksNewRecBillRate", "200");
                            tl.setVar("booksRecBillItemDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Organic Rice 25kg
                        </button>
                        <button
                          type="button"
                          data-tl="opt-rec-bill-item-flour"
                          onClick={() => {
                            tl.setVar("booksNewRecBillItemName", "Cassava Flour 10kg");
                            tl.setVar("booksNewRecBillRate", "200");
                            tl.setVar("booksRecBillItemDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Cassava Flour 10kg
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Account */}
                  <td className="py-2.5 px-3 relative">
                    <button
                      type="button"
                      data-tl="select-rec-bill-account-0"
                      onClick={() => tl.setVar("booksRecBillAccountDropdownOpen", !accountOpen)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                    >
                      <span className="truncate">{account}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                    </button>
                    {accountOpen && (
                      <div
                        data-tl="menu-rec-bill-account-0"
                        className="absolute left-3 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                      >
                        {PURCHASES_ITEM_ACCOUNTS.map((acc) => (
                          <button
                            key={acc}
                            type="button"
                            data-tl={acc === "Cost of Goods Sold" ? "opt-account-cogs" : `opt-account-${acc.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => {
                              tl.setVar("booksNewRecBillAccount", acc);
                              tl.setVar("booksRecBillAccountDropdownOpen", false);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                          >
                            {acc}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Quantity */}
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      data-tl="input-rec-bill-qty-0"
                      value={qty}
                      onChange={(e) => tl.setVar("booksNewRecBillQty", e.target.value)}
                      className="w-14 text-center px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800"
                    />
                  </td>

                  {/* Rate */}
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      data-tl="input-rec-bill-rate-0"
                      value={rate}
                      onChange={(e) => tl.setVar("booksNewRecBillRate", e.target.value)}
                      className="w-16 text-center px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800"
                    />
                  </td>

                  {/* Tax */}
                  <td className="py-2.5 px-3 relative">
                    <button
                      type="button"
                      data-tl="select-rec-bill-tax-0"
                      onClick={() => tl.setVar("booksRecBillTaxDropdownOpen", !taxOpen)}
                      className="w-28 flex items-center justify-between px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                    >
                      <span className="truncate">{tax}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                    </button>
                    {taxOpen && (
                      <div
                        data-tl="menu-rec-bill-tax-0"
                        className="absolute left-3 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                      >
                        <button
                          type="button"
                          data-tl="opt-tax-20"
                          onClick={() => {
                            tl.setVar("booksNewRecBillTax", "20%");
                            tl.setVar("booksRecBillTaxDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Standard Rate (20%)
                        </button>
                        <button
                          type="button"
                          data-tl="opt-tax-0"
                          onClick={() => {
                            tl.setVar("booksNewRecBillTax", "0%");
                            tl.setVar("booksRecBillTaxDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Zero Rate (0%)
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Customer Details */}
                  <td className="py-2.5 px-3 relative">
                    <button
                      type="button"
                      data-tl="select-rec-bill-customer-0"
                      onClick={() => tl.setVar("booksRecBillCustomerDropdownOpen", !customerOpen)}
                      className="w-28 flex items-center justify-between px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                    >
                      <span className="truncate">{customer}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                    </button>
                    {customerOpen && (
                      <div
                        data-tl="menu-rec-bill-customer-0"
                        className="absolute left-3 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                      >
                        {CUSTOMER_DETAILS_OPTIONS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            data-tl={c === "None" ? "opt-customer-none" : "opt-customer-acme"}
                            onClick={() => {
                              tl.setVar("booksNewRecBillCustomer", c);
                              tl.setVar("booksRecBillCustomerDropdownOpen", false);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="py-2.5 px-3 text-right font-medium text-gray-900">
                    {lineAmount.toFixed(2)}
                  </td>

                  {/* Trash Icon */}
                  <td className="py-2.5 px-2 text-center">
                    <button
                      type="button"
                      data-tl="btn-rec-bill-remove-row-0"
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <button
              type="button"
              data-tl="btn-rec-bill-add-row"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              + Add New Row
            </button>
          </div>
        </div>

        {/* Totals Box on Right */}
        <div className="flex justify-end pt-4">
          <div
            data-tl="recurring-bill-totals-box"
            className="w-80 bg-[#FAFBFD] border border-gray-200 rounded-xl p-5 space-y-3 text-xs"
          >
            <div className="flex justify-between text-gray-600">
              <span>Sub Total</span>
              <span className="font-medium text-gray-900">{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Discount</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  defaultValue="0"
                  className="w-12 text-center py-1 border border-gray-200 rounded text-xs"
                />
                <span className="text-gray-400">%</span>
                <span className="w-14 text-right">0.00</span>
              </div>
            </div>
            {taxAmount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax (20%)</span>
                <span className="font-medium text-gray-900">{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-gray-600">
              <span className="px-2 py-0.5 border border-dashed border-gray-300 rounded text-[11px]">
                Adjustment
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  defaultValue="0"
                  className="w-12 text-center py-1 border border-gray-200 rounded text-xs"
                />
                <span className="w-14 text-right">0.00</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-gray-900">
              <span>Total</span>
              <span>{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5 max-w-xl">
          <label className="text-xs font-medium text-gray-700">Notes</label>
          <textarea
            data-tl="input-rec-bill-notes"
            value={notes}
            onChange={(e) => tl.setVar("booksNewRecBillNotes", e.target.value)}
            placeholder="Enter notes..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            data-tl="btn-save-recurring-bill"
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            data-tl="btn-cancel-recurring-bill"
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
