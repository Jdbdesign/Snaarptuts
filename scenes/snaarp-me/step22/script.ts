import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP22_DATA } from "./data";

export const STEP22_DURATION_MS = STEP22_DATA.durationMs;

export async function runStep22(tl: Timeline) {
  beginMe(tl, ME_URLS.contacts, "contacts", [0.45, 0.35], 22);
  tl.setVar("meContactsTab", "invitees");

  // Beat 1: Click Show columns
  await tl.at(400);
  tl.showCaption(STEP22_DATA.captions.showCols);
  await pressOn(tl, "[data-tl=me-contacts-columns-btn]", { ms: 600 });
  await tl.wait(600);

  // Beat 2: Untick and re-tick Phone number
  await tl.at(2500);
  tl.showCaption(STEP22_DATA.captions.togglePhone);
  await pressOn(tl, "[data-tl=me-col-check-phone-number]", { ms: 500 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-col-check-phone-number]", { ms: 500 });
  await tl.wait(500);

  // Beat 3: Open Filter
  await tl.at(5600);
  tl.showCaption(STEP22_DATA.captions.openFilter);
  await pressOn(tl, "[data-tl=me-contacts-filter-btn]", { ms: 600 });
  await tl.wait(600);

  // Beat 4: Type "design" and Apply
  await tl.at(8200);
  tl.showCaption(STEP22_DATA.captions.applyFilter);
  await pressOn(tl, "[data-tl=me-filter-value-input]", { ms: 450 });
  await typeIntoVar(tl, "[data-tl=me-filter-value-input]", "meFilterValue", "design", { msPerChar: 40 });
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-filter-apply-btn]", { ms: 550 });
  await tl.wait(1400);

  // Beat 5: Re-open filter and clear
  await tl.at(12000);
  tl.showCaption(STEP22_DATA.captions.clearFilter);
  await pressOn(tl, "[data-tl=me-contacts-filter-btn]", { ms: 550 });
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-filter-trash-btn]", { ms: 500 });
  await tl.wait(1200);

  // Finish
  await tl.at(14800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
