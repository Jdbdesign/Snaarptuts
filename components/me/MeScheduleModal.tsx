"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { PERSONAL_SCHEDULE, type Schedule } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeScheduleModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meCreateScheduleOpen", false);
  const nameValue = useTimelineVar<string>(tl, "meScheduleNameInput", "");
  const satEnabled = useTimelineVar<boolean>(tl, "meScheduleSatEnabled", false);
  const satToValue = useTimelineVar<string>(tl, "meScheduleSatTo", "5:00 PM");
  const satDropdownOpen = useTimelineVar<boolean>(tl, "meScheduleSatDropdownOpen", false);

  if (!isOpen) return null;

  const timeOptions = [
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "1:00 PM",
    "1:15 PM",
    "1:30 PM",
    "1:45 PM",
    "2:00 PM",
    "2:15 PM",
    "2:30 PM",
    "2:45 PM",
    "3:00 PM",
    "3:15 PM",
    "3:30 PM",
    "3:45 PM",
    "4:00 PM",
    "4:15 PM",
    "4:30 PM",
    "4:45 PM",
    "5:00 PM",
  ];

  return (
    <div
      data-tl="me-schedule-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs animate-fadeIn select-none"
    >
      <div
        data-tl="me-create-schedule-modal"
        className="relative w-full max-w-xl max-h-[90vh] rounded-3xl bg-white shadow-2xl border border-gray-100 flex flex-col overflow-hidden text-left"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Create Schedule
            </h2>
            <span className="text-xs text-gray-500 mt-0.5">
              Define your available hours for meetings
            </span>
          </div>
          <button
            type="button"
            data-tl="me-schedule-modal-close-x"
            onClick={() => tl.setVar("meCreateScheduleOpen", false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          data-tl="me-schedule-scroll-body"
          data-scroller="schedule-body"
          className="p-6 overflow-y-auto flex-1 flex flex-col gap-5"
        >
          {/* Schedule Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Schedule Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              data-tl="me-schedule-input-name"
              placeholder="e.g., Working Hours, Evening Availability"
              value={nameValue}
              onChange={(e) => tl.setVar("meScheduleNameInput", e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#7014D9]"
            />
            <span className="text-[11px] text-gray-400">
              {nameValue.length}/100 characters
            </span>
          </div>

          {/* Timezone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">Timezone</label>
            <div
              data-tl="me-schedule-input-tz"
              className="rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-500 flex items-center justify-between"
            >
              <span>Africa/Lagos (GMT+1)</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Set as default schedule */}
          <div
            data-tl="me-schedule-default-card"
            className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between bg-white shadow-2xs"
          >
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Set as default schedule</span>
              <span className="text-xs text-gray-400">
                New event types will use this schedule by default
              </span>
            </div>
            <div
              data-tl="me-schedule-default-toggle"
              className="w-11 h-6 flex items-center rounded-full p-1 bg-gray-200 cursor-pointer"
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-0" />
            </div>
          </div>

          {/* Weekly Hours Header */}
          <div className="flex items-center justify-between pt-2">
            <h3 className="text-sm font-bold text-gray-900">Weekly Hours</h3>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-2xs text-xs font-medium">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold bg-[#F5EEFF] text-[#7014D9]"
              >
                <span>≡ List</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-gray-600"
              >
                <span>Calendar</span>
              </button>
            </div>
          </div>

          {/* Days Rows */}
          <div className="flex flex-col gap-4">
            {/* Monday to Friday */}
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <div
                key={day}
                className="rounded-2xl border border-gray-100 bg-white p-3.5 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-5 flex items-center rounded-full p-0.5 bg-[#7014D9]">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-800">{day}</span>
                  </div>

                  <div className="flex-1 max-w-[180px] mx-4 flex items-center gap-1.5">
                    <span className="text-[10px] text-gray-400">9:00 AM</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden relative">
                      <div className="absolute inset-y-0 left-1/4 right-1/4 bg-[#7014D9] rounded-full" />
                    </div>
                    <span className="text-[10px] text-gray-400">5:00 PM</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="rounded-lg border border-gray-200 px-2 py-1 bg-white text-gray-700 font-medium">
                      9:00 AM
                    </div>
                    <span className="text-gray-400">–</span>
                    <div className="rounded-lg border border-gray-200 px-2 py-1 bg-white text-gray-700 font-medium">
                      5:00 PM
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-50">
                  <button type="button" className="text-[#7014D9] font-semibold hover:underline">
                    + Add range
                  </button>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>Apply same hours to</span>
                    <span className="text-[#7014D9] cursor-pointer hover:underline">Weekdays</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Saturday */}
            <div
              data-tl="me-schedule-sat-row"
              className="rounded-2xl border border-gray-100 bg-white p-3.5 flex flex-col gap-2.5 relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-tl="me-schedule-sat-toggle"
                    onClick={() => tl.setVar("meScheduleSatEnabled", !satEnabled)}
                    className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                      satEnabled ? "bg-[#7014D9]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        satEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-xs font-bold text-gray-800">Sat</span>
                </div>

                {satEnabled ? (
                  <>
                    <div className="flex-1 max-w-[180px] mx-4 flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400">9:00 AM</span>
                      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden relative">
                        <div
                          className={`absolute inset-y-0 left-1/4 bg-[#7014D9] rounded-full transition-all ${
                            satToValue === "1:00 PM" ? "right-1/2" : "right-1/4"
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">{satToValue}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs relative">
                      <div className="rounded-lg border border-gray-200 px-2 py-1 bg-white text-gray-700 font-medium">
                        9:00 AM
                      </div>
                      <span className="text-gray-400">–</span>
                      <button
                        type="button"
                        data-tl="me-schedule-sat-to-select"
                        onClick={() => tl.setVar("meScheduleSatDropdownOpen", !satDropdownOpen)}
                        className="rounded-lg border border-gray-200 px-2 py-1 bg-white text-gray-700 font-medium flex items-center gap-1 hover:border-purple-300"
                      >
                        <span>{satToValue}</span>
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Options */}
                      {satDropdownOpen && (
                        <div
                          data-tl="me-schedule-sat-dropdown"
                          className="absolute right-0 top-full mt-1 w-32 max-h-48 overflow-y-auto rounded-xl bg-white p-1.5 shadow-2xl border border-gray-200 z-50 flex flex-col gap-0.5"
                        >
                          {timeOptions.map((time) => {
                            const is1pm = time === "1:00 PM";
                            return (
                              <button
                                key={time}
                                type="button"
                                data-tl={is1pm ? "me-time-option-100pm" : undefined}
                                onClick={() => {
                                  tl.setVar("meScheduleSatTo", time);
                                  tl.setVar("meScheduleSatDropdownOpen", false);
                                }}
                                className={`w-full px-2 py-1 text-left text-xs rounded-lg hover:bg-[#F5EEFF] hover:text-[#7014D9] transition-colors ${
                                  satToValue === time
                                    ? "bg-[#F5EEFF] text-[#7014D9] font-bold"
                                    : "text-gray-700"
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="rounded-full bg-gray-100 text-gray-400 text-xs px-2.5 py-0.5 font-medium">
                    Unavailable
                  </span>
                )}
              </div>

              {satEnabled && (
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-50">
                  <button type="button" className="text-[#7014D9] font-semibold hover:underline">
                    + Add range
                  </button>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>Apply same hours to</span>
                    <span className="text-[#7014D9] cursor-pointer hover:underline">Weekdays</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sunday */}
            <div className="rounded-2xl border border-gray-100 bg-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  data-tl="me-schedule-sun-toggle"
                  className="w-10 h-5 flex items-center rounded-full p-0.5 bg-gray-200 cursor-pointer"
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-0" />
                </div>
                <span className="text-xs font-bold text-gray-800">Sun</span>
              </div>
              <span className="rounded-full bg-gray-100 text-gray-400 text-xs px-2.5 py-0.5 font-medium">
                Unavailable
              </span>
            </div>
          </div>
        </div>

        {/* Pinned Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 bg-white shrink-0">
          <button
            type="button"
            data-tl="me-schedule-btn-cancel"
            onClick={() => tl.setVar("meCreateScheduleOpen", false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="me-schedule-btn-create"
            onClick={() => {
              tl.setVar("meCreateScheduleOpen", false);
              tl.setVar("meBannerToast", "Schedule created successfully.");
              tl.setVar("meSchedules", [
                ...tl.getVar<Schedule[]>("meSchedules", []),
                PERSONAL_SCHEDULE,
              ]);
              tl.setVar("meSelectedSchedule", "personal-schedule");
            }}
            className="rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] text-white px-5 py-2 text-xs font-semibold shadow-xs transition-colors"
          >
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
