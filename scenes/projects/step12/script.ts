import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import {
  PROJECTS_URLS,
  type SprintItem,
} from "@/components/projects/projects-data";

export const STEP12_DURATION_MS = 18500;

export async function runStep12(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.sprints, "sprints", [0.45, 0.25], 12);

  // Beat 1: Switch to Board view
  await tl.at(400);
  tl.showCaption("Click Board to switch from list view to the kanban board.");
  await pressOn(tl, "[data-tl=sprints-view-mode-board]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Drag card from Planning to Completed
  await tl.at(2400);
  tl.showCaption("Drag the sprint card to Completed as deliverables wrap up.");
  await hoverOn(tl, "[data-tl=sprint-card-sprint-1]", { ms: 500 });
  await tl.wait(200);

  // Initiate drag
  tl.setVar("isDraggingSprint", true);
  tl.setVar("draggedSprintId", "sprint-1");

  await tl.moveCursorTo("[data-tl=sprint-col-completed]", {
    ms: 900,
    onMove: (cx, cy) => {
      tl.setVar("dragCursorPos", { x: cx, y: cy });
    },
  });

  // Drop
  const sprints = tl.getVar<SprintItem[]>("sprintsList", []);
  const updated = sprints.map((s) =>
    s.id === "sprint-1" ? { ...s, status: "Completed" } : s
  );
  tl.setVar("sprintsList", updated);
  tl.setVar("isDraggingSprint", false);
  tl.setVar("dragCursorPos", null);
  tl.setVar("projectsToast", {
    message: "Sprint status updated",
    type: "success",
    id: Date.now(),
  });
  await tl.wait(800);

  // Beat 3: Switch back to List view
  await tl.at(5600);
  tl.showCaption("Click List to view the updated status in tabular form.");
  await pressOn(tl, "[data-tl=sprints-view-mode-list]", { ms: 550 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=sprint-status-sprint-1]", { ms: 450 });
  await tl.wait(600);

  // Beat 4: Open Filter popover
  await tl.at(8000);
  tl.showCaption("Click Filter to customize visible sprint statuses and projects.");
  await pressOn(tl, "[data-tl=sprints-filter-btn]", { ms: 500 });
  await tl.wait(400);

  // Beat 5: Untick Completed and Apply
  await tl.at(9800);
  tl.showCaption("Untick Completed to filter out finalized iterations.");
  await pressOn(tl, "[data-tl=filter-status-completed]", { ms: 450 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=sprint-filter-apply-btn]", { ms: 450 });
  await tl.wait(600);

  // Beat 6: Observe empty state
  await tl.at(12200);
  tl.showCaption("The list dynamically updates to show matching sprints.");
  await hoverOn(tl, "[data-tl=sprints-empty-state]", { ms: 500 });
  await tl.wait(800);

  // Beat 7: Open Filter, Clear, and Apply
  await tl.at(14200);
  tl.showCaption("Re-open filters and click Clear to restore all statuses.");
  await pressOn(tl, "[data-tl=sprints-filter-btn]", { ms: 450 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=sprint-filter-clear-btn]", { ms: 450 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=sprint-filter-apply-btn]", { ms: 450 });
  await tl.wait(800);

  // Finish
  await tl.at(17200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
