import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP29_DURATION_MS = 7500;

export async function runStep29(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.45]);
  tl.setVar("ocxEngTeamPublished", false);
  tl.setVar("ocxPublishedCount", 2);
  tl.setVar("ocxToast", null);

  // 1. Click Publish to everyone on Engineering Team
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickPublish, { target: "[data-tl=btn-publish-engineering-team]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-publish-engineering-team]", { ms: 600 });
  await tl.click("[data-tl=btn-publish-engineering-team]");
  tl.setVar("ocxEngTeamPublished", true);
  tl.setVar("ocxPublishedCount", 3);
  tl.setVar("ocxToast", "Card published to everyone in your organization");
  await tl.wait(200);

  // 2. Highlight published status and toast
  await tl.at(3000);
  tl.showCaption(CAPTIONS.cardPublished, { target: "[data-tl=stat-published-cards]" });
  await hoverOn(tl, "[data-tl=stat-published-cards]", { ms: 600 });
  await ring(tl, "[data-tl=stat-published-cards]", 1800);

  // 3. Clear toast towards end
  await tl.at(6000);
  tl.setVar("ocxToast", null);

  // 4. Finish
  await finishOneCardX(tl, STEP29_DURATION_MS);
}
