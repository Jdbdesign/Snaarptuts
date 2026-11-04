"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveCopyToast({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveCopyToastOpen", false);
  const message = useTimelineVar<string>(
    tl,
    "driveCopyToastMessage",
    "Item copied successfully"
  );

  if (!isOpen) return null;

  return (
    <div
      data-tl="toast-copy-success"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl border border-gray-100 font-['Poppins',sans-serif] text-[13px] text-[#111827] animate-in slide-in-from-bottom-2 duration-200 select-none"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check size={14} />
      </div>
      <span>{message}</span>
    </div>
  );
}
