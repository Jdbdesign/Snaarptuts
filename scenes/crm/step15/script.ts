import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";
import { INITIAL_TASKS, NEW_TASK_TEMPLATE } from "@/components/crm/crm-data";

export const STEP15_DURATION_MS = 25000;

export async function runStep15(tl: Timeline) {
  beginCrm(tl, "crm-tasks", {
    activeNav: "tasks",
    activitiesOpen: true,
    tasksViewMode: "board",
    isAddTaskInlineOpen: false,
    tasks: INITIAL_TASKS,
  });

  // Beat 1: Tasks Board overview
  await tl.at(400);
  tl.showCaption("Navigate to Tasks under Activities to view, track, and organize follow-up actions across your team.");
  await hoverOn(tl, "[data-tl=crm-col-todo]", { ms: 600 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-col-in-progress]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Switch to List view
  await tl.at(3800);
  tl.showCaption("Switch to List view to review all team tasks in a tabular format showing priority and due dates.");
  await pressOn(tl, "[data-tl=crm-tasks-view-list]", { ms: 600 });
  tl.setVar("crm:tasksViewMode", "list");
  await tl.wait(1400);

  // Beat 3: Return to Board view
  await tl.at(7200);
  tl.showCaption("Return to Board view for visual task management organized by progress stages.");
  await pressOn(tl, "[data-tl=crm-tasks-view-board]", { ms: 600 });
  tl.setVar("crm:tasksViewMode", "board");
  await tl.wait(1000);

  // Beat 4: Click Add Task
  await tl.at(10200);
  tl.showCaption("Click + Add Task to open the inline task creation form.");
  await pressOn(tl, "[data-tl=crm-btn-add-task]", { ms: 600 });
  tl.setVar("crm:isAddTaskInlineOpen", true);
  await tl.wait(800);

  // Beat 5: Enter Title
  await tl.at(12800);
  tl.showCaption("Enter a task title to schedule an urgent client outreach call.");
  await pressOn(tl, "[data-tl=crm-inline-task-title]", { ms: 500 });
  await tl.typeText("crm_new_task_title", "Call The Client before the end of work", { msPerChar: 35 });
  await tl.wait(600);

  // Beat 6: Select Priority High
  await tl.at(16000);
  tl.showCaption("Set priority to High to ensure immediate team visibility.");
  await pressOn(tl, "[data-tl=crm-inline-task-priority]", { ms: 500 });
  tl.setVar("field:crm_new_task_priority", "High");
  await tl.wait(600);

  // Beat 7: Set Due Date
  await tl.at(18200);
  tl.showCaption("Set the due date for today, 19 November 2026.");
  await pressOn(tl, "[data-tl=crm-inline-task-date]", { ms: 500 });
  tl.setVar("field:crm_new_task_date", "11/19/2026");
  await tl.wait(600);

  // Beat 8: Submit Task
  await tl.at(20400);
  tl.showCaption("Click Add Task to schedule the action into the To Do column.");
  await pressOn(tl, "[data-tl=crm-submit-add-task]", { ms: 600 });
  tl.setVar("crm:tasks", [NEW_TASK_TEMPLATE, ...INITIAL_TASKS]);
  tl.setVar("crm:isAddTaskInlineOpen", false);
  pushCrmToast(tl, "Task created");
  await tl.wait(1400);
  await hoverOn(tl, "[data-tl=crm-task-card-task-client-call]", { ms: 600 });

  await finishCrm(tl);
}
