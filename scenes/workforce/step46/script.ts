import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP46_DURATION_MS = 8600;

export async function runStep46(tl: Timeline) {
  beginWorkforce(tl, URLS.policiesEngineering, "policies-folder", "overview", [0.45, 0.45]);

  // 1. Ring policy table row
  await tl.at(500);
  tl.showCaption(CAPTIONS.policiesList);
  await hoverOn(tl, "[data-tl=row-policy-engineering]", { ms: 500 });
  await ring(tl, "[data-tl=row-policy-engineering]", 2000);

  // 2. Ring Approved pill
  await tl.at(2900);
  tl.showCaption(CAPTIONS.approvedStatus);
  await hoverOn(tl, "[data-tl=badge-policy-approved]", { ms: 500 });
  await ring(tl, "[data-tl=badge-policy-approved]", 1600);

  // 3. Click View button
  await tl.at(5200);
  tl.showCaption(CAPTIONS.clickView);
  await pressOn(tl, "[data-tl=btn-view-policy]", { ms: 600 });
  tl.setVar("wfPage", "policy-details");
  tl.setUrl(URLS.policyDetails);
  await tl.wait(250);

  await finishWorkforce(tl, 7600, STEP46_DURATION_MS);
}
