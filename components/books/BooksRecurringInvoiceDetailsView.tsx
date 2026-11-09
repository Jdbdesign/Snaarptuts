"use client";

import type { Timeline } from "@/lib/timeline";
import {
  ChevronLeft,
  Home,
  Download,
  Printer,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";

interface Props {
  tl: Timeline;
}

export function BooksRecurringInvoiceDetailsView({ tl }: Props) {
  const profiles = [
    {
      id: "rec-1",
      name: "Monthly Retainer",
      customer: "Northfield Cafe",
      frequency: "Monthly",
      start: "01/10/2026",
      end: "01/10/2027",
      status: "Active",
      amount: "125.00",
    },
    {
      id: "rec-2",
      name: "Quarterly Maintenance",
      customer: "Sterling Interiors",
      frequency: "Quarterly",
      start: "01/09/2026",
      end: "01/09/2027",
      status: "Active",
      amount: "450.00",
    },
    {
      id: "rec-3",
      name: "Annual Subscription",
      customer: "Greenleaf Bakery",
      frequency: "Yearly",
      start: "15/08/2026",
      end: "15/08/2027",
      status: "Active",
      amount: "960.00",
    },
  ];

  return (
    <div
      data-tl="recurring-invoices-report-container"
      className="flex flex-col h-full w-full bg-white select-none overflow-hidden"
    >
      {/* 1. Breadcrumbs */}
      <div
        data-tl="recurring-invoices-report-header"
        className="flex items-center gap-2 px-8 pt-4 pb-2 text-xs text-gray-500 border-b border-gray-100"
      >
        <button
          type="button"
          data-tl="btn-rec-back"
          onClick={() => {
            tl.setVar("booksView", "reports-center");
            tl.setUrl(BOOKS_URLS.reportsCenter);
          }}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-gray-300">|</span>
        <Home className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-400">&gt;</span>
        <button
          type="button"
          onClick={() => {
            tl.setVar("booksView", "reports-center");
            tl.setUrl(BOOKS_URLS.reportsCenter);
          }}
          className="text-gray-600 hover:underline cursor-pointer"
        >
          Reports
        </button>
        <span className="text-gray-400">&gt;</span>
        <span className="font-semibold text-gray-900">Recurring Invoice Details</span>
      </div>

      {/* 2. Top Title Bar */}
      <div className="flex items-center justify-between px-8 py-3 bg-white">
        <div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            Recurring Invoices
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Recurring Invoice Details
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-rec-download"
            title="Download"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-tl="btn-rec-print"
            title="Print"
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Subline */}
      <div className="px-8 py-2 text-xs text-gray-500 border-b border-gray-200 bg-[#FAFAFA]">
        <span
          data-tl="recurring-invoices-count-line"
          className="font-medium text-gray-700"
        >
          3 recurring invoice profiles
        </span>
      </div>

      {/* 4. Table Area */}
      <div
        data-tl="rec-content-scroll"
        data-scroller="true"
        className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F6F6F8]"
      >
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#FAFAFA] text-gray-500 font-semibold text-[11px] uppercase">
                <th className="py-2.5 px-4 text-left">PROFILE NAME</th>
                <th className="py-2.5 px-4 text-left">CUSTOMER</th>
                <th className="py-2.5 px-3 text-center">FREQUENCY</th>
                <th className="py-2.5 px-3 text-center">START</th>
                <th className="py-2.5 px-3 text-center">END</th>
                <th className="py-2.5 px-3 text-center">STATUS</th>
                <th className="py-2.5 px-4 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {profiles.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4 font-medium text-[#1D4ED8] hover:underline cursor-pointer">
                    {p.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {p.customer}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-600">
                    {p.frequency}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-600 font-mono text-[11px]">
                    {p.start}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-600 font-mono text-[11px]">
                    {p.end}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    £{p.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
