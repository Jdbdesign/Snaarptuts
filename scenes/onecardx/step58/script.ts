import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP58_DURATION_MS = 7500;

export async function runStep58(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.85, 0.65]);
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
  tl.setVar("ocxContactMoreOptions", false);

  // 1. Click + More options
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMoreOptions);
  await hoverOn(tl, "[data-tl=btn-more-options]", { ms: 500 });
  await pressOn(tl, "[data-tl=btn-more-options]", { ms: 250 });
  tl.setVar("ocxContactMoreOptions", true);
  await tl.wait(200);

  // 2. Type Prefix, Middle Name, Accreditations
  await tl.at(1800);
  tl.showCaption(CAPTIONS.typeTitles);
  await hoverOn(tl, "[data-tl=input-prefix]", { ms: 400 });
  await pressOn(tl, "[data-tl=input-prefix]", { ms: 200 });
  await tl.typeText("prefix", "Mr", { msPerChar: 50 });
  tl.setVar("ocxContactPrefix", "Mr");

  await hoverOn(tl, "[data-tl=input-middle-name]", { ms: 400 });
  await pressOn(tl, "[data-tl=input-middle-name]", { ms: 200 });
  await tl.typeText("middle-name", "James", { msPerChar: 50 });
  tl.setVar("ocxContactMiddleName", "James");

  await hoverOn(tl, "[data-tl=input-accreditations]", { ms: 400 });
  await pressOn(tl, "[data-tl=input-accreditations]", { ms: 200 });
  await tl.typeText("accreditations", "MBA", { msPerChar: 50 });
  tl.setVar("ocxContactAccreditations", "MBA");
  await tl.wait(200);

  // 3. Select Pronouns he/him
  await tl.at(5200);
  tl.showCaption(CAPTIONS.selectPronouns);
  await hoverOn(tl, "[data-tl=select-pronouns]", { ms: 400 });
  await pressOn(tl, "[data-tl=select-pronouns]", { ms: 200 });
  tl.setVar("ocxContactPronounsOpen", true);
  await tl.wait(150);

  await hoverOn(tl, "[data-tl=option-pronoun-he-him]", { ms: 350 });
  await pressOn(tl, "[data-tl=option-pronoun-he-him]", { ms: 200 });
  tl.setVar("ocxContactPronouns", "he/him");
  tl.setVar("ocxContactPronounsOpen", false);
  await tl.wait(200);

  // 4. Finish
  await finishOneCardX(tl, STEP58_DURATION_MS);
}
