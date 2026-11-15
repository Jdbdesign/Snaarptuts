"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Calendar,
  CheckCircle2,
  Target,
  Edit2,
  Trash2,
  Search,
  Inbox,
} from "lucide-react";
import type { SprintItem } from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsSprintList({ tl }: Props) {
  const sprints = useTimelineVar<SprintItem[]>(tl, "sprintsList", []);
  const activeFilter = useTimelineVar<string>(tl, "sprintsFilter", "All");
  const filterStatuses = useTimelineVar<string[]>(tl, "sprintFilterStatus", [
    "Active",
    "Planning",
    "Completed",
    "Cancelled",
  ]);

  // Counts
  const totalCount = sprints.length;
  const activeCount = sprints.filter((s) => s.status === "Active").length;
  const planningCount = sprints.filter((s) => s.status === "Planning").length;
  const completedCount = sprints.filter((s) => s.status === "Completed").length;
  const cancelledCount = sprints.filter((s) => s.status === "Cancelled").length;

  // Filter logic
  const visibleSprints = sprints.filter((s) => {
    if (!filterStatuses.includes(s.status)) return false;
    if (activeFilter === "Active") return s.status === "Active";
    if (activeFilter === "Planning") return s.status === "Planning";
    if (activeFilter === "Completed") return s.status === "Completed";
    if (activeFilter === "Cancelled") return s.status === "Cancelled";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter pills & search */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            data-tl="sprint-filter-pill-all"
            onClick={() => tl.setVar("sprintsFilter", "All")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === "All"
                ? "bg-[#7014D9] text-white shadow-2xs"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {totalCount} All
          </button>
          <button
            type="button"
            data-tl="sprint-filter-pill-active"
            onClick={() => tl.setVar("sprintsFilter", "Active")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === "Active"
                ? "bg-[#7014D9] text-white shadow-2xs"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {activeCount} Active
          </button>
          <button
            type="button"
            data-tl="sprint-filter-pill-planning"
            onClick={() => tl.setVar("sprintsFilter", "Planning")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === "Planning"
                ? "bg-[#7014D9] text-white shadow-2xs"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {planningCount} Planning
          </button>
          <button
            type="button"
            data-tl="sprint-filter-pill-completed"
            onClick={() => tl.setVar("sprintsFilter", "Completed")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === "Completed"
                ? "bg-[#7014D9] text-white shadow-2xs"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {completedCount} Completed
          </button>
          <button
            type="button"
            data-tl="sprint-filter-pill-cancelled"
            onClick={() => tl.setVar("sprintsFilter", "Cancelled")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === "Cancelled"
                ? "bg-[#7014D9] text-white shadow-2xs"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cancelledCount} Cancelled
          </button>
        </div>

        {/* Search */}
        <div className="relative w-64 shrink-0">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            placeholder="Search sprints..."
            data-tl="sprint-search-input"
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs placeholder-gray-400 text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      {/* Sprints Content */}
      {visibleSprints.length === 0 ? (
        <div
          data-tl="sprints-empty-state"
          className="bg-white border border-gray-200/90 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-2 min-h-[260px] shadow-xs"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
            <Inbox className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-sm font-semibold text-gray-800">
            No sprints match filters.
          </div>
          <p className="text-xs text-gray-500 max-w-sm">
            Try adjusting your search or filters to find what you are looking for.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleSprints.map((sprint) => {
            const isCompleted = sprint.status === "Completed";
            const isPlanning = sprint.status === "Planning";
            return (
              <div
                key={sprint.id}
                data-tl={`sprint-row-${sprint.id}`}
                className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs hover:border-gray-300 transition-colors flex items-center justify-between"
              >
                {/* Left info */}
                <div className="space-y-1.5 min-w-0 pr-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      SPRINT #{sprint.number}
                    </span>
                    <h3
                      data-tl={`sprint-title-${sprint.id}`}
                      className="text-sm font-bold text-gray-900 truncate"
                    >
                      {sprint.name}
                    </h3>
                    <span
                      data-tl={`sprint-status-${sprint.id}`}
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : isPlanning
                          ? "bg-purple-50 text-[#7014D9] border border-purple-200"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {sprint.status}
                    </span>
                  </div>

                  {sprint.goal && (
                    <p className="text-xs text-gray-500 truncate max-w-xl">
                      {sprint.goal}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {sprint.startDate} - {sprint.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {sprint.completedItems}/{sprint.totalItems} items
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-gray-400" />
                      <span>{sprint.points} pts</span>
                    </div>
                    <span className="text-gray-400 font-medium">
                      {sprint.capacity} pts cap
                    </span>
                  </div>
                </div>

                {/* Right action icons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    data-tl={`sprint-edit-btn-${sprint.id}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    data-tl={`sprint-delete-btn-${sprint.id}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
