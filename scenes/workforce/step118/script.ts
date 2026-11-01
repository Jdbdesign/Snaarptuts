import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP118_DURATION_MS = 8000;

export async function runStep118(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingAssignments, "training-assignments", "overview", [0.45, 0.28], true);

  // 1. Click Reports in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickReports);
  await pressOn(tl, "[data-tl=nav-reports]", { ms: 600 });
  tl.setVar("wfPage", "reports");
  tl.setVar("wfReportsSub", "hub");
  tl.setUrl(URLS.reports);
  await tl.wait(400);

  // 2. Hover Attendance card
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewReportsHub);
  await hoverOn(tl, "[data-tl=card-report-attendance]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
