"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksQuoteNumberingDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksQuoteNumberingDialogOpen",
    false
  );
  const autoGenerate = useTimelineVar<boolean>(
    tl,
    "booksQuoteAutoGenerate",
    true
  );
  const prefix = useTimelineVar<string>(tl, "booksQuotePrefix", "QT-");
  const nextNumber = useTimelineVar<string>(
    tl,
    "booksQuoteNextNumber",
    "000001"
  );

  if (!isOpen) return null;

  const handleSave = () => {
    tl.setVar("booksQuoteNextNumber", nextNumber);
    // Update current new quote input to prefix + nextNumber
    const newQuoteNum = `${prefix}${nextNumber}`;
    tl.setVar("booksQuoteNumber", newQuoteNum);
    tl.setVar("booksQuoteNumberingDialogOpen", false);
    tl.setVar("booksToastText", "Quote numbering format updated");
    tl.setVar("booksToastOpen", true);
  };

  const handleClose = () => {
    tl.setVar("booksQuoteNumberingDialogOpen", false);
  };

  return (
    <div
      data-tl="modal-numbering-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-numbering-card"
        className="w-[440px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            data-tl="modal-numbering-title"
            className="text-base font-bold text-gray-900"
          >
            Configure Quote Numbering
          </h2>
          <button
            type="button"
            data-tl="btn-close-numbering"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Checkbox */}
        <div className="flex items-center justify-between py-1 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-700">
            Auto-generate Quote Number
          </span>
          <button
            type="button"
            data-tl="checkbox-auto-generate"
            onClick={() =>
              tl.setVar("booksQuoteAutoGenerate", !autoGenerate)
            }
            className={`w-5 h-5 rounded flex items-center justify-center transition-colors cursor-pointer ${
              autoGenerate ? "bg-[#2563EB] text-white" : "border border-gray-300"
            }`}
          >
            {autoGenerate && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-600 font-medium mb-1.5">
              Prefix
            </label>
            <input
              type="text"
              data-tl="input-prefix"
              value={prefix}
              onChange={(e) => tl.setVar("booksQuotePrefix", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9]"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1.5">
              Next Number
            </label>
            <input
              type="text"
              data-tl="input-next-number"
              value={nextNumber}
              onChange={(e) =>
                tl.setVar("booksQuoteNextNumber", e.target.value)
              }
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-numbering"
            onClick={handleClose}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-numbering"
            onClick={handleSave}
            className="px-4 py-2 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
