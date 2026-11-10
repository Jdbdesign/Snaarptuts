"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeToastBanner({ tl }: Props) {
  const bannerToastVal = useTimelineVar<string | null>(tl, "meBannerToast", null);
  const toastVal = useTimelineVar<string | null>(tl, "meToast", null);
  const bottomToast = useTimelineVar<string | null>(tl, "meBottomToast", null);

  const bannerToast = bannerToastVal || toastVal;

  return (
    <>
      {bannerToast && (
        <div
          data-tl="me-toast-banner"
          className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 shadow-xs transition-all duration-200 flex items-center justify-between animate-fadeIn select-none"
        >
          <span>{bannerToast}</span>
        </div>
      )}

      {bottomToast && (
        <div
          data-tl="me-bottom-toast"
          className="fixed bottom-6 right-8 z-50 rounded-xl border border-emerald-200 bg-[#ECFDF5] px-4 py-3 text-xs font-semibold text-emerald-800 shadow-xl flex items-center gap-2.5 animate-fadeIn select-none"
        >
          <div className="w-4 h-4 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span>{bottomToast}</span>
          <button
            type="button"
            data-tl="me-bottom-toast-close"
            onClick={() => tl.setVar("meBottomToast", null)}
            className="ml-2 text-emerald-600 hover:text-emerald-800"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
