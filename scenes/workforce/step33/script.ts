import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP33_DURATION_MS = 12500;

export async function runStep33(tl: Timeline) {
  beginWorkforce(tl, URLS.timeTracker, "time-tracker", "overview", [0.4, 0.2]);
  tl.setVar("wfTimeTab", "jobs");
  tl.setVar("wfTimeRunning", true);
  tl.setVar("wfTimeSeconds", 65);
  tl.setVar("wfTimeProject", "Sprint 1");
  tl.setVar("wfTimeJob", "General work");

  // Timer ticks
  await tl.at(1000);
  tl.setVar("wfTimeSeconds", 66);
  await tl.at(2500);
  tl.setVar("wfTimeSeconds", 67);

  // 1. Click Time Logs tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickLogs);
  await pressOn(tl, "[data-tl=time-tab-logs]", { ms: 600 });
  tl.setVar("wfTimeTab", "logs");
  await tl.wait(250);

  await tl.at(4000);
  tl.setVar("wfTimeSeconds", 68);

  // 2. Ring filters
  await tl.at(3000);
  tl.showCaption(CAPTIONS.filters);
  await hoverOn(tl, "[data-tl=time-log-filters]", { ms: 500 });
  await ring(tl, "[data-tl=time-log-filters]", 2000);

  await tl.at(6000);
  tl.setVar("wfTimeSeconds", 69);

  // 3. Ring table
  await tl.at(5600);
  tl.showCaption(CAPTIONS.table);
  await hoverOn(tl, "[data-tl=time-logs-table]", { ms: 500 });
  await ring(tl, "[data-tl=time-logs-table]", 2200);

  await tl.at(8000);
  tl.setVar("wfTimeSeconds", 70);

  // 4. Ring footer totals
  await tl.at(8200);
  tl.showCaption(CAPTIONS.totals);
  await hoverOn(tl, "[data-tl=time-logs-footer]", { ms: 500 });
  await ring(tl, "[data-tl=time-logs-footer]", 2200);

  await tl.at(10000);
  tl.setVar("wfTimeSeconds", 71);

  // Finish
  await finishWorkforce(tl, 11500, STEP33_DURATION_MS);
}
