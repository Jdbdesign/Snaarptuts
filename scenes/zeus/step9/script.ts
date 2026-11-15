import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  hoverOn,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS, SAMPLE_CONTACTS } from "@/components/zeus/zeus-data";

export const STEP9_DURATION_MS = 11500;

export async function runStep9(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.lists, "lists", [0.45, 0.25], 9);

  // Pre-seed state with Tech CEO and New Leads
  const lists = [
    {
      id: "list-1",
      name: "Tech CEO",
      type: "Static" as const,
      membersCount: 0,
      date: "09/10/2026",
      contacts: [],
    },
    {
      id: "list-2",
      name: "New Leads",
      type: "Static" as const,
      membersCount: 1,
      date: "15/11/2026",
      contacts: [SAMPLE_CONTACTS[0]],
    },
  ];
  tl.setVar("zeusLists", lists);
  tl.setVar("zeusSelectedListId", "list-1");
  tl.setVar("zeusCredits", 97);

  // Beat 1: Review Tech CEO empty list
  await tl.at(400);
  tl.showCaption("Review the empty \"Tech CEO\" list before deleting it.");
  await hoverOn(tl, "[data-tl=selected-list-title]", { ms: 550 });
  await tl.wait(1000);

  // Beat 2: Click Delete list button
  await tl.at(2500);
  tl.showCaption("Click Delete to remove this list from your workspace.");
  await pressOn(tl, "[data-tl=btn-delete-list]", { ms: 600 });
  await tl.wait(600);

  // Beat 3: Confirm deletion in modal
  await tl.at(4800);
  tl.showCaption("Click Delete List in the confirmation modal.");
  await pressOn(tl, "[data-tl=btn-confirm-delete-list]", { ms: 600 });
  await tl.wait(1000);

  // Beat 4: Verify list is removed
  await tl.at(7500);
  tl.showCaption("The list is removed. Only your active lists remain.");
  await hoverOn(tl, "[data-tl=list-item-new-leads]", { ms: 550 });
  await tl.wait(1200);

  // Finish (concludes tutorial -> tour completion card)
  await tl.at(10200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl, undefined, 1500);
}
