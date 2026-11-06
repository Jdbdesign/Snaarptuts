"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type InvoiceItem,
  type InvoiceLineItem,
  type PaymentInstallment,
  INITIAL_INVOICES,
  INVOICE_TERMS_OPTIONS,
  QUOTE_TAX_OPTIONS,
  QUOTE_SALESPERSONS,
} from "./books-data";
import {
  Settings,
  Calendar,
  ChevronDown,
  Info,
  Trash2,
  Upload,
  FileText,
  X,
  Check,
} from "lucide-react";
import { BooksDatePickerPopover } from "./BooksDatePickerPopover";

type Props = {
  tl: Timeline;
};

export function BooksNewInvoiceView({ tl }: Props) {
  const allInvoices = useTimelineVar<InvoiceItem[]>(
    tl,
    "booksInvoices",
    INITIAL_INVOICES
  );
  const invoiceNumber = useTimelineVar<string>(
    tl,
    "booksInvoiceNumber",
    "INV-000001"
  );
  const customer = useTimelineVar<string>(tl, "booksInvoiceCustomer", "");
  const orderNumber = useTimelineVar<string>(tl, "booksInvoiceOrderNumber", "");
  const invoiceDate = useTimelineVar<string>(
    tl,
    "booksInvoiceDate",
    "11/05/2026"
  );
  const dueDate = useTimelineVar<string>(tl, "booksInvoiceDueDate", "12/05/2026");
  const terms = useTimelineVar<string>(tl, "booksInvoiceTerms", "Due on Receipt");
  const arAccount = useTimelineVar<string>(
    tl,
    "booksInvoiceAR",
    "Accounts Receivable"
  );
  const salesperson = useTimelineVar<string>(
    tl,
    "booksInvoiceSalesperson",
    "None"
  );
  const subject = useTimelineVar<string>(tl, "booksInvoiceSubject", "");
  const lineItems = useTimelineVar<InvoiceLineItem[]>(
    tl,
    "booksInvoiceLineItems",
    [
      {
        id: "row-1",
        name: "",
        quantity: 1,
        rate: 0,
        tax: "Select a Tax",
        amount: 0,
      },
    ]
  );
  const discountPercent = useTimelineVar<number>(tl, "booksInvoiceDiscount", 0);
  const shipping = useTimelineVar<number>(tl, "booksInvoiceShipping", 0);
  const adjustment = useTimelineVar<number>(tl, "booksInvoiceAdjustment", 0);
  const customerNotes = useTimelineVar<string>(
    tl,
    "booksInvoiceCustomerNotes",
    "Thanks for your business."
  );
  const files = useTimelineVar<string[]>(tl, "booksInvoiceFiles", []);
  const termsText = useTimelineVar<string>(
    tl,
    "booksInvoiceTermsText",
    "Payment is due within 30 days of the invoice date. Late payments may be subject to a fee."
  );
  const planType = useTimelineVar<"none" | "flexible" | "scheduled">(
    tl,
    "booksInvoicePlanType",
    "none"
  );
  const planPin = useTimelineVar<string>(tl, "booksInvoicePlanPin", "");
  const installments = useTimelineVar<PaymentInstallment[]>(
    tl,
    "booksInvoiceInstallments",
    []
  );

  // Dropdown states
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [termsDropdownOpen, setTermsDropdownOpen] = useState(false);
  const [arDropdownOpen, setArDropdownOpen] = useState(false);
  const [salespersonDropdownOpen, setSalespersonDropdownOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [activeItemMenuIndex, setActiveItemMenuIndex] = useState<number | null>(
    null
  );
  const [activeTaxMenuIndex, setActiveTaxMenuIndex] = useState<number | null>(
    null
  );

  // Totals calculations
  const subTotal = lineItems.reduce((acc, row) => acc + (row.amount || 0), 0);
  const discountAmount = +(subTotal * (discountPercent / 100)).toFixed(2);
  const total = +(subTotal - discountAmount + shipping + adjustment).toFixed(2);

  // Helper: auto calculate due date from terms
  const calculateDueDate = (invDateStr: string, termStr: string) => {
    const parts = invDateStr.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      const d = new Date(year, month, day);

      if (termStr === "Due on Receipt") {
        return invDateStr;
      } else if (termStr === "Net 15") {
        d.setDate(d.getDate() + 15);
      } else if (termStr === "Net 30") {
        d.setDate(d.getDate() + 30);
      } else if (termStr === "Net 45") {
        d.setDate(d.getDate() + 45);
      } else if (termStr === "Net 60") {
        d.setDate(d.getDate() + 60);
      }
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
    return invDateStr;
  };

  const handleSelectTerms = (tName: string) => {
    tl.setVar("booksInvoiceTerms", tName);
    const newDueDate = calculateDueDate(invoiceDate, tName);
    tl.setVar("booksInvoiceDueDate", newDueDate);
    setTermsDropdownOpen(false);
  };

  const handleSelectDate = (dateStr: string) => {
    tl.setVar("booksInvoiceDate", dateStr);
    const newDueDate = calculateDueDate(dateStr, terms);
    tl.setVar("booksInvoiceDueDate", newDueDate);
    setDatePickerOpen(false);
  };

  // Line items helpers
  const handleAddRow = () => {
    const newRow: InvoiceLineItem = {
      id: `row-${Date.now()}`,
      name: "",
      quantity: 1,
      rate: 0,
      tax: "Select a Tax",
      amount: 0,
    };
    tl.setVar("booksInvoiceLineItems", [...lineItems, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    const updated = lineItems.filter((_, idx) => idx !== index);
    tl.setVar(
      "booksInvoiceLineItems",
      updated.length > 0
        ? updated
        : [
            {
              id: "empty-row",
              name: "",
              quantity: 1,
              rate: 0,
              tax: "Select a Tax",
              amount: 0,
            },
          ]
    );
  };

  const handleSelectItem = (
    index: number,
    itemName: string,
    itemRate: number
  ) => {
    const updated = [...lineItems];
    const qty = updated[index]?.quantity || 1;
    updated[index] = {
      ...updated[index],
      name: itemName,
      rate: itemRate,
      amount: qty * itemRate,
    };
    tl.setVar("booksInvoiceLineItems", updated);
    setActiveItemMenuIndex(null);
  };

  const handleSelectTax = (index: number, taxName: string) => {
    const updated = [...lineItems];
    updated[index] = {
      ...updated[index],
      tax: taxName,
    };
    tl.setVar("booksInvoiceLineItems", updated);
    setActiveTaxMenuIndex(null);
  };

  // Quick split for scheduled payment plan
  const handleQuickSplit = (multiplier: number) => {
    const currentTotal = total > 0 ? total : 187.45;
    const splitAmount = +(currentTotal / multiplier).toFixed(2);
    const parts: PaymentInstallment[] = Array.from(
      { length: multiplier },
      (_, idx) => {
        const d = new Date(2026, 10 + idx, 5); // starting Nov 2026
        const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        return {
          id: `inst-${idx + 1}`,
          label: idx === 0 ? "First" : idx === 1 ? "Second" : idx === 2 ? "Third" : `Part ${idx + 1}`,
          dueDate: dateStr,
          amount:
            idx === multiplier - 1
              ? +(currentTotal - splitAmount * (multiplier - 1)).toFixed(2)
              : splitAmount,
        };
      }
    );
    tl.setVar("booksInvoiceInstallments", parts);
  };

  // Save actions
  const handleSaveAsDraft = () => {
    const newInvoice: InvoiceItem = {
      id: "inv-10013",
      invoiceNumber: invoiceNumber || "INV10013",
      customerName: customer || "Northfield Cafe",
      customerId: "cust-6",
      date: invoiceDate || "11/5/2026",
      dueDate: dueDate || "12/5/2026",
      terms: terms || "Net 30",
      orderNumber: orderNumber || "PO-4471",
      accountsReceivable: arAccount,
      salesperson: salesperson || "Sam Taylor",
      subject: subject || "Catering supplies for Northfield Cafe",
      amount: total || 187.45,
      amountPaid: 0.0,
      balanceDue: total || 187.45,
      status: "Draft",
      deliveryPending: false,
      items: lineItems.filter((it) => it.name),
      subTotal: subTotal || 191.0,
      discountPercent: discountPercent || 5,
      discountAmount: discountAmount || 9.55,
      shipping: shipping || 4,
      adjustment: adjustment || 2,
      total: total || 187.45,
      customerNotes,
      termsAndConditions: termsText,
      attachments: files,
      customerAddress: {
        street: "18 Northfield Avenue",
        city: "Leeds",
        state: "West Yorkshire",
        zip: "LS6 2QJ",
        country: "United Kingdom",
      },
      customerEmail: "orders@northfieldcafe.co.uk",
      paymentPlan: {
        type: planType,
        pin: planPin,
        installments,
      },
    };

    tl.setVar("booksInvoices", [newInvoice, ...allInvoices]);
    tl.setVar("booksActiveInvoice", newInvoice);
    tl.setVar("booksToastText", "Invoice saved as draft");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "invoice-detail");
    tl.setUrl(BOOKS_URLS.invoiceDetails);
  };

  const handleSaveAndSend = async () => {
    const newInvoice: InvoiceItem = {
      id: "inv-10013",
      invoiceNumber: invoiceNumber || "INV10013",
      customerName: customer || "Harvest Tables Ltd",
      customerId: "cust-3",
      date: invoiceDate || "11/5/2026",
      dueDate: dueDate || "11/20/2026",
      terms: terms || "Net 15",
      orderNumber: orderNumber || "HT-2026-99",
      accountsReceivable: arAccount,
      salesperson: salesperson || "Sam Taylor",
      subject: subject || "Produce and supplies",
      amount: total || 121.0,
      amountPaid: 0.0,
      balanceDue: total || 121.0,
      status: "Sent",
      deliveryPending: true,
      items: lineItems.filter((it) => it.name),
      subTotal: subTotal || 121.0,
      discountPercent: 0,
      discountAmount: 0,
      shipping: 0,
      adjustment: 0,
      total: total || 121.0,
      customerNotes,
      termsAndConditions: termsText,
      attachments: files,
      customerAddress: {
        street: "5 Mill Lane",
        city: "Sheffield",
        state: "South Yorkshire",
        zip: "S1 2GU",
        country: "United Kingdom",
      },
      customerEmail: "supplies@harvesttables.example",
      paymentPlan: {
        type: "scheduled",
        installments: [
          { id: "inst-1", label: "First", dueDate: "11/5/2026", amount: 60.5 },
          { id: "inst-2", label: "Second", dueDate: "11/20/2026", amount: 60.5 },
        ],
      },
    };

    tl.setVar("booksInvoices", [newInvoice, ...allInvoices]);
    tl.setVar("booksActiveInvoice", newInvoice);
    tl.setVar("booksToastText", "Payment plan set");
    tl.setVar("booksToastOpen", true);
    await new Promise((r) => setTimeout(r, 600));
    tl.setVar("booksToastText", "Invoice sent successfully.");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "invoice-detail");
    tl.setUrl(BOOKS_URLS.invoiceDetails);
  };

  const planSum = installments.reduce((acc, it) => acc + (it.amount || 0), 0);
  const targetTotal = total > 0 ? total : 187.45;
  const isSumMatched = Math.abs(planSum - targetTotal) < 0.05;

  return (
    <div
      data-tl="books-new-invoice-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="new-invoice-breadcrumb"
              onClick={() => {
                tl.setVar("booksView", "invoices");
                tl.setUrl(BOOKS_URLS.invoices);
              }}
              className="hover:text-gray-900 cursor-pointer font-medium"
            >
              ← Back
            </button>
            <span>|</span>
            <span>Home</span>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => {
                tl.setVar("booksView", "invoices");
                tl.setUrl(BOOKS_URLS.invoices);
              }}
              className="hover:text-[#7014D9] cursor-pointer"
            >
              Invoices
            </button>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">New</span>
          </div>

          <button
            type="button"
            data-tl="btn-close-new-invoice"
            onClick={() => {
              tl.setVar("booksView", "invoices");
              tl.setUrl(BOOKS_URLS.invoices);
            }}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Title */}
        <h1
          data-tl="title-new-invoice"
          className="text-2xl font-bold text-gray-900"
        >
          New Invoice
        </h1>

        {/* Main Details Form Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5 text-xs">
          {/* Customer Name */}
          <div className="max-w-md relative">
            <label className="block font-medium text-gray-700 mb-1.5">
              Customer Name<span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              data-tl="select-invoice-customer"
              onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-left text-gray-800 flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-[#7014D9] cursor-pointer"
            >
              <span className={customer ? "text-gray-900 font-medium" : "text-gray-400"}>
                {customer || "Select or add a customer"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {customerDropdownOpen && (
              <div
                data-tl="menu-invoice-customer"
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30 max-h-60 overflow-y-auto"
              >
                {[
                  { name: "Northfield Cafe", tl: "customer-opt-northfield" },
                  { name: "Brightway Stores", tl: "customer-opt-brightway" },
                  { name: "Acme Foods Ltd", tl: "customer-opt-acme" },
                  { name: "Harvest Tables Ltd", tl: "customer-opt-harvest" },
                  { name: "Sterling Interiors", tl: "customer-opt-sterling" },
                  { name: "Casey Brown", tl: "customer-opt-casey" },
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    data-tl={c.tl}
                    onClick={() => {
                      tl.setVar("booksInvoiceCustomer", c.name);
                      setCustomerDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer transition-colors"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Invoice# with Gear button */}
          <div className="max-w-md">
            <label className="block font-medium text-gray-700 mb-1.5">
              Invoice#<span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                data-tl="input-invoice-number"
                value={invoiceNumber}
                onChange={(e) => tl.setVar("booksInvoiceNumber", e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
              <button
                type="button"
                data-tl="btn-configure-numbering"
                onClick={() =>
                  tl.setVar("booksInvoiceNumberingDialogOpen", true)
                }
                title="Configure invoice numbering"
                className="p-2 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-600 rounded-lg cursor-pointer transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Order Number */}
          <div className="max-w-md">
            <label className="block font-medium text-gray-700 mb-1.5">
              Order Number
            </label>
            <input
              type="text"
              data-tl="input-invoice-order-number"
              placeholder="e.g. PO-4471"
              value={orderNumber}
              onChange={(e) => tl.setVar("booksInvoiceOrderNumber", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          {/* Dates & Terms Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
            {/* Invoice Date */}
            <div className="relative">
              <label className="block font-medium text-gray-700 mb-1.5">
                Invoice Date<span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  data-tl="input-invoice-date"
                  placeholder="mm/dd/yyyy"
                  value={invoiceDate}
                  onChange={(e) => handleSelectDate(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <button
                  type="button"
                  data-tl="btn-invoice-date-calendar"
                  onClick={() => setDatePickerOpen(!datePickerOpen)}
                  className="absolute right-2 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              {datePickerOpen && (
                <BooksDatePickerPopover
                  onSelect={handleSelectDate}
                  onClose={() => setDatePickerOpen(false)}
                  todayDateStr="11/05/2026"
                />
              )}
            </div>

            {/* Terms */}
            <div className="relative">
              <label className="block font-medium text-gray-700 mb-1.5">
                Terms
              </label>
              <button
                type="button"
                data-tl="select-invoice-terms"
                onClick={() => setTermsDropdownOpen(!termsDropdownOpen)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-left text-gray-800 flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-[#7014D9] cursor-pointer"
              >
                <span>{terms}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {termsDropdownOpen && (
                <div
                  data-tl="menu-invoice-terms"
                  className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30"
                >
                  {INVOICE_TERMS_OPTIONS.map((tOpt) => (
                    <button
                      key={tOpt}
                      type="button"
                      data-tl={`terms-opt-${tOpt.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => handleSelectTerms(tOpt)}
                      className="w-full text-left px-3.5 py-2 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer transition-colors"
                    >
                      {tOpt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-1.5">
                Due Date
              </label>
              <input
                type="text"
                data-tl="input-invoice-due-date"
                readOnly
                value={dueDate}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Accounts Receivable */}
          <div className="max-w-md relative">
            <label className="block font-medium text-gray-700 mb-1.5">
              Accounts Receivable <Info className="w-3.5 h-3.5 inline text-gray-400 ml-0.5" />
            </label>
            <button
              type="button"
              data-tl="select-invoice-ar"
              onClick={() => setArDropdownOpen(!arDropdownOpen)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-left text-gray-800 flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-[#7014D9] cursor-pointer"
            >
              <span>{arAccount}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {arDropdownOpen && (
              <div
                data-tl="menu-invoice-ar"
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30"
              >
                <button
                  type="button"
                  data-tl="ar-opt-default"
                  onClick={() => {
                    tl.setVar("booksInvoiceAR", "Accounts Receivable");
                    setArDropdownOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer"
                >
                  Accounts Receivable
                </button>
              </div>
            )}
          </div>

          {/* Salesperson */}
          <div className="max-w-md relative">
            <label className="block font-medium text-gray-700 mb-1.5">
              Salesperson
            </label>
            <button
              type="button"
              data-tl="select-invoice-salesperson"
              onClick={() => setSalespersonDropdownOpen(!salespersonDropdownOpen)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-left text-gray-800 flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-[#7014D9] cursor-pointer"
            >
              <span>{salesperson === "None" ? "Select or Add Salesperson" : salesperson}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {salespersonDropdownOpen && (
              <div
                data-tl="menu-invoice-salesperson"
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30"
              >
                {QUOTE_SALESPERSONS.map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    data-tl={
                      sp === "Sam Taylor"
                        ? "salesperson-opt-sam-taylor"
                        : "salesperson-opt-none"
                    }
                    onClick={() => {
                      tl.setVar("booksInvoiceSalesperson", sp);
                      setSalespersonDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer transition-colors"
                  >
                    {sp}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="max-w-xl">
            <label className="block font-medium text-gray-700 mb-1.5">
              Subject <Info className="w-3.5 h-3.5 inline text-gray-400 ml-0.5" />
            </label>
            <input
              type="text"
              data-tl="input-invoice-subject"
              placeholder="Let your customer know what this invoice is for"
              value={subject}
              onChange={(e) => tl.setVar("booksInvoiceSubject", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* Item Table Card */}
        <div
          data-tl="card-item-table"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 text-xs"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Item Table</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-scan-item"
                onClick={() => tl.setVar("booksInvoiceScanDialogOpen", true)}
                className="text-[#2563EB] hover:underline font-medium cursor-pointer"
              >
                Scan Item
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                data-tl="btn-bulk-items"
                onClick={() =>
                  tl.setVar("booksInvoiceBulkItemsDialogOpen", true)
                }
                className="text-[#2563EB] hover:underline font-medium cursor-pointer"
              >
                Bulk Actions
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3 min-w-[220px]">Item Details</th>
                  <th className="py-2.5 px-3 w-20 text-center">Quantity</th>
                  <th className="py-2.5 px-3 w-28 text-right">Rate</th>
                  <th className="py-2.5 px-3 w-36">Tax</th>
                  <th className="py-2.5 px-3 w-28 text-right">Amount</th>
                  <th className="py-2.5 px-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lineItems.map((row, idx) => (
                  <tr key={row.id || idx}>
                    {/* Item Details */}
                    <td className="py-2.5 px-3 relative">
                      <input
                        type="text"
                        data-tl={`input-item-select-${idx}`}
                        placeholder="Type or click to select an item."
                        value={row.name}
                        onClick={() =>
                          setActiveItemMenuIndex(
                            activeItemMenuIndex === idx ? null : idx
                          )
                        }
                        readOnly
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 text-gray-800"
                      />

                      {activeItemMenuIndex === idx && (
                        <div
                          data-tl={`menu-items-catalog-${idx}`}
                          className="absolute top-full left-3 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-40 max-h-56 overflow-y-auto"
                        >
                          {[
                            { name: "Organic Rice 25kg", rate: 42.0, tl: "item-opt-organic-rice" },
                            { name: "Cassava Flour 10kg", rate: 24.0, tl: "item-opt-cassava-flour" },
                            { name: "Palm Oil 5L", rate: 18.5, tl: "item-opt-palm-oil" },
                            { name: "Delivery Fee", rate: 10.0, tl: "item-opt-delivery-fee" },
                            { name: "Reusable Tote Bag", rate: 20.0, tl: "item-opt-tote-bag" },
                            { name: "Notebook A5", rate: 5.0, tl: "item-opt-notebook-a5" },
                          ].map((item) => (
                            <button
                              key={item.name}
                              type="button"
                              data-tl={item.tl}
                              onClick={() =>
                                handleSelectItem(idx, item.name, item.rate)
                              }
                              className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] flex items-center justify-between cursor-pointer"
                            >
                              <span>{item.name}</span>
                              <span className="text-gray-400">
                                {item.rate.toFixed(2)}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Quantity */}
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        data-tl={`input-item-qty-${idx}`}
                        min={1}
                        value={row.quantity}
                        onChange={(e) => {
                          const qty = Math.max(1, parseInt(e.target.value, 10) || 1);
                          const updated = [...lineItems];
                          updated[idx] = {
                            ...updated[idx],
                            quantity: qty,
                            amount: qty * updated[idx].rate,
                          };
                          tl.setVar("booksInvoiceLineItems", updated);
                        }}
                        className="w-full text-center px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                      />
                    </td>

                    {/* Rate */}
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        data-tl={`input-item-rate-${idx}`}
                        value={row.rate}
                        onChange={(e) => {
                          const r = parseFloat(e.target.value) || 0;
                          const updated = [...lineItems];
                          updated[idx] = {
                            ...updated[idx],
                            rate: r,
                            amount: updated[idx].quantity * r,
                          };
                          tl.setVar("booksInvoiceLineItems", updated);
                        }}
                        className="w-full text-right px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-800"
                      />
                    </td>

                    {/* Tax */}
                    <td className="py-2.5 px-3 relative">
                      <button
                        type="button"
                        data-tl={`select-item-tax-${idx}`}
                        onClick={() =>
                          setActiveTaxMenuIndex(
                            activeTaxMenuIndex === idx ? null : idx
                          )
                        }
                        className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-left text-gray-700 flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{row.tax}</span>
                        <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
                      </button>

                      {activeTaxMenuIndex === idx && (
                        <div
                          data-tl={`menu-item-tax-${idx}`}
                          className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-40"
                        >
                          {QUOTE_TAX_OPTIONS.map((tName) => (
                            <button
                              key={tName}
                              type="button"
                              data-tl={
                                tName === "VAT Standard (20%)"
                                  ? "tax-opt-vat-standard"
                                  : undefined
                              }
                              onClick={() => handleSelectTax(idx, tName)}
                              className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer"
                            >
                              {tName}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-2.5 px-3 text-right font-medium text-gray-900">
                      {row.amount.toFixed(2)}
                    </td>

                    {/* Delete */}
                    <td className="py-2.5 px-2 text-center">
                      <button
                        type="button"
                        data-tl={`btn-delete-item-${idx}`}
                        onClick={() => handleDeleteRow(idx)}
                        className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Under Table Actions */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              data-tl="btn-add-line-item"
              onClick={handleAddRow}
              className="text-[#2563EB] hover:underline font-medium cursor-pointer"
            >
              + Add New Row
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              data-tl="btn-bulk-items"
              onClick={() =>
                tl.setVar("booksInvoiceBulkItemsDialogOpen", true)
              }
              className="text-[#2563EB] hover:underline font-medium cursor-pointer"
            >
              Add Items in Bulk
            </button>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="w-80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sub Total</span>
                <span data-tl="invoice-sub-total" className="font-semibold text-gray-900">
                  {subTotal.toFixed(2)}
                </span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600">Discount</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center w-20 border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      data-tl="input-invoice-discount"
                      value={discountPercent}
                      onChange={(e) =>
                        tl.setVar(
                          "booksInvoiceDiscount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-12 px-2 py-1 text-right text-xs focus:outline-none"
                    />
                    <span className="text-gray-400 px-1">%</span>
                  </div>
                  <span className="w-16 text-right text-gray-700">
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Charges */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600">
                  Shipping Charges <Info className="w-3 h-3 inline text-gray-400" />
                </span>
                <input
                  type="number"
                  data-tl="input-invoice-shipping"
                  value={shipping}
                  onChange={(e) =>
                    tl.setVar(
                      "booksInvoiceShipping",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-24 px-2.5 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              {/* Adjustment */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600">Adjustment</span>
                <input
                  type="number"
                  data-tl="input-invoice-adjustment"
                  value={adjustment}
                  onChange={(e) =>
                    tl.setVar(
                      "booksInvoiceAdjustment",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-24 px-2.5 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              {/* Grand Total */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-sm font-bold text-[#2563EB]">
                <span>Total (GBP)</span>
                <span data-tl="invoice-total-amount">
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Notes & File Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2 text-xs">
            <label className="block font-semibold text-gray-900">
              Customer Notes
            </label>
            <textarea
              data-tl="input-customer-notes"
              rows={3}
              placeholder="Will be displayed on the invoice"
              value={customerNotes}
              onChange={(e) =>
                tl.setVar("booksInvoiceCustomerNotes", e.target.value)
              }
              className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9]"
            />
            <p className="text-[11px] text-gray-400">
              Will be displayed on the invoice
            </p>
          </div>

          {/* Attachments */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3 text-xs">
            <label className="block font-semibold text-gray-900">
              Attach File(s) to Invoice
            </label>
            <button
              type="button"
              data-tl="btn-upload-invoice-file"
              onClick={() => tl.setVar("booksInvoiceFilePickerOpen", true)}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-gray-500" />
              <span>Upload File</span>
            </button>

            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {files.map((fName) => (
                  <div
                    key={fName}
                    data-tl="invoice-file-chip"
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-[#7014D9] rounded-lg border border-purple-200 font-medium text-[11px]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{fName}</span>
                    <button
                      type="button"
                      data-tl="btn-remove-invoice-file"
                      onClick={() =>
                        tl.setVar(
                          "booksInvoiceFiles",
                          files.filter((f) => f !== fName)
                        )
                      }
                      className="hover:text-purple-900 cursor-pointer ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[11px] text-gray-400">
              You can upload a maximum of 10 files, 10MB each
            </p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2 text-xs">
          <label className="block font-semibold text-gray-900">
            Terms &amp; Conditions
          </label>
          <textarea
            data-tl="input-invoice-terms-text"
            rows={3}
            placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
            value={termsText}
            onChange={(e) => tl.setVar("booksInvoiceTermsText", e.target.value)}
            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        {/* Additional Fields Note */}
        <div
          data-tl="note-additional-fields"
          className="text-xs text-[#2563EB] font-medium"
        >
          Additional Fields: Start adding custom fields for your invoices by going to Settings → Sales → Invoices.
        </div>

        {/* Payment Plan Block */}
        <div
          data-tl="card-form-payment-plan"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 text-xs"
        >
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Payment plan</h2>
            <p className="text-gray-500 mt-0.5">
              Optionally let the customer pay this invoice in parts. They can always pay any amount up to the balance — a schedule is only guidance.
            </p>
          </div>

          {/* Plan Choice Chips */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="chip-plan-none"
              onClick={() => {
                tl.setVar("booksInvoicePlanType", "none");
                tl.setVar("booksInvoiceInstallments", []);
              }}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                planType === "none"
                  ? "bg-purple-50 text-[#7014D9] border border-[#7014D9]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
              }`}
            >
              None
            </button>
            <button
              type="button"
              data-tl="chip-plan-flexible"
              onClick={() => tl.setVar("booksInvoicePlanType", "flexible")}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                planType === "flexible"
                  ? "bg-purple-50 text-[#7014D9] border border-[#7014D9]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
              }`}
            >
              Flexible
            </button>
            <button
              type="button"
              data-tl="chip-plan-scheduled"
              onClick={() => {
                tl.setVar("booksInvoicePlanType", "scheduled");
                if (installments.length === 0) handleQuickSplit(3);
              }}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                planType === "scheduled"
                  ? "bg-purple-50 text-[#7014D9] border border-[#7014D9]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
              }`}
            >
              Scheduled
            </button>
          </div>

          {/* Flexible Mode Details */}
          {planType === "flexible" && (
            <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100 text-xs text-purple-900">
              This lets the customer pay any amount up to the balance.
            </div>
          )}

          {/* Scheduled Mode Details */}
          {planType === "scheduled" && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 font-medium">Quick split:</span>
                {[2, 3, 4, 6].map((m) => (
                  <button
                    key={m}
                    type="button"
                    data-tl={`chip-split-${m}x`}
                    onClick={() => handleQuickSplit(m)}
                    className="px-2.5 py-1 bg-white border border-gray-200 hover:border-purple-300 hover:text-purple-700 rounded-md text-[11px] font-medium cursor-pointer"
                  >
                    {m}x
                  </button>
                ))}
              </div>

              {/* Installments Table */}
              <div className="space-y-2">
                {installments.map((inst, idx) => (
                  <div
                    key={inst.id || idx}
                    data-tl={`installment-row-${idx + 1}`}
                    className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs"
                  >
                    <span className="w-5 text-gray-400 font-medium text-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      data-tl={`input-inst-label-${idx + 1}`}
                      placeholder="Label (optional)"
                      value={inst.label || ""}
                      onChange={(e) => {
                        const updated = [...installments];
                        updated[idx].label = e.target.value;
                        tl.setVar("booksInvoiceInstallments", updated);
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-white border border-gray-200 rounded-md"
                    />
                    <div className="relative w-36">
                      <input
                        type="text"
                        data-tl={`input-inst-date-${idx + 1}`}
                        value={inst.dueDate}
                        onChange={(e) => {
                          const updated = [...installments];
                          updated[idx].dueDate = e.target.value;
                          tl.setVar("booksInvoiceInstallments", updated);
                        }}
                        className="w-full pl-2.5 pr-7 py-1.5 bg-white border border-gray-200 rounded-md"
                      />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="w-24 text-right">
                      <input
                        type="number"
                        data-tl={`input-inst-amount-${idx + 1}`}
                        value={inst.amount}
                        onChange={(e) => {
                          const updated = [...installments];
                          updated[idx].amount = parseFloat(e.target.value) || 0;
                          tl.setVar("booksInvoiceInstallments", updated);
                        }}
                        className="w-full px-2 py-1.5 text-right bg-white border border-gray-200 rounded-md font-medium text-gray-900"
                      />
                    </div>
                    <button
                      type="button"
                      data-tl={`btn-delete-installment-${idx}`}
                      onClick={() => {
                        const updated = installments.filter((_, i) => i !== idx);
                        tl.setVar("booksInvoiceInstallments", updated);
                      }}
                      className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Installment & Sum Status */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  data-tl="btn-add-installment"
                  onClick={() => {
                    const nextIdx = installments.length + 1;
                    const newInst: PaymentInstallment = {
                      id: `inst-${Date.now()}`,
                      label: `Installment ${nextIdx}`,
                      dueDate: "02/05/2027",
                      amount: 0,
                    };
                    tl.setVar("booksInvoiceInstallments", [...installments, newInst]);
                  }}
                  className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 font-medium cursor-pointer"
                >
                  + Add installment
                </button>

                <span
                  data-tl="plan-sum-check"
                  className={`flex items-center gap-1.5 font-semibold ${
                    isSumMatched ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  {isSumMatched ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">✗</span>
                  )}
                  Sum GBP {planSum.toFixed(2)} / {targetTotal.toFixed(2)} {isSumMatched ? "✓" : ""}
                </span>
              </div>
            </div>
          )}

          {/* PIN field (for flexible or scheduled) */}
          {(planType === "flexible" || planType === "scheduled") && (
            <div className="max-w-md pt-2">
              <label className="block text-gray-600 mb-1">
                PIN (optional)
              </label>
              <input
                type="text"
                data-tl="input-plan-pin"
                placeholder="4–12 chars; protects the customer..."
                value={planPin}
                onChange={(e) => tl.setVar("booksInvoicePlanPin", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800"
              />
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-save-invoice-draft"
              onClick={handleSaveAsDraft}
              className="px-5 py-2 bg-white border border-[#7014D9] text-[#7014D9] hover:bg-purple-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              Save as Draft
            </button>
            <button
              type="button"
              data-tl="btn-save-send-invoice"
              onClick={handleSaveAndSend}
              className="px-5 py-2 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              Save and Send
            </button>
            <button
              type="button"
              data-tl="btn-cancel-invoice"
              onClick={() => {
                tl.setVar("booksView", "invoices");
                tl.setUrl(BOOKS_URLS.invoices);
              }}
              className="px-4 py-2 text-gray-500 hover:text-gray-800 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              data-tl="link-make-recurring"
              className="text-[#2563EB] hover:underline cursor-pointer font-medium"
            >
              Make Recurring
            </button>
            <span
              data-tl="footer-total-amount"
              className="font-bold text-gray-900"
            >
              Total Amount: GBP {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
