import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP121_DURATION_MS = 8000;

export async function runStep121(tl: Timeline) {
  beginWorkforce(tl, URLS.reports, "reports", "overview", [0.45, 0.28], true);
  tl.setVar("wfReportsSub", "hub");

  // 1. Click Headcount Report card
  await tl.at(500);
  tl.showCaption(CAPTIONS.openHeadcountReport);
  await pressOn(tl, "[data-tl=card-report-headcount]", { ms: 600 });
  tl.setVar("wfReportsSub", "headcount");
  tl.setVar("wfPage", "reports-headcount");
  tl.setUrl(URLS.reportsHeadcount);
  await tl.wait(400);

  // 2. Hover headcount total
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewHeadcount);
  await hoverOn(tl, "[data-tl=card-total-headcount]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
