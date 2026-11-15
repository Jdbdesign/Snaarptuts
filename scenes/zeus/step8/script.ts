import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  hoverOn,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS, SAMPLE_CONTACTS } from "@/components/zeus/zeus-data";

export const STEP8_DURATION_MS = 14500;

export async function runStep8(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.75, 0.55], 8);

  // Pre-seed state: Jordan Lee drawer open with revealed email & New Leads list present
  tl.setVar("zeusSearchResults", true);
  tl.setVar("zeusCredits", 97);
  tl.setVar("zeusSelectedContact", SAMPLE_CONTACTS[0]);
  tl.setVar("zeusContactRevealed", true);
  tl.setVar("zeusDrawerOpen", true);

  const existingLists = [
    {
      id: "list-2",
      name: "New Leads",
      type: "Static" as const,
      membersCount: 0,
      date: "15/11/2026",
      contacts: [],
    },
    {
      id: "list-1",
      name: "Tech CEO",
      type: "Static" as const,
      membersCount: 0,
      date: "09/10/2026",
      contacts: [],
    },
  ];
  tl.setVar("zeusLists", existingLists);

  // Beat 1: Click Add to List in drawer
  await tl.at(400);
  tl.showCaption("Click Add to List to save Jordan Lee into a specific list.");
  await pressOn(tl, "[data-tl=btn-add-to-list]", { ms: 600 });
  await tl.wait(500);

  // Beat 2: Choose "New Leads"
  await tl.at(2500);
  tl.showCaption("Select \"New Leads\" from the dropdown.");
  await pressOn(tl, "[data-tl=add-to-list-item-new-leads]", { ms: 550 });
  await tl.wait(800);

  // Beat 3: Close drawer
  await tl.at(5200);
  tl.showCaption("Click X to close the contact drawer.");
  await pressOn(tl, "[data-tl=btn-close-drawer]", { ms: 550 });
  await tl.wait(600);

  // Beat 4: Navigate to Lists
  await tl.at(7500);
  tl.showCaption("Click Lists in the left sidebar.");
  await pressOn(tl, "[data-tl=zeus-nav-lists]", { ms: 600 });
  await tl.wait(600);

  // Beat 5: Open New Leads list
  await tl.at(9800);
  tl.showCaption("Click New Leads to view the saved members.");
  await pressOn(tl, "[data-tl=list-item-new-leads]", { ms: 550 });
  await tl.wait(600);

  // Beat 6: Inspect Jordan Lee in list
  await tl.at(12000);
  tl.showCaption("Jordan Lee is now organized in your New Leads list.");
  await hoverOn(tl, "[data-tl=list-member-row-jordan]", { ms: 500 });
  await tl.wait(800);

  // Finish
  await tl.at(13800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
