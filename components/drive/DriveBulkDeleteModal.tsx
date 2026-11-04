"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Trash2, X, Loader2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveBulkDeleteModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveBulkDeleteModalOpen", false);
  const isDeleting = useTimelineVar(tl, "driveIsBulkDeleting", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="modal-bulk-delete"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      <div className="w-[420px] rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#111827]">Delete 2 items</h3>
          <button
            type="button"
            data-tl="btn-bulk-delete-close"
            onClick={() => tl.setVar("driveBulkDeleteModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Trash2 size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-[13px] font-medium text-[#111827]">
              Are you sure you want to delete 2 items?
            </p>
            <p className="text-[11.5px] text-gray-500">
              Meeting notes.docx, Project brief.docx
            </p>
            <p className="text-[11.5px] text-gray-400">
              Items will be moved to the trash.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-bulk-delete-cancel"
            onClick={() => tl.setVar("driveBulkDeleteModalOpen", false)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-bulk-delete-confirm"
            disabled={isDeleting}
            onClick={() => {
              tl.setVar("driveIsBulkDeleting", true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs hover:bg-red-700 transition-colors cursor-pointer"
          >
            {isDeleting && <Loader2 size={13} className="animate-spin" />}
            <span>{isDeleting ? "Deleting..." : "Delete 2 items"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
