import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP15_DATA } from "./data";

export const STEP15_DURATION_MS = STEP15_DATA.durationMs;

export async function runStep15(tl: Timeline) {
  beginMe(tl, ME_URLS.workflows, "workflows", [0.45, 0.35], 15);

  // Beat 1: Click + New Workflow
  await tl.at(400);
  tl.showCaption(STEP15_DATA.captions.clickNew);
  await pressOn(tl, "[data-tl=me-workflows-new-btn]", { ms: 650 });
  await tl.wait(600);

  // Beat 2: Choose template
  await tl.at(2500);
  tl.showCaption(STEP15_DATA.captions.chooseTemplate);
  await hoverOn(tl, "[data-tl=me-template-card-tpl-notify-me]", { ms: 600, ring: true });
  await tl.wait(600);
  await pressOn(tl, "[data-tl=me-template-use-tpl-notify-me]", { ms: 500 });
  await tl.wait(600);

  // Beat 3: Review Steps
  await tl.at(5600);
  tl.showCaption(STEP15_DATA.captions.reviewSteps);
  await hoverOn(tl, "[data-tl=me-editor-subject-input]", { ms: 600, ring: true });
  await tl.wait(1800);

  // Beat 4: Click Create Workflow
  await tl.at(8400);
  tl.showCaption(STEP15_DATA.captions.clickCreate);
  await pressOn(tl, "[data-tl=me-editor-create-btn]", { ms: 650 });
  await tl.wait(800);

  // Beat 5: Created banner & card
  await tl.at(10800);
  tl.showCaption(STEP15_DATA.captions.created);
  await hoverOn(tl, "[data-tl=me-workflow-card-notify-me]", { ms: 600, ring: true });
  await tl.wait(1600);

  // Finish
  await tl.at(13200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
