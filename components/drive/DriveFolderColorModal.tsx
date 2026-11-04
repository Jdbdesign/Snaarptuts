"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Check, X, Loader2 } from "lucide-react";
import { PALETTE_COLORS_4X2 } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveFolderColorModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveFolderColorModalOpen", false);
  const selectedColor = useTimelineVar<string>(tl, "driveFolderSelectedColor", "yellow");
  const isApplying = useTimelineVar(tl, "driveIsApplyingColor", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-folder-color-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => tl.setVar("driveFolderColorModalOpen", false)}
    >
      <div
        data-tl="dialog-folder-color"
        className="w-[430px] rounded-2xl bg-white p-5 shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[16px] font-semibold text-[#111827]">Folder Color</h2>
          <button
            type="button"
            data-tl="btn-color-close"
            onClick={() => tl.setVar("driveFolderColorModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Subtitle */}
        <p className="mt-1 text-[12px] text-gray-500">
          Choose a color for this folder:
        </p>

        {/* 4x2 Swatches Grid */}
        <div
          data-tl="color-palette-grid"
          className="mt-3.5 grid grid-cols-4 gap-2.5"
        >
          {PALETTE_COLORS_4X2.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                data-tl={`color-swatch-${color.id}`}
                onClick={() => {
                  tl.setVar("driveFolderSelectedColor", color.id);
                  if (color.id === "purple") {
                    tl.setVar("driveWorkspacesFolderColor", "#A855F7");
                  }
                }}
                className={`flex h-11 w-full items-center justify-center rounded-xl transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? "ring-2 ring-black ring-offset-2 scale-[1.02]"
                    : "hover:scale-[1.02]"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              >
                {isSelected && (
                  <Check size={18} className="text-white drop-shadow-xs" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>

        {/* Remove color button */}
        <button
          type="button"
          data-tl="btn-color-remove"
          onClick={() => {
            tl.setVar("driveFolderSelectedColor", "none");
            tl.setVar("driveWorkspacesFolderColor", "#F59E0B");
          }}
          className="mt-4 w-full rounded-xl border border-gray-200 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Remove color
        </button>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            data-tl="btn-color-cancel"
            onClick={() => tl.setVar("driveFolderColorModalOpen", false)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[12px] font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-color-apply"
            disabled={isApplying}
            onClick={() => {
              tl.setVar("driveIsApplyingColor", true);
              tl.setVar("driveWorkspacesFolderColor", "#A855F7");
              tl.setVar("driveFolderColorModalOpen", false);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-5 py-2 text-[12px] font-semibold text-white shadow-2xs hover:bg-[#5E10B8] transition-colors cursor-pointer disabled:opacity-75"
          >
            {isApplying && <Loader2 size={13} className="animate-spin" />}
            <span>{isApplying ? "Applying..." : "Apply"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
