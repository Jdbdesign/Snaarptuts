import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP3_DURATION_MS = 15000;

export async function runStep3(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Tasks tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.tasks);
  await tl.moveCursorTo("[data-tl=tab-tasks]", { ms: 600 });
  tl.highlight("[data-tl=card-tasks-requests]");

  await tl.at(2500);
  await tl.moveCursorTo("[data-tl=task-item-t1]", { ms: 600 });

  // 2. Leave tab
  await tl.at(5000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.leave);
  await tl.moveCursorTo("[data-tl=tab-leave]", { ms: 600 });
  await tl.click("[data-tl=tab-leave]");
  tl.setVar("wfActiveTaskTab", "leave");
  await tl.wait(100);
  tl.highlight("[data-tl=leave-item-l1]");

  // 3. Sickness tab
  await tl.at(9500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.sickness);
  await tl.moveCursorTo("[data-tl=tab-sickness]", { ms: 600 });
  await tl.click("[data-tl=tab-sickness]");
  tl.setVar("wfActiveTaskTab", "sickness");
  await tl.wait(100);
  tl.highlight("[data-tl=sickness-empty]");

  await tl.at(14000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP3_DURATION_MS);
}
