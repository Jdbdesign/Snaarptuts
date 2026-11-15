"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import {
  TIME_TRACKING_USERS,
  type TimeEntryItem,
} from "./projects-data";
import { ProjectsLogTimeDialog } from "./ProjectsLogTimeDialog";

interface Props {
  tl: Timeline;
}

export function ProjectsTimeTrackingView({ tl }: Props) {
  const timeEntries = useTimelineVar<TimeEntryItem[]>(
    tl,
    "timeEntriesList",
    []
  );
  const viewingUser = useTimelineVar<string>(
    tl,
    "viewingUser",
    "jane@example.com"
  );
  const isViewingOpen = useTimelineVar<boolean>(
    tl,
    "isViewingDropdownOpen",
    false
  );

  const totalMinutes = timeEntries.reduce(
    (acc, curr) => acc + curr.durationMinutes,
    0
  );
  const timeLabel = totalMinutes > 0 ? `${totalMinutes}m` : "0m";

  return (
    <div
      data-tl="time-tracking-view-container"
      className="space-y-4 font-sans select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2
              data-tl="time-tracking-title"
              className="text-base font-bold text-gray-900 tracking-tight"
            >
              Time Tracking
            </h2>
            <p className="text-xs text-gray-500">
              Log work hours and view weekly team timesheets.
            </p>
          </div>
        </div>

        <button
          type="button"
          data-tl="time-tracking-log-time-btn"
          onClick={() => tl.setVar("isLogTimeModalOpen", true)}
          className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Log Time</span>
        </button>
      </div>

      {/* Viewing Select & Stats */}
      <div className="flex items-center justify-between gap-4">
        {/* Viewing select */}
        <div className="relative">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 font-medium">Viewing:</span>
            <div
              data-tl="time-tracking-viewing-select"
              onClick={() =>
                tl.setVar("isViewingDropdownOpen", !isViewingOpen)
              }
              className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-semibold text-gray-800 flex items-center gap-2 cursor-pointer shadow-2xs hover:border-gray-300"
            >
              <span>{viewingUser}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Viewing dropdown */}
          {isViewingOpen && (
            <div
              data-tl="time-tracking-viewing-dropdown"
              className="absolute top-10 left-14 w-60 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-40 animate-in fade-in text-xs"
            >
              {TIME_TRACKING_USERS.map((user) => {
                const slug = user.split("@")[0].replace(/[^a-z0-9]+/g, "-");
                return (
                  <div
                    key={user}
                    data-tl={`viewing-user-option-${slug}`}
                    onClick={() => {
                      tl.setVar("viewingUser", user);
                      tl.setVar("isViewingDropdownOpen", false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-purple-50 transition-colors ${
                      user === viewingUser
                        ? "font-semibold text-[#7014D9] bg-purple-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    {user}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2 Stat Cards: Today, This Week */}
        <div className="flex items-center gap-3">
          <div
            data-tl="stat-time-today"
            className="bg-white border border-gray-200/90 rounded-2xl px-5 py-2.5 shadow-xs flex items-center gap-3"
          >
            <div className="text-[11px] font-medium text-gray-500">Today</div>
            <div className="text-sm font-bold text-gray-900">{timeLabel}</div>
          </div>
          <div
            data-tl="stat-time-this-week"
            className="bg-white border border-gray-200/90 rounded-2xl px-5 py-2.5 shadow-xs flex items-center gap-3"
          >
            <div className="text-[11px] font-medium text-gray-500">
              This Week
            </div>
            <div className="text-sm font-bold text-gray-900">{timeLabel}</div>
          </div>
        </div>
      </div>

      {/* Weekly Timesheet */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Timesheet controls */}
        <div className="flex items-center justify-between">
          <h3
            data-tl="timesheet-title"
            className="text-sm font-bold text-gray-900"
          >
            Weekly Timesheet
          </h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="timesheet-this-week-btn"
              className="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              This Week
            </button>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                data-tl="timesheet-prev-btn"
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                data-tl="timesheet-next-btn"
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <span
              data-tl="timesheet-date-range"
              className="text-xs font-semibold text-gray-600 ml-1"
            >
              Nov 9 - Nov 15, 2026
            </span>
          </div>
        </div>

        {/* Timesheet Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
          <div className="grid grid-cols-9 bg-gray-50/80 border-b border-gray-200 font-semibold text-gray-600 text-center py-2.5">
            <span className="col-span-2 text-left pl-4">TASK</span>
            <span>Mon Nov 9</span>
            <span>Tue Nov 10</span>
            <span>Wed Nov 11</span>
            <span>Thu Nov 12</span>
            <span>Fri Nov 13</span>
            <span>Sat Nov 14</span>
            <span className="bg-blue-50/80 text-blue-700 font-bold">
              Sun Nov 15
            </span>
            <span>TOTAL</span>
          </div>

          {timeEntries.length === 0 ? (
            <div
              data-tl="timesheet-empty-state"
              className="py-12 text-center flex flex-col items-center justify-center space-y-1.5 text-gray-400"
            >
              <Inbox className="w-6 h-6 stroke-[1.5]" />
              <span className="text-xs font-medium text-gray-500">
                No time entries for this week
              </span>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  data-tl="timesheet-row-task"
                  className="grid grid-cols-9 items-center text-center py-3 text-xs"
                >
                  <span
                    data-tl="timesheet-task-name"
                    className="col-span-2 text-left pl-4 font-semibold text-gray-900 truncate pr-2"
                  >
                    {entry.taskName}
                  </span>
                  <span className="text-gray-400">—</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-gray-400">—</span>
                  <span
                    data-tl="timesheet-cell-sun"
                    className="bg-blue-50/60 font-bold text-blue-700 py-1"
                  >
                    {entry.durationMinutes}m
                  </span>
                  <span
                    data-tl="timesheet-cell-total"
                    className="font-bold text-gray-900"
                  >
                    {entry.durationMinutes}m
                  </span>
                </div>
              ))}

              {/* Total Footer Row */}
              <div className="grid grid-cols-9 items-center text-center py-2.5 bg-gray-50/50 font-bold text-xs border-t border-gray-200">
                <span className="col-span-2 text-left pl-4 text-gray-700">
                  Daily Total
                </span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-400">—</span>
                <span
                  data-tl="timesheet-daily-total"
                  className="text-blue-700"
                >
                  {timeLabel}
                </span>
                <span
                  data-tl="timesheet-week-total"
                  className="text-gray-900"
                >
                  {timeLabel}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Log Time Modal */}
      <ProjectsLogTimeDialog tl={tl} />
    </div>
  );
}
