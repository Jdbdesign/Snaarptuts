"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Loader2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveRenameModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveRenameModalOpen", false);
  const itemType = useTimelineVar<"folder" | "file">(tl, "driveRenameItemType", "folder");
  const value = useTimelineVar<string>(tl, "driveRenameValue", "Workspaces");
  const isRenaming = useTimelineVar(tl, "driveIsRenaming", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-rename-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => tl.setVar("driveRenameModalOpen", false)}
    >
      <div
        data-tl={itemType === "folder" ? "dialog-rename-folder" : "dialog-rename-file"}
        className="w-[440px] rounded-2xl bg-white p-5 shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[16px] font-semibold text-[#111827]">
            {itemType === "folder" ? "Rename Folder" : "Rename File"}
          </h2>
          <button
            type="button"
            data-tl="btn-rename-close"
            onClick={() => tl.setVar("driveRenameModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Input */}
        <div className="mt-2 space-y-1.5">
          <label className="text-[12px] font-medium text-gray-700 block">
            New name
          </label>
          <input
            type="text"
            data-tl="input-rename"
            value={value}
            readOnly
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-[13px] text-[#111827] shadow-2xs focus:border-[#7014D9] focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            data-tl="btn-rename-cancel"
            onClick={() => tl.setVar("driveRenameModalOpen", false)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[12px] font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-rename-submit"
            disabled={isRenaming}
            onClick={() => {
              tl.setVar("driveIsRenaming", true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-[12px] font-semibold text-white shadow-2xs hover:bg-[#5E10B8] transition-colors cursor-pointer disabled:opacity-75"
          >
            {isRenaming && <Loader2 size={13} className="animate-spin" />}
            <span>{isRenaming ? "Renaming..." : "Rename"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
