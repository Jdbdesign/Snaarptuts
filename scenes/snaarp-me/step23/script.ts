import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP23_DATA } from "./data";

export const STEP23_DURATION_MS = STEP23_DATA.durationMs;

export async function runStep23(tl: Timeline) {
  beginMe(tl, ME_URLS.contacts, "contacts", [0.45, 0.35], 23);
  tl.setVar("meContactsTab", "my-contacts");
  tl.setVar("meMyContacts", []);

  // Beat 1: Add contact -> Upload CSV
  await tl.at(400);
  tl.showCaption(STEP23_DATA.captions.uploadCsv);
  await pressOn(tl, "[data-tl=me-contacts-add-btn]", { ms: 600 });
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-contacts-upload-csv]", { ms: 500 });
  await tl.wait(500);

  // Beat 2: Choose File -> in-app file chooser -> Open
  await tl.at(3000);
  tl.showCaption(STEP23_DATA.captions.pickFile);
  await pressOn(tl, "[data-tl=me-csv-choose-file-btn]", { ms: 550 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-file-chooser-open-btn]", { ms: 550 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-csv-upload-confirm-btn]", { ms: 600 });
  await tl.wait(800);

  // Beat 3: Add contact -> Add manually
  await tl.at(6600);
  tl.showCaption(STEP23_DATA.captions.addManual);
  await pressOn(tl, "[data-tl=me-contacts-add-btn]", { ms: 600 });
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-contacts-add-manually]", { ms: 500 });
  await tl.wait(600);

  // Beat 4: Fill form
  await tl.at(9000);
  tl.showCaption(STEP23_DATA.captions.typeDetails);
  await pressOn(tl, "[data-tl=me-add-contact-first-name]", { ms: 400 });
  await typeIntoVar(tl, "[data-tl=me-add-contact-first-name]", "meAddContactFirstName", "Jordan", { msPerChar: 30 });
  await tl.wait(150);
  tl.setVar("meAddContactLastName", "Lee");
  tl.setVar("meAddContactEmail", "jordan.lee@example.com");
  tl.setVar("meAddContactCompany", "Acme Studio");
  tl.setVar("meAddContactJob", "CEO");
  await tl.wait(500);
  await pressOn(tl, "[data-tl=me-add-contact-submit]", { ms: 600 });
  await tl.wait(800);

  // Beat 5: Search Jordan
  await tl.at(12800);
  tl.showCaption(STEP23_DATA.captions.searchContact);
  await pressOn(tl, "[data-tl=me-contacts-search-input]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=me-contacts-search-input]", "meContactsSearch", "Jordan", { msPerChar: 35 });
  await tl.wait(1400);

  // Finish
  await tl.at(15800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
