import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import {
  PROJECTS_URLS,
  type TaskItem,
} from "@/components/projects/projects-data";

export const STEP15_DURATION_MS = 21000;

export async function runStep15(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.tasks, "tasks", [0.45, 0.25], 15);

  // Beat 1: Switch to Board subtab
  await tl.at(400);
  tl.showCaption("Click Board to visualize tasks organized by execution stage.");
  await pressOn(tl, "[data-tl=tasks-subtab-board]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Drag "Create your first project" to In Progress
  await tl.at(2400);
  tl.showCaption("Drag tasks to In Progress as active work begins.");
  await hoverOn(tl, "[data-tl=task-card-t1]", { ms: 500 });
  await tl.wait(200);

  tl.setVar("isDraggingTask", true);
  tl.setVar("draggedTaskId", "t1");

  await tl.moveCursorTo("[data-tl=task-col-inprogress]", {
    ms: 800,
    onMove: (cx, cy) => {
      tl.setVar("dragCursorPos", { x: cx, y: cy });
    },
  });

  // Drop t1
  let tasks = tl.getVar<TaskItem[]>("tasksList", []);
  tasks = tasks.map((t) =>
    t.id === "t1" ? { ...t, status: "In Progress" as const } : t
  );
  tl.setVar("tasksList", tasks);
  tl.setVar("isDraggingTask", false);
  tl.setVar("draggedTaskId", null);
  tl.setVar("dragCursorPos", null);
  tl.setVar("projectsToast", {
    message: "Task moved to In Progress",
    type: "success",
    id: Date.now(),
  });
  await tl.wait(700);

  // Beat 3: Drag "Research competitor onboarding flows" to In Progress
  await tl.at(5600);
  tl.showCaption("Move high-priority research into In Progress.");
  await hoverOn(tl, "[data-tl=task-card-t6]", { ms: 450 });
  await tl.wait(200);

  tl.setVar("isDraggingTask", true);
  tl.setVar("draggedTaskId", "t6");

  await tl.moveCursorTo("[data-tl=task-col-inprogress]", {
    ms: 800,
    onMove: (cx, cy) => {
      tl.setVar("dragCursorPos", { x: cx, y: cy });
    },
  });

  // Drop t6
  tasks = tl.getVar<TaskItem[]>("tasksList", []);
  tasks = tasks.map((t) =>
    t.id === "t6" ? { ...t, status: "In Progress" as const } : t
  );
  tl.setVar("tasksList", tasks);
  tl.setVar("isDraggingTask", false);
  tl.setVar("draggedTaskId", null);
  tl.setVar("dragCursorPos", null);
  tl.setVar("projectsToast", {
    message: "Task moved to In Progress",
    type: "success",
    id: Date.now() + 1,
  });
  await tl.wait(800);

  // Beat 4: Switch to Gantt view
  await tl.at(9000);
  tl.showCaption("Click Gantt to inspect task dependencies and durations across days.");
  await pressOn(tl, "[data-tl=tasks-subtab-gantt]", { ms: 550 });
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=gantt-bar-day-19]", { ms: 500 });
  await tl.wait(800);

  // Beat 5: Switch to Calendar view
  await tl.at(12200);
  tl.showCaption("Click Calendar to view deadline milestones on a monthly calendar grid.");
  await pressOn(tl, "[data-tl=tasks-subtab-calendar]", { ms: 550 });
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=task-calendar-chip]", { ms: 500 });
  await tl.wait(800);

  // Beat 6: Project Selector Dropdown
  await tl.at(15200);
  tl.showCaption("Use the project selector to switch between active client projects.");
  await pressOn(tl, "[data-tl=tasks-project-dropdown]", { ms: 500 });
  await tl.wait(400);
  await pressOn(
    tl,
    "[data-tl=tasks-project-option-explore-snaarp-projects-]",
    { ms: 450 }
  );
  await tl.wait(400);

  // Beat 7: Return to List View
  await tl.at(17800);
  tl.showCaption("Click List View to return to the tabular task backlog.");
  await pressOn(tl, "[data-tl=tasks-subtab-list]", { ms: 550 });
  await tl.wait(800);

  // Finish
  await tl.at(20000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
