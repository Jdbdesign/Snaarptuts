"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_VENDOR_CREDITS,
  ACCOUNTS_PAYABLE_OPTIONS,
  TAX_MODE_OPTIONS,
  LEVEL_OPTIONS,
  PURCHASES_ITEM_ACCOUNTS,
  type VendorCredit,
} from "./books-data";
import { ArrowLeft, ChevronDown, FileText, Trash2, UploadCloud } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksNewVendorCreditView({ tl }: Props) {
  // Form variables
  const vendor = useTimelineVar<string>(tl, "booksNewVendorCreditVendor", "");
  const orderNumber = useTimelineVar<string>(tl, "booksNewVendorCreditOrderNumber", "");
  const date = useTimelineVar<string>(tl, "booksNewVendorCreditDate", "11/08/2026");
  const subject = useTimelineVar<string>(tl, "booksNewVendorCreditSubject", "");
  const accountsPayable = useTimelineVar<string>(tl, "booksNewVendorCreditAccountsPayable", "Accounts Payable");
  const taxMode = useTimelineVar<string>(tl, "booksNewVendorCreditTaxMode", "Tax Exclusive");
  const taxLevel = useTimelineVar<string>(tl, "booksNewVendorCreditTaxLevel", "At Transaction Level");

  // Line item 0
  const itemName = useTimelineVar<string>(tl, "booksNewVendorCreditItemName", "");
  const account = useTimelineVar<string>(tl, "booksNewVendorCreditAccount", "Select an account");
  const qty = useTimelineVar<string>(tl, "booksNewVendorCreditQty", "1");
  const rate = useTimelineVar<string>(tl, "booksNewVendorCreditRate", "0");
  const tax = useTimelineVar<string>(tl, "booksNewVendorCreditTax", "Select a...");
  const discount = useTimelineVar<string>(tl, "booksNewVendorCreditDiscount", "0");
  const notes = useTimelineVar<string>(tl, "booksNewVendorCreditNotes", "");

  // Dropdown open states
  const vendorOpen = useTimelineVar<boolean>(tl, "booksVcVendorDropdownOpen", false);
  const apOpen = useTimelineVar<boolean>(tl, "booksVcApDropdownOpen", false);
  const taxModeOpen = useTimelineVar<boolean>(tl, "booksVcTaxModeDropdownOpen", false);
  const taxLevelOpen = useTimelineVar<boolean>(tl, "booksVcTaxLevelDropdownOpen", false);
  const itemOpen = useTimelineVar<boolean>(tl, "booksVcItemDropdownOpen", false);
  const accountOpen = useTimelineVar<boolean>(tl, "booksVcAccountDropdownOpen", false);
  const taxOpen = useTimelineVar<boolean>(tl, "booksVcTaxDropdownOpen", false);

  const numQty = parseFloat(qty) || 0;
  const numRate = parseFloat(rate) || 0;
  const lineAmount = numQty * numRate;
  const subTotal = lineAmount;
  const numDiscount = parseFloat(discount) || 0;
  const discountAmount = (subTotal * numDiscount) / 100;
  const taxRate = tax.includes("20") ? 0.2 : tax.includes("5") ? 0.05 : 0;
  const taxAmount = subTotal * taxRate;
  // If Tax Inclusive: total = subTotal - discountAmount + taxAmount (matching UI video frame where total is 220)
  const total = subTotal > 0 ? (subTotal - discountAmount + taxAmount) : 0;

  const handleBack = () => {
    tl.setVar("booksView", "vendor-credits");
    tl.setUrl(BOOKS_URLS.vendorCredits);
  };

  const handleSaveAsOpen = () => {
    const list = tl.getVar<VendorCredit[]>("booksVendorCredits", INITIAL_VENDOR_CREDITS);
    const newCredit: VendorCredit = {
      id: "vc-" + (list.length + 1),
      creditNoteNumber: "VC-001",
      vendorName: vendor || "Greenfield Packaging Ltd",
      orderNumber: orderNumber || "PO-7781",
      date: date || "11/08/2026",
      subject: subject || "Returned packaging",
      amount: total || 220,
      balanceRemaining: total || 220,
      status: "Open",
      notes: notes,
      items: [
        {
          itemDetails: itemName || "Cassava Flour 10kg",
          quantity: numQty || 1,
          rate: numRate || 200,
          amount: lineAmount || 200,
        },
      ],
    };

    tl.setVar("booksVendorCredits", [newCredit, ...list]);
    tl.setVar("booksToastText", "Vendor credit created successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "vendor-credits");
    tl.setUrl(BOOKS_URLS.vendorCredits);
  };

  return (
    <div
      data-tl="books-new-vendor-credit-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-new-vendor-credit-back"
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
            Vendor Credits
          </span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">New</span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h1
            data-tl="new-vendor-credit-title"
            className="text-xl font-bold text-gray-900"
          >
            New Vendor Credits
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
                data-tl="select-vendor-credit-vendor"
                onClick={() => tl.setVar("booksVcVendorDropdownOpen", !vendorOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300 text-left"
              >
                <span className={vendor ? "text-gray-900" : "text-gray-400"}>
                  {vendor || "Select a vendor"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {vendorOpen && (
                <div
                  data-tl="menu-vendor-credit-vendor"
                  className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  <button
                    type="button"
                    data-tl="opt-vendor-credit-vendor-greenfield"
                    onClick={() => {
                      tl.setVar("booksNewVendorCreditVendor", "Greenfield Packaging Ltd");
                      tl.setVar("booksVcVendorDropdownOpen", false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Greenfield Packaging Ltd
                  </button>
                  <button
                    type="button"
                    data-tl="opt-vendor-credit-vendor-victor"
                    onClick={() => {
                      tl.setVar("booksNewVendorCreditVendor", "Victor Stationery");
                      tl.setVar("booksVcVendorDropdownOpen", false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Victor Stationery
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Credit Note#* */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-red-600">
              Credit Note#*
            </label>
            <div className="col-span-3">
              <input
                type="text"
                data-tl="input-credit-note-number"
                value="(Auto-generated)"
                readOnly
                className="w-64 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-400 bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Order Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Order Number
            </label>
            <div className="col-span-3">
              <input
                type="text"
                data-tl="input-vendor-credit-order-number"
                value={orderNumber}
                onChange={(e) => tl.setVar("booksNewVendorCreditOrderNumber", e.target.value)}
                className="w-64 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Vendor Credit Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Vendor Credit Date
            </label>
            <div className="col-span-3">
              <input
                type="text"
                data-tl="input-vendor-credit-date"
                value={date}
                onChange={(e) => tl.setVar("booksNewVendorCreditDate", e.target.value)}
                className="w-48 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-900"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-xs font-medium text-gray-700">Subject</label>
            <div className="col-span-3">
              <input
                type="text"
                data-tl="input-vendor-credit-subject"
                value={subject}
                onChange={(e) => tl.setVar("booksNewVendorCreditSubject", e.target.value)}
                placeholder="Enter a subject within 250 characters"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
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
                data-tl="select-vendor-credit-ap"
                onClick={() => tl.setVar("booksVcApDropdownOpen", !apOpen)}
                className="w-72 flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white hover:border-gray-300"
              >
                <span>{accountsPayable}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {apOpen && (
                <div
                  data-tl="menu-vendor-credit-ap"
                  className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {ACCOUNTS_PAYABLE_OPTIONS.map((ap) => (
                    <button
                      key={ap}
                      type="button"
                      data-tl="opt-ap-accounts-payable"
                      onClick={() => {
                        tl.setVar("booksNewVendorCreditAccountsPayable", ap);
                        tl.setVar("booksVcApDropdownOpen", false);
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

          {/* Tax Mode & Tax Level */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              {/* Tax Mode */}
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-vendor-credit-tax-mode"
                  onClick={() => tl.setVar("booksVcTaxModeDropdownOpen", !taxModeOpen)}
                  className="flex items-center justify-between w-36 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                >
                  <span>{taxMode}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {taxModeOpen && (
                  <div
                    data-tl="menu-vendor-credit-tax-mode"
                    className="absolute left-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                  >
                    {TAX_MODE_OPTIONS.map((tm) => (
                      <button
                        key={tm}
                        type="button"
                        data-tl={tm === "Tax Exclusive" ? "opt-tax-exclusive" : "opt-tax-inclusive"}
                        onClick={() => {
                          tl.setVar("booksNewVendorCreditTaxMode", tm);
                          tl.setVar("booksVcTaxModeDropdownOpen", false);
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
                  data-tl="select-vendor-credit-tax-level"
                  onClick={() => tl.setVar("booksVcTaxLevelDropdownOpen", !taxLevelOpen)}
                  className="flex items-center justify-between w-44 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                >
                  <span>{taxLevel}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {taxLevelOpen && (
                  <div
                    data-tl="menu-vendor-credit-tax-level"
                    className="absolute left-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                  >
                    {LEVEL_OPTIONS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        data-tl={lvl === "At Transaction Level" ? "opt-at-transaction-level" : "opt-at-item-level"}
                        onClick={() => {
                          tl.setVar("booksNewVendorCreditTaxLevel", lvl);
                          tl.setVar("booksVcTaxLevelDropdownOpen", false);
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
              className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Bulk Actions
            </button>
          </div>
        </div>

        {/* Item Table (6 Columns: Item Details, Account, Quantity, Rate, Tax, Amount) */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-semibold text-gray-800">Item Table</h2>
          <div className="border border-gray-200 rounded-xl overflow-visible shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">ITEM DETAILS</th>
                  <th className="py-2.5 px-3">ACCOUNT</th>
                  <th className="py-2.5 px-3 w-20 text-center">QUANTITY</th>
                  <th className="py-2.5 px-3 w-24 text-center">RATE</th>
                  <th className="py-2.5 px-3">TAX</th>
                  <th className="py-2.5 px-3 w-24 text-right">AMOUNT</th>
                  <th className="py-2.5 px-2 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  {/* Item Details */}
                  <td className="py-2.5 px-3 relative">
                    <input
                      type="text"
                      data-tl="input-vendor-credit-item-0"
                      value={itemName}
                      onFocus={() => tl.setVar("booksVcItemDropdownOpen", true)}
                      onChange={(e) => tl.setVar("booksNewVendorCreditItemName", e.target.value)}
                      placeholder="Type or click to select an item."
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400"
                    />
                    {itemOpen && (
                      <div
                        data-tl="menu-vendor-credit-items-0"
                        className="absolute left-3 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                      >
                        <button
                          type="button"
                          data-tl="opt-vc-item-cassava"
                          onClick={() => {
                            tl.setVar("booksNewVendorCreditItemName", "Cassava Flour 10kg");
                            tl.setVar("booksNewVendorCreditRate", "200");
                            tl.setVar("booksVcItemDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Cassava Flour 10kg
                        </button>
                        <button
                          type="button"
                          data-tl="opt-vc-item-rice"
                          onClick={() => {
                            tl.setVar("booksNewVendorCreditItemName", "Organic Rice 25kg");
                            tl.setVar("booksNewVendorCreditRate", "200");
                            tl.setVar("booksVcItemDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Organic Rice 25kg
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Account */}
                  <td className="py-2.5 px-3 relative">
                    <button
                      type="button"
                      data-tl="select-vendor-credit-account-0"
                      onClick={() => tl.setVar("booksVcAccountDropdownOpen", !accountOpen)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                    >
                      <span className="truncate">{account}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                    </button>
                    {accountOpen && (
                      <div
                        data-tl="menu-vendor-credit-account-0"
                        className="absolute left-3 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                      >
                        {PURCHASES_ITEM_ACCOUNTS.map((acc) => (
                          <button
                            key={acc}
                            type="button"
                            data-tl={acc === "Cost of Goods Sold" ? "opt-account-cogs" : `opt-account-${acc.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => {
                              tl.setVar("booksNewVendorCreditAccount", acc);
                              tl.setVar("booksVcAccountDropdownOpen", false);
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
                      data-tl="input-vendor-credit-qty-0"
                      value={qty}
                      onChange={(e) => tl.setVar("booksNewVendorCreditQty", e.target.value)}
                      className="w-16 text-center px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800"
                    />
                  </td>

                  {/* Rate */}
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      data-tl="input-vendor-credit-rate-0"
                      value={rate}
                      onChange={(e) => tl.setVar("booksNewVendorCreditRate", e.target.value)}
                      className="w-20 text-center px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800"
                    />
                  </td>

                  {/* Tax */}
                  <td className="py-2.5 px-3 relative">
                    <button
                      type="button"
                      data-tl="select-vendor-credit-tax-0"
                      onClick={() => tl.setVar("booksVcTaxDropdownOpen", !taxOpen)}
                      className="w-32 flex items-center justify-between px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 bg-white"
                    >
                      <span className="truncate">{tax}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                    </button>
                    {taxOpen && (
                      <div
                        data-tl="menu-vendor-credit-tax-0"
                        className="absolute left-3 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                      >
                        <button
                          type="button"
                          data-tl="opt-tax-20"
                          onClick={() => {
                            tl.setVar("booksNewVendorCreditTax", "20%");
                            tl.setVar("booksVcTaxDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Standard Rate (20%)
                        </button>
                        <button
                          type="button"
                          data-tl="opt-tax-0"
                          onClick={() => {
                            tl.setVar("booksNewVendorCreditTax", "0%");
                            tl.setVar("booksVcTaxDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-blue-50"
                        >
                          Zero Rate (0%)
                        </button>
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
              className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              + Add New Row
            </button>
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              Add Items in Bulk
            </button>
          </div>
        </div>

        {/* Totals Box on Right */}
        <div className="flex justify-end pt-4">
          <div
            data-tl="vendor-credit-totals-box"
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
                  data-tl="input-vendor-credit-discount"
                  value={discount}
                  onChange={(e) => tl.setVar("booksNewVendorCreditDiscount", e.target.value)}
                  className="w-12 text-center py-1 border border-gray-200 rounded text-xs"
                />
                <span className="text-gray-400">%</span>
                <span className="w-14 text-right">{discountAmount.toFixed(2)}</span>
              </div>
            </div>
            {taxAmount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>{taxMode === "Tax Inclusive" ? "Tax (inclusive)" : "Tax (20%)"}</span>
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

        {/* Notes & File Attachments */}
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Notes</label>
            <textarea
              data-tl="input-vendor-credit-notes"
              value={notes}
              onChange={(e) => tl.setVar("booksNewVendorCreditNotes", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">
              Attach File(s) to Vendor Credits
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-gray-500" />
                <span>Upload File</span>
              </button>
              <span className="text-[11px] text-gray-400">
                You can upload a maximum of 5 files, 10MB each
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            data-tl="btn-save-as-open-vendor-credit"
            onClick={handleSaveAsOpen}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer transition-colors"
          >
            Save as Open
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
