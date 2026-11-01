import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP68_DURATION_MS = 18500;

export async function runStep68(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "employee-salaries");
  tl.setVar("wfPayrunPaid", false);
  tl.setVar("wfPayRunStatus", "PROCESSING");

  // 1. Click Pay Runs tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPayRuns);
  await pressOn(tl, "[data-tl=tab-pay-runs]", { ms: 600 });
  tl.setVar("wfPayrollTab", "pay-runs");
  await tl.wait(300);

  // 2. Click + Create Pay Run button
  await tl.at(2800);
  tl.showCaption(CAPTIONS.createPayRun);
  await pressOn(tl, "[data-tl=btn-create-payrun]", { ms: 600 });
  tl.setVar("wfCreatePayRunOpen", true);
  await tl.wait(300);

  // 3. Open employee picker and select Jordan Lee
  await tl.at(5500);
  tl.showCaption(CAPTIONS.selectEmployees);
  await pressOn(tl, "[data-tl=btn-payrun-employees-picker]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=cb-payrun-jordan]", { ms: 450 });
  tl.setVar("wfPayRunSelectedEmployees", ["alex-morgan", "jordan-lee"]);
  await tl.wait(300);

  // 4. Click Create Pay Run
  await tl.at(8500);
  await pressOn(tl, "[data-tl=btn-submit-create-payrun]", { ms: 500 });
  tl.setVar("wfCreatePayRunOpen", false);
  tl.setVar("wfPayRunStatus", "PROCESSING");
  tl.toast("Pay run created and processed! Check Payslips tab.");
  await tl.wait(400);

  // 5. Ring PROCESSING status
  await tl.at(10500);
  tl.showCaption(CAPTIONS.processingRun);
  await hoverOn(tl, "[data-tl=pill-payrun-processing]", { ms: 500 });
  await ring(tl, "[data-tl=payrun-row-1]", 1800);

  // 6. Click Complete
  await tl.at(13500);
  tl.showCaption(CAPTIONS.completePayRun);
  await pressOn(tl, "[data-tl=btn-complete-payrun]", { ms: 600 });
  tl.setVar("wfPayRunStatus", "PAID");
  tl.setVar("wfPayrunPaid", true);
  tl.toast("Pay run marked as paid");
  await tl.wait(300);

  // 7. Ring updated stat
  await tl.at(15500);
  await hoverOn(tl, "[data-tl=stat-payroll-cost]", { ms: 450 });
  await ring(tl, "[data-tl=stat-payroll-cost]", 1400);

  // 8. Finish
  await tl.at(17800);
  finishWorkforce(tl);
}
