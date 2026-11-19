import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP6_DURATION_MS = 25000;

export async function runStep6(tl: Timeline) {
  beginCrm(tl, "crm-prospects", {
    activeNav: "dashboards",
    salesOpen: false,
    prospectsViewMode: "kanban",
    sortOption: "Most recent",
  });

  // Beat 1: Click Sales in sidebar to expand subitems
  await tl.at(400);
  tl.showCaption("Click Sales in the sidebar to expand your pipeline navigation.");
  await pressOn(tl, "[data-tl=crm-nav-sales]", { ms: 650 });
  tl.setVar("crm:salesOpen", true);
  await tl.wait(400);

  // Beat 2: Click Prospects
  await tl.at(2500);
  tl.showCaption("Click Prospects to view all leads in your active sales pipeline.");
  await pressOn(tl, "[data-tl=crm-nav-prospects]", { ms: 600 });
  tl.setVar("crm:activeNav", "sales");
  await tl.wait(600);

  // Beat 3: Inspect Kanban columns
  await tl.at(4500);
  tl.showCaption("Track deals through stages like Event Leads, Lead, and Proposal on the Kanban board.");
  await hoverOn(tl, "[data-tl=crm-kanban-board]", { ms: 700 });
  await tl.wait(2000);

  // Beat 4: Switch to List view
  await tl.at(7800);
  tl.showCaption("Click List to view prospects in a dense tabular layout with inline stage dropdowns.");
  await pressOn(tl, "[data-tl=crm-view-list]", { ms: 600 });
  tl.setVar("crm:prospectsViewMode", "list");
  await tl.wait(2000);

  // Beat 5: Switch to Grid view
  await tl.at(11500);
  tl.showCaption("Click Grid to view prospects as visual cards with stage selectors.");
  await pressOn(tl, "[data-tl=crm-view-grid]", { ms: 600 });
  tl.setVar("crm:prospectsViewMode", "grid");
  await tl.wait(2000);

  // Beat 6: Switch back to Kanban
  await tl.at(15000);
  tl.showCaption("Click Kanban to return to the stage column board.");
  await pressOn(tl, "[data-tl=crm-view-kanban]", { ms: 600 });
  tl.setVar("crm:prospectsViewMode", "kanban");
  await tl.wait(800);

  // Beat 7: Open sort dropdown
  await tl.at(17500);
  tl.showCaption("Click the sort menu to change prospect ordering.");
  await pressOn(tl, "[data-tl=crm-sort-dropdown]", { ms: 600 });
  tl.setVar("crm:isSortOpen", true);
  await tl.wait(500);

  // Beat 8: Select Name (A-Z)
  await tl.at(20000);
  tl.showCaption("Select Name (A-Z) to sort prospects alphabetically.");
  await pressOn(tl, "[data-tl=crm-sort-option-name-az]", { ms: 550 });
  tl.setVar("crm:sortOption", "Name (A-Z)");
  tl.setVar("crm:isSortOpen", false);
  await tl.wait(1800);

  // Beat 9: Finish
  await finishCrm(tl);
}
