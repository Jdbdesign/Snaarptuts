"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  CheckSquare,
  Plus,
  AlertCircle,
  Bug,
  ChevronDown,
  MoreHorizontal,
  Edit2,
  Archive,
  Trash2,
} from "lucide-react";
import {
  type TaskItem,
  INITIAL_TASKS,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsTasksView({ tl }: Props) {
  const tasks = useTimelineVar<TaskItem[]>(tl, "tasksList", INITIAL_TASKS);
  const activeTab = useTimelineVar<string>(tl, "activeTaskTab", "tasks");
  const activeSubTab = useTimelineVar<string>(tl, "activeTaskSubTab", "list");
  const taskRowMenuId = useTimelineVar<string | null>(tl, "taskRowMenuId", null);

  const tasksCount = tasks.length;

  const handleOpenAddTask = () => {
    tl.setVar("isAddTaskDrawerOpen", true);
  };

  const handleRowClick = (task: TaskItem) => {
    tl.setVar("selectedTaskId", task.id);
    tl.setVar("isTaskDrawerOpen", true);
    tl.setVar("taskRowMenuId", null);
  };

  const handleRowMenuToggle = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    tl.setVar("taskRowMenuId", taskRowMenuId === taskId ? null : taskId);
  };

  const handleArchiveTask = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    const updated = tasks.filter((t) => t.id !== taskId);
    tl.setVar("tasksList", updated);
    tl.setVar("taskRowMenuId", null);
    pushProjectsToast(tl, "Task archived");
  };

  const handleDeleteTaskPrompt = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    tl.setVar("deleteTargetTaskId", taskId);
    tl.setVar("taskRowMenuId", null);
    tl.setVar("isDeleteTaskModalOpen", true);
  };

  const handleEditTask = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    tl.setVar("selectedTaskId", taskId);
    tl.setVar("isTaskDrawerOpen", true);
    tl.setVar("taskRowMenuId", null);
  };

  return (
    <div data-tl="tasks-view-container" className="space-y-4 max-w-6xl mx-auto font-sans select-none">
      {/* 1. Header: Work Items, Counts, Add Task button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h1
              data-tl="tasks-view-title"
              className="text-lg font-bold text-gray-900 tracking-tight"
            >
              Work Items
            </h1>
            <p data-tl="tasks-counts-subtitle" className="text-xs text-gray-500 mt-0.5">
              {tasksCount} tasks · 0 issues · 0 bugs
            </p>
          </div>
        </div>

        <button
          type="button"
          data-tl="tasks-add-task-btn"
          onClick={handleOpenAddTask}
          className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* 2. Project dropdown & label */}
      <div className="flex items-center justify-between py-2 border-y border-gray-100">
        <div
          data-tl="tasks-project-dropdown"
          className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800"
        >
          <span className="text-gray-400 font-normal">Project:</span>
          <span>Explore Snaarp Projects!</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div className="text-xs text-gray-500 font-medium">Explore Snaarp Projects!</div>
      </div>

      {/* 3. Overall Progress */}
      <div data-tl="tasks-overall-progress" className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold text-gray-800">Overall Progress</span>
          <span>0 of {tasksCount} completed · 0%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#7014D9] w-0" />
        </div>
      </div>

      {/* 4. Tabs: Tasks / Issues / Bugs */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          data-tl="tasks-tab-tasks"
          onClick={() => tl.setVar("activeTaskTab", "tasks")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === "tasks"
              ? "bg-[#7014D9] text-white shadow-2xs"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Tasks ({tasksCount})
        </button>
        <button
          type="button"
          data-tl="tasks-tab-issues"
          onClick={() => tl.setVar("activeTaskTab", "issues")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Issues (0)</span>
        </button>
        <button
          type="button"
          data-tl="tasks-tab-bugs"
          onClick={() => tl.setVar("activeTaskTab", "bugs")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          <Bug className="w-3.5 h-3.5" />
          <span>Bugs (0)</span>
        </button>
      </div>

      {/* 5. Sub-tabs: List View / Board / Gantt / Calendar */}
      <div className="flex items-center gap-6 border-b border-gray-200 text-xs font-medium text-gray-500">
        <button
          type="button"
          data-tl="tasks-subtab-list"
          onClick={() => tl.setVar("activeTaskSubTab", "list")}
          className={`pb-2 transition-colors ${
            activeSubTab === "list"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-bold"
              : "hover:text-gray-900"
          }`}
        >
          List View
        </button>
        <button
          type="button"
          data-tl="tasks-subtab-board"
          onClick={() => tl.setVar("activeTaskSubTab", "board")}
          className="pb-2 hover:text-gray-900"
        >
          Board
        </button>
        <button
          type="button"
          data-tl="tasks-subtab-gantt"
          onClick={() => tl.setVar("activeTaskSubTab", "gantt")}
          className="pb-2 hover:text-gray-900"
        >
          Gantt
        </button>
        <button
          type="button"
          data-tl="tasks-subtab-calendar"
          onClick={() => tl.setVar("activeTaskSubTab", "calendar")}
          className="pb-2 hover:text-gray-900"
        >
          Calendar
        </button>
      </div>

      {/* 6. Tasks Table */}
      <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-1">Type</div>
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Priority</div>
          <div className="col-span-2">Assignee</div>
          <div className="col-span-1">Due Date</div>
          <div className="col-span-1 text-right" />
        </div>

        <div className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <div
              key={task.id}
              data-tl={`task-row-${task.id}`}
              onClick={() => handleRowClick(task)}
              className="grid grid-cols-12 px-6 py-3 items-center text-xs hover:bg-gray-50/70 cursor-pointer transition-colors relative group"
            >
              {/* Type */}
              <div className="col-span-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-700 bg-purple-50 rounded px-1.5 py-0.5">
                  <CheckSquare className="w-2.5 h-2.5" />
                  <span>Task</span>
                </span>
              </div>

              {/* Title */}
              <div className="col-span-4 font-semibold text-gray-900 truncate pr-2">
                <span data-tl={`task-title-${task.id}`}>{task.title}</span>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className="text-[10px] font-medium text-gray-600 bg-gray-100 rounded px-2 py-0.5">
                  {task.status}
                </span>
              </div>

              {/* Priority */}
              <div className="col-span-1">
                <span
                  className={`text-[10px] font-medium rounded px-2 py-0.5 ${
                    task.priority === "High"
                      ? "text-amber-700 bg-amber-50"
                      : "text-gray-600 bg-gray-100"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {/* Assignee */}
              <div className="col-span-2 flex items-center gap-1.5">
                {task.assignees.length > 0 ? (
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-[#7014D9] text-[8px] font-bold flex items-center justify-center border border-white">
                        J
                      </span>
                      <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 text-[8px] font-bold flex items-center justify-center border border-white">
                        S
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-600 truncate max-w-[90px]">
                      {task.assignees[0]} +1
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">Unassigned</span>
                )}
              </div>

              {/* Due Date */}
              <div className="col-span-1 text-gray-600 font-medium">
                <span data-tl={`task-due-date-${task.id}`}>{task.dueDate}</span>
              </div>

              {/* Row Menu Button (...) */}
              <div className="col-span-1 flex justify-end relative">
                <button
                  type="button"
                  data-tl={`task-menu-btn-${task.id}`}
                  onClick={(e) => handleRowMenuToggle(e, task.id)}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200/50"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {/* Popover Menu */}
                {taskRowMenuId === task.id && (
                  <div
                    data-tl={`task-row-menu-${task.id}`}
                    className="absolute right-0 top-8 w-32 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-30 font-sans text-xs animate-in fade-in duration-100"
                  >
                    <button
                      type="button"
                      data-tl={`task-menu-edit-${task.id}`}
                      onClick={(e) => handleEditTask(e, task.id)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50 text-left font-medium"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      data-tl={`task-menu-archive-${task.id}`}
                      onClick={(e) => handleArchiveTask(e, task.id)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50 text-left font-medium"
                    >
                      <Archive className="w-3.5 h-3.5 text-gray-500" />
                      <span>Archive</span>
                    </button>
                    <button
                      type="button"
                      data-tl={`task-menu-delete-${task.id}`}
                      onClick={(e) => handleDeleteTaskPrompt(e, task.id)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 text-left font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pager */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-100 text-xs text-gray-500 bg-gray-50/40">
          <button type="button" className="text-gray-400 hover:text-gray-700 px-1">&lt;</button>
          <span className="w-6 h-6 rounded-md bg-[#7014D9] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            1
          </span>
          <button type="button" className="text-gray-400 hover:text-gray-700 px-1">&gt;</button>
          <span className="text-gray-400 ml-2">20 / page v</span>
        </div>
      </div>
    </div>
  );
}
