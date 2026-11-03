import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP61_DURATION_MS = 5500;

export async function runStep61(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.85, 0.8]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", true);
  tl.setVar("ocxContactPhoto", true);
  tl.setVar("ocxContactLogo", true);
  tl.setVar("ocxContactFirstName", "Alex");
  tl.setVar("ocxContactLastName", "Morgan");
  tl.setVar("ocxContactPhone", "+44 7700 900123");
  tl.setVar("ocxContactEmail1", "alex.morgan@acme.example");
  tl.setVar("ocxContactEmail1Type", "personal");
  tl.setVar("ocxContactEmail2", "alex@acme.example");
  tl.setVar("ocxContactEmail2Type", "work");
  tl.setVar("ocxContactEmail2Added", true);
  tl.setVar("ocxContactMoreOptions", true);
  tl.setVar("ocxContactPrefix", "Mr");
  tl.setVar("ocxContactMiddleName", "James");
  tl.setVar("ocxContactAccreditations", "MBA");
  tl.setVar("ocxContactPronouns", "he/him");
  tl.setVar("ocxContactCompany", "Acme Ltd");
  tl.setVar("ocxContactTitle", "Product Designer");
  tl.setVar("ocxContactDepartment", "Engineering");
  tl.setVar("ocxContactFieldWebsite", "www.acme.example");
  tl.setVar("ocxContactFieldSpotify", "www.spotify.com/music");
  tl.setVar("ocxContactSaved", false);
  tl.setVar("ocxContactDrawerScrollY", 450);

  // 1. Click Save Contact
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSaveContact);
  await hoverOn(tl, "[data-tl=btn-drawer-save-contact]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-drawer-save-contact]", { ms: 300 });
  tl.setVar("ocxContactDrawerOpen", false);
  tl.setVar("ocxContactSaved", true);
  await tl.wait(200);

  // 2. Highlight new contact row
  await tl.at(2200);
  tl.showCaption(CAPTIONS.contactSaved);
  await hoverOn(tl, "[data-tl=contact-row-alex-morgan]", { ms: 600 });
  await ring(tl, "[data-tl=contact-row-alex-morgan]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP61_DURATION_MS);
}
