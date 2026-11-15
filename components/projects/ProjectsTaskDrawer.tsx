"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  Archive,
  Trash2,
  Send,
  Plus,
  Calendar,
  ChevronDown,
} from "lucide-react";
import {
  type TaskItem,
  type SubtaskItem,
  NEW_TASK_DATA,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsTaskDrawer({ tl }: Props) {
  const isAddOpen = useTimelineVar<boolean>(tl, "isAddTaskDrawerOpen", false);
  const isDetailsOpen = useTimelineVar<boolean>(tl, "isTaskDrawerOpen", false);
  const selectedTaskId = useTimelineVar<string | null>(tl, "selectedTaskId", null);
  const tasksList = useTimelineVar<TaskItem[]>(tl, "tasksList", []);

  // Add Task form state
  const newTaskTitle = useTimelineVar<string>(tl, "newTaskTitle", "");
  const newTaskAssignees = useTimelineVar<string[]>(tl, "newTaskAssignees", []);
  const newTaskDueDate = useTimelineVar<string>(tl, "newTaskDueDate", "");
  const newTaskPriority = useTimelineVar<string>(tl, "newTaskPriority", "Normal");
  const newTaskSubtasks = useTimelineVar<SubtaskItem[]>(tl, "newTaskSubtasks", []);
  const subtaskInputText = useTimelineVar<string>(tl, "subtaskInputText", "");

  // Task Details state
  const taskDrawerDescription = useTimelineVar<string>(tl, "taskDrawerDescription", "");
  const commentInputText = useTimelineVar<string>(tl, "commentInputText", "");

  if (!isAddOpen && !isDetailsOpen) return null;

  // Handlers for Add Task
  const handleCloseAdd = () => {
    tl.setVar("isAddTaskDrawerOpen", false);
  };

  const handleAddSubtask = () => {
    if (!subtaskInputText.trim()) return;
    const updated = [
      ...newTaskSubtasks,
      { id: `st-${Date.now()}`, title: subtaskInputText.trim(), completed: false },
    ];
    tl.setVar("newTaskSubtasks", updated);
    tl.setVar("subtaskInputText", "");
  };

  const handleCreateTask = () => {
    const taskToAdd: TaskItem = {
      ...NEW_TASK_DATA,
      title: newTaskTitle || NEW_TASK_DATA.title,
      assignees: newTaskAssignees.length > 0 ? newTaskAssignees : NEW_TASK_DATA.assignees,
      dueDate: newTaskDueDate ? "19/11/2026" : NEW_TASK_DATA.dueDate,
      priority: (newTaskPriority as "Normal" | "High" | "Low") || "High",
      subtasks: newTaskSubtasks.length > 0 ? newTaskSubtasks : NEW_TASK_DATA.subtasks,
    };
    tl.setVar("tasksList", [...tasksList, taskToAdd]);
    tl.setVar("isAddTaskDrawerOpen", false);
    pushProjectsToast(tl, "Task created");
  };

  // Handlers for Task Details
  const handleCloseDetails = () => {
    tl.setVar("isTaskDrawerOpen", false);
  };

  const currentTask: TaskItem =
    tasksList.find((t) => t.id === selectedTaskId) || NEW_TASK_DATA;

  const handleSendComment = () => {
    if (!commentInputText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: "Jane Doe",
      avatar: "J",
      time: "Just now",
      text: commentInputText.trim(),
    };
    const updatedTasks = tasksList.map((t) =>
      t.id === currentTask.id
        ? { ...t, comments: [...t.comments, newComment] }
        : t
    );
    tl.setVar("tasksList", updatedTasks);
    tl.setVar("commentInputText", "");
  };

  const handleArchiveCurrentTask = () => {
    const updatedTasks = tasksList.filter((t) => t.id !== currentTask.id);
    tl.setVar("tasksList", updatedTasks);
    tl.setVar("isTaskDrawerOpen", false);
    pushProjectsToast(tl, "Task archived");
  };

  return (
    <div
      data-tl="task-drawer-container"
      className="fixed inset-y-0 right-0 w-[380px] bg-white border-l border-gray-200 shadow-2xl z-40 flex flex-col justify-between overflow-y-auto no-scrollbar font-sans text-xs text-gray-800 animate-in slide-in-from-right duration-200"
    >
      {isAddOpen ? (
        /* ADD TASK MODE */
        <div className="flex flex-col h-full justify-between">
          <div className="p-5 space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <span
                data-tl="add-task-drawer-status-pill"
                className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded px-2 py-0.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>To Do</span>
              </span>
              <button
                type="button"
                data-tl="add-task-drawer-close-btn"
                onClick={handleCloseAdd}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title Input */}
            <div>
              <input
                type="text"
                readOnly
                placeholder="Task title..."
                value={newTaskTitle}
                data-tl="add-task-title-input"
                className="w-full px-3 py-2 text-sm font-semibold border border-gray-200 rounded-xl focus:outline-none placeholder-gray-400 text-gray-900"
              />
            </div>

            {/* DETAILS Section */}
            <div className="space-y-3 pt-1">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                DETAILS
              </div>

              {/* ASSIGNEE */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  ASSIGNEE
                </label>
                <div
                  data-tl="add-task-assignee-select"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white min-h-[36px]"
                >
                  <div className="flex items-center gap-1 flex-wrap">
                    {newTaskAssignees.length > 0 ? (
                      newTaskAssignees.map((email) => (
                        <span
                          key={email}
                          className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium"
                        >
                          <span>{email}</span>
                          <X className="w-2.5 h-2.5 text-gray-400" />
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">Select assignee(s)</span>
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                </div>
              </div>

              {/* DUE DATE & PRIORITY */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    DUE DATE
                  </label>
                  <div
                    data-tl="add-task-due-date-input"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white"
                  >
                    <span className={newTaskDueDate ? "text-gray-900 font-medium" : "text-gray-400"}>
                      {newTaskDueDate || "Set date"}
                    </span>
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    PRIORITY
                  </label>
                  <div
                    data-tl="add-task-priority-select"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white"
                  >
                    <span className="flex items-center gap-1.5 font-medium text-gray-900">
                      <span className={`w-1.5 h-1.5 rounded-full ${newTaskPriority === "High" ? "bg-amber-500" : "bg-blue-500"}`} />
                      <span>{newTaskPriority}</span>
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  STATUS
                </label>
                <div
                  data-tl="add-task-status-select"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white"
                >
                  <span className="flex items-center gap-1.5 font-medium text-gray-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>To Do</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>

              {/* TAGS */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  TAGS
                </label>
                <div className="text-gray-400 text-xs">No tags</div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  readOnly
                  rows={2}
                  placeholder="Add a description..."
                  data-tl="add-task-description-input"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none placeholder-gray-400 resize-none text-gray-700"
                />
              </div>

              {/* SUB-TASKS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <span>SUB-TASKS ({newTaskSubtasks.length}/{newTaskSubtasks.length})</span>
                  <span>0%</span>
                </div>

                {newTaskSubtasks.map((st) => (
                  <div
                    key={st.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs"
                  >
                    <input type="checkbox" readOnly checked={st.completed} className="rounded" />
                    <span className="text-gray-800 font-medium">{st.title}</span>
                  </div>
                ))}

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    readOnly
                    placeholder="Add a subtask..."
                    value={subtaskInputText}
                    data-tl="add-task-subtask-input"
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-xl text-xs placeholder-gray-400 focus:outline-none text-gray-800"
                  />
                  <button
                    type="button"
                    data-tl="add-task-subtask-add-btn"
                    onClick={handleAddSubtask}
                    className="w-8 h-8 rounded-xl bg-[#7014D9] text-white flex items-center justify-center hover:bg-[#5E10B7] shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ACTIVITY */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  ACTIVITY
                </div>
                <div className="text-gray-400 text-xs">No comments yet.</div>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              type="button"
              data-tl="add-task-submit-btn"
              onClick={handleCreateTask}
              className="w-full bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs py-2.5 rounded-xl shadow-xs transition-colors"
            >
              Create Task
            </button>
          </div>
        </div>
      ) : (
        /* TASK DETAILS MODE */
        <div className="flex flex-col h-full justify-between">
          <div className="p-5 space-y-4">
            {/* Top Bar: Status, Archive, Delete, Close */}
            <div className="flex items-center justify-between">
              <span
                data-tl="task-details-status-pill"
                className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded px-2 py-0.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{currentTask.status}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  data-tl="task-details-archive-btn"
                  onClick={handleArchiveCurrentTask}
                  title="Archive"
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded"
                >
                  <Archive className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  data-tl="task-details-delete-btn"
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  data-tl="task-details-close-btn"
                  onClick={handleCloseDetails}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Task Title */}
            <div>
              <h2
                data-tl="task-details-title"
                className="text-sm font-bold text-gray-900 tracking-tight"
              >
                {currentTask.title}
              </h2>
            </div>

            {/* DETAILS Section */}
            <div className="space-y-3 pt-1">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                DETAILS
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  ASSIGNEE
                </label>
                <div
                  data-tl="task-details-assignees"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white min-h-[36px]"
                >
                  <div className="flex items-center gap-1 flex-wrap">
                    {currentTask.assignees.map((email) => (
                      <span
                        key={email}
                        className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium"
                      >
                        <span>{email}</span>
                        <X className="w-2.5 h-2.5 text-gray-400" />
                      </span>
                    ))}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                </div>
              </div>

              {/* Due Date & Priority */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    DUE DATE
                  </label>
                  <div className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white font-medium text-gray-900">
                    <span>2026-11-19</span>
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    PRIORITY
                  </label>
                  <div className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white">
                    <span className="flex items-center gap-1.5 font-medium text-gray-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{currentTask.priority}</span>
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  STATUS
                </label>
                <div className="w-full px-3 py-1.5 border border-gray-200 rounded-xl flex items-center justify-between text-xs bg-white">
                  <span className="flex items-center gap-1.5 font-medium text-gray-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{currentTask.status}</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  TAGS
                </label>
                <div className="text-gray-400 text-xs">No tags</div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                  DESCRIPTION
                </label>
                <div
                  data-tl="task-details-description-box"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50/50 min-h-[44px] text-gray-800"
                >
                  {taskDrawerDescription || currentTask.description || (
                    <span className="text-gray-400 italic">Click to add a description...</span>
                  )}
                </div>
              </div>

              {/* Subtasks */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <span>SUB-TASKS ({currentTask.subtasks.length}/{currentTask.subtasks.length})</span>
                  <span>0%</span>
                </div>
                {currentTask.subtasks.map((st) => (
                  <div
                    key={st.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs"
                  >
                    <input type="checkbox" readOnly checked={st.completed} className="rounded" />
                    <span className="text-gray-800 font-medium">{st.title}</span>
                  </div>
                ))}
              </div>

              {/* Activity / Comments */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  ACTIVITY
                </div>

                {/* Comments feed */}
                {currentTask.comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5 p-2 bg-purple-50/50 border border-purple-100 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#7014D9] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 text-[11px]">{c.author}</span>
                        <span className="text-[9px] text-gray-400">{c.time}</span>
                      </div>
                      <p className="text-gray-700 text-xs mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))}

                {/* Comment input */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                    J
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      placeholder="Add a comment..."
                      value={commentInputText}
                      data-tl="task-details-comment-input"
                      className="w-full pl-3 pr-8 py-1.5 border border-gray-200 rounded-xl text-xs placeholder-gray-400 focus:outline-none text-gray-800"
                    />
                    <button
                      type="button"
                      data-tl="task-details-send-comment-btn"
                      onClick={handleSendComment}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7014D9]"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
