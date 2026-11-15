import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS, SAMPLE_CONTACTS } from "@/components/zeus/zeus-data";

export const STEP12_DURATION_MS = 11000;

export async function runStep12(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.lists, "lists", [0.45, 0.35], 12);

  // Seed with "New Leads" containing Jordan Lee
  const listNewLeads = {
    id: "list-new-leads",
    name: "New Leads",
    type: "Static" as const,
    membersCount: 1,
    date: "10/11/2026",
    contacts: [SAMPLE_CONTACTS[0]],
  };
  tl.setVar("zeusLists", [listNewLeads]);
  tl.setVar("zeusSelectedListId", "list-new-leads");

  // Beat 1: Overview
  await tl.at(400);
  tl.showCaption("Manage your curated lead lists from the Lists view.");
  await hoverOn(tl, "[data-tl=selected-list-title]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Click Edit
  await tl.at(2400);
  tl.showCaption("Click Edit to update your list details.");
  await pressOn(tl, "[data-tl=btn-edit-list]", { ms: 600 });
  await tl.wait(800);

  // Beat 3: Type new name
  await tl.at(4600);
  tl.showCaption("Enter Priority Leads as the new name.");
  await pressOn(tl, "[data-tl=input-edit-list-name]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=input-edit-list-name]",
    "zeusEditListName",
    "Priority Leads",
    { msPerChar: 45 }
  );
  await tl.wait(600);

  // Beat 4: Save changes
  await tl.at(7500);
  tl.showCaption("Click Save Changes to rename your list.");
  await pressOn(tl, "[data-tl=btn-save-edit-list]", { ms: 600 });
  await tl.wait(1400);

  // Finish
  await tl.at(10200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
