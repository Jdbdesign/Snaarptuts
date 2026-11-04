"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  ChevronDown,
  ChevronRight,
  Folder,
  Loader2,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveMoveCopyModal({ tl }: Props) {
  const isMoveOpen = useTimelineVar(tl, "driveMoveModalOpen", false);
  const isCopyOpen = useTimelineVar(tl, "driveCopyModalOpen", false);
  const selectedFolder = useTimelineVar<string>(tl, "driveSelectedDestFolder", "Brand Logos");
  const isExpandedWorkspaces = useTimelineVar(tl, "driveTreeExpandWorkspaces", false);
  const isExpandedSocial = useTimelineVar(tl, "driveTreeExpandSocial", false);
  const isMoving = useTimelineVar(tl, "driveIsMoving", false);

  if (!isMoveOpen && !isCopyOpen) return null;

  const isMove = isMoveOpen;
  const title = isMove ? 'Move "Sample notes.txt"' : 'Copy "Sample notes.txt"';

  return (
    <div
      data-tl={isMove ? "dialog-move-overlay" : "dialog-copy-overlay"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => {
        tl.setVar("driveMoveModalOpen", false);
        tl.setVar("driveCopyModalOpen", false);
      }}
    >
      <div
        data-tl={isMove ? "dialog-move" : "dialog-copy"}
        className="w-[450px] rounded-2xl bg-white p-5 shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[16px] font-semibold text-[#111827]">{title}</h2>
          <button
            type="button"
            data-tl={isMove ? "btn-move-close" : "btn-copy-close"}
            onClick={() => {
              tl.setVar("driveMoveModalOpen", false);
              tl.setVar("driveCopyModalOpen", false);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Tree Container */}
        <div className="mt-2 space-y-2">
          <label className="text-[12px] font-medium text-gray-700 block">
            Select a destination folder:
          </label>

          <div
            data-tl="dest-tree-container"
            className="rounded-xl border border-gray-200 bg-white p-2.5 max-h-64 overflow-y-auto text-[12.5px] space-y-1"
          >
            {/* Root: My Files */}
            <div className="flex items-center gap-1.5 py-1 px-1 font-medium text-gray-700">
              <ChevronDown size={14} className="text-gray-400" />
              <Folder size={15} className="text-amber-500 fill-amber-100" />
              <span>My Files</span>
            </div>

            <div className="pl-5 space-y-1">
              {/* Brand Logos */}
              <div>
                <button
                  type="button"
                  data-tl="tree-folder-brand-logos"
                  onClick={() => tl.setVar("driveSelectedDestFolder", "Brand Logos")}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors cursor-pointer ${
                    selectedFolder === "Brand Logos"
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronDown size={13} className="text-gray-400" />
                  <Folder size={14} className="text-amber-500 fill-amber-100" />
                  <span>Brand Logos</span>
                </button>
                {selectedFolder === "Brand Logos" && (
                  <div className="pl-6 py-0.5 text-[11px] text-gray-400">
                    No subfolders
                  </div>
                )}
              </div>

              {/* Snaarp Icons */}
              <button
                type="button"
                data-tl="tree-folder-icons"
                onClick={() => tl.setVar("driveSelectedDestFolder", "Snaarp Icons")}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors cursor-pointer ${
                  selectedFolder === "Snaarp Icons"
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronRight size={13} className="text-gray-400" />
                <Folder size={14} className="text-amber-500 fill-amber-100" />
                <span>Snaarp Icons</span>
              </button>

              {/* Workspaces */}
              <div>
                <button
                  type="button"
                  data-tl="tree-folder-workspaces"
                  onClick={() => {
                    tl.setVar("driveSelectedDestFolder", "Workspaces");
                    tl.setVar("driveTreeExpandWorkspaces", !isExpandedWorkspaces);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors cursor-pointer ${
                    selectedFolder === "Workspaces"
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {isExpandedWorkspaces ? (
                    <ChevronDown size={13} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={13} className="text-gray-400" />
                  )}
                  <Folder size={14} className="text-amber-500 fill-amber-100" />
                  <span>Workspaces</span>
                </button>

                {isExpandedWorkspaces && (
                  <div className="pl-5 space-y-1 pt-1">
                    {/* Social media Resources */}
                    <div>
                      <button
                        type="button"
                        data-tl="tree-folder-social"
                        onClick={() => {
                          tl.setVar("driveSelectedDestFolder", "Social media Resources");
                          tl.setVar("driveTreeExpandSocial", !isExpandedSocial);
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors cursor-pointer ${
                          selectedFolder === "Social media Resources"
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {isExpandedSocial ? (
                          <ChevronDown size={12} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={12} className="text-gray-400" />
                        )}
                        <Folder size={13} className="text-amber-500 fill-amber-100" />
                        <span>Social media Resources</span>
                      </button>

                      {isExpandedSocial && (
                        <div className="pl-5 space-y-0.5 pt-0.5">
                          {/* Videos */}
                          <button
                            type="button"
                            data-tl="tree-folder-videos"
                            onClick={() => tl.setVar("driveSelectedDestFolder", "Videos")}
                            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors cursor-pointer ${
                              selectedFolder === "Videos"
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ChevronRight size={11} className="text-gray-400" />
                            <Folder size={12} className="text-amber-500 fill-amber-100" />
                            <span>Videos</span>
                          </button>

                          {/* Images */}
                          <button
                            type="button"
                            data-tl="tree-folder-images"
                            onClick={() => tl.setVar("driveSelectedDestFolder", "Images")}
                            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors cursor-pointer ${
                              selectedFolder === "Images"
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ChevronRight size={11} className="text-gray-400" />
                            <Folder size={12} className="text-amber-500 fill-amber-100" />
                            <span>Images</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Files */}
              <button
                type="button"
                data-tl="tree-folder-project-files"
                onClick={() => tl.setVar("driveSelectedDestFolder", "Project Files")}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors cursor-pointer ${
                  selectedFolder === "Project Files"
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronRight size={13} className="text-gray-400" />
                <Folder size={14} className="text-red-500 fill-red-100" />
                <span>Project Files</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            data-tl={isMove ? "btn-move-cancel" : "btn-copy-cancel"}
            onClick={() => {
              tl.setVar("driveMoveModalOpen", false);
              tl.setVar("driveCopyModalOpen", false);
            }}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[12px] font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl={isMove ? "btn-move-submit" : "btn-copy-submit"}
            disabled={isMoving}
            onClick={() => {
              if (isMove) {
                tl.setVar("driveIsMoving", true);
                tl.setVar("driveMoveToastOpen", true);
                tl.setVar("driveFileSampleTxtMoved", true);
                tl.setVar("driveMoveModalOpen", false);
              } else {
                tl.setVar("driveCopyModalOpen", false);
              }
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-[12px] font-semibold text-white shadow-2xs hover:bg-[#5E10B8] transition-colors cursor-pointer disabled:opacity-75"
          >
            {isMoving && <Loader2 size={13} className="animate-spin" />}
            <span>{isMove ? (isMoving ? "Moving..." : "Move Here") : "Copy Here"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
