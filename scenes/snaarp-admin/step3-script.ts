import type { Timeline } from "@/lib/timeline";
import { NEW_USER } from "./admin-data";
import { CAPTIONS, URL } from "./step3-data";

/** Snaarp Admin, step 3 - Add job details and role. Times are active milliseconds from the start of the step. */
export const STEP3_DURATION_MS = 26000;

export async function runStep3(tl: Timeline) {
  tl.placeCursor(0.52, 0.5);
  tl.setUrl(URL);

  // Job title
  await tl.at(500);
  tl.showCaption(CAPTIONS.job);
  await tl.fill("[data-tl=field-job]", "job", NEW_USER.job, { moveMs: 900, msPerChar: 100 });
  tl.setVar("focus", "");

  // Department: open the list, look at it, choose Design
  await tl.at(3600);
  tl.showCaption(CAPTIONS.department);
  await tl.moveCursorTo("[data-tl=select-dept]", { ms: 700 });
  await tl.click("[data-tl=select-dept]");
  await tl.wait(600);
  tl.showCaption(CAPTIONS.chooseDepartment);
  await tl.moveCursorTo("[data-tl=opt-dept-engineering]", { ms: 600 });
  tl.hover("[data-tl=opt-dept-engineering]");
  await tl.wait(500);
  await tl.moveCursorTo("[data-tl=opt-dept-design]", { ms: 500 });
  tl.hover("[data-tl=opt-dept-design]");
  tl.highlight("[data-tl=opt-dept-design]");
  await tl.wait(500);
  await tl.click("[data-tl=opt-dept-design]");
  tl.hover(null);
  tl.clearHighlight();

  // Employee number
  await tl.at(9400);
  tl.showCaption(CAPTIONS.employee);
  await tl.fill("[data-tl=field-employee]", "employee", NEW_USER.employee, { moveMs: 800, msPerChar: 110 });
  tl.setVar("focus", "");

  // Role: look at the options, keep Member
  await tl.at(13400);
  tl.showCaption(CAPTIONS.role);
  await tl.moveCursorTo("[data-tl=select-role]", { ms: 800 });
  await tl.click("[data-tl=select-role]");
  await tl.wait(700);
  tl.showCaption(CAPTIONS.roleOptions);
  await tl.moveCursorTo("[data-tl=opt-role-admin]", { ms: 600 });
  tl.hover("[data-tl=opt-role-admin]");
  await tl.wait(900);
  await tl.moveCursorTo("[data-tl=opt-role-owner]", { ms: 500 });
  tl.hover("[data-tl=opt-role-owner]");
  await tl.wait(900);

  await tl.at(19600);
  tl.showCaption(CAPTIONS.keepMember);
  await tl.moveCursorTo("[data-tl=opt-role-member]", { ms: 600 });
  tl.hover("[data-tl=opt-role-member]");
  tl.highlight("[data-tl=opt-role-member]");
  await tl.wait(500);
  await tl.click("[data-tl=opt-role-member]");
  tl.hover(null);
  tl.clearHighlight();

  await tl.at(22400);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=create-scroll]");
  await tl.at(24600);
  tl.clearHighlight();
  await tl.at(STEP3_DURATION_MS);
}
