"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Folder, ChevronDown, ChevronRight, X, Loader2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveBulkMoveModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveBulkMoveModalOpen", false);
  const isMoving = useTimelineVar(tl, "driveIsBulkMoving", false);
  const selectedFolder = useTimelineVar<string>(tl, "driveBulkMoveTargetFolder", "Project Notes");

  if (!isOpen) return null;

  return (
    <div
      data-tl="modal-bulk-move"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      <div className="w-[430px] rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#111827]">Move 3 items</h3>
          <button
            type="button"
            data-tl="btn-bulk-move-close"
            onClick={() => tl.setVar("driveBulkMoveModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <p className="text-[12px] font-medium text-gray-700">Select a destination folder:</p>
          <p className="text-[11px] text-gray-400 truncate">
            payslip.pdf, Meeting notes.docx, Project brief.docx
          </p>

          {/* Folder Tree */}
          <div className="mt-3 rounded-xl border border-gray-200/90 bg-gray-50/50 p-2 text-[12.5px]">
            {/* My Files root */}
            <div className="flex items-center gap-1.5 py-1 px-1.5 text-gray-700 font-medium cursor-pointer">
              <ChevronDown size={14} className="text-gray-400" />
              <Folder size={15} className="text-amber-500 fill-amber-400/50" />
              <span>My Files</span>
            </div>

            {/* Subfolders */}
            <div className="ml-5 mt-1 space-y-0.5">
              <div
                data-tl="item-folder-project-notes"
                onClick={() => tl.setVar("driveBulkMoveTargetFolder", "Project Notes")}
                className={`flex items-center gap-1.5 rounded-lg py-1.5 px-2 transition-colors cursor-pointer ${
                  selectedFolder === "Project Notes"
                    ? "bg-purple-50 text-[#7014D9] font-medium border border-purple-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ChevronRight size={13} className="text-gray-400" />
                <Folder size={15} className="text-amber-500 fill-amber-400/50" />
                <span>Project Notes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-bulk-move-cancel"
            onClick={() => tl.setVar("driveBulkMoveModalOpen", false)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-bulk-move-confirm"
            disabled={isMoving}
            onClick={() => {
              tl.setVar("driveIsBulkMoving", true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs hover:bg-[#5C0EB7] transition-colors cursor-pointer"
          >
            {isMoving && <Loader2 size={13} className="animate-spin" />}
            <span>{isMoving ? "Moving..." : "Move here"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
