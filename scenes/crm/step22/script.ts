import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, hoverOn } from "@/components/crm/crm-timeline";

export const STEP22_DURATION_MS = 18000;

export async function runStep22(tl: Timeline) {
  beginCrm(tl, "crm-company-info", {
    activeNav: "companies",
    contactsOpen: true,
  });

  // Beat 1: Overview & Company Info
  await tl.at(400);
  tl.showCaption("Access Companies under Contacts to view organization accounts and corporate details.");
  await hoverOn(tl, "[data-tl=crm-company-info-card]", { ms: 600 });
  await tl.wait(2000);

  // Beat 2: Address card
  await tl.at(5500);
  tl.showCaption("Verify official company addresses and primary communication channels.");
  await hoverOn(tl, "[data-tl=crm-company-address-card]", { ms: 600 });
  await tl.wait(2500);

  // Beat 3: Associated Contacts panel
  await tl.at(11000);
  tl.showCaption("Monitor associated contacts linked directly to this corporate account.");
  await hoverOn(tl, "[data-tl=crm-associated-contacts-panel]", { ms: 600 });
  await tl.wait(3000);

  await finishCrm(tl);
}
