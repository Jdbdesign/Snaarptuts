"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ArrowLeft, Calendar, ChevronDown } from "lucide-react";
import {
  PROJECTS_URLS,
  CREATED_GOAL_DATA,
  type GoalItem,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsCreateGoalView({ tl }: Props) {
  const name = useTimelineVar<string>(tl, "goalName", "");
  const description = useTimelineVar<string>(tl, "goalDescription", "");
  const targetType = useTimelineVar<string>(tl, "goalTargetType", "Number");
  const targetValue = useTimelineVar<string>(tl, "goalTargetValue", "");
  const dueDate = useTimelineVar<string>(tl, "goalDueDate", "");
  const isDatePickerOpen = useTimelineVar<boolean>(
    tl,
    "isGoalDatePickerOpen",
    false
  );
  const isTargetTypeOpen = useTimelineVar<boolean>(
    tl,
    "isGoalTargetTypeSelectOpen",
    false
  );
  const goals = useTimelineVar<GoalItem[]>(tl, "goalsList", []);

  const handleBack = () => {
    tl.setVar("projectsView", "sprints");
    tl.setVar("sprintsActiveTab", "goals");
    tl.setUrl(PROJECTS_URLS.sprints);
  };

  const handleSubmit = () => {
    const newGoal: GoalItem = {
      ...CREATED_GOAL_DATA,
      name: name || CREATED_GOAL_DATA.name,
      description: description || CREATED_GOAL_DATA.description,
      targetType: (targetType as GoalItem["targetType"]) || "Percentage",
      targetValue: targetValue ? Number(targetValue) : 100,
      dueDate: dueDate || "2026-11-18",
    };
    tl.setVar("goalsList", [newGoal, ...goals]);
    pushProjectsToast(tl, "Goal created successfully");
    handleBack();
  };

  return (
    <div
      data-tl="create-goal-view-container"
      className="max-w-2xl mx-auto space-y-6 font-sans select-none py-2"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-tl="create-goal-back-btn"
          onClick={handleBack}
          className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1
            data-tl="create-goal-title"
            className="text-lg font-bold text-gray-900 tracking-tight"
          >
            Create Goal
          </h1>
          <p className="text-xs text-gray-500">
            Define target metrics and due dates to monitor progress.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
        {/* Goal Name */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              GOAL NAME <span className="text-red-500">*</span>
            </label>
            <span
              data-tl="create-goal-name-counter"
              className="text-[10px] text-gray-400 font-medium"
            >
              {name.length} / 128
            </span>
          </div>
          <input
            type="text"
            data-tl="create-goal-name-input"
            value={name}
            onChange={(e) => tl.setVar("goalName", e.target.value)}
            placeholder="Enter goal name"
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 text-xs"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              DESCRIPTION
            </label>
            <span
              data-tl="create-goal-desc-counter"
              className="text-[10px] text-gray-400 font-medium"
            >
              {description.length} / 2000
            </span>
          </div>
          <textarea
            rows={3}
            data-tl="create-goal-description-input"
            value={description}
            onChange={(e) => tl.setVar("goalDescription", e.target.value)}
            placeholder="Describe the goal..."
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 resize-none text-xs"
          />
        </div>

        {/* Target Type and Target Value */}
        <div className="grid grid-cols-2 gap-4">
          {/* Target Type */}
          <div className="space-y-1 relative">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              TARGET TYPE <span className="text-red-500">*</span>
            </label>
            <div
              data-tl="create-goal-target-type-select"
              onClick={() =>
                tl.setVar("isGoalTargetTypeSelectOpen", !isTargetTypeOpen)
              }
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer text-gray-900 hover:border-gray-300"
            >
              <span>{targetType}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            {isTargetTypeOpen && (
              <div
                data-tl="create-goal-target-type-dropdown"
                className="absolute top-16 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in"
              >
                {["Number", "Percentage", "Currency"].map((opt) => (
                  <div
                    key={opt}
                    data-tl={`target-type-option-${opt.toLowerCase()}`}
                    onClick={() => {
                      tl.setVar("goalTargetType", opt);
                      tl.setVar("isGoalTargetTypeSelectOpen", false);
                    }}
                    className={`px-3.5 py-2 cursor-pointer hover:bg-purple-50 transition-colors ${
                      opt === targetType
                        ? "font-semibold text-[#7014D9] bg-purple-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Target Value */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
              TARGET VALUE <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                data-tl="create-goal-target-value-input"
                value={targetValue}
                onChange={(e) => tl.setVar("goalTargetValue", e.target.value)}
                placeholder="e.g. 100"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400"
              />
              {targetType === "Percentage" && (
                <div
                  data-tl="target-value-percentage-badge"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs"
                >
                  %
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-1 relative">
          <label className="block text-[11px] font-bold text-gray-700 tracking-wider">
            DUE DATE <span className="text-red-500">*</span>
          </label>
          <div
            data-tl="create-goal-due-date-input"
            onClick={() => tl.setVar("isGoalDatePickerOpen", !isDatePickerOpen)}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer text-gray-900 hover:border-gray-300"
          >
            <span>{dueDate || "Select date"}</span>
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Date Picker Dropdown */}
          {isDatePickerOpen && (
            <div
              data-tl="create-goal-calendar"
              className="absolute top-16 left-0 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in"
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
                      data-tl={`goal-date-day-${day}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        tl.setVar(
                          "goalDueDate",
                          `2026-11-${day < 10 ? `0${day}` : day}`
                        );
                        tl.setVar("isGoalDatePickerOpen", false);
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

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="button"
            data-tl="create-goal-submit-btn"
            onClick={handleSubmit}
            className="w-full py-2.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Create Goal
          </button>
        </div>
      </div>
    </div>
  );
}
