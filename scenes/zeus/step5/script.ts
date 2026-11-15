import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  hoverOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP5_DURATION_MS = 13500;

export async function runStep5(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.55, 0.15], 5);

  // Beat 1: Switch to Find Email
  await tl.at(400);
  tl.showCaption("Click Find Email to look up specific verified email addresses.");
  await pressOn(tl, "[data-tl=tab-switch-find-email]", { ms: 600 });
  await tl.wait(500);

  // Beat 2: Enter Full Name
  await tl.at(2500);
  tl.showCaption("Type the contact's full name: \"Jordan Lee\".");
  await pressOn(tl, "[data-tl=input-finder-name]", { ms: 550 });
  await typeIntoVar(tl, "[data-tl=input-finder-name]", "zeusEmailFinderName", "Jordan Lee", { msPerChar: 55 });
  await tl.wait(300);

  // Beat 3: Enter Company Domain
  await tl.at(5200);
  tl.showCaption("Enter their company domain: \"example.com\".");
  await pressOn(tl, "[data-tl=input-finder-domain]", { ms: 550 });
  await typeIntoVar(tl, "[data-tl=input-finder-domain]", "zeusEmailFinderDomain", "example.com", { msPerChar: 50 });
  await tl.wait(300);

  // Beat 4: Click Find Email
  await tl.at(7800);
  tl.showCaption("Click Find Email to discover their verified address (1 credit).");
  await pressOn(tl, "[data-tl=btn-submit-find-email]", { ms: 600 });
  await tl.wait(800);

  // Beat 5: Review found email and remaining balance
  await tl.at(9800);
  tl.showCaption("Notice your credits balance update from 99 to 98.");
  await hoverOn(tl, "[data-tl=finder-result-card]", { ms: 500 });
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=zeus-credits-pill]", { ms: 500 });
  await tl.wait(600);

  // Beat 6: Return to Database
  await tl.at(11800);
  tl.showCaption("Click Database to return to the lead database.");
  await pressOn(tl, "[data-tl=tab-switch-database]", { ms: 550 });
  await tl.wait(500);

  // Finish
  await tl.at(12800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
