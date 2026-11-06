"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type InvoiceItem,
  INITIAL_INVOICES,
  INVOICE_STATUS_FILTERS,
} from "./books-data";
import { Search, ChevronDown, Plus, Upload } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksInvoicesView({ tl }: Props) {
  const invoices = useTimelineVar<InvoiceItem[]>(
    tl,
    "booksInvoices",
    INITIAL_INVOICES
  );
  const filter = useTimelineVar<string>(tl, "booksInvoiceFilter", "all");
  const searchQuery = useTimelineVar<string>(tl, "booksInvoiceSearch", "");
  const statusDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksInvoiceStatusDropdownOpen",
    false
  );

  const filteredInvoices = invoices.filter((inv) => {
    // Status filter
    if (filter === "unpaid") {
      if (inv.balanceDue <= 0 && inv.status === "Paid") return false;
      if (inv.status === "Draft") return false;
    } else if (filter === "partially-paid") {
      if (inv.status !== "Partially Paid") return false;
    } else if (filter !== "all") {
      if (inv.status.toLowerCase() !== filter.toLowerCase()) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchCustomer = inv.customerName.toLowerCase().includes(q);
      const matchNumber = inv.invoiceNumber.toLowerCase().includes(q);
      if (!matchCustomer && !matchNumber) return false;
    }

    return true;
  });

  const getStatusBadge = (status: InvoiceItem["status"]) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Sent":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Partially Paid":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "Paid":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "Overdue":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const currentFilterObj = INVOICE_STATUS_FILTERS.find((f) => f.id === filter);
  const currentFilterLabel = currentFilterObj ? currentFilterObj.label : "All";

  return (
    <div
      data-tl="books-invoices-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="invoices-title"
              className="text-2xl font-bold text-gray-900"
            >
              All Invoices
            </h1>
            <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                data-tl="input-invoices-search"
                placeholder="Search in Invoices..."
                value={searchQuery}
                onChange={(e) => tl.setVar("booksInvoiceSearch", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] transition-all"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-tl="btn-invoices-filter"
                onClick={() =>
                  tl.setVar(
                    "booksInvoiceStatusDropdownOpen",
                    !statusDropdownOpen
                  )
                }
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{currentFilterLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {statusDropdownOpen && (
                <div
                  data-tl="menu-invoices-status"
                  className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                >
                  {INVOICE_STATUS_FILTERS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      data-tl={`status-opt-${opt.id}`}
                      onClick={() => {
                        tl.setVar("booksInvoiceFilter", opt.id);
                        tl.setVar("booksInvoiceStatusDropdownOpen", false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 transition-colors cursor-pointer ${
                        filter === opt.id
                          ? "bg-purple-50 text-[#7014D9] font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions: Import & + New Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="btn-import-invoices"
              onClick={() => tl.setVar("booksInvoiceImportDrawerOpen", true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-gray-500" />
              <span>Import</span>
            </button>

            <button
              type="button"
              data-tl="btn-new-invoice"
              onClick={() => {
                tl.setVar("booksView", "new-invoice");
                tl.setUrl(BOOKS_URLS.newInvoice);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New</span>
            </button>
          </div>
        </div>

        {/* Invoices Table Card */}
        <div
          data-tl="card-invoices-table"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th data-tl="th-invoice-number" className="py-3 px-5">
                  Invoice#
                </th>
                <th data-tl="th-customer-name" className="py-3 px-5">
                  Customer Name
                </th>
                <th data-tl="th-invoice-date" className="py-3 px-5">
                  Date
                </th>
                <th data-tl="th-invoice-due-date" className="py-3 px-5">
                  Due Date
                </th>
                <th data-tl="th-invoice-amount" className="py-3 px-5 text-right">
                  Amount
                </th>
                <th data-tl="th-invoice-balance" className="py-3 px-5 text-right">
                  Balance Due
                </th>
                <th
                  data-tl="th-invoice-status"
                  className="py-3 px-5 text-center"
                >
                  All
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredInvoices.map((inv, idx) => (
                <tr
                  key={inv.id}
                  data-tl={`invoice-row-${idx + 1}`}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  <td className="py-3.5 px-5 font-medium">
                    <button
                      type="button"
                      data-tl={`invoice-link-${idx + 1}`}
                      onClick={() => {
                        tl.setVar("booksActiveInvoice", inv);
                        tl.setVar("booksView", "invoice-detail");
                        tl.setUrl(BOOKS_URLS.invoiceDetails);
                      }}
                      className="text-gray-900 hover:text-[#7014D9] cursor-pointer"
                    >
                      {inv.invoiceNumber}
                    </button>
                  </td>
                  <td className="py-3.5 px-5 text-gray-700">
                    {inv.customerName}
                  </td>
                  <td className="py-3.5 px-5 text-gray-500">{inv.date}</td>
                  <td className="py-3.5 px-5 text-gray-500">{inv.dueDate}</td>
                  <td className="py-3.5 px-5 text-right font-medium text-gray-900">
                    GBP {inv.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-5 text-right font-medium text-gray-900">
                    GBP {inv.balanceDue.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <span
                      data-tl={`badge-status-${idx + 1}`}
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getStatusBadge(
                        inv.status
                      )}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-400 text-xs"
                  >
                    No invoices found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
