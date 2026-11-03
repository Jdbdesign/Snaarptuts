import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP56_DURATION_MS = 6000;

export async function runStep56(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.85, 0.32]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", true);
  tl.setVar("ocxContactPhoto", true);
  tl.setVar("ocxContactLogo", true);
  tl.setVar("ocxContactFirstName", "");
  tl.setVar("ocxContactLastName", "");

  // 1. Type First Name
  await tl.at(400);
  tl.showCaption(CAPTIONS.typeFirstName);
  await hoverOn(tl, "[data-tl=input-first-name]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-first-name]", { ms: 200 });
  await tl.typeText("first-name", "Alex", { msPerChar: 60 });
  tl.setVar("ocxContactFirstName", "Alex");
  await tl.wait(200);

  // 2. Type Last Name
  await tl.at(2500);
  tl.showCaption(CAPTIONS.typeLastName);
  await hoverOn(tl, "[data-tl=input-last-name]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-last-name]", { ms: 200 });
  await tl.typeText("last-name", "Morgan", { msPerChar: 60 });
  tl.setVar("ocxContactLastName", "Morgan");
  await tl.wait(200);

  // 3. Highlight active Save Contact button
  await tl.at(4400);
  tl.showCaption(CAPTIONS.saveContactActive);
  await hoverOn(tl, "[data-tl=btn-drawer-save-contact]", { ms: 500 });
  await ring(tl, "[data-tl=btn-drawer-save-contact]", 1200);

  // 4. Finish
  await finishOneCardX(tl, STEP56_DURATION_MS);
}
