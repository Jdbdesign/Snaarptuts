import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP66_DURATION_MS = 14500;

export async function runStep66(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "salary-components");

  // 1. Click Employee Salaries tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSalaries);
  await pressOn(tl, "[data-tl=tab-employee-salaries]", { ms: 600 });
  tl.setVar("wfPayrollTab", "employee-salaries");
  await tl.wait(300);

  // 2. Ring Alex Morgan and Jordan Lee rows
  await tl.at(2800);
  tl.showCaption(CAPTIONS.salariesList);
  await hoverOn(tl, "[data-tl=salary-row-alex]", { ms: 500 });
  await ring(tl, "[data-tl=salary-row-alex]", 1800);

  await tl.at(5500);
  await hoverOn(tl, "[data-tl=salary-row-jordan]", { ms: 500 });
  await ring(tl, "[data-tl=salary-row-jordan]", 1800);

  // 3. Hover Edit and Delete buttons on row 1
  await tl.at(8200);
  tl.showCaption(CAPTIONS.rowActions);
  await hoverOn(tl, "[data-tl=btn-edit-salary-1]", { ms: 500 });
  await ring(tl, "[data-tl=btn-edit-salary-1]", 1200);

  await tl.at(10500);
  await hoverOn(tl, "[data-tl=btn-delete-salary-1]", { ms: 500 });
  await ring(tl, "[data-tl=btn-delete-salary-1]", 1200);

  // 4. Finish
  await tl.at(13800);
  finishWorkforce(tl);
}
