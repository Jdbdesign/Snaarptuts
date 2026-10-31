import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP15_DURATION_MS = 15000;

export async function runStep15(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingRecord, "onboarding-record");
  tl.setVar("wfActiveRecordTab", "overview");

  // 1. Click Activity tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.tab);
  await tl.moveCursorTo("[data-tl=tab-rec-activity]", { ms: 600 });
  await tl.click("[data-tl=tab-rec-activity]");
  tl.setVar("wfActiveRecordTab", "activity");

  // 2. First activity item
  await tl.at(4000);
  tl.showCaption(CAPTIONS.events);
  await tl.moveCursorTo("[data-tl=rec-act-oa1]", { ms: 600 });
  tl.highlight("[data-tl=rec-act-oa1]");

  // 3. Scroll down to earlier items
  await tl.at(8000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.scroll);
  await tl.moveCursorTo("[data-tl=rec-act-oa8]", { ms: 800 });
  tl.highlight("[data-tl=rec-act-oa8]");

  await tl.at(13500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP15_DURATION_MS);
}
