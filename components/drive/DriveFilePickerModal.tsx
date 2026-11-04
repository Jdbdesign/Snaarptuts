"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Image as ImageIcon, Folder, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveFilePickerModal({ tl }: Props) {
  const isFileOpen = useTimelineVar(tl, "driveFilePickerOpen", false);
  const isFolderOpen = useTimelineVar(tl, "driveFolderPickerOpen", false);

  if (!isFileOpen && !isFolderOpen) return null;

  const handleFileConfirm = () => {
    tl.setVar("driveFilePickerOpen", false);
    tl.setVar("driveUploadToastOpen", true);
    tl.setVar("driveUploadToastCompleted", true);
    tl.setVar("driveUploadToastCount", 1);
    tl.setVar("driveFileQuarterlyReportAdded", true);
  };

  const handleFolderConfirm = () => {
    tl.setVar("driveFolderPickerOpen", false);
    tl.setVar("driveUploadToastOpen", true);
    tl.setVar("driveUploadToastExpanded", true);
    tl.setVar("driveUploadToastCompleted", true);
    tl.setVar("driveUploadToastCount", 6);
    tl.setVar("driveFolderBrandLogosAdded", true);
  };

  const handleClose = () => {
    tl.setVar("driveFilePickerOpen", false);
    tl.setVar("driveFolderPickerOpen", false);
  };

  return (
    <div
      data-tl="modal-file-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs select-none font-['Poppins',sans-serif]"
      onClick={handleClose}
    >
      <div
        className="w-[420px] rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-[14px] font-bold text-[#111827]">
            {isFileOpen ? "Select file to upload" : "Select folder to upload"}
          </h3>
          <button
            type="button"
            data-tl="btn-picker-close"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Picker Content */}
        <div className="py-4">
          {isFileOpen ? (
            <div
              data-tl="picker-item-file"
              className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2563EB]">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h4 className="text-[12.5px] font-semibold text-[#111827]">Quarterly report.png</h4>
                  <p className="text-[11px] text-gray-500">PNG Image • 2.4 MB</p>
                </div>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white">
                <Check size={14} strokeWidth={2.5} />
              </div>
            </div>
          ) : (
            <div
              data-tl="picker-item-folder"
              className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-[#F59E0B]">
                  <Folder size={22} fill="#FDE68A" />
                </div>
                <div>
                  <h4 className="text-[12.5px] font-semibold text-[#111827]">Brand Logos</h4>
                  <p className="text-[11px] text-gray-500">Folder • 6 files</p>
                </div>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white">
                <Check size={14} strokeWidth={2.5} />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          {isFileOpen ? (
            <button
              type="button"
              data-tl="btn-picker-upload"
              onClick={handleFileConfirm}
              className="rounded-xl bg-[#2563EB] px-4 py-2 text-[12px] font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Upload
            </button>
          ) : (
            <button
              type="button"
              data-tl="btn-picker-upload-folder"
              onClick={handleFolderConfirm}
              className="rounded-xl bg-[#2563EB] px-4 py-2 text-[12px] font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Upload (6 files)
            </button>
          )}
          <button
            type="button"
            data-tl="btn-picker-cancel"
            onClick={handleClose}
            className="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
