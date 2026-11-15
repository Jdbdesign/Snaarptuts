import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS, SAMPLE_CONTACTS } from "@/components/zeus/zeus-data";

export const STEP13_DURATION_MS = 14000;

export async function runStep13(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.lists, "lists", [0.45, 0.35], 13);

  // Seed with "Priority Leads"
  const listPriorityLeads = {
    id: "list-priority-leads",
    name: "Priority Leads",
    type: "Static" as const,
    membersCount: 1,
    date: "10/11/2026",
    contacts: [SAMPLE_CONTACTS[0]],
  };
  tl.setVar("zeusLists", [listPriorityLeads]);
  tl.setVar("zeusSelectedListId", "list-priority-leads");

  // Beat 1: Click Delete
  await tl.at(400);
  tl.showCaption("Click Delete to remove a list you no longer need.");
  await pressOn(tl, "[data-tl=btn-delete-list]", { ms: 600 });
  await tl.wait(800);

  // Beat 2: Confirm Deletion
  await tl.at(2500);
  tl.showCaption("Click Delete List to confirm deletion.");
  await pressOn(tl, "[data-tl=btn-confirm-delete-list]", { ms: 600 });
  await tl.wait(1200);

  // Beat 3: Navigate to Exports
  await tl.at(5200);
  tl.showCaption("Click Exports in the sidebar.");
  await pressOn(tl, "[data-tl=zeus-nav-exports]", { ms: 600 });
  tl.setUrl(ZEUS_URLS.exports);
  tl.setVar("zeusView", "exports");
  await tl.wait(1000);

  // Beat 4: Empty state in exports
  await tl.at(7800);
  tl.showCaption("Exports require at least one list with contacts.");
  await hoverOn(tl, "[data-tl=exports-empty-card]", { ms: 600 });
  await tl.wait(1400);

  // Beat 5: Return to People
  await tl.at(10500);
  tl.showCaption("Click People in the sidebar to build a new list.");
  await pressOn(tl, "[data-tl=zeus-nav-people]", { ms: 600 });
  tl.setUrl(ZEUS_URLS.people);
  tl.setVar("zeusView", "people");
  await tl.wait(1200);

  // Finish
  await tl.at(13200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
