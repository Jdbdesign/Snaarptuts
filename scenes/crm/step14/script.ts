import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP14_DURATION_MS = 22000;

export async function runStep14(tl: Timeline) {
  beginCrm(tl, "crm-won-lost", {
    activeNav: "won",
    salesOpen: true,
    wonDealsViewMode: "list",
    isStatusDropdownOpen: false,
  });

  // Beat 1: Won Deals in List view
  await tl.at(400);
  tl.showCaption("Navigate to Won Deals to view successfully closed revenue and finalized customer accounts.");
  await hoverOn(tl, "[data-tl=crm-deals-table-container]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Open Status dropdown on first deal
  await tl.at(3800);
  tl.showCaption("Click the status dropdown to view options for managing or reopening closed deals.");
  await pressOn(tl, "[data-tl=crm-status-dropdown-won-1]", { ms: 600 });
  tl.setVar("crm:isStatusDropdownOpen", true);
  await tl.wait(600);

  // Beat 3: Inspect Reopen options
  await tl.at(7200);
  tl.showCaption("Closed deals can be reopened back into any active stage of the sales pipeline if discussions resume.");
  await hoverOn(tl, "[data-tl=crm-status-option-Interested]", { ms: 600 });
  await tl.wait(1000);
  tl.setVar("crm:isStatusDropdownOpen", false);
  await tl.wait(400);

  // Beat 4: Switch to Grid view
  await tl.at(10500);
  tl.showCaption("Switch to Grid view to see won deals as visual cards with key metrics and customer initials.");
  await pressOn(tl, "[data-tl=crm-deals-view-grid]", { ms: 600 });
  tl.setVar("crm:wonDealsViewMode", "grid");
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-deals-grid-container]", { ms: 700 });
  await tl.wait(1200);

  // Beat 5: Navigate to Lost Deals
  await tl.at(14800);
  tl.showCaption("Navigate to Lost Deals to review lost opportunities and analyze disqualification reasons.");
  await pressOn(tl, "[data-tl=crm-nav-lost]", { ms: 600 });
  tl.setVar("crm:activeNav", "lost");
  tl.setVar("crm:lostDealsViewMode", "grid");
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=crm-deals-grid-container]", { ms: 700 });

  await finishCrm(tl);
}
