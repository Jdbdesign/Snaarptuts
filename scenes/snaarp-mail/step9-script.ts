import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PAGE, URLS } from "./finish-data";

/**
 * Snaarp Mail, step 9 - Finish setup (the last step). Times are active milliseconds from the start of the step.
 * The shell then fades the "You're all set" completion card in.
 */
export const STEP9_DURATION_MS = 21000;

export async function runStep9(tl: Timeline) {
  tl.placeCursor(0.6, 0.55);
  tl.setUrl(URLS.complete);
  tl.setVar("intro", 1); // screen A fades in
  tl.showCaption(CAPTIONS.done);

  // The sidebar's last item becomes the white check circle
  await tl.at(400);
  tl.setVar("completed", true);

  // The four record chips tick in, 0.3 s apart
  await tl.at(3000);
  for (let n = 1; n <= PAGE.chips.length; n++) {
    tl.setVar("ticks", n);
    await tl.wait(300);
  }

  // Go to Admin Dashboard
  await tl.at(6500);
  tl.showCaption(CAPTIONS.go);
  await tl.moveCursorTo("[data-tl=btn-go]", { ms: 700 });
  tl.highlight("[data-tl=btn-go]");
  await tl.wait(300);
  await tl.click("[data-tl=btn-go]");
  tl.clearHighlight();

  // Quick white fade to the dashboard
  await tl.at(8500);
  tl.setVar("fade", true);
  await tl.wait(300);
  tl.setVar("screen", "b");
  tl.setUrl(URLS.dashboard);
  tl.setVar("fade", false);
  tl.showCaption(CAPTIONS.dashboard);
  tl.placeCursor(0.45, 0.62);
  void tl.animateVar("count", 0, 1, 900);

  // Drift across the four stat cards
  await tl.at(11000);
  for (const id of ["domains", "users", "inboxes", "plan"]) {
    const sel = `[data-tl=stat-${id}]`;
    await tl.moveCursorTo(sel, { ms: 500 });
    tl.highlight(sel);
    await tl.wait(500);
    tl.clearHighlight();
  }

  // Rest on "User" in the menu
  await tl.at(15500);
  tl.showCaption(CAPTIONS.menu);
  await tl.moveCursorTo("[data-tl=menu-user]", { ms: 700 });
  tl.highlight("[data-tl=menu-user]");

  await tl.at(STEP9_DURATION_MS);
  tl.clearHighlight();
}
