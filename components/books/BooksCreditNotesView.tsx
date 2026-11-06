"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type CreditNoteItem,
  INITIAL_CREDIT_NOTES,
} from "./books-data";
import { Search, ChevronDown, Plus, Trash2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksCreditNotesView({ tl }: Props) {
  const notes = useTimelineVar<CreditNoteItem[]>(
    tl,
    "booksCreditNotes",
    INITIAL_CREDIT_NOTES
  );
  const searchQuery = useTimelineVar<string>(tl, "booksCreditNoteSearch", "");

  const filteredNotes = notes.filter((cn) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      cn.customerName.toLowerCase().includes(q) ||
      cn.creditNoteNumber.toLowerCase().includes(q) ||
      cn.status.toLowerCase().includes(q)
    );
  });

  const handleDeleteClick = (e: React.MouseEvent, cn: CreditNoteItem) => {
    e.stopPropagation();
    tl.setVar("booksActiveCreditNote", cn);
    tl.setVar("booksCreditNoteConfirmDialogOpen", true);
  };

  const handleRowClick = (cn: CreditNoteItem) => {
    tl.setVar("booksActiveCreditNote", cn);
    tl.setVar("booksView", "credit-note-details");
    tl.setUrl(BOOKS_URLS.creditNoteDetails);
  };

  return (
    <div
      data-tl="books-credit-notes-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="credit-notes-title"
              className="text-2xl font-bold text-gray-900"
            >
              All Credit Notes
            </h1>
            <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                data-tl="input-search-credit-notes"
                placeholder="Search in Credit Notes..."
                value={searchQuery}
                onChange={(e) =>
                  tl.setVar("booksCreditNoteSearch", e.target.value)
                }
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] transition-all"
              />
            </div>
          </div>

          {/* Right Actions: + New Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="btn-new-credit-note"
              onClick={() => {
                tl.setVar("booksView", "new-credit-note");
                tl.setUrl(BOOKS_URLS.newCreditNote);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New</span>
            </button>
          </div>
        </div>

        {/* Credit Notes Table Card */}
        <div
          data-tl="card-credit-notes-table"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th data-tl="th-credit-note-number" className="py-3 px-5">
                  Credit Note#
                </th>
                <th data-tl="th-customer-name" className="py-3 px-5">
                  Customer Name
                </th>
                <th data-tl="th-credit-note-date" className="py-3 px-5">
                  Date
                </th>
                <th data-tl="th-credit-note-amount" className="py-3 px-5 text-right">
                  Amount
                </th>
                <th data-tl="th-credit-note-status" className="py-3 px-5">
                  Status
                </th>
                <th data-tl="th-credit-note-actions" className="py-3 px-5 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredNotes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-gray-500 italic"
                  >
                    No credit notes found
                  </td>
                </tr>
              ) : (
                filteredNotes.map((cn) => {
                  const cnSlug = cn.id; // "cn-2", "cn-1"
                  return (
                    <tr
                      key={cn.id}
                      data-tl={`credit-note-row-${cnSlug}`}
                      onClick={() => handleRowClick(cn)}
                      className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-5 font-semibold text-[#7014D9]">
                        <span data-tl={`link-credit-note-${cnSlug}`}>
                          {cn.creditNoteNumber}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-gray-900">
                        {cn.customerName}
                      </td>
                      <td className="py-3.5 px-5 text-gray-600">
                        {cn.creditNoteDate}
                      </td>
                      <td className="py-3.5 px-5 text-right font-semibold text-gray-900">
                        £{cn.total.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            cn.status === "Open"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : cn.status === "Closed"
                              ? "bg-gray-100 text-gray-700 border border-gray-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {cn.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <button
                          type="button"
                          data-tl={`btn-delete-credit-note-${cnSlug}`}
                          onClick={(e) => handleDeleteClick(e, cn)}
                          title="Delete credit note"
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
