import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP83_DURATION_MS = 15500;

export async function runStep83(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.93, 0.44], true);
  tl.setVar("wfRecruitmentTab", "applicants");
  tl.setVar("wfApplicantMenuOpen", false);
  tl.setVar("wfApplicantDetailsPanelOpen", false);

  // 1. Click ... and View details
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickActionsMenu);
  await pressOn(tl, "[data-tl=btn-applicant-menu]", { ms: 500 });
  tl.setVar("wfApplicantMenuOpen", true);
  await tl.wait(300);

  await tl.at(2200);
  tl.showCaption(CAPTIONS.clickViewDetails);
  await pressOn(tl, "[data-tl=menu-opt-view-details]", { ms: 500 });
  tl.setVar("wfApplicantMenuOpen", false);
  tl.setVar("wfApplicantDetailsPanelOpen", true);
  await tl.wait(400);

  // 2. Ring stage emails section
  await tl.at(4800);
  tl.showCaption(CAPTIONS.ringEmails);
  await hoverOn(tl, "[data-tl=section-stage-emails]", { ms: 500 });
  await ring(tl, "[data-tl=section-stage-emails]", 2000);

  // 3. Scroll panel to Documents and ring
  await tl.at(8000);
  await tl.scrollPanelTo("[data-scroller=panel-applicant-details]", 300, 800);
  await tl.wait(300);

  await tl.at(9500);
  tl.showCaption(CAPTIONS.ringDocs);
  await hoverOn(tl, "[data-tl=section-applicant-docs]", { ms: 500 });
  await ring(tl, "[data-tl=section-applicant-docs]", 2000);

  // 4. Close panel
  await tl.at(12800);
  tl.showCaption(CAPTIONS.closePanel);
  await pressOn(tl, "[data-tl=btn-close-applicant-details]", { ms: 500 });
  tl.setVar("wfApplicantDetailsPanelOpen", false);
  await tl.wait(300);

  // Finish
  await tl.at(14800);
  await finishWorkforce(tl);
}
