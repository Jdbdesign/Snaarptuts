import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP35_DURATION_MS = 13500;

export async function runStep35(tl: Timeline) {
  beginWorkforce(tl, URLS.timeTracker, "time-tracker", "overview", [0.4, 0.2]);
  tl.setVar("wfTimeTab", "timesheets");
  tl.setVar("wfTimeScheduleMode", "week");
  tl.setVar("wfTimeRunning", true);
  tl.setVar("wfTimeSeconds", 80);
  tl.setVar("wfTimeProject", "Sprint 1");
  tl.setVar("wfTimeJob", "General work");

  // Timer ticks
  await tl.at(1000);
  tl.setVar("wfTimeSeconds", 81);
  await tl.at(2500);
  tl.setVar("wfTimeSeconds", 82);

  // 1. Click Job Schedule tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSchedule);
  await pressOn(tl, "[data-tl=time-tab-schedule]", { ms: 600 });
  tl.setVar("wfTimeTab", "schedule");
  await tl.wait(250);

  await tl.at(4000);
  tl.setVar("wfTimeSeconds", 83);

  // 2. Ring week grid & today
  await tl.at(3000);
  tl.showCaption(CAPTIONS.weekGrid);
  await hoverOn(tl, "[data-tl=schedule-today-cell]", { ms: 500 });
  await ring(tl, "[data-tl=schedule-today-cell]", 2000);

  await tl.at(6000);
  tl.setVar("wfTimeSeconds", 84);

  // 3. Click Month toggle
  await tl.at(5800);
  tl.showCaption(CAPTIONS.clickMonth);
  await pressOn(tl, "[data-tl=schedule-mode-month]", { ms: 500 });
  tl.setVar("wfTimeScheduleMode", "month");
  await tl.wait(250);

  await tl.at(8000);
  tl.setVar("wfTimeSeconds", 85);

  // 4. Ring today in month grid
  await tl.at(8400);
  tl.showCaption(CAPTIONS.today);
  await hoverOn(tl, "[data-tl=schedule-today-cell]", { ms: 500 });
  await ring(tl, "[data-tl=schedule-today-cell]", 2400);

  await tl.at(10500);
  tl.setVar("wfTimeSeconds", 86);

  // Finish
  await finishWorkforce(tl, 12500, STEP35_DURATION_MS);
}
