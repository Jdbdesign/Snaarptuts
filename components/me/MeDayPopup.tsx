"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeDayPopup({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meDayPopupOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-day-popup-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs animate-fadeIn select-none"
    >
      <div
        data-tl="me-day-popup"
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col gap-5 text-left"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Tuesday, November 10, 2026
            </h2>
            <span className="text-xs text-gray-400 mt-0.5">1 event</span>
          </div>
          <button
            type="button"
            data-tl="me-day-popup-close-x"
            onClick={() => tl.setVar("meDayPopupOpen", false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Event Row */}
        <div
          data-tl="me-popup-event-row"
          className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 rounded-full bg-blue-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">
                Standup Meeting with developers
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5">
                Today • 11:30 AM – 12:00 PM
              </span>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full bg-purple-100 text-[#7014D9] flex items-center justify-center text-xs font-bold shrink-0">
            CB
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="me-day-popup-btn-close"
            onClick={() => tl.setVar("meDayPopupOpen", false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            data-tl="me-popup-btn-view-day"
            onClick={() => {
              tl.setVar("meDayPopupOpen", false);
              tl.setVar("meCalView", "day");
            }}
            className="rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] text-white px-5 py-2 text-xs font-semibold shadow-xs transition-colors"
          >
            View day schedule
          </button>
        </div>
      </div>
    </div>
  );
}
