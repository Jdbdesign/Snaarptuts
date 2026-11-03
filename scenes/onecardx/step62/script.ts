import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP62_DURATION_MS = 5500;

export async function runStep62(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.4, 0.25]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", false);
  tl.setVar("ocxContactSaved", true);

  // 1. Click Alex Morgan contact row
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickContactRow);
  await hoverOn(tl, "[data-tl=contact-row-alex-morgan]", { ms: 600 });
  await pressOn(tl, "[data-tl=contact-row-alex-morgan]", { ms: 300 });
  tl.setUrl(URLS.contactDetail);
  tl.setVar("ocxContactsSubpage", "detail");
  await tl.wait(200);

  // 2. Highlight contact details card
  await tl.at(2200);
  tl.showCaption(CAPTIONS.viewDetails);
  await hoverOn(tl, "[data-tl=card-contact-details]", { ms: 600 });
  await ring(tl, "[data-tl=card-contact-details]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP62_DURATION_MS);
}
