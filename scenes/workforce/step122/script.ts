import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP122_DURATION_MS = 8500;

export async function runStep122(tl: Timeline) {
  beginWorkforce(tl, URLS.reports, "reports", "overview", [0.45, 0.28], true);
  tl.setVar("wfReportsSub", "hub");

  // 1. Click Onboarding Report card
  await tl.at(500);
  tl.showCaption(CAPTIONS.openOnboardingReport);
  await pressOn(tl, "[data-tl=card-report-onboarding]", { ms: 600 });
  tl.setVar("wfReportsSub", "onboarding");
  tl.setVar("wfPage", "reports-onboarding");
  tl.setUrl(URLS.reportsOnboarding);
  await tl.wait(400);

  // 2. Click Apply filter
  await tl.at(3800);
  tl.showCaption(CAPTIONS.applyFilter);
  await pressOn(tl, "[data-tl=btn-apply-onboarding-filter]", { ms: 600 });
  await tl.wait(400);

  // 3. Hover table
  await tl.at(6200);
  await hoverOn(tl, "[data-tl=table-onboarding-report]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7800);
  await finishWorkforce(tl);
}
