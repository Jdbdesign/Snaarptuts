"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  FileText,
  Plus,
  ChevronDown,
  Calendar,
  X,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";
import { BooksDatePickerPopover } from "./BooksDatePickerPopover";

type Props = {
  tl: Timeline;
};

export interface VatReturnItem {
  id: string;
  periodLabel: string;
  startDate: string;
  endDate: string;
  scheme: string;
  netVat: number;
  status: "DRAFT" | "FINALISED" | "FILED";
  hmrcRef?: string;
}

export function BooksVatFilingView({ tl }: Props) {
  const configured = useTimelineVar<boolean>(tl, "booksVatConfigured", false);
  const vatNumber = useTimelineVar<string>(tl, "booksVatRegNumber", "");
  const scheme = useTimelineVar<string>(tl, "booksVatScheme", "Standard (accrual)");
  const schemeDropdownOpen = useTimelineVar<boolean>(tl, "booksVatSchemeDropdownOpen", false);

  const prepareModalOpen = useTimelineVar<boolean>(tl, "booksPrepareVatModalOpen", false);
  const periodStart = useTimelineVar<string>(tl, "booksVatPeriodStart", "10/01/2026");
  const periodEnd = useTimelineVar<string>(tl, "booksVatPeriodEnd", "10/31/2026");
  const startPickerOpen = useTimelineVar<boolean>(tl, "booksVatStartPickerOpen", false);
  const endPickerOpen = useTimelineVar<boolean>(tl, "booksVatEndPickerOpen", false);

  const returns = useTimelineVar<VatReturnItem[]>(tl, "booksVatReturns", []);

  const [localNumber, setLocalNumber] = useState(vatNumber);

  return (
    <div
      className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto"
      data-scroller="true"
    >
      <div className="px-8 py-7 w-full max-w-6xl">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            VAT Filing
          </h1>

          {configured && (
            <button
              type="button"
              data-tl="btn-prepare-vat-return"
              onClick={() => tl.setVar("booksPrepareVatModalOpen", true)}
              className="px-4 py-2 bg-[#145CFB] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Prepare return</span>
            </button>
          )}
        </div>

        {!configured ? (
          /* Set up VAT card (Step 193) */
          <div className="mt-12 max-w-md mx-auto border border-gray-200/90 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-1">
              <FileText className="w-5 h-5 text-gray-700" />
              <h2 className="text-base font-bold text-gray-900">Set up VAT</h2>
            </div>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Enter your HMRC VAT registration details to start preparing VAT returns.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  VAT Registration Number<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  data-tl="input-vat-number"
                  value={vatNumber || localNumber}
                  onChange={(e) => {
                    setLocalNumber(e.target.value);
                    tl.setVar("booksVatRegNumber", e.target.value);
                  }}
                  placeholder="e.g. 123456789"
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  VAT Scheme
                </label>
                <button
                  type="button"
                  data-tl="select-vat-scheme"
                  onClick={() => tl.setVar("booksVatSchemeDropdownOpen", !schemeDropdownOpen)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg flex items-center justify-between bg-white text-gray-800 cursor-pointer"
                >
                  <span>{scheme}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {schemeDropdownOpen && (
                  <div
                    data-tl="dropdown-vat-scheme"
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs"
                  >
                    <button
                      type="button"
                      data-tl="vat-scheme-option-standard"
                      onClick={() => {
                        tl.setVar("booksVatScheme", "Standard (accrual)");
                        tl.setVar("booksVatSchemeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Standard (accrual)
                    </button>
                    <button
                      type="button"
                      data-tl="vat-scheme-option-cash"
                      onClick={() => {
                        tl.setVar("booksVatScheme", "Cash accounting");
                        tl.setVar("booksVatSchemeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Cash accounting
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                data-tl="btn-save-vat-setup"
                onClick={() => {
                  tl.setVar("booksVatConfigured", true);
                  tl.toast("VAT settings saved");
                }}
                className="w-full py-2.5 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-xs rounded-lg shadow-sm transition-colors cursor-pointer mt-2"
              >
                Save & enable VAT
              </button>
            </div>
          </div>
        ) : returns.length === 0 ? (
          /* Empty state view matching frame 029 */
          <div className="py-28 text-center">
            <p className="text-xs text-gray-500">
              No VAT returns yet. Prepare a return for a period to get started.
            </p>
          </div>
        ) : (
          /* Table of VAT returns (Step 195 list) */
          <div className="mt-6 border border-gray-200/90 rounded-2xl bg-white overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-500 font-medium">
                <tr>
                  <th className="py-3 px-5">Period</th>
                  <th className="py-3 px-4">Scheme</th>
                  <th className="py-3 px-4 text-right">Net VAT</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {returns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-gray-900">
                      <div>{ret.periodLabel}</div>
                      <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                        {ret.startDate} - {ret.endDate}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{ret.scheme}</td>
                    <td className="py-3.5 px-4 text-right font-medium text-gray-900">
                      £{ret.netVat.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          ret.status === "FILED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : ret.status === "FINALISED"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {ret.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        data-tl="btn-view-vat-return"
                        onClick={() => {
                          tl.setVar("booksView", "vat-return-detail");
                          tl.setUrl(BOOKS_URLS.vatReturnDetail);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Prepare VAT return modal dialog (Step 194) */}
      {prepareModalOpen && (
        <div
          data-tl="modal-prepare-vat"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              data-tl="btn-close-prepare-vat-modal"
              onClick={() => tl.setVar("booksPrepareVatModalOpen", false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-base font-bold text-gray-900">Prepare VAT return</h2>
            <p className="text-xs text-gray-500 mt-1 mb-5 leading-relaxed">
              Choose the VAT period. The nine boxes are computed from your transactions using your VAT scheme.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Period start<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div
                  data-tl="input-vat-period-start"
                  onClick={() => tl.setVar("booksVatStartPickerOpen", !startPickerOpen)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg flex items-center justify-between bg-white text-gray-800 cursor-pointer"
                >
                  <span>{periodStart}</span>
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                </div>
                {startPickerOpen && (
                  <BooksDatePickerPopover
                    todayDateStr="10/01/2026"
                    onSelect={(d) => {
                      tl.setVar("booksVatPeriodStart", d || "10/01/2026");
                      tl.setVar("booksVatStartPickerOpen", false);
                    }}
                    onClose={() => tl.setVar("booksVatStartPickerOpen", false)}
                  />
                )}
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Period end<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div
                  data-tl="input-vat-period-end"
                  onClick={() => tl.setVar("booksVatEndPickerOpen", !endPickerOpen)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg flex items-center justify-between bg-white text-gray-800 cursor-pointer"
                >
                  <span>{periodEnd}</span>
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                </div>
                {endPickerOpen && (
                  <BooksDatePickerPopover
                    todayDateStr="10/31/2026"
                    onSelect={(d) => {
                      tl.setVar("booksVatPeriodEnd", d || "10/31/2026");
                      tl.setVar("booksVatEndPickerOpen", false);
                    }}
                    onClose={() => tl.setVar("booksVatEndPickerOpen", false)}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-modal-prepare-vat"
                onClick={() => {
                  tl.setVar("booksPrepareVatModalOpen", false);
                  tl.setVar("booksView", "vat-return-detail");
                  tl.setUrl(BOOKS_URLS.vatReturnDetail);
                  tl.toast("VAT return prepared");
                }}
                className="px-5 py-2 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Prepare
              </button>
              <button
                type="button"
                data-tl="btn-modal-cancel-vat"
                onClick={() => tl.setVar("booksPrepareVatModalOpen", false)}
                className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
