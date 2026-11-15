"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ClipboardList,
  FolderOpen,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Plus,
  ChevronDown,
} from "lucide-react";
import { PROJECTS_URLS } from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsDashboardView({ tl }: Props) {
  const calendarMode = useTimelineVar<"month" | "year">(tl, "projectsCalendarMode", "month");
  const hasCreatedProject = useTimelineVar<boolean>(tl, "hasCreatedProject", false);

  const handleYearToggle = (mode: "month" | "year") => {
    tl.setVar("projectsCalendarMode", mode);
  };

  const handleSeeAllProjects = () => {
    tl.setVar("projectsView", "projects");
    tl.setUrl(PROJECTS_URLS.projects);
  };

  const handleAddTaskClick = () => {
    tl.setVar("projectsView", "tasks");
    tl.setUrl(PROJECTS_URLS.tasks);
    tl.setVar("isAddTaskDrawerOpen", true);
  };

  return (
    <div data-tl="dashboard-view" className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Greeting & Add Task */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            data-tl="dashboard-greeting-title"
            className="text-lg font-bold text-gray-900 tracking-tight"
          >
            Hello jane@example.com, Welcome Back,
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Here&apos;s what&apos;s happening across your workspace today.
          </p>
        </div>
        <button
          type="button"
          data-tl="dashboard-add-task-btn"
          onClick={handleAddTaskClick}
          className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* 2. Stat Cards Row */}
      <div className="grid grid-cols-5 gap-4">
        {/* To-do */}
        <div
          data-tl="stat-card-todo"
          className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs flex items-center justify-between"
        >
          <div>
            <div className="text-[11px] font-medium text-gray-500">To-do</div>
            <div className="text-xl font-bold text-gray-900 mt-1">7</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ClipboardList className="w-4 h-4" />
          </div>
        </div>

        {/* Total Projects */}
        <div
          data-tl="stat-card-total-projects"
          className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs flex items-center justify-between"
        >
          <div>
            <div className="text-[11px] font-medium text-gray-500">Total Projects</div>
            <div className="text-xl font-bold text-gray-900 mt-1">
              {hasCreatedProject ? 5 : 4}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FolderOpen className="w-4 h-4" />
          </div>
        </div>

        {/* Assigned Tasks */}
        <div
          data-tl="stat-card-assigned-tasks"
          className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs flex items-center justify-between"
        >
          <div>
            <div className="text-[11px] font-medium text-gray-500">Assigned Tasks</div>
            <div className="text-xl font-bold text-gray-900 mt-1">0</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        {/* Completed */}
        <div
          data-tl="stat-card-completed"
          className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs flex items-center justify-between"
        >
          <div>
            <div className="text-[11px] font-medium text-gray-500">Completed</div>
            <div className="text-xl font-bold text-gray-900 mt-1">0</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Overdue */}
        <div
          data-tl="stat-card-overdue"
          className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs flex items-center justify-between"
        >
          <div>
            <div className="text-[11px] font-medium text-gray-500">Overdue</div>
            <div className="text-xl font-bold text-gray-900 mt-1">1</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Critical Projects & Team Status */}
      <div className="grid grid-cols-12 gap-5">
        {/* Critical Projects (col-span-7) */}
        <div
          data-tl="dashboard-critical-projects-card"
          className="col-span-7 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gray-900">Critical Projects</h2>
            <button
              type="button"
              data-tl="critical-projects-see-all"
              onClick={handleSeeAllProjects}
              className="text-[11px] font-semibold text-[#7014D9] hover:underline"
            >
              See All
            </button>
          </div>

          <div className="space-y-2.5">
            {/* 1. Customer Acquisition Strategy */}
            <div
              data-tl="critical-project-customer-acquisition"
              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-[#FDFBFF] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  C
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate">
                    Customer Acquisition Strategy
                  </div>
                  <div className="text-[10px] text-gray-400 truncate max-w-xs">
                    Analyzing market trends and customer insights to craft data-driven strategies for growth a...
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 text-[9px] font-bold flex items-center justify-center border border-white">
                    A
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-400 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    D
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    Y
                  </span>
                </div>
                <span className="text-[9px] font-medium text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
                  BOARD
                </span>
              </div>
            </div>

            {/* 2. Digital Marketing */}
            <div
              data-tl="critical-project-digital-marketing"
              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-[#FDFBFF] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  D
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate">
                    Digital Marketing
                  </div>
                  <div className="text-[10px] text-gray-400 truncate max-w-xs">
                    Monitor the development of your marketing strategy as well as SEO, branding, design, and ...
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 text-[9px] font-bold flex items-center justify-center border border-white">
                    A
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-400 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    D
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    Y
                  </span>
                </div>
                <span className="text-[9px] font-medium text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
                  BOARD
                </span>
              </div>
            </div>

            {/* 3. Mobile App Launch */}
            <div
              data-tl="critical-project-mobile-app-launch"
              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-[#FDFBFF] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-violet-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  M
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate">
                    Mobile App Launch
                  </div>
                  <div className="text-[10px] text-gray-400 truncate max-w-xs">
                    Coordinate beta testing, store listings, and launch marketing for the iOS and Android...
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 text-[9px] font-bold flex items-center justify-center border border-white">
                    A
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-400 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    D
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    Y
                  </span>
                </div>
                <span className="text-[9px] font-medium text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
                  BOARD
                </span>
              </div>
            </div>

            {/* 4. Backend Fix */}
            <div
              data-tl="critical-project-backend-fix"
              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-[#FDFBFF] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  B
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate">
                    Backend Fix
                  </div>
                  <div className="text-[10px] text-gray-400 truncate max-w-xs">
                    Fixing bugs in the backend and optimizing database queries
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 text-[9px] font-bold flex items-center justify-center border border-white">
                    A
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-400 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    D
                  </span>
                  <span className="w-5 h-5 rounded-full bg-gray-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    Y
                  </span>
                </div>
                <span className="text-[9px] font-medium text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
                  BOARD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Status (col-span-5) */}
        <div
          data-tl="dashboard-team-status-card"
          className="col-span-5 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xs font-bold text-gray-900 mb-3">Team Status</h2>
            <div className="space-y-2.5">
              {/* Member 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">api@example.com</div>
                    <div className="text-[10px] text-gray-400">Admin</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Member 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center">
                    D
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">devops@example.com</div>
                    <div className="text-[10px] text-gray-400">Member</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Member 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center">
                    J
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">jane@example.com</div>
                    <div className="text-[10px] text-gray-400">Member</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Member 4 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">alex@example.com</div>
                    <div className="text-[10px] text-gray-400">Admin</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Member 5 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center">
                    S
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">sam@example.com</div>
                    <div className="text-[10px] text-gray-400">Member</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs mt-3">
            <span className="text-gray-400">Team Progress</span>
            <span className="font-bold text-gray-900">0%</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Calendar View */}
      <div
        data-tl="dashboard-calendar-card"
        className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-900">Calendar View</h2>
          <div className="flex items-center gap-2">
            {/* Year dropdown */}
            <div
              data-tl="calendar-year-dropdown"
              className="flex items-center gap-1 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-700 bg-white"
            >
              <span>2026</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            {/* Month dropdown (only in month mode) */}
            {calendarMode === "month" && (
              <div
                data-tl="calendar-month-dropdown"
                className="flex items-center gap-1 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-700 bg-white"
              >
                <span>Nov</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            )}

            {/* Toggle button group: Month | Year */}
            <div
              data-tl="calendar-mode-toggle-group"
              className="flex items-center border border-gray-200 rounded-lg overflow-hidden p-0.5 bg-gray-50 text-xs"
            >
              <button
                type="button"
                data-tl="calendar-toggle-month"
                onClick={() => handleYearToggle("month")}
                className={`px-3 py-1 font-semibold rounded-md transition-all ${
                  calendarMode === "month"
                    ? "bg-[#7014D9] text-white shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Month
              </button>
              <button
                type="button"
                data-tl="calendar-toggle-year"
                onClick={() => handleYearToggle("year")}
                className={`px-3 py-1 font-semibold rounded-md transition-all ${
                  calendarMode === "year"
                    ? "bg-[#7014D9] text-white shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Year
              </button>
            </div>
          </div>
        </div>

        {/* View content based on calendarMode */}
        {calendarMode === "month" ? (
          <div data-tl="calendar-month-grid" className="pt-2">
            {/* Days header */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-3">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-y-3 text-center text-xs font-medium text-gray-700">
              {/* Row 1: Nov 1 starts on Sunday! (Nov 1 2026 is a Sunday) */}
              <div data-tl="calendar-day-1">01</div>
              <div data-tl="calendar-day-2">02</div>
              <div data-tl="calendar-day-3">03</div>
              <div data-tl="calendar-day-4">04</div>
              <div data-tl="calendar-day-5">05</div>
              <div data-tl="calendar-day-6">06</div>
              <div data-tl="calendar-day-7">07</div>

              {/* Row 2 */}
              <div data-tl="calendar-day-8">08</div>
              <div data-tl="calendar-day-9">09</div>
              <div data-tl="calendar-day-10">10</div>
              <div data-tl="calendar-day-11">11</div>
              <div data-tl="calendar-day-12">12</div>
              <div data-tl="calendar-day-13">13</div>
              <div data-tl="calendar-day-14">14</div>

              {/* Row 3: 15 is today (Sun 15 Nov 2026) -> purple highlighted */}
              <div className="flex items-center justify-center">
                <span
                  data-tl="calendar-day-15"
                  className="w-7 h-7 rounded-lg bg-[#7014D9] text-white font-bold flex items-center justify-center shadow-xs"
                >
                  15
                </span>
              </div>
              <div data-tl="calendar-day-16">16</div>
              <div data-tl="calendar-day-17">17</div>
              <div data-tl="calendar-day-18">18</div>
              <div data-tl="calendar-day-19">19</div>
              <div data-tl="calendar-day-20">20</div>
              <div data-tl="calendar-day-21">21</div>

              {/* Row 4 */}
              <div data-tl="calendar-day-22">22</div>
              <div data-tl="calendar-day-23">23</div>
              <div data-tl="calendar-day-24">24</div>
              <div data-tl="calendar-day-25">25</div>
              <div data-tl="calendar-day-26">26</div>
              <div data-tl="calendar-day-27">27</div>
              <div data-tl="calendar-day-28">28</div>

              {/* Row 5 */}
              <div data-tl="calendar-day-29">29</div>
              <div data-tl="calendar-day-30">30</div>
              <div className="text-gray-300">01</div>
              <div className="text-gray-300">02</div>
              <div className="text-gray-300">03</div>
              <div className="text-gray-300">04</div>
              <div className="text-gray-300">05</div>

              {/* Row 6 */}
              <div className="text-gray-300">06</div>
              <div className="text-gray-300">07</div>
              <div className="text-gray-300">08</div>
              <div className="text-gray-300">09</div>
              <div className="text-gray-300">10</div>
              <div className="text-gray-300">11</div>
              <div className="text-gray-300">12</div>
            </div>
          </div>
        ) : (
          /* Year View: 4x3 grid of 12 months */
          <div
            data-tl="calendar-year-grid"
            className="grid grid-cols-3 gap-y-6 py-6 text-center text-xs font-semibold text-gray-700"
          >
            <div data-tl="calendar-month-jan">Jan</div>
            <div data-tl="calendar-month-feb">Feb</div>
            <div data-tl="calendar-month-mar">Mar</div>

            <div data-tl="calendar-month-apr">Apr</div>
            <div data-tl="calendar-month-may">May</div>
            <div data-tl="calendar-month-jun">Jun</div>

            <div data-tl="calendar-month-jul">Jul</div>
            <div data-tl="calendar-month-aug">Aug</div>
            <div data-tl="calendar-month-sep">Sep</div>

            <div data-tl="calendar-month-oct">Oct</div>
            <div className="flex items-center justify-center">
              <span
                data-tl="calendar-month-nov"
                className="bg-[#7014D9] text-white px-5 py-1 rounded-full font-bold shadow-xs"
              >
                Nov
              </span>
            </div>
            <div data-tl="calendar-month-dec">Dec</div>
          </div>
        )}
      </div>
    </div>
  );
}
