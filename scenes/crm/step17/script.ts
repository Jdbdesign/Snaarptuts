import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";

export const STEP17_DURATION_MS = 21000;

export async function runStep17(tl: Timeline) {
  beginCrm(tl, "crm-calendar", {
    activeNav: "calendar",
    activitiesOpen: true,
    selectedCalendarDay: null,
    calTaskDone: false,
  });

  // Beat 1: Calendar Grid overview
  await tl.at(400);
  tl.showCaption("Navigate to Calendar under Activities to visualize your scheduled meetings, tasks, and deadlines.");
  await hoverOn(tl, "[data-tl=crm-cal-grid]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Select November 12
  await tl.at(3800);
  tl.showCaption("Select November 12 on the calendar to view scheduled activities for that day.");
  await pressOn(tl, "[data-tl=crm-cal-day-12]", { ms: 600 });
  tl.setVar("crm:selectedCalendarDay", 12);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-cal-event-ev-1]", { ms: 600 });
  await tl.wait(1200);

  // Beat 3: Select November 19
  await tl.at(8000);
  tl.showCaption("Select November 19 to view today's scheduled client outreach task.");
  await pressOn(tl, "[data-tl=crm-cal-day-19]", { ms: 600 });
  tl.setVar("crm:selectedCalendarDay", 19);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-cal-event-ev-2]", { ms: 600 });
  await tl.wait(1200);

  // Beat 4: Focus complete checkbox
  await tl.at(12500);
  tl.showCaption("Inspect the high-priority task scheduled for today before marking it done.");
  await hoverOn(tl, "[data-tl=crm-cal-complete-task]", { ms: 600 });
  await tl.wait(1000);

  // Beat 5: Mark task done
  await tl.at(15500);
  tl.showCaption("Click the checkbox to complete the task directly from the Calendar view.");
  await pressOn(tl, "[data-tl=crm-cal-complete-task]", { ms: 600 });
  tl.setVar("crm:calTaskDone", true);
  pushCrmToast(tl, "Task marked as done");
  await tl.wait(1600);

  await finishCrm(tl);
}
