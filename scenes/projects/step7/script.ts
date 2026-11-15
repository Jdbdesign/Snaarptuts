import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP7_DURATION_MS = 14500;

export async function runStep7(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.tasks, "tasks", [0.85, 0.12], 7);

  // Beat 1: Click Add Task
  await tl.at(400);
  tl.showCaption("Click Add Task to create a new work item.");
  await pressOn(tl, "[data-tl=tasks-add-task-btn]", { ms: 600 });
  await tl.wait(300);

  // Beat 2: Type task title
  await tl.at(2500);
  tl.showCaption("Enter the task title.");
  await pressOn(tl, "[data-tl=add-task-title-input]", { ms: 500, ring: false });
  await typeIntoVar(
    tl,
    "[data-tl=add-task-title-input]",
    "newTaskTitle",
    "Research competitor onboarding flows",
    { msPerChar: 30 }
  );
  await tl.wait(400);

  // Beat 3: Set details (assignees, date, priority)
  await tl.at(5200);
  tl.showCaption("Assign team members, set the due date, and select High priority.");
  tl.setVar("newTaskAssignees", ["jane@example.com", "sam.taylor@example.com"]);
  tl.setVar("newTaskDueDate", "2026-11-19");
  tl.setVar("newTaskPriority", "High");
  await hoverOn(tl, "[data-tl=add-task-assignee-select]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=add-task-priority-select]", { ms: 450 });
  await tl.wait(600);

  // Beat 4: Add subtask
  await tl.at(7600);
  tl.showCaption("Add actionable subtasks to break down the task.");
  await pressOn(tl, "[data-tl=add-task-subtask-input]", { ms: 500, ring: false });
  await typeIntoVar(
    tl,
    "[data-tl=add-task-subtask-input]",
    "subtaskInputText",
    "Compile findings into a spreadsheet",
    { msPerChar: 25 }
  );
  await tl.wait(300);
  await pressOn(tl, "[data-tl=add-task-subtask-add-btn]", { ms: 500 });
  await tl.wait(400);

  // Beat 5: Click Create Task
  await tl.at(10400);
  tl.showCaption("Click Create Task to add it to the project list.");
  await pressOn(tl, "[data-tl=add-task-submit-btn]", { ms: 600 });
  await tl.wait(400);

  // Beat 6: Confirm created row
  await tl.at(12200);
  tl.showCaption("The task is live in the table with assignees and due date.");
  await hoverOn(tl, "[data-tl=task-row-t6]", { ms: 600 });
  await tl.wait(1200);

  // Finish
  await tl.at(13800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
