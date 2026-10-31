import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP30_DURATION_MS = 12500;

export async function runStep30(tl: Timeline) {
  beginWorkforce(tl, URLS.leave, "leave", "overview", [0.45, 0.2]);
  tl.setVar("wfLeaveTab", "summary");

  // 1. Click Shift tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickShift);
  await pressOn(tl, "[data-tl=leave-tab-shift]", { ms: 600 });
  tl.setVar("wfLeaveTab", "shift");
  await tl.wait(250);

  // 2. Ring shift time
  await tl.at(2800);
  tl.showCaption(CAPTIONS.shiftTime);
  await hoverOn(tl, "[data-tl=shift-hours]", { ms: 500 });
  await ring(tl, "[data-tl=shift-hours]", 2000);

  // 3. Ring grace period
  await tl.at(5600);
  tl.showCaption(CAPTIONS.gracePeriod);
  await hoverOn(tl, "[data-tl=shift-grace]", { ms: 500 });
  await ring(tl, "[data-tl=shift-grace]", 2000);

  // 4. Ring note
  await tl.at(8400);
  tl.showCaption(CAPTIONS.shiftNote);
  await hoverOn(tl, "[data-tl=shift-note]", { ms: 500 });
  await ring(tl, "[data-tl=shift-note]", 2500);

  // Finish
  await finishWorkforce(tl, 11500, STEP30_DURATION_MS);
}
