"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Loader2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveDeleteWorkspaceModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveDeleteWorkspaceModalOpen", false);
  const isChecked = useTimelineVar(tl, "driveDeleteWorkspaceConfirmChecked", false);
  const isDeleting = useTimelineVar(tl, "driveIsDeletingWorkspace", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="modal-delete-workspace"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      <div className="w-[430px] rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#111827]">Delete workspace</h3>
          <button
            type="button"
            data-tl="btn-delete-ws-close"
            onClick={() => tl.setVar("driveDeleteWorkspaceModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3.5">
          <p className="text-[12.5px] text-[#374151] leading-relaxed">
            Delete &quot;Marketing Space&quot;? Its files and folders will be moved to the owner&apos;s My Files. Folder contents will be preserved.
          </p>

          {/* Amber Warning Box */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-[11.5px] text-amber-800">
            <p>2 other members have access to this workspace. Deleting it will remove their access.</p>
          </div>

          {/* Checkbox confirmation */}
          <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
            <input
              type="checkbox"
              data-tl="checkbox-delete-ws-confirm"
              checked={isChecked}
              onChange={() => tl.setVar("driveDeleteWorkspaceConfirmChecked", !isChecked)}
              className="rounded text-[#7014D9] focus:ring-0 cursor-pointer"
            />
            <span className="text-[12px] font-medium text-gray-700">
              I understand that other members will lose access.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-delete-ws-cancel"
            onClick={() => tl.setVar("driveDeleteWorkspaceModalOpen", false)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-delete-ws-confirm"
            disabled={!isChecked || isDeleting}
            onClick={() => {
              tl.setVar("driveIsDeletingWorkspace", true);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs transition-colors cursor-pointer ${
              isChecked
                ? "bg-[#7014D9] hover:bg-[#5C0EB7]"
                : "bg-purple-300 cursor-not-allowed"
            }`}
          >
            {isDeleting && <Loader2 size={13} className="animate-spin" />}
            <span>{isDeleting ? "Deleting..." : "Delete workspace"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
