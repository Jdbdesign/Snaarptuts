"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveTextModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveTextModalOpen", false);
  const docName = useTimelineVar(tl, "field:textDocName", useTimelineVar(tl, "driveTextDocName", "Sample"));

  if (!isOpen) return null;

  const handleCreate = () => {
    tl.setVar("driveTextModalOpen", false);
    tl.setVar("driveTextEditorOpen", true);
  };

  const handleClose = () => {
    tl.setVar("driveTextModalOpen", false);
  };

  return (
    <div
      data-tl="modal-text-doc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs select-none font-['Poppins',sans-serif]"
      onClick={handleClose}
    >
      <div
        className="w-[420px] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-[15px] font-bold text-[#111827]">Plain text document</h3>
          <button
            type="button"
            data-tl="btn-text-modal-close"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Input with .txt suffix */}
        <div className="pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              data-tl="input-text-name"
              value={docName}
              onChange={(e) => tl.setVar("field:textDocName", e.target.value)}
              placeholder="Enter your new name"
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-3.5 pr-14 text-[13px] text-[#111827] placeholder:text-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              autoFocus
            />
            <span className="absolute right-3.5 text-[12px] font-semibold text-gray-400 select-none pointer-events-none">
              .txt
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-6">
          <button
            type="button"
            data-tl="btn-modal-create-text"
            onClick={handleCreate}
            className="rounded-xl bg-[#2563EB] px-5 py-2 text-[12.5px] font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
