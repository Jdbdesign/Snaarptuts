import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP106_DURATION_MS = 10500;

export async function runStep106(tl: Timeline) {
  beginWorkforce(tl, URLS.shifts, "shifts", "overview", [0.45, 0.28], true);
  tl.setVar("wfAddShiftModalOpen", false);

  // 1. Click + Add Shift
  await tl.at(500);
  tl.showCaption(CAPTIONS.addShift);
  await pressOn(tl, "[data-tl=btn-add-shift]", { ms: 600 });
  tl.setVar("wfAddShiftModalOpen", true);
  await tl.wait(400);

  // 2. Hover modal fields
  await tl.at(3800);
  tl.showCaption(CAPTIONS.configureShift);
  await hoverOn(tl, "[data-tl=input-shift-start]", { ms: 600 });
  await tl.wait(600);

  // 3. Click Cancel
  await tl.at(7200);
  tl.showCaption(CAPTIONS.cancelShift);
  await pressOn(tl, "[data-tl=btn-cancel-shift]", { ms: 600 });
  tl.setVar("wfAddShiftModalOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  await finishWorkforce(tl);
}
