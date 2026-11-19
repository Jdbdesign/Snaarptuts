import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP1_DURATION_MS = 14000;

export async function runStep1(tl: Timeline) {
  beginCrm(tl, "crm-overview", { activeNav: "home" });

  // Beat 1: Overview introduction
  await tl.at(400);
  tl.showCaption("Welcome to Snaarp CRM. Start by reviewing your overall metrics on the Home dashboard.");
  await tl.wait(1800);

  // Beat 2: Inspect Contacts KPI card
  await tl.at(2500);
  tl.showCaption("Monitor your total customer contacts and pipeline engagements.");
  await hoverOn(tl, "[data-tl=crm-metric-contacts]", { ms: 650 });
  tl.highlight("[data-tl=crm-metric-contacts]");
  await tl.wait(2000);
  tl.clearHighlight();

  // Beat 3: Inspect Deals KPI card
  await tl.at(5500);
  tl.showCaption("Track active deals, conversion status, and overall pipeline velocity.");
  await hoverOn(tl, "[data-tl=crm-metric-deals]", { ms: 650 });
  tl.highlight("[data-tl=crm-metric-deals]");
  await tl.wait(2000);
  tl.clearHighlight();

  // Beat 4: Navigate to Dashboards
  await tl.at(8500);
  tl.showCaption("Click Dashboards in the sidebar to view team performance and custom charts.");
  await pressOn(tl, "[data-tl=crm-nav-dashboards]", { ms: 700 });
  tl.setVar("crm:activeNav", "dashboards");
  await tl.wait(2000);

  // Beat 5: Finish
  await finishCrm(tl);
}
