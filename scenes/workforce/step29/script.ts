import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP29_DURATION_MS = 13500;

export async function runStep29(tl: Timeline) {
  beginWorkforce(tl, URLS.leave, "leave", "overview", [0.4, 0.2]);
  tl.setVar("wfLeaveTab", "summary");
  tl.setVar("wfLeaveDetailsOpen", false);

  // 1. Click Leave Requests tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTab);
  await pressOn(tl, "[data-tl=leave-tab-requests]", { ms: 600 });
  tl.setVar("wfLeaveTab", "requests");
  await tl.wait(250);

  // 2. Click Actions ...
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickActions);
  await pressOn(tl, "[data-tl=leave-row-actions]", { ms: 550 });
  tl.setVar("wfLeaveDetailsOpen", true);
  await tl.wait(250);

  // 3. Ring status and dates
  await tl.at(5600);
  tl.showCaption(CAPTIONS.statusAndDates);
  await hoverOn(tl, "[data-tl=leave-details-status]", { ms: 450 });
  await ring(tl, "[data-tl=leave-details-status]", 1800);

  await tl.at(8000);
  await hoverOn(tl, "[data-tl=leave-details-start]", { ms: 400 });
  await ring(tl, "[data-tl=leave-details-start]", 1600);

  // 4. Close with X
  await tl.at(10500);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=leave-details-close]", { ms: 450 });
  tl.setVar("wfLeaveDetailsOpen", false);
  await tl.wait(200);

  // Finish
  await finishWorkforce(tl, 12500, STEP29_DURATION_MS);
}
