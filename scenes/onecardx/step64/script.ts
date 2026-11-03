import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP64_DURATION_MS = 5500;

export async function runStep64(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.1, 0.52]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactSaved", true);

  // 1. Click Analytics in sidebar
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickAnalytics);
  await hoverOn(tl, "[data-tl=nav-analytics]", { ms: 600 });
  await pressOn(tl, "[data-tl=nav-analytics]", { ms: 300 });
  tl.setUrl(URLS.analytics);
  tl.setVar("ocxPage", "analytics");
  await tl.wait(200);

  // 2. Highlight Total Views & Overview
  await tl.at(2200);
  tl.showCaption(CAPTIONS.dashboardOverview);
  await hoverOn(tl, "[data-tl=stat-total-views]", { ms: 600 });
  await ring(tl, "[data-tl=stat-total-views]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP64_DURATION_MS);
}
