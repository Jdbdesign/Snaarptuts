import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP59_DURATION_MS = 7500;

export async function runStep59(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.85, 0.45]);
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
  tl.setVar("ocxContactCompany", "");
  tl.setVar("ocxContactTitle", "");
  tl.setVar("ocxContactDepartment", "");
  tl.setVar("ocxContactDrawerScrollY", 0);

  // 1. Scroll drawer down
  await tl.at(400);
  tl.showCaption(CAPTIONS.scrollWorkInfo);
  tl.setVar("ocxContactDrawerScrollY", 260);
  await tl.wait(400);

  // 2. Type Company and Title
  await tl.at(1400);
  tl.showCaption(CAPTIONS.typeCompanyAndTitle);
  await hoverOn(tl, "[data-tl=input-company]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-company]", { ms: 200 });
  await tl.typeText("company", "Acme Ltd", { msPerChar: 50 });
  tl.setVar("ocxContactCompany", "Acme Ltd");

  await hoverOn(tl, "[data-tl=input-title]", { ms: 400 });
  await pressOn(tl, "[data-tl=input-title]", { ms: 200 });
  await tl.typeText("title", "Product Designer", { msPerChar: 50 });
  tl.setVar("ocxContactTitle", "Product Designer");
  await tl.wait(200);

  // 3. Type Department and highlight Associated Card
  await tl.at(4600);
  tl.showCaption(CAPTIONS.typeDepartment);
  await hoverOn(tl, "[data-tl=input-department]", { ms: 400 });
  await pressOn(tl, "[data-tl=input-department]", { ms: 200 });
  await tl.typeText("department", "Engineering", { msPerChar: 50 });
  tl.setVar("ocxContactDepartment", "Engineering");
  await tl.wait(200);

  await hoverOn(tl, "[data-tl=select-associated-card]", { ms: 500 });
  await ring(tl, "[data-tl=select-associated-card]", 1200);

  // 4. Finish
  await finishOneCardX(tl, STEP59_DURATION_MS);
}
