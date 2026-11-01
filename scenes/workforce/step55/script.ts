import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP55_DURATION_MS = 14500;

export async function runStep55(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard", "overview", [0.5, 0.42], true);

  // 1. Hover/ring top-bar admin toggle
  await tl.at(500);
  tl.showCaption(CAPTIONS.adminToggle);
  await hoverOn(tl, "[data-tl=top-admin-toggle]", { ms: 600 });
  await ring(tl, "[data-tl=top-admin-toggle]", 1800);

  // 2. Click Appraisal Management in sidebar
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickAppraisalMgmt);
  await pressOn(tl, "[data-tl=nav-appraisal-management]", { ms: 700 });
  tl.setVar("wfPage", "appraisal-management");
  tl.setUrl(URLS.appraisalManagement);
  await tl.wait(300);

  // 3. Ring tabs row and Review Cycles table
  await tl.at(5500);
  tl.showCaption(CAPTIONS.tabsAndCycles);
  await hoverOn(tl, "[data-tl=appraisal-tabs-row]", { ms: 600 });
  await ring(tl, "[data-tl=appraisal-tabs-row]", 1800);

  await tl.at(8000);
  await hoverOn(tl, "[data-tl=cycles-table]", { ms: 600 });
  await ring(tl, "[data-tl=cycles-table-card]", 1800);

  // 4. Hover row 1 actions (Pause, View, History)
  await tl.at(10500);
  tl.showCaption(CAPTIONS.hoverActions);
  await hoverOn(tl, "[data-tl=action-pause-1]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=action-clock-1]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=action-eye-1]", { ms: 500 });
  await ring(tl, "[data-tl=action-eye-1]", 1200);

  // 5. Finish
  await tl.at(13800);
  finishWorkforce(tl);
}
