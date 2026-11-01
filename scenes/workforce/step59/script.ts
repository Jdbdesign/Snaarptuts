import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP59_DURATION_MS = 14500;

export async function runStep59(tl: Timeline) {
  beginWorkforce(tl, URLS.appraisalManagement, "appraisal-management", "overview", [0.25, 0.15], true);
  tl.setVar("wfAppraisalTab", "cycles");

  // 1. Click Overview tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickOverview);
  await pressOn(tl, "[data-tl=tab-overview]", { ms: 600 });
  tl.setVar("wfAppraisalTab", "overview");
  await tl.wait(300);

  // 2. Filter selects: hover Cycles, Depts, Statuses
  await tl.at(2800);
  tl.showCaption(CAPTIONS.filterOptions);
  await hoverOn(tl, "[data-tl=filter-cycles]", { ms: 500 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=filter-depts]", { ms: 450 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=filter-statuses]", { ms: 450 });
  await ring(tl, "[data-tl=overview-filters]", 1600);

  // 3. Ring Overview table
  await tl.at(7500);
  tl.showCaption(CAPTIONS.progressTable);
  await hoverOn(tl, "[data-tl=overview-table]", { ms: 600 });
  await ring(tl, "[data-tl=overview-table]", 2200);

  // 4. Finish
  await tl.at(13800);
  finishWorkforce(tl);
}
