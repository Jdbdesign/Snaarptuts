import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP60_DURATION_MS = 8000;

export async function runStep60(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.85, 0.72]);
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
  tl.setVar("ocxContactFieldCategory", null);
  tl.setVar("ocxContactFieldWebsite", "");
  tl.setVar("ocxContactFieldSpotify", "");
  tl.setVar("ocxContactDrawerScrollY", 400);

  // 1. Click Most Popular category chip
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMostPopular);
  await hoverOn(tl, "[data-tl=chip-category-most-popular]", { ms: 500 });
  await pressOn(tl, "[data-tl=chip-category-most-popular]", { ms: 250 });
  tl.setVar("ocxContactFieldCategory", "most-popular");
  await tl.wait(200);

  // 2. Click + Website and type URL
  await tl.at(1800);
  tl.showCaption(CAPTIONS.addWebsite);
  await hoverOn(tl, "[data-tl=btn-field-website]", { ms: 400 });
  await pressOn(tl, "[data-tl=btn-field-website]", { ms: 200 });
  tl.setVar("ocxContactFieldWebsite", "www.acme.example");
  tl.setVar("ocxContactFieldCategory", null);
  await tl.wait(200);

  // 3. Click Music category chip
  await tl.at(4000);
  tl.showCaption(CAPTIONS.clickMusic);
  await hoverOn(tl, "[data-tl=chip-category-music]", { ms: 500 });
  await pressOn(tl, "[data-tl=chip-category-music]", { ms: 250 });
  tl.setVar("ocxContactFieldCategory", "music");
  await tl.wait(200);

  // 4. Click + Spotify and type URL
  await tl.at(5600);
  tl.showCaption(CAPTIONS.addSpotify);
  await hoverOn(tl, "[data-tl=btn-field-spotify]", { ms: 400 });
  await pressOn(tl, "[data-tl=btn-field-spotify]", { ms: 200 });
  tl.setVar("ocxContactFieldSpotify", "www.spotify.com/music");
  tl.setVar("ocxContactFieldCategory", null);
  await tl.wait(200);

  // 5. Finish
  await finishOneCardX(tl, STEP60_DURATION_MS);
}
