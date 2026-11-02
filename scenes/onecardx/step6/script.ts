import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP6_DURATION_MS = 10000;

export async function runStep6(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.5, 0.45]);
  tl.setVar("ocxNewCardModalOpen", true);

  // 1. Focus & type "Engineering Team"
  await tl.at(600);
  tl.showCaption(CAPTIONS.typeLabel);
  await tl.moveCursorTo("[data-tl=input-card-label]", { ms: 600 });
  await tl.click("[data-tl=input-card-label]");
  await tl.typeText("card-label", "Engineering Team", { msPerChar: 70 });
  await tl.wait(400);

  // 2. Click 'Create card and open editor'
  await tl.at(3800);
  tl.showCaption(CAPTIONS.clickCreate);
  await pressOn(tl, "[data-tl=btn-create-card-editor]", { ms: 600 });
  await tl.wait(300);

  // 3. Inspect opened editor
  await tl.at(6500);
  tl.showCaption(CAPTIONS.editorOpened);
  await ring(tl, "[data-tl=card-live-preview]", 2200);

  // 4. Conclude
  await finishOneCardX(tl, STEP6_DURATION_MS);
}
