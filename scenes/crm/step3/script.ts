import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";
import { INITIAL_DASHBOARDS, type CrmDashboardItem } from "@/components/crm/crm-data";

export const STEP3_DURATION_MS = 16000;

export async function runStep3(tl: Timeline) {
  beginCrm(tl, "crm-create-dashboard", {
    activeNav: "dashboards",
    activeDashboardId: "my-dashboard",
  });

  // Beat 1: Click the '+' icon to create a new dashboard
  await tl.at(400);
  tl.showCaption("Click the plus icon in the Dashboards menu to create a new custom dashboard.");
  await pressOn(tl, "[data-tl=crm-btn-new-dashboard]", { ms: 650 });
  tl.setVar("crm:isNewModalOpen", true);
  await tl.wait(400);

  // Beat 2: Type dashboard name
  await tl.at(2800);
  tl.showCaption("Enter a name for your custom dashboard.");
  await pressOn(tl, "[data-tl=crm-dashboard-name-input]", { ms: 500, ring: false });
  await tl.typeText("dashboard-name-input", "Client Leads", { msPerChar: 60 });
  await tl.wait(600);

  // Beat 3: Click Create button
  await tl.at(6200);
  tl.showCaption("Click Create to generate the new dashboard.");
  await pressOn(tl, "[data-tl=crm-create-dashboard-btn]", { ms: 600 });

  const currentDashboards = tl.getVar<CrmDashboardItem[]>("crm:dashboards", INITIAL_DASHBOARDS);
  const nextDashboards = [
    ...currentDashboards.filter((d) => d.id !== "client-leads"),
    {
      id: "client-leads",
      name: "Client Leads",
      widgetCount: 0,
      lastUpdated: "11/19/2026",
      isCustom: true,
    },
  ];
  tl.setVar("crm:dashboards", nextDashboards);
  tl.setVar("crm:activeDashboardId", "client-leads");
  tl.setVar("crm:isNewModalOpen", false);
  pushCrmToast(tl, "Dashboard created successfully");
  await tl.wait(800);

  // Beat 4: Inspect empty state
  await tl.at(9200);
  tl.showCaption("Your new dashboard is created. You can now add charts, KPI cards, and custom widgets.");
  await hoverOn(tl, "[data-tl=crm-btn-add-first-widget]", { ms: 700 });
  tl.highlight("[data-tl=crm-btn-add-first-widget]");
  await tl.wait(2200);
  tl.clearHighlight();

  // Beat 5: Finish
  await finishCrm(tl);
}
