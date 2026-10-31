import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP15_DURATION_MS = 15000;

export async function runStep15(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingRecord, "onboarding-record");
  tl.setVar("wfActiveRecordTab", "overview");

  // 1. Click Activity tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.tab);
  await pressOn(tl, "[data-tl=tab-rec-activity]", { ms: 600 });
  tl.setVar("wfActiveRecordTab", "activity");
  await tl.wait(250);

  // 2. First activity item
  await tl.at(4000);
  tl.showCaption(CAPTIONS.events);
  await hoverOn(tl, "[data-tl=rec-act-oa1]", { ms: 600 });
  await ring(tl, "[data-tl=rec-act-oa1]", 2600);

  // 3. Scroll down to earlier items
  await tl.at(8000);
  tl.showCaption(CAPTIONS.scroll);
  await hoverOn(tl, "[data-tl=rec-act-oa8]", { ms: 750 });
  await ring(tl, "[data-tl=rec-act-oa8]", 2600);

  // 4. End fade
  await finishWorkforce(tl, 13800, STEP15_DURATION_MS);
}
