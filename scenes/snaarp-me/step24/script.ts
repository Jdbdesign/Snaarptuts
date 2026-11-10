import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, SAMPLE_JORDAN_LEE } from "@/components/me/me-data";
import { STEP24_DATA } from "./data";

export const STEP24_DURATION_MS = STEP24_DATA.durationMs;

export async function runStep24(tl: Timeline) {
  beginMe(tl, ME_URLS.contacts, "contacts", [0.45, 0.35], 24);
  tl.setVar("meContactsTab", "my-contacts");
  tl.setVar("meMyContacts", [SAMPLE_JORDAN_LEE]);
  tl.setVar("meJobColumnAdded", false);

  // Beat 1: Click + add column header
  await tl.at(400);
  tl.showCaption(STEP24_DATA.captions.clickAddCol);
  await pressOn(tl, "[data-tl=me-contacts-add-column-header-btn]", { ms: 650 });
  await tl.wait(600);

  // Beat 2: Enter label "Job"
  await tl.at(2800);
  tl.showCaption(STEP24_DATA.captions.enterLabel);
  await pressOn(tl, "[data-tl=me-custom-field-label-input]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=me-custom-field-label-input]", "meCustomFieldLabel", "Job", { msPerChar: 45 });
  await tl.wait(600);

  // Beat 3: Click Create
  await tl.at(5800);
  tl.showCaption(STEP24_DATA.captions.clickCreate);
  await pressOn(tl, "[data-tl=me-custom-field-create-btn]", { ms: 650 });
  await tl.wait(800);

  // Beat 4: Column created banner & row
  await tl.at(8400);
  tl.showCaption(STEP24_DATA.captions.columnCreated);
  await hoverOn(tl, "[data-tl=me-job-col-dots]", { ms: 600, ring: true });
  await tl.wait(1800);

  // Finish
  await tl.at(10800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
