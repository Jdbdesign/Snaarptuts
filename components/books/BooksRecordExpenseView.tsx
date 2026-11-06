"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_EXPENSES,
  type ExpenseItem,
} from "./books-data";
import { ArrowLeft, Home, ChevronRight, ChevronDown, Upload, X, CheckCircle2 } from "lucide-react";
import { BooksDatePickerPopover } from "./BooksDatePickerPopover";

type Props = {
  tl: Timeline;
};

export function BooksRecordExpenseView({ tl }: Props) {
  const currentTab = useTimelineVar<string>(tl, "booksExpenseFormTab", "record");

  // Tab 1: Record Expense state
  const date = useTimelineVar<string>(tl, "booksExpenseDate", "11/05/2026");
  const isDatePickerOpen = useTimelineVar<boolean>(tl, "booksExpenseDatePickerOpen", false);
  const employee = useTimelineVar<string>(tl, "booksExpenseEmployee", "None");
  const isEmployeeOpen = useTimelineVar<boolean>(tl, "booksExpenseEmployeeOpen", false);
  const account = useTimelineVar<string>(tl, "booksExpenseAccount", "Select an account");
  const isAccountOpen = useTimelineVar<boolean>(tl, "booksExpenseAccountOpen", false);
  const amount = useTimelineVar<string>(tl, "booksExpenseAmount", "");
  const amountIs = useTimelineVar<"Tax Inclusive" | "Tax Exclusive">(
    tl,
    "booksExpenseAmountIs",
    "Tax Exclusive"
  );
  const paidThrough = useTimelineVar<string>(
    tl,
    "booksExpensePaidThrough",
    "Select an account"
  );
  const isPaidThroughOpen = useTimelineVar<boolean>(
    tl,
    "booksExpensePaidThroughOpen",
    false
  );
  const tax = useTimelineVar<string>(tl, "booksExpenseTax", "Select a Tax");
  const isTaxOpen = useTimelineVar<boolean>(tl, "booksExpenseTaxOpen", false);
  const vendor = useTimelineVar<string>(tl, "booksExpenseVendor", "None");
  const isVendorOpen = useTimelineVar<boolean>(tl, "booksExpenseVendorOpen", false);
  const reference = useTimelineVar<string>(tl, "booksExpenseRef", "");
  const notes = useTimelineVar<string>(tl, "booksExpenseNotes", "");
  const customer = useTimelineVar<string>(
    tl,
    "booksExpenseCustomer",
    "Select or add a customer"
  );
  const isCustomerOpen = useTimelineVar<boolean>(
    tl,
    "booksExpenseCustomerOpen",
    false
  );
  const billable = useTimelineVar<boolean>(tl, "booksExpenseBillable", false);
  const attachedReceipt = useTimelineVar<string>(tl, "booksAttachedReceipt", "");

  // Tab 2: Mileage state
  const [mileageDate, setMileageDate] = useState("11/05/2026");
  const [mileageEmployee, setMileageEmployee] = useState("None");
  const calcMethod = useTimelineVar<"distance" | "odometer">(
    tl,
    "booksMileageCalcMethod",
    "distance"
  );
  const distance = useTimelineVar<string>(tl, "booksMileageDistance", "");
  const mileagePaidThrough = useTimelineVar<string>(
    tl,
    "booksMileagePaidThrough",
    "Select an account"
  );
  const isMileagePaidThroughOpen = useTimelineVar<boolean>(
    tl,
    "booksMileagePaidThroughOpen",
    false
  );
  const mileageTax = useTimelineVar<string>(tl, "booksMileageTax", "Select a Tax");
  const isMileageTaxOpen = useTimelineVar<boolean>(tl, "booksMileageTaxOpen", false);
  const mileageVendor = useTimelineVar<string>(tl, "booksMileageVendor", "None");
  const isMileageVendorOpen = useTimelineVar<boolean>(
    tl,
    "booksMileageVendorOpen",
    false
  );
  const [mileageRef, setMileageRef] = useState("");
  const [mileageNotes, setMileageNotes] = useState("");
  const [mileageCustomer, setMileageCustomer] = useState("Select or add a customer");
  const [mileageBillable, setMileageBillable] = useState(false);

  // Tab 3: Bulk Add state
  const isBulkRow0DateOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow0DatePickerOpen",
    false
  );
  const isBulkRow0AccountOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow0AccountOpen",
    false
  );
  const isBulkRow0PaidThroughOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow0PaidThroughOpen",
    false
  );
  const isBulkRow0VendorOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow0VendorOpen",
    false
  );

  const isBulkRow1DateOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow1DatePickerOpen",
    false
  );
  const isBulkRow1AccountOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow1AccountOpen",
    false
  );
  const isBulkRow1PaidThroughOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow1PaidThroughOpen",
    false
  );
  const isBulkRow1VendorOpen = useTimelineVar<boolean>(
    tl,
    "booksBulkRow1VendorOpen",
    false
  );

  // Tab 3: Bulk Add state (10 rows)
  const [bulkRows, setBulkRows] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: `bulk-${i}`,
      date: i === 0 ? "11/05/2026" : "mm/dd/yyyy",
      account: i === 0 ? "Select an account" : "Select an account",
      amount: "",
      paidThrough: "Select an account",
      vendor: "None",
      tax: "No Tax",
      customer: "None",
      projects: "None",
    }))
  );

  const parsedAmount = parseFloat(amount) || 0;
  const isVatStandard = tax === "VAT Standard (20%)";
  const taxAmount = isVatStandard ? parsedAmount * 0.2 : 0;
  const totalAmount = parsedAmount + taxAmount;

  const mileageDist = parseFloat(distance) || 0;
  const mileageTotal = (mileageDist * 0.45).toFixed(2);

  const handleBack = () => {
    tl.setVar("booksView", "expenses");
    tl.setUrl(BOOKS_URLS.expenses);
  };

  const handleSaveExpense = () => {
    const finalAmount = totalAmount > 0 ? totalAmount : 1200.0;
    const newExp: ExpenseItem = {
      id: `exp-${(finalAmount * 10).toFixed(0)}`,
      date: date || "11/05/2026",
      reference: reference || "INV-1123",
      amount: finalAmount,
      status: "Unbilled",
      expenseAccount: account === "Select an account" ? "Cost of Goods Sold" : account,
      amountIs: amountIs,
      paidThrough: paidThrough === "Select an account" ? "Undeposited Funds" : paidThrough,
      vendor: vendor === "None" ? "Greenfield Packaging Ltd" : vendor,
      tax: tax === "Select a Tax" ? "VAT Standard (20%)" : tax,
      notes: notes || "Monthly warehouse supplies and packaging materials",
      customerName: customer === "Select or add a customer" ? "Acme Foods Ltd" : customer,
      billable: billable,
      created: "11/05/2026",
    };

    const currentExpenses = tl.getVar<ExpenseItem[]>("booksExpenses", INITIAL_EXPENSES);
    tl.setVar("booksExpenses", [newExp, ...currentExpenses]);
    tl.setVar("booksToastText", "Expense saved successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "expenses");
    tl.setUrl(BOOKS_URLS.expenses);
  };

  const handleSaveAndNew = () => {
    const finalAmount = totalAmount > 0 ? totalAmount : 1200.0;
    const newExp: ExpenseItem = {
      id: `exp-${(finalAmount * 10).toFixed(0)}`,
      date: date || "11/05/2026",
      reference: reference || "INV-1123",
      amount: finalAmount,
      status: "Unbilled",
      expenseAccount: account === "Select an account" ? "Cost of Goods Sold" : account,
      amountIs: amountIs,
      paidThrough: paidThrough === "Select an account" ? "Undeposited Funds" : paidThrough,
      vendor: vendor === "None" ? "Greenfield Packaging Ltd" : vendor,
      tax: tax === "Select a Tax" ? "VAT Standard (20%)" : tax,
      notes: notes || "Monthly warehouse supplies and packaging materials",
      customerName: customer === "Select or add a customer" ? "Acme Foods Ltd" : customer,
      billable: billable,
      created: "11/05/2026",
    };

    const currentExpenses = tl.getVar<ExpenseItem[]>("booksExpenses", INITIAL_EXPENSES);
    tl.setVar("booksExpenses", [newExp, ...currentExpenses]);
    tl.setVar("booksToastText", "Expense saved successfully");
    tl.setVar("booksToastOpen", true);

    // Reset form to empty
    tl.setVar("booksExpenseDate", "11/05/2026");
    tl.setVar("booksExpenseEmployee", "None");
    tl.setVar("booksExpenseAccount", "Select an account");
    tl.setVar("booksExpenseAmount", "");
    tl.setVar("booksExpenseAmountIs", "Tax Exclusive");
    tl.setVar("booksExpensePaidThrough", "Select an account");
    tl.setVar("booksExpenseTax", "Select a Tax");
    tl.setVar("booksExpenseVendor", "None");
    tl.setVar("booksExpenseRef", "");
    tl.setVar("booksExpenseNotes", "");
    tl.setVar("booksExpenseCustomer", "Select or add a customer");
    tl.setVar("booksExpenseBillable", false);
    tl.setVar("booksAttachedReceipt", "");
  };

  const handleSaveMileage = () => {
    const finalAmount = parseFloat(mileageTotal) || 9.0;
    const newExp: ExpenseItem = {
      id: `exp-mileage-${Date.now().toString().slice(-4)}`,
      date: mileageDate || "11/05/2026",
      reference: mileageRef || "MIL-002",
      amount: finalAmount,
      status: "Unbilled",
      expenseAccount: "Travel Expense",
      amountIs: "Tax Exclusive",
      paidThrough: mileagePaidThrough === "Select an account" ? "Employee Advance" : mileagePaidThrough,
      vendor: mileageVendor === "None" ? "Greenfield Packaging Ltd" : mileageVendor,
      tax: mileageTax === "Select a Tax" ? "No Tax" : mileageTax,
      notes: mileageNotes || "Client site visit (20 km)",
      customerName: mileageCustomer === "Select or add a customer" ? "Acme Foods Ltd" : mileageCustomer,
      billable: mileageBillable,
      created: "11/05/2026",
    };

    const currentExpenses = tl.getVar<ExpenseItem[]>("booksExpenses", INITIAL_EXPENSES);
    tl.setVar("booksExpenses", [newExp, ...currentExpenses]);
    tl.setVar("booksToastText", "Expense saved successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "expenses");
    tl.setUrl(BOOKS_URLS.expenses);
  };

  const handleSaveBulk = () => {
    const row1Amount = parseFloat(bulkRows[0].amount) || 1000.0;
    const row2Amount = parseFloat(bulkRows[1].amount) || 250.0;

    const newExp1: ExpenseItem = {
      id: "exp-bulk-1",
      date: bulkRows[0].date === "mm/dd/yyyy" ? "11/05/2026" : bulkRows[0].date,
      reference: "BLK-01",
      amount: row1Amount,
      status: "Unbilled",
      expenseAccount: bulkRows[0].account === "Select an account" ? "Advertising and Marketing" : bulkRows[0].account,
      amountIs: "Tax Exclusive",
      paidThrough: bulkRows[0].paidThrough === "Select an account" ? "Accounts Receivable" : bulkRows[0].paidThrough,
      vendor: bulkRows[0].vendor === "None" ? "Greenfield Packaging Ltd" : bulkRows[0].vendor,
      tax: "No Tax",
      created: "11/05/2026",
    };

    const newExp2: ExpenseItem = {
      id: "exp-bulk-2",
      date: bulkRows[1].date === "mm/dd/yyyy" ? "11/05/2026" : bulkRows[1].date,
      reference: "BLK-02",
      amount: row2Amount,
      status: "Unbilled",
      expenseAccount: bulkRows[1].account === "Select an account" ? "Office Supplies" : bulkRows[1].account,
      amountIs: "Tax Exclusive",
      paidThrough: bulkRows[1].paidThrough === "Select an account" ? "Petty Cash" : bulkRows[1].paidThrough,
      vendor: bulkRows[1].vendor === "None" ? "Victor Stationery" : bulkRows[1].vendor,
      tax: "No Tax",
      created: "11/05/2026",
    };

    const currentExpenses = tl.getVar<ExpenseItem[]>("booksExpenses", INITIAL_EXPENSES);
    tl.setVar("booksExpenses", [newExp1, newExp2, ...currentExpenses]);
    tl.setVar("booksToastText", "Expenses saved successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "expenses");
    tl.setUrl(BOOKS_URLS.expenses);
  };

  return (
    <div
      data-tl="books-record-expense-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-expenses"
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>|</span>
          <Home className="w-3.5 h-3.5 text-gray-400" />
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Expenses</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-medium">New</span>
        </div>

        {/* Tabs Row */}
        <div className="border-b border-gray-200">
          <div className="flex items-center gap-8 text-xs font-medium text-gray-500">
            <button
              type="button"
              data-tl="tab-record-expense"
              onClick={() => tl.setVar("booksExpenseFormTab", "record")}
              className={`pb-3 transition-colors cursor-pointer ${
                currentTab === "record"
                  ? "border-b-2 border-[#2563EB] text-[#2563EB] font-semibold"
                  : "hover:text-gray-700"
              }`}
            >
              Record Expense
            </button>
            <button
              type="button"
              data-tl="tab-record-mileage"
              onClick={() => tl.setVar("booksExpenseFormTab", "mileage")}
              className={`pb-3 transition-colors cursor-pointer ${
                currentTab === "mileage"
                  ? "border-b-2 border-[#2563EB] text-[#2563EB] font-semibold"
                  : "hover:text-gray-700"
              }`}
            >
              Record Mileage
            </button>
            <button
              type="button"
              data-tl="tab-bulk-add-expenses"
              onClick={() => tl.setVar("booksExpenseFormTab", "bulk")}
              className={`pb-3 transition-colors cursor-pointer ${
                currentTab === "bulk"
                  ? "border-b-2 border-[#2563EB] text-[#2563EB] font-semibold"
                  : "hover:text-gray-700"
              }`}
            >
              Bulk Add Expenses
            </button>
          </div>
        </div>

        {/* Tab 1: Record Expense */}
        {currentTab === "record" && (
          <div className="grid grid-cols-[1fr_260px] gap-8 items-start pt-2">
            {/* Form Fields Left */}
            <div className="space-y-4">
              <div className="grid grid-cols-[160px_1fr] items-center gap-4 relative">
                <label className="text-xs font-medium text-gray-700">
                  Date<span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    data-tl="input-expense-date"
                    value={date}
                    readOnly
                    onClick={() => tl.setVar("booksExpenseDatePickerOpen", !isDatePickerOpen)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
                  />
                  {isDatePickerOpen && (
                    <BooksDatePickerPopover
                      onSelect={(d) => {
                        tl.setVar("booksExpenseDate", d || "11/05/2026");
                        tl.setVar("booksExpenseDatePickerOpen", false);
                      }}
                      onClose={() => tl.setVar("booksExpenseDatePickerOpen", false)}
                      todayDateStr="11/05/2026"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Employee
                </label>
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-expense-employee"
                    onClick={() => tl.setVar("booksExpenseEmployeeOpen", !isEmployeeOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                  >
                    <span>{employee}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  {isEmployeeOpen && (
                    <div
                      data-tl="dropdown-expense-employee"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    >
                      <button
                        type="button"
                        data-tl="opt-employee-none"
                        onClick={() => {
                          tl.setVar("booksExpenseEmployee", "None");
                          tl.setVar("booksExpenseEmployeeOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          employee === "None" ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        None
                      </button>
                      <button
                        type="button"
                        data-tl="opt-employee-sam"
                        onClick={() => {
                          tl.setVar("booksExpenseEmployee", "Sam Taylor");
                          tl.setVar("booksExpenseEmployeeOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          employee === "Sam Taylor" ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Sam Taylor
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Expense Account<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-expense-account"
                    onClick={() => tl.setVar("booksExpenseAccountOpen", !isAccountOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                  >
                    <span>{account}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  {isAccountOpen && (
                    <div
                      data-tl="dropdown-expense-account"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg max-h-48 overflow-y-auto"
                    >
                      {[
                        { label: "Select an account", id: "select" },
                        { label: "Cost of Goods Sold", id: "cogs" },
                        { label: "Advertising and Marketing", id: "advertising" },
                        { label: "Office Supplies", id: "supplies" },
                        { label: "Travel Expense", id: "travel" },
                      ].map((acc) => (
                        <button
                          key={acc.id}
                          type="button"
                          data-tl={`opt-account-${acc.id}`}
                          onClick={() => {
                            tl.setVar("booksExpenseAccount", acc.label);
                            tl.setVar("booksExpenseAccountOpen", false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                            account === acc.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {acc.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Amount<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-700 shrink-0">
                    <span>GBP ˅</span>
                  </div>
                  <input
                    type="text"
                    data-tl="input-expense-amount"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      tl.setVar("booksExpenseAmount", e.target.value);
                    }}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Amount Is
                </label>
                <div className="flex items-center gap-6 text-xs text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="amountIs"
                      data-tl="radio-tax-inclusive"
                      checked={amountIs === "Tax Inclusive"}
                      onChange={() => {
                        tl.setVar("booksExpenseAmountIs", "Tax Inclusive");
                      }}
                      className="text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span>Tax Inclusive</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="amountIs"
                      data-tl="radio-tax-exclusive"
                      checked={amountIs === "Tax Exclusive"}
                      onChange={() => {
                        tl.setVar("booksExpenseAmountIs", "Tax Exclusive");
                      }}
                      className="text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span>Tax Exclusive</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Paid Through<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-expense-paid-through"
                    onClick={() => tl.setVar("booksExpensePaidThroughOpen", !isPaidThroughOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                  >
                    <span>{paidThrough}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  {isPaidThroughOpen && (
                    <div
                      data-tl="dropdown-expense-paid-through"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg max-h-48 overflow-y-auto"
                    >
                      {[
                        { label: "Select an account", id: "select" },
                        { label: "Undeposited Funds", id: "undeposited" },
                        { label: "Accounts Receivable", id: "ar" },
                        { label: "Inventory Asset", id: "inventory" },
                        { label: "Prepaid Expenses", id: "prepaid" },
                        { label: "Advance Tax", id: "tax" },
                        { label: "Employee Advance", id: "advance" },
                        { label: "Input Tax", id: "input-tax" },
                        { label: "Petty Cash", id: "petty-cash" },
                      ].map((pt) => (
                        <button
                          key={pt.id}
                          type="button"
                          data-tl={`opt-paidthrough-${pt.id}`}
                          onClick={() => {
                            tl.setVar("booksExpensePaidThrough", pt.label);
                            tl.setVar("booksExpensePaidThroughOpen", false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                            paidThrough === pt.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Tax
                </label>
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-expense-tax"
                    onClick={() => tl.setVar("booksExpenseTaxOpen", !isTaxOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                  >
                    <span>{tax}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  {isTaxOpen && (
                    <div
                      data-tl="dropdown-expense-tax"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    >
                      {[
                        { label: "Select a Tax", id: "select" },
                        { label: "No Tax", id: "no-tax" },
                        { label: "VAT Standard (20%)", id: "vat-20" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          data-tl={`opt-tax-${t.id}`}
                          onClick={() => {
                            tl.setVar("booksExpenseTax", t.label);
                            tl.setVar("booksExpenseTaxOpen", false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                            tax === t.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Total incl. tax line */}
              {(isVatStandard || parsedAmount > 0) && (
                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-xs font-medium text-gray-700">
                    Total incl. tax
                  </label>
                  <div
                    data-tl="text-total-incl-tax"
                    className="text-xs font-medium text-gray-900"
                  >
                    {totalAmount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                    ({parsedAmount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} +{" "}
                    {taxAmount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tax)
                  </div>
                </div>
              )}

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Vendor
                </label>
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-expense-vendor"
                    onClick={() => tl.setVar("booksExpenseVendorOpen", !isVendorOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                  >
                    <span>{vendor}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  {isVendorOpen && (
                    <div
                      data-tl="dropdown-expense-vendor"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    >
                      {[
                        { label: "None", id: "none" },
                        { label: "Greenfield Packaging Ltd", id: "greenfield" },
                        { label: "Victor Stationery", id: "victor" },
                        { label: "Harbour Logistics Ltd", id: "harbour" },
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          data-tl={`opt-vendor-${v.id}`}
                          onClick={() => {
                            tl.setVar("booksExpenseVendor", v.label);
                            tl.setVar("booksExpenseVendorOpen", false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                            vendor === v.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Reference#
                </label>
                <input
                  type="text"
                  data-tl="input-expense-ref"
                  placeholder="Reference number"
                  value={reference}
                  onChange={(e) => {
                    tl.setVar("booksExpenseRef", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  rows={2}
                  data-tl="input-expense-notes"
                  placeholder="Max. 500 characters"
                  value={notes}
                  onChange={(e) => {
                    tl.setVar("booksExpenseNotes", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] resize-none"
                />
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Customer Name
                </label>
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-expense-customer"
                    onClick={() => tl.setVar("booksExpenseCustomerOpen", !isCustomerOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                  >
                    <span>{customer}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  {isCustomerOpen && (
                    <div
                      data-tl="dropdown-expense-customer"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    >
                      {[
                        { label: "Select or add a customer", id: "select" },
                        { label: "Acme Foods Ltd", id: "acme" },
                        { label: "Harvest Tables Ltd", id: "harvest" },
                        { label: "Sterling Interiors", id: "sterling" },
                        { label: "Brightway Stores", id: "brightway" },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          data-tl={`opt-customer-${c.id}`}
                          onClick={() => {
                            tl.setVar("booksExpenseCustomer", c.label);
                            tl.setVar("booksExpenseCustomerOpen", false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                            customer === c.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Billable
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    data-tl="check-expense-billable"
                    checked={billable}
                    onChange={(e) => {
                      tl.setVar("booksExpenseBillable", e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Mark as billable</span>
                </label>
              </div>

              {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  data-tl="btn-save-expense"
                  onClick={handleSaveExpense}
                  className="px-5 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Save (Opt+S)
                </button>
                <button
                  type="button"
                  data-tl="btn-save-and-new-expense"
                  onClick={handleSaveAndNew}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
                >
                  Save and New (Opt+N)
                </button>
                <button
                  type="button"
                  data-tl="btn-cancel-expense"
                  onClick={handleBack}
                  className="px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Upload Box Right */}
            <div
              data-tl="box-expense-upload"
              className="border border-dashed border-gray-300 rounded-xl p-5 text-center bg-gray-50/40 flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-800">
                  Drag or Drop your Receipts
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  Maximum file size allowed is 10MB
                </div>
              </div>

              {attachedReceipt ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-xs text-[#1E40AF]">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span className="font-medium truncate max-w-[130px]">
                    {attachedReceipt}
                  </span>
                  <X
                    className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => tl.setVar("booksAttachedReceipt", "")}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  data-tl="btn-upload-receipts"
                  onClick={() => tl.setVar("booksExpenseFilePickerOpen", true)}
                  className="px-3.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
                >
                  Upload your Files
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Record Mileage */}
        {currentTab === "mileage" && (
          <div className="space-y-4 pt-2 max-w-2xl">
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Date<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-mileage-date"
                value={mileageDate}
                onChange={(e) => setMileageDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Employee
              </label>
              <select
                data-tl="select-mileage-employee"
                value={mileageEmployee}
                onChange={(e) => setMileageEmployee(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="None">None</option>
                <option value="Sam Taylor">Sam Taylor</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Calculate mileage using<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-6 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="calcMethod"
                    data-tl="radio-calc-distance"
                    checked={calcMethod === "distance"}
                    onChange={() => {
                      tl.setVar("booksMileageCalcMethod", "distance");
                    }}
                    className="text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Distance travelled</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="calcMethod"
                    data-tl="radio-calc-odometer"
                    checked={calcMethod === "odometer"}
                    onChange={() => {
                      tl.setVar("booksMileageCalcMethod", "odometer");
                    }}
                    className="text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Odometer reading</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-start gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Distance<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="space-y-1">
                <div className="flex">
                  <input
                    type="text"
                    data-tl="input-mileage-distance"
                    placeholder="0"
                    value={distance}
                    onChange={(e) => {
                      tl.setVar("booksMileageDistance", e.target.value);
                    }}
                    className="flex-1 px-3 py-2 text-xs border border-r-0 border-gray-200 rounded-l-lg bg-white focus:outline-none focus:border-[#2563EB]"
                  />
                  <div className="px-3 py-2 border border-gray-200 rounded-r-lg bg-gray-50 text-xs text-gray-500 shrink-0">
                    Kilometer(s)
                  </div>
                </div>
                <div
                  data-tl="text-mileage-rate"
                  className="text-[11px] text-gray-500 flex items-center gap-1"
                >
                  <span>Rate per km = GBP 0.45</span>
                  <button type="button" className="text-[#2563EB] hover:underline">
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Amount<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-500 shrink-0">
                  <span>GBP</span>
                </div>
                <input
                  type="text"
                  readOnly
                  data-tl="input-mileage-amount"
                  value={mileageTotal}
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 font-medium text-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Amount Is
              </label>
              <div className="flex items-center gap-6 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mileageAmountIs"
                    defaultChecked
                    className="text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Tax Exclusive</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mileageAmountIs"
                    className="text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Tax Inclusive</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Paid Through<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-mileage-paid-through"
                  onClick={() => tl.setVar("booksMileagePaidThroughOpen", !isMileagePaidThroughOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <span>{mileagePaidThrough}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>
                {isMileagePaidThroughOpen && (
                  <div
                    data-tl="dropdown-mileage-paid-through"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {[
                      { label: "Select an account", id: "select" },
                      { label: "Employee Advance", id: "advance" },
                      { label: "Undeposited Funds", id: "undeposited" },
                      { label: "Petty Cash", id: "petty" },
                    ].map((pt) => (
                      <button
                        key={pt.id}
                        type="button"
                        data-tl={`opt-mileage-paidthrough-${pt.id}`}
                        onClick={() => {
                          tl.setVar("booksMileagePaidThrough", pt.label);
                          tl.setVar("booksMileagePaidThroughOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          mileagePaidThrough === pt.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Tax
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-mileage-tax"
                  onClick={() => tl.setVar("booksMileageTaxOpen", !isMileageTaxOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <span>{mileageTax}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>
                {isMileageTaxOpen && (
                  <div
                    data-tl="dropdown-mileage-tax"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {[
                      { label: "Select a Tax", id: "select" },
                      { label: "No Tax", id: "none" },
                      { label: "VAT Standard (20%)", id: "vat-20" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        data-tl={`opt-mileage-tax-${t.id}`}
                        onClick={() => {
                          tl.setVar("booksMileageTax", t.label);
                          tl.setVar("booksMileageTaxOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          mileageTax === t.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Vendor
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-mileage-vendor"
                  onClick={() => tl.setVar("booksMileageVendorOpen", !isMileageVendorOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <span>{mileageVendor}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>
                {isMileageVendorOpen && (
                  <div
                    data-tl="dropdown-mileage-vendor"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {[
                      { label: "None", id: "none" },
                      { label: "Greenfield Packaging Ltd", id: "greenfield" },
                      { label: "Victor Stationery", id: "victor" },
                    ].map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        data-tl={`opt-mileage-vendor-${v.id}`}
                        onClick={() => {
                          tl.setVar("booksMileageVendor", v.label);
                          tl.setVar("booksMileageVendorOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          mileageVendor === v.label ? "text-[#2563EB] font-medium bg-[#EFF6FF]" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Reference#
              </label>
              <input
                type="text"
                data-tl="input-mileage-ref"
                value={mileageRef}
                onChange={(e) => setMileageRef(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Notes
              </label>
              <textarea
                rows={2}
                data-tl="input-mileage-notes"
                placeholder="Max. 500 characters"
                value={mileageNotes}
                onChange={(e) => setMileageNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Customer Name
              </label>
              <select
                data-tl="select-mileage-customer"
                value={mileageCustomer}
                onChange={(e) => setMileageCustomer(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="Select or add a customer">Select or add a customer</option>
                <option value="Acme Foods Ltd">Acme Foods Ltd</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <div></div>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  data-tl="check-mileage-billable"
                  checked={mileageBillable}
                  onChange={(e) => setMileageBillable(e.target.checked)}
                  className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>Billable</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                data-tl="btn-save-mileage"
                onClick={handleSaveMileage}
                className="px-5 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Save (Opt+S)
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Bulk Add Expenses */}
        {currentTab === "bulk" && (
          <div className="space-y-4 pt-2">
            <div
              data-tl="container-bulk-expenses"
              className="border border-gray-200 rounded-xl overflow-x-auto shadow-xs"
            >
              <table className="w-full min-w-[950px] text-left text-xs">
                <thead className="bg-[#F9FAFB] border-b border-gray-200 text-gray-500 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 whitespace-nowrap">DATE*</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">EXPENSE ACCOUNT*</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">AMOUNT*</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">PAID THROUGH*</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">VENDOR</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">SALES TAX</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">CUSTOMER NAME</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">PROJECTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bulkRows.map((r, idx) => (
                    <tr key={r.id}>
                      <td className="p-2">
                        {idx <= 1 ? (
                          <div className="relative">
                            <input
                              type="text"
                              data-tl={`bulk-date-${idx}`}
                              value={r.date}
                              readOnly
                              onClick={() =>
                                tl.setVar(
                                  idx === 0
                                    ? "booksBulkRow0DatePickerOpen"
                                    : "booksBulkRow1DatePickerOpen",
                                  !(idx === 0 ? isBulkRow0DateOpen : isBulkRow1DateOpen)
                                )
                              }
                              className="w-28 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB] cursor-pointer"
                            />
                            {(idx === 0 ? isBulkRow0DateOpen : isBulkRow1DateOpen) && (
                              <BooksDatePickerPopover
                                onSelect={(d) => {
                                  const updated = [...bulkRows];
                                  updated[idx].date = d || "11/05/2026";
                                  setBulkRows(updated);
                                  tl.setVar(
                                    idx === 0
                                      ? "booksBulkRow0DatePickerOpen"
                                      : "booksBulkRow1DatePickerOpen",
                                    false
                                  );
                                }}
                                onClose={() =>
                                  tl.setVar(
                                    idx === 0
                                      ? "booksBulkRow0DatePickerOpen"
                                      : "booksBulkRow1DatePickerOpen",
                                    false
                                  )
                                }
                                todayDateStr="11/05/2026"
                              />
                            )}
                          </div>
                        ) : (
                          <input
                            type="text"
                            data-tl={`bulk-date-${idx}`}
                            value={r.date}
                            onChange={(e) => {
                              const updated = [...bulkRows];
                              updated[idx].date = e.target.value;
                              setBulkRows(updated);
                            }}
                            className="w-28 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          />
                        )}
                      </td>
                      <td className="p-2">
                        {idx <= 1 ? (
                          <div className="relative">
                            <button
                              type="button"
                              data-tl={`bulk-select-account-${idx}`}
                              onClick={() =>
                                tl.setVar(
                                  idx === 0
                                    ? "booksBulkRow0AccountOpen"
                                    : "booksBulkRow1AccountOpen",
                                  !(idx === 0 ? isBulkRow0AccountOpen : isBulkRow1AccountOpen)
                                )
                              }
                              className="w-36 flex items-center justify-between px-2 py-1.5 border border-gray-200 rounded bg-white text-xs text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                            >
                              <span>{r.account}</span>
                              <ChevronDown className="w-3 h-3 text-gray-500" />
                            </button>
                            {(idx === 0 ? isBulkRow0AccountOpen : isBulkRow1AccountOpen) && (
                              <div
                                data-tl={`dropdown-bulk-account-${idx}`}
                                className="absolute left-0 top-[calc(100%+4px)] z-30 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                              >
                                {[
                                  { label: "Cost of Goods Sold", id: "cogs" },
                                  { label: "Advertising and Marketing", id: "advertising" },
                                  { label: "Office Supplies", id: "supplies" },
                                ].map((acc) => (
                                  <button
                                    key={acc.id}
                                    type="button"
                                    data-tl={`opt-bulk-account-${acc.id}-${idx}`}
                                    onClick={() => {
                                      const updated = [...bulkRows];
                                      updated[idx].account = acc.label;
                                      setBulkRows(updated);
                                      tl.setVar(
                                        idx === 0
                                          ? "booksBulkRow0AccountOpen"
                                          : "booksBulkRow1AccountOpen",
                                        false
                                      );
                                    }}
                                    className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] cursor-pointer"
                                  >
                                    {acc.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <select
                            data-tl={`bulk-account-${idx}`}
                            value={r.account}
                            onChange={(e) => {
                              const updated = [...bulkRows];
                              updated[idx].account = e.target.value;
                              setBulkRows(updated);
                            }}
                            className="w-36 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          >
                            <option value="Select an account">Select an account</option>
                            <option value="Advertising and Marketing">Advertising and Marketing</option>
                            <option value="Office Supplies">Office Supplies</option>
                            <option value="Cost of Goods Sold">Cost of Goods Sold</option>
                          </select>
                        )}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <span className="text-[10px] bg-gray-100 border border-gray-200 px-1 py-1 rounded text-gray-500">
                            GBP
                          </span>
                          <input
                            type="text"
                            data-tl={`bulk-amount-${idx}`}
                            placeholder="0"
                            value={r.amount}
                            onChange={(e) => {
                              const updated = [...bulkRows];
                              updated[idx].amount = e.target.value;
                              setBulkRows(updated);
                            }}
                            className="w-20 px-1.5 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                      </td>
                      <td className="p-2">
                        {idx <= 1 ? (
                          <div className="relative">
                            <button
                              type="button"
                              data-tl={`bulk-select-paidthrough-${idx}`}
                              onClick={() =>
                                tl.setVar(
                                  idx === 0
                                    ? "booksBulkRow0PaidThroughOpen"
                                    : "booksBulkRow1PaidThroughOpen",
                                  !(idx === 0 ? isBulkRow0PaidThroughOpen : isBulkRow1PaidThroughOpen)
                                )
                              }
                              className="w-36 flex items-center justify-between px-2 py-1.5 border border-gray-200 rounded bg-white text-xs text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                            >
                              <span>{r.paidThrough}</span>
                              <ChevronDown className="w-3 h-3 text-gray-500" />
                            </button>
                            {(idx === 0 ? isBulkRow0PaidThroughOpen : isBulkRow1PaidThroughOpen) && (
                              <div
                                data-tl={`dropdown-bulk-paidthrough-${idx}`}
                                className="absolute left-0 top-[calc(100%+4px)] z-30 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                              >
                                {[
                                  { label: "Accounts Receivable", id: "ar" },
                                  { label: "Petty Cash", id: "petty" },
                                  { label: "Undeposited Funds", id: "undeposited" },
                                ].map((pt) => (
                                  <button
                                    key={pt.id}
                                    type="button"
                                    data-tl={`opt-bulk-paidthrough-${pt.id}-${idx}`}
                                    onClick={() => {
                                      const updated = [...bulkRows];
                                      updated[idx].paidThrough = pt.label;
                                      setBulkRows(updated);
                                      tl.setVar(
                                        idx === 0
                                          ? "booksBulkRow0PaidThroughOpen"
                                          : "booksBulkRow1PaidThroughOpen",
                                        false
                                      );
                                    }}
                                    className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] cursor-pointer"
                                  >
                                    {pt.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <select
                            data-tl={`bulk-paid-through-${idx}`}
                            value={r.paidThrough}
                            onChange={(e) => {
                              const updated = [...bulkRows];
                              updated[idx].paidThrough = e.target.value;
                              setBulkRows(updated);
                            }}
                            className="w-36 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          >
                            <option value="Select an account">Select an account</option>
                            <option value="Accounts Receivable">Accounts Receivable</option>
                            <option value="Petty Cash">Petty Cash</option>
                            <option value="Undeposited Funds">Undeposited Funds</option>
                          </select>
                        )}
                      </td>
                      <td className="p-2">
                        {idx <= 1 ? (
                          <div className="relative">
                            <button
                              type="button"
                              data-tl={`bulk-select-vendor-${idx}`}
                              onClick={() =>
                                tl.setVar(
                                  idx === 0
                                    ? "booksBulkRow0VendorOpen"
                                    : "booksBulkRow1VendorOpen",
                                  !(idx === 0 ? isBulkRow0VendorOpen : isBulkRow1VendorOpen)
                                )
                              }
                              className="w-32 flex items-center justify-between px-2 py-1.5 border border-gray-200 rounded bg-white text-xs text-left focus:outline-none focus:border-[#2563EB] cursor-pointer"
                            >
                              <span>{r.vendor}</span>
                              <ChevronDown className="w-3 h-3 text-gray-500" />
                            </button>
                            {(idx === 0 ? isBulkRow0VendorOpen : isBulkRow1VendorOpen) && (
                              <div
                                data-tl={`dropdown-bulk-vendor-${idx}`}
                                className="absolute left-0 top-[calc(100%+4px)] z-30 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                              >
                                {[
                                  { label: "Greenfield Packaging Ltd", id: "greenfield" },
                                  { label: "Victor Stationery", id: "victor" },
                                ].map((v) => (
                                  <button
                                    key={v.id}
                                    type="button"
                                    data-tl={`opt-bulk-vendor-${v.id}-${idx}`}
                                    onClick={() => {
                                      const updated = [...bulkRows];
                                      updated[idx].vendor = v.label;
                                      setBulkRows(updated);
                                      tl.setVar(
                                        idx === 0
                                          ? "booksBulkRow0VendorOpen"
                                          : "booksBulkRow1VendorOpen",
                                        false
                                      );
                                    }}
                                    className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] cursor-pointer"
                                  >
                                    {v.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <select
                            data-tl={`bulk-vendor-${idx}`}
                            value={r.vendor}
                            onChange={(e) => {
                              const updated = [...bulkRows];
                              updated[idx].vendor = e.target.value;
                              setBulkRows(updated);
                            }}
                            className="w-32 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          >
                            <option value="None">None</option>
                            <option value="Greenfield Packaging Ltd">Greenfield Packaging Ltd</option>
                            <option value="Victor Stationery">Victor Stationery</option>
                          </select>
                        )}
                      </td>
                      <td className="p-2">
                        <div className="space-y-1">
                          <select
                            data-tl={`bulk-tax-${idx}`}
                            value={r.tax}
                            onChange={(e) => {
                              const updated = [...bulkRows];
                              updated[idx].tax = e.target.value;
                              setBulkRows(updated);
                            }}
                            className="w-28 px-2 py-1 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          >
                            <option value="No Tax">No Tax</option>
                            <option value="VAT Standard (20%)">VAT Standard (20%)</option>
                          </select>
                          <label className="flex items-center gap-1 text-[10px] text-gray-500">
                            <input type="checkbox" className="w-3 h-3 text-[#2563EB]" />
                            <span>Tax Inclusive</span>
                          </label>
                        </div>
                      </td>
                      <td className="p-2">
                        <select
                          data-tl={`bulk-customer-${idx}`}
                          value={r.customer}
                          onChange={(e) => {
                            const updated = [...bulkRows];
                            updated[idx].customer = e.target.value;
                            setBulkRows(updated);
                          }}
                          className="w-28 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="None">None</option>
                          <option value="Acme Foods Ltd">Acme Foods Ltd</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          data-tl={`bulk-projects-${idx}`}
                          value={r.projects}
                          onChange={(e) => {
                            const updated = [...bulkRows];
                            updated[idx].projects = e.target.value;
                            setBulkRows(updated);
                          }}
                          className="w-24 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="None">None</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              data-tl="btn-bulk-add-more"
              className="flex items-center gap-1.5 text-xs text-[#2563EB] hover:underline pt-1 cursor-pointer"
            >
              <span>+ Add More Expenses</span>
            </button>

            {/* Footer Actions */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                data-tl="btn-save-bulk-expenses"
                onClick={handleSaveBulk}
                className="px-6 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                data-tl="btn-cancel-bulk-expenses"
                onClick={handleBack}
                className="px-5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
