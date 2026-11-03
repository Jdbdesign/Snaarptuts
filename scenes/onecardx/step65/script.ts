import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP65_DURATION_MS = 6500;

export async function runStep65(tl: Timeline) {
  beginOneCardX(tl, URLS.analytics, "analytics", [0.5, 0.35]);
  tl.setVar("ocxAnalyticsScrollY", 0);
  tl.setVar("ocxAnalyticsHeatmapTooltip", null);
  tl.setVar("ocxAnalyticsHoveredRow", null);

  // 1. Scroll page down
  await tl.at(400);
  tl.showCaption(CAPTIONS.scrollAnalytics);
  tl.setVar("ocxAnalyticsScrollY", 260);
  await tl.wait(400);

  // 2. Hover heatmap cell
  await tl.at(1400);
  tl.showCaption(CAPTIONS.hoverHeatmap);
  await hoverOn(tl, "[data-tl=heatmap-cell-sun-18]", { ms: 600 });
  tl.setVar("ocxAnalyticsHeatmapTooltip", "Sun 18:00 - 12 views");
  await tl.wait(1500);
  tl.setVar("ocxAnalyticsHeatmapTooltip", null);

  // 3. Hover card breakdown rows
  await tl.at(3800);
  tl.showCaption(CAPTIONS.hoverCardRows);
  await hoverOn(tl, "[data-tl=row-card-id-card]", { ms: 600 });
  tl.setVar("ocxAnalyticsHoveredRow", 2);
  await tl.wait(800);

  await hoverOn(tl, "[data-tl=row-card-business-card]", { ms: 600 });
  tl.setVar("ocxAnalyticsHoveredRow", 3);
  await tl.wait(800);

  // 4. Finish
  await finishOneCardX(tl, STEP65_DURATION_MS);
}
