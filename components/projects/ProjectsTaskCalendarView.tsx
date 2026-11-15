"use client";

import type { Timeline } from "@/lib/timeline";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  tl: Timeline;
}

export function ProjectsTaskCalendarView({ tl: _tl }: Props) {
  void _tl;
  return (
    <div
      data-tl="task-calendar-view-container"
      className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs space-y-4 font-sans select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-gray-900">
            November 2026
          </h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Today
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
        <div className="grid grid-cols-7 bg-gray-50/80 border-b border-gray-200 text-center font-bold text-gray-600 py-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 auto-rows-[80px] divide-x divide-y divide-gray-100 bg-white">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isToday = day === 15;
            const hasTask = day === 19;
            return (
              <div
                key={day}
                className="p-1.5 flex flex-col justify-between hover:bg-gray-50/50"
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold ${
                    isToday ? "bg-[#7014D9] text-white" : "text-gray-700"
                  }`}
                >
                  {day}
                </span>
                {hasTask && (
                  <div
                    data-tl="task-calendar-chip"
                    className="bg-purple-100 text-[#7014D9] font-medium text-[10px] px-2 py-0.5 rounded truncate shadow-2xs"
                  >
                    Research competitor onboarding flows
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
