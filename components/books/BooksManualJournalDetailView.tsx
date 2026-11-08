"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type ManualJournal,
} from "./books-data";
import {
  ArrowLeft,
  Printer,
  Download,
  Calendar,
  Clock,
} from "lucide-react";
import { BooksDatePickerPopover } from "./BooksDatePickerPopover";

interface BooksManualJournalDetailViewProps {
  tl: Timeline;
}

export function BooksManualJournalDetailView({
  tl,
}: BooksManualJournalDetailViewProps) {
  const activeJournal = useTimelineVar<ManualJournal | null>(
    tl,
    "booksActiveJournal",
    null
  );
  const reversePanelOpen = useTimelineVar<boolean>(
    tl,
    "booksReversePanelOpen",
    false
  );
  const reverseDate = useTimelineVar<string>(
    tl,
    "booksReverseDate",
    ""
  );
  const publishOnReverseDate = useTimelineVar<boolean>(
    tl,
    "booksPublishOnReverseDate",
    true
  );
  const datePickerOpen = useTimelineVar<boolean>(
    tl,
    "booksReverseDatePickerOpen",
    false
  );

  const j = activeJournal || {
    id: "jrn-14",
    journalNumber: "JRN-0014",
    date: "21 Oct 2026",
    reference: "INV10005",
    notes: "Auto-post: Invoice INV10005 sent",
    status: "Published",
    total: 84.0,
    currency: "GBP",
    reportingMethod: "Accrual and Cash",
    reverseDate: "",
    lines: [
      {
        id: "line-1",
        account: "1100 - Accounts Receivable",
        description: "AR - Invoice INV10005",
        contact: "CUSTOMER: Acme Foods Ltd",
        debit: 84.0,
      },
      {
        id: "line-2",
        account: "4000 - Sales",
        description: "Revenue - Invoice INV10005",
        credit: 84.0,
      },
    ],
  };

  const handleConfirmReverse = () => {
    if (!reverseDate) return;
    const updatedJournal: ManualJournal = {
      ...j,
      reverseDate: "11 Nov 2026",
      publishOnReverseDate,
    };
    tl.setVar("booksActiveJournal", updatedJournal);
    tl.setVar("booksReversePanelOpen", false);
    tl.setVar("booksToastText", "Reverse journal scheduled");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="view-manual-journal-detail"
      data-scroller="true"
      className="relative flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 space-y-6 max-w-5xl mx-auto w-full">
        {/* Top Header: Back, Breadcrumb, and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-back-to-journals"
              onClick={() => {
                tl.setVar("booksView", "manual-journals");
                tl.setUrl(BOOKS_URLS.manualJournals);
              }}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Accountant</span>
              <span>/</span>
              <span>Manual Journals</span>
              <span>/</span>
              <span className="font-semibold text-gray-900">
                {j.journalNumber}
              </span>
            </div>
            <span
              data-tl="badge-journal-detail-status"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {j.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-journal-pdf-print"
              className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              title="PDF / Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-tl="btn-journal-download"
              className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-tl="btn-schedule-reverse"
              onClick={() => tl.setVar("booksReversePanelOpen", !reversePanelOpen)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>Schedule Reverse</span>
            </button>
          </div>
        </div>

        {/* Schedule Reverse Inline Panel */}
        {reversePanelOpen && (
          <div
            data-tl="panel-schedule-reverse"
            className="p-5 bg-white border border-blue-200 rounded-xl shadow-xs space-y-4 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-gray-900">
                Schedule Reverse Journal
              </h4>
            </div>

            <div className="space-y-3 max-w-md">
              <div className="relative">
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Reverse Journal Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    data-tl="input-reverse-date"
                    readOnly
                    value={reverseDate}
                    onClick={() =>
                      tl.setVar("booksReverseDatePickerOpen", !datePickerOpen)
                    }
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Calendar
                    onClick={() =>
                      tl.setVar("booksReverseDatePickerOpen", !datePickerOpen)
                    }
                    className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  />

                  {datePickerOpen && (
                    <BooksDatePickerPopover
                      tl={tl}
                      todayDateStr="11/08/2026"
                      onSelect={(d) => {
                        tl.setVar("booksReverseDate", d);
                        tl.setVar("booksReverseDatePickerOpen", false);
                      }}
                      onClose={() =>
                        tl.setVar("booksReverseDatePickerOpen", false)
                      }
                    />
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  data-tl="check-publish-on-reverse-date"
                  checked={publishOnReverseDate}
                  onChange={(e) =>
                    tl.setVar("booksPublishOnReverseDate", e.target.checked)
                  }
                  className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span>Publish reverse journal only on the reverse journal date</span>
              </label>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  data-tl="btn-confirm-reverse"
                  disabled={!reverseDate}
                  onClick={handleConfirmReverse}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium text-white transition-colors cursor-pointer ${
                    reverseDate
                      ? "bg-[#2563EB] hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  data-tl="btn-cancel-reverse"
                  onClick={() => tl.setVar("booksReversePanelOpen", false)}
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Journal Details Card */}
        <div
          data-tl="card-journal-details"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-6"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100 gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                {j.journalNumber}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manual Journal Entry
              </p>
            </div>
            {j.reverseDate && (
              <div
                data-tl="chip-reverse-date"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-700"
              >
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Reverse Date: {j.reverseDate}</span>
              </div>
            )}
          </div>

          {/* Key-Value Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-gray-500 font-medium">Journal Date</div>
              <div className="text-gray-900 font-semibold mt-1">{j.date}</div>
            </div>
            <div>
              <div className="text-gray-500 font-medium">Reference#</div>
              <div className="text-gray-900 font-semibold font-mono mt-1">
                {j.reference}
              </div>
            </div>
            <div>
              <div className="text-gray-500 font-medium">Reporting Method</div>
              <div className="text-gray-900 font-semibold mt-1">
                {j.reportingMethod || "Accrual and Cash"}
              </div>
            </div>
            <div>
              <div className="text-gray-500 font-medium">Currency</div>
              <div className="text-gray-900 font-semibold mt-1">{j.currency}</div>
            </div>
          </div>

          {/* Notes */}
          <div className="text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="text-gray-500 font-medium mr-2">Notes:</span>
            <span className="text-gray-800">{j.notes}</span>
          </div>

          {/* Journal Entries Table */}
          <div data-tl="table-journal-entries" className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-gray-50/75 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 w-12 text-center">#</th>
                  <th className="py-2.5 px-4">Account</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4">Contact</th>
                  <th className="py-2.5 px-4 text-right w-28">Debit</th>
                  <th className="py-2.5 px-4 text-right w-28">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 text-center text-gray-400 font-medium">
                    1
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    1100 - Accounts Receivable
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    AR - Invoice INV10005
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    CUSTOMER: Acme Foods Ltd
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    84.00
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400">
                    —
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 text-center text-gray-400 font-medium">
                    2
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    4000 - Sales
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    Revenue - Invoice INV10005
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    —
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400">
                    —
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    84.00
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-gray-50 border-t border-gray-200 font-semibold text-xs text-gray-900">
                <tr>
                  <td colSpan={4} className="py-3 px-4 text-right font-bold">
                    Total
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">
                    84.00
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">
                    84.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
