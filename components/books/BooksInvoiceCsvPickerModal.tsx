"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, FileSpreadsheet, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

const SAMPLE_CSV_FILES = [
  { name: "invoices-nov-2026.csv", size: "14.2 KB", date: "Nov 5, 2026" },
  { name: "invoices-q3-backup.csv", size: "28.5 KB", date: "Oct 31, 2026" },
  { name: "archived-invoices-2025.csv", size: "115 KB", date: "Jan 12, 2026" },
];

export function BooksInvoiceCsvPickerModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksInvoiceCsvPickerOpen", false);
  const selectedFile = useTimelineVar(
    tl,
    "booksInvoiceCsvSelectedFile",
    "invoices-nov-2026.csv"
  );

  if (!isOpen) return null;

  const handleSelect = (filename: string) => {
    tl.setVar("booksInvoiceCsvSelectedFile", filename);
    tl.setVar("booksInvoiceCsvPickerOpen", false);
  };

  return (
    <div
      data-tl="modal-invoice-csv-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-invoice-csv-picker-card"
        className="w-[480px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            Select Invoices CSV
          </h2>
          <button
            type="button"
            data-tl="btn-close-invoice-csv-picker"
            onClick={() => tl.setVar("booksInvoiceCsvPickerOpen", false)}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {SAMPLE_CSV_FILES.map((f) => {
            const isSelected = selectedFile === f.name;
            return (
              <div
                key={f.name}
                data-tl="btn-select-invoice-csv-file"
                onClick={() => handleSelect(f.name)}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                  isSelected
                    ? "border-[#7014D9] bg-purple-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{f.name}</p>
                    <p className="text-[11px] text-gray-400">
                      {f.size} • {f.date}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                    isSelected
                      ? "border-[#7014D9] bg-[#7014D9] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => tl.setVar("booksInvoiceCsvPickerOpen", false)}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-invoice-csv-select"
            onClick={() => handleSelect(selectedFile || "invoices-nov-2026.csv")}
            className="px-5 py-2 bg-[#7014D9] hover:bg-[#5b0fb3] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Select File
          </button>
        </div>
      </div>
    </div>
  );
}
