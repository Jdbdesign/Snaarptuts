import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP12_DURATION_MS = 21000;

export async function runStep12(tl: Timeline) {
  beginCrm(tl, "crm-list-view", {
    activeNav: "prospects",
    salesOpen: true,
    hasImported: true,
    prospectsViewMode: "kanban",
    sortOption: "Most recent",
  });

  // Beat 1: Switch to List view
  await tl.at(400);
  tl.showCaption("Click List to view all prospects in a structured table layout.");
  await pressOn(tl, "[data-tl=crm-view-list]", { ms: 600 });
  tl.setVar("crm:prospectsViewMode", "list");
  await tl.wait(400);

  // Beat 2: Open Sort Dropdown
  await tl.at(3200);
  tl.showCaption("Open the sorting dropdown to organize your leads.");
  await pressOn(tl, "[data-tl=crm-sort-dropdown]", { ms: 550 });
  tl.setVar("crm:isSortOpen", true);
  await tl.wait(300);

  // Beat 3: Select Name (A-Z)
  await tl.at(5800);
  tl.showCaption("Select Name (A-Z) to sort prospects alphabetically.");
  await pressOn(tl, "[data-tl=crm-sort-option-name-az]", { ms: 500 });
  tl.setVar("crm:sortOption", "Name (A-Z)");
  tl.setVar("crm:isSortOpen", false);
  await tl.wait(800);

  // Beat 4: Open Sort Dropdown again
  await tl.at(9200);
  tl.showCaption("Open the sorting dropdown again.");
  await pressOn(tl, "[data-tl=crm-sort-dropdown]", { ms: 550 });
  tl.setVar("crm:isSortOpen", true);
  await tl.wait(300);

  // Beat 5: Select Name (Z-A)
  await tl.at(11800);
  tl.showCaption("Select Name (Z-A) to reverse the alphabetical order.");
  await pressOn(tl, "[data-tl=crm-sort-option-name-za]", { ms: 500 });
  tl.setVar("crm:sortOption", "Name (Z-A)");
  tl.setVar("crm:isSortOpen", false);
  await tl.wait(800);

  // Beat 6: Return to Kanban view
  await tl.at(15000);
  tl.showCaption("Click Kanban to return to the pipeline stage board.");
  await pressOn(tl, "[data-tl=crm-view-kanban]", { ms: 600 });
  tl.setVar("crm:prospectsViewMode", "kanban");
  await tl.wait(600);

  // Beat 7: Observe Kanban with Z-A sorting
  await tl.at(17800);
  tl.showCaption("The Kanban stage columns preserve your reverse alphabetical sort order.");
  await hoverOn(tl, "[data-tl=crm-kanban-board]", { ms: 600 });

  await finishCrm(tl);
}
