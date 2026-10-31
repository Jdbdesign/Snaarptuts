import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP12_DURATION_MS = 15000;

export async function runStep12(tl: Timeline) {
  beginWorkforce(tl, URLS.onboarding, "onboarding", "onboarding");
  tl.setVar("wfOnboardingStatus", "Completed");
  tl.setVar("wfActiveRecordTab", "overview");

  // 1. Click row to open record
  await tl.at(500);
  tl.showCaption(CAPTIONS.openRow);
  await tl.moveCursorTo("[data-tl=onboarding-row-1]", { ms: 600 });
  await tl.click("[data-tl=onboarding-row-1]");
  tl.setVar("wfPage", "onboarding-record");
  tl.setUrl(URLS.onboardingRecord);

  // 2. Summary & progress card
  await tl.at(4000);
  tl.showCaption(CAPTIONS.progress);
  await tl.moveCursorTo("[data-tl=record-progress-card]", { ms: 600 });
  tl.highlight("[data-tl=record-progress-card]");

  // 3. Overview tab details
  await tl.at(8500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.overviewTab);
  await tl.moveCursorTo("[data-tl=rec-overview-content]", { ms: 600 });
  tl.highlight("[data-tl=rec-overview-content]");

  await tl.at(14000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP12_DURATION_MS);
}
