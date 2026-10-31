import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP32_DURATION_MS = 12500;

export async function runStep32(tl: Timeline) {
  beginWorkforce(tl, URLS.timeTracker, "time-tracker", "overview", [0.4, 0.2]);
  tl.setVar("wfTimeTab", "projects");
  tl.setVar("wfTimeRunning", true);
  tl.setVar("wfTimeSeconds", 60);
  tl.setVar("wfTimeProject", "Sprint 1");
  tl.setVar("wfTimeJob", "General work");

  // Timer ticks
  await tl.at(1000);
  tl.setVar("wfTimeSeconds", 61);
  await tl.at(2500);
  tl.setVar("wfTimeSeconds", 62);

  // 1. Click Jobs tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickJobs);
  await pressOn(tl, "[data-tl=time-tab-jobs]", { ms: 600 });
  tl.setVar("wfTimeTab", "jobs");
  await tl.wait(250);

  await tl.at(4000);
  tl.setVar("wfTimeSeconds", 63);

  // 2. Ring the row
  await tl.at(3000);
  tl.showCaption(CAPTIONS.jobRow);
  await hoverOn(tl, "[data-tl=time-job-row]", { ms: 500 });
  await ring(tl, "[data-tl=time-job-row]", 2200);

  await tl.at(6000);
  tl.setVar("wfTimeSeconds", 64);

  // 3. Ring status pill
  await tl.at(5800);
  tl.showCaption(CAPTIONS.jobStatus);
  await hoverOn(tl, "[data-tl=time-job-status]", { ms: 450 });
  await ring(tl, "[data-tl=time-job-status]", 1800);

  await tl.at(8000);
  tl.setVar("wfTimeSeconds", 65);

  // 4. Ring overdue date
  await tl.at(8200);
  tl.showCaption(CAPTIONS.overdue);
  await hoverOn(tl, "[data-tl=time-job-due]", { ms: 500 });
  await ring(tl, "[data-tl=time-job-due]", 2200);

  await tl.at(10000);
  tl.setVar("wfTimeSeconds", 66);

  // Finish
  await finishWorkforce(tl, 11500, STEP32_DURATION_MS);
}
