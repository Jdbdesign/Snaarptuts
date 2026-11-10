import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, SAMPLE_JORDAN_LEE } from "@/components/me/me-data";
import { STEP26_DATA } from "./data";

export const STEP26_DURATION_MS = STEP26_DATA.durationMs;

export async function runStep26(tl: Timeline) {
  beginMe(tl, ME_URLS.contacts, "contacts", [0.45, 0.35], 26);
  tl.setVar("meContactsTab", "my-contacts");
  tl.setVar("meMyContacts", [SAMPLE_JORDAN_LEE]);

  // Beat 1: Hover Export CSV
  await tl.at(400);
  tl.showCaption(STEP26_DATA.captions.hoverExport);
  tl.setVar("meExportTooltipOpen", true);
  await hoverOn(tl, "[data-tl=me-contacts-export-btn]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Beat 2: Click Export CSV
  await tl.at(2800);
  tl.showCaption(STEP26_DATA.captions.clickExport);
  await pressOn(tl, "[data-tl=me-contacts-export-btn]", { ms: 600 });
  await tl.wait(600);

  // Beat 3: Export started notice
  await tl.at(5200);
  tl.showCaption(STEP26_DATA.captions.exportStarted);
  await hoverOn(tl, "[data-tl=me-contacts-banner]", { ms: 500, ring: true });
  await tl.wait(2200);

  // Finish
  await tl.at(8800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1800);
}
