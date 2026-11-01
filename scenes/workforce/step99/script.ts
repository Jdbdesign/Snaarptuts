import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP99_DURATION_MS = 8000;

export async function runStep99(tl: Timeline) {
  beginWorkforce(tl, URLS.hrCases, "admin-hr-cases", "overview", [0.45, 0.28], true);
  tl.setVar("wfHrAdminTab", "grievances");
  tl.setVar("wfAddDisciplinaryModalOpen", false);

  // 1. Click Disciplinary tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickDisciplinaryTab);
  await pressOn(tl, "[data-tl=tab-hr-disciplinary]", { ms: 600 });
  tl.setVar("wfHrAdminTab", "disciplinary");
  await tl.wait(400);

  // 2. Hover disciplinary record row
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewDisciplinaryRecord);
  await hoverOn(tl, "[data-tl=btn-view-disc-record]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
