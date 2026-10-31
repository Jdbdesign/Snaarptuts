import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP27_DURATION_MS = 12500;

export async function runStep27(tl: Timeline) {
  beginWorkforce(tl, URLS.attendance, "attendance", "overview", [0.08, 0.4]);

  // 1. Click Leave in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickLeave);
  await pressOn(tl, "[data-tl=nav-leave]", { ms: 600 });
  tl.setVar("wfPage", "leave");
  tl.setUrl(URLS.leave);
  tl.setVar("wfLeaveLoading", true);
  await tl.wait(800);
  tl.setVar("wfLeaveLoading", false);
  await tl.wait(200);

  // 2. Ring the 4 summary cards
  await tl.at(3500);
  tl.showCaption(CAPTIONS.cards);
  await hoverOn(tl, "[data-tl=leave-summary-cards]", { ms: 600 });
  await ring(tl, "[data-tl=leave-summary-cards]", 2500);

  // 3. Ring Sick leave card
  await tl.at(7200);
  tl.showCaption(CAPTIONS.sickLeave);
  await hoverOn(tl, "[data-tl=leave-type-sick]", { ms: 600 });
  await ring(tl, "[data-tl=leave-type-sick]", 2400);

  // Finish
  await finishWorkforce(tl, 11500, STEP27_DURATION_MS);
}
