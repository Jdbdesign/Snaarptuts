"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TaskItem } from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsGanttView({ tl }: Props) {
  const tasks = useTimelineVar<TaskItem[]>(tl, "tasksList", []);

  return (
    <div
      data-tl="gantt-view-container"
      className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs space-y-4 font-sans select-none overflow-x-auto no-scrollbar"
    >
      {/* Header controls */}
      <div className="flex items-center justify-between min-w-[700px]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="gantt-today-btn"
            className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Today
          </button>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              data-tl="gantt-prev-btn"
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              data-tl="gantt-next-btn"
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <span
            data-tl="gantt-month-label"
            className="text-sm font-bold text-gray-900"
          >
            November 2026
          </span>
        </div>
      </div>

      {/* Gantt Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden min-w-[800px] text-xs">
        {/* Days Header */}
        <div className="flex bg-gray-50/80 border-b border-gray-200 text-gray-600 font-semibold py-2">
          <div className="w-64 pl-4 shrink-0">TASK</div>
          <div className="flex-1 grid grid-cols-30 text-center text-[10px]">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <span
                key={day}
                className={day === 15 ? "text-[#7014D9] font-bold" : ""}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Task Rows */}
        <div className="divide-y divide-gray-100">
          {tasks.map((task) => {
            const isResearchTask =
              task.title.toLowerCase().includes("research") ||
              task.dueDate.includes("19");

            return (
              <div
                key={task.id}
                data-tl={isResearchTask ? "gantt-row-task" : undefined}
                className="flex items-center py-2.5 hover:bg-gray-50/50"
              >
                <div className="w-64 pl-4 shrink-0 font-medium text-gray-900 truncate pr-2">
                  {task.title}
                </div>
                <div className="flex-1 grid grid-cols-30 relative items-center h-6">
                  {isResearchTask && (
                    <div
                      data-tl="gantt-bar-day-19"
                      style={{ gridColumnStart: 19, gridColumnEnd: 21 }}
                      className="h-4 bg-[#7014D9] rounded-md shadow-xs flex items-center justify-center text-[9px] text-white font-bold"
                    >
                      Nov 19
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
