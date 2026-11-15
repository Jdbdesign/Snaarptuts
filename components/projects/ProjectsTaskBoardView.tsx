"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Calendar, User } from "lucide-react";
import type { TaskItem } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsTaskBoardView({ tl }: Props) {
  const tasks = useTimelineVar<TaskItem[]>(tl, "tasksList", []);
  const dragPos = useTimelineVar<{ x: number; y: number } | null>(
    tl,
    "dragCursorPos",
    null
  );
  const isDragging = useTimelineVar<boolean>(tl, "isDraggingTask", false);
  const draggedTaskId = useTimelineVar<string | null>(
    tl,
    "draggedTaskId",
    null
  );

  const columns: Array<{
    key: "To Do" | "In Progress" | "Done" | "Closed";
    label: string;
    slug: string;
  }> = [
    { key: "To Do", label: "To Do", slug: "todo" },
    { key: "In Progress", label: "In Progress", slug: "inprogress" },
    { key: "Done", label: "Done", slug: "done" },
    { key: "Closed", label: "Closed", slug: "closed" },
  ];

  const handleDragStart = (task: TaskItem) => {
    tl.setVar("isDraggingTask", true);
    tl.setVar("draggedTaskId", task.id);
  };

  const handleDrop = (colKey: "To Do" | "In Progress" | "Done" | "Closed") => {
    if (!isDragging || !draggedTaskId) return;
    const updated = tasks.map((t) =>
      t.id === draggedTaskId ? { ...t, status: colKey } : t
    );
    tl.setVar("tasksList", updated);
    tl.setVar("isDraggingTask", false);
    tl.setVar("draggedTaskId", null);
    tl.setVar("dragCursorPos", null);
    pushProjectsToast(tl, `Task moved to ${colKey}`);
  };

  const draggedTask = tasks.find((t) => t.id === draggedTaskId);

  return (
    <div
      data-tl="task-board-container"
      className="grid grid-cols-4 gap-4 font-sans select-none relative min-h-[420px]"
    >
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.key);
        const count = colTasks.length;

        return (
          <div
            key={col.key}
            data-tl={`task-col-${col.slug}`}
            onMouseUp={() => handleDrop(col.key)}
            className="bg-gray-100/70 border border-gray-200/80 rounded-2xl p-3 flex flex-col min-h-[400px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200/60">
              <span className="text-xs font-bold text-gray-800">
                {col.label}
              </span>
              <span
                data-tl={`task-col-${col.slug}-count`}
                className="w-5 h-5 rounded-full bg-white text-gray-600 text-[11px] font-bold flex items-center justify-center shadow-2xs"
              >
                {count}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-2.5">
              {colTasks.map((task) => {
                const isHigh = task.priority === "High";
                const isLow = task.priority === "Low";
                return (
                  <div
                    key={task.id}
                    data-tl={`task-card-${task.id}`}
                    onMouseDown={() => handleDragStart(task)}
                    className="bg-white border border-gray-200/90 rounded-xl p-3 shadow-xs cursor-grab active:cursor-grabbing hover:border-purple-300 transition-all space-y-2"
                  >
                    {/* Priority & Due Date */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full ${
                          isHigh
                            ? "bg-orange-50 text-orange-600 border border-orange-200"
                            : isLow
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                      {task.dueDate && task.dueDate !== "—" && (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-bold text-gray-900 leading-snug">
                      {task.title}
                    </h4>

                    {/* Assignees */}
                    <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center -space-x-1.5">
                        {task.assignees.length > 0 ? (
                          task.assignees.map((email, idx) => {
                            const initial = email[0].toUpperCase();
                            const bg =
                              idx === 0
                                ? "bg-[#7014D9] text-white"
                                : "bg-indigo-600 text-white";
                            return (
                              <div
                                key={email}
                                className={`w-5 h-5 rounded-full ${bg} flex items-center justify-center text-[9px] font-bold ring-2 ring-white`}
                              >
                                {initial}
                              </div>
                            );
                          })
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[9px]">
                            <User className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Task
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Floating preview while dragging */}
      {isDragging && dragPos && draggedTask && (
        <div
          className="fixed pointer-events-none z-50 bg-white border border-[#7014D9] rounded-xl p-3 shadow-2xl opacity-90 w-60 -translate-x-1/2 -translate-y-1/2 rotate-1"
          style={{ left: dragPos.x, top: dragPos.y }}
        >
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
            {draggedTask.priority}
          </span>
          <h4 className="text-xs font-bold text-gray-900 mt-1">
            {draggedTask.title}
          </h4>
        </div>
      )}
    </div>
  );
}
