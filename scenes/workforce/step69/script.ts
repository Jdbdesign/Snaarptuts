import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP69_DURATION_MS = 15500;

export async function runStep69(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "pay-runs");
  tl.setVar("wfPayrunPaid", false);

  // 1. Click Payslips tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPayslips);
  await pressOn(tl, "[data-tl=tab-payslips]", { ms: 600 });
  tl.setVar("wfPayrollTab", "payslips");
  await tl.wait(300);

  // Briefly show info box then simulate generated state
  await tl.at(2500);
  tl.setVar("wfPayrunPaid", true);
  await tl.wait(300);

  // 2. Ring payslips table
  await tl.at(3800);
  tl.showCaption(CAPTIONS.payslipsOverview);
  await hoverOn(tl, "[data-tl=payslips-table]", { ms: 500 });
  await ring(tl, "[data-tl=payslips-table]", 2000);

  // 3. Ring Alex Morgan and Jordan Lee rows
  await tl.at(6800);
  tl.showCaption(CAPTIONS.rowsSummary);
  await hoverOn(tl, "[data-tl=payslip-row-alex]", { ms: 500 });
  await ring(tl, "[data-tl=payslip-row-alex]", 1600);

  await tl.at(9200);
  await hoverOn(tl, "[data-tl=payslip-row-jordan]", { ms: 500 });
  await ring(tl, "[data-tl=payslip-row-jordan]", 1600);

  // 4. Hover Download button on Alex Morgan row
  await tl.at(11800);
  tl.showCaption(CAPTIONS.downloadPayslip);
  await hoverOn(tl, "[data-tl=btn-download-payslip-1]", { ms: 500 });
  await ring(tl, "[data-tl=btn-download-payslip-1]", 1600);

  // 5. Finish
  await tl.at(14800);
  finishWorkforce(tl);
}
