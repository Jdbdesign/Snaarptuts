import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP79_DURATION_MS = 16500;

export async function runStep79(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.91, 0.22], true);
  tl.setVar("wfRecruitmentTab", "job-postings");
  tl.setVar("wfCreateJobModalOpen", false);

  // 1. Click + Create Job
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreateJob);
  await pressOn(tl, "[data-tl=btn-create-job]", { ms: 600 });
  tl.setVar("wfCreateJobModalOpen", true);
  await tl.wait(400);

  // 2. Open Department select and choose Engineering
  await tl.at(2800);
  tl.showCaption(CAPTIONS.selectDepartment);
  await pressOn(tl, "[data-tl=select-job-dept]", { ms: 500 });
  tl.setVar("wfJobDeptSelectOpen", true);
  await tl.wait(300);

  await tl.at(4200);
  await hoverOn(tl, "[data-tl=opt-dept-engineering]", { ms: 400 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-dept-engineering]", { ms: 400 });
  tl.setVar("wfJobDept", "Engineering");
  tl.setVar("wfJobDeptSelectOpen", false);
  await tl.wait(300);

  // 3. Ring salary fields
  await tl.at(6500);
  tl.showCaption(CAPTIONS.ringSalary);
  await hoverOn(tl, "[data-tl=block-job-salary]", { ms: 500 });
  await ring(tl, "[data-tl=block-job-salary]", 1800);

  // 4. Open Work arrangement and Salary period
  await tl.at(9000);
  await pressOn(tl, "[data-tl=select-job-arrangement]", { ms: 450 });
  tl.setVar("wfJobWorkArrangementSelectOpen", true);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=opt-arrangement-hybrid]", { ms: 350 });
  await tl.wait(200);
  tl.setVar("wfJobWorkArrangementSelectOpen", false);

  await tl.at(10800);
  await pressOn(tl, "[data-tl=select-job-period]", { ms: 450 });
  tl.setVar("wfJobSalaryPeriodSelectOpen", true);
  await tl.wait(300);
  tl.setVar("wfJobSalaryPeriodSelectOpen", false);

  // 5. Scroll modal to footer and click Cancel
  await tl.at(12200);
  tl.showCaption(CAPTIONS.scrollFooter);
  await tl.scrollPanelTo("[data-scroller=modal-create-job]", 350, { ms: 800 });
  await tl.wait(300);

  await tl.at(14000);
  tl.showCaption(CAPTIONS.clickCancel);
  await pressOn(tl, "[data-tl=btn-cancel-create-job]", { ms: 600 });
  tl.setVar("wfCreateJobModalOpen", false);
  await tl.wait(300);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
