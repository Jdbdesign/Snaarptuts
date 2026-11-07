"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, type Bill, type BillItemRow } from "./books-data";
import {
  ArrowLeft,
  Home,
  ChevronRight,
  ChevronDown,
  Calendar,
  FileText,
  Trash2,
  Upload,
  Paperclip,
} from "lucide-react";
import { BooksDatePickerPopover } from "./BooksDatePickerPopover";

type Props = {
  tl: Timeline;
};

export function BooksNewBillView({ tl }: Props) {
  // Timeline vars
  const vendorName = useTimelineVar<string>(tl, "booksNewBillVendor", "");
  const billNumber = useTimelineVar<string>(tl, "booksNewBillNumber", "");
  const orderNumber = useTimelineVar<string>(tl, "booksNewBillOrderNumber", "");
  const billDate = useTimelineVar<string>(tl, "booksNewBillDate", "11/07/2026");
  const dueDate = useTimelineVar<string>(tl, "booksNewBillDueDate", "11/07/2026");
  const terms = useTimelineVar<string>(tl, "booksNewBillTerms", "Due on Receipt");
  const subject = useTimelineVar<string>(tl, "booksNewBillSubject", "");
  const notes = useTimelineVar<string>(tl, "booksNewBillNotes", "");
  const attachedFile = useTimelineVar<string>(tl, "booksBillAttachment", "");

  // Local & Form State
  const [vendorOpen, setVendorOpen] = useState(false);
  const [billDatePickerOpen, setBillDatePickerOpen] = useState(false);
  const [dueDatePickerOpen, setDueDatePickerOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Rows state
  const defaultRows: BillItemRow[] = [
    {
      id: "row-0",
      name: "",
      account: "Select an account",
      quantity: 1,
      rate: 0,
      tax: "Select a..",
      amount: 0,
    },
  ];
  const items = useTimelineVar<BillItemRow[]>(tl, "booksNewBillItems", defaultRows);

  const [rowItemOpen, setRowItemOpen] = useState<{ [idx: number]: boolean }>({});
  const [rowAccountOpen, setRowAccountOpen] = useState<{ [idx: number]: boolean }>({});
  const [rowTaxOpen, setRowTaxOpen] = useState<{ [idx: number]: boolean }>({});

  const handleBack = () => {
    tl.setVar("booksView", "bills");
    tl.setUrl(BOOKS_URLS.bills);
  };

  const handleAddRow = () => {
    const newRow: BillItemRow = {
      id: `row-${items.length}`,
      name: "",
      account: "Select an account",
      quantity: 1,
      rate: 0,
      tax: "Select a..",
      amount: 0,
    };
    tl.setVar("booksNewBillItems", [...items, newRow]);
  };

  const updateRow = (index: number, patch: Partial<BillItemRow>) => {
    const updated = items.map((r, i) => {
      if (i !== index) return r;
      const next = { ...r, ...patch };
      next.amount = (next.quantity || 0) * (next.rate || 0);
      return next;
    });
    tl.setVar("booksNewBillItems", updated);
  };

  const removeRow = (index: number) => {
    if (items.length <= 1) return;
    const updated = items.filter((_, i) => i !== index);
    tl.setVar("booksNewBillItems", updated);
  };

  // Calculations
  const subTotal = items.reduce((sum, r) => sum + (r.amount || 0), 0);
  const taxTotal = items.reduce((sum, r) => {
    if (r.tax.includes("20%")) {
      return sum + (r.amount || 0) * 0.2;
    }
    return sum;
  }, 0);
  const grandTotal = subTotal + taxTotal;

  const handleSaveAsOpen = () => {
    setIsSaving(true);
    setTimeout(() => {
      const currentBills = tl.getVar<Bill[]>("booksBills", []);
      const newBill: Bill = {
        id: billNumber || "BILL-1200",
        billNumber: billNumber || "BILL-1200",
        vendorName: vendorName || "Greenfield Packaging Ltd",
        date: billDate || "11/07/2026",
        dueDate: dueDate || "11/09/2026",
        orderNumber: orderNumber || "PO-5521",
        amount: grandTotal || 5040.0,
        status: "Open",
        balanceDue: grandTotal || 5040.0,
        subject: subject || "Materials for building",
        terms: terms || "Due on Receipt",
        items: items,
        subTotal: subTotal || 4200.0,
        taxAmount: taxTotal || 840.0,
        total: grandTotal || 5040.0,
        notes: notes,
        files: attachedFile ? [attachedFile] : [],
      };
      tl.setVar("booksBills", [
        newBill,
        ...currentBills.filter((b) => b.id !== newBill.id),
      ]);
      tl.setVar("booksToastText", "Bill saved successfully");
      tl.setVar("booksToastOpen", true);
      tl.setVar("booksView", "bills");
      tl.setUrl(BOOKS_URLS.bills);
      setIsSaving(false);
    }, 500);
  };

  return (
    <div
      data-tl="books-new-bill-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-bills"
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
            <span>Bills</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-900 font-medium">New</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">New Bill</h1>
        </div>

        {/* Top Header Fields */}
        <div className="space-y-4 text-xs text-gray-700">
          {/* Vendor Name */}
          <div className="grid grid-cols-6 items-center gap-4">
            <label className="col-span-1 font-semibold text-gray-800">
              Vendor Name<span className="text-red-500">*</span>
            </label>
            <div className="col-span-5 relative flex items-center gap-3">
              <div className="flex-1 relative">
                <button
                  type="button"
                  data-tl="select-bill-vendor"
                  onClick={() => setVendorOpen(!vendorOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
                >
                  <span className={vendorName ? "text-gray-900 font-medium" : "text-gray-400"}>
                    {vendorName || "Select a vendor"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {vendorOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1">
                    <div
                      data-tl="opt-bill-vendor-greenfield"
                      onClick={() => {
                        tl.setVar("booksNewBillVendor", "Greenfield Packaging Ltd");
                        setVendorOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                    >
                      Greenfield Packaging Ltd
                    </div>
                    <div
                      data-tl="opt-bill-vendor-victor"
                      onClick={() => {
                        tl.setVar("booksNewBillVendor", "Victor Stationery");
                        setVendorOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                    >
                      Victor Stationery
                    </div>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 font-medium px-2">GBP</span>
            </div>
          </div>

          {/* Bill# and Order Number */}
          <div className="grid grid-cols-6 items-center gap-4">
            <label className="col-span-1 font-semibold text-gray-800">
              Bill#<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2">
              <input
                type="text"
                data-tl="input-bill-number"
                value={billNumber}
                onChange={(e) => tl.setVar("booksNewBillNumber", e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <label className="col-span-1 font-semibold text-gray-800 text-right pr-2">
              Order Number
            </label>
            <div className="col-span-2">
              <input
                type="text"
                data-tl="input-bill-order-number"
                value={orderNumber}
                onChange={(e) => tl.setVar("booksNewBillOrderNumber", e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bill Date & Due Date with Terms */}
          <div className="grid grid-cols-6 items-center gap-4">
            <label className="col-span-1 font-semibold text-gray-800">
              Bill Date<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2 relative">
              <input
                type="text"
                data-tl="input-bill-date"
                value={billDate}
                readOnly
                onClick={() => setBillDatePickerOpen(!billDatePickerOpen)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs cursor-pointer focus:outline-none"
              />
              <Calendar
                onClick={() => setBillDatePickerOpen(!billDatePickerOpen)}
                className="absolute right-3.5 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
              />

              {billDatePickerOpen && (
                <BooksDatePickerPopover
                  onSelect={(d) => {
                    tl.setVar("booksNewBillDate", d || "11/07/2026");
                    setBillDatePickerOpen(false);
                  }}
                  onClose={() => setBillDatePickerOpen(false)}
                  todayDateStr="11/07/2026"
                />
              )}
            </div>

            <label className="col-span-1 font-semibold text-gray-800 text-right pr-2">
              Due Date
            </label>
            <div className="col-span-2 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  data-tl="input-bill-due-date"
                  value={dueDate}
                  readOnly
                  onClick={() => setDueDatePickerOpen(!dueDatePickerOpen)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs cursor-pointer focus:outline-none"
                />
                <Calendar
                  onClick={() => setDueDatePickerOpen(!dueDatePickerOpen)}
                  className="absolute right-3.5 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
                />

                {dueDatePickerOpen && (
                  <BooksDatePickerPopover
                    onSelect={(d) => {
                      tl.setVar("booksNewBillDueDate", d || "11/09/2026");
                      setDueDatePickerOpen(false);
                    }}
                    onClose={() => setDueDatePickerOpen(false)}
                    todayDateStr="11/09/2026"
                  />
                )}
              </div>

              {/* Terms Select */}
              <div className="relative w-36">
                <button
                  type="button"
                  data-tl="select-bill-terms"
                  onClick={() => setTermsOpen(!termsOpen)}
                  className="w-full flex items-center justify-between px-2.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
                >
                  <span className="truncate">{terms}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>

                {termsOpen && (
                  <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1">
                    {[
                      { id: "due-on-receipt", label: "Due on Receipt" },
                      { id: "net15", label: "Net 15" },
                      { id: "net30", label: "Net 30" },
                      { id: "net60", label: "Net 60" },
                    ].map((t) => (
                      <div
                        key={t.id}
                        data-tl={`opt-terms-${t.id}`}
                        onClick={() => {
                          tl.setVar("booksNewBillTerms", t.label);
                          setTermsOpen(false);
                        }}
                        className={`px-3 py-1.5 hover:bg-gray-50 cursor-pointer ${
                          terms === t.label ? "bg-purple-50 text-[#7014D9] font-medium" : "text-gray-700"
                        }`}
                      >
                        {t.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="grid grid-cols-6 items-center gap-4">
            <label className="col-span-1 font-semibold text-gray-800">
              Subject
            </label>
            <div className="col-span-5">
              <input
                type="text"
                data-tl="input-bill-subject"
                value={subject}
                onChange={(e) => tl.setVar("booksNewBillSubject", e.target.value)}
                placeholder="It was nice doing business with you"
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Item Table */}
        <div className="space-y-3 pt-4">
          <h2 className="text-sm font-bold text-gray-900">Item Table</h2>

          <div className="border border-gray-200 rounded-lg overflow-visible text-xs">
            <div className="bg-gray-50 text-gray-500 font-semibold grid grid-cols-12 py-2.5 px-4 border-b border-gray-200 uppercase text-[10px] tracking-wider">
              <div className="col-span-4">Item Details</div>
              <div className="col-span-3">Account</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-center">Rate</div>
              <div className="col-span-1 text-center">Tax</div>
              <div className="col-span-1 text-right">Amount</div>
              <div className="col-span-1 text-right"></div>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((row, idx) => (
                <div
                  key={row.id || idx}
                  className="grid grid-cols-12 py-2.5 px-4 items-center gap-2 relative"
                >
                  {/* Item Details */}
                  <div className="col-span-4 relative">
                    <input
                      type="text"
                      data-tl={`input-bill-item-${idx}`}
                      value={row.name}
                      readOnly
                      onClick={() =>
                        setRowItemOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      placeholder="Type or click to select an item"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs cursor-pointer focus:outline-none"
                    />

                    {rowItemOpen[idx] && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1 max-h-56 overflow-y-auto">
                        <div
                          data-tl="opt-bill-item-rice"
                          onClick={() => {
                            updateRow(idx, {
                              name: "Organic Rice 25kg",
                              rate: 200.0,
                            });
                            setRowItemOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                        >
                          <span className="font-medium">Organic Rice 25kg</span>
                          <span className="text-gray-500">200.00</span>
                        </div>
                        <div
                          data-tl="opt-bill-item-palm"
                          onClick={() => {
                            updateRow(idx, {
                              name: "Palm Oil 5L",
                              rate: 40.0,
                            });
                            setRowItemOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                        >
                          <span className="font-medium">Palm Oil 5L</span>
                          <span className="text-gray-500">40.00</span>
                        </div>
                        <div
                          data-tl="opt-bill-item-cassava"
                          onClick={() => {
                            updateRow(idx, {
                              name: "Cassava Flour 10kg",
                              rate: 18.0,
                            });
                            setRowItemOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                        >
                          <span className="font-medium">Cassava Flour 10kg</span>
                          <span className="text-gray-500">18.00</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Account */}
                  <div className="col-span-3 relative">
                    <button
                      type="button"
                      data-tl={`select-bill-account-${idx}`}
                      onClick={() =>
                        setRowAccountOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className="w-full flex items-center justify-between px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
                    >
                      <span className="truncate">{row.account}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    </button>

                    {rowAccountOpen[idx] && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1">
                        <div
                          data-tl={`opt-account-cogs-${idx}`}
                          onClick={() => {
                            updateRow(idx, { account: "Cost of Goods Sold" });
                            setRowAccountOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                        >
                          Cost of Goods Sold
                        </div>
                        <div
                          data-tl={`opt-account-depreciation-${idx}`}
                          onClick={() => {
                            updateRow(idx, { account: "Depreciation Expense" });
                            setRowAccountOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                        >
                          Depreciation Expense
                        </div>
                        <div
                          data-tl={`opt-account-advertising-${idx}`}
                          onClick={() => {
                            updateRow(idx, { account: "Advertising and Marketing" });
                            setRowAccountOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800"
                        >
                          Advertising and Marketing
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1">
                    <input
                      type="text"
                      data-tl={`input-bill-qty-${idx}`}
                      value={row.quantity}
                      onChange={(e) =>
                        updateRow(idx, { quantity: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-center focus:outline-none"
                    />
                  </div>

                  {/* Rate */}
                  <div className="col-span-1">
                    <input
                      type="text"
                      data-tl={`input-bill-rate-${idx}`}
                      value={row.rate}
                      onChange={(e) =>
                        updateRow(idx, { rate: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-center focus:outline-none"
                    />
                  </div>

                  {/* Tax */}
                  <div className="col-span-1 relative">
                    <button
                      type="button"
                      data-tl={`select-bill-tax-${idx}`}
                      onClick={() =>
                        setRowTaxOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className="w-full flex items-center justify-between px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-left cursor-pointer hover:border-gray-300"
                    >
                      <span className="truncate">{row.tax}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
                    </button>

                    {rowTaxOpen[idx] && (
                      <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1">
                        <div
                          data-tl={`opt-tax-vat20-${idx}`}
                          onClick={() => {
                            updateRow(idx, { tax: "VAT Standard (20%)" });
                            setRowTaxOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                        >
                          VAT Standard (20%)
                        </div>
                        <div
                          data-tl={`opt-tax-notax-${idx}`}
                          onClick={() => {
                            updateRow(idx, { tax: "No Tax" });
                            setRowTaxOpen((prev) => ({ ...prev, [idx]: false }));
                          }}
                          className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-800"
                        >
                          No Tax
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div
                    data-tl={`cell-bill-amount-${idx}`}
                    className="col-span-1 text-right font-medium text-gray-900 pr-1"
                  >
                    {row.amount.toFixed(2)}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 text-right">
                    <button
                      type="button"
                      data-tl={`btn-delete-row-${idx}`}
                      onClick={() => removeRow(idx)}
                      className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Rows link */}
          <div className="flex items-center gap-3 text-xs pt-1">
            <button
              type="button"
              data-tl="btn-add-bill-row"
              onClick={handleAddRow}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              + Add New Row
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              data-tl="btn-bill-bulk-items"
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Add Items in Bulk
            </button>
          </div>
        </div>

        {/* Totals & Notes Section */}
        <div className="grid grid-cols-2 gap-8 pt-4">
          {/* Notes & Attachments Left */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-800 mb-1.5">
                Notes
              </label>
              <textarea
                data-tl="textarea-bill-notes"
                value={notes}
                onChange={(e) => tl.setVar("booksNewBillNotes", e.target.value)}
                rows={4}
                placeholder=""
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 resize-none"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                It will not be shown in PDF
              </p>
            </div>

            {/* Attach Files Box */}
            <div>
              <label className="block font-semibold text-gray-800 mb-1.5">
                Attach File(s) to Bill
              </label>
              <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50/50 space-y-2">
                <button
                  type="button"
                  data-tl="btn-bill-upload-files"
                  onClick={() => tl.setVar("booksBillFilePickerOpen", true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium cursor-pointer shadow-2xs"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span>Upload File</span>
                </button>
                <p className="text-[11px] text-gray-400">
                  You can upload a maximum of 5 files, 10MB each
                </p>

                {attachedFile && (
                  <div
                    data-tl="chip-attached-file"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg text-xs font-medium border border-blue-200 mt-2"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{attachedFile}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Totals Right */}
          <div className="flex justify-end">
            <div className="w-72 space-y-3 text-xs text-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Sub Total</span>
                <span data-tl="bill-subtotal" className="font-semibold text-gray-900">
                  {subTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-gray-600">Discount</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue="0"
                    className="w-16 px-2 py-1 border border-gray-200 rounded text-center text-xs"
                  />
                  <span className="text-gray-400">% 0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax</span>
                <span data-tl="bill-tax-total" className="font-semibold text-gray-900">
                  {taxTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-gray-600">Adjustment</span>
                <input
                  type="text"
                  defaultValue="0"
                  className="w-16 px-2 py-1 border border-gray-200 rounded text-center text-xs"
                />
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-3 text-sm">
                <span className="font-bold text-gray-900">Total (GBP)</span>
                <span data-tl="bill-grand-total" className="font-bold text-gray-900">
                  {grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
          <button
            type="button"
            data-tl="btn-save-as-draft"
            onClick={handleBack}
            className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            data-tl="btn-save-as-open"
            onClick={handleSaveAsOpen}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium cursor-pointer shadow-sm transition-colors"
          >
            {isSaving ? "Saving..." : "Save as Open"}
          </button>
          <button
            type="button"
            data-tl="btn-cancel-bill"
            onClick={handleBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-xs font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
