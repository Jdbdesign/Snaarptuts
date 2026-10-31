import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP2_DURATION_MS = 16000;

export async function runStep2(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. My leave
  await tl.at(500);
  tl.showCaption(CAPTIONS.leave);
  await tl.moveCursorTo("[data-tl=btn-view-leave]", { ms: 700 });
  tl.highlight("[data-tl=overview-card-leave]");

  // 2. My sickness
  await tl.at(4200);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.sickness);
  await tl.moveCursorTo("[data-tl=btn-view-sickness]", { ms: 700 });
  tl.highlight("[data-tl=overview-card-sickness]");

  // 3. Objectives
  await tl.at(8000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.goals);
  await tl.moveCursorTo("[data-tl=btn-view-goals]", { ms: 700 });
  tl.highlight("[data-tl=overview-card-objectives]");

  // 4. My tasks
  await tl.at(11800);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.tasks);
  await tl.moveCursorTo("[data-tl=btn-view-tasks]", { ms: 700 });
  tl.highlight("[data-tl=overview-card-tasks]");

  await tl.at(15200);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP2_DURATION_MS);
}
