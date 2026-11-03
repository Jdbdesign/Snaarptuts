import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP54_DURATION_MS = 5000;

export async function runStep54(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.55, 0.58]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", false);
  tl.setVar("ocxContactSaved", false);

  // 1. Click Add Contact
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAddContact);
  await hoverOn(tl, "[data-tl=btn-empty-add-contact]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-empty-add-contact]", { ms: 300 });
  tl.setVar("ocxContactDrawerOpen", true);
  await tl.wait(200);

  // 2. Highlight the sliding drawer
  await tl.at(2000);
  tl.showCaption(CAPTIONS.drawerSlidesIn);
  await hoverOn(tl, "[data-tl=circle-upload-photo]", { ms: 700 });
  await ring(tl, "[data-tl=drawer-add-contact]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP54_DURATION_MS);
}
