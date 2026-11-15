import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP14_DURATION_MS = 28000;

export async function runStep14(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.45, 0.35], 14);

  // Setup Step 14 state
  tl.setVar("zeusCredits", 97);
  tl.setVar("zeusIsStep14", true);
  tl.setVar("zeusSearchResults", true);
  tl.setVar("zeusSavedSearches", ["CEOs"]);
  tl.setVar("zeusLists", []); // No lists initially

  // Beat 1: Open Elena Marsh
  await tl.at(400);
  tl.showCaption("Click Elena Marsh to view contact details.");
  await pressOn(tl, "[data-tl=contact-row-elena-marsh]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Reveal Elena Marsh
  await tl.at(2800);
  tl.showCaption("Click Reveal Contact to get their verified email.");
  await pressOn(tl, "[data-tl=btn-reveal-contact]", { ms: 600 });
  await tl.wait(1400);

  // Beat 3: Add to list (Empty)
  await tl.at(5400);
  tl.showCaption("Click Add to List to organize this lead.");
  await pressOn(tl, "[data-tl=btn-add-to-list]", { ms: 600 });
  await tl.wait(1200);

  // Beat 4: Cancel dropdown
  await tl.at(7600);
  tl.showCaption("Click Cancel to close the list menu.");
  await pressOn(tl, "[data-tl=btn-cancel-add-to-list]", { ms: 600 });
  await tl.wait(800);

  // Beat 5: Navigate to Lists
  await tl.at(9600);
  tl.showCaption("Click Lists in the sidebar to create a new list.");
  tl.setVar("zeusDrawerOpen", false);
  await pressOn(tl, "[data-tl=zeus-nav-lists]", { ms: 600 });
  tl.setUrl(ZEUS_URLS.lists);
  tl.setVar("zeusView", "lists");
  await tl.wait(1000);

  // Beat 6: Click New List
  await tl.at(12000);
  tl.showCaption("Click New List to create a curated list.");
  await pressOn(tl, "[data-tl=btn-new-list]", { ms: 600 });
  await tl.wait(800);

  // Beat 7: Name list CEO and Create
  await tl.at(14000);
  tl.showCaption("Name your list CEO and click Create List.");
  await pressOn(tl, "[data-tl=input-new-list-name]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=input-new-list-name]",
    "zeusNewListName",
    "CEO",
    { msPerChar: 45 }
  );
  await pressOn(tl, "[data-tl=btn-confirm-create-list]", { ms: 600 });
  await tl.wait(1400);

  // Beat 8: Return to People
  await tl.at(17600);
  tl.showCaption("Click People in the sidebar to return to your leads.");
  await pressOn(tl, "[data-tl=zeus-nav-people]", { ms: 600 });
  tl.setUrl(ZEUS_URLS.people);
  tl.setVar("zeusView", "people");
  await tl.wait(1000);

  // Beat 9: Add Elena to CEO
  await tl.at(19600);
  tl.showCaption("Click Elena Marsh to add her to your CEO list.");
  await pressOn(tl, "[data-tl=contact-row-elena-marsh]", { ms: 600 });
  await tl.wait(600);
  await pressOn(tl, "[data-tl=btn-add-to-list]", { ms: 500 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=add-to-list-item-ceo]", { ms: 500 });
  await tl.wait(1000);

  // Beat 10: Reveal & Add Ravi Menon
  await tl.at(22800);
  tl.showCaption("Now click Ravi Menon, reveal his contact, and add him too.");
  await pressOn(tl, "[data-tl=contact-row-ravi-menon]", { ms: 600 });
  await tl.wait(600);
  await pressOn(tl, "[data-tl=btn-reveal-contact]", { ms: 500 });
  await tl.wait(800);
  await pressOn(tl, "[data-tl=btn-add-to-list]", { ms: 500 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=add-to-list-item-ceo]", { ms: 500 });
  await tl.wait(1000);

  // Beat 11: Close Drawer
  await tl.at(26200);
  tl.showCaption("Close the drawer. Your CEO list now has 2 verified leads.");
  await pressOn(tl, "[data-tl=btn-close-drawer]", { ms: 600 });
  await tl.wait(800);

  // Finish
  await tl.at(27500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
