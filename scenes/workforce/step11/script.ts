import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP11_DURATION_MS = 18000;

export async function runStep11(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");
  tl.setVar("wfOnboardingStatus", "Active");

  // 1. Open My onboarding
  await tl.at(500);
  tl.showCaption(CAPTIONS.open);
  await tl.moveCursorTo("[data-tl=subnav-onboarding]", { ms: 600 });
  await tl.click("[data-tl=subnav-onboarding]");
  tl.setVar("wfPage", "onboarding");
  tl.setVar("wfSubpage", "onboarding");
  tl.setUrl(URLS.onboarding);

  // 2. Stat cards
  await tl.at(4000);
  tl.showCaption(CAPTIONS.stats);
  await tl.moveCursorTo("[data-tl=stat-onboarding-active]", { ms: 600 });
  tl.highlight("[data-tl=stat-onboarding-active]");

  // 3. Search & status filter
  await tl.at(7500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.filter);
  await tl.moveCursorTo("[data-tl=input-search-employee]", { ms: 600 });
  tl.highlight("[data-tl=input-search-employee]");

  // 4. Change filter to Completed
  await tl.at(10500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.completedFilter);
  await tl.moveCursorTo("[data-tl=select-onboarding-status]", { ms: 600 });
  await tl.click("[data-tl=select-onboarding-status]");
  tl.setVar("wfOnboardingStatus", "Completed");

  // 5. Table appears with Completed row
  await tl.at(13500);
  tl.showCaption(CAPTIONS.table);
  await tl.moveCursorTo("[data-tl=onboarding-row-1]", { ms: 700 });
  tl.highlight("[data-tl=onboarding-row-1]");

  await tl.at(17200);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP11_DURATION_MS);
}
