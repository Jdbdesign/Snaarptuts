import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP40_DURATION_MS = 14500;

export async function runStep40(tl: Timeline) {
  beginWorkforce(tl, URLS.goalsKpis, "goals", "overview", [0.08, 0.55]);
  tl.setVar("wfAppraisalsTab", "my-reviews");

  // 1. Click My Appraisals in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAppraisals);
  await pressOn(tl, "[data-tl=nav-appraisals]", { ms: 600 });
  tl.setVar("wfPage", "performance");
  tl.setUrl(URLS.performance);
  await tl.wait(250);

  // 2. Ring stat cards
  await tl.at(3000);
  tl.showCaption(CAPTIONS.statCards);
  await hoverOn(tl, "[data-tl=appraisals-stat-cards]", { ms: 500 });
  await ring(tl, "[data-tl=appraisals-stat-cards]", 2200);

  // 3. Hover each Actions button
  await tl.at(6000);
  tl.showCaption(CAPTIONS.actionButtons);
  await hoverOn(tl, "[data-tl=review-action-open-q4]", { ms: 400 });
  await ring(tl, "[data-tl=review-action-open-q4]", 1000);

  await tl.at(7800);
  await hoverOn(tl, "[data-tl=review-action-view-2027]", { ms: 400 });
  await ring(tl, "[data-tl=review-action-view-2027]", 1000);

  await tl.at(9600);
  await hoverOn(tl, "[data-tl=review-action-view-2026]", { ms: 400 });
  await ring(tl, "[data-tl=review-action-view-2026]", 1000);

  // 4. Ring table
  await tl.at(11400);
  tl.showCaption(CAPTIONS.table);
  await hoverOn(tl, "[data-tl=appraisals-table]", { ms: 450 });
  await ring(tl, "[data-tl=appraisals-table]", 1800);

  // Finish
  await finishWorkforce(tl, 13500, STEP40_DURATION_MS);
}
