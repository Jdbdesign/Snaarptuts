import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP17_DURATION_MS = 18000;

export async function runStep17(tl: Timeline) {
  beginWorkforce(tl, URLS.profile, "profile", "profile");
  tl.setVar("field:contact-phone", "");
  tl.setVar("field:address-line", "");
  tl.setVar("field:city", "");
  tl.placeCursorOn("[data-tl=card-contact-details]");

  // 1. Form introduction
  await tl.at(500);
  tl.showCaption(CAPTIONS.form);
  await hoverOn(tl, "[data-tl=card-contact-details]", { ms: 600 });
  await ring(tl, "[data-tl=card-contact-details]", 2000);

  // 2. Type phone
  await tl.at(3200);
  await tl.fill("[data-tl=field-contact-phone]", "contact-phone", "+44 7700 900123", { moveMs: 550, msPerChar: 45 });
  await tl.wait(300);

  // 3. Type address
  await tl.at(7000);
  await tl.fill("[data-tl=field-address-line]", "address-line", "10 Acme Way", { moveMs: 500, msPerChar: 45 });
  await tl.wait(300);

  // 4. Type city
  await tl.at(9800);
  await tl.fill("[data-tl=field-city]", "city", "London", { moveMs: 500, msPerChar: 45 });
  await tl.wait(300);

  // 5. Save changes & Toast
  await tl.at(12500);
  tl.showCaption(CAPTIONS.save);
  await pressOn(tl, "[data-tl=btn-save-contact]", { ms: 600 });
  tl.toast("Contact details updated");
  tl.setVar("wfContactSaved", true);
  await tl.wait(800);

  // 6. End fade
  await finishWorkforce(tl, 16800, STEP17_DURATION_MS);
}
