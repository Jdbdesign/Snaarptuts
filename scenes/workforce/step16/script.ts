import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP16_DURATION_MS = 16000;

export async function runStep16(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");

  // 1. Open My Profile from sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.open);
  await pressOn(tl, "[data-tl=subnav-profile]", { ms: 600 });
  tl.setVar("wfPage", "profile");
  tl.setVar("wfSubpage", "profile");
  tl.setUrl(URLS.profile);
  await tl.wait(250);

  // 2. Personal and employment details card
  await tl.at(4000);
  tl.showCaption(CAPTIONS.hrNote);
  await hoverOn(tl, "[data-tl=card-employment-details]", { ms: 600 });
  await ring(tl, "[data-tl=card-employment-details]", 2400);

  await tl.at(7500);
  await hoverOn(tl, "[data-tl=emp-field-name]", { ms: 500 });
  await ring(tl, "[data-tl=emp-field-name]", 1800);

  // 3. Scroll down to Edit contact details
  await tl.at(10500);
  tl.showCaption(CAPTIONS.contactDetails);
  await hoverOn(tl, "[data-tl=card-contact-details]", { ms: 700 });
  await ring(tl, "[data-tl=card-contact-details]", 2600);

  // 4. End fade
  await finishWorkforce(tl, 14800, STEP16_DURATION_MS);
}
