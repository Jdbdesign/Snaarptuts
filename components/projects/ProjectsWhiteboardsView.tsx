"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { PenTool, Plus, Trash2 } from "lucide-react";
import {
  type WhiteboardItem,
  INITIAL_WHITEBOARDS,
  PROJECTS_URLS,
} from "./projects-data";
import { ProjectsNewWhiteboardDialog } from "./ProjectsNewWhiteboardDialog";
import { ProjectsDeleteWhiteboardModal } from "./ProjectsDeleteWhiteboardModal";

interface Props {
  tl: Timeline;
}

export function ProjectsWhiteboardsView({ tl }: Props) {
  const whiteboards = useTimelineVar<WhiteboardItem[]>(
    tl,
    "whiteboardsList",
    INITIAL_WHITEBOARDS
  );

  const handleOpenBoard = (board: WhiteboardItem) => {
    tl.setVar("activeWhiteboardId", board.id);
    tl.setVar("projectsView", "whiteboard-canvas");
    tl.setUrl(PROJECTS_URLS.whiteboards);
  };

  const handleDeletePrompt = (e: React.MouseEvent, boardId: string) => {
    e.stopPropagation();
    tl.setVar("deleteTargetWhiteboardId", boardId);
    tl.setVar("isDeleteWhiteboardModalOpen", true);
  };

  return (
    <div
      data-tl="whiteboards-view-container"
      className="space-y-6 max-w-6xl mx-auto font-sans select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h1
              data-tl="whiteboards-title"
              className="text-lg font-bold text-gray-900 tracking-tight"
            >
              Whiteboards
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Collaborate on freeform visual canvases.
            </p>
          </div>
        </div>

        <button
          type="button"
          data-tl="whiteboards-new-btn"
          onClick={() => tl.setVar("isNewWhiteboardModalOpen", true)}
          className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Whiteboard</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div
        data-tl="whiteboards-grid"
        className="grid grid-cols-3 gap-5"
      >
        {whiteboards.map((board) => {
          return (
            <div
              key={board.id}
              data-tl={`whiteboard-card-${board.id}`}
              onClick={() => handleOpenBoard(board)}
              className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              {/* Thumbnail Canvas Preview */}
              <div className="h-40 bg-gray-50/70 border-b border-gray-100 relative p-4 flex items-center justify-center overflow-hidden">
                {board.thumbnailType === "shapes" && (
                  <div className="relative w-44 h-24">
                    {/* Rectangle */}
                    <div className="absolute left-2 top-2 w-16 h-12 border-2 border-gray-400 rounded-md bg-white/60" />
                    {/* Circle */}
                    <div className="absolute left-16 top-6 w-12 h-12 border-2 border-gray-400 rounded-full bg-white/60" />
                    {/* Yellow Sticky */}
                    <div className="absolute right-2 bottom-1 w-12 h-12 bg-amber-100 border border-amber-200 rounded shadow-2xs p-1 text-[7px] text-amber-800 line-clamp-2">
                      Double-click to edit
                    </div>
                  </div>
                )}

                {board.thumbnailType === "flow" && (
                  <div className="relative w-44 h-24 flex items-center justify-center gap-6">
                    {/* Diamond 1 */}
                    <div className="w-9 h-9 border-2 border-[#7014D9] bg-purple-50/70 rotate-45 flex items-center justify-center shadow-2xs">
                      <span className="-rotate-45 text-[7px] font-bold text-[#7014D9]">
                        Home
                      </span>
                    </div>
                    {/* Arrow */}
                    <div className="w-8 h-0.5 bg-[#7014D9] relative">
                      <div className="absolute -right-1 -top-1 w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-[#7014D9]" />
                    </div>
                    {/* Diamond 2 */}
                    <div className="w-9 h-9 border-2 border-[#7014D9] bg-purple-50/70 rotate-45 shadow-2xs" />
                  </div>
                )}

                {board.thumbnailType === "empty" && (
                  <div className="text-gray-300 text-xs italic">
                    Blank canvas
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3
                    data-tl={`whiteboard-title-${board.id}`}
                    className="text-xs font-bold text-gray-900 group-hover:text-[#7014D9] transition-colors"
                  >
                    {board.title}
                  </h3>
                  <p
                    data-tl={`whiteboard-updated-${board.id}`}
                    className="text-[11px] text-gray-400 mt-0.5"
                  >
                    Updated {board.updatedDate}
                  </p>
                </div>

                <button
                  type="button"
                  data-tl={`whiteboard-delete-btn-${board.id}`}
                  onClick={(e) => handleDeletePrompt(e, board.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-semibold px-2 py-1 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <ProjectsNewWhiteboardDialog tl={tl} />
      <ProjectsDeleteWhiteboardModal tl={tl} />
    </div>
  );
}
