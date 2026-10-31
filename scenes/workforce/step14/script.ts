import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP14_DURATION_MS = 11000;

export async function runStep14(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingRecord, "onboarding-record");
  tl.setVar("wfActiveRecordTab", "overview");

  // 1. Click Documents tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.tab);
  await tl.moveCursorTo("[data-tl=tab-rec-documents]", { ms: 600 });
  await tl.click("[data-tl=tab-rec-documents]");
  tl.setVar("wfActiveRecordTab", "documents");

  // 2. Document row & badge
  await tl.at(4000);
  tl.showCaption(CAPTIONS.row);
  await tl.moveCursorTo("[data-tl=rec-doc-row]", { ms: 600 });
  tl.highlight("[data-tl=rec-doc-row]");

  await tl.at(7500);
  await tl.moveCursorTo("[data-tl=btn-view-doc-file]", { ms: 600 });

  await tl.at(10200);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP14_DURATION_MS);
}
