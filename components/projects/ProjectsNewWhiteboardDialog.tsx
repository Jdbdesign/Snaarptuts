"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import {
  NEW_WHITEBOARD_DATA,
  type WhiteboardItem,
  PROJECTS_URLS,
} from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsNewWhiteboardDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "isNewWhiteboardModalOpen",
    false
  );
  const title = useTimelineVar<string>(tl, "newWhiteboardTitle", "");
  const whiteboards = useTimelineVar<WhiteboardItem[]>(
    tl,
    "whiteboardsList",
    []
  );

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("isNewWhiteboardModalOpen", false);
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    const newBoard: WhiteboardItem = {
      ...NEW_WHITEBOARD_DATA,
      id: "wb-research",
      title: title.trim(),
      updatedDate: "15/11/2026",
      thumbnailType: "flow",
    };
    tl.setVar("whiteboardsList", [newBoard, ...whiteboards]);
    tl.setVar("activeWhiteboardId", "wb-research");
    tl.setVar("isNewWhiteboardModalOpen", false);
    tl.setVar("projectsView", "whiteboard-canvas");
    tl.setUrl(PROJECTS_URLS.whiteboards);
  };

  const isTyped = title.trim().length > 0;

  return (
    <div
      data-tl="new-whiteboard-dialog-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
    >
      <div
        data-tl="new-whiteboard-dialog"
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 space-y-4 relative"
      >
        <div className="flex items-center justify-between">
          <h3
            data-tl="new-whiteboard-dialog-title"
            className="text-base font-bold text-gray-900 tracking-tight"
          >
            Create Whiteboard
          </h3>
          <button
            type="button"
            data-tl="new-whiteboard-close-btn"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
            TITLE <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            data-tl="new-whiteboard-title-input"
            value={title}
            onChange={(e) => tl.setVar("newWhiteboardTitle", e.target.value)}
            placeholder="Whiteboard title"
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="new-whiteboard-cancel-btn"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="new-whiteboard-create-btn"
            disabled={!isTyped}
            onClick={handleCreate}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors ${
              isTyped
                ? "bg-[#7014D9] hover:bg-[#5E10B7] text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
