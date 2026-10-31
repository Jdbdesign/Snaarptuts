import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP22_DURATION_MS = 18000;

export async function runStep22(tl: Timeline) {
  beginWorkforce(tl, URLS.exitTasks, "exit-tasks", "exit-tasks", [0.12, 0.48]);

  // 1. Click Holidays in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickHolidays);
  await pressOn(tl, "[data-tl=subnav-holidays]", { ms: 600 });
  tl.setVar("wfPage", "holidays");
  tl.setVar("wfSubpage", "holidays");
  tl.setUrl(URLS.holidays);
  await tl.wait(250);

  // 2. Ring month header
  await tl.at(3500);
  tl.showCaption(CAPTIONS.monthHeader);
  await hoverOn(tl, "[data-tl=holidays-month-header]", { ms: 600 });
  await ring(tl, "[data-tl=holidays-month-header]", 2200);

  // 3. Ring holiday chip
  await tl.at(7000);
  tl.showCaption(CAPTIONS.holidayChip);
  await hoverOn(tl, "[data-tl=holiday-chip-founders-day]", { ms: 600 });
  await ring(tl, "[data-tl=holiday-chip-founders-day]", 2200);

  // 4. Scroll to today's date and ring it
  await tl.at(10500);
  tl.showCaption(CAPTIONS.todayDate);
  await hoverOn(tl, "[data-tl=holiday-today-circle]", { ms: 600 });
  await ring(tl, "[data-tl=holiday-today-circle]", 2200);

  // 5. Hover next-month arrow only
  await tl.at(14000);
  tl.showCaption(CAPTIONS.nextMonthArrow);
  await hoverOn(tl, "[data-tl=btn-holidays-next-month]", { ms: 600 });
  await ring(tl, "[data-tl=btn-holidays-next-month]", 2000);

  // 6. Finish
  await finishWorkforce(tl, 17200, STEP22_DURATION_MS);
}
