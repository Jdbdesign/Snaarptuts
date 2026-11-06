"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksCreditNoteNumberingDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksCreditNoteNumberingDialogOpen",
    false
  );
  const autoGenerate = useTimelineVar<boolean>(
    tl,
    "booksCreditNoteAutoGenerate",
    true
  );
  const prefix = useTimelineVar<string>(tl, "booksCreditNotePrefix", "CN-");
  const nextNumber = useTimelineVar<string>(
    tl,
    "booksCreditNoteNextNumber",
    "000003"
  );

  if (!isOpen) return null;

  const handleSave = () => {
    tl.setVar("booksCreditNoteNextNumber", nextNumber);
    const newNum = `${prefix}${nextNumber}`;
    tl.setVar("booksCreditNoteNumber", newNum);
    tl.setVar("booksCreditNoteNumberingDialogOpen", false);
    tl.setVar("booksToastText", "Credit note numbering format updated");
    tl.setVar("booksToastOpen", true);
  };

  const handleClose = () => {
    tl.setVar("booksCreditNoteNumberingDialogOpen", false);
  };

  return (
    <div
      data-tl="modal-credit-note-numbering-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-credit-note-numbering-card"
        className="w-[440px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            data-tl="modal-credit-note-numbering-title"
            className="text-base font-bold text-gray-900"
          >
            Configure Credit Note Numbering
          </h2>
          <button
            type="button"
            data-tl="btn-close-credit-note-numbering"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Checkbox */}
        <div className="flex items-center justify-between py-1 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-700">
            Auto-generate Credit Note Number
          </span>
          <button
            type="button"
            data-tl="checkbox-credit-note-auto-generate"
            onClick={() =>
              tl.setVar("booksCreditNoteAutoGenerate", !autoGenerate)
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
              data-tl="input-credit-note-prefix"
              value={prefix}
              onChange={(e) => tl.setVar("booksCreditNotePrefix", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1.5">
              Next Number
            </label>
            <input
              type="text"
              data-tl="input-credit-note-next-number"
              value={nextNumber}
              onChange={(e) => tl.setVar("booksCreditNoteNextNumber", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-credit-note-numbering"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-credit-note-numbering"
            onClick={handleSave}
            className="px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
