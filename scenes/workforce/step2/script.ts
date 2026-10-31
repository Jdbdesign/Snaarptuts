import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP2_DURATION_MS = 16000;

export async function runStep2(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");
  tl.placeCursorOn("[data-tl=your-overview]");

  // 1. My leave
  await tl.at(500);
  tl.showCaption(CAPTIONS.leave);
  await hoverOn(tl, "[data-tl=btn-view-leave]", { ms: 650 });
  tl.highlight("[data-tl=overview-card-leave]");
  await tl.wait(1800);
  tl.clearHighlight();

  // 2. My sickness
  await tl.at(4200);
  tl.showCaption(CAPTIONS.sickness);
  await hoverOn(tl, "[data-tl=btn-view-sickness]", { ms: 650 });
  tl.highlight("[data-tl=overview-card-sickness]");
  await tl.wait(1800);
  tl.clearHighlight();

  // 3. Objectives
  await tl.at(8000);
  tl.showCaption(CAPTIONS.goals);
  await hoverOn(tl, "[data-tl=btn-view-objectives]", { ms: 650 });
  tl.highlight("[data-tl=overview-card-objectives]");
  await tl.wait(1800);
  tl.clearHighlight();

  // 4. My tasks
  await tl.at(11800);
  tl.showCaption(CAPTIONS.tasks);
  await hoverOn(tl, "[data-tl=btn-view-tasks]", { ms: 650 });
  tl.highlight("[data-tl=overview-card-tasks]");
  await tl.wait(1800);
  tl.clearHighlight();

  // 5. End fade
  await finishWorkforce(tl, 14800, STEP2_DURATION_MS);
}
