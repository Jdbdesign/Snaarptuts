"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  Trash2,
  UserPlus,
  Plus,
} from "lucide-react";
import {
  PROJECTS_URLS,
  type ProjectItem,
  INITIAL_PROJECTS,
  TEMPLATE_PROJECT,
} from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsProjectDrawer({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isProjectDrawerOpen", false);
  const selectedProjectId = useTimelineVar<string | null>(tl, "selectedProjectId", null);
  const hasCreatedProject = useTimelineVar<boolean>(tl, "hasCreatedProject", false);

  if (!isOpen) return null;

  // Find project
  const allProjects = hasCreatedProject
    ? [TEMPLATE_PROJECT, ...INITIAL_PROJECTS]
    : INITIAL_PROJECTS;

  const project: ProjectItem =
    allProjects.find((p) => p.id === selectedProjectId) ||
    (selectedProjectId === "p-template" ? TEMPLATE_PROJECT : INITIAL_PROJECTS[0]);

  const handleClose = () => {
    tl.setVar("isProjectDrawerOpen", false);
  };

  const handleManageTeam = () => {
    tl.setVar("isProjectDrawerOpen", false);
    tl.setVar("projectsView", "members");
    tl.setUrl(PROJECTS_URLS.members);
  };

  return (
    <div
      data-tl="project-details-drawer"
      className="fixed inset-y-0 right-0 w-[380px] bg-white border-l border-gray-200 shadow-2xl z-40 flex flex-col justify-between overflow-y-auto no-scrollbar font-sans text-xs text-gray-800 animate-in slide-in-from-right duration-200"
    >
      <div className="p-5 space-y-4">
        {/* Top bar: Active pill, edit hint, trash & close buttons */}
        <div className="flex items-center justify-between">
          <span
            data-tl="project-drawer-status-pill"
            className="text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-md px-2 py-0.5"
          >
            Active
          </span>
          <span className="text-[10px] text-gray-400 italic">
            Double-click name/description to edit
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              data-tl="project-drawer-delete-btn"
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 rounded"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              data-tl="project-drawer-close-btn"
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Title & Description */}
        <div>
          <h2
            data-tl="project-drawer-title"
            className="text-base font-bold text-gray-900 tracking-tight"
          >
            {project.name}
          </h2>
          <p
            data-tl="project-drawer-description"
            className="text-[11px] text-gray-500 mt-1 leading-relaxed"
          >
            {project.description}
          </p>
        </div>

        {/* PROGRESS */}
        <div data-tl="project-drawer-progress-section" className="space-y-1.5 pt-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            PROGRESS
          </div>
          <div className="flex items-center justify-between font-semibold text-gray-700 text-xs">
            <span>{project.completedCount} of {project.tasksCount} completed</span>
            <span>0%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#7014D9] w-0" />
          </div>
          <div className="text-[10px] text-gray-400">
            {project.tasksCount} tasks · {project.issuesCount} issues · {project.bugsCount} bugs
          </div>
        </div>

        {/* DETAILS */}
        <div data-tl="project-drawer-details-section" className="space-y-2.5 pt-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            DETAILS
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-2.5">
              <div className="text-[9px] font-semibold text-gray-400 uppercase">PRIORITY</div>
              <div data-tl="project-drawer-priority" className="font-semibold text-gray-900 mt-0.5">
                {project.priority}
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-2.5">
              <div className="text-[9px] font-semibold text-gray-400 uppercase">CATEGORY</div>
              <div data-tl="project-drawer-category" className="font-semibold text-gray-900 mt-0.5">
                {project.category}
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-2.5">
              <div className="text-[9px] font-semibold text-gray-400 uppercase">START DATE</div>
              <div data-tl="project-drawer-start-date" className="font-semibold text-gray-900 mt-0.5">
                {project.startDate}
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-2.5">
              <div className="text-[9px] font-semibold text-gray-400 uppercase">DUE DATE</div>
              <div data-tl="project-drawer-due-date" className="font-semibold text-gray-900 mt-0.5">
                {project.dueDate}
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-2.5">
              <div className="text-[9px] font-semibold text-gray-400 uppercase">CLIENT</div>
              <div data-tl="project-drawer-client" className="font-semibold text-gray-900 mt-0.5">
                {project.client}
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-2.5">
              <div className="text-[9px] font-semibold text-gray-400 uppercase">LEAD</div>
              <div data-tl="project-drawer-lead" className="font-semibold text-gray-900 mt-0.5">
                {project.lead}
              </div>
            </div>
          </div>
        </div>

        {/* TEAM (8) */}
        <div data-tl="project-drawer-team-section" className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              TEAM (8)
            </span>
            <button
              type="button"
              data-tl="project-drawer-manage-team-btn"
              onClick={handleManageTeam}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#7014D9] hover:underline"
            >
              <UserPlus className="w-3 h-3" />
              <span>Manage</span>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                A
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">alex@..</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-gray-300 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                S
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">sam@..</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center">
                J
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">jane@..</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-gray-300 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                T
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">taylor@..</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                M
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">morgan@..</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                C
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">casey@..</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                R
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">riley@..</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                A
              </span>
              <span className="text-[9px] text-gray-400 truncate max-w-[48px] mt-0.5">avery@..</span>
            </div>
          </div>
        </div>

        {/* MILESTONES */}
        <div data-tl="project-drawer-milestones-section" className="space-y-2 pt-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            MILESTONES
          </div>
          <p className="text-[10px] text-gray-400">
            No milestones yet. Add tasks to this project to track progress.
          </p>
          <button
            type="button"
            data-tl="project-drawer-add-tasks-btn"
            className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tasks</span>
          </button>
        </div>
      </div>
    </div>
  );
}
