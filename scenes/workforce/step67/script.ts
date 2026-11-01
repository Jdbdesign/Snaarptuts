import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP67_DURATION_MS = 20500;

export async function runStep67(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "employee-salaries");

  // 1. Click + Assign Salary
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAssign);
  await pressOn(tl, "[data-tl=btn-assign-salary]", { ms: 600 });
  tl.setVar("wfAssignSalaryModalOpen", true);
  await tl.wait(300);

  // 2. Hover employee & currency
  await tl.at(2800);
  tl.showCaption(CAPTIONS.assignModal);
  await hoverOn(tl, "[data-tl=btn-select-employees-collapse]", { ms: 500 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=select-salary-currency]", { ms: 450 });
  await tl.wait(300);

  // 3. Ring frequency and annual total
  await tl.at(5600);
  tl.showCaption(CAPTIONS.employeeCurrency);
  await hoverOn(tl, "[data-tl=select-pay-frequency]", { ms: 450 });
  await ring(tl, "[data-tl=select-pay-frequency]", 1200);
  await hoverOn(tl, "[data-tl=text-annual-salary]", { ms: 450 });
  await ring(tl, "[data-tl=text-annual-salary]", 1200);

  // 4. Scroll to bank details & ring
  await tl.at(8800);
  tl.showCaption(CAPTIONS.bankDetails);
  await tl.scrollPanelTo("[data-scroller=assign-salary-body]", "[data-tl=card-salary-bank-details]", 600);
  await hoverOn(tl, "[data-tl=card-salary-bank-details]", { ms: 500 });
  await ring(tl, "[data-tl=card-salary-bank-details]", 1800);

  // 5. Scroll down to component breakdown & ring
  await tl.at(12000);
  tl.showCaption(CAPTIONS.componentsBreakdown);
  await tl.scrollPanelTo("[data-scroller=assign-salary-body]", "[data-tl=card-component-breakdown]", 600);
  await hoverOn(tl, "[data-tl=card-component-breakdown]", { ms: 500 });
  await ring(tl, "[data-tl=card-component-breakdown]", 1800);

  // 6. Click + Add Component
  await tl.at(14800);
  await pressOn(tl, "[data-tl=btn-add-salary-component]", { ms: 500 });
  tl.setVar("wfAssignSalaryComponentAdded", true);
  await tl.wait(400);

  // 7. Scroll to footer & click Cancel
  await tl.at(16800);
  tl.showCaption(CAPTIONS.cancelAssign);
  await pressOn(tl, "[data-tl=btn-cancel-assign-salary]", { ms: 500 });
  tl.setVar("wfAssignSalaryModalOpen", false);
  await tl.wait(300);

  // 8. Finish
  await tl.at(19800);
  finishWorkforce(tl);
}
