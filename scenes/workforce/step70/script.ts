import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP70_DURATION_MS = 16500;

export async function runStep70(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "payslips");
  tl.setVar("wfPayrunPaid", true);

  // 1. Click Salary advances tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAdvances);
  await pressOn(tl, "[data-tl=tab-salary-advances]", { ms: 600 });
  tl.setVar("wfPayrollTab", "salary-advances");
  await tl.wait(300);

  // 2. Ring 4 stat cards
  await tl.at(2800);
  tl.showCaption(CAPTIONS.advancesAdmin);
  await hoverOn(tl, "[data-tl=advance-admin-stats]", { ms: 500 });
  await ring(tl, "[data-tl=advance-admin-stats]", 2000);

  // 3. Ring table row
  await tl.at(6500);
  tl.showCaption(CAPTIONS.rowRecord);
  await hoverOn(tl, "[data-tl=advance-row-alex]", { ms: 500 });
  await ring(tl, "[data-tl=advance-row-alex]", 1800);

  // 4. Open ... action menu
  await tl.at(9800);
  tl.showCaption(CAPTIONS.advanceActions);
  await pressOn(tl, "[data-tl=btn-advance-row-actions]", { ms: 500 });
  tl.setVar("wfAdvanceMenuOpenId", "alex");
  await tl.wait(300);

  await tl.at(11500);
  await hoverOn(tl, "[data-tl=menu-item-view-details]", { ms: 400 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=menu-item-cancel-request]", { ms: 400 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=btn-advance-row-actions]", { ms: 400 });
  tl.setVar("wfAdvanceMenuOpenId", null);

  // 5. Finish
  await tl.at(15800);
  finishWorkforce(tl);
}
