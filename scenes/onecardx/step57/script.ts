import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP57_DURATION_MS = 8000;

export async function runStep57(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.85, 0.45]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", true);
  tl.setVar("ocxContactPhoto", true);
  tl.setVar("ocxContactLogo", true);
  tl.setVar("ocxContactFirstName", "Alex");
  tl.setVar("ocxContactLastName", "Morgan");
  tl.setVar("ocxContactPhone", "");
  tl.setVar("ocxContactEmail1", "");
  tl.setVar("ocxContactEmail1Type", "work");
  tl.setVar("ocxContactEmail2", "");
  tl.setVar("ocxContactEmail2Type", "work");
  tl.setVar("ocxContactEmail2Added", false);

  // 1. Type Phone Number
  await tl.at(400);
  tl.showCaption(CAPTIONS.typePhone);
  await hoverOn(tl, "[data-tl=input-phone]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-phone]", { ms: 200 });
  await tl.typeText("phone", "+44 7700 900123", { msPerChar: 50 });
  tl.setVar("ocxContactPhone", "+44 7700 900123");
  await tl.wait(200);

  // 2. Type Personal Email
  await tl.at(2400);
  tl.showCaption(CAPTIONS.typeEmailPersonal);
  await hoverOn(tl, "[data-tl=input-email-1]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-email-1]", { ms: 200 });
  await tl.typeText("email-1", "alex.morgan@acme.example", { msPerChar: 40 });
  tl.setVar("ocxContactEmail1", "alex.morgan@acme.example");
  // Switch to personal
  await hoverOn(tl, "[data-tl=dropdown-email-1-type]", { ms: 300 });
  await pressOn(tl, "[data-tl=dropdown-email-1-type]", { ms: 200 });
  tl.setVar("ocxContactEmail1Type", "personal");
  await tl.wait(200);

  // 3. Click + add email
  await tl.at(4700);
  tl.showCaption(CAPTIONS.clickAddEmail);
  await hoverOn(tl, "[data-tl=btn-add-email]", { ms: 500 });
  await pressOn(tl, "[data-tl=btn-add-email]", { ms: 250 });
  tl.setVar("ocxContactEmail2Added", true);
  await tl.wait(200);

  // 4. Type Work Email
  await tl.at(5800);
  tl.showCaption(CAPTIONS.typeEmailWork);
  await hoverOn(tl, "[data-tl=input-email-2]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-email-2]", { ms: 200 });
  await tl.typeText("email-2", "alex@acme.example", { msPerChar: 40 });
  tl.setVar("ocxContactEmail2", "alex@acme.example");
  await tl.wait(200);

  // 5. Finish
  await finishOneCardX(tl, STEP57_DURATION_MS);
}
