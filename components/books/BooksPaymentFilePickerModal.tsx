"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, FileText, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksPaymentFilePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksPaymentFilePickerOpen",
    false
  );
  const currentFiles = useTimelineVar<string[]>(tl, "booksPaymentFiles", []);
  const [selectedFile, setSelectedFile] = useState<string>("remittance-advice.pdf");

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("booksPaymentFilePickerOpen", false);
  };

  const handleAttach = () => {
    if (selectedFile && !currentFiles.includes(selectedFile)) {
      tl.setVar("booksPaymentFiles", [...currentFiles, selectedFile]);
    }
    tl.setVar("booksPaymentFilePickerOpen", false);
  };

  return (
    <div
      data-tl="modal-payment-file-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-payment-file-picker-card"
        className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            data-tl="modal-payment-file-picker-title"
            className="text-base font-bold text-gray-900"
          >
            Attach File to Payment
          </h2>
          <button
            type="button"
            data-tl="btn-close-payment-file-picker"
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
              name: "remittance-advice.pdf",
              size: "245 KB",
              tl: "file-option-remittance-advice",
            },
            {
              name: "proof-of-payment.pdf",
              size: "1.1 MB",
              tl: "file-option-proof-of-payment",
            },
            {
              name: "bank-confirmation.pdf",
              size: "380 KB",
              tl: "file-option-bank-confirmation",
            },
          ].map((file) => {
            const isSelected = selectedFile === file.name;
            return (
              <div
                key={file.name}
                data-tl={file.tl}
                onClick={() => setSelectedFile(file.name)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#7014D9] bg-purple-50/50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-purple-100 text-[#7014D9]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{file.name}</p>
                    <p className="text-[11px] text-gray-500">{file.size}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#7014D9] flex items-center justify-center text-white">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-payment-file-picker"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-attach-payment-file"
            onClick={handleAttach}
            className="px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Attach File
          </button>
        </div>
      </div>
    </div>
  );
}
