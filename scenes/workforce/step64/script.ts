import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP64_DURATION_MS = 14500;

export async function runStep64(tl: Timeline) {
  beginWorkforce(tl, URLS.appraisalManagement, "appraisal-management", "overview", [0.75, 0.15], true);
  tl.setVar("wfAppraisalTab", "insights");

  // 1. Click Employment Actions tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickActions);
  await pressOn(tl, "[data-tl=tab-actions]", { ms: 600 });
  tl.setVar("wfAppraisalTab", "actions");
  await tl.wait(300);

  // 2. Ring heading and empty state card
  await tl.at(2800);
  tl.showCaption(CAPTIONS.actionsDesc);
  await hoverOn(tl, "[data-tl=actions-heading]", { ms: 500 });
  await ring(tl, "[data-tl=actions-heading]", 1800);

  // 3. Ring empty recommendations
  await tl.at(6500);
  tl.showCaption(CAPTIONS.emptyRecommendations);
  await hoverOn(tl, "[data-tl=actions-empty-state]", { ms: 500 });
  await ring(tl, "[data-tl=actions-empty-state]", 2200);

  // 4. Finish
  await tl.at(13800);
  finishWorkforce(tl);
}
