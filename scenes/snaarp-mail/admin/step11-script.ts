import type { Timeline } from "@/lib/timeline";
import { press } from "@/scenes/snaarp-admin/script-helpers";
import { BULK_SIGNATURE, CAPTIONS, URL_ADMIN_USERS } from "./data";

/** Snaarp Mail admin, step 11 - Request a bulk signature (14 users, two unticked, Apply to 12 Users). */
export const STEP11_DURATION_MS = 42000;

export async function runStep11(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.sigOpen);
  await press(tl, "[data-tl=btn-bulk-signature]", { ms: 1100 });
  await tl.wait(1200);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.sigType);
  await tl.fill("[data-tl=field-sig-bulk]", "sig-bulk", BULK_SIGNATURE.sample, { moveMs: 1000, msPerChar: 60 });
  tl.setVar("focus", "");
  await tl.wait(1200);

  await tl.at(14500);
  tl.showCaption(CAPTIONS.sigUntick);
  await tl.moveCursorTo("[data-tl=bs-users]", { ms: 800 });
  await tl.scrollPanelTo("[data-tl=bs-users]", "bottom", 1500);
  await press(tl, "[data-tl=bs-user-tom]", { ms: 700 });
  await tl.wait(500);
  await press(tl, "[data-tl=bs-user-sam]", { ms: 600 });
  await tl.wait(1200);

  await tl.at(27000);
  tl.showCaption(CAPTIONS.sigApply);
  await press(tl, "[data-tl=btn-bs-apply]", { ms: 1000 });
  await tl.wait(2500);
  await tl.at(STEP11_DURATION_MS);
}
