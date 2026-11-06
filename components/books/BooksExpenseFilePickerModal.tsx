"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Search, FileText, CheckCircle2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

interface SampleFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

const SAMPLE_FILES: SampleFile[] = [
  {
    id: "f-receipt-nov",
    name: "receipt-nov-2026.pdf",
    size: "124 KB",
    type: "PDF Document",
  },
  {
    id: "f-supplier-inv",
    name: "supplier-invoice.pdf",
    size: "88 KB",
    type: "PDF Document",
  },
  {
    id: "f-store-rcpt",
    name: "store-receipt.png",
    size: "210 KB",
    type: "PNG Image",
  },
];

export function BooksExpenseFilePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksExpenseFilePickerOpen", false);
  const [selectedFileId, setSelectedFileId] = useState<string>("f-receipt-nov");
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filtered = SAMPLE_FILES.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectFile = () => {
    const chosen = SAMPLE_FILES.find((f) => f.id === selectedFileId) || SAMPLE_FILES[0];
    tl.setVar("booksAttachedReceipt", chosen.name);
    tl.setVar("booksExpenseFilePickerOpen", false);
  };

  const handleClose = () => {
    tl.setVar("booksExpenseFilePickerOpen", false);
  };

  return (
    <div
      data-tl="modal-expense-file-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Choose Receipt to Attach
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Select a scanned receipt or invoice document from sample uploads
            </p>
          </div>
          <button
            type="button"
            data-tl="btn-close-expense-file-picker"
            onClick={handleClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-xs focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* File List */}
        <div className="max-h-60 overflow-y-auto p-4 space-y-2">
          {filtered.map((f) => {
            const isSelected = f.id === selectedFileId;
            return (
              <div
                key={f.id}
                data-tl={`file-opt-${f.id}`}
                onClick={() => setSelectedFileId(f.id)}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#2563EB] bg-[#EFF6FF] text-[#1E40AF]"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-[#DBEAFE] text-[#2563EB]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{f.name}</div>
                    <div className="text-[11px] text-gray-400">
                      {f.size} • {f.type}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-3.5 bg-gray-50">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-select-expense-file"
            onClick={handleSelectFile}
            className="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-medium text-white hover:bg-[#1D4ED8] transition-colors"
          >
            Attach Selected Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
