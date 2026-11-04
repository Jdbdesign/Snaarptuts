"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle, X, Loader2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveEmptyTrashModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveEmptyTrashModalOpen", false);
  const isEmptying = useTimelineVar(tl, "driveIsEmptyingTrash", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="modal-empty-trash"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      <div className="w-[440px] rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#111827]">Empty Trash</h3>
          <button
            type="button"
            data-tl="btn-empty-trash-close"
            onClick={() => tl.setVar("driveEmptyTrashModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle size={20} />
          </div>
          <div className="space-y-1.5">
            <p className="text-[13px] font-medium text-[#111827] leading-snug">
              Are you sure you want to permanently delete all items in the trash?
            </p>
            <p className="text-[11.5px] text-gray-500 leading-relaxed">
              This action cannot be undone. All files and folders in your trash will be permanently removed and cannot be recovered.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-empty-trash-cancel"
            onClick={() => tl.setVar("driveEmptyTrashModalOpen", false)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-empty-trash-confirm"
            disabled={isEmptying}
            onClick={() => {
              tl.setVar("driveIsEmptyingTrash", true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs hover:bg-red-700 transition-colors cursor-pointer"
          >
            {isEmptying && <Loader2 size={13} className="animate-spin" />}
            <span>{isEmptying ? "Emptying..." : "Empty Trash"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
