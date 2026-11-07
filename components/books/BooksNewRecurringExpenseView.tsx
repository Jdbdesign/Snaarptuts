"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type RecurringExpenseProfile,
} from "./books-data";
import {
  ArrowLeft,
  Home,
  ChevronRight,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { BooksDatePickerPopover } from "./BooksDatePickerPopover";

type Props = {
  tl: Timeline;
};

export function BooksNewRecurringExpenseView({ tl }: Props) {
  // Timeline vars with fallbacks
  const profileName = useTimelineVar<string>(tl, "booksRecProfileName", "");
  const employee = useTimelineVar<string>(tl, "booksRecEmployee", "");
  const repeatEvery = useTimelineVar<string>(tl, "booksRecRepeatEvery", "Week");
  const startDate = useTimelineVar<string>(tl, "booksRecStartDate", "11/07/2026");
  const endsOn = useTimelineVar<string>(tl, "booksRecEndsOn", "");
  const neverExpires = useTimelineVar<boolean>(tl, "booksRecNeverExpires", true);
  const expenseAccount = useTimelineVar<string>(tl, "booksRecExpenseAccount", "");
  const amount = useTimelineVar<string>(tl, "booksRecAmount", "");
  const amountIs = useTimelineVar<"Tax Inclusive" | "Tax Exclusive">(
    tl,
    "booksRecAmountIs",
    "Tax Inclusive"
  );
  const tax = useTimelineVar<string>(tl, "booksRecTax", "VAT Standard (20%)");
  const paidThrough = useTimelineVar<string>(tl, "booksRecPaidThrough", "");
  const vendor = useTimelineVar<string>(tl, "booksRecVendor", "");
  const notes = useTimelineVar<string>(tl, "booksRecNotes", "");
  const customerName = useTimelineVar<string>(tl, "booksRecCustomerName", "");

  // Local dropdown open states
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [repeatOpen, setRepeatOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [taxOpen, setTaxOpen] = useState(false);
  const [paidThroughOpen, setPaidThroughOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleBack = () => {
    tl.setVar("booksView", "recurring-expenses");
    tl.setUrl(BOOKS_URLS.recurringExpenses);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const currentList = tl.getVar<RecurringExpenseProfile[]>(
        "booksRecurringExpenses",
        []
      );
      const newProfile: RecurringExpenseProfile = {
        id: "rec-exp-2",
        profileName: profileName || "Monthly Office Supplies",
        frequency: repeatEvery || "Month",
        amount: parseFloat(amount) || 450.0,
        status: "Active",
        startDate: startDate || "11/07/2026",
        employee: employee || "Jane Doe",
        repeatEvery: repeatEvery || "Month",
        neverExpires: neverExpires,
        expenseAccount: expenseAccount || "Advertising and Marketing",
        amountIs: amountIs,
        tax: tax,
        paidThrough: paidThrough || "Undeposited Funds",
        vendor: vendor || "Greenfield Packaging Ltd",
        notes: notes,
        customerName: customerName || "Acme Foods Ltd",
        created: "11/07/2026",
      };
      tl.setVar("booksRecurringExpenses", [
        newProfile,
        ...currentList.filter((p) => p.id !== newProfile.id),
      ]);
      tl.setVar("booksToastText", "Recurring expense created successfully");
      tl.setVar("booksToastOpen", true);
      tl.setVar("booksView", "recurring-expenses");
      tl.setUrl(BOOKS_URLS.recurringExpenses);
      setIsSaving(false);
    }, 400);
  };

  return (
    <div
      data-tl="books-new-recurring-expense-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-recurring-expenses"
            onClick={handleBack}
            className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span>Recurring Expenses</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-900 font-medium">New</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">
            New Recurring Expense
          </h1>
        </div>

        {/* Form Grid */}
        <div className="space-y-6 text-xs text-gray-700 max-w-3xl">
          {/* Profile Name */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">
              Profile Name<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2">
              <input
                type="text"
                data-tl="input-rec-profile-name"
                value={profileName}
                onChange={(e) => tl.setVar("booksRecProfileName", e.target.value)}
                placeholder="Enter profile name"
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Employee */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">Employee</label>
            <div className="col-span-2 relative">
              <button
                type="button"
                data-tl="select-rec-employee"
                onClick={() => setEmployeeOpen(!employeeOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
              >
                <span className={employee ? "text-gray-900" : "text-gray-400"}>
                  {employee || "Select an employee"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {employeeOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                  <div
                    data-tl="opt-rec-employee-jane"
                    onClick={() => {
                      tl.setVar("booksRecEmployee", "Jane Doe");
                      setEmployeeOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                  >
                    Jane Doe
                  </div>
                  <div
                    data-tl="opt-rec-employee-sam"
                    onClick={() => {
                      tl.setVar("booksRecEmployee", "Sam Lee");
                      setEmployeeOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                  >
                    Sam Lee
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Repeat Every */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">
              Repeat Every<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2 relative">
              <button
                type="button"
                data-tl="select-rec-repeat-every"
                onClick={() => setRepeatOpen(!repeatOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
              >
                <span className="text-gray-900">{repeatEvery}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {repeatOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                  {["Day", "Week", "2 Weeks", "Month", "2 Months", "3 Months", "6 Months", "Year"].map(
                    (opt) => (
                      <div
                        key={opt}
                        data-tl={`opt-rec-repeat-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => {
                          tl.setVar("booksRecRepeatEvery", opt);
                          setRepeatOpen(false);
                        }}
                        className={`px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-800 ${
                          opt === repeatEvery ? "bg-purple-50 text-[#7014D9] font-medium" : ""
                        }`}
                      >
                        {opt}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Start Date */}
          <div className="grid grid-cols-3 items-start gap-4">
            <label className="font-semibold text-gray-800 pt-2">Start Date</label>
            <div className="col-span-2 space-y-1.5 relative">
              <div className="relative">
                <input
                  type="text"
                  data-tl="input-rec-start-date"
                  value={startDate}
                  readOnly
                  onClick={() => setDatePickerOpen(!datePickerOpen)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs cursor-pointer focus:outline-none"
                />
                <Calendar
                  onClick={() => setDatePickerOpen(!datePickerOpen)}
                  className="absolute right-3.5 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
                />
              </div>

              {datePickerOpen && (
                <BooksDatePickerPopover
                  onSelect={(d) => {
                    tl.setVar("booksRecStartDate", d || "11/07/2026");
                    setDatePickerOpen(false);
                  }}
                  onClose={() => setDatePickerOpen(false)}
                  todayDateStr="11/07/2026"
                />
              )}

              <p data-tl="rec-schedule-helper" className="text-[11px] text-gray-400">
                The recurring expense will be created on Saturday, November 7, 2026
              </p>
            </div>
          </div>

          {/* Ends On */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">Ends On</label>
            <div className="col-span-2">
              <input
                type="text"
                data-tl="input-rec-ends-on"
                value={endsOn}
                disabled={neverExpires}
                placeholder="mm/dd/yyyy"
                className={`w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs ${
                  neverExpires ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
          </div>

          {/* Never Expires */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">Never Expires</label>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="neverExpires"
                data-tl="checkbox-rec-never-expires"
                checked={neverExpires}
                onChange={(e) => tl.setVar("booksRecNeverExpires", e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="neverExpires" className="text-xs text-gray-700 cursor-pointer">
                This recurring expense never expires
              </label>
            </div>
          </div>

          {/* Expense Account */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">
              Expense Account<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2 relative">
              <button
                type="button"
                data-tl="select-rec-expense-account"
                onClick={() => setAccountOpen(!accountOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
              >
                <span className={expenseAccount ? "text-gray-900" : "text-gray-400"}>
                  {expenseAccount || "Select an account"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {accountOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 max-h-52 overflow-y-auto">
                  {[
                    { id: "cogs", label: "Cost of Goods Sold" },
                    { id: "advertising", label: "Advertising and Marketing" },
                    { id: "bank-fees", label: "Bank Fees and Charges" },
                    { id: "bad-debt", label: "Bad Debt" },
                    { id: "commission", label: "Commission and Fees" },
                    { id: "consultant", label: "Consultant Expense" },
                    { id: "depreciation", label: "Depreciation Expense" },
                  ].map((acc) => (
                    <div
                      key={acc.id}
                      data-tl={`opt-rec-account-${acc.id}`}
                      onClick={() => {
                        tl.setVar("booksRecExpenseAccount", acc.label);
                        setAccountOpen(false);
                      }}
                      className={`px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-800 ${
                        acc.label === expenseAccount ? "bg-purple-50 text-[#7014D9] font-medium" : ""
                      }`}
                    >
                      {acc.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">
              Amount<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2 flex gap-2">
              <div className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50 text-gray-600 flex items-center justify-between">
                <span>GBP</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
              <input
                type="text"
                data-tl="input-rec-amount"
                value={amount}
                onChange={(e) => tl.setVar("booksRecAmount", e.target.value)}
                placeholder="0.00"
                className="flex-1 px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Amount Is */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">
              Amount Is<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="amountIs"
                  data-tl="radio-rec-tax-inclusive"
                  checked={amountIs === "Tax Inclusive"}
                  onChange={() => tl.setVar("booksRecAmountIs", "Tax Inclusive")}
                  className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Tax Inclusive</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="amountIs"
                  data-tl="radio-rec-tax-exclusive"
                  checked={amountIs === "Tax Exclusive"}
                  onChange={() => tl.setVar("booksRecAmountIs", "Tax Exclusive")}
                  className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Tax Exclusive</span>
              </label>
            </div>
          </div>

          {/* Tax */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">Tax</label>
            <div className="col-span-2 relative">
              <button
                type="button"
                data-tl="select-rec-tax"
                onClick={() => setTaxOpen(!taxOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
              >
                <span className="text-gray-900">{tax}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {taxOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                  <div
                    data-tl="opt-rec-tax-vat20"
                    onClick={() => {
                      tl.setVar("booksRecTax", "VAT Standard (20%)");
                      setTaxOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                  >
                    VAT Standard (20%)
                  </div>
                  <div
                    data-tl="opt-rec-tax-vat0"
                    onClick={() => {
                      tl.setVar("booksRecTax", "VAT Zero (0%)");
                      setTaxOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                  >
                    VAT Zero (0%)
                  </div>
                  <div
                    data-tl="opt-rec-tax-exempt"
                    onClick={() => {
                      tl.setVar("booksRecTax", "Exempt");
                      setTaxOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                  >
                    Exempt
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Paid Through */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">
              Paid Through<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2 relative">
              <button
                type="button"
                data-tl="select-rec-paid-through"
                onClick={() => setPaidThroughOpen(!paidThroughOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
              >
                <span className={paidThrough ? "text-gray-900" : "text-gray-400"}>
                  {paidThrough || "Select an account"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {paidThroughOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                  <div
                    data-tl="opt-rec-paid-receivable"
                    onClick={() => {
                      tl.setVar("booksRecPaidThrough", "Accounts Receivable");
                      setPaidThroughOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                  >
                    Accounts Receivable
                  </div>
                  <div
                    data-tl="opt-rec-paid-undeposited"
                    onClick={() => {
                      tl.setVar("booksRecPaidThrough", "Undeposited Funds");
                      setPaidThroughOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                  >
                    Undeposited Funds
                  </div>
                  <div
                    data-tl="opt-rec-paid-petty"
                    onClick={() => {
                      tl.setVar("booksRecPaidThrough", "Petty Cash");
                      setPaidThroughOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                  >
                    Petty Cash
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vendor */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">Vendor</label>
            <div className="col-span-2 relative">
              <button
                type="button"
                data-tl="select-rec-vendor"
                onClick={() => setVendorOpen(!vendorOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
              >
                <span className={vendor ? "text-gray-900" : "text-gray-400"}>
                  {vendor || "Select a vendor"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {vendorOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                  <div
                    data-tl="opt-rec-vendor-greenfield"
                    onClick={() => {
                      tl.setVar("booksRecVendor", "Greenfield Packaging Ltd");
                      setVendorOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                  >
                    Greenfield Packaging Ltd
                  </div>
                  <div
                    data-tl="opt-rec-vendor-victor"
                    onClick={() => {
                      tl.setVar("booksRecVendor", "Victor Stationery");
                      setVendorOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                  >
                    Victor Stationery
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="grid grid-cols-3 items-start gap-4">
            <label className="font-semibold text-gray-800 pt-2">Notes</label>
            <div className="col-span-2">
              <textarea
                data-tl="textarea-rec-notes"
                value={notes}
                onChange={(e) => tl.setVar("booksRecNotes", e.target.value)}
                placeholder="Max. 500 characters"
                rows={3}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Customer Name */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">Customer Name</label>
            <div className="col-span-2 relative">
              <button
                type="button"
                data-tl="select-rec-customer"
                onClick={() => setCustomerOpen(!customerOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
              >
                <span className={customerName ? "text-gray-900" : "text-gray-400"}>
                  {customerName || "Select or add a customer"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {customerOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                  <div
                    data-tl="opt-rec-customer-acme"
                    onClick={() => {
                      tl.setVar("booksRecCustomerName", "Acme Foods Ltd");
                      setCustomerOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                  >
                    Acme Foods Ltd
                  </div>
                  <div
                    data-tl="opt-rec-customer-harvest"
                    onClick={() => {
                      tl.setVar("booksRecCustomerName", "Harvest Tables Ltd");
                      setCustomerOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                  >
                    Harvest Tables Ltd
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reporting Tags */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="font-semibold text-gray-800">Reporting Tags</label>
            <div className="col-span-2">
              <span
                data-tl="link-rec-associate-tags"
                className="text-teal-600 font-medium hover:underline cursor-pointer"
              >
                Associate Tags
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center gap-4">
            <button
              type="button"
              data-tl="btn-save-recurring-expense"
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs shadow-sm cursor-pointer transition-colors"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              data-tl="btn-cancel-recurring-expense"
              onClick={handleBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
