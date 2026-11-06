"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, FileText, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

const SAMPLE_FILES = [
  { id: "f1", name: "PO-4471.pdf", size: "142 KB", date: "Nov 5, 2026" },
  { id: "f2", name: "Contract_Terms_2026.pdf", size: "320 KB", date: "Oct 28, 2026" },
  { id: "f3", name: "Signed_Acceptance_Sheet.pdf", size: "88 KB", date: "Nov 2, 2026" },
];

export function BooksInvoiceFilePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksInvoiceFilePickerOpen",
    false
  );
  const currentFiles = useTimelineVar<string[]>(tl, "booksInvoiceFiles", []);
  const [selectedFile, setSelectedFile] = useState<string>("PO-4471.pdf");

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksInvoiceFilePickerOpen", false);
  };

  const handleAttach = () => {
    if (selectedFile && !currentFiles.includes(selectedFile)) {
      tl.setVar("booksInvoiceFiles", [...currentFiles, selectedFile]);
    }
    tl.setVar("booksInvoiceFilePickerOpen", false);
  };

  return (
    <div
      data-tl="modal-invoice-file-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-invoice-file-picker-card"
        className="w-[500px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            data-tl="modal-invoice-file-title"
            className="text-base font-bold text-gray-900"
          >
            Select Attachment
          </h2>
          <button
            type="button"
            data-tl="btn-close-invoice-file-picker"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Files List */}
        <div className="space-y-2">
          {SAMPLE_FILES.map((f) => {
            const isSelected = selectedFile === f.name;
            return (
              <div
                key={f.id}
                data-tl={`file-invoice-item-${f.id}`}
                onClick={() => setSelectedFile(f.name)}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                  isSelected
                    ? "border-[#7014D9] bg-purple-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                    <FileText className="w-4 h-4 text-[#7014D9]" />
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

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-cancel-invoice-file"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-attach-invoice-file"
            onClick={handleAttach}
            className="px-5 py-2 bg-[#7014D9] hover:bg-[#5b0fb3] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Attach File
          </button>
        </div>
      </div>
    </div>
  );
}
