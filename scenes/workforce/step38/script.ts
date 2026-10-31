import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP38_DURATION_MS = 12500;

export async function runStep38(tl: Timeline) {
  beginWorkforce(tl, URLS.goals, "goals", "overview", [0.4, 0.2]);
  tl.setVar("wfGoalsTab", "goals");

  // 1. Click KPIs tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickKpis);
  await pressOn(tl, "[data-tl=goals-tab-kpis]", { ms: 600 });
  tl.setVar("wfGoalsTab", "kpis");
  tl.setUrl(URLS.goalsKpis);
  await tl.wait(250);

  // 2. Ring KPI row
  await tl.at(2800);
  tl.showCaption(CAPTIONS.kpiRow);
  await hoverOn(tl, "[data-tl=kpi-row]", { ms: 500 });
  await ring(tl, "[data-tl=kpi-row]", 2200);

  // 3. Ring score
  await tl.at(5600);
  tl.showCaption(CAPTIONS.kpiScore);
  await hoverOn(tl, "[data-tl=kpi-score]", { ms: 450 });
  await ring(tl, "[data-tl=kpi-score]", 1800);

  // 4. Ring status
  await tl.at(8000);
  tl.showCaption(CAPTIONS.kpiStatus);
  await hoverOn(tl, "[data-tl=kpi-status]", { ms: 450 });
  await ring(tl, "[data-tl=kpi-status]", 2000);

  // Finish
  await finishWorkforce(tl, 11500, STEP38_DURATION_MS);
}
