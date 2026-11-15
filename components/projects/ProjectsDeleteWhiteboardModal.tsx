"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, AlertTriangle } from "lucide-react";
import type { WhiteboardItem } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsDeleteWhiteboardModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "isDeleteWhiteboardModalOpen",
    false
  );
  const targetId = useTimelineVar<string | null>(
    tl,
    "deleteTargetWhiteboardId",
    null
  );
  const whiteboards = useTimelineVar<WhiteboardItem[]>(
    tl,
    "whiteboardsList",
    []
  );

  if (!isOpen) return null;

  const targetBoard = whiteboards.find((w) => w.id === targetId);
  const title = targetBoard ? targetBoard.title : "this whiteboard";

  const handleClose = () => {
    tl.setVar("isDeleteWhiteboardModalOpen", false);
    tl.setVar("deleteTargetWhiteboardId", null);
  };

  const handleConfirmDelete = () => {
    if (targetId) {
      const updated = whiteboards.filter((w) => w.id !== targetId);
      tl.setVar("whiteboardsList", updated);
      pushProjectsToast(tl, "Whiteboard deleted");
    }
    handleClose();
  };

  return (
    <div
      data-tl="delete-whiteboard-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
    >
      <div
        data-tl="delete-whiteboard-modal"
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 space-y-4 relative"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-red-600">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3
              data-tl="delete-whiteboard-title"
              className="text-base font-bold text-gray-900 tracking-tight"
            >
              Delete whiteboard
            </h3>
          </div>
          <button
            type="button"
            data-tl="delete-whiteboard-close-btn"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">&quot;{title}&quot;</span>? This
          action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="delete-whiteboard-cancel-btn"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="delete-whiteboard-confirm-btn"
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
