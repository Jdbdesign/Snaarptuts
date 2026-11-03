import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP63_DURATION_MS = 6500;

export async function runStep63(tl: Timeline) {
  beginOneCardX(tl, URLS.contactDetail, "contacts", [0.35, 0.48]);
  tl.setVar("ocxContactsSubpage", "detail");
  tl.setVar("ocxContactDrawerOpen", false);
  tl.setVar("ocxContactSaved", true);
  tl.setVar("ocxContactTags", []);
  tl.setVar("ocxContactTagInput", "");

  // 1. Add Tag
  await tl.at(400);
  tl.showCaption(CAPTIONS.addTag);
  await hoverOn(tl, "[data-tl=input-new-tag]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-new-tag]", { ms: 200 });
  await tl.typeText("tag", "Creative", { msPerChar: 60 });
  tl.setVar("ocxContactTagInput", "Creative");
  await hoverOn(tl, "[data-tl=btn-add-tag]", { ms: 300 });
  await pressOn(tl, "[data-tl=btn-add-tag]", { ms: 200 });
  tl.setVar("ocxContactTags", ["Creative"]);
  tl.setVar("ocxContactTagInput", "");
  await tl.wait(200);

  // 2. Click into Notes
  await tl.at(2800);
  tl.showCaption(CAPTIONS.addNote);
  await hoverOn(tl, "[data-tl=textarea-notes]", { ms: 500 });
  await pressOn(tl, "[data-tl=textarea-notes]", { ms: 200 });
  await tl.wait(600);

  // 3. Back to Contacts
  await tl.at(4200);
  tl.showCaption(CAPTIONS.backToContacts);
  await hoverOn(tl, "[data-tl=btn-back-to-contacts]", { ms: 500 });
  await pressOn(tl, "[data-tl=btn-back-to-contacts]", { ms: 250 });
  tl.setUrl(URLS.contacts);
  tl.setVar("ocxContactsSubpage", "list");
  await tl.wait(200);

  // 4. Finish
  await finishOneCardX(tl, STEP63_DURATION_MS);
}
