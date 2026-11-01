import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP105_DURATION_MS = 8000;

export async function runStep105(tl: Timeline) {
  beginWorkforce(tl, URLS.announcements, "announcements", "overview", [0.45, 0.28], true);
  tl.setVar("wfAddShiftModalOpen", false);

  // 1. Click Shifts in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickShifts);
  await pressOn(tl, "[data-tl=nav-shifts]", { ms: 600 });
  tl.setVar("wfPage", "shifts");
  tl.setUrl(URLS.shifts);
  await tl.wait(400);

  // 2. Hover shifts table
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewShifts);
  await hoverOn(tl, "[data-tl=btn-add-shift]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
