import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP34_DURATION_MS = 14500;

export async function runStep34(tl: Timeline) {
  beginWorkforce(tl, URLS.timeTracker, "time-tracker", "overview", [0.4, 0.2]);
  tl.setVar("wfTimeTab", "logs");
  tl.setVar("wfTimeRunning", true);
  tl.setVar("wfTimeSeconds", 72);
  tl.setVar("wfTimeProject", "Sprint 1");
  tl.setVar("wfTimeJob", "General work");

  // Timer ticks
  await tl.at(1000);
  tl.setVar("wfTimeSeconds", 73);
  await tl.at(2500);
  tl.setVar("wfTimeSeconds", 74);

  // 1. Click Timesheets tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTimesheets);
  await pressOn(tl, "[data-tl=time-tab-timesheets]", { ms: 600 });
  tl.setVar("wfTimeTab", "timesheets");
  await tl.wait(250);

  await tl.at(4000);
  tl.setVar("wfTimeSeconds", 75);

  // 2. Ring date range
  await tl.at(3000);
  tl.showCaption(CAPTIONS.dateRange);
  await hoverOn(tl, "[data-tl=timesheets-range]", { ms: 500 });
  await ring(tl, "[data-tl=timesheets-range]", 1800);

  await tl.at(6000);
  tl.setVar("wfTimeSeconds", 76);

  // 3. Hover Submit timesheet button
  await tl.at(5400);
  tl.showCaption(CAPTIONS.submitBtn);
  await hoverOn(tl, "[data-tl=timesheets-submit-btn]", { ms: 450 });
  await ring(tl, "[data-tl=timesheets-submit-btn]", 1800);

  await tl.at(8000);
  tl.setVar("wfTimeSeconds", 77);

  // 4. Ring explanation
  await tl.at(7800);
  tl.showCaption(CAPTIONS.explanation);
  await hoverOn(tl, "[data-tl=timesheets-expl]", { ms: 450 });
  await ring(tl, "[data-tl=timesheets-expl]", 2000);

  await tl.at(10500);
  tl.setVar("wfTimeSeconds", 78);

  // 5. Ring empty card
  await tl.at(10400);
  tl.showCaption(CAPTIONS.emptyCard);
  await hoverOn(tl, "[data-tl=timesheets-empty-card]", { ms: 500 });
  await ring(tl, "[data-tl=timesheets-empty-card]", 2200);

  await tl.at(12500);
  tl.setVar("wfTimeSeconds", 79);

  // Finish
  await finishWorkforce(tl, 13500, STEP34_DURATION_MS);
}
