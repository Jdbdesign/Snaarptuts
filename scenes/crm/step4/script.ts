import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, pushCrmToast } from "@/components/crm/crm-timeline";
import { INITIAL_DASHBOARDS, type CrmDashboardItem } from "@/components/crm/crm-data";

export const STEP4_DURATION_MS = 24000;

export async function runStep4(tl: Timeline) {
  const customDashboards: CrmDashboardItem[] = [
    ...INITIAL_DASHBOARDS,
    {
      id: "client-leads",
      name: "Client Leads",
      widgetCount: 0,
      lastUpdated: "11/19/2026",
      isCustom: true,
    },
  ];

  beginCrm(tl, "crm-add-widgets", {
    activeNav: "dashboards",
    activeDashboardId: "client-leads",
    dashboards: customDashboards,
    customDashboardWidgets: [],
    isCustomSaved: false,
  });

  // Beat 1: Click Add First Widget
  await tl.at(400);
  tl.showCaption("Click Add First Widget to open the widget catalog.");
  await pressOn(tl, "[data-tl=crm-btn-add-first-widget]", { ms: 650 });
  tl.setVar("crm:isAddWidgetsOpen", true);
  await tl.wait(400);

  // Beat 2: Select initial widgets (Bar Chart, Line Chart, KPI Card, Table)
  await tl.at(2500);
  tl.showCaption("Select multiple widgets from the catalog: Bar Chart, Line Chart, KPI Card, and Table.");
  await pressOn(tl, "[data-tl=crm-widget-opt-bar-chart]", { ms: 500 });
  tl.setVar("crm:selectedWidgets", ["bar-chart"]);
  await tl.wait(250);

  await pressOn(tl, "[data-tl=crm-widget-opt-line-chart]", { ms: 450 });
  tl.setVar("crm:selectedWidgets", ["bar-chart", "line-chart"]);
  await tl.wait(250);

  await pressOn(tl, "[data-tl=crm-widget-opt-kpi-card]", { ms: 450 });
  tl.setVar("crm:selectedWidgets", ["bar-chart", "line-chart", "kpi-card"]);
  await tl.wait(250);

  await pressOn(tl, "[data-tl=crm-widget-opt-table]", { ms: 450 });
  tl.setVar("crm:selectedWidgets", ["bar-chart", "line-chart", "kpi-card", "table"]);
  await tl.wait(400);

  // Beat 3: Confirm adding widgets
  await tl.at(7200);
  tl.showCaption("Click Add Widgets to insert the selected cards into your layout.");
  await pressOn(tl, "[data-tl=crm-btn-confirm-add-widgets]", { ms: 600 });
  tl.setVar("crm:customDashboardWidgets", ["kpi-1", "bar-chart", "line-chart", "table"]);
  tl.setVar("crm:isAddWidgetsOpen", false);
  tl.setVar("crm:selectedWidgets", []);
  await tl.wait(800);

  // Beat 4: Add Pie Chart & 2nd KPI card
  await tl.at(10500);
  tl.showCaption("Click Add Widget in the top right to browse the catalog again.");
  await pressOn(tl, "[data-tl=crm-btn-add-widget]", { ms: 650 });
  tl.setVar("crm:isAddWidgetsOpen", true);
  await tl.wait(400);

  tl.showCaption("Select Pie Chart to visualize lead sources.");
  await pressOn(tl, "[data-tl=crm-widget-opt-pie-chart]", { ms: 500 });
  tl.setVar("crm:selectedWidgets", ["pie-chart"]);
  await tl.wait(300);

  await pressOn(tl, "[data-tl=crm-btn-confirm-add-widgets]", { ms: 600 });
  tl.setVar("crm:customDashboardWidgets", ["kpi-1", "bar-chart", "kpi-2", "pie-chart", "line-chart", "table"]);
  tl.setVar("crm:isAddWidgetsOpen", false);
  tl.setVar("crm:selectedWidgets", []);
  await tl.wait(800);

  // Beat 5: Save Changes
  await tl.at(16500);
  tl.showCaption("Click Save Changes to persist your custom dashboard layout.");
  await pressOn(tl, "[data-tl=crm-btn-save-dashboard]", { ms: 650 });
  tl.setVar("crm:isCustomSaved", true);
  pushCrmToast(tl, "Dashboard saved successfully");
  await tl.wait(2000);

  // Beat 6: Finish
  await finishCrm(tl);
}
