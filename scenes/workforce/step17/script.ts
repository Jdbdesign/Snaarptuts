import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP17_DURATION_MS = 18000;

export async function runStep17(tl: Timeline) {
  beginWorkforce(tl, URLS.profile, "profile", "profile");
  tl.setVar("field:contact-phone", "");
  tl.setVar("field:address-line", "");
  tl.setVar("field:city", "");

  // 1. Form introduction
  await tl.at(500);
  tl.showCaption(CAPTIONS.form);
  await tl.moveCursorTo("[data-tl=card-contact-details]", { ms: 600 });
  tl.highlight("[data-tl=card-contact-details]");

  // 2. Type phone
  await tl.at(3500);
  await tl.moveCursorTo("[data-tl=field-contact-phone]", { ms: 500 });
  await tl.click("[data-tl=field-contact-phone]");
  await tl.typeText("+44 7700 900123", "field:contact-phone");

  // 3. Type address
  await tl.at(7500);
  await tl.moveCursorTo("[data-tl=field-address-line]", { ms: 500 });
  await tl.click("[data-tl=field-address-line]");
  await tl.typeText("10 Acme Way", "field:address-line");

  // 4. Type city
  await tl.at(10500);
  await tl.moveCursorTo("[data-tl=field-city]", { ms: 500 });
  await tl.click("[data-tl=field-city]");
  await tl.typeText("London", "field:city");

  // 5. Save changes & Toast
  await tl.at(13500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.save);
  await tl.moveCursorTo("[data-tl=btn-save-contact]", { ms: 600 });
  await tl.click("[data-tl=btn-save-contact]");
  tl.toast("Contact details updated");
  tl.setVar("wfContactSaved", true);

  await tl.at(17000);
  tl.hideCaption();
  await tl.at(STEP17_DURATION_MS);
}
