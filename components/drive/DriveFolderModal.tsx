"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import { FOLDER_COLOR_SWATCHES } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveFolderModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveFolderModalOpen", false);
  const folderName = useTimelineVar(tl, "field:folderName", useTimelineVar(tl, "driveFolderName", ""));
  const selectedColor = useTimelineVar(tl, "driveFolderColor", "");

  if (!isOpen) return null;

  const handleCreate = () => {
    tl.setVar("driveFolderModalOpen", false);
    tl.setVar("driveHomeHasProjectFiles", true);
    tl.setVar("driveFolderProjectFilesAdded", true);
  };

  const handleClose = () => {
    tl.setVar("driveFolderModalOpen", false);
  };

  return (
    <div
      data-tl="modal-create-folder"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs select-none font-['Poppins',sans-serif]"
      onClick={handleClose}
    >
      <div
        className="w-[450px] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-[15px] font-bold text-[#111827]">Create a folder</h3>
          <button
            type="button"
            data-tl="btn-modal-folder-close"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Name input */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-[12px] font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            data-tl="input-folder-name"
            value={folderName}
            onChange={(e) => tl.setVar("field:folderName", e.target.value)}
            placeholder="Enter your folder name"
            className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-[13px] text-[#111827] placeholder:text-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            autoFocus
          />
        </div>

        {/* Color swatches */}
        <div className="space-y-2 pt-4">
          <label className="block text-[12px] font-semibold text-gray-700">
            Folder color
          </label>
          <div data-tl="swatch-container" className="flex flex-wrap gap-2 items-center">
            {FOLDER_COLOR_SWATCHES.map((swatch) => {
              const isSelected = selectedColor === swatch.id || selectedColor === swatch.hex;
              return (
                <button
                  key={swatch.id}
                  type="button"
                  data-tl={`swatch-${swatch.id}`}
                  onClick={() => tl.setVar("driveFolderColor", swatch.id)}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center p-0.5 cursor-pointer transition-colors ${
                    isSelected ? "ring-2 ring-gray-900 bg-gray-100" : "hover:bg-gray-100"
                  }`}
                  title={swatch.label}
                >
                  <span
                    className="h-full w-full rounded-full"
                    style={{ backgroundColor: swatch.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-6">
          <button
            type="button"
            data-tl="btn-modal-create"
            onClick={handleCreate}
            className="rounded-xl bg-[#2563EB] px-5 py-2 text-[12.5px] font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Create
          </button>
          <button
            type="button"
            data-tl="btn-modal-cancel"
            onClick={handleClose}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
