"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CheckCircle2, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveCopyLinkToast({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveCopyLinkToastOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="toast-link-copied"
      className="fixed bottom-6 right-6 z-50 flex items-center h-auto shrink-0 gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] text-[#111827] select-none animate-in slide-in-from-bottom-3 duration-150"
    >
      <CheckCircle2 size={17} className="text-emerald-500 shrink-0" />
      <span className="font-medium">Share link copied.</span>
      <button
        type="button"
        data-tl="btn-toast-link-close"
        onClick={() => tl.setVar("driveCopyLinkToastOpen", false)}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <X size={15} />
      </button>
    </div>
  );
}
