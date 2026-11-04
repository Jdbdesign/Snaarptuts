"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Trash2, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveDeleteModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveDeleteModalOpen", false);
  const itemName = useTimelineVar<string>(tl, "driveDeleteItemName", "Workspaces");

  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-delete-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => tl.setVar("driveDeleteModalOpen", false)}
    >
      <div
        data-tl="dialog-delete"
        className="w-[420px] rounded-2xl bg-white p-5 shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[16px] font-semibold text-[#111827]">Delete</h2>
          <button
            type="button"
            data-tl="btn-delete-close"
            onClick={() => tl.setVar("driveDeleteModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="flex items-start gap-3.5 pt-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Trash2 size={20} />
          </div>
          <div className="space-y-1 text-[12.5px] leading-relaxed">
            <p className="font-medium text-[#111827]">
              Are you sure you want to delete &quot;{itemName}&quot;?
            </p>
            <p className="text-gray-500">Folders will also delete their contents.</p>
            <p className="text-gray-500">Items will be moved to the trash.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            data-tl="btn-delete-cancel"
            onClick={() => tl.setVar("driveDeleteModalOpen", false)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[12px] font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-delete-confirm"
            onClick={() => tl.setVar("driveDeleteModalOpen", false)}
            className="rounded-xl bg-red-600 px-4 py-2 text-[12px] font-semibold text-white shadow-2xs hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
