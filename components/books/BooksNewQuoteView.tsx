"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type QuoteItem,
  type QuoteLineItem,
  INITIAL_QUOTES,
  QUOTE_TAX_OPTIONS,
  QUOTE_SALESPERSONS,
  QUOTE_PROJECTS_BY_CUSTOMER,
} from "./books-data";
import {
  Settings,
  Calendar,
  ChevronDown,
  Info,
  Trash2,
  Upload,
  X,
  FileText,
  Home,
} from "lucide-react";
import { BooksDatePickerPopover } from "./BooksDatePickerPopover";

type Props = {
  tl: Timeline;
};

export function BooksNewQuoteView({ tl }: Props) {
  // Timeline vars
  const quoteNumber = useTimelineVar<string>(tl, "booksQuoteNumber", "QT-000001");
  const reference = useTimelineVar<string>(tl, "booksQuoteReference", "");
  const quoteDate = useTimelineVar<string>(tl, "booksQuoteDate", "mm/dd/yyyy");
  const expiryDate = useTimelineVar<string>(tl, "booksQuoteExpiryDate", "mm/dd/yyyy");
  const customer = useTimelineVar<string>(tl, "booksQuoteCustomer", "");
  const salesperson = useTimelineVar<string>(tl, "booksQuoteSalesperson", "None");
  const project = useTimelineVar<string>(tl, "booksQuoteProject", "None");
  const subject = useTimelineVar<string>(tl, "booksQuoteSubject", "");
  const lineItems = useTimelineVar<QuoteLineItem[]>(tl, "booksQuoteLineItems", [
    {
      id: "initial-row",
      name: "",
      quantity: 1,
      rate: 0,
      tax: "Select a Tax",
      amount: 0,
    },
  ]);
  const discountPercent = useTimelineVar<number>(tl, "booksQuoteDiscount", 0);
  const shipping = useTimelineVar<number>(tl, "booksQuoteShipping", 0);
  const adjustment = useTimelineVar<number>(tl, "booksQuoteAdjustment", 0);
  const customerNotes = useTimelineVar<string>(
    tl,
    "booksQuoteCustomerNotes",
    "Looking forward for your business."
  );
  const terms = useTimelineVar<string>(tl, "booksQuoteTerms", "");
  const files = useTimelineVar<string[]>(tl, "booksQuoteFiles", []);
  const allQuotes = useTimelineVar<QuoteItem[]>(tl, "booksQuotes", INITIAL_QUOTES);

  // Popover & Dropdown states
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [salespersonDropdownOpen, setSalespersonDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [quoteDatePickerOpen, setQuoteDatePickerOpen] = useState(false);
  const [expiryDatePickerOpen, setExpiryDatePickerOpen] = useState(false);
  const [activeItemMenuIndex, setActiveItemMenuIndex] = useState<number | null>(null);
  const [activeTaxMenuIndex, setActiveTaxMenuIndex] = useState<number | null>(null);

  // Calculation helpers
  const subTotal = lineItems.reduce((acc, it) => acc + (it.name ? it.amount : 0), 0);
  const discountAmount = subTotal * (discountPercent / 100);
  const total = subTotal - discountAmount + shipping + adjustment;

  const handleAddRow = () => {
    const newRow: QuoteLineItem = {
      id: `row-${Date.now()}`,
      name: "",
      quantity: 1,
      rate: 0,
      tax: "Select a Tax",
      amount: 0,
    };
    tl.setVar("booksQuoteLineItems", [...lineItems, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    const updated = lineItems.filter((_, idx) => idx !== index);
    tl.setVar("booksQuoteLineItems", updated.length > 0 ? updated : [
      {
        id: "empty-row",
        name: "",
        quantity: 1,
        rate: 0,
        tax: "Select a Tax",
        amount: 0,
      },
    ]);
  };

  const handleSelectItem = (index: number, itemName: string, itemRate: number) => {
    const updated = [...lineItems];
    const qty = updated[index]?.quantity || 1;
    updated[index] = {
      ...updated[index],
      name: itemName,
      rate: itemRate,
      amount: qty * itemRate,
    };
    tl.setVar("booksQuoteLineItems", updated);
    setActiveItemMenuIndex(null);
  };

  const handleSelectTax = (index: number, taxName: string) => {
    const updated = [...lineItems];
    updated[index] = {
      ...updated[index],
      tax: taxName,
    };
    tl.setVar("booksQuoteLineItems", updated);
    setActiveTaxMenuIndex(null);
  };

  const handleSaveAsDraft = () => {
    const newQuote: QuoteItem = {
      id: "qt-0009",
      quoteNumber: quoteNumber || "QT-0009",
      customerName: customer || "Northfield Cafe",
      customerId: "cust-6",
      date: quoteDate === "mm/dd/yyyy" ? "11/05/2026" : quoteDate,
      expiryDate: expiryDate === "mm/dd/yyyy" ? "11/19/2026" : expiryDate,
      referenceNumber: reference || "NC-CATER-01",
      salesperson: salesperson || "Sam Taylor",
      projectName: project || "Spring Catering Order",
      subject: subject || "Catering supplies for Northfield Cafe",
      amount: total || 142.8,
      status: "Draft",
      items: lineItems.filter((it) => it.name),
      subTotal: subTotal || 144.0,
      discountPercent: discountPercent || 5,
      discountAmount: discountAmount || 7.2,
      shipping: shipping || 4,
      adjustment: adjustment || 2,
      total: total || 142.8,
      customerNotes,
      termsAndConditions: terms,
      attachments: files,
      customerAddress: {
        street: "18 Northfield Avenue",
        city: "Leeds",
        state: "West Yorkshire",
        zip: "LS6 2QJ",
        country: "United Kingdom",
      },
      customerEmail: "orders@northfieldcafe.co.uk",
    };

    tl.setVar("booksQuotes", [newQuote, ...allQuotes]);
    tl.setVar("booksActiveQuote", newQuote);
    tl.setVar("booksToastText", "Quote saved as draft");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "quotes");
    tl.setUrl(BOOKS_URLS.quotes);
  };

  const handleSaveAndSend = () => {
    const newQuote: QuoteItem = {
      id: "qt-0009",
      quoteNumber: quoteNumber || "QT-0009",
      customerName: customer || "Harvest Tables Ltd",
      customerId: "cust-3",
      date: quoteDate === "mm/dd/yyyy" ? "11/05/2026" : quoteDate,
      expiryDate: expiryDate === "mm/dd/yyyy" ? "11/19/2026" : expiryDate,
      referenceNumber: reference || "HT-2026-99",
      salesperson: salesperson || "Sam Taylor",
      projectName: project || "Autumn Produce Supply",
      subject: subject || "Catering quote",
      amount: total || 121.0,
      status: "Sent",
      items: lineItems.filter((it) => it.name),
      subTotal: subTotal || 121.0,
      discountPercent: 0,
      discountAmount: 0,
      shipping: 0,
      adjustment: 0,
      total: total || 121.0,
      customerNotes,
      termsAndConditions: terms,
      attachments: files,
      customerAddress: {
        street: "5 Mill Lane",
        city: "Sheffield",
        state: "South Yorkshire",
        zip: "S1 2GU",
        country: "United Kingdom",
      },
      customerEmail: "supplies@harvesttables.example",
    };

    tl.setVar("booksQuotes", [newQuote, ...allQuotes]);
    tl.setVar("booksActiveQuote", newQuote);
    tl.setVar("booksToastText", "Quote sent successfully.");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "quote-detail");
    tl.setUrl(BOOKS_URLS.quoteDetails);
  };

  const availableProjects = customer
    ? QUOTE_PROJECTS_BY_CUSTOMER[customer] || ["Spring Catering Order", "General Services"]
    : [];

  return (
    <div
      data-tl="books-new-quote-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="new-quote-breadcrumb"
              onClick={() => {
                tl.setVar("booksView", "quotes");
                tl.setUrl(BOOKS_URLS.quotes);
              }}
              className="hover:text-gray-900 cursor-pointer font-medium"
            >
              ← Back
            </button>
            <span>|</span>
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <span>&gt;</span>
            <span className="text-gray-600">Quotes</span>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">New</span>
          </div>

          <button
            type="button"
            data-tl="btn-close-new-quote"
            onClick={() => {
              tl.setVar("booksView", "quotes");
              tl.setUrl(BOOKS_URLS.quotes);
            }}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h1
          data-tl="new-quote-title"
          className="text-2xl font-bold text-gray-900"
        >
          New Quote
        </h1>

        {/* Form Body Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5 text-xs">
          {/* Customer Name */}
          <div className="max-w-md relative">
            <label className="block font-medium text-gray-700 mb-1.5">
              Customer Name<span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              data-tl="select-quote-customer"
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
                data-tl="menu-quote-customers"
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30"
              >
                {[
                  { name: "Northfield Cafe", tl: "customer-opt-northfield-cafe" },
                  { name: "Brightway Stores", tl: "customer-opt-brightway-stores" },
                  { name: "Acme Foods Ltd", tl: "customer-opt-acme-foods" },
                  { name: "Harvest Tables Ltd", tl: "customer-opt-harvest-tables" },
                  { name: "Sterling Interiors", tl: "customer-opt-sterling-interiors" },
                  { name: "Casey Brown", tl: "customer-opt-casey-brown" },
                  { name: "+ Add Customer", tl: "customer-opt-add-new" },
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    data-tl={c.tl}
                    onClick={() => {
                      if (c.name !== "+ Add Customer") {
                        tl.setVar("booksQuoteCustomer", c.name);
                      }
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

          {/* Quote# with Gear */}
          <div className="max-w-md">
            <label className="block font-medium text-gray-700 mb-1.5">
              Quote#<span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                data-tl="input-quote-number"
                value={quoteNumber}
                onChange={(e) => tl.setVar("booksQuoteNumber", e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium focus:outline-none focus:border-[#7014D9]"
              />
              <button
                type="button"
                data-tl="btn-configure-numbering"
                onClick={() => tl.setVar("booksQuoteNumberingDialogOpen", true)}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                title="Configure Quote Numbering"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reference# */}
          <div className="max-w-md">
            <label className="block font-medium text-gray-700 mb-1.5">
              Reference#
            </label>
            <input
              type="text"
              data-tl="input-quote-reference"
              placeholder=""
              value={reference}
              onChange={(e) => tl.setVar("booksQuoteReference", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            {/* Quote Date */}
            <div className="relative">
              <label className="block font-medium text-gray-700 mb-1.5">
                Quote Date<span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center relative">
                <input
                  type="text"
                  data-tl="input-quote-date"
                  placeholder="mm/dd/yyyy"
                  value={quoteDate}
                  onChange={(e) => tl.setVar("booksQuoteDate", e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <button
                  type="button"
                  data-tl="btn-quote-date-calendar"
                  onClick={() => setQuoteDatePickerOpen(!quoteDatePickerOpen)}
                  className="absolute right-2 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              {quoteDatePickerOpen && (
                <BooksDatePickerPopover
                  tl={tl}
                  onSelect={(date) => tl.setVar("booksQuoteDate", date)}
                  onClose={() => setQuoteDatePickerOpen(false)}
                  todayDateStr="11/05/2026"
                />
              )}
            </div>

            {/* Expiry Date */}
            <div className="relative">
              <label className="block font-medium text-gray-700 mb-1.5">
                Expiry Date
              </label>
              <div className="flex items-center relative">
                <input
                  type="text"
                  data-tl="input-quote-expiry-date"
                  placeholder="mm/dd/yyyy"
                  value={expiryDate}
                  onChange={(e) => tl.setVar("booksQuoteExpiryDate", e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
                />
                <button
                  type="button"
                  data-tl="btn-quote-expiry-calendar"
                  onClick={() => setExpiryDatePickerOpen(!expiryDatePickerOpen)}
                  className="absolute right-2 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              {expiryDatePickerOpen && (
                <BooksDatePickerPopover
                  tl={tl}
                  onSelect={(date) => tl.setVar("booksQuoteExpiryDate", date)}
                  onClose={() => setExpiryDatePickerOpen(false)}
                  todayDateStr="11/19/2026"
                />
              )}
            </div>
          </div>

          {/* Salesperson */}
          <div className="max-w-md relative">
            <label className="block font-medium text-gray-700 mb-1.5">
              Salesperson
            </label>
            <button
              type="button"
              data-tl="select-quote-salesperson"
              onClick={() => setSalespersonDropdownOpen(!salespersonDropdownOpen)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-left text-gray-800 flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-[#7014D9] cursor-pointer"
            >
              <span>{salesperson === "None" ? "Select or Add Salesperson" : salesperson}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {salespersonDropdownOpen && (
              <div
                data-tl="menu-quote-salesperson"
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
                      tl.setVar("booksQuoteSalesperson", sp);
                      setSalespersonDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer transition-colors"
                  >
                    {sp}
                  </button>
                ))}
                <button
                  type="button"
                  data-tl="salesperson-opt-add"
                  onClick={() => setSalespersonDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 text-purple-600 font-medium hover:bg-purple-50 cursor-pointer border-t border-gray-100"
                >
                  + Add Salesperson
                </button>
              </div>
            )}
          </div>

          {/* Project Name */}
          <div className="max-w-md relative">
            <label className="block font-medium text-gray-700 mb-1.5">
              Project Name
            </label>
            <button
              type="button"
              data-tl="select-quote-project"
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-left text-gray-800 flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-[#7014D9] cursor-pointer"
            >
              <span>{project === "None" ? "Select a project" : project}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <span className="text-[11px] text-gray-400 block mt-1">
              Select a customer to associate a project.
            </span>

            {projectDropdownOpen && (
              <div
                data-tl="menu-quote-project"
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30"
              >
                <button
                  type="button"
                  data-tl="project-opt-none"
                  onClick={() => {
                    tl.setVar("booksQuoteProject", "None");
                    setProjectDropdownOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-purple-50 text-gray-700 cursor-pointer"
                >
                  None
                </button>
                {availableProjects.map((p) => (
                  <button
                    key={p}
                    type="button"
                    data-tl={
                      p === "Spring Catering Order"
                        ? "project-opt-spring-catering"
                        : `project-opt-${p.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    onClick={() => {
                      tl.setVar("booksQuoteProject", p);
                      setProjectDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  data-tl="project-opt-add"
                  onClick={() => setProjectDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 text-purple-600 font-medium hover:bg-purple-50 cursor-pointer border-t border-gray-100"
                >
                  + Add Project
                </button>
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="max-w-lg">
            <label className="flex items-center gap-1 font-medium text-gray-700 mb-1.5">
              <span>Subject</span>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </label>
            <input
              type="text"
              data-tl="input-quote-subject"
              placeholder="Let your customer know what this Quote is for"
              value={subject}
              onChange={(e) => tl.setVar("booksQuoteSubject", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* Item Table Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-sm font-semibold text-gray-900">Item Table</h2>
            <div className="flex items-center gap-4">
              <button
                type="button"
                data-tl="btn-scan-item"
                onClick={() => tl.setVar("booksQuoteScanDialogOpen", true)}
                className="text-[#2563EB] hover:underline font-medium cursor-pointer"
              >
                Scan Item
              </button>
              <button
                type="button"
                data-tl="link-bulk-actions"
                onClick={() => tl.setVar("booksQuoteBulkItemsDialogOpen", true)}
                className="text-[#2563EB] hover:underline font-medium cursor-pointer"
              >
                Bulk Actions
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-xl overflow-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4">ITEM DETAILS*</th>
                  <th className="py-2.5 px-4 w-28 text-center">QUANTITY</th>
                  <th className="py-2.5 px-4 w-32 text-right">RATE</th>
                  <th className="py-2.5 px-4 w-44">TAX</th>
                  <th className="py-2.5 px-4 w-32 text-right">AMOUNT</th>
                  <th className="py-2.5 px-3 w-10 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lineItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    data-tl={`quote-item-row-${idx}`}
                    className="hover:bg-gray-50/40 relative"
                  >
                    {/* Item Select */}
                    <td className="py-3 px-4 relative">
                      <button
                        type="button"
                        data-tl={`input-item-select-${idx}`}
                        onClick={() =>
                          setActiveItemMenuIndex(
                            activeItemMenuIndex === idx ? null : idx
                          )
                        }
                        className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-left text-gray-800 hover:border-gray-300 focus:outline-none cursor-pointer flex items-center justify-between"
                      >
                        <span className={item.name ? "font-medium text-gray-900" : "text-gray-400"}>
                          {item.name || "Type or click to select an item."}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </button>

                      {activeItemMenuIndex === idx && (
                        <div
                          data-tl={`menu-item-options-${idx}`}
                          className="absolute top-full left-4 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-40 max-h-48 overflow-y-auto"
                        >
                          {[
                            { name: "Organic Rice 25kg", rate: 42.0, tl: "item-opt-organic-rice" },
                            { name: "Palm Oil 5L", rate: 18.5, tl: "item-opt-palm-oil" },
                            { name: "Cassava Flour 10kg", rate: 24.0, tl: "item-opt-cassava-flour" },
                            { name: "Ground Pepper 500g", rate: 6.5, tl: "item-opt-ground-pepper" },
                            { name: "Honey Beans 1kg", rate: 9.0, tl: "item-opt-honey-beans" },
                            { name: "Yam Tubers", rate: 14.0, tl: "item-opt-yam-tubers" },
                            { name: "Packaging Boxes", rate: 12.0, tl: "item-opt-packaging-boxes" },
                            { name: "Delivery Fee", rate: 10.0, tl: "item-opt-delivery-fee" },
                          ].map((catItem) => (
                            <button
                              key={catItem.name}
                              type="button"
                              data-tl={catItem.tl}
                              onClick={() => handleSelectItem(idx, catItem.name, catItem.rate)}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 text-gray-700 hover:text-[#7014D9] cursor-pointer flex items-center justify-between"
                            >
                              <span>{catItem.name}</span>
                              <span className="font-semibold text-gray-900">
                                {catItem.rate.toFixed(2)}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        data-tl={`input-item-qty-${idx}`}
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = parseFloat(e.target.value) || 0;
                          const updated = [...lineItems];
                          updated[idx] = {
                            ...updated[idx],
                            quantity: qty,
                            amount: qty * updated[idx].rate,
                          };
                          tl.setVar("booksQuoteLineItems", updated);
                        }}
                        className="w-16 px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-center text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
                      />
                    </td>

                    {/* Rate */}
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        data-tl={`input-item-rate-${idx}`}
                        value={item.rate}
                        onChange={(e) => {
                          const rate = parseFloat(e.target.value) || 0;
                          const updated = [...lineItems];
                          updated[idx] = {
                            ...updated[idx],
                            rate,
                            amount: updated[idx].quantity * rate,
                          };
                          tl.setVar("booksQuoteLineItems", updated);
                        }}
                        className="w-20 px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-right text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
                      />
                    </td>

                    {/* Tax */}
                    <td className="py-3 px-4 relative">
                      <button
                        type="button"
                        data-tl={`select-item-tax-${idx}`}
                        onClick={() =>
                          setActiveTaxMenuIndex(
                            activeTaxMenuIndex === idx ? null : idx
                          )
                        }
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-left text-gray-800 flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{item.tax || "Select a Tax"}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </button>

                      {activeTaxMenuIndex === idx && (
                        <div
                          data-tl={`menu-tax-options-${idx}`}
                          className="absolute top-full left-4 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-40"
                        >
                          {QUOTE_TAX_OPTIONS.map((tOpt) => (
                            <button
                              key={tOpt}
                              type="button"
                              data-tl={
                                tOpt === "VAT Standard (20%)"
                                  ? "tax-opt-vat-standard"
                                  : tOpt === "VAT Reduced (5%)"
                                  ? "tax-opt-vat-reduced"
                                  : tOpt === "Zero Rated (0%)"
                                  ? "tax-opt-zero-rated"
                                  : "tax-opt-select"
                              }
                              onClick={() => handleSelectTax(idx, tOpt)}
                              className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-700 cursor-pointer"
                            >
                              {tOpt}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Amount */}
                    <td
                      data-tl={`display-item-amount-${idx}`}
                      className="py-3 px-4 text-right font-medium text-gray-900"
                    >
                      {item.amount.toFixed(2)}
                    </td>

                    {/* Trash Button */}
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        data-tl={`btn-delete-item-row-${idx}`}
                        onClick={() => handleDeleteRow(idx)}
                        className="p-1 text-gray-400 hover:text-rose-600 rounded cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              data-tl="btn-add-item-row"
              onClick={handleAddRow}
              className="text-[#2563EB] hover:underline font-medium cursor-pointer"
            >
              + Add New Row
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              data-tl="btn-add-items-bulk"
              onClick={() => tl.setVar("booksQuoteBulkItemsDialogOpen", true)}
              className="text-[#2563EB] hover:underline font-medium cursor-pointer"
            >
              Add Items in Bulk
            </button>
          </div>

          {/* Sub Total & Calculations Box */}
          <div className="flex justify-end pt-3">
            <div className="w-80 space-y-3">
              <div className="flex justify-between items-center text-gray-600">
                <span>Sub Total</span>
                <span data-tl="quote-sub-total" className="font-semibold text-gray-900">
                  {subTotal.toFixed(2)}
                </span>
              </div>

              {/* Discount Row */}
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-1">Discount</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      data-tl="input-quote-discount"
                      value={discountPercent}
                      onChange={(e) =>
                        tl.setVar("booksQuoteDiscount", parseFloat(e.target.value) || 0)
                      }
                      className="w-14 px-2 py-1 text-right text-xs focus:outline-none"
                    />
                    <span className="px-2 py-1 bg-gray-50 border-l border-gray-200 text-gray-500 text-[11px]">
                      %
                    </span>
                  </div>
                  <span
                    data-tl="quote-discount-amount"
                    className="w-16 text-right font-medium text-gray-800"
                  >
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Row */}
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-1">
                  Shipping Charges <Info className="w-3 h-3 text-gray-400" />
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    data-tl="input-quote-shipping"
                    value={shipping}
                    onChange={(e) =>
                      tl.setVar("booksQuoteShipping", parseFloat(e.target.value) || 0)
                    }
                    className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#7014D9]"
                  />
                  <span
                    data-tl="quote-shipping-amount"
                    className="w-16 text-right font-medium text-gray-800"
                  >
                    {shipping.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Adjustment Row */}
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-1">Adjustment</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    data-tl="input-quote-adjustment"
                    value={adjustment}
                    onChange={(e) =>
                      tl.setVar("booksQuoteAdjustment", parseFloat(e.target.value) || 0)
                    }
                    className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#7014D9]"
                  />
                  <span
                    data-tl="quote-adjustment-amount"
                    className="w-16 text-right font-medium text-gray-800"
                  >
                    {adjustment.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-sm font-bold text-[#2563EB]">
                <span>Total ( GBP )</span>
                <span data-tl="quote-total-amount">{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes & File Attachments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2">
            <label className="block font-semibold text-gray-900">
              Customer Notes
            </label>
            <textarea
              data-tl="input-customer-notes"
              rows={3}
              value={customerNotes}
              onChange={(e) => tl.setVar("booksQuoteCustomerNotes", e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2.5">
            <label className="block font-semibold text-gray-900">
              Attach File(s) to Quote
            </label>
            <button
              type="button"
              data-tl="btn-upload-quote-file"
              onClick={() => tl.setVar("booksQuoteFilePickerOpen", true)}
              className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-gray-500" />
              <span>Upload File</span>
            </button>

            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {files.map((fName) => (
                  <div
                    key={fName}
                    data-tl="quote-file-chip"
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-[#7014D9] rounded-lg border border-purple-200 font-medium text-[11px]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{fName}</span>
                    <button
                      type="button"
                      data-tl="btn-remove-quote-file"
                      onClick={() =>
                        tl.setVar(
                          "booksQuoteFiles",
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
              You can upload a maximum of 5 files, 10MB each
            </p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2 text-xs">
          <label className="block font-semibold text-gray-900">
            Terms &amp; Conditions
          </label>
          <textarea
            data-tl="input-quote-terms"
            rows={3}
            placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
            value={terms}
            onChange={(e) => tl.setVar("booksQuoteTerms", e.target.value)}
            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        {/* Additional Fields Note */}
        <div
          data-tl="note-additional-fields"
          className="text-xs text-[#2563EB] font-medium"
        >
          Additional Fields: Start adding custom fields for your quotes by going to Settings → Sales → Quotes.
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-save-quote-draft"
              onClick={handleSaveAsDraft}
              className="px-5 py-2 bg-white border border-[#7014D9] text-[#7014D9] hover:bg-purple-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              Save as Draft
            </button>
            <button
              type="button"
              data-tl="btn-save-send-quote"
              onClick={handleSaveAndSend}
              className="px-5 py-2 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              Save and Send
            </button>
            <button
              type="button"
              data-tl="btn-cancel-quote"
              onClick={() => {
                tl.setVar("booksView", "quotes");
                tl.setUrl(BOOKS_URLS.quotes);
              }}
              className="px-4 py-2 text-gray-500 hover:text-gray-800 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="text-xs text-gray-500">
            <span>PDF Template: &apos;Standard Template&apos; </span>
            <button
              type="button"
              data-tl="link-pdf-template"
              className="text-[#2563EB] hover:underline cursor-pointer font-medium"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
