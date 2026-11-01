import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP107_DURATION_MS = 8000;

export async function runStep107(tl: Timeline) {
  beginWorkforce(tl, URLS.shifts, "shifts", "overview", [0.45, 0.28], true);
  tl.setVar("wfHolidayCalendarView", false);

  // 1. Click Holidays in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickHolidays);
  await pressOn(tl, "[data-tl=nav-holidays-manage]", { ms: 600 });
  tl.setVar("wfPage", "admin-holidays");
  tl.setUrl(URLS.holidays);
  await tl.wait(400);

  // 2. Hover Add Holiday
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewHolidays);
  await hoverOn(tl, "[data-tl=btn-add-holiday]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
