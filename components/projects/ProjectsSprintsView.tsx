"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  RotateCw,
  Plus,
  SlidersHorizontal,
  LayoutList,
  Kanban,
  Calendar as CalendarIcon,
  Target,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProjectsSprintList } from "./ProjectsSprintList";
import { ProjectsSprintBoard } from "./ProjectsSprintBoard";
import { ProjectsNewSprintDialog } from "./ProjectsNewSprintDialog";
import { ProjectsSprintFilterPopover } from "./ProjectsSprintFilterPopover";
import { ProjectsGoalsView } from "./ProjectsGoalsView";
import { ProjectsTimeTrackingView } from "./ProjectsTimeTrackingView";
import type { SprintItem } from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsSprintsView({ tl }: Props) {
  const sprints = useTimelineVar<SprintItem[]>(tl, "sprintsList", []);
  const activeTab = useTimelineVar<string>(tl, "sprintsActiveTab", "sprints");
  const viewMode = useTimelineVar<string>(tl, "sprintsViewMode", "list");
  const isFilterOpen = useTimelineVar<boolean>(tl, "isSprintFilterOpen", false);
  const hoverCalendarChip = useTimelineVar<boolean>(
    tl,
    "hoverCalendarChip",
    false
  );

  const totalSprints = sprints.length;
  const activeSprints = sprints.filter((s) => s.status === "Active").length;
  const completedSprints = sprints.filter((s) => s.status === "Completed").length;

  return (
    <div
      data-tl="sprints-view-container"
      className="space-y-4 max-w-6xl mx-auto font-sans select-none"
    >
      {/* 1. Header: Sprints icon, Title, Subtitle, Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center">
            <RotateCw className="w-4 h-4" />
          </div>
          <div>
            <h1
              data-tl="sprints-title"
              className="text-lg font-bold text-gray-900 tracking-tight"
            >
              Sprints
            </h1>
            <p
              data-tl="sprints-count-subtitle"
              className="text-xs text-gray-500 mt-0.5"
            >
              {totalSprints === 1 ? "1 sprint total" : `${totalSprints} sprints total`}
            </p>
          </div>
        </div>

        {/* Top Right Controls (only on Sprints tab) */}
        {activeTab === "sprints" && (
          <div className="flex items-center gap-2 relative">
            {/* List / Board Switcher */}
            <div className="flex items-center bg-gray-100 rounded-xl p-0.5 border border-gray-200">
              <button
                type="button"
                data-tl="sprints-view-mode-list"
                onClick={() => tl.setVar("sprintsViewMode", "list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
              <button
                type="button"
                data-tl="sprints-view-mode-board"
                onClick={() => tl.setVar("sprintsViewMode", "board")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "board"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Board</span>
              </button>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                type="button"
                data-tl="sprints-filter-btn"
                onClick={() => tl.setVar("isSprintFilterOpen", !isFilterOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                  isFilterOpen
                    ? "bg-gray-100 border-gray-300 text-gray-900"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>

              <ProjectsSprintFilterPopover
                tl={tl}
                isOpen={isFilterOpen}
                onClose={() => tl.setVar("isSprintFilterOpen", false)}
              />
            </div>

            {/* + New Sprint Button */}
            <button
              type="button"
              data-tl="sprints-new-sprint-btn"
              onClick={() => tl.setVar("isNewSprintModalOpen", true)}
              className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Sprint</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Tabs: Sprints / Calendar / Goals / Time Tracking */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          data-tl="sprints-tab-sprints"
          onClick={() => tl.setVar("sprintsActiveTab", "sprints")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "sprints"
              ? "bg-[#7014D9] text-white shadow-2xs"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Sprints</span>
        </button>

        <button
          type="button"
          data-tl="sprints-tab-calendar"
          onClick={() => tl.setVar("sprintsActiveTab", "calendar")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "calendar"
              ? "bg-[#7014D9] text-white shadow-2xs"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Calendar</span>
        </button>

        <button
          type="button"
          data-tl="sprints-tab-goals"
          onClick={() => tl.setVar("sprintsActiveTab", "goals")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "goals"
              ? "bg-[#7014D9] text-white shadow-2xs"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Goals</span>
        </button>

        <button
          type="button"
          data-tl="sprints-tab-time"
          onClick={() => tl.setVar("sprintsActiveTab", "time")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "time"
              ? "bg-[#7014D9] text-white shadow-2xs"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Time Tracking</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === "sprints" && (
        <div className="space-y-4">
          {/* 5 Stat Cards */}
          <div className="grid grid-cols-5 gap-3.5">
            <div
              data-tl="stat-total-sprints"
              className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs"
            >
              <div className="text-[11px] font-medium text-gray-500">
                Total Sprints
              </div>
              <div className="text-xl font-bold text-gray-900 mt-1">
                {totalSprints}
              </div>
            </div>

            <div
              data-tl="stat-active-sprint"
              className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs"
            >
              <div className="text-[11px] font-medium text-gray-500">
                Active Sprint
              </div>
              <div className="text-xl font-bold text-gray-900 mt-1">
                {activeSprints}
              </div>
            </div>

            <div
              data-tl="stat-completed-sprints"
              className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs"
            >
              <div className="text-[11px] font-medium text-gray-500">
                Completed
              </div>
              <div className="text-xl font-bold text-gray-900 mt-1">
                {completedSprints}
              </div>
            </div>

            <div
              data-tl="stat-avg-velocity"
              className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs"
            >
              <div className="text-[11px] font-medium text-gray-500">
                Avg Velocity
              </div>
              <div className="text-xl font-bold text-gray-900 mt-1">0</div>
            </div>

            <div
              data-tl="stat-points-delivered"
              className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs"
            >
              <div className="text-[11px] font-medium text-gray-500">
                Points Delivered
              </div>
              <div className="text-xl font-bold text-gray-900 mt-1">0</div>
            </div>
          </div>

          {/* List or Board View */}
          {viewMode === "list" ? (
            <ProjectsSprintList tl={tl} />
          ) : (
            <ProjectsSprintBoard tl={tl} />
          )}
        </div>
      )}

      {/* Calendar Tab Content */}
      {activeTab === "calendar" && (
        <div
          data-tl="sprint-calendar-view"
          className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2
                data-tl="sprint-calendar-month-title"
                className="text-base font-bold text-gray-900"
              >
                November 2026
              </h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  data-tl="sprint-cal-prev"
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  data-tl="sprint-cal-today"
                  className="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Today
                </button>
                <button
                  type="button"
                  data-tl="sprint-cal-next"
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7014D9]" />
                <span>Tasks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Issues</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Bugs</span>
              </div>
            </div>
          </div>

          {/* Month Grid */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Days Header */}
            <div className="grid grid-cols-7 bg-gray-50/80 border-b border-gray-200 text-center text-xs font-bold text-gray-600 py-2.5">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days Cells */}
            <div className="grid grid-cols-7 auto-rows-[90px] divide-x divide-y divide-gray-100 bg-white text-xs">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const isToday = day === 15;
                const hasTask = day === 19;

                return (
                  <div
                    key={day}
                    className="p-1.5 relative flex flex-col justify-between hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-5 h-5 flex items-center justify-center rounded-full font-semibold ${
                          isToday
                            ? "bg-[#7014D9] text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                    </div>

                    {hasTask && (
                      <div className="relative">
                        <div
                          data-tl="sprint-cal-task-chip"
                          onMouseEnter={() =>
                            tl.setVar("hoverCalendarChip", true)
                          }
                          onMouseLeave={() =>
                            tl.setVar("hoverCalendarChip", false)
                          }
                          className="bg-purple-100 text-[#7014D9] font-medium text-[10px] px-2 py-1 rounded-md truncate cursor-pointer hover:bg-purple-200 transition-colors"
                        >
                          Research competitor onboarding flows
                        </div>

                        {/* Task Hover Preview Card */}
                        {hoverCalendarChip && (
                          <div
                            data-tl="sprint-cal-task-preview"
                            className="absolute bottom-full left-0 mb-1.5 w-60 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50 text-xs font-sans space-y-1.5 animate-in fade-in duration-150"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                                Task
                              </span>
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                To Do
                              </span>
                            </div>
                            <h5 className="font-bold text-gray-900 leading-tight">
                              Research competitor onboarding flows
                            </h5>
                            <div className="text-[10px] text-gray-500 pt-1 border-t border-gray-100 space-y-0.5">
                              <div>
                                Priority:{" "}
                                <span className="font-semibold text-orange-600">
                                  High
                                </span>
                              </div>
                              <div>Due: Nov 19, 2026</div>
                              <div className="truncate">
                                Project: Explore Snaarp Projects!
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Goals Tab Content */}
      {activeTab === "goals" && <ProjectsGoalsView tl={tl} />}

      {/* Time Tracking Tab Content */}
      {activeTab === "time" && <ProjectsTimeTrackingView tl={tl} />}

      {/* New Sprint Modal */}
      <ProjectsNewSprintDialog tl={tl} />
    </div>
  );
}
