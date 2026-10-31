"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";
import { SAMPLE_ATTENDANCE } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function AttendanceView({ tl }: Props) {
  const checkedIn = useTimelineVar(tl, "wfAttendanceCheckedIn", true);
  const seconds = useTimelineVar(tl, "wfAttendanceSeconds", 13 * 60 + 16);
  const loading = useTimelineVar(tl, "wfAttendanceLoading", false);
  const activeTab = useTimelineVar<"calendar" | "timeline" | "regularization">(
    tl,
    "wfAttendanceTab",
    "calendar"
  );

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timerText = checkedIn ? formatTimer(seconds) : SAMPLE_ATTENDANCE.checkedOutTimer;

  // Calendar days grid for October 2026 (1st is Thursday)
  // Grid columns MON, TUE, WED, THU, FRI, SAT, SUN
  // Previous month padding: 3 days (Mon 28, Tue 29, Wed 30 Sep)
  const calendarDays = [
    { day: 28, isCurrentMonth: false, label: "" },
    { day: 29, isCurrentMonth: false, label: "" },
    { day: 30, isCurrentMonth: false, label: "" },
    { day: 1, isCurrentMonth: true, status: "absent", holiday: "GB: Founders' Day" },
    { day: 2, isCurrentMonth: true, status: "absent" },
    { day: 3, isCurrentMonth: true, status: "weekend" },
    { day: 4, isCurrentMonth: true, status: "weekend" },
    { day: 5, isCurrentMonth: true, status: "absent" },
    { day: 6, isCurrentMonth: true, status: "absent" },
    { day: 7, isCurrentMonth: true, status: "absent" },
    { day: 8, isCurrentMonth: true, status: "absent" },
    { day: 9, isCurrentMonth: true, status: "absent" },
    { day: 10, isCurrentMonth: true, status: "weekend" },
    { day: 11, isCurrentMonth: true, status: "weekend" },
    { day: 12, isCurrentMonth: true, status: "absent" },
    { day: 13, isCurrentMonth: true, status: "absent" },
    { day: 14, isCurrentMonth: true, status: "absent" },
    { day: 15, isCurrentMonth: true, status: "absent" },
    { day: 16, isCurrentMonth: true, status: "absent" },
    { day: 17, isCurrentMonth: true, status: "weekend" },
    { day: 18, isCurrentMonth: true, status: "weekend" },
    { day: 19, isCurrentMonth: true, status: "present", time: "08:06 AM" },
    { day: 20, isCurrentMonth: true, status: "present", time: "10:06 AM" },
    { day: 21, isCurrentMonth: true, status: "absent" },
    { day: 22, isCurrentMonth: true, status: "absent" },
    { day: 23, isCurrentMonth: true, status: "absent" },
    { day: 24, isCurrentMonth: true, status: "weekend" },
    { day: 25, isCurrentMonth: true, status: "weekend" },
    { day: 26, isCurrentMonth: true, status: "absent" },
    { day: 27, isCurrentMonth: true, status: "absent" },
    { day: 28, isCurrentMonth: true, status: "absent" },
    { day: 29, isCurrentMonth: true, status: "present", time: "08:11 AM" },
    { day: 30, isCurrentMonth: true, status: "present", time: "09:47 AM", isToday: true },
    { day: 31, isCurrentMonth: true, status: "weekend" },
    { day: 1, isCurrentMonth: false, label: "" },
  ];

  return (
    <div
      data-scroller="attendance"
      className="h-full overflow-y-auto no-scrollbar p-6 bg-[#F9FAFB] space-y-6"
    >
      {/* Attendance timer card */}
      <div
        data-tl="attendance-card"
        className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F3F4F6] pb-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span
                data-tl="attendance-timer"
                className="font-mono text-3xl font-bold tracking-tight text-[#111827]"
              >
                {timerText}
              </span>
              {checkedIn ? (
                <span
                  data-tl="attendance-stop-pill"
                  className="rounded-full bg-[#FCE7F3] px-2.5 py-0.5 text-xs font-semibold text-[#BE185D]"
                >
                  Stop
                </span>
              ) : (
                <button
                  type="button"
                  data-tl="attendance-start-pill"
                  className="rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-xs font-semibold text-[#7014D9] hover:bg-[#DDD6FE]"
                >
                  Start
                </button>
              )}
            </div>

            <div
              data-tl="attendance-location-chip"
              className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-gray-50 px-3 py-1.5 text-xs text-[#4B5563]"
            >
              <Icon name="shPin" size={14} className="text-[#6B7280]" />
              <span>{SAMPLE_ATTENDANCE.location}</span>
              <span className="text-gray-300">/</span>
              <button
                type="button"
                className="text-[#7014D9] hover:underline font-medium"
              >
                View map
              </button>
            </div>
          </div>

          <div>
            {checkedIn ? (
              <button
                type="button"
                data-tl="attendance-checkout-btn"
                disabled={loading}
                onClick={() => {
                  tl.setVar("wfAttendanceLoading", true);
                  setTimeout(() => {
                    tl.setVar("wfAttendanceLoading", false);
                    tl.setVar("wfAttendanceCheckedIn", false);
                  }, 800);
                }}
                className="flex items-center justify-center min-w-[120px] rounded-lg bg-[#DC2626] px-5 py-2 text-xs font-semibold text-white hover:bg-[#B91C1C] transition-colors shadow-sm"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Check Out"
                )}
              </button>
            ) : (
              <button
                type="button"
                data-tl="attendance-checkin-btn"
                onClick={() => {
                  tl.setVar("wfAttendanceCheckedIn", true);
                  tl.setVar("wfAttendanceSeconds", 0);
                }}
                className="flex items-center justify-center min-w-[120px] rounded-lg bg-[#7014D9] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
              >
                Check in
              </button>
            )}
          </div>
        </div>

        {/* Status / Session details */}
        <div className="pt-4">
          {checkedIn ? (
            <div
              data-tl="attendance-session-box"
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4 border border-[#F3F4F6]"
            >
              <div>
                <span className="text-xs text-[#6B7280]">Today&apos;s total </span>
                <span className="text-xs font-bold text-[#111827]">0h 0m</span>
              </div>
              <div className="text-xs font-medium text-[#4B5563]">
                Session 1 · 09:47 AM - In progress
              </div>
            </div>
          ) : (
            <div
              data-tl="attendance-checked-out-box"
              className="rounded-lg bg-gray-50 p-4 border border-[#F3F4F6] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#4B5563]">
                  You are checked out. You can check in again anytime.
                </span>
                <span className="text-xs text-[#6B7280]">
                  Last check out: 10:01 AM
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                <div>
                  <span className="text-xs text-[#6B7280]">Today&apos;s total </span>
                  <span className="text-xs font-bold text-[#111827]">0h 13m</span>
                </div>
                <div className="text-xs font-medium text-[#4B5563]">
                  Session 1 · 09:47 AM - 10:01 AM · 0h 13m
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] gap-6 text-sm font-medium">
        <button
          type="button"
          data-tl="attendance-tab-calendar"
          onClick={() => tl.setVar("wfAttendanceTab", "calendar")}
          className={`pb-3 transition-colors ${
            activeTab === "calendar"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Calendar
        </button>
        <button
          type="button"
          data-tl="attendance-tab-timeline"
          onClick={() => tl.setVar("wfAttendanceTab", "timeline")}
          className={`pb-3 transition-colors ${
            activeTab === "timeline"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Timeline
        </button>
        <button
          type="button"
          data-tl="attendance-tab-regularization"
          onClick={() => tl.setVar("wfAttendanceTab", "regularization")}
          className={`pb-3 transition-colors ${
            activeTab === "regularization"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Regularization
        </button>
      </div>

      {/* Attendance Calendar section */}
      <div
        data-tl="attendance-calendar-scroll"
        className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2
            data-tl="attendance-calendar-heading"
            className="text-base font-semibold text-[#111827]"
          >
            Attendance Calendar
          </h2>
          <div
            data-tl="attendance-cal-header"
            className="flex items-center gap-3 border border-[#E5E7EB] rounded-lg px-3 py-1.5"
          >
            <button
              type="button"
              className="text-[#6B7280] hover:text-[#111827]"
            >
              <Icon name="chevronLeft" size={16} />
            </button>
            <span className="text-xs font-semibold text-[#111827]">
              October 2026
            </span>
            <button
              type="button"
              className="text-[#6B7280] hover:text-[#111827]"
            >
              <Icon name="chevronRight" size={16} />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 border-b border-[#F3F4F6] pb-2 text-center text-xs font-semibold text-[#6B7280]">
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
          <div>SUN</div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((item, idx) => {
            const isToday = item.isToday;
            const isHoliday = !!item.holiday;

            return (
              <div
                key={idx}
                data-tl={isToday ? "attendance-today-cell" : undefined}
                className={`min-h-[76px] rounded-lg border p-2 flex flex-col justify-between transition-colors ${
                  !item.isCurrentMonth
                    ? "border-transparent bg-gray-50/50 text-gray-300"
                    : isToday
                    ? "border-[#7014D9] bg-purple-50/30"
                    : "border-[#E5E7EB] bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  {isToday ? (
                    <span
                      data-tl="attendance-today-circle"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7014D9] text-xs font-bold text-white"
                    >
                      {item.day}
                    </span>
                  ) : (
                    <span
                      className={`text-xs font-medium ${
                        item.isCurrentMonth ? "text-[#111827]" : "text-gray-300"
                      }`}
                    >
                      {item.day}
                    </span>
                  )}

                  {isHoliday && (
                    <span
                      data-tl="attendance-holiday-chip"
                      className="rounded bg-[#EDE9FE] px-1.5 py-0.5 text-[9px] font-medium text-[#7014D9]"
                    >
                      {item.holiday}
                    </span>
                  )}
                </div>

                {item.isCurrentMonth && (
                  <div className="text-[10px]">
                    {item.status === "absent" && (
                      <span className="text-[#EF4444] font-medium">absent</span>
                    )}
                    {item.status === "weekend" && (
                      <span className="text-[#9CA3AF]">weekend</span>
                    )}
                    {item.status === "present" && (
                      <div className="flex flex-col">
                        <span className="text-[#10B981] font-semibold">present</span>
                        {item.time && (
                          <span className="text-[#6B7280] text-[9px]">{item.time}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          data-tl="attendance-legend"
          className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#F3F4F6] text-xs text-[#4B5563]"
        >
          {SAMPLE_ATTENDANCE.legend.map((leg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${leg.color}`} />
              <span>{leg.label}</span>
            </div>
          ))}
        </div>

        {/* Summary strip */}
        <div
          data-tl="attendance-summary-strip"
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 rounded-xl bg-gray-50 p-4 border border-[#E5E7EB] text-center"
        >
          {SAMPLE_ATTENDANCE.summary.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-base font-bold text-[#111827]">
                {stat.value}
              </span>
              <span className="text-[11px] text-[#6B7280]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
