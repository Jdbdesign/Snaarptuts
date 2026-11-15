import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP14_DURATION_MS = 21000;

export async function runStep14(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.sprints, "sprints", [0.45, 0.25], 14);

  // Beat 1: Click Time Tracking tab
  await tl.at(400);
  tl.showCaption("Click Time Tracking to review timesheets and record hours.");
  await pressOn(tl, "[data-tl=sprints-tab-time]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Inspect Viewing select
  await tl.at(2400);
  tl.showCaption("Filter timesheets by team member to audit daily allocations.");
  await pressOn(tl, "[data-tl=time-tracking-viewing-select]", { ms: 500 });
  await tl.wait(350);
  await pressOn(tl, "[data-tl=viewing-user-option-jane]", { ms: 450 });
  await tl.wait(400);

  // Beat 3: Click Log Time button
  await tl.at(4800);
  tl.showCaption("Click Log Time to manually submit logged working minutes.");
  await pressOn(tl, "[data-tl=time-tracking-log-time-btn]", { ms: 550 });
  await tl.wait(400);

  // Beat 4: Select Task
  await tl.at(6800);
  tl.showCaption("Select the work item to associate this time entry with.");
  await pressOn(tl, "[data-tl=log-time-task-select]", { ms: 500 });
  await tl.wait(350);
  await pressOn(
    tl,
    "[data-tl=log-time-task-option-set-up-task-statuses]",
    { ms: 450 }
  );
  await tl.wait(400);

  // Beat 5: Enter Duration: 40 minutes
  await tl.at(9200);
  tl.showCaption("Enter the elapsed duration in minutes.");
  await pressOn(tl, "[data-tl=log-time-duration-input]", { ms: 450 });
  await typeIntoVar(
    tl,
    "[data-tl=log-time-duration-input]",
    "logTimeDuration",
    "40",
    { msPerChar: 60 }
  );
  await tl.wait(300);

  // Beat 6: Select Date
  await tl.at(11400);
  tl.showCaption("Select the date of the activity.");
  await pressOn(tl, "[data-tl=log-time-date-input]", { ms: 450 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=log-time-day-15]", { ms: 450 });
  await tl.wait(400);

  // Beat 7: Enter Description
  await tl.at(13600);
  tl.showCaption("Add a description summarizing the completed work.");
  await pressOn(tl, "[data-tl=log-time-description-input]", { ms: 450 });
  await typeIntoVar(
    tl,
    "[data-tl=log-time-description-input]",
    "logTimeDescription",
    "Set up the status workflow",
    { msPerChar: 35 }
  );
  await tl.wait(400);

  // Beat 8: Submit Time Entry
  await tl.at(16400);
  tl.showCaption("Click Add Time Entry to record the log.");
  await pressOn(tl, "[data-tl=log-time-submit-btn]", { ms: 550 });
  await tl.wait(600);

  // Beat 9: Inspect updated timesheet
  await tl.at(18400);
  tl.showCaption("The weekly timesheet and stat totals reflect the logged 40 minutes.");
  await hoverOn(tl, "[data-tl=timesheet-cell-sun]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=stat-time-today]", { ms: 450 });
  await tl.wait(700);

  // Finish
  await tl.at(20200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
