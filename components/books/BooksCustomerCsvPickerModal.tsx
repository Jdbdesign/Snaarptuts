"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FileSpreadsheet, X, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksCustomerCsvPickerModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksCustomerCsvPickerOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="customers-csv-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] select-none"
    >
      <div className="relative w-[480px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Select CSV File
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose a prepared customer export file to import
            </p>
          </div>
          <button
            type="button"
            onClick={() => tl.setVar("booksCustomerCsvPickerOpen", false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="my-5 space-y-2.5">
          <div
            data-tl="sample-file-customers-csv"
            onClick={() => {
              tl.setVar("booksCustomerCsvSelectedFile", "customers-import.csv");
            }}
            className="flex items-center justify-between rounded-xl border-2 border-blue-500 bg-blue-50/50 p-3.5 cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <FileSpreadsheet size={20} />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-900">
                  customers-import.csv
                </p>
                <p className="text-[11px] text-gray-500">
                  3 customers (Pinewood, Lakeside, Summit) · 1.4 KB
                </p>
              </div>
            </div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
              <Check size={14} />
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={() => tl.setVar("booksCustomerCsvPickerOpen", false)}
            className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-picker-confirm"
            onClick={() => {
              tl.setVar("booksCustomerCsvSelectedFile", "customers-import.csv");
              tl.setVar("booksCustomerCsvPickerOpen", false);
            }}
            className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-medium text-white hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
          >
            Choose File
          </button>
        </div>
      </div>
    </div>
  );
}
