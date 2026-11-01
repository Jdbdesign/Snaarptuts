import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP65_DURATION_MS = 17500;

export async function runStep65(tl: Timeline) {
  beginWorkforce(tl, URLS.appraisalManagement, "appraisal-management", "overview", [0.1, 0.45], true);
  tl.setVar("wfAppraisalTab", "actions");

  // 1. Click Payroll in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPayroll);
  await pressOn(tl, "[data-tl=nav-payroll]", { ms: 600 });
  tl.setVar("wfPage", "payroll");
  tl.setVar("wfPayrollTab", "salary-components");
  tl.setUrl(URLS.payroll);
  await tl.wait(300);

  // 2. Ring stat cards and components table
  await tl.at(2800);
  tl.showCaption(CAPTIONS.payrollOverview);
  await hoverOn(tl, "[data-tl=payroll-stat-cards]", { ms: 500 });
  await ring(tl, "[data-tl=payroll-stat-cards]", 1800);

  await tl.at(5200);
  await hoverOn(tl, "[data-tl=salary-components-table]", { ms: 500 });
  await ring(tl, "[data-tl=salary-components-table]", 1800);

  // 3. Click + Add Component
  await tl.at(7800);
  tl.showCaption(CAPTIONS.addComponent);
  await pressOn(tl, "[data-tl=btn-add-component]", { ms: 600 });
  tl.setVar("wfAddComponentModalOpen", true);
  await tl.wait(300);

  // 4. Hover component type select and toggles
  await tl.at(10200);
  tl.showCaption(CAPTIONS.componentSettings);
  await hoverOn(tl, "[data-tl=select-comp-type]", { ms: 500 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=cb-comp-taxable]", { ms: 450 });
  await ring(tl, "[data-tl=cb-comp-taxable]", 1000);
  await hoverOn(tl, "[data-tl=cb-comp-recurring]", { ms: 450 });
  await ring(tl, "[data-tl=cb-comp-recurring]", 1000);

  // 5. Click Cancel
  await tl.at(13800);
  tl.showCaption(CAPTIONS.cancelModal);
  await pressOn(tl, "[data-tl=btn-cancel-add-comp]", { ms: 500 });
  tl.setVar("wfAddComponentModalOpen", false);
  await tl.wait(300);

  // 6. Finish
  await tl.at(16800);
  finishWorkforce(tl);
}
