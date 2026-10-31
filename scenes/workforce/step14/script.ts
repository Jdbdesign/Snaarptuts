import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP14_DURATION_MS = 11000;

export async function runStep14(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingRecord, "onboarding-record");
  tl.setVar("wfActiveRecordTab", "overview");

  // 1. Click Documents tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.tab);
  await pressOn(tl, "[data-tl=tab-rec-documents]", { ms: 600 });
  tl.setVar("wfActiveRecordTab", "documents");
  await tl.wait(250);

  // 2. Document row & badge
  await tl.at(4000);
  tl.showCaption(CAPTIONS.row);
  await hoverOn(tl, "[data-tl=rec-doc-row]", { ms: 600 });
  await ring(tl, "[data-tl=rec-doc-row]", 2600);

  await tl.at(7500);
  await hoverOn(tl, "[data-tl=btn-view-doc-file]", { ms: 550 });
  await ring(tl, "[data-tl=btn-view-doc-file]", 1800);

  // 3. End fade
  await finishWorkforce(tl, 10200, STEP14_DURATION_MS);
}
