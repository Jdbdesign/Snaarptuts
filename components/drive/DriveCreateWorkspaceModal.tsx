"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Loader2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveCreateWorkspaceModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveCreateWorkspaceModalOpen", false);
  const nameVal = useTimelineVar<string>(tl, "field:workspaceName", "");
  const descVal = useTimelineVar<string>(tl, "field:workspaceDesc", "");
  const isCreating = useTimelineVar(tl, "driveIsCreatingWorkspace", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="modal-create-workspace"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      <div className="w-[430px] rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#111827]">Create Workspace</h3>
          <button
            type="button"
            data-tl="btn-create-ws-close"
            onClick={() => tl.setVar("driveCreateWorkspaceModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form fields */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
              Name
            </label>
            <input
              type="text"
              data-tl="input-workspace-name"
              placeholder="My Team Workspace"
              value={nameVal}
              readOnly
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-[13px] text-[#111827] placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
              Description (optional)
            </label>
            <input
              type="text"
              data-tl="input-workspace-desc"
              placeholder="A brief description of this workspace"
              value={descVal}
              readOnly
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-[13px] text-[#111827] placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-create-ws-cancel"
            onClick={() => tl.setVar("driveCreateWorkspaceModalOpen", false)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-create-ws-submit"
            disabled={isCreating}
            onClick={() => {
              tl.setVar("driveIsCreatingWorkspace", true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs hover:bg-[#5C0EB7] transition-colors cursor-pointer"
          >
            {isCreating && <Loader2 size={13} className="animate-spin" />}
            <span>{isCreating ? "Creating..." : "Create Workspace"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
