import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP98_DURATION_MS = 10500;

export async function runStep98(tl: Timeline) {
  beginWorkforce(tl, URLS.hrCases, "admin-hr-cases", "overview", [0.45, 0.28], true);
  tl.setVar("wfHrAdminTab", "grievances");
  tl.setVar("wfHrCaseDetailsModalOpen", false);

  // 1. Click View case
  await tl.at(500);
  tl.showCaption(CAPTIONS.viewCase);
  await pressOn(tl, "[data-tl=btn-view-hr-case]", { ms: 600 });
  tl.setVar("wfHrCaseDetailsModalOpen", true);
  await tl.wait(400);

  // 2. Hover modal details
  await tl.at(3800);
  tl.showCaption(CAPTIONS.inspectDetails);
  await hoverOn(tl, "[data-tl=modal-hr-case-details]", { ms: 600 });
  await tl.wait(600);

  // 3. Click Close
  await tl.at(7200);
  tl.showCaption(CAPTIONS.closeModal);
  await pressOn(tl, "[data-tl=btn-close-hr-case-modal]", { ms: 600 });
  tl.setVar("wfHrCaseDetailsModalOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  await finishWorkforce(tl);
}
