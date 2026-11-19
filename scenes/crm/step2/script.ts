import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP2_DURATION_MS = 14500;

export async function runStep2(tl: Timeline) {
  beginCrm(tl, "crm-dashboards", {
    activeNav: "dashboards",
    activeDashboardId: "pr-sales",
  });

  // Beat 1: Intro to dashboards subnav
  await tl.at(400);
  tl.showCaption("In Dashboards, switch between team and custom dashboards in the left subnav.");
  await hoverOn(tl, "[data-tl=crm-dash-tab-pr-sales]", { ms: 600 });
  tl.highlight("[data-tl=crm-dash-tab-pr-sales]");
  await tl.wait(1800);
  tl.clearHighlight();

  // Beat 2: Click My Dashboard
  await tl.at(3200);
  tl.showCaption("Click My Dashboard to view your personalized analytics.");
  await pressOn(tl, "[data-tl=crm-dash-tab-my-dashboard]", { ms: 650 });
  tl.setVar("crm:activeDashboardId", "my-dashboard");
  await tl.wait(500);

  // Beat 3: Inspect populated widgets grid
  await tl.at(5600);
  tl.showCaption("Review your pre-built layout featuring KPI cards, bar charts, line graphs, and source distributions.");
  await hoverOn(tl, "[data-tl=crm-my-dashboard-grid]", { ms: 750 });
  tl.highlight("[data-tl=crm-my-dashboard-grid]");
  await tl.wait(2500);
  tl.clearHighlight();

  // Beat 4: Finish
  await finishCrm(tl);
}
