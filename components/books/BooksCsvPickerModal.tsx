"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FileSpreadsheet, X, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksCsvPickerModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksCsvPickerOpen", false);
  const selectedFile = useTimelineVar<string>(tl, "booksCsvSelectedFile", "items-export-2026-10-11.csv");

  if (!isOpen) return null;

  return (
    <div
      data-tl="books-csv-picker-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div
        data-tl="csv-picker-card"
        className="w-[440px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-base font-semibold text-gray-900">Select CSV File</h3>
          <button
            type="button"
            data-tl="btn-close-csv-picker"
            onClick={() => tl.setVar("booksCsvPickerOpen", false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div
            data-tl="sample-file-items-export-csv"
            onClick={() => {
              tl.setVar("booksCsvSelectedFile", "items-export-2026-10-11.csv");
            }}
            className={`flex items-center justify-between rounded-xl border-2 p-3.5 cursor-pointer transition-colors ${
              selectedFile === "items-export-2026-10-11.csv"
                ? "border-blue-500 bg-blue-50/50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <FileSpreadsheet size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">items-export-2026-10-11.csv</p>
                <p className="text-xs text-gray-500">1.8 KB · 2 data rows · 6 columns</p>
              </div>
            </div>
            {selectedFile === "items-export-2026-10-11.csv" && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                <Check size={14} />
              </span>
            )}
          </div>

          <div
            data-tl="sample-file-items-csv"
            onClick={() => {
              tl.setVar("booksCsvSelectedFile", "items-import.csv");
            }}
            className={`flex items-center justify-between rounded-xl border-2 p-3.5 cursor-pointer transition-colors ${
              selectedFile === "items-import.csv"
                ? "border-blue-500 bg-blue-50/50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <FileSpreadsheet size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">items-import.csv</p>
                <p className="text-xs text-gray-500">4.2 KB · 3 new items ready to import</p>
              </div>
            </div>
            {selectedFile === "items-import.csv" && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                <Check size={14} />
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            data-tl="btn-cancel-csv-picker"
            onClick={() => tl.setVar("booksCsvPickerOpen", false)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-picker-confirm"
            onClick={() => {
              const file = selectedFile || "items-export-2026-10-11.csv";
              tl.setVar("booksCsvSelectedFile", file);
              tl.setVar("booksImportFile", file);
              tl.setVar("booksCsvPickerOpen", false);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Select File
          </button>
        </div>
      </div>
    </div>
  );
}
