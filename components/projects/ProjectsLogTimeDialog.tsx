"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Calendar, ChevronDown } from "lucide-react";
import {
  INITIAL_TASKS,
  NEW_TASK_DATA,
  type TimeEntryItem,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsLogTimeDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isLogTimeModalOpen", false);
  const task = useTimelineVar<string>(
    tl,
    "logTimeTask",
    "Set up task statuses"
  );
  const duration = useTimelineVar<string>(tl, "logTimeDuration", "");
  const date = useTimelineVar<string>(tl, "logTimeDate", "2026-11-15");
  const description = useTimelineVar<string>(tl, "logTimeDescription", "");
  const viewingUser = useTimelineVar<string>(
    tl,
    "viewingUser",
    "jane@example.com"
  );
  const isDatePickerOpen = useTimelineVar<boolean>(
    tl,
    "isLogTimeDatePickerOpen",
    false
  );
  const isTaskSelectOpen = useTimelineVar<boolean>(
    tl,
    "isLogTimeTaskSelectOpen",
    false
  );
  const timeEntries = useTimelineVar<TimeEntryItem[]>(
    tl,
    "timeEntriesList",
    []
  );

  if (!isOpen) return null;

  const allTasks = [...INITIAL_TASKS, NEW_TASK_DATA];

  const handleClose = () => {
    tl.setVar("isLogTimeModalOpen", false);
    tl.setVar("isLogTimeDatePickerOpen", false);
    tl.setVar("isLogTimeTaskSelectOpen", false);
  };

  const handleAddEntry = () => {
    const newEntry: TimeEntryItem = {
      id: `time-${Date.now()}`,
      taskName: task || "Set up task statuses",
      userEmail: viewingUser || "jane@example.com",
      durationMinutes: duration ? Number(duration) : 40,
      date: date || "2026-11-15",
      description: description || "Set up the status workflow",
    };
    tl.setVar("timeEntriesList", [...timeEntries, newEntry]);
    tl.setVar("isLogTimeModalOpen", false);
    pushProjectsToast(tl, "Time entry added");
  };

  return (
    <div
      data-tl="log-time-dialog-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
    >
      <div
        data-tl="log-time-dialog"
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 space-y-4 relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3
            data-tl="log-time-dialog-title"
            className="text-base font-bold text-gray-900 tracking-tight"
          >
            Log Time Manually
          </h3>
          <button
            type="button"
            data-tl="log-time-close-btn"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-3.5 text-xs">
          {/* Task Select */}
          <div className="space-y-1 relative">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              TASK <span className="text-red-500">*</span>
            </label>
            <div
              data-tl="log-time-task-select"
              onClick={() =>
                tl.setVar("isLogTimeTaskSelectOpen", !isTaskSelectOpen)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer text-gray-900 hover:border-gray-300"
            >
              <span className="truncate">{task || "Select a task"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            </div>

            {isTaskSelectOpen && (
              <div
                data-tl="log-time-task-dropdown"
                className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 max-h-48 overflow-y-auto no-scrollbar animate-in fade-in"
              >
                {allTasks.map((t) => {
                  const slug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <div
                      key={t.id}
                      data-tl={`log-time-task-option-${slug}`}
                      onClick={() => {
                        tl.setVar("logTimeTask", t.title);
                        tl.setVar("isLogTimeTaskSelectOpen", false);
                      }}
                      className={`px-3 py-2 cursor-pointer text-xs hover:bg-purple-50 transition-colors ${
                        t.title === task
                          ? "font-semibold text-[#7014D9] bg-purple-50/50"
                          : "text-gray-700"
                      }`}
                    >
                      {t.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              DURATION (MINUTES) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              data-tl="log-time-duration-input"
              value={duration}
              onChange={(e) => tl.setVar("logTimeDuration", e.target.value)}
              placeholder="e.g. 40"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Date */}
          <div className="space-y-1 relative">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              DATE <span className="text-red-500">*</span>
            </label>
            <div
              data-tl="log-time-date-input"
              onClick={() =>
                tl.setVar("isLogTimeDatePickerOpen", !isDatePickerOpen)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer text-gray-900 hover:border-gray-300"
            >
              <span>{date}</span>
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
            </div>

            {isDatePickerOpen && (
              <div
                data-tl="log-time-calendar"
                className="absolute top-14 left-0 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in"
              >
                <div className="text-center font-bold text-xs text-gray-800 mb-2">
                  November 2026
                </div>
                <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-gray-400 mb-1">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const isToday = day === 15;
                    const isSelected = day === 15;
                    return (
                      <button
                        key={day}
                        type="button"
                        data-tl={`log-time-day-${day}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          tl.setVar(
                            "logTimeDate",
                            `2026-11-${day < 10 ? `0${day}` : day}`
                          );
                          tl.setVar("isLogTimeDatePickerOpen", false);
                        }}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-medium transition-colors ${
                          isSelected
                            ? "bg-[#7014D9] text-white font-bold"
                            : isToday
                            ? "border border-[#7014D9] text-[#7014D9] font-bold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              DESCRIPTION
            </label>
            <textarea
              rows={2}
              data-tl="log-time-description-input"
              value={description}
              onChange={(e) => tl.setVar("logTimeDescription", e.target.value)}
              placeholder="What did you work on?"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="button"
            data-tl="log-time-submit-btn"
            onClick={handleAddEntry}
            className="w-full py-2.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Add Time Entry
          </button>
        </div>
      </div>
    </div>
  );
}
