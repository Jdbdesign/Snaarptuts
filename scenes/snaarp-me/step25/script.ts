import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, SAMPLE_JORDAN_LEE } from "@/components/me/me-data";
import { STEP25_DATA } from "./data";

export const STEP25_DURATION_MS = STEP25_DATA.durationMs;

export async function runStep25(tl: Timeline) {
  beginMe(tl, ME_URLS.contacts, "contacts", [0.45, 0.35], 25);
  tl.setVar("meContactsTab", "my-contacts");
  tl.setVar("meMyContacts", [SAMPLE_JORDAN_LEE]);
  tl.setVar("meJobColumnAdded", true);

  // Beat 1: Open menu on Job column
  await tl.at(400);
  tl.showCaption(STEP25_DATA.captions.clickMenu);
  await pressOn(tl, "[data-tl=me-job-col-dots]", { ms: 600 });
  await tl.wait(600);

  // Beat 2: Sort descending
  await tl.at(2500);
  tl.showCaption(STEP25_DATA.captions.sortDesc);
  await pressOn(tl, "[data-tl=me-job-menu-sort-desc]", { ms: 550 });
  await tl.wait(800);

  // Beat 3: Re-open menu -> Delete field
  await tl.at(5200);
  tl.showCaption(STEP25_DATA.captions.deleteField);
  await pressOn(tl, "[data-tl=me-job-col-dots]", { ms: 550 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-job-menu-delete]", { ms: 550 });
  await tl.wait(600);

  // Beat 4: Confirm in modal
  await tl.at(8200);
  tl.showCaption(STEP25_DATA.captions.confirmDelete);
  await pressOn(tl, "[data-tl=me-delete-col-confirm]", { ms: 650 });
  await tl.wait(800);

  // Beat 5: Field deleted banner
  await tl.at(10400);
  tl.showCaption(STEP25_DATA.captions.fieldDeleted);
  await hoverOn(tl, "[data-tl=me-contacts-banner]", { ms: 500, ring: true });
  await tl.wait(1200);

  // Finish
  await tl.at(12200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
