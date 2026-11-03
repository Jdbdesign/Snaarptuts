import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP30_DURATION_MS = 7500;

export async function runStep30(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.45]);
  tl.setVar("ocxEngTeamPublished", true);
  tl.setVar("ocxPublishedCount", 3);
  tl.setVar("ocxToast", null);

  // 1. Click ID Cards in sidebar
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickIdCards, { target: "[data-tl=nav-id-cards]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=nav-id-cards]", { ms: 600 });
  await tl.click("[data-tl=nav-id-cards]");
  tl.setUrl(URLS.idCards);
  tl.setVar("ocxPage", "idCards");
  await tl.wait(200);

  // 2. Highlight cards collection
  await tl.at(3000);
  tl.showCaption(CAPTIONS.cardsCollection, { target: "[data-tl=idcard-item-engineering-team]" });
  await hoverOn(tl, "[data-tl=idcard-item-engineering-team]", { ms: 600 });
  await ring(tl, "[data-tl=idcard-item-engineering-team]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP30_DURATION_MS);
}
