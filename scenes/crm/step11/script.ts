import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";
import { POST_IMPORT_PROSPECTS, type ProspectItem } from "@/components/crm/crm-data";

export const STEP11_DURATION_MS = 20500;

export async function runStep11(tl: Timeline) {
  beginCrm(tl, "crm-edit-close", {
    activeNav: "prospects",
    salesOpen: true,
    hasImported: true,
  });

  // Beat 1: Open menu and click Edit Client
  await tl.at(400);
  tl.showCaption("Click the actions menu on Alex Morgan.");
  await pressOn(tl, "[data-tl=crm-card-dots-prospect-alex]", { ms: 550 });
  tl.setVar("crm:activeProspectMenuId", "prospect-alex");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=crm-menu-edit-client]", { ms: 500 });
  tl.setVar("crm:isEditClientOpen", true);
  tl.setVar("crm:activeProspectMenuId", null);
  await tl.wait(400);

  // Beat 2: Scroll down in Edit Client modal
  await tl.at(3800);
  tl.showCaption("Scroll down to review deal value, priority, and stage history.");
  await tl.scrollPanelTo("[data-tl=crm-edit-client-body]", 320, 600);
  await tl.wait(800);

  // Beat 3: Click Save Changes
  await tl.at(6800);
  tl.showCaption("Click Save Changes to update client records.");
  await pressOn(tl, "[data-tl=crm-edit-client-save]", { ms: 550 });
  tl.setVar("crm:isEditClientOpen", false);
  pushCrmToast(tl, "Prospect updated");
  await tl.wait(600);

  // Beat 4: Open menu and click Close Deal (Won)
  await tl.at(9800);
  tl.showCaption("Open the actions menu and click Close Deal (Won).");
  await pressOn(tl, "[data-tl=crm-card-dots-prospect-alex]", { ms: 550 });
  tl.setVar("crm:activeProspectMenuId", "prospect-alex");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=crm-menu-close-won]", { ms: 500 });
  tl.setVar("crm:isCloseWonOpen", true);
  tl.setVar("crm:activeProspectMenuId", null);
  await tl.wait(400);

  // Beat 5: Confirm Close Deal (Won)
  await tl.at(13500);
  tl.showCaption("Click Mark as Won to close the deal and celebrate the win.");
  await pressOn(tl, "[data-tl=crm-close-won-confirm]", { ms: 600 });
  const currentList = tl.getVar<ProspectItem[]>("crm:prospects", POST_IMPORT_PROSPECTS);
  const updated = currentList.map((p) =>
    p.id === "prospect-alex" ? { ...p, status: "won" as const } : p
  );
  tl.setVar("crm:prospects", updated);
  tl.setVar("crm:isCloseWonOpen", false);
  pushCrmToast(tl, "Deal closed as won");
  await tl.wait(600);

  // Beat 6: Observe pipeline update
  await tl.at(16800);
  tl.showCaption("The deal is marked as won and moved out of the open pipeline.");
  await hoverOn(tl, "[data-tl=crm-prospects-count]", { ms: 500 });

  await finishCrm(tl);
}
