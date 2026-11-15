"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Plus,
  SlidersHorizontal,
  Search,
  LayoutGrid,
  List,
  Calendar,
} from "lucide-react";
import {
  INITIAL_PROJECTS,
  TEMPLATE_PROJECT,
  type ProjectItem,
} from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsListView({ tl }: Props) {
  const hasCreatedProject = useTimelineVar<boolean>(tl, "hasCreatedProject", false);

  const projects: ProjectItem[] = hasCreatedProject
    ? [TEMPLATE_PROJECT, ...INITIAL_PROJECTS]
    : INITIAL_PROJECTS;

  const totalCount = projects.length;

  const handleOpenNewProjectModal = () => {
    tl.setVar("templateModalStep", "gallery");
    tl.setVar("isTemplateModalOpen", true);
  };

  const handleCardClick = (project: ProjectItem) => {
    tl.setVar("selectedProjectId", project.id);
    tl.setVar("isProjectDrawerOpen", true);
  };

  return (
    <div data-tl="projects-list-view" className="space-y-4 max-w-6xl mx-auto font-sans select-none">
      {/* 1. Header: Title, Counts, View switcher, New Project button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1
            data-tl="projects-view-title"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Projects
          </h1>
          <div className="flex items-center gap-1.5">
            <span
              data-tl="projects-total-badge"
              className="bg-[#7014D9] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full"
            >
              {totalCount} Total
            </span>
            <span
              data-tl="projects-active-badge"
              className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded-md"
            >
              {totalCount} Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Grid / List switch */}
          <div
            data-tl="projects-view-switcher"
            className="flex items-center border border-gray-200 rounded-xl overflow-hidden p-0.5 bg-gray-50 text-xs"
          >
            <button
              type="button"
              data-tl="projects-view-grid"
              className="flex items-center gap-1.5 px-3 py-1 font-semibold rounded-lg bg-[#7014D9] text-white shadow-2xs"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              data-tl="projects-view-list"
              className="flex items-center gap-1.5 px-3 py-1 font-semibold rounded-lg text-gray-600 hover:text-gray-900"
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          {/* New Project button */}
          <button
            type="button"
            data-tl="projects-new-project-btn"
            onClick={handleOpenNewProjectModal}
            className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search row */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          data-tl="projects-filter-btn"
          className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-2xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
          <span>Filter</span>
        </button>

        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            placeholder="Search projects..."
            data-tl="projects-search-input"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none placeholder-gray-400 text-gray-700 shadow-2xs"
          />
        </div>
      </div>

      {/* 3. Projects Grid */}
      <div
        data-tl="projects-grid"
        className="grid grid-cols-3 gap-4 pt-2"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            data-tl={`project-card-${project.id}`}
            onClick={() => handleCardClick(project)}
            className="bg-white border border-gray-200/90 hover:border-purple-300 hover:shadow-sm rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between space-y-3 shadow-2xs group"
          >
            {/* Top row: Title and pills */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3
                  data-tl={`project-card-title-${project.id}`}
                  className="font-bold text-xs text-gray-900 group-hover:text-[#7014D9] transition-colors line-clamp-1"
                >
                  {project.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
                  Internal
                </span>
                <span className="text-[9px] font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
                  BOARD
                </span>
              </div>

              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="text-[9px] font-semibold text-gray-600 bg-gray-100 rounded px-1.5 py-0.5">
                  Active
                </span>
                <span className="text-[9px] font-semibold text-purple-700 bg-purple-50 rounded px-1.5 py-0.5">
                  {project.priority}
                </span>
              </div>
            </div>

            {/* Progress row */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>0/{project.tasksCount} items</span>
                <span>0%</span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#7014D9] w-0" />
              </div>
            </div>

            {/* Footer row: Due date and avatars */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Calendar className="w-3 h-3 text-purple-500" />
                <span>{project.dueDate}</span>
              </div>

              <div className="flex -space-x-1">
                <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 text-[8px] font-bold flex items-center justify-center border border-white">
                  A
                </span>
                <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 text-[8px] font-bold flex items-center justify-center border border-white">
                  D
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
