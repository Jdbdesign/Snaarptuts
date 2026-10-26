import type { Timeline } from "@/lib/timeline";
import { NEW_USER } from "./admin-data";
import { CAPTIONS, URL } from "./step4-data";

/** Snaarp Admin, step 4 - Set a temporary password and create the user. Times are active milliseconds from the start of the step. */
export const STEP4_DURATION_MS = 19500;

const BODY = "[data-tl=create-scroll]";

export async function runStep4(tl: Timeline) {
  tl.placeCursor(0.52, 0.5);
  tl.setUrl(URL);

  // Type the password (shown as dots); the rules turn green as the characters arrive
  await tl.at(500);
  tl.showCaption(CAPTIONS.password);
  const typing = tl.fill("[data-tl=field-password]", "password", NEW_USER.password, { moveMs: 900, msPerChar: 190 });
  await tl.wait(1700);
  await tl.scrollPanelTo(BODY, "bottom", 600); // the rules need room under the field
  await typing;
  tl.setVar("focus", "");

  await tl.at(5400);
  tl.showCaption(CAPTIONS.rules);
  tl.highlight("[data-tl=password-rules]");
  await tl.at(8000);
  tl.clearHighlight();

  tl.showCaption(CAPTIONS.share);
  tl.highlight("[data-tl=password-hint]");
  await tl.at(10800);
  tl.clearHighlight();

  // Create the user: the dialog closes, a toast shows, the row appears
  tl.showCaption(CAPTIONS.create);
  await tl.moveCursorTo("[data-tl=btn-submit-create]", { ms: 800 });
  tl.highlight("[data-tl=btn-submit-create]");
  await tl.wait(450);
  await tl.click("[data-tl=btn-submit-create]");
  tl.clearHighlight();

  await tl.at(14000);
  tl.showCaption(CAPTIONS.created);
  tl.highlight("[data-tl=row-sam]");
  await tl.at(16200);
  tl.clearHighlight();

  tl.showCaption(CAPTIONS.count);
  tl.highlight("[data-tl=stat-active]");
  await tl.at(18700);
  tl.clearHighlight();
  await tl.at(STEP4_DURATION_MS);
}
