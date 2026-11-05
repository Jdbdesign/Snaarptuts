"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, FileText, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksQuoteFilePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksQuoteFilePickerOpen",
    false
  );
  const currentFiles = useTimelineVar<string[]>(tl, "booksQuoteFiles", []);
  const [selectedFile, setSelectedFile] = useState<string>("Catering-request.pdf");

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksQuoteFilePickerOpen", false);
  };

  const handleAttach = () => {
    if (selectedFile && !currentFiles.includes(selectedFile)) {
      tl.setVar("booksQuoteFiles", [...currentFiles, selectedFile]);
    }
    tl.setVar("booksQuoteFilePickerOpen", false);
  };

  return (
    <div
      data-tl="modal-file-picker-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-file-picker-card"
        className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            data-tl="modal-file-picker-title"
            className="text-base font-bold text-gray-900"
          >
            Attach File to Quote
          </h2>
          <button
            type="button"
            data-tl="btn-close-file-picker"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* File Choices List */}
        <div className="space-y-2 text-xs">
          {[
            {
              name: "Catering-request.pdf",
              size: "1.2 MB",
              tl: "file-option-catering-request",
            },
            {
              name: "Price-list.pdf",
              size: "650 KB",
              tl: "file-option-price-list",
            },
          ].map((file) => {
            const isSelected = selectedFile === file.name;
            return (
              <div
                key={file.name}
                data-tl={file.tl}
                onClick={() => setSelectedFile(file.name)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-purple-50/60 border-purple-200"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7014D9] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      {file.name}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {file.size}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-[#7014D9] text-white"
                      : "border border-gray-300"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            data-tl="btn-cancel-file-picker"
            onClick={handleClose}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-attach-file"
            onClick={handleAttach}
            className="px-4 py-2 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            Attach Selected File
          </button>
        </div>
      </div>
    </div>
  );
}
