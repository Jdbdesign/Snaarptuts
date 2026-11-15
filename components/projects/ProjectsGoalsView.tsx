"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Target, Plus, LayoutList, GitFork, Calendar, CheckCircle2 } from "lucide-react";
import { PROJECTS_URLS, type GoalItem } from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsGoalsView({ tl }: Props) {
  const goals = useTimelineVar<GoalItem[]>(tl, "goalsList", []);
  const viewMode = useTimelineVar<string>(tl, "goalViewMode", "list");

  const handleOpenCreateGoal = () => {
    tl.setVar("projectsView", "goals-new");
    tl.setUrl(PROJECTS_URLS.goalsNew);
  };

  return (
    <div data-tl="goals-view-container" className="space-y-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 data-tl="goals-view-title" className="text-base font-bold text-gray-900 tracking-tight">
              Goals
            </h2>
            <p className="text-xs text-gray-500">
              Track strategic objectives and progress metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* List / Hierarchy Switcher */}
          <div className="flex items-center bg-gray-100 rounded-xl p-0.5 border border-gray-200">
            <button
              type="button"
              data-tl="goals-view-mode-list"
              onClick={() => tl.setVar("goalViewMode", "list")}
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
              data-tl="goals-view-mode-hierarchy"
              onClick={() => tl.setVar("goalViewMode", "hierarchy")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "hierarchy"
                  ? "bg-white text-gray-900 shadow-2xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Hierarchy</span>
            </button>
          </div>

          <button
            type="button"
            data-tl="goals-new-goal-btn"
            onClick={handleOpenCreateGoal}
            className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      {/* Goals Content */}
      {goals.length === 0 ? (
        <div
          data-tl="goals-empty-state"
          className="bg-white border border-gray-200/90 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px] shadow-xs"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7014D9] flex items-center justify-center">
            <Target className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900">
              No goals yet.
            </h3>
            <p className="text-xs text-gray-500 max-w-sm">
              Create your first goal to start tracking progress across your projects.
            </p>
          </div>
          <button
            type="button"
            data-tl="goals-create-goal-empty-btn"
            onClick={handleOpenCreateGoal}
            className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Goal</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => {
            return (
              <div
                key={goal.id}
                data-tl={`goal-card-${goal.id}`}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs space-y-3 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4
                        data-tl={`goal-title-${goal.id}`}
                        className="text-sm font-bold text-gray-900"
                      >
                        {goal.name}
                      </h4>
                      <span
                        data-tl={`goal-status-${goal.id}`}
                        className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full capitalize"
                      >
                        {goal.status}
                      </span>
                    </div>
                    {goal.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {goal.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="font-semibold text-gray-700">Progress</span>
                    <span className="font-bold text-gray-900">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      data-tl={`goal-progress-bar-${goal.id}`}
                      className="h-full bg-[#7014D9] rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer Due Date and Target */}
                <div className="flex items-center justify-between pt-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span data-tl={`goal-due-date-${goal.id}`}>
                      Due Nov 18, 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>Target: {goal.targetValue}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
