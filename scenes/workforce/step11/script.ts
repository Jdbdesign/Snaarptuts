import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP11_DURATION_MS = 18000;

export async function runStep11(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");
  tl.setVar("wfOnboardingStatus", "Active");

  // 1. Open My onboarding
  await tl.at(500);
  tl.showCaption(CAPTIONS.open);
  await pressOn(tl, "[data-tl=subnav-onboarding]", { ms: 600 });
  tl.setVar("wfPage", "onboarding");
  tl.setVar("wfSubpage", "onboarding");
  tl.setUrl(URLS.onboarding);
  await tl.wait(250);

  // 2. Stat cards
  await tl.at(4000);
  tl.showCaption(CAPTIONS.stats);
  await hoverOn(tl, "[data-tl=stat-onboarding-active]", { ms: 600 });
  await ring(tl, "[data-tl=stat-onboarding-active]", 2200);

  // 3. Search & status filter
  await tl.at(7500);
  tl.showCaption(CAPTIONS.filter);
  await hoverOn(tl, "[data-tl=input-search-employee]", { ms: 600 });
  await ring(tl, "[data-tl=input-search-employee]", 1800);

  // 4. Change filter to Completed
  await tl.at(10500);
  tl.showCaption(CAPTIONS.completedFilter);
  await pressOn(tl, "[data-tl=select-onboarding-status]", { ms: 600 });
  tl.setVar("wfOnboardingStatus", "Completed");
  await tl.wait(250);

  // 5. Table appears with Completed row
  await tl.at(13500);
  tl.showCaption(CAPTIONS.table);
  await hoverOn(tl, "[data-tl=onboarding-row-1]", { ms: 650 });
  await ring(tl, "[data-tl=onboarding-row-1]", 2400);

  // 6. End fade
  await finishWorkforce(tl, 17000, STEP11_DURATION_MS);
}
