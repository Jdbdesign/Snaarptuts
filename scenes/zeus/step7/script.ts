import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  hoverOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP7_DURATION_MS = 13500;

export async function runStep7(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.15, 0.25], 7);

  // Beat 1: Navigate to Lists
  await tl.at(400);
  tl.showCaption("Click Lists in the left sidebar to manage your target lists.");
  await pressOn(tl, "[data-tl=zeus-nav-lists]", { ms: 600 });
  await tl.wait(600);

  // Beat 2: Click New List
  await tl.at(2500);
  tl.showCaption("Click New List to create a fresh recipient list.");
  await pressOn(tl, "[data-tl=btn-new-list]", { ms: 550 });
  await tl.wait(500);

  // Beat 3: Enter list name "New Leads"
  await tl.at(4600);
  tl.showCaption("Enter the list name: \"New Leads\".");
  await pressOn(tl, "[data-tl=input-new-list-name]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=input-new-list-name]", "zeusNewListName", "New Leads", { msPerChar: 55 });
  await tl.wait(300);

  // Beat 4: Select list type
  await tl.at(7200);
  tl.showCaption("Choose Dynamic for auto-updating filters, or Static for manual curation.");
  await pressOn(tl, "[data-tl=card-list-type-dynamic]", { ms: 500 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=card-list-type-static]", { ms: 450 });
  await tl.wait(300);

  // Beat 5: Confirm list creation
  await tl.at(9500);
  tl.showCaption("Click Create List to confirm.");
  await pressOn(tl, "[data-tl=btn-confirm-create-list]", { ms: 600 });
  await tl.wait(800);

  // Beat 6: Review new list in sidebar
  await tl.at(11400);
  tl.showCaption("Your new list \"New Leads\" is ready in My Lists.");
  await hoverOn(tl, "[data-tl=list-item-new-leads]", { ms: 500 });
  await tl.wait(800);

  // Finish
  await tl.at(12800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
