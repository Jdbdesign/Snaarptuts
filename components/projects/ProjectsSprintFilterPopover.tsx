"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Check } from "lucide-react";
import { ALL_PROJECT_NAMES } from "./projects-data";

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectsSprintFilterPopover({ tl, isOpen, onClose }: Props) {
  const selectedStatuses = useTimelineVar<string[]>(tl, "sprintFilterStatus", [
    "Active",
    "Planning",
    "Completed",
    "Cancelled",
  ]);
  const selectedProjects = useTimelineVar<string[]>(
    tl,
    "sprintFilterProjects",
    [...ALL_PROJECT_NAMES]
  );

  if (!isOpen) return null;

  const toggleStatus = (status: string) => {
    const next = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    tl.setVar("sprintFilterStatus", next);
  };

  const toggleProject = (project: string) => {
    const next = selectedProjects.includes(project)
      ? selectedProjects.filter((p) => p !== project)
      : [...selectedProjects, project];
    tl.setVar("sprintFilterProjects", next);
  };

  const handleClear = () => {
    tl.setVar("sprintFilterStatus", [
      "Active",
      "Planning",
      "Completed",
      "Cancelled",
    ]);
    tl.setVar("sprintFilterProjects", [...ALL_PROJECT_NAMES]);
  };

  const handleApply = () => {
    tl.setVar("isSprintFilterOpen", false);
    onClose();
  };

  return (
    <div
      data-tl="sprint-filter-popover"
      className="absolute top-12 left-0 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-40 text-xs font-sans select-none animate-in fade-in duration-150"
    >
      <div className="space-y-4">
        {/* Status section */}
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            STATUS
          </div>
          <div className="space-y-1.5">
            {["Active", "Planning", "Completed", "Cancelled"].map((st) => {
              const isChecked = selectedStatuses.includes(st);
              return (
                <label
                  key={st}
                  data-tl={`filter-status-${st.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleStatus(st);
                  }}
                  className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked
                        ? "bg-[#7014D9] border-[#7014D9] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                  </div>
                  <span>{st}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Project section */}
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            PROJECT
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
            {ALL_PROJECT_NAMES.map((proj) => {
              const isChecked = selectedProjects.includes(proj);
              const slug = proj.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <label
                  key={proj}
                  data-tl={`filter-project-${slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleProject(proj);
                  }}
                  className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? "bg-[#7014D9] border-[#7014D9] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                  </div>
                  <span className="truncate">{proj}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="sprint-filter-clear-btn"
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-gray-800 font-medium px-2 py-1 rounded"
          >
            Clear
          </button>
          <button
            type="button"
            data-tl="sprint-filter-apply-btn"
            onClick={handleApply}
            className="bg-[#7014D9] hover:bg-[#5E10B7] text-white text-xs font-semibold px-4 py-1.5 rounded-xl transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
