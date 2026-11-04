"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CheckCircle2, ChevronDown, ChevronUp, ArrowUpCircle, X } from "lucide-react";
import { BRAND_LOGOS_FILES } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveUploadToast({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveUploadToastOpen", false);
  const isExpanded = useTimelineVar(tl, "driveUploadToastExpanded", false);
  const isCompleted = useTimelineVar(tl, "driveUploadToastCompleted", true);
  const count = useTimelineVar(tl, "driveUploadToastCount", 1);
  const customFileName = useTimelineVar<string>(tl, "driveUploadFileName", "");

  if (!isOpen) return null;

  const handleDismiss = () => {
    tl.setVar("driveUploadToastOpen", false);
  };

  const toggleExpanded = () => {
    tl.setVar("driveUploadToastExpanded", !isExpanded);
  };

  if (!isExpanded) {
    // Collapsed single/multi upload pill
    return (
      <div
        data-tl="upload-toast"
        className="absolute bottom-4 left-[80px] z-50 flex items-center gap-3 rounded-2xl bg-[#0F172A] border border-[#334155] px-4 py-2.5 text-white shadow-2xl font-['Poppins',sans-serif] text-[12px] select-none"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#3B82F6]" />
          <span className="font-medium">
            {isCompleted ? `${count} upload${count > 1 ? "s" : ""} finished` : `Uploading ${count} file${count > 1 ? "s" : ""}...`}
          </span>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            type="button"
            data-tl="btn-toast-done"
            onClick={handleDismiss}
            className="rounded-lg bg-white/10 px-3 py-1 font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            Done
          </button>
          <button
            type="button"
            data-tl="btn-toast-expand"
            onClick={toggleExpanded}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Expanded upload card (as in video t0039s.jpg)
  return (
    <div
      data-tl="upload-toast-expanded"
      className="absolute bottom-4 left-[80px] z-50 w-96 rounded-2xl bg-[#0F172A] border border-[#334155] p-3.5 text-white shadow-2xl font-['Poppins',sans-serif] text-[12px] select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#3B82F6]" />
          <span className="font-semibold text-[12.5px]">{count} uploads finished</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-toast-done"
            onClick={handleDismiss}
            className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            Done
          </button>
          <button
            type="button"
            data-tl="btn-toast-collapse"
            onClick={toggleExpanded}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 py-2 text-[11px] font-medium border-b border-[#1E293B]">
        <span className="rounded-full bg-[#1E3A8A] text-[#60A5FA] px-2.5 py-0.5 font-semibold">
          All ({count})
        </span>
        <span className="text-gray-400 hover:text-gray-200 cursor-pointer px-1.5">Processing</span>
        <span className="text-gray-400 hover:text-gray-200 cursor-pointer px-1.5">Completed ({count})</span>
        <span className="text-gray-400 hover:text-gray-200 cursor-pointer px-1.5">Failed</span>
      </div>

      {/* Item List */}
      <div className="space-y-2 py-2 max-h-52 overflow-y-auto no-scrollbar">
        {customFileName ? (
          <div className="space-y-1 bg-[#1E293B]/60 rounded-xl p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <ArrowUpCircle size={15} className="text-[#10B981] shrink-0" />
                <div className="min-w-0">
                  <span className="font-medium text-[11.5px] truncate block text-gray-200">
                    {customFileName}
                  </span>
                  <span className="text-[10px] text-[#10B981]">
                    {isCompleted ? "Complete" : "Uploading... 100%"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-gray-500 hover:text-gray-300"
              >
                <X size={12} />
              </button>
            </div>
            <div className="h-1 w-full bg-[#334155] rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full w-full" />
            </div>
          </div>
        ) : (
          BRAND_LOGOS_FILES.slice(0, 4).map((file) => (
            <div key={file.id} className="space-y-1 bg-[#1E293B]/60 rounded-xl p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <ArrowUpCircle size={15} className="text-[#10B981] shrink-0" />
                  <div className="min-w-0">
                    <span className="font-medium text-[11.5px] truncate block text-gray-200">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-[#10B981]">Complete</span>
                  </div>
                </div>
                <button type="button" className="text-gray-500 hover:text-gray-300">
                  <X size={12} />
                </button>
              </div>
              {/* Progress bar */}
              <div className="h-1 w-full bg-[#334155] rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full w-full" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="pt-1.5 text-center text-[10.5px] text-gray-400 border-t border-[#1E293B]">
        Scroll to see all {count} uploads
      </div>
    </div>
  );
}
