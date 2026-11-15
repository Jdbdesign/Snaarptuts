import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import {
  PROJECTS_URLS,
  INITIAL_TASKS,
  NEW_TASK_DATA,
} from "@/components/projects/projects-data";

export const STEP9_DURATION_MS = 13500;

export async function runStep9(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.tasks, "tasks", [0.85, 0.65], 9);
  // Initial state has 6 tasks
  tl.setVar("tasksList", [...INITIAL_TASKS, NEW_TASK_DATA]);

  // Beat 1: Open menu on row t6
  await tl.at(400);
  tl.showCaption("Click the actions menu on Research competitor onboarding flows.");
  await pressOn(tl, "[data-tl=task-menu-btn-t6]", { ms: 600 });
  await tl.wait(300);

  // Beat 2: Click Archive
  await tl.at(2400);
  tl.showCaption("Click Archive to remove the task from active tracking.");
  await hoverOn(tl, "[data-tl=task-menu-archive-t6]", { ms: 450 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=task-menu-archive-t6]", { ms: 450 });
  await tl.wait(500);

  // Beat 3: Open menu on row t5 (Explore reports)
  await tl.at(4800);
  tl.showCaption("Click the actions menu on Explore reports.");
  await pressOn(tl, "[data-tl=task-menu-btn-t5]", { ms: 600 });
  await tl.wait(300);

  // Beat 4: Click Delete in menu
  await tl.at(6800);
  tl.showCaption("Select Delete from the menu options.");
  await hoverOn(tl, "[data-tl=task-menu-delete-t5]", { ms: 450 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=task-menu-delete-t5]", { ms: 450 });
  await tl.wait(400);

  // Beat 5: Confirm Delete in modal
  await tl.at(9000);
  tl.showCaption("Confirm deletion in the confirmation modal.");
  await hoverOn(tl, "[data-tl=delete-task-modal-body]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=delete-task-modal-confirm-btn]", { ms: 550 });
  await tl.wait(500);

  // Beat 6: Final check
  await tl.at(11400);
  tl.showCaption("The task is permanently removed and the counts automatically update.");
  await hoverOn(tl, "[data-tl=tasks-counts-subtitle]", { ms: 500 });
  await tl.wait(1000);

  // Finish
  await tl.at(12800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
