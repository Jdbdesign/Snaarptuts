"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Check } from "lucide-react";

interface Props {
  tl: Timeline;
}

export function LockToast({ tl }: Props) {
  const toast = useTimelineVar<string | null>(tl, "lockToast", null);

  if (!toast) return null;

  return (
    <div
      data-tl="lock-toast"
      className="absolute top-4 right-8 z-50 flex items-center gap-2.5 bg-white border border-gray-200 shadow-xl rounded-xl px-4 py-2.5 animate-in fade-in slide-in-from-top-2 duration-200 select-none"
    >
      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <span className="text-xs font-semibold text-gray-900 tracking-tight">
        {toast}
      </span>
    </div>
  );
}
