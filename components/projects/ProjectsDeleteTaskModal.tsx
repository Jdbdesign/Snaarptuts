"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Trash2, X } from "lucide-react";
import type { TaskItem } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsDeleteTaskModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isDeleteTaskModalOpen", false);
  const tasksList = useTimelineVar<TaskItem[]>(tl, "tasksList", []);
  const deleteTargetId = useTimelineVar<string | null>(tl, "deleteTargetTaskId", "t5");

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("isDeleteTaskModalOpen", false);
  };

  const handleConfirmDelete = () => {
    const updated = tasksList.filter((t) => t.id !== deleteTargetId);
    tl.setVar("tasksList", updated);
    tl.setVar("isDeleteTaskModalOpen", false);
    pushProjectsToast(tl, "Task deleted");
  };

  return (
    <div
      data-tl="delete-task-modal-backdrop"
      className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-150"
    >
      <div
        data-tl="delete-task-modal"
        className="w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200/90 p-6 flex flex-col text-xs text-gray-800"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Trash2 className="w-4 h-4" />
            </div>
            <h2 data-tl="delete-task-modal-title" className="text-sm font-bold text-gray-900">
              Delete Task
            </h2>
          </div>
          <button
            type="button"
            data-tl="delete-task-modal-close-btn"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p data-tl="delete-task-modal-body" className="text-xs text-gray-500 py-4 leading-relaxed">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="delete-task-modal-cancel-btn"
            onClick={handleClose}
            className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="delete-task-modal-confirm-btn"
            onClick={handleConfirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
