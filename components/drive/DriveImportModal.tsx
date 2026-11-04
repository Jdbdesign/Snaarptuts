"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Cloud, X, Loader2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveImportModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveImportModalOpen", false);
  const importStep = useTimelineVar<"select" | "connectGoogle">(tl, "driveImportStep", "select");
  const isConnecting = useTimelineVar(tl, "driveImportConnecting", false);

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("driveImportModalOpen", false);
  };

  return (
    <div
      data-tl="modal-import-cloud"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs select-none font-['Poppins',sans-serif]"
      onClick={handleClose}
    >
      {importStep === "connectGoogle" ? (
        <div
          data-tl="modal-import-connect-gdrive"
          className="relative w-[440px] rounded-3xl bg-white p-7 shadow-2xl flex flex-col text-left font-['Poppins',sans-serif] animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            data-tl="btn-import-connect-close"
            onClick={handleClose}
            className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 font-bold text-base">
              G
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#111827]">Connect Google Drive</h3>
              <p className="text-[11.5px] text-gray-500">Sign in to import your documents</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-gray-200 p-3.5 bg-gray-50/50 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7014D9] text-white font-semibold text-xs">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#111827] truncate">Sam Taylor</p>
              <p className="text-[11.5px] text-gray-500 truncate">sam.taylor@snaarp.com</p>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-gray-400 leading-relaxed">
            Snaarp Drive will only access files you choose to import. You can revoke access at any time in Settings.
          </p>

          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button
              type="button"
              data-tl="btn-import-connect-cancel"
              onClick={() => tl.setVar("driveImportStep", "select")}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[12px] font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              data-tl="btn-import-connect-submit"
              disabled={isConnecting}
              onClick={() => tl.setVar("driveImportConnecting", true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-[12px] font-semibold text-white shadow-2xs hover:bg-[#5E10B8] transition-colors cursor-pointer disabled:opacity-75"
            >
              {isConnecting && <Loader2 size={13} className="animate-spin" />}
              <span>{isConnecting ? "Connecting..." : "Connect and Import"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className="relative w-[440px] rounded-3xl bg-white p-7 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close X */}
          <button
            type="button"
            data-tl="btn-import-close"
            onClick={handleClose}
            className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Cloud Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#3B82F6] mb-3">
            <Cloud size={28} />
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-[16px] font-bold text-[#111827]">
            Import cloud photos and files
          </h3>
          <p className="mt-1 text-[11.5px] text-gray-500 leading-relaxed max-w-[340px]">
            Import your cloud files to securely access, share, and collaborate on them from one place.
          </p>

          {/* Cloud Providers List */}
          <div className="w-full space-y-2.5 pt-5">
            {/* 1. Google Drive */}
            <button
              type="button"
              data-tl="btn-import-gdrive"
              onClick={() => tl.setVar("driveImportStep", "connectGoogle")}
              className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 p-3 text-[12.5px] font-medium text-[#111827] hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 font-bold text-xs">
                G
              </div>
              <span>Connect to Google Drive</span>
            </button>

            {/* 2. Dropbox */}
            <button
              type="button"
              data-tl="btn-import-dropbox"
              className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 p-3 text-[12.5px] font-medium text-[#111827] hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] font-bold text-xs">
                📦
              </div>
              <span>Connect to Dropbox</span>
            </button>

            {/* 3. OneDrive */}
            <button
              type="button"
              data-tl="btn-import-onedrive"
              className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 p-3 text-[12.5px] font-medium text-[#111827] hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-[#0284C7] font-bold text-xs">
                ☁️
              </div>
              <span>Connect to OneDrive</span>
            </button>

            {/* 4. Google Photos */}
            <button
              type="button"
              data-tl="btn-import-gphotos"
              className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 p-3 text-[12.5px] font-medium text-[#111827] hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-[#EF4444] font-bold text-xs">
                🌸
              </div>
              <span>Import from Google Photos</span>
            </button>
          </div>

          {/* Maybe later */}
          <button
            type="button"
            data-tl="btn-import-later"
            onClick={handleClose}
            className="mt-5 text-[12px] font-semibold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            Maybe later
          </button>
        </div>
      )}
    </div>
  );
}
