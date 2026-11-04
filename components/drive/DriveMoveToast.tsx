"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Loader2, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveMoveToast({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveMoveToastOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="toast-move"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] text-[#111827] select-none animate-in slide-in-from-bottom-3 duration-150"
    >
      <Loader2 size={17} className="animate-spin text-blue-600 shrink-0" />
      <span className="font-medium text-[#111827]">
        Moving &quot;Sample notes.txt&quot; to &quot;Brand Logos&quot;...
      </span>
      <button
        type="button"
        data-tl="btn-move-undo"
        onClick={() => {
          tl.setVar("driveFileSampleTxtMoved", false);
          tl.setVar("driveMoveToastOpen", false);
        }}
        className="ml-2 font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
      >
        Undo
      </button>
      <button
        type="button"
        data-tl="btn-toast-move-close"
        onClick={() => tl.setVar("driveMoveToastOpen", false)}
        className="ml-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <X size={15} />
      </button>
    </div>
  );
}
