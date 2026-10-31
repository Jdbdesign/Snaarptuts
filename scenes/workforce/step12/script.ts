import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP12_DURATION_MS = 15000;

export async function runStep12(tl: Timeline) {
  beginWorkforce(tl, URLS.onboarding, "onboarding", "onboarding");
  tl.setVar("wfOnboardingStatus", "Completed");
  tl.setVar("wfActiveRecordTab", "overview");

  // 1. Click row to open record
  await tl.at(500);
  tl.showCaption(CAPTIONS.openRow);
  await pressOn(tl, "[data-tl=onboarding-row-1]", { ms: 600 });
  tl.setVar("wfPage", "onboarding-record");
  tl.setUrl(URLS.onboardingRecord);
  await tl.wait(250);

  // 2. Summary & progress card
  await tl.at(4000);
  tl.showCaption(CAPTIONS.progress);
  await hoverOn(tl, "[data-tl=record-progress-card]", { ms: 650 });
  await ring(tl, "[data-tl=record-progress-card]", 2600);

  // 3. Overview tab details
  await tl.at(8500);
  tl.showCaption(CAPTIONS.overviewTab);
  await hoverOn(tl, "[data-tl=rec-overview-content]", { ms: 650 });
  await ring(tl, "[data-tl=rec-overview-content]", 2800);

  // 4. End fade
  await finishWorkforce(tl, 14000, STEP12_DURATION_MS);
}
