"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Calendar, ChevronDown } from "lucide-react";
import { pushProjectsToast } from "./projects-timeline";
import {
  CREATED_SPRINT_DATA,
  type SprintItem,
  ALL_PROJECT_NAMES,
} from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsNewSprintDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isNewSprintModalOpen", false);
  const name = useTimelineVar<string>(tl, "newSprintName", "");
  const goal = useTimelineVar<string>(tl, "newSprintGoal", "");
  const startDate = useTimelineVar<string>(tl, "newSprintStartDate", "2026-11-16");
  const endDate = useTimelineVar<string>(tl, "newSprintEndDate", "2026-11-18");
  const capacity = useTimelineVar<string>(tl, "newSprintCapacity", "");
  const project = useTimelineVar<string>(
    tl,
    "newSprintProject",
    "Explore Snaarp Projects!"
  );
  const isStartDateOpen = useTimelineVar<boolean>(
    tl,
    "isSprintStartDatePickerOpen",
    false
  );
  const isEndDateOpen = useTimelineVar<boolean>(
    tl,
    "isSprintEndDatePickerOpen",
    false
  );
  const isProjectDropdownOpen = useTimelineVar<boolean>(
    tl,
    "isSprintProjectDropdownOpen",
    false
  );
  const sprints = useTimelineVar<SprintItem[]>(tl, "sprintsList", []);

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("isNewSprintModalOpen", false);
    tl.setVar("isSprintStartDatePickerOpen", false);
    tl.setVar("isSprintEndDatePickerOpen", false);
    tl.setVar("isSprintProjectDropdownOpen", false);
  };

  const handleCreate = () => {
    const newSprint: SprintItem = {
      ...CREATED_SPRINT_DATA,
      name: name || CREATED_SPRINT_DATA.name,
      goal: goal || CREATED_SPRINT_DATA.goal,
      startDate: startDate || "2026-11-16",
      endDate: endDate || "2026-11-18",
      capacity: capacity ? Number(capacity) : 40,
      project: project || "Explore Snaarp Projects!",
      status: "Planning",
    };
    tl.setVar("sprintsList", [newSprint, ...sprints]);
    tl.setVar("isNewSprintModalOpen", false);
    pushProjectsToast(tl, "Sprint created");
  };

  return (
    <div
      data-tl="new-sprint-dialog-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
    >
      <div
        data-tl="new-sprint-dialog"
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg p-6 space-y-4 relative"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2
              data-tl="new-sprint-dialog-title"
              className="text-base font-bold text-gray-900 tracking-tight"
            >
              New Sprint
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Plan and launch a new development sprint.
            </p>
          </div>
          <button
            type="button"
            data-tl="new-sprint-dialog-close-btn"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-3.5 text-xs">
          {/* Sprint Name */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              SPRINT NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              data-tl="new-sprint-name-input"
              value={name}
              onChange={(e) => tl.setVar("newSprintName", e.target.value)}
              placeholder="e.g. Authentication & Onboarding"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Sprint Goal */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              SPRINT GOAL
            </label>
            <textarea
              rows={2}
              data-tl="new-sprint-goal-input"
              value={goal}
              onChange={(e) => tl.setVar("newSprintGoal", e.target.value)}
              placeholder="Describe the main objective of this sprint..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-2 gap-3 relative">
            {/* Start Date */}
            <div className="space-y-1 relative">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
                START DATE
              </label>
              <div
                data-tl="new-sprint-start-date-input"
                onClick={() => {
                  tl.setVar(
                    "isSprintStartDatePickerOpen",
                    !isStartDateOpen
                  );
                  tl.setVar("isSprintEndDatePickerOpen", false);
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer text-gray-900 hover:border-gray-300"
              >
                <span>{startDate}</span>
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>

              {/* Start Date Picker Dropdown */}
              {isStartDateOpen && (
                <div
                  data-tl="new-sprint-start-calendar"
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
                      const isSelected = day === 16;
                      return (
                        <button
                          key={day}
                          type="button"
                          data-tl={`sprint-start-date-day-${day}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            tl.setVar(
                              "newSprintStartDate",
                              `2026-11-${day < 10 ? `0${day}` : day}`
                            );
                            tl.setVar("isSprintStartDatePickerOpen", false);
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

            {/* End Date */}
            <div className="space-y-1 relative">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
                END DATE
              </label>
              <div
                data-tl="new-sprint-end-date-input"
                onClick={() => {
                  tl.setVar("isSprintEndDatePickerOpen", !isEndDateOpen);
                  tl.setVar("isSprintStartDatePickerOpen", false);
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer text-gray-900 hover:border-gray-300"
              >
                <span>{endDate}</span>
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>

              {/* End Date Picker Dropdown */}
              {isEndDateOpen && (
                <div
                  data-tl="new-sprint-end-calendar"
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
                      const isSelected = day === 18;
                      return (
                        <button
                          key={day}
                          type="button"
                          data-tl={`sprint-end-date-day-${day}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            tl.setVar(
                              "newSprintEndDate",
                              `2026-11-${day < 10 ? `0${day}` : day}`
                            );
                            tl.setVar("isSprintEndDatePickerOpen", false);
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
          </div>

          {/* Story Point Capacity */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              STORY POINT CAPACITY
            </label>
            <input
              type="text"
              data-tl="new-sprint-capacity-input"
              value={capacity}
              onChange={(e) => tl.setVar("newSprintCapacity", e.target.value)}
              placeholder="e.g. 40"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Project Select */}
          <div className="space-y-1 relative">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              PROJECT
            </label>
            <div
              data-tl="new-sprint-project-select"
              onClick={() =>
                tl.setVar("isSprintProjectDropdownOpen", !isProjectDropdownOpen)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer text-gray-900 hover:border-gray-300"
            >
              <span>{project}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Projects Dropdown Menu */}
            {isProjectDropdownOpen && (
              <div
                data-tl="new-sprint-project-dropdown"
                className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in"
              >
                {ALL_PROJECT_NAMES.map((proj) => {
                  const slug = proj.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <div
                      key={proj}
                      data-tl={`sprint-project-option-${slug}`}
                      onClick={() => {
                        tl.setVar("newSprintProject", proj);
                        tl.setVar("isSprintProjectDropdownOpen", false);
                      }}
                      className={`px-3 py-2 cursor-pointer text-xs hover:bg-purple-50 transition-colors ${
                        proj === project
                          ? "font-semibold text-[#7014D9] bg-purple-50/50"
                          : "text-gray-700"
                      }`}
                    >
                      {proj}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="new-sprint-cancel-btn"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="new-sprint-submit-btn"
            onClick={handleCreate}
            className="px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B7] rounded-xl text-xs font-semibold text-white shadow-xs transition-colors"
          >
            Create Sprint
          </button>
        </div>
      </div>
    </div>
  );
}
