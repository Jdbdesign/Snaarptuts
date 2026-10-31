import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP31_DURATION_MS = 14500;

export async function runStep31(tl: Timeline) {
  beginWorkforce(tl, URLS.leave, "leave", "overview", [0.08, 0.45]);
  tl.setVar("wfTimeProject", "No project");
  tl.setVar("wfTimeJob", "General work");
  tl.setVar("wfTimeRunning", false);
  tl.setVar("wfTimeSeconds", 0);

  // 1. Click Time Tracker in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTimeTracker);
  await pressOn(tl, "[data-tl=nav-time-tracker]", { ms: 600 });
  tl.setVar("wfPage", "time-tracker");
  tl.setUrl(URLS.timeTracker);
  tl.setVar("wfTimeProjectsLoading", true);
  await tl.wait(800);
  tl.setVar("wfTimeProjectsLoading", false);
  await tl.wait(200);

  // 2. Click project select
  await tl.at(3000);
  tl.showCaption(CAPTIONS.pickProject);
  await pressOn(tl, "[data-tl=time-project-select]", { ms: 500 });
  tl.setVar("wfTimeProjectDropdownOpen", true);
  await tl.wait(200);

  // 3. Choose Sprint 1
  await tl.at(4800);
  tl.showCaption(CAPTIONS.chooseSprint1);
  await pressOn(tl, "[data-tl=time-project-opt-sprint1]", { ms: 450 });
  tl.setVar("wfTimeProject", "Sprint 1");
  tl.setVar("wfTimeProjectDropdownOpen", false);
  await tl.wait(200);

  // 4. Click job select
  await tl.at(6800);
  tl.showCaption(CAPTIONS.pickJob);
  await pressOn(tl, "[data-tl=time-job-select]", { ms: 500 });
  tl.setVar("wfTimeJobDropdownOpen", true);
  await tl.wait(200);

  // 5. Hover Sprint planning, then choose General work
  await tl.at(8200);
  await hoverOn(tl, "[data-tl=time-job-opt-planning]", { ms: 350 });
  await hoverOn(tl, "[data-tl=time-job-opt-general]", { ms: 350 });
  await pressOn(tl, "[data-tl=time-job-opt-general]", { ms: 400 });
  tl.setVar("wfTimeJob", "General work");
  tl.setVar("wfTimeJobDropdownOpen", false);
  await tl.wait(200);

  // 6. Click Start
  await tl.at(10200);
  tl.showCaption(CAPTIONS.startTimer);
  await pressOn(tl, "[data-tl=time-start-btn]", { ms: 500 });
  tl.setVar("wfTimeRunning", true);
  tl.setVar("wfTimeSeconds", 1);
  await tl.wait(200);

  // 7. Timer ticks
  await tl.at(11200);
  tl.setVar("wfTimeSeconds", 2);
  await tl.at(12200);
  tl.showCaption(CAPTIONS.timerRunning);
  tl.setVar("wfTimeSeconds", 3);
  await ring(tl, "[data-tl=time-timer]", 1200);

  // Finish
  await finishWorkforce(tl, 13500, STEP31_DURATION_MS);
}
