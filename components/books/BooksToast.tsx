"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Check, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksToast({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksToastOpen", false);
  const rawText = useTimelineVar(tl, "booksToastText", "");
  const rawMessage = useTimelineVar(tl, "booksToastMessage", "");
  const text = rawText || rawMessage;

  if (!isOpen || !text) return null;

  return (
    <div
      data-tl="books-toast"
      className="absolute top-14 right-6 z-50 flex h-auto max-w-md shrink-0 items-center gap-3 rounded-xl border border-emerald-200 bg-[#ECFDF5] px-4 py-3 text-sm text-[#065F46] shadow-lg animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Check size={12} strokeWidth={3} />
      </span>
      <span className="flex-1 font-medium">{text}</span>
      <button
        type="button"
        data-tl="btn-toast-close"
        onClick={() => tl.setVar("booksToastOpen", false)}
        className="text-emerald-700/60 hover:text-emerald-900 transition-colors cursor-pointer"
      >
        <X size={15} />
      </button>
    </div>
  );
}
