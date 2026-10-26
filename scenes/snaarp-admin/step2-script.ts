import type { Timeline } from "@/lib/timeline";
import { NEW_USER } from "./admin-data";
import { CAPTIONS, URL } from "./step2-data";

/** Snaarp Admin, step 2 - Enter the user's details. Times are active milliseconds from the start of the step. */
export const STEP2_DURATION_MS = 17000;

export async function runStep2(tl: Timeline) {
  tl.placeCursor(0.52, 0.42); // where step 1 left the cursor (inside the dialog)
  tl.setUrl(URL);

  // Email: the user's sign-in
  await tl.at(500);
  tl.showCaption(CAPTIONS.email);
  await tl.fill("[data-tl=field-email]", "email", NEW_USER.email, { moveMs: 900, msPerChar: 60 });
  tl.highlight("[data-tl=field-email]");
  await tl.at(4600);
  tl.clearHighlight();

  // Names
  tl.showCaption(CAPTIONS.first);
  await tl.fill("[data-tl=field-first]", "first", NEW_USER.first, { moveMs: 700, msPerChar: 110 });
  await tl.at(7000);
  tl.showCaption(CAPTIONS.last);
  await tl.fill("[data-tl=field-last]", "last", NEW_USER.last, { moveMs: 550, msPerChar: 100 });

  // Username
  await tl.at(10000);
  tl.showCaption(CAPTIONS.username);
  await tl.fill("[data-tl=field-username]", "username", NEW_USER.username, { moveMs: 700, msPerChar: 130 });
  tl.setVar("focus", "");

  await tl.at(13200);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=field-email]");
  await tl.at(15200);
  tl.clearHighlight();
  await tl.at(STEP2_DURATION_MS);
}
