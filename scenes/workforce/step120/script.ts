import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP120_DURATION_MS = 8000;

export async function runStep120(tl: Timeline) {
  beginWorkforce(tl, URLS.reports, "reports", "overview", [0.45, 0.28], true);
  tl.setVar("wfReportsSub", "hub");

  // 1. Click Leave Report card
  await tl.at(500);
  tl.showCaption(CAPTIONS.openLeaveReport);
  await pressOn(tl, "[data-tl=card-report-leave]", { ms: 600 });
  tl.setVar("wfReportsSub", "leave");
  tl.setVar("wfPage", "reports-leave");
  tl.setUrl(URLS.reportsLeave);
  await tl.wait(400);

  // 2. Hover table
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewLeaveBalances);
  await hoverOn(tl, "[data-tl=table-leave-report]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
