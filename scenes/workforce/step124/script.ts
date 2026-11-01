import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP124_DURATION_MS = 8500;

export async function runStep124(tl: Timeline) {
  beginWorkforce(tl, URLS.adminPanel, "admin-panel-dashboard", "overview", [0.82, 0.12], true);

  // 1. Click Back to Snaarp Workforce
  await tl.at(500);
  tl.showCaption(CAPTIONS.backToWorkforce);
  await pressOn(tl, "[data-tl=btn-back-to-workforce]", { ms: 600 });
  tl.setVar("wfPage", "reports");
  tl.setVar("wfReportsSub", "hub");
  tl.setUrl(URLS.reports);
  await tl.wait(400);

  // 2. Scroll sidebar up to show MANAGE
  await tl.at(3600);
  tl.scrollTo(0, 400);
  await tl.wait(400);

  // 3. Hover sidebar MANAGE item
  await tl.at(4800);
  tl.showCaption(CAPTIONS.allSet);
  await hoverOn(tl, "[data-tl=nav-appraisal-management]", { ms: 600 });
  await tl.wait(800);

  // Finish tutorial!
  await tl.at(7800);
  await finishWorkforce(tl);
}
