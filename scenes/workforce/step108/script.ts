import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP108_DURATION_MS = 8500;

export async function runStep108(tl: Timeline) {
  beginWorkforce(tl, URLS.holidays, "admin-holidays", "overview", [0.45, 0.28], true);
  tl.setVar("wfHolidayCalendarView", false);

  // 1. Click Calendar View toggle
  await tl.at(500);
  tl.showCaption(CAPTIONS.toggleCalendar);
  await pressOn(tl, "[data-tl=btn-holiday-calendar-toggle]", { ms: 600 });
  tl.setVar("wfHolidayCalendarView", true);
  await tl.wait(400);

  // 2. Hover Founders' Day badge
  await tl.at(3800);
  tl.showCaption(CAPTIONS.foundersDay);
  await hoverOn(tl, "[data-tl=holiday-badge-founders-day]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7800);
  await finishWorkforce(tl);
}
