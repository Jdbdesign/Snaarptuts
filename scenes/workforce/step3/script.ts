import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP3_DURATION_MS = 15000;

export async function runStep3(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Tasks tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.tasks);
  await pressOn(tl, "[data-tl=tab-tasks]", { ms: 600 });
  tl.setVar("wfActiveTaskTab", "tasks");
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=task-item-t1]", { ms: 600 });
  await ring(tl, "[data-tl=task-item-t1]", 1600);

  // 2. Leave tab
  await tl.at(5000);
  tl.showCaption(CAPTIONS.leave);
  await pressOn(tl, "[data-tl=tab-leave]", { ms: 600 });
  tl.setVar("wfActiveTaskTab", "leave");
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=leave-item-l1]", { ms: 600 });
  await ring(tl, "[data-tl=leave-item-l1]", 1600);

  // 3. Sickness tab
  await tl.at(9500);
  tl.showCaption(CAPTIONS.sickness);
  await pressOn(tl, "[data-tl=tab-sickness]", { ms: 600 });
  tl.setVar("wfActiveTaskTab", "sickness");
  await tl.wait(250);
  await ring(tl, "[data-tl=sickness-empty]", 1600);

  // 4. End fade
  await finishWorkforce(tl, 13800, STEP3_DURATION_MS);
}
