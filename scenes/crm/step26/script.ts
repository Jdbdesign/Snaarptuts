import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP26_DURATION_MS = 18000;

export async function runStep26(tl: Timeline) {
  beginCrm(tl, "crm-analytics", {
    activeNav: "analytics",
    analyticsDateFilter: "Last 30 days",
    isAnalyticsDateOpen: false,
  });

  // Beat 1: Overview & KPI cards
  await tl.at(400);
  tl.showCaption("Navigate to Analytics to monitor high-level sales KPIs and business performance metrics.");
  await hoverOn(tl, "[data-tl=crm-kpi-contacts]", { ms: 600 });
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=crm-kpi-deals]", { ms: 500 });
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=crm-kpi-conversion]", { ms: 500 });
  await tl.wait(1500);

  // Beat 2: Charts
  await tl.at(5800);
  tl.showCaption("Review conversion rate trajectories, contact growth volume, and pipeline value trending.");
  await hoverOn(tl, "[data-tl=crm-chart-conversion]", { ms: 600 });
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=crm-chart-contact-growth]", { ms: 600 });
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=crm-chart-pipeline-trending]", { ms: 600 });
  await tl.wait(2000);

  // Beat 3: Date range filter
  await tl.at(12500);
  tl.showCaption("Filter performance data by date range to track metrics across custom time windows.");
  await pressOn(tl, "[data-tl=crm-analytics-date-filter]");
  await tl.wait(1200);
  await hoverOn(tl, "[data-tl=crm-analytics-date-opt-last-7-days]", { ms: 500 });
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-analytics-date-opt-last-30-days]");
  await tl.wait(1500);

  await finishCrm(tl);
}
