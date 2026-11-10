"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeDateOverrideModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meDateOverrideModalOpen", false);
  const range2Added = useTimelineVar<boolean>(tl, "meOverrideRange2Added", false);
  const isSaving = useTimelineVar<boolean>(tl, "meOverrideIsSaving", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-override-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs animate-fadeIn select-none"
    >
      <div
        data-tl="me-edit-date-modal"
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col gap-6 text-left"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Edit date
            </h2>
            <span className="text-xs text-gray-500 mt-0.5">
              Wednesday, November 11, 2026
            </span>
          </div>
          <button
            type="button"
            data-tl="me-override-modal-close-x"
            onClick={() => tl.setVar("meDateOverrideModalOpen", false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Available Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">Available</span>
            <span className="text-xs text-gray-400">Set custom hours for this date</span>
          </div>
          <div
            data-tl="me-override-avail-toggle"
            className="w-11 h-6 flex items-center rounded-full p-1 bg-[#7014D9] cursor-pointer"
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-5" />
          </div>
        </div>

        {/* Ranges Form */}
        <div className="flex flex-col gap-4">
          {/* Range 1 */}
          <div className="flex items-center gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-gray-400 uppercase">From</span>
              <div className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-800 flex items-center justify-between bg-white">
                <span>9:00 AM</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <span className="text-gray-300 mt-5">–</span>

            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-gray-400 uppercase">To</span>
              <div className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-800 flex items-center justify-between bg-white">
                <span>5:00 PM</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              type="button"
              className="text-red-500 hover:text-red-700 text-xs font-medium mt-5"
            >
              Remove
            </button>
          </div>

          {/* Range 2 (when added) */}
          {range2Added && (
            <div data-tl="me-override-range-2" className="flex items-center gap-4 animate-fadeIn">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase">Range 2 from</span>
                <div className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-800 flex items-center justify-between bg-white">
                  <span>5:00 PM</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <span className="text-gray-300 mt-5">–</span>

              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase">Range 2 to</span>
                <div className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-800 flex items-center justify-between bg-white">
                  <span>6:00 PM</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-xs font-medium mt-5"
              >
                Remove
              </button>
            </div>
          )}

          {/* + Add time range button */}
          <button
            type="button"
            data-tl="me-btn-add-timerange"
            onClick={() => tl.setVar("meOverrideRange2Added", true)}
            className="w-full rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/40 hover:bg-purple-50 py-3 text-xs font-semibold text-[#7014D9] transition-colors"
          >
            + Add time range
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            data-tl="me-override-btn-cancel"
            onClick={() => tl.setVar("meDateOverrideModalOpen", false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="me-modal-btn-save-override"
            disabled={isSaving}
            onClick={() => {
              tl.setVar("meOverrideIsSaving", true);
              tl.setVar("meDateOverrideSaved", true);
              setTimeout(() => {
                tl.setVar("meOverrideIsSaving", false);
                tl.setVar("meDateOverrideModalOpen", false);
                tl.setVar("meBottomToast", "Date override saved.");
              }, 400);
            }}
            className={`rounded-xl px-6 py-2 text-xs font-semibold text-white shadow-xs transition-all ${
              isSaving
                ? "bg-purple-300 cursor-not-allowed"
                : "bg-[#7014D9] hover:bg-[#5e0eb8]"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
