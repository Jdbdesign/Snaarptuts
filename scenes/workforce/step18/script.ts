import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP18_DURATION_MS = 17500;

export async function runStep18(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview", [0.12, 0.28]);
  tl.setVar("wfMySpaceExpanded", true);

  // 1. Click Salary advances in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSalaryAdvances);
  await pressOn(tl, "[data-tl=subnav-salary-advances]", { ms: 600 });
  tl.setVar("wfPage", "salary-advances");
  tl.setVar("wfSubpage", "salary-advances");
  tl.setUrl(URLS.salaryAdvances);
  await tl.wait(250);

  // 2. Ring info box
  await tl.at(3800);
  tl.showCaption(CAPTIONS.infoBox);
  await hoverOn(tl, "[data-tl=advances-info-box]", { ms: 600 });
  await ring(tl, "[data-tl=advances-info-box]", 2200);

  // 3. Hover stat cards, ring Approved
  await tl.at(7200);
  tl.showCaption(CAPTIONS.statCards);
  await hoverOn(tl, "[data-tl=advances-stat-pending]", { ms: 500 });
  await hoverOn(tl, "[data-tl=advances-stat-approved]", { ms: 400 });
  await ring(tl, "[data-tl=advances-stat-approved]", 2000);

  // 4. Hover Request advance (locked/disabled)
  await tl.at(10500);
  tl.showCaption(CAPTIONS.requestLocked);
  await hoverOn(tl, "[data-tl=btn-request-advance]", { ms: 600 });
  await ring(tl, "[data-tl=btn-request-advance]", 2200);

  // 5. Ring table row
  await tl.at(13800);
  tl.showCaption(CAPTIONS.tableRow);
  await hoverOn(tl, "[data-tl=advances-row-1]", { ms: 600 });
  await ring(tl, "[data-tl=advances-row-1]", 2200);

  // 6. Finish
  await finishWorkforce(tl, 16800, STEP18_DURATION_MS);
}
