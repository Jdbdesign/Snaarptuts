"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CREATIVE_MEETING_EVENT_TYPE } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeEditEventDrawer({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meEditDrawerOpen", false);
  const activeTab = useTimelineVar<"basic" | "schedule" | "advanced">(tl, "meEditTab", "basic");
  const isPreviewOpen = useTimelineVar<boolean>(tl, "meEditPreviewOpen", false);
  const previewDay = useTimelineVar<number>(tl, "meEditPreviewDay", 10);
  const previewSlot = useTimelineVar<string>(tl, "meEditPreviewSlot", "3:30 PM");

  if (!isOpen) return null;

  const event = CREATIVE_MEETING_EVENT_TYPE;
  const previewSlots = ["1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"];

  return (
    <>
      {/* Backdrop */}
      <div
        data-tl="me-edit-drawer-overlay"
        onClick={() => {
          tl.setVar("meEditDrawerOpen", false);
          tl.setVar("meEditPreviewOpen", false);
        }}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-2xs transition-opacity animate-fadeIn"
      />

      {/* Floating Preview Panel (Left of Drawer) */}
      {isPreviewOpen && (
        <div
          data-tl="me-edit-preview-panel"
          className="fixed top-12 right-[590px] w-[370px] rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl z-50 animate-fadeIn text-left flex flex-col gap-4 select-none max-h-[85vh] overflow-y-auto"
        >
          {/* Preview Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                PREVIEW
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5">Booking page</h3>
              <span className="text-[11px] text-gray-500">
                How invitees see this event type
              </span>
            </div>

            <button
              type="button"
              data-tl="me-edit-preview-btn-close-x"
              onClick={() => tl.setVar("meEditPreviewOpen", false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mini Calendar */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-3">
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-400 mb-2">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <span className="py-1 text-gray-400">8</span>
              <span className="py-1 text-gray-400">9</span>
              <button
                type="button"
                data-tl="me-preview-cal-day-10"
                onClick={() => tl.setVar("meEditPreviewDay", 10)}
                className={`py-1 rounded-full font-bold transition-colors ${
                  previewDay === 10
                    ? "bg-[#7014D9] text-white shadow-2xs"
                    : "text-gray-800 hover:bg-purple-100"
                }`}
              >
                10
              </button>
              <button
                type="button"
                data-tl="me-preview-cal-day-11"
                onClick={() => tl.setVar("meEditPreviewDay", 11)}
                className={`py-1 rounded-full font-bold transition-colors ${
                  previewDay === 11
                    ? "bg-[#7014D9] text-white shadow-2xs"
                    : "text-gray-800 hover:bg-purple-100"
                }`}
              >
                11
              </button>
              <span className="py-1 text-gray-700">12</span>
              <span className="py-1 text-gray-700">13</span>
              <span className="py-1 text-gray-700">14</span>
            </div>
          </div>

          {/* Available Times */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-900">Available times</span>
            <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1">
              {previewSlots.map((slot) => {
                const isSelected = slot === previewSlot;
                const slotKey = slot === "3:30 PM" ? "330" : slot.replace(/[: ]/g, "").toLowerCase();
                return (
                  <button
                    key={slot}
                    type="button"
                    data-tl={`me-preview-slot-${slotKey}`}
                    onClick={() => tl.setVar("meEditPreviewSlot", slot)}
                    className={`rounded-xl border py-2 text-center text-xs font-semibold transition-all ${
                      isSelected
                        ? "border-purple-300 bg-[#F5EEFF] text-[#7014D9] shadow-2xs"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview Footer */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Status:</span>
            <span
              data-tl="me-preview-status-badge"
              className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800"
            >
              Active
            </span>
          </div>
        </div>
      )}

      {/* Main Right Drawer */}
      <div
        data-tl="me-edit-drawer"
        className="fixed top-0 right-0 h-full w-[570px] bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col justify-between animate-slideInRight select-none text-left"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xs"
                style={{ backgroundColor: event.color }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  EDIT EVENT TYPE
                </span>
                <h2
                  data-tl="me-edit-drawer-title"
                  className="text-lg font-bold text-gray-900 leading-tight"
                >
                  {event.title}
                </h2>
                <span className="text-[11px] text-gray-500 mt-0.5">
                  {activeTab === "basic" && "Step 1 of 3 · Basic Info"}
                  {activeTab === "schedule" && "Step 2 of 3 · Schedule"}
                  {activeTab === "advanced" && "Step 3 of 3 · Advanced"}
                </span>
              </div>
            </div>

            <button
              type="button"
              data-tl="me-edit-btn-close-x"
              onClick={() => {
                tl.setVar("meEditDrawerOpen", false);
                tl.setVar("meEditPreviewOpen", false);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-gray-200 -mb-6 mt-1">
            <button
              type="button"
              data-tl="me-edit-tab-basic"
              onClick={() => tl.setVar("meEditTab", "basic")}
              className={`pb-3 px-4 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === "basic"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Basic Info
            </button>

            <button
              type="button"
              data-tl="me-edit-tab-schedule"
              onClick={() => tl.setVar("meEditTab", "schedule")}
              className={`pb-3 px-4 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === "schedule"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Schedule
            </button>

            <button
              type="button"
              data-tl="me-edit-tab-advanced"
              onClick={() => tl.setVar("meEditTab", "advanced")}
              className={`pb-3 px-4 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === "advanced"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {/* Tab 1: Basic Info */}
          {activeTab === "basic" && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Event details</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Name and describe what invitees are booking.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  value={event.title}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  readOnly
                  value={event.description}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-4 text-xs text-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Duration
                </label>
                <span className="text-[10px] text-gray-400 mb-2 block">
                  How long each booking lasts.
                </span>
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-[#7014D9] text-white px-4 py-1.5 text-xs font-semibold">
                    30 min
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Schedule */}
          {activeTab === "schedule" && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Schedule & Availability</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure availability window and limits.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 flex flex-col gap-3">
                <span className="text-xs font-bold text-gray-800">Buffer time</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 text-[11px]">Before</span>
                    <div className="font-semibold text-gray-800 mt-0.5">0 min</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[11px]">After</span>
                    <div className="font-semibold text-gray-800 mt-0.5">0 min</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 flex flex-col gap-3">
                <span className="text-xs font-bold text-gray-800">Booking window</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 text-[11px]">Minimum notice</span>
                    <div className="font-semibold text-gray-800 mt-0.5">4 hours</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[11px]">Maximum in advance</span>
                    <div className="font-semibold text-gray-800 mt-0.5">60 days</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Advanced */}
          {activeTab === "advanced" && (
            <div className="flex flex-col gap-5">
              <div
                data-tl="me-edit-intake-section"
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-gray-900">Intake questions</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Collect extra information from invitees when they book.
                    </p>
                  </div>
                  <button
                    type="button"
                    data-tl="me-edit-btn-add-question"
                    className="rounded-full bg-[#F5EEFF] hover:bg-[#ebdcfc] text-[#7014D9] px-4 py-1 text-xs font-semibold transition-colors"
                  >
                    Add question
                  </button>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col items-center justify-center gap-3 text-center my-2 shadow-2xs">
                  <span className="text-xs text-gray-500 max-w-sm leading-relaxed">
                    No intake questions yet. Add questions to collect information from invitees before they book.
                  </span>
                  <button
                    type="button"
                    data-tl="me-edit-btn-add-first-question"
                    className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-5 py-1.5 text-xs font-semibold hover:bg-[#ebdcfc] transition-colors"
                  >
                    Add your first question
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            data-tl="me-edit-btn-preview"
            onClick={() => tl.setVar("meEditPreviewOpen", !isPreviewOpen)}
            className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Preview</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="me-edit-btn-cancel"
              onClick={() => {
                tl.setVar("meEditDrawerOpen", false);
                tl.setVar("meEditPreviewOpen", false);
              }}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="me-edit-btn-save"
              onClick={() => {
                tl.setVar("meEditDrawerOpen", false);
                tl.setVar("meEditPreviewOpen", false);
                tl.setVar("meToast", "Event type updated successfully.");
              }}
              className="rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
