import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";
import { INITIAL_DASHBOARDS, type CrmDashboardItem } from "@/components/crm/crm-data";

export const STEP5_DURATION_MS = 20000;

export async function runStep5(tl: Timeline) {
  const customDashboards: CrmDashboardItem[] = [
    ...INITIAL_DASHBOARDS,
    {
      id: "client-leads",
      name: "Client Leads",
      widgetCount: 6,
      lastUpdated: "11/19/2026",
      isCustom: true,
    },
  ];

  beginCrm(tl, "crm-share-tv", {
    activeNav: "dashboards",
    activeDashboardId: "client-leads",
    dashboards: customDashboards,
    customDashboardWidgets: ["kpi-1", "bar-chart", "kpi-2", "pie-chart", "line-chart", "table"],
    isCustomSaved: true,
  });

  // Beat 1: Click Share button
  await tl.at(400);
  tl.showCaption("Click Share to adjust role-based visibility for this dashboard.");
  await pressOn(tl, "[data-tl=crm-btn-share-dashboard]", { ms: 650 });
  tl.setVar("crm:isShareModalOpen", true);
  await tl.wait(400);

  // Beat 2: Select role in modal
  await tl.at(2600);
  tl.showCaption("Choose which roles in your organization can view this dashboard.");
  await pressOn(tl, "[data-tl=crm-share-role-everyone-in-organization]", { ms: 550 });
  tl.setVar("crm:shareRole", "Everyone in organization");
  await tl.wait(400);

  // Beat 3: Save share settings
  await tl.at(5200);
  tl.showCaption("Click Save to apply sharing permissions.");
  await pressOn(tl, "[data-tl=crm-btn-save-share]", { ms: 600 });
  tl.setVar("crm:isShareModalOpen", false);
  pushCrmToast(tl, "Sharing updated");
  await tl.wait(800);

  // Beat 4: Click TV Mode
  await tl.at(8200);
  tl.showCaption("Click TV Mode to enter a high-contrast full-screen presentation view.");
  await pressOn(tl, "[data-tl=crm-btn-tv-mode]", { ms: 650 });
  tl.setVar("crm:isTvMode", true);
  await tl.wait(800);

  // Beat 5: Inspect TV Mode
  await tl.at(11000);
  tl.showCaption("TV Mode provides an auto-refreshing wall display designed for office screens and live monitoring.");
  await hoverOn(tl, "[data-tl=crm-tv-pause-btn]", { ms: 600 });
  await tl.wait(2200);

  // Beat 6: Exit TV Mode
  await tl.at(14800);
  tl.showCaption("Click Exit TV Mode to return to your standard dashboard.");
  await pressOn(tl, "[data-tl=crm-btn-exit-tv-mode]", { ms: 650 });
  tl.setVar("crm:isTvMode", false);
  await tl.wait(1500);

  // Beat 7: Finish
  await finishCrm(tl);
}
