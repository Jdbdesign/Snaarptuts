import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP53_DURATION_MS = 4500;

export async function runStep53(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.1, 0.45]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", false);
  tl.setVar("ocxContactSaved", false);

  // 1. Click Contacts under NETWORK
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickContacts);
  await hoverOn(tl, "[data-tl=nav-contacts]", { ms: 600 });
  await pressOn(tl, "[data-tl=nav-contacts]", { ms: 300 });
  tl.setUrl(URLS.contacts);
  tl.setVar("ocxPage", "contacts");
  await tl.wait(200);

  // 2. Highlight empty state
  await tl.at(1800);
  tl.showCaption(CAPTIONS.startBuildingNetwork);
  await hoverOn(tl, "[data-tl=btn-empty-add-contact]", { ms: 600 });
  await ring(tl, "[data-tl=contacts-empty-state]", 1600);

  // 3. Finish
  await finishOneCardX(tl, STEP53_DURATION_MS);
}
