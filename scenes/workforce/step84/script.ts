import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP84_DURATION_MS = 14000;

export async function runStep84(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.55, 0.16], true);
  tl.setVar("wfRecruitmentTab", "applicants");
  tl.setVar("wfArchivesSubpage", "list");

  // 1. Click Archives tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickArchives);
  await pressOn(tl, "[data-tl=tab-recruitment-archives]", { ms: 600 });
  tl.setVar("wfRecruitmentTab", "archives");
  await tl.wait(400);

  // 2. Click View applicants on row
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickViewApplicants);
  await pressOn(tl, "[data-tl=btn-view-archived-applicants]", { ms: 600 });
  tl.setVar("wfArchivesSubpage", "details");
  await tl.wait(400);

  // 3. Ring the table
  await tl.at(5600);
  tl.showCaption(CAPTIONS.ringTable);
  await hoverOn(tl, "[data-tl=table-archived-applicants]", { ms: 500 });
  await ring(tl, "[data-tl=table-archived-applicants]", 2000);

  // 4. Hover Restore job group
  await tl.at(8800);
  tl.showCaption(CAPTIONS.hoverRestore);
  await hoverOn(tl, "[data-tl=btn-restore-job-group]", { ms: 500 });
  await tl.wait(600);

  // 5. Click Back to archived jobs
  await tl.at(10800);
  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=btn-back-archived-jobs]", { ms: 600 });
  tl.setVar("wfArchivesSubpage", "list");
  await tl.wait(400);

  // Finish
  await tl.at(13200);
  await finishWorkforce(tl);
}
