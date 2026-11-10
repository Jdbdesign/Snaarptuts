"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  INITIAL_SCHEDULES,
  PERSONAL_SCHEDULE,
  type Schedule,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeAvailabilityView({ tl }: Props) {
  const activeTab = useTimelineVar<"working-hours" | "date-overrides" | "preview">(
    tl,
    "meAvailTab",
    "working-hours"
  );
  const selectedScheduleId = useTimelineVar<string>(
    tl,
    "meSelectedSchedule",
    "open-days"
  );
  const schedules = useTimelineVar<Schedule[]>(
    tl,
    "meSchedules",
    INITIAL_SCHEDULES
  );
  const weeklyMode = useTimelineVar<"list" | "calendar">(
    tl,
    "meWeeklyMode",
    "list"
  );
  const datePopoverOpen = useTimelineVar<boolean>(
    tl,
    "meDatePopoverOpen",
    false
  );
  const dateOverrideSaved = useTimelineVar<boolean>(
    tl,
    "meDateOverrideSaved",
    false
  );
  const previewMode = useTimelineVar<"list" | "calendar">(
    tl,
    "mePreviewMode",
    "list"
  );
  const previewExpanded10 = useTimelineVar<boolean>(
    tl,
    "mePreviewExpanded10",
    false
  );

  const currentSchedule =
    schedules.find((s) => s.id === selectedScheduleId) ||
    (selectedScheduleId === "personal-schedule" ? PERSONAL_SCHEDULE : schedules[0]);

  const daysHeader = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div
      data-tl="me-availability-view"
      className="flex h-full w-full max-w-[1280px] mx-auto select-none overflow-y-auto"
    >
      {/* Left Column: Schedules List */}
      <div className="w-[280px] shrink-0 border-r border-gray-100 pr-6 flex flex-col gap-4 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            SCHEDULES
          </span>
          <button
            type="button"
            data-tl="me-btn-add-schedule"
            onClick={() => {
              tl.setVar("meCreateScheduleOpen", true);
            }}
            className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-purple-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div data-tl="me-avail-schedules-list" className="flex flex-col gap-2.5">
          {schedules.map((sched) => {
            const isSelected = sched.id === selectedScheduleId;
            return (
              <div
                key={sched.id}
                data-tl={`me-sched-card-${sched.id}`}
                onClick={() => tl.setVar("meSelectedSchedule", sched.id)}
                className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer border transition-all ${
                  isSelected
                    ? "bg-[#F5EEFF] border-purple-200 shadow-2xs"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      sched.id === "personal-schedule" ? "bg-amber-500" : "bg-[#7014D9]"
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 truncate max-w-[150px]">
                      {sched.name}
                    </span>
                    <span className="text-xs text-gray-400">{sched.timezone}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#7014D9] flex items-center justify-center text-white shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 min-w-0 pl-6 flex flex-col gap-6 text-left">
        {/* Header with Title & Tabs */}
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h1 data-tl="me-avail-sched-title" className="text-xl font-bold tracking-tight text-gray-900">
                {currentSchedule.name}
              </h1>
              {currentSchedule.isDefault && (
                <span
                  data-tl="me-avail-badge-default"
                  className="rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold px-2 py-0.5 tracking-wide uppercase"
                >
                  DEFAULT
                </span>
              )}
            </div>

            {!currentSchedule.isDefault && (
              <button
                type="button"
                data-tl="me-avail-btn-delete-sched"
                className="text-gray-400 hover:text-red-500 p-1 rounded"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          {/* Tabs Row */}
          <div data-tl="me-avail-tabs-row" className="flex items-center gap-6">
            <button
              type="button"
              data-tl="me-avail-tab-working-hours"
              onClick={() => tl.setVar("meAvailTab", "working-hours")}
              className={`pb-2 text-sm font-semibold transition-colors relative ${
                activeTab === "working-hours"
                  ? "text-[#7014D9] border-b-2 border-[#7014D9]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Working Hours
            </button>
            <button
              type="button"
              data-tl="me-avail-tab-overrides"
              onClick={() => tl.setVar("meAvailTab", "date-overrides")}
              className={`pb-2 text-sm font-semibold transition-colors relative ${
                activeTab === "date-overrides"
                  ? "text-[#7014D9] border-b-2 border-[#7014D9]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Date Overrides
            </button>
            <button
              type="button"
              data-tl="me-avail-tab-preview"
              onClick={() => tl.setVar("meAvailTab", "preview")}
              className={`pb-2 text-sm font-semibold transition-colors relative ${
                activeTab === "preview"
                  ? "text-[#7014D9] border-b-2 border-[#7014D9]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* TAB 1: WORKING HOURS */}
        {activeTab === "working-hours" && (
          <div className="flex flex-col gap-6">
            {/* Form Fields Card */}
            <div className="flex flex-col gap-4">
              {/* Schedule Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Schedule Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="me-avail-input-name"
                  value={currentSchedule.name}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-medium text-gray-800"
                />
                <span className="text-[11px] text-gray-400">
                  {currentSchedule.name.length}/100 characters
                </span>
              </div>

              {/* Timezone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Timezone</label>
                <div
                  data-tl="me-avail-input-tz"
                  className="rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-500 flex items-center justify-between"
                >
                  <span>{currentSchedule.timezone} (GMT+1)</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Set as default schedule */}
              <div
                data-tl="me-avail-default-card"
                className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between bg-white shadow-2xs"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">Set as default schedule</span>
                  <span className="text-xs text-gray-400">
                    {currentSchedule.isDefault
                      ? "This is your only schedule, so it stays the default."
                      : "New event types will use this schedule by default"}
                  </span>
                </div>
                <div
                  data-tl="me-avail-default-toggle"
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    currentSchedule.isDefault ? "bg-[#7014D9]" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      currentSchedule.isDefault ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Weekly Hours Section */}
            <div data-tl="me-avail-weekly-hours" className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Weekly Hours</h2>
                {/* List / Calendar Toggle */}
                <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-2xs text-xs font-medium">
                  <button
                    type="button"
                    data-tl="me-weekly-toggle-list"
                    onClick={() => tl.setVar("meWeeklyMode", "list")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-semibold transition-colors ${
                      weeklyMode === "list"
                        ? "bg-[#F5EEFF] text-[#7014D9]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>≡ List</span>
                  </button>
                  <button
                    type="button"
                    data-tl="me-weekly-toggle-cal"
                    onClick={() => tl.setVar("meWeeklyMode", "calendar")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-semibold transition-colors ${
                      weeklyMode === "calendar"
                        ? "bg-[#F5EEFF] text-[#7014D9]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Calendar</span>
                  </button>
                </div>
              </div>

              {/* LIST MODE */}
              {weeklyMode === "list" && (
                <div className="flex flex-col gap-3">
                  {/* Monday row */}
                  <div
                    data-tl="me-avail-mon-row"
                    className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          data-tl="me-avail-mon-toggle"
                          className="w-10 h-5 flex items-center rounded-full p-0.5 bg-[#7014D9]"
                        >
                          <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-5" />
                        </div>
                        <span className="text-sm font-bold text-gray-800">Mon</span>
                      </div>

                      {/* Visual Range Bar */}
                      <div className="flex-1 max-w-md mx-6 flex items-center gap-2">
                        <span className="text-[11px] text-gray-400">9:00 AM</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden relative">
                          <div className="absolute inset-y-0 left-1/4 right-1/4 bg-[#7014D9] rounded-full" />
                        </div>
                        <span className="text-[11px] text-gray-400">5:00 PM</span>
                      </div>

                      {/* Dropdown Selectors */}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="rounded-lg border border-gray-200 px-3 py-1.5 bg-white text-gray-700 font-medium flex items-center gap-1.5">
                          <span>9:00 AM</span>
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <span className="text-gray-400">–</span>
                        <div className="rounded-lg border border-gray-200 px-3 py-1.5 bg-white text-gray-700 font-medium flex items-center gap-1.5">
                          <span>5:00 PM</span>
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CALENDAR MODE */}
              {weeklyMode === "calendar" && (
                <div data-tl="me-avail-cal-wrapper" className="flex flex-col gap-4 relative">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        &lt;
                      </button>
                      <span className="font-bold text-gray-900">November 2026</span>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        &gt;
                      </button>
                    </div>
                    <span>West Africa Time</span>
                  </div>

                  {/* Month Grid */}
                  <div className="rounded-2xl border border-gray-200 bg-white shadow-2xs overflow-hidden">
                    <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/40 text-center py-2 text-[10px] font-bold text-gray-400">
                      {daysHeader.map((d) => (
                        <div key={d}>{d}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 auto-rows-[68px] divide-x divide-y divide-gray-100 text-left">
                      {daysInMonth.map((day) => {
                        const isSunday = day % 7 === 1;
                        const isSaturday = day % 7 === 0;
                        const isToday = day === 10;
                        const isWed11 = day === 11;
                        const isPersonal = currentSchedule.id === "personal-schedule";

                        return (
                          <div
                            key={day}
                            data-tl={`me-avail-cal-day-${day}`}
                            onClick={() => {
                              if (isWed11) {
                                tl.setVar("meDatePopoverOpen", !datePopoverOpen);
                              }
                            }}
                            className={`p-1.5 flex flex-col justify-between transition-colors relative cursor-pointer ${
                              isWed11 && datePopoverOpen
                                ? "bg-purple-100/60 ring-2 ring-[#7014D9] rounded-md z-10"
                                : "hover:bg-gray-50/60"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              {isToday ? (
                                <span className="w-5 h-5 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-[10px] font-bold">
                                  {day}
                                </span>
                              ) : (
                                <span className="text-[11px] font-medium text-gray-700 pl-0.5">
                                  {day}
                                </span>
                              )}

                              {!isSunday && (
                                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              )}
                            </div>

                            {!isSunday && (
                              <div className="flex flex-col text-[9px] font-medium text-gray-500 leading-tight">
                                {isWed11 && dateOverrideSaved ? (
                                  <>
                                    <span>09:00 - 17:00</span>
                                    <span>17:00 - 18:00</span>
                                  </>
                                ) : isSaturday && isPersonal ? (
                                  <span>09:00 - 13:00</span>
                                ) : (
                                  <span>09:00 - 17:00</span>
                                )}
                              </div>
                            )}

                            {/* Floating Popover on Wed 11 */}
                            {isWed11 && datePopoverOpen && (
                              <div
                                data-tl="me-date-popover"
                                className="absolute top-full left-0 mt-1 w-64 rounded-2xl bg-white p-3 shadow-2xl border border-gray-100 z-50 flex flex-col gap-2"
                              >
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                  WEDNESDAY, NOV 11
                                </span>

                                <button
                                  type="button"
                                  data-tl="me-menu-btn-edit-date"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    tl.setVar("meDatePopoverOpen", false);
                                    tl.setVar("meDateOverrideModalOpen", true);
                                  }}
                                  className="w-full rounded-xl p-2 flex items-start gap-2.5 hover:bg-gray-50 transition-colors text-left"
                                >
                                  <div className="p-1 rounded-lg bg-gray-100 text-gray-600 mt-0.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-900">Edit date</span>
                                    <span className="text-[10px] text-gray-400">
                                      Custom hours for this day only
                                    </span>
                                  </div>
                                </button>

                                <button
                                  type="button"
                                  data-tl="me-menu-btn-edit-recurring"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full rounded-xl p-2 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
                                >
                                  <div className="flex items-start gap-2.5">
                                    <div className="p-1 rounded-lg bg-gray-100 text-gray-600 mt-0.5">
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                      </svg>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold text-gray-900">
                                        Edit all Wednesdays
                                      </span>
                                      <span className="text-[10px] text-gray-400">
                                        Update recurring weekly hours
                                      </span>
                                    </div>
                                  </div>
                                  <svg className="w-4 h-4 text-gray-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DATE OVERRIDES */}
        {activeTab === "date-overrides" && (
          <div data-tl="me-tab-overrides-content" className="flex flex-col gap-6">
            <div className="flex flex-col text-left">
              <h2 className="text-base font-bold text-gray-900">Date Overrides</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Override your schedule for specific dates — mark days off or set custom hours.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-8 items-start">
              {/* Left Column: Active Overrides */}
              <div className="col-span-3 flex flex-col gap-3">
                <span className="text-xs font-bold text-gray-800">Active Overrides</span>

                <div data-tl="me-overrides-list" className="flex flex-col gap-2.5">
                  <div className="rounded-2xl border border-gray-200 bg-white p-3.5 flex items-center justify-between shadow-2xs">
                    <span className="text-xs font-medium text-gray-800">Wed, Nov 11, 2026</span>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5">
                        9:00 AM - 5:00 PM
                      </span>
                      <button type="button" className="text-red-500 hover:text-red-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-3.5 flex items-center justify-between shadow-2xs">
                    <span className="text-xs font-medium text-gray-800">Wed, Nov 11, 2026</span>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5">
                        5:00 PM - 6:00 PM
                      </span>
                      <button type="button" className="text-red-500 hover:text-red-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Calendar Picker */}
              <div
                data-tl="me-overrides-cal-card"
                className="col-span-2 rounded-3xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col gap-4 text-left"
              >
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <button type="button" className="p-1 hover:bg-gray-100 rounded">&lt;</button>
                  <span className="font-bold text-gray-900">November 2026</span>
                  <button type="button" className="p-1 hover:bg-gray-100 rounded">&gt;</button>
                </div>

                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 py-1">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                  {daysInMonth.map((day) => {
                    const isToday = day === 10;
                    const isWed11 = day === 11;
                    return (
                      <div
                        key={day}
                        data-tl={isWed11 ? "me-overrides-cal-day-11" : undefined}
                        className={`h-7 w-7 mx-auto rounded-lg flex items-center justify-center font-medium cursor-pointer transition-colors ${
                          isToday
                            ? "bg-[#EDE9FE] text-[#7014D9] font-bold"
                            : isWed11
                            ? "bg-emerald-100 text-emerald-800 font-bold border border-emerald-300"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[10px] text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-pink-100 border border-pink-300" />
                    <span>Blocked</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300" />
                    <span>Custom hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PREVIEW */}
        {activeTab === "preview" && (
          <div data-tl="me-tab-preview-content" className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col text-left">
                <h2 className="text-base font-bold text-gray-900">14-Day Preview</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  How bookers see your availability
                </p>
              </div>

              {/* Toggle List / Calendar */}
              <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-2xs text-xs font-medium">
                <button
                  type="button"
                  data-tl="me-preview-toggle-list"
                  onClick={() => tl.setVar("mePreviewMode", "list")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-semibold transition-colors ${
                    previewMode === "list"
                      ? "bg-[#F5EEFF] text-[#7014D9]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span>≡ List</span>
                </button>
                <button
                  type="button"
                  data-tl="me-preview-toggle-cal"
                  onClick={() => tl.setVar("mePreviewMode", "calendar")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-semibold transition-colors ${
                    previewMode === "calendar"
                      ? "bg-[#F5EEFF] text-[#7014D9]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Calendar</span>
                </button>
              </div>
            </div>

            {/* PREVIEW LIST MODE */}
            {previewMode === "list" && (
              <div
                data-tl="me-preview-list-container"
                data-scroller="preview-list"
                className="max-h-[480px] overflow-y-auto pr-2 flex flex-col gap-4 border border-gray-100 rounded-2xl p-4 bg-white shadow-2xs"
              >
                {/* TUE 10 */}
                <div className="flex items-start gap-6 border-b border-gray-100 pb-4">
                  <div className="w-14 shrink-0 flex flex-col text-center">
                    <span className="text-[10px] font-bold text-gray-400">TUE</span>
                    <span className="text-xl font-bold text-gray-900">10</span>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:30 AM</span>

                    {previewExpanded10 ? (
                      <>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">12:00 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">12:30 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">1:00 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">1:30 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">2:00 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">2:30 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">3:00 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">3:30 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">4:00 PM</span>
                        <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">4:30 PM</span>
                        <button
                          type="button"
                          data-tl="me-preview-btn-less-10"
                          onClick={() => tl.setVar("mePreviewExpanded10", false)}
                          className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                        >
                          Show less
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        data-tl="me-preview-btn-more-10"
                        onClick={() => tl.setVar("mePreviewExpanded10", true)}
                        className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-[#7014D9] hover:bg-purple-100"
                      >
                        +8 more
                      </button>
                    )}
                  </div>
                </div>

                {/* WED 11 */}
                <div className="flex items-start gap-6 border-b border-gray-100 pb-4">
                  <div className="w-14 shrink-0 flex flex-col text-center">
                    <span className="text-[10px] font-bold text-gray-400">WED</span>
                    <span className="text-xl font-bold text-gray-900">11</span>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">12:00 PM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">12:30 PM</span>
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-[#7014D9]">
                      +10 more
                    </span>
                  </div>
                </div>

                {/* THU 12 */}
                <div className="flex items-start gap-6 border-b border-gray-100 pb-4">
                  <div className="w-14 shrink-0 flex flex-col text-center">
                    <span className="text-[10px] font-bold text-gray-400">THU</span>
                    <span className="text-xl font-bold text-gray-900">12</span>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:30 AM</span>
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-[#7014D9]">
                      +8 more
                    </span>
                  </div>
                </div>

                {/* SAT 21 */}
                <div className="flex items-start gap-6 border-b border-gray-100 pb-4">
                  <div className="w-14 shrink-0 flex flex-col text-center">
                    <span className="text-[10px] font-bold text-gray-400">SAT</span>
                    <span className="text-xl font-bold text-gray-900">21</span>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">12:00 PM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">12:30 PM</span>
                  </div>
                </div>

                {/* SUN 22 */}
                <div className="flex items-start gap-6 border-b border-gray-100 pb-4">
                  <div className="w-14 shrink-0 flex flex-col text-center">
                    <span className="text-[10px] font-bold text-gray-400">SUN</span>
                    <span className="text-xl font-bold text-gray-300">22</span>
                  </div>
                  <div className="flex-1 flex items-center pt-2">
                    <span className="text-xs italic text-gray-400 font-medium">
                      Unavailable
                    </span>
                  </div>
                </div>

                {/* MON 23 */}
                <div className="flex items-start gap-6">
                  <div className="w-14 shrink-0 flex flex-col text-center">
                    <span className="text-[10px] font-bold text-gray-400">MON</span>
                    <span className="text-xl font-bold text-gray-900">23</span>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">9:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">10:30 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:00 AM</span>
                    <span className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3 py-1 text-xs font-semibold">11:30 AM</span>
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-[#7014D9]">
                      +8 more
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* PREVIEW CALENDAR MODE */}
            {previewMode === "calendar" && (
              <div data-tl="me-preview-calendar-grid" className="flex flex-col gap-4">
                <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/40 text-center py-2 text-[10px] font-bold text-gray-400">
                  <div>SUN</div>
                  <div>MON</div>
                  <div>TUE</div>
                  <div>WED</div>
                  <div>THU</div>
                  <div>FRI</div>
                  <div>SAT</div>
                </div>

                <div className="grid grid-cols-7 gap-3 text-center">
                  {/* Row 1 */}
                  <div className="h-20 rounded-2xl bg-gray-50/30 border border-gray-100" />
                  <div className="h-20 rounded-2xl bg-gray-50/30 border border-gray-100" />
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">10</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">11</span>
                    <span className="text-xs font-medium text-gray-400">18</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">12</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">13</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">14</span>
                    <span className="text-xs font-medium text-gray-400">8</span>
                  </div>

                  {/* Row 2 */}
                  <div className="h-20 rounded-2xl bg-gray-50/50 border border-gray-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-medium text-gray-400">15</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">16</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">17</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">18</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">19</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">20</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">21</span>
                    <span className="text-xs font-medium text-gray-400">8</span>
                  </div>

                  {/* Row 3 */}
                  <div className="h-20 rounded-2xl bg-gray-50/50 border border-gray-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-medium text-gray-400">22</span>
                  </div>
                  <div className="h-20 rounded-2xl bg-[#FBF8FF] border border-purple-100 p-2 flex flex-col justify-between">
                    <span className="text-xs font-bold text-gray-800">23</span>
                    <span className="text-xs font-medium text-gray-400">16</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
