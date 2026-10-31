import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP21_DURATION_MS = 7500;

export async function runStep21(tl: Timeline) {
  beginWorkforce(tl, URLS.resignation, "resignation", "resignation", [0.12, 0.44]);

  // 1. Click Exit tasks
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickExitTasks);
  await pressOn(tl, "[data-tl=subnav-exit-tasks]", { ms: 600 });
  tl.setVar("wfPage", "exit-tasks");
  tl.setVar("wfSubpage", "exit-tasks");
  tl.setUrl(URLS.exitTasks);
  await tl.wait(250);

  // 2. Ring heading
  await tl.at(2400);
  tl.showCaption(CAPTIONS.heading);
  await hoverOn(tl, "[data-tl=exit-tasks-heading]", { ms: 500 });
  await ring(tl, "[data-tl=exit-tasks-heading]", 1600);

  // 3. Ring empty message
  await tl.at(4500);
  tl.showCaption(CAPTIONS.empty);
  await hoverOn(tl, "[data-tl=exit-tasks-empty]", { ms: 500 });
  await ring(tl, "[data-tl=exit-tasks-empty]", 1600);

  // 4. Finish
  await finishWorkforce(tl, 6700, STEP21_DURATION_MS);
}
