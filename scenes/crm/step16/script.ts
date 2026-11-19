import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";
import { INITIAL_TASKS, NEW_TASK_TEMPLATE, type CrmTaskItem } from "@/components/crm/crm-data";

export const STEP16_DURATION_MS = 23000;

export async function runStep16(tl: Timeline) {
  beginCrm(tl, "crm-task-details", {
    activeNav: "tasks",
    activitiesOpen: true,
    tasksViewMode: "board",
    tasks: [NEW_TASK_TEMPLATE, ...INITIAL_TASKS],
    selectedTaskId: null,
    isTaskReminderOpen: false,
  });

  // Beat 1: Click client call task in To Do column
  await tl.at(400);
  tl.showCaption("Click on the newly created client call task in the To Do column to open its detailed panel.");
  await pressOn(tl, "[data-tl=crm-task-card-task-client-call]", { ms: 600 });
  tl.setVar("crm:selectedTaskId", "task-client-call");
  await tl.wait(1000);

  // Beat 2: High priority reminder triggers
  await tl.at(3500);
  tl.showCaption("Because this task is marked High priority and due today, Snaarp automatically alerts you with an instant reminder.");
  tl.setVar("crm:isTaskReminderOpen", true);
  await hoverOn(tl, "[data-tl=crm-reminder-modal]", { ms: 600 });
  await tl.wait(1200);

  // Beat 3: Snooze reminder for 1 hour
  await tl.at(7500);
  tl.showCaption("Snooze the reminder for 1 hour to handle ongoing calls before reaching out to the client.");
  await pressOn(tl, "[data-tl=crm-reminder-snooze-1-hour]", { ms: 600 });
  tl.setVar("crm:isTaskReminderOpen", false);
  pushCrmToast(tl, "Reminder snoozed for 1 hour");
  await tl.wait(1200);

  // Beat 4: Inspect slide-over details panel
  await tl.at(11000);
  tl.showCaption("Inspect task properties in the slide-over panel, including status, priority, and reminder preferences.");
  await hoverOn(tl, "[data-tl=crm-task-details-panel]", { ms: 700 });
  await tl.wait(1200);

  // Beat 5: Update status to In Progress
  await tl.at(14500);
  tl.showCaption("Change the task status to In Progress to indicate active outreach work.");
  await pressOn(tl, "[data-tl=crm-status-in-progress]", { ms: 600 });
  const currentTasks = tl.getVar<CrmTaskItem[]>("crm:tasks", [NEW_TASK_TEMPLATE, ...INITIAL_TASKS]);
  const updatedTasks = currentTasks.map((t) =>
    t.id === "task-client-call" ? { ...t, status: "in_progress" as const } : t
  );
  tl.setVar("crm:tasks", updatedTasks);
  await tl.wait(1200);

  // Beat 6: Close slide-over panel
  await tl.at(18000);
  tl.showCaption("Close the details panel and observe the task now organized under the In Progress column.");
  await pressOn(tl, "[data-tl=crm-task-details-close]", { ms: 600 });
  tl.setVar("crm:selectedTaskId", null);
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=crm-col-in-progress]", { ms: 800 });

  await finishCrm(tl);
}
