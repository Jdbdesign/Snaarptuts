"use client";

import { useEffect, useRef, useState } from "react";
import { progressStore } from "@/lib/progress";
import { PROGRESS_COPY } from "./progress-data";

/** Quiet text button at the bottom of the rail. A small confirm popover opens above it. */
export function ResetProgress() {
  const [open, setOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open]);

  return (
    <div className="relative flex shrink-0 justify-center">
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="rounded px-2 py-1 text-[12px] text-muted underline-offset-2 hover:text-ink hover:underline focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {PROGRESS_COPY.reset}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label={PROGRESS_COPY.confirmTitle}
          className="tl-pop-in absolute bottom-[calc(100%+6px)] left-0 right-0 z-30 rounded-[12px] border border-line bg-white p-3 shadow-[0_18px_44px_-16px_rgba(17,17,17,0.3)]"
        >
          <p className="text-[13px] font-medium leading-5 text-ink">{PROGRESS_COPY.confirmTitle}</p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              ref={cancelRef}
              onClick={() => setOpen(false)}
              className="h-8 rounded-full bg-[#F4F4F6] px-3 text-[13px] font-medium text-[#4b5060] hover:bg-[#ECECF1] focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {PROGRESS_COPY.cancel}
            </button>
            <button
              onClick={() => {
                progressStore.reset();
                setOpen(false);
              }}
              className="h-8 rounded-full bg-ink px-3 text-[13px] font-medium text-white hover:bg-black focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {PROGRESS_COPY.confirm}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
