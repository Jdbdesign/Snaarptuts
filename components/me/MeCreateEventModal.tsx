"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CREATIVE_MEETING_EVENT_TYPE, INITIAL_EVENT_TYPES } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeCreateEventModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meCreateModalOpen", false);
  const step = useTimelineVar<number>(tl, "meCreateStep", 1);

  // Step 1 state
  const title = useTimelineVar<string>(tl, "meCreateTitle", "");
  const desc = useTimelineVar<string>(tl, "meCreateDesc", "");
  const duration = useTimelineVar<number>(tl, "meCreateDuration", 30);

  // Step 2 state
  const schedule = useTimelineVar<string>(tl, "meCreateSchedule", "Open Days");
  const bufBefore = useTimelineVar<number>(tl, "meCreateBufferBefore", 0);
  const bufAfter = useTimelineVar<number>(tl, "meCreateBufferAfter", 0);
  const minNotice = useTimelineVar<number>(tl, "meCreateMinNotice", 4);
  const maxDays = useTimelineVar<number>(tl, "meCreateMaxDays", 60);
  const dailyLimit = useTimelineVar<string>(tl, "meCreateDailyLimit", "");
  const weeklyLimit = useTimelineVar<string>(tl, "meCreateWeeklyLimit", "");
  const maxAttendees = useTimelineVar<number>(tl, "meCreateMaxAttendees", 1);

  // Step 3 state
  const color = useTimelineVar<string>(tl, "meCreateColor", "#2563eb");
  const isSecret = useTimelineVar<boolean>(tl, "meCreateSecret", false);
  const isInternal = useTimelineVar<boolean>(tl, "meCreateInternal", false);
  const redirectUrl = useTimelineVar<string>(tl, "meCreateRedirect", "");

  if (!isOpen) return null;

  const durationOptions = [15, 30, 45, 60, 90, 120];

  return (
    <div
      data-tl="me-create-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs animate-fadeIn select-none"
    >
      <div
        data-tl="me-create-modal"
        className="relative w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl border border-gray-100 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col text-left">
            <h2
              data-tl="me-create-title"
              className="text-xl font-bold tracking-tight text-gray-900"
            >
              Create Event Type
            </h2>
            <span className="text-xs text-gray-500 mt-0.5">
              Set up a new event type for people to book with you
            </span>
          </div>

          <button
            type="button"
            data-tl="me-create-btn-close-x"
            onClick={() => tl.setVar("meCreateModalOpen", false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="flex items-center justify-between px-4">
          {/* Step 1 Pill */}
          <div data-tl="me-create-step-tab-1" className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > 1
                  ? "bg-emerald-600 text-white"
                  : step === 1
                  ? "bg-[#7014D9] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step > 1 ? "✓" : "1"}
            </span>
            <span className="text-xs font-semibold text-gray-800">Basic Info</span>
          </div>

          <div className="h-0.5 flex-1 bg-gray-200 mx-3" />

          {/* Step 2 Pill */}
          <div data-tl="me-create-step-tab-2" className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > 2
                  ? "bg-emerald-600 text-white"
                  : step === 2
                  ? "bg-[#7014D9] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step > 2 ? "✓" : "2"}
            </span>
            <span className="text-xs font-semibold text-gray-800">Schedule</span>
          </div>

          <div className="h-0.5 flex-1 bg-gray-200 mx-3" />

          {/* Step 3 Pill */}
          <div data-tl="me-create-step-tab-3" className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 3
                  ? "bg-[#7014D9] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </span>
            <span className="text-xs font-semibold text-gray-800">Advanced</span>
          </div>
        </div>

        {/* Step 1 Body */}
        {step === 1 && (
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-sm font-bold text-gray-900">Basic Information</h3>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                readOnly
                data-tl="me-create-input-title"
                value={title}
                placeholder="e.g., 30 Minute Meeting"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                readOnly
                data-tl="me-create-input-desc"
                value={desc}
                placeholder="Describe what this meeting is about..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-4 text-sm text-gray-900 focus:outline-none resize-none"
              />
            </div>

            {/* Duration chips */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {durationOptions.map((opt) => {
                  const isSelected = duration === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      data-tl={`me-create-duration-${opt}`}
                      onClick={() => tl.setVar("meCreateDuration", opt)}
                      className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors ${
                        isSelected
                          ? "bg-[#7014D9] text-white shadow-2xs"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {opt} min
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 1 Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                data-tl="me-create-btn-cancel-1"
                onClick={() => tl.setVar("meCreateModalOpen", false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="me-create-btn-next-1"
                onClick={() => tl.setVar("meCreateStep", 2)}
                className="rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] px-6 py-2 text-xs font-semibold text-white shadow-xs transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 Body */}
        {step === 2 && (
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-sm font-bold text-gray-900">Schedule & Availability</h3>

            {/* Schedule Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Schedule <span className="text-rose-500">*</span>
              </label>
              <div
                data-tl="me-create-select-schedule"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-900 flex items-center justify-between cursor-pointer"
              >
                <span>{schedule}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                Select the availability schedule for this event type
              </span>
            </div>

            {/* Buffer row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Buffer Before (minutes)
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-create-input-buf-before"
                  value={bufBefore}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-900"
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  Time gap before the event
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Buffer After (minutes)
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-create-input-buf-after"
                  value={bufAfter}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-900"
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  Time gap after the event
                </span>
              </div>
            </div>

            {/* Notice & Max booking days */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Minimum Notice (hours)
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-create-input-min-notice"
                  value={minNotice}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-900"
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  How far in advance bookings must be made
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Max Booking Days
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-create-input-max-days"
                  value={maxDays}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-900"
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  How far into the future bookings can be made
                </span>
              </div>
            </div>

            {/* Limits row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Daily Limit
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-create-input-daily-limit"
                  value={dailyLimit}
                  placeholder="No limit"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Weekly Limit
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-create-input-weekly-limit"
                  value={weeklyLimit}
                  placeholder="No limit"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Max Attendees
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    data-tl="me-create-input-max-attendees"
                    value={maxAttendees}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs text-gray-900 pr-7"
                  />
                  <div className="absolute right-2 top-2 flex flex-col gap-0.5">
                    <button
                      type="button"
                      data-tl="me-create-spin-attendees-up"
                      onClick={() => tl.setVar("meCreateMaxAttendees", maxAttendees + 1)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      ▲
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                type="button"
                data-tl="me-create-btn-back-2"
                onClick={() => tl.setVar("meCreateStep", 1)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  data-tl="me-create-btn-cancel-2"
                  onClick={() => tl.setVar("meCreateModalOpen", false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="me-create-btn-next-2"
                  onClick={() => tl.setVar("meCreateStep", 3)}
                  className="rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] px-6 py-2 text-xs font-semibold text-white shadow-xs transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Body */}
        {step === 3 && (
          <div className="flex flex-col gap-5 text-left">
            {/* Color */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Color
              </label>
              <div className="flex items-center gap-3">
                <div
                  data-tl="me-create-color-swatch"
                  className="w-9 h-9 rounded-xl shadow-xs cursor-pointer border border-gray-200"
                  style={{ backgroundColor: color }}
                />
                <input
                  type="text"
                  readOnly
                  data-tl="me-create-input-color"
                  value={color}
                  className="w-32 rounded-2xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs font-mono text-gray-900"
                />
              </div>
            </div>

            {/* Secret Event toggle */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-800">Secret Event</span>
                <span className="text-[10px] text-gray-400">
                  Only accessible via direct link, not shown on your public page
                </span>
              </div>
              <button
                type="button"
                data-tl="me-create-toggle-secret"
                onClick={() => tl.setVar("meCreateSecret", !isSecret)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  isSecret ? "bg-[#7014D9]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    isSecret ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Internal Event toggle */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-800">Internal Event</span>
                <span className="text-[10px] text-gray-400">
                  Only available to members of your organization
                </span>
              </div>
              <button
                type="button"
                data-tl="me-create-toggle-internal"
                onClick={() => tl.setVar("meCreateInternal", !isInternal)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  isInternal ? "bg-[#7014D9]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    isInternal ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Custom Redirect URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Custom Redirect URL
              </label>
              <input
                type="text"
                readOnly
                data-tl="me-create-input-redirect"
                value={redirectUrl}
                placeholder="https://example.com/thank-you"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-xs text-gray-900"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Redirect invitees here after booking (optional)
              </span>
            </div>

            {/* Step 3 Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                type="button"
                data-tl="me-create-btn-back-3"
                onClick={() => tl.setVar("meCreateStep", 2)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  data-tl="me-create-btn-cancel-3"
                  onClick={() => tl.setVar("meCreateModalOpen", false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="me-create-btn-submit"
                  onClick={() => {
                    tl.setVar("meCreateModalOpen", false);
                    tl.setVar("meToast", "Event type created successfully.");
                    tl.setVar("meEventTypes", [CREATIVE_MEETING_EVENT_TYPE, ...INITIAL_EVENT_TYPES]);
                  }}
                  className="rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors"
                >
                  Create Event Type
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
