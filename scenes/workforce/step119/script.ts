import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP119_DURATION_MS = 9500;

export async function runStep119(tl: Timeline) {
  beginWorkforce(tl, URLS.reports, "reports", "overview", [0.35, 0.35], true);
  tl.setVar("wfReportsSub", "hub");
  tl.setVar("wfReportLoading", false);

  // 1. Click Attendance Report card
  await tl.at(500);
  tl.showCaption(CAPTIONS.openAttendanceReport);
  await pressOn(tl, "[data-tl=card-report-attendance]", { ms: 600 });
  tl.setVar("wfReportsSub", "attendance");
  tl.setVar("wfPage", "reports-attendance");
  tl.setUrl(URLS.reportsAttendance);
  tl.setVar("wfReportLoading", true);
  await tl.wait(600);
  tl.setVar("wfReportLoading", false);
  await tl.wait(400);

  // 2. Hover filter button
  await tl.at(4800);
  tl.showCaption(CAPTIONS.filterAttendance);
  await hoverOn(tl, "[data-tl=btn-apply-att-filter]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(8800);
  await finishWorkforce(tl);
}
