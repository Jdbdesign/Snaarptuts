import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP78_DURATION_MS = 11500;

export async function runStep78(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.4, 0.16], true);
  tl.setVar("wfRecruitmentTab", "dashboard");

  // 1. Click Job Postings tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickJobPostings);
  await pressOn(tl, "[data-tl=tab-recruitment-job-postings]", { ms: 600 });
  tl.setVar("wfRecruitmentTab", "job-postings");
  await tl.wait(400);

  // 2. Hover row 1 actions
  await tl.at(2800);
  tl.showCaption(CAPTIONS.rowActions);
  await hoverOn(tl, "[data-tl=btn-edit-job-1]", { ms: 500 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=btn-circle-job-1]", { ms: 400 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=btn-delete-job-1]", { ms: 400 });
  await tl.wait(300);

  // 3. Ring status pills
  await tl.at(5800);
  tl.showCaption(CAPTIONS.statusPills);
  await hoverOn(tl, "[data-tl=badge-status-open]", { ms: 500 });
  await ring(tl, "[data-tl=badge-status-open]", 1600);

  await tl.at(8200);
  await hoverOn(tl, "[data-tl=badge-status-closed]", { ms: 500 });
  await ring(tl, "[data-tl=badge-status-closed]", 1600);

  // Finish
  await tl.at(10800);
  await finishWorkforce(tl);
}
