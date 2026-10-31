import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP16_DURATION_MS = 16000;

export async function runStep16(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");

  // 1. Open My Profile from sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.open);
  await tl.moveCursorTo("[data-tl=subnav-profile]", { ms: 600 });
  await tl.click("[data-tl=subnav-profile]");
  tl.setVar("wfPage", "profile");
  tl.setVar("wfSubpage", "profile");
  tl.setUrl(URLS.profile);

  // 2. Personal and employment details card
  await tl.at(4000);
  tl.showCaption(CAPTIONS.hrNote);
  await tl.moveCursorTo("[data-tl=card-employment-details]", { ms: 600 });
  tl.highlight("[data-tl=card-employment-details]");

  await tl.at(8000);
  await tl.moveCursorTo("[data-tl=emp-field-name]", { ms: 600 });

  // 3. Scroll down to Edit contact details
  await tl.at(11000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.contactDetails);
  await tl.moveCursorTo("[data-tl=card-contact-details]", { ms: 700 });
  tl.highlight("[data-tl=card-contact-details]");

  await tl.at(15200);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP16_DURATION_MS);
}
