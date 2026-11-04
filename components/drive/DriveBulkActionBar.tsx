"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Move, Download, Trash2, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveBulkActionBar({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveBulkBarOpen", false);
  const selectedCount = useTimelineVar<number>(tl, "driveBulkSelectedCount", 3);

  if (!isOpen) return null;

  return (
    <div
      data-tl="bar-bulk-actions"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3.5 rounded-full bg-white px-5 py-2.5 shadow-2xl border border-gray-200/80 font-['Poppins',sans-serif] text-[12.5px] select-none animate-in slide-in-from-bottom-3 duration-200"
    >
      <span data-tl="label-bulk-selected-count" className="font-semibold text-gray-700">
        {selectedCount} selected
      </span>

      <div className="h-4 w-px bg-gray-200" />

      <button
        type="button"
        data-tl="btn-bulk-move"
        onClick={() => tl.setVar("driveBulkMoveModalOpen", true)}
        className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-[#7014D9] transition-colors cursor-pointer"
      >
        <Move size={14} />
        <span>Move</span>
      </button>

      <button
        type="button"
        data-tl="btn-bulk-download"
        className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-[#7014D9] transition-colors cursor-pointer"
      >
        <Download size={14} />
        <span>Download</span>
      </button>

      <button
        type="button"
        data-tl="btn-bulk-delete"
        onClick={() => tl.setVar("driveBulkDeleteModalOpen", true)}
        className="flex items-center gap-1.5 font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
      >
        <Trash2 size={14} />
        <span>Delete</span>
      </button>

      <div className="h-4 w-px bg-gray-200" />

      <button
        type="button"
        data-tl="btn-bulk-close"
        onClick={() => {
          tl.setVar("driveBulkBarOpen", false);
          tl.setVar("driveBulkSelectedIds", []);
        }}
        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <X size={15} />
      </button>
    </div>
  );
}
