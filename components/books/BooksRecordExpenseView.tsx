"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_EXPENSES,
  type ExpenseItem,
} from "./books-data";
import { ArrowLeft, Home, ChevronRight, Upload, X, CheckCircle2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksRecordExpenseView({ tl }: Props) {
  const currentTab = useTimelineVar<string>(tl, "booksExpenseFormTab", "record");

  // Tab 1: Record Expense state
  const [date, setDate] = useState(tl.getVar<string>("booksExpenseDate", "11/05/2026"));
  const [employee, setEmployee] = useState(tl.getVar<string>("booksExpenseEmployee", "None"));
  const [account, setAccount] = useState(
    tl.getVar<string>("booksExpenseAccount", "Select an account")
  );
  const [amount, setAmount] = useState(tl.getVar<string>("booksExpenseAmount", ""));
  const [amountIs, setAmountIs] = useState<"Tax Inclusive" | "Tax Exclusive">(
    tl.getVar<"Tax Inclusive" | "Tax Exclusive">("booksExpenseAmountIs", "Tax Exclusive")
  );
  const [paidThrough, setPaidThrough] = useState(
    tl.getVar<string>("booksExpensePaidThrough", "Select an account")
  );
  const [tax, setTax] = useState(tl.getVar<string>("booksExpenseTax", "Select a Tax"));
  const [vendor, setVendor] = useState(tl.getVar<string>("booksExpenseVendor", "None"));
  const [reference, setReference] = useState(tl.getVar<string>("booksExpenseRef", ""));
  const [notes, setNotes] = useState(tl.getVar<string>("booksExpenseNotes", ""));
  const [customer, setCustomer] = useState(
    tl.getVar<string>("booksExpenseCustomer", "Select or add a customer")
  );
  const [billable, setBillable] = useState(
    tl.getVar<boolean>("booksExpenseBillable", false)
  );
  const attachedReceipt = useTimelineVar<string>(tl, "booksAttachedReceipt", "");

  // Tab 2: Mileage state
  const [mileageDate, setMileageDate] = useState("11/05/2026");
  const [mileageEmployee, setMileageEmployee] = useState("None");
  const [calcMethod, setCalcMethod] = useState<"distance" | "odometer">(
    tl.getVar<"distance" | "odometer">("booksMileageCalcMethod", "distance")
  );
  const [distance, setDistance] = useState(tl.getVar<string>("booksMileageDistance", ""));
  const [mileagePaidThrough, setMileagePaidThrough] = useState(
    tl.getVar<string>("booksMileagePaidThrough", "Select an account")
  );
  const [mileageTax, setMileageTax] = useState(
    tl.getVar<string>("booksMileageTax", "Select a Tax")
  );
  const [mileageVendor, setMileageVendor] = useState(
    tl.getVar<string>("booksMileageVendor", "None")
  );
  const [mileageRef, setMileageRef] = useState("");
  const [mileageNotes, setMileageNotes] = useState("");
  const [mileageCustomer, setMileageCustomer] = useState("Select or add a customer");
  const [mileageBillable, setMileageBillable] = useState(false);

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
    setDate("11/05/2026");
    setEmployee("None");
    setAccount("Select an account");
    setAmount("");
    setAmountIs("Tax Exclusive");
    setPaidThrough("Select an account");
    setTax("Select a Tax");
    setVendor("None");
    setReference("");
    setNotes("");
    setCustomer("Select or add a customer");
    setBillable(false);
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
              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  data-tl="input-expense-date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    tl.setVar("booksExpenseDate", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Employee
                </label>
                <select
                  data-tl="select-expense-employee"
                  value={employee}
                  onChange={(e) => {
                    setEmployee(e.target.value);
                    tl.setVar("booksExpenseEmployee", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="None">None</option>
                  <option value="Sam Taylor">Sam Taylor</option>
                </select>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Expense Account<span className="text-red-500">*</span>
                </label>
                <select
                  data-tl="select-expense-account"
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                    tl.setVar("booksExpenseAccount", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="Select an account">Select an account</option>
                  <option value="Cost of Goods Sold">Cost of Goods Sold</option>
                  <option value="Advertising and Marketing">Advertising and Marketing</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Travel Expense">Travel Expense</option>
                </select>
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
                      setAmount(e.target.value);
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
                        setAmountIs("Tax Inclusive");
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
                        setAmountIs("Tax Exclusive");
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
                <select
                  data-tl="select-expense-paid-through"
                  value={paidThrough}
                  onChange={(e) => {
                    setPaidThrough(e.target.value);
                    tl.setVar("booksExpensePaidThrough", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="Select an account">Select an account</option>
                  <option value="Undeposited Funds">Undeposited Funds</option>
                  <option value="Accounts Receivable">Accounts Receivable</option>
                  <option value="Inventory Asset">Inventory Asset</option>
                  <option value="Prepaid Expenses">Prepaid Expenses</option>
                  <option value="Advance Tax">Advance Tax</option>
                  <option value="Employee Advance">Employee Advance</option>
                  <option value="Input Tax">Input Tax</option>
                  <option value="Petty Cash">Petty Cash</option>
                </select>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Tax
                </label>
                <select
                  data-tl="select-expense-tax"
                  value={tax}
                  onChange={(e) => {
                    setTax(e.target.value);
                    tl.setVar("booksExpenseTax", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="Select a Tax">Select a Tax</option>
                  <option value="No Tax">No Tax</option>
                  <option value="VAT Standard (20%)">VAT Standard (20%)</option>
                </select>
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
                <select
                  data-tl="select-expense-vendor"
                  value={vendor}
                  onChange={(e) => {
                    setVendor(e.target.value);
                    tl.setVar("booksExpenseVendor", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="None">None</option>
                  <option value="Greenfield Packaging Ltd">Greenfield Packaging Ltd</option>
                  <option value="Victor Stationery">Victor Stationery</option>
                  <option value="Harbour Logistics Ltd">Harbour Logistics Ltd</option>
                </select>
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
                    setReference(e.target.value);
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
                    setNotes(e.target.value);
                    tl.setVar("booksExpenseNotes", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] resize-none"
                />
              </div>

              <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                <label className="text-xs font-medium text-gray-700">
                  Customer Name
                </label>
                <select
                  data-tl="select-expense-customer"
                  value={customer}
                  onChange={(e) => {
                    setCustomer(e.target.value);
                    tl.setVar("booksExpenseCustomer", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="Select or add a customer">Select or add a customer</option>
                  <option value="Acme Foods Ltd">Acme Foods Ltd</option>
                  <option value="Harvest Tables Ltd">Harvest Tables Ltd</option>
                  <option value="Sterling Interiors">Sterling Interiors</option>
                  <option value="Brightway Stores">Brightway Stores</option>
                </select>
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
                      setBillable(e.target.checked);
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
                      setCalcMethod("distance");
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
                      setCalcMethod("odometer");
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
                      setDistance(e.target.value);
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
              <select
                data-tl="select-mileage-paid-through"
                value={mileagePaidThrough}
                onChange={(e) => {
                  setMileagePaidThrough(e.target.value);
                  tl.setVar("booksMileagePaidThrough", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="Select an account">Select an account</option>
                <option value="Employee Advance">Employee Advance</option>
                <option value="Undeposited Funds">Undeposited Funds</option>
                <option value="Petty Cash">Petty Cash</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Tax
              </label>
              <select
                data-tl="select-mileage-tax"
                value={mileageTax}
                onChange={(e) => {
                  setMileageTax(e.target.value);
                  tl.setVar("booksMileageTax", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="Select a Tax">Select a Tax</option>
                <option value="No Tax">No Tax</option>
                <option value="VAT Standard (20%)">VAT Standard (20%)</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Vendor
              </label>
              <select
                data-tl="select-mileage-vendor"
                value={mileageVendor}
                onChange={(e) => {
                  setMileageVendor(e.target.value);
                  tl.setVar("booksMileageVendor", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="None">None</option>
                <option value="Greenfield Packaging Ltd">Greenfield Packaging Ltd</option>
                <option value="Victor Stationery">Victor Stationery</option>
              </select>
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
                      </td>
                      <td className="p-2">
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
                      </td>
                      <td className="p-2">
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
