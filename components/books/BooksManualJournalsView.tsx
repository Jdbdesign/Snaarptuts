"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type ManualJournal,
  formatGBP,
} from "./books-data";
import {
  Search,
  Plus,
  ChevronDown,
  Check,
  BookOpen,
  CheckCircle2,
  Upload,
} from "lucide-react";

interface BooksManualJournalsViewProps {
  tl: Timeline;
}

const VIEW_OPTIONS = ["All", "Draft", "Published", "New View"] as const;

export function BooksManualJournalsView({ tl }: BooksManualJournalsViewProps) {
  const journals = useTimelineVar<ManualJournal[]>(
    tl,
    "booksManualJournals",
    []
  );
  const currentView = useTimelineVar<string>(
    tl,
    "booksJournalsView",
    "All"
  );
  const viewDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksJournalsViewOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(
    tl,
    "booksJournalsSearch",
    ""
  );

  // Filter journals based on view and search query
  const filteredJournals = journals.filter((j: ManualJournal) => {
    if (currentView === "Draft" && j.status !== "Draft") return false;
    if (currentView === "Published" && j.status !== "Published") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !j.reference.toLowerCase().includes(q) &&
        !j.journalNumber.toLowerCase().includes(q) &&
        !j.notes.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const handleRowClick = (journal: ManualJournal) => {
    tl.setVar("booksActiveJournal", journal);
    tl.setVar("booksView", "manual-journal-detail");
    tl.setUrl(
      BOOKS_URLS.manualJournalDetails.replace(":id", journal.journalNumber)
    );
  };

  return (
    <div
      data-tl="view-manual-journals"
      data-scroller="true"
      className="relative flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 space-y-4 max-w-7xl mx-auto w-full">
        {/* Top Header: Title dropdown & Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* View Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="btn-journals-view"
              onClick={() =>
                tl.setVar("booksJournalsViewOpen", !viewDropdownOpen)
              }
              className="flex items-center gap-1.5 text-base font-semibold text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <span>{currentView === "All" ? "All Manual Journals" : currentView}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {viewDropdownOpen && (
              <div
                data-tl="menu-journals-view"
                className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
              >
                {VIEW_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    data-tl={`opt-view-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => {
                      tl.setVar("booksJournalsView", opt);
                      tl.setVar("booksJournalsViewOpen", false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>{opt === "All" ? "All Manual Journals" : opt}</span>
                    {currentView === opt && (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Controls: Search & New Button */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                data-tl="input-journals-search"
                value={searchQuery}
                onChange={(e) =>
                  tl.setVar("booksJournalsSearch", e.target.value)
                }
                placeholder="Search in Journals..."
                className="pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 transition-all"
              />
            </div>

            <button
              type="button"
              data-tl="btn-new-journal"
              onClick={() => {
                tl.setVar("booksView", "choose-journal-template");
                tl.setUrl(BOOKS_URLS.chooseJournalTemplate);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
            </button>
          </div>
        </div>

        {/* Content: Empty State for Draft OR Table for All/Published */}
        {currentView === "Draft" && filteredJournals.length === 0 ? (
          <div
            data-tl="empty-draft-journals"
            className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 text-center max-w-2xl mx-auto mt-6 shadow-xs"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-2xs">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900 tracking-tight">
              Start making journal entries.
            </h3>
            <p className="text-xs text-gray-500 mt-1.5 max-w-md leading-relaxed">
              Record manual journal entries to adjust account balances, make end-of-year adjustments, or record complex transactions.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                data-tl="btn-create-new-journal"
                onClick={() => {
                  tl.setVar("booksView", "choose-journal-template");
                  tl.setUrl(BOOKS_URLS.chooseJournalTemplate);
                }}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Create New Journal
              </button>
              <button
                type="button"
                data-tl="btn-import-journals"
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-gray-500" />
                <span>Import Journals</span>
              </button>
            </div>

            {/* Checklist */}
            <div className="w-full mt-8 pt-6 border-t border-gray-100 text-left">
              <p className="text-xs font-semibold text-gray-900 mb-2.5">
                In the Manual Journals module, you can:
              </p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Create draft journals and publish them when approved.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Schedule automatic reversal of accrual journals on custom dates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Create reusable journal templates for routine periodic adjustments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Maintain an immutable double-entry audit trail across financial periods.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Manual Journals Table */
          <div
            data-tl="table-manual-journals"
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs relative"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-32">Date</th>
                  <th className="py-3 px-4 w-32">Journal#</th>
                  <th className="py-3 px-4 w-36">Reference#</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4 w-28">Status</th>
                  <th className="py-3 pr-6 pl-4 text-right w-36">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredJournals.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-400 italic text-xs"
                    >
                      No journals found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredJournals.map((j: ManualJournal) => (
                    <tr
                      key={j.id}
                      data-tl={`row-journal-${j.journalNumber.replace("JRN-00", "").replace("JRN-0", "")}`}
                      onClick={() => handleRowClick(j)}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 text-gray-600 font-medium whitespace-nowrap">
                        {j.date}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap">
                        {j.journalNumber}
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 font-mono text-[11px] whitespace-nowrap">
                        {j.reference || "—"}
                      </td>
                      <td className="py-3.5 px-4 text-gray-800 font-medium">
                        <div
                          className="truncate max-w-[360px]"
                          title={j.notes}
                        >
                          {j.notes}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          data-tl={`badge-journal-status-${j.journalNumber}`}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                            j.status === "Published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              j.status === "Published"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {j.status}
                        </span>
                      </td>
                      <td className="py-3.5 pr-6 pl-4 text-right font-semibold text-gray-900 whitespace-nowrap">
                        {j.currency === "USD"
                          ? `$ ${j.total.toFixed(2)}`
                          : formatGBP(j.total)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
