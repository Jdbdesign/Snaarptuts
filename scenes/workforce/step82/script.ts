import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP82_DURATION_MS = 16500;

export async function runStep82(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.93, 0.44], true);
  tl.setVar("wfRecruitmentTab", "applicants");
  tl.setVar("wfApplicantMenuOpen", false);
  tl.setVar("wfRequestDocsModalOpen", false);
  tl.setVar("wfRequestDocsDocxChecked", false);
  tl.setVar("wfRequestDocsInstructions", "");

  // 1. Click ... and Request documents
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickActionsMenu);
  await pressOn(tl, "[data-tl=btn-applicant-menu]", { ms: 500 });
  tl.setVar("wfApplicantMenuOpen", true);
  await tl.wait(300);

  await tl.at(2200);
  tl.showCaption(CAPTIONS.clickRequestDocs);
  await pressOn(tl, "[data-tl=menu-opt-request-docs]", { ms: 500 });
  tl.setVar("wfApplicantMenuOpen", false);
  tl.setVar("wfRequestDocsModalOpen", true);
  await tl.wait(400);

  // 2. Ring Document select
  await tl.at(4500);
  tl.showCaption(CAPTIONS.ringDocType);
  await hoverOn(tl, "[data-tl=select-request-doc-type]", { ms: 500 });
  await ring(tl, "[data-tl=select-request-doc-type]", 1600);

  // 3. Tick DOCX, then untick it
  await tl.at(6800);
  tl.showCaption(CAPTIONS.toggleFiletype);
  await pressOn(tl, "[data-tl=checkbox-filetype-docx]", { ms: 500 });
  tl.setVar("wfRequestDocsDocxChecked", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=checkbox-filetype-docx]", { ms: 500 });
  tl.setVar("wfRequestDocsDocxChecked", false);
  await tl.wait(300);

  // 4. Click into Instructions and type text
  await tl.at(9200);
  tl.showCaption(CAPTIONS.typeInstructions);
  await pressOn(tl, "[data-tl=textarea-request-instructions]", { ms: 500 });
  await tl.typeText(
    "[data-tl=textarea-request-instructions]",
    "Please upload your latest CV.",
    { ms: 70 }
  );
  tl.setVar("wfRequestDocsInstructions", "Please upload your latest CV.");
  await tl.wait(400);

  // 5. Ring footer
  await tl.at(12200);
  tl.showCaption(CAPTIONS.ringFooter);
  await hoverOn(tl, "[data-tl=footer-request-docs]", { ms: 500 });
  await ring(tl, "[data-tl=footer-request-docs]", 1600);

  // 6. Click Cancel
  await tl.at(14400);
  tl.showCaption(CAPTIONS.clickCancel);
  await pressOn(tl, "[data-tl=btn-cancel-request-docs]", { ms: 500 });
  tl.setVar("wfRequestDocsModalOpen", false);
  await tl.wait(300);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
