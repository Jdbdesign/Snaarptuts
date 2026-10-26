import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URL } from "./step1-data";

/** Snaarp Admin, step 1 - Open the Create user form. Times are active milliseconds from the start of the step. */
export const STEP1_DURATION_MS = 10500;

export async function runStep1(tl: Timeline) {
  tl.placeCursor(0.55, 0.62);
  tl.setUrl(URL);

  // The Users page
  await tl.at(500);
  tl.showCaption(CAPTIONS.page);
  tl.highlight("[data-tl=users-directory]");
  await tl.at(2800);
  tl.clearHighlight();

  // Click Create user
  tl.showCaption(CAPTIONS.click);
  await tl.moveCursorTo("[data-tl=btn-create-user]", { ms: 1000 });
  tl.highlight("[data-tl=btn-create-user]");
  await tl.wait(400);
  await tl.click("[data-tl=btn-create-user]");
  tl.clearHighlight();

  // The form is open
  await tl.at(5400);
  tl.showCaption(CAPTIONS.form);
  tl.highlight("[data-tl=create-dialog]");
  await tl.at(7800);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.fields);
  await tl.at(STEP1_DURATION_MS);
}
