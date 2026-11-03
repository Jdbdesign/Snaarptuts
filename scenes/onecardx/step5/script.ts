import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP5_DURATION_MS = 10500;

export async function runStep5(tl: Timeline) {
  tl.setVar("ocxPart1Cards", true);
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.75, 0.15]);

  // 1. Click '+ New organization card'
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickNewCard);
  await pressOn(tl, "[data-tl=btn-new-org-card]", { ms: 650 });
  await tl.wait(150);

  // 2. Modal inspection
  await tl.at(3600);
  tl.showCaption(CAPTIONS.modalInspect);
  await hoverOn(tl, "[data-tl=new-card-modal]", { ms: 600 });
  await ring(tl, "[data-tl=new-card-modal]", 2000);

  // 3. Inspect label input
  await tl.at(6800);
  tl.showCaption(CAPTIONS.draftNotice);
  await hoverOn(tl, "[data-tl=input-card-label]", { ms: 550 });
  await ring(tl, "[data-tl=input-card-label]", 2000);

  // 4. Conclude
  await finishOneCardX(tl, STEP5_DURATION_MS);
}
