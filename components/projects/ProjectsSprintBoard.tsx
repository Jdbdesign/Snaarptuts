"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Calendar, CheckCircle2 } from "lucide-react";
import type { SprintItem } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsSprintBoard({ tl }: Props) {
  const sprints = useTimelineVar<SprintItem[]>(tl, "sprintsList", []);
  const dragPos = useTimelineVar<{ x: number; y: number } | null>(
    tl,
    "dragCursorPos",
    null
  );
  const isDragging = useTimelineVar<boolean>(tl, "isDraggingSprint", false);

  const columns: Array<{
    key: "Active" | "Planning" | "Completed" | "Cancelled";
    label: string;
  }> = [
    { key: "Active", label: "Active" },
    { key: "Planning", label: "Planning" },
    { key: "Completed", label: "Completed" },
    { key: "Cancelled", label: "Cancelled" },
  ];

  const handleCardDragStart = (sprint: SprintItem) => {
    tl.setVar("isDraggingSprint", true);
    tl.setVar("draggedSprintId", sprint.id);
  };

  const handleDropInColumn = (
    targetCol: "Active" | "Planning" | "Completed" | "Cancelled"
  ) => {
    if (!isDragging) return;
    const updated = sprints.map((s) =>
      s.id === "sprint-1" ? { ...s, status: targetCol } : s
    );
    tl.setVar("sprintsList", updated);
    tl.setVar("isDraggingSprint", false);
    tl.setVar("dragCursorPos", null);
    pushProjectsToast(tl, "Sprint status updated");
  };

  return (
    <div
      data-tl="sprint-board-container"
      className="grid grid-cols-4 gap-4 font-sans select-none relative min-h-[400px]"
    >
      {columns.map((col) => {
        const colSprints = sprints.filter((s) => s.status === col.key);
        const count = colSprints.length;
        const colKeyLower = col.key.toLowerCase();

        return (
          <div
            key={col.key}
            data-tl={`sprint-col-${colKeyLower}`}
            onMouseUp={() => handleDropInColumn(col.key)}
            className="bg-gray-100/70 border border-gray-200/80 rounded-2xl p-3 flex flex-col min-h-[380px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200/60">
              <span className="text-xs font-bold text-gray-800">
                {col.label}
              </span>
              <span
                data-tl={`sprint-col-${colKeyLower}-count`}
                className="w-5 h-5 rounded-full bg-white text-gray-600 text-[11px] font-bold flex items-center justify-center shadow-2xs"
              >
                {count}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-2.5">
              {colSprints.map((sprint) => {
                return (
                  <div
                    key={sprint.id}
                    data-tl={`sprint-card-${sprint.id}`}
                    onMouseDown={() => handleCardDragStart(sprint)}
                    className="bg-white border border-gray-200/90 rounded-xl p-3.5 shadow-xs cursor-grab active:cursor-grabbing hover:border-purple-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        SPRINT #{sprint.number}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-900 leading-snug">
                      {sprint.name}
                    </h4>

                    {sprint.goal && (
                      <p className="text-[11px] text-gray-500 line-clamp-2">
                        {sprint.goal}
                      </p>
                    )}

                    <div className="pt-1 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {sprint.startDate} - {sprint.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>
                          {sprint.completedItems}/{sprint.totalItems} items ·{" "}
                          {sprint.points} pts
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Floating preview while dragging */}
      {isDragging && dragPos && (
        <div
          className="fixed pointer-events-none z-50 bg-white border border-[#7014D9] rounded-xl p-3.5 shadow-2xl opacity-90 w-64 -translate-x-1/2 -translate-y-1/2 rotate-1"
          style={{ left: dragPos.x, top: dragPos.y }}
        >
          <span className="text-[10px] font-bold text-[#7014D9] uppercase tracking-wider">
            SPRINT #1
          </span>
          <h4 className="text-xs font-bold text-gray-900 mt-1">
            Onboarding Flow
          </h4>
          <p className="text-[10px] text-gray-500 mt-0.5">
            2026-11-16 - 2026-11-18
          </p>
        </div>
      )}
    </div>
  );
}
