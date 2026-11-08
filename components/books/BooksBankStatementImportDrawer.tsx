"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  ChevronDown,
  Check,
  Download,
  UploadCloud,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksBankStatementImportDrawer({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksImportDrawerOpen",
    false
  );
  const importAccount = useTimelineVar<string>(
    tl,
    "booksImportAccount",
    "Main Business Account"
  );
  const importAccountDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksImportAccountDropdownOpen",
    false
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        data-tl="import-statement-overlay"
        onClick={() => tl.setVar("booksImportDrawerOpen", false)}
        className="fixed inset-0 bg-black/30 backdrop-blur-2xs transition-opacity"
      />

      {/* Drawer */}
      <div
        data-tl="drawer-import-statement"
        className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2
                data-tl="title-import-statement"
                className="text-base font-bold text-gray-900 tracking-tight"
              >
                Import Statement
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Upload your bank statement files to import transactions
              </p>
            </div>
            <button
              type="button"
              data-tl="btn-close-import-statement"
              onClick={() => tl.setVar("booksImportDrawerOpen", false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bank Account Selection */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
              <span>Bank Account</span>
              <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              data-tl="select-import-account"
              onClick={() =>
                tl.setVar(
                  "booksImportAccountDropdownOpen",
                  !importAccountDropdownOpen
                )
              }
              className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{importAccount}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {importAccountDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
                <button
                  type="button"
                  data-tl="opt-import-account-main"
                  onClick={() => {
                    tl.setVar(
                      "booksImportAccount",
                      "Main Business Account"
                    );
                    tl.setVar("booksImportAccountDropdownOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Main Business Account</span>
                  {importAccount === "Main Business Account" && (
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </button>
                <button
                  type="button"
                  data-tl="opt-import-account-savings"
                  onClick={() => {
                    tl.setVar(
                      "booksImportAccount",
                      "Jordan Lee Savings"
                    );
                    tl.setVar("booksImportAccountDropdownOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Jordan Lee Savings</span>
                  {importAccount === "Jordan Lee Savings" && (
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </button>
              </div>
            )}
            <p className="text-[11px] text-gray-500 mt-1">
              Transactions will be imported into this bank account.
            </p>
          </div>

          {/* Download CSV Template link */}
          <div>
            <a
              href="#template"
              data-tl="link-download-csv-template"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV template</span>
            </a>
          </div>

          {/* Drag & Drop Zone */}
          <div
            data-tl="dropzone-statement-files"
            className="border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/30 rounded-xl p-8 text-center flex flex-col items-center justify-center transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-gray-800">
              Choose one or more statements (CSV or PDF)
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              or drag and drop here
            </p>
            <p className="text-[10px] text-gray-400 mt-3">
              Supports CSV, OFX, QIF, and PDF statement formats up to 10MB
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-cancel-import"
            onClick={() => tl.setVar("booksImportDrawerOpen", false)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-import"
            className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs opacity-50 cursor-not-allowed"
            disabled
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
