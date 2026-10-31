import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP26_DURATION_MS = 16500;

export async function runStep26(tl: Timeline) {
  beginWorkforce(tl, URLS.attendance, "attendance", "overview", [0.5, 0.4]);
  tl.setVar("wfAttendanceCheckedIn", false);

  // 1. Scroll to calendar and ring header
  await tl.at(500);
  tl.showCaption(CAPTIONS.header);
  await tl.scrollPanelTo(
    "[data-scroller=attendance]",
    "[data-tl=attendance-calendar-scroll]",
    600
  );
  await hoverOn(tl, "[data-tl=attendance-cal-header]", { ms: 600 });
  await ring(tl, "[data-tl=attendance-cal-header]", 2000);

  // 2. Ring holiday chip
  await tl.at(4000);
  tl.showCaption(CAPTIONS.holidayChip);
  await hoverOn(tl, "[data-tl=attendance-holiday-chip]", { ms: 600 });
  await ring(tl, "[data-tl=attendance-holiday-chip]", 2200);

  // 3. Ring today cell
  await tl.at(7500);
  tl.showCaption(CAPTIONS.today);
  await hoverOn(tl, "[data-tl=attendance-today-cell]", { ms: 600 });
  await ring(tl, "[data-tl=attendance-today-cell]", 2400);

  // 4. Scroll to summary strip and ring it
  await tl.at(11000);
  tl.showCaption(CAPTIONS.summary);
  await tl.scrollPanelTo(
    "[data-scroller=attendance]",
    "[data-tl=attendance-summary-strip]",
    600
  );
  await hoverOn(tl, "[data-tl=attendance-summary-strip]", { ms: 600 });
  await ring(tl, "[data-tl=attendance-summary-strip]", 2500);

  // Finish
  await finishWorkforce(tl, 15500, STEP26_DURATION_MS);
}
