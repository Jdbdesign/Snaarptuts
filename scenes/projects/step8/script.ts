import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import {
  PROJECTS_URLS,
  INITIAL_TASKS,
  NEW_TASK_DATA,
} from "@/components/projects/projects-data";

export const STEP8_DURATION_MS = 13000;

export async function runStep8(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.tasks, "tasks", [0.45, 0.65], 8);
  // Ensure task 6 is present in tasks list
  tl.setVar("tasksList", [...INITIAL_TASKS, { ...NEW_TASK_DATA, description: "", comments: [] }]);

  // Beat 1: Click the task row
  await tl.at(400);
  tl.showCaption("Click the new task to open its details and track activity.");
  await pressOn(tl, "[data-tl=task-row-t6]", { ms: 600 });
  await tl.wait(300);

  // Beat 2: Add description
  await tl.at(2500);
  tl.showCaption("Add a detailed description outlining deliverable scope.");
  await hoverOn(tl, "[data-tl=task-details-description-box]", { ms: 500 });
  await tl.wait(300);
  await typeIntoVar(
    tl,
    "[data-tl=task-details-description-box]",
    "taskDrawerDescription",
    "Check at least five competitors and note their sign-up steps.",
    { msPerChar: 25 }
  );
  await tl.wait(500);

  // Beat 3: Add comment in activity
  await tl.at(5800);
  tl.showCaption("Post real-time status updates directly in the task activity stream.");
  await pressOn(tl, "[data-tl=task-details-comment-input]", { ms: 500, ring: false });
  await typeIntoVar(
    tl,
    "[data-tl=task-details-comment-input]",
    "commentInputText",
    "Started the research today.",
    { msPerChar: 30 }
  );
  await tl.wait(300);
  await pressOn(tl, "[data-tl=task-details-send-comment-btn]", { ms: 450 });
  await tl.wait(500);

  // Beat 4: Close drawer
  await tl.at(9200);
  tl.showCaption("Click the close icon to return to the Work Items table.");
  await pressOn(tl, "[data-tl=task-details-close-btn]", { ms: 550 });
  await tl.wait(400);

  // Beat 5: Focus row
  await tl.at(10800);
  tl.showCaption("The task is saved with updated descriptions and activity history.");
  await hoverOn(tl, "[data-tl=task-row-t6]", { ms: 500 });
  await tl.wait(1000);

  // Finish
  await tl.at(12200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
