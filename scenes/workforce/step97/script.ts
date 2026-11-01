import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP97_DURATION_MS = 8000;

export async function runStep97(tl: Timeline) {
  beginWorkforce(tl, URLS.offboarding, "lifecycle-offboarding", "overview", [0.55, 0.45], true);
  tl.setVar("wfLifecycleTab", "offboarding");
  tl.setVar("wfHrAdminTab", "grievances");
  tl.setVar("wfHrCaseDetailsModalOpen", false);

  // 1. Click HR Cases in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickHrCases);
  await pressOn(tl, "[data-tl=nav-hr-cases-manage]", { ms: 600 });
  tl.setVar("wfPage", "admin-hr-cases");
  tl.setUrl(URLS.hrCases);
  await tl.wait(400);

  // 2. Hover confidentiality banner
  await tl.at(3800);
  tl.showCaption(CAPTIONS.confidentialNotice);
  await hoverOn(tl, "[data-tl=hr-confidentiality-notice]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
