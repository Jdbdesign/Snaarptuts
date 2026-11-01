import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP81_DURATION_MS = 14000;

export async function runStep81(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.46, 0.16], true);
  tl.setVar("wfRecruitmentTab", "job-postings");
  tl.setVar("wfApplicantStageSelectOpen", false);
  tl.setVar("wfApplicantMenuOpen", false);

  // 1. Click Applicants tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickApplicants);
  await pressOn(tl, "[data-tl=tab-recruitment-applicants]", { ms: 600 });
  tl.setVar("wfRecruitmentTab", "applicants");
  await tl.wait(400);

  // 2. Click Hired stage select
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickStageSelect);
  await pressOn(tl, "[data-tl=select-applicant-status-hired]", { ms: 600 });
  tl.setVar("wfApplicantStageSelectOpen", true);
  await tl.wait(400);

  await tl.at(5000);
  await hoverOn(tl, "[data-tl=dropdown-applicant-stages]", { ms: 500 });
  await tl.wait(400);

  // Close stage dropdown
  await tl.at(6800);
  await pressOn(tl, "[data-tl=select-applicant-status-hired]", { ms: 400 });
  tl.setVar("wfApplicantStageSelectOpen", false);
  await tl.wait(300);

  // 3. Click ... actions menu
  await tl.at(8500);
  tl.showCaption(CAPTIONS.clickActionsMenu);
  await pressOn(tl, "[data-tl=btn-applicant-menu]", { ms: 500 });
  tl.setVar("wfApplicantMenuOpen", true);
  await tl.wait(400);

  await tl.at(10500);
  await hoverOn(tl, "[data-tl=menu-applicant-actions]", { ms: 500 });
  await tl.wait(400);

  // Close menu
  await tl.at(12200);
  await pressOn(tl, "[data-tl=btn-applicant-menu]", { ms: 400 });
  tl.setVar("wfApplicantMenuOpen", false);
  await tl.wait(300);

  // Finish
  await tl.at(13500);
  await finishWorkforce(tl);
}
