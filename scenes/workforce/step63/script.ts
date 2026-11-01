import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP63_DURATION_MS = 16500;

export async function runStep63(tl: Timeline) {
  beginWorkforce(tl, URLS.appraisalManagement, "appraisal-management", "overview", [0.45, 0.15], true);
  tl.setVar("wfAppraisalTab", "templates");

  // 1. Click Insights tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickInsights);
  await pressOn(tl, "[data-tl=tab-insights]", { ms: 600 });
  tl.setVar("wfAppraisalTab", "insights");
  await tl.wait(300);

  // 2. Ring question averages table
  await tl.at(2800);
  tl.showCaption(CAPTIONS.questionAverages);
  await hoverOn(tl, "[data-tl=insights-table]", { ms: 600 });
  await ring(tl, "[data-tl=insights-table]", 2000);

  // 3. Ring top question row
  await tl.at(6500);
  tl.showCaption(CAPTIONS.rowScores);
  await hoverOn(tl, "[data-tl=insight-row-0]", { ms: 500 });
  await ring(tl, "[data-tl=insight-row-0]", 1800);

  // 4. Scroll to follow-up indicators card & ring
  await tl.at(10500);
  tl.showCaption(CAPTIONS.followUp);
  await hoverOn(tl, "[data-tl=card-follow-up]", { ms: 500 });
  await ring(tl, "[data-tl=card-follow-up]", 2200);

  // 5. Finish
  await tl.at(15800);
  finishWorkforce(tl);
}
