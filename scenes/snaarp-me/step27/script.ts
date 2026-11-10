import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP27_DATA } from "./data";

export const STEP27_DURATION_MS = STEP27_DATA.durationMs;

export async function runStep27(tl: Timeline) {
  beginMe(tl, ME_URLS.analytics, "analytics", [0.45, 0.35], 27);

  // Beat 1: Intro to Analytics
  await tl.at(400);
  tl.showCaption(STEP27_DATA.captions.welcome);
  await hoverOn(tl, "[data-tl=me-analytics-filter-card]", { ms: 600, ring: true });
  await tl.wait(1200);

  // Beat 2: Review Stat Cards
  await tl.at(2400);
  tl.showCaption(STEP27_DATA.captions.stats);
  await hoverOn(tl, "[data-tl=me-stat-total-bookings]", { ms: 500, ring: true });
  await tl.wait(1600);

  // Beat 3: Click 7 Days
  await tl.at(4800);
  tl.showCaption(STEP27_DATA.captions.filterPeriod);
  await pressOn(tl, "[data-tl=me-analytics-period-7d]", { ms: 600 });
  await tl.wait(800);

  // Switch back to Today
  await tl.at(6800);
  await pressOn(tl, "[data-tl=me-analytics-period-today]", { ms: 500 });
  await tl.wait(600);

  // Beat 4: Open Source Dropdown
  await tl.at(8200);
  tl.showCaption(STEP27_DATA.captions.filterSource);
  await pressOn(tl, "[data-tl=me-analytics-source-btn]", { ms: 600 });
  await tl.wait(800);

  // Select All Sources
  await tl.at(9800);
  await pressOn(tl, "[data-tl=me-analytics-source-all]", { ms: 500 });
  await tl.wait(600);

  // Beat 5: Scroll to charts & heatmap
  await tl.at(11200);
  tl.showCaption(STEP27_DATA.captions.charts);
  await hoverOn(tl, "[data-tl=me-analytics-popular-time-slots]", { ms: 600, ring: true });
  await tl.wait(1600);

  // Finish
  await tl.at(13800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1500);
}
