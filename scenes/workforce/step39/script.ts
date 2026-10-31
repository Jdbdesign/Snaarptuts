import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP39_DURATION_MS = 17500;

export async function runStep39(tl: Timeline) {
  beginWorkforce(tl, URLS.goalsKpis, "goals", "overview", [0.4, 0.35]);
  tl.setVar("wfGoalsTab", "kpis");
  tl.setVar("wfKpiDetailsOpen", false);

  // 1. Click New goal KPI link
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTitle);
  await pressOn(tl, "[data-tl=kpi-link-sample]", { ms: 600 });
  tl.setVar("wfKpiDetailsOpen", true);
  await tl.wait(250);

  // 2. Ring two-column facts
  await tl.at(3000);
  tl.showCaption(CAPTIONS.facts);
  await hoverOn(tl, "[data-tl=kpi-facts]", { ms: 500 });
  await ring(tl, "[data-tl=kpi-facts]", 2200);

  // 3. Scroll to Evidence and Reviewer feedback
  await tl.at(6200);
  tl.showCaption(CAPTIONS.evidenceAndFeedback);
  await tl.scrollPanelTo(
    "[data-tl=kpi-modal-scroll]",
    "[data-tl=kpi-evidence-card]",
    600
  );
  await hoverOn(tl, "[data-tl=kpi-feedback-card]", { ms: 500 });
  await ring(tl, "[data-tl=kpi-feedback-card]", 2000);

  // 4. Scroll to History section and ring entries
  await tl.at(9800);
  tl.showCaption(CAPTIONS.history);
  await tl.scrollPanelTo(
    "[data-tl=kpi-modal-scroll]",
    "[data-tl=kpi-history-section]",
    600
  );
  await hoverOn(tl, "[data-tl=kpi-history-1]", { ms: 450 });
  await ring(tl, "[data-tl=kpi-history-1]", 1500);

  await tl.at(12600);
  await hoverOn(tl, "[data-tl=kpi-history-2]", { ms: 400 });
  await ring(tl, "[data-tl=kpi-history-2]", 1400);

  // 5. Close with X
  await tl.at(14800);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=kpi-modal-close]", { ms: 450 });
  tl.setVar("wfKpiDetailsOpen", false);
  await tl.wait(200);

  // Finish
  await finishWorkforce(tl, 16500, STEP39_DURATION_MS);
}
