import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP23_DURATION_MS = 16500;

export async function runStep23(tl: Timeline) {
  beginWorkforce(tl, URLS.holidays, "holidays", "holidays", [0.12, 0.52]);

  // 1. Click My HR cases
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickHrCases);
  await pressOn(tl, "[data-tl=subnav-hr-cases]", { ms: 600 });
  tl.setVar("wfPage", "hr-cases");
  tl.setVar("wfSubpage", "hr-cases");
  tl.setUrl(URLS.hrCases);
  await tl.wait(250);

  // 2. Ring table row
  await tl.at(3500);
  tl.showCaption(CAPTIONS.tableRow);
  await hoverOn(tl, "[data-tl=hr-case-row-1]", { ms: 600 });
  await ring(tl, "[data-tl=hr-case-row-1]", 2200);

  // 3. Click View case
  await tl.at(6800);
  tl.showCaption(CAPTIONS.clickViewCase);
  await pressOn(tl, "[data-tl=btn-view-hr-case-1]", { ms: 500 });
  tl.setVar("wfHrCaseModalOpen", true);
  await tl.wait(250);

  // 4. Ring modal
  await tl.at(9200);
  tl.showCaption(CAPTIONS.modalDetails);
  await hoverOn(tl, "[data-tl=hr-case-details-modal]", { ms: 600 });
  await ring(tl, "[data-tl=hr-case-details-modal]", 2400);

  // 5. Close with X
  await tl.at(12600);
  tl.showCaption(CAPTIONS.closeModal);
  await pressOn(tl, "[data-tl=btn-close-hr-case-modal]", { ms: 500 });
  tl.setVar("wfHrCaseModalOpen", false);
  await tl.wait(250);

  // 6. Finish
  await finishWorkforce(tl, 15500, STEP23_DURATION_MS);
}
