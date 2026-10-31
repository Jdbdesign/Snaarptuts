import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP28_DURATION_MS = 18000;

export async function runStep28(tl: Timeline) {
  beginWorkforce(tl, URLS.leave, "leave", "overview", [0.85, 0.2]);
  tl.setVar("wfLeaveTab", "summary");
  tl.setVar("wfRequestLeaveOpen", false);

  // 1. Click + Request Leave
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickRequestLeave);
  await pressOn(tl, "[data-tl=leave-request-btn]", { ms: 600 });
  tl.setVar("wfRequestLeaveOpen", true);
  await tl.wait(250);

  // 2. Ring each field in order
  await tl.at(2800);
  tl.showCaption(CAPTIONS.leaveType);
  await hoverOn(tl, "[data-tl=leave-field-type]", { ms: 450 });
  await ring(tl, "[data-tl=leave-field-type]", 1500);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.startDate);
  await hoverOn(tl, "[data-tl=leave-field-start]", { ms: 400 });
  await ring(tl, "[data-tl=leave-field-start]", 1500);

  await tl.at(6800);
  tl.showCaption(CAPTIONS.endDate);
  await hoverOn(tl, "[data-tl=leave-field-end]", { ms: 400 });
  await ring(tl, "[data-tl=leave-field-end]", 1500);

  await tl.at(8800);
  tl.showCaption(CAPTIONS.email);
  await hoverOn(tl, "[data-tl=leave-field-email]", { ms: 400 });
  await ring(tl, "[data-tl=leave-field-email]", 1500);

  await tl.at(10800);
  tl.showCaption(CAPTIONS.reason);
  await hoverOn(tl, "[data-tl=leave-field-reason]", { ms: 450 });
  await ring(tl, "[data-tl=leave-field-reason]", 1600);

  // 3. Ring Apply Leave button
  await tl.at(13000);
  tl.showCaption(CAPTIONS.applyBtn);
  await hoverOn(tl, "[data-tl=leave-submit-btn]", { ms: 450 });
  await ring(tl, "[data-tl=leave-submit-btn]", 1800);

  // 4. Close modal with X
  await tl.at(15300);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=leave-modal-close]", { ms: 450 });
  tl.setVar("wfRequestLeaveOpen", false);
  await tl.wait(200);

  // Finish
  await finishWorkforce(tl, 17000, STEP28_DURATION_MS);
}
