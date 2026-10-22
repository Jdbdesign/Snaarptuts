import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, DNS_RECORDS } from "./dns-data";

/**
 * Snaarp Mail, step 7 - Confirm the records. Plays the step 5 page (Step5Dns) with the five cards marked as
 * submitted one by one. Times are active milliseconds from the start of the step.
 */
export const STEP7_DURATION_MS = 14600;

const PANEL = "[data-tl=content-panel]";
const CONTINUE = "[data-tl=cta-continue]";

/** Click "Mark submitted" on one card at `clickAt`: scroll it into view, glide the cursor, click. */
async function markSubmitted(tl: Timeline, id: string, clickAt: number) {
  const button = `[data-tl=mark-${id}]`;
  await tl.at(clickAt - 1200);
  await tl.scrollPanelTo(PANEL, button, 350, { margin: 100 });
  await tl.moveCursorTo(button, { ms: 550 });
  await tl.at(clickAt - 120);
  await tl.click(button); // Pending becomes Verified, with a small check pop
}

export async function runStep7(tl: Timeline) {
  tl.placeCursor(0.62, 0.45);
  tl.setVar("intro", 1); // the page fades back in
  tl.setVar("bottomRoom", 90); // lets the page scroll far enough to keep Continue clear of the caption
  tl.setVar("holdContinue", true); // Continue stays grey a little after the last card is verified
  tl.showCaption(CAPTIONS.confirm);

  // About 1.6 s between cards
  const clicks = [1500, 3100, 4700, 6300, 7900];
  for (const [i, r] of DNS_RECORDS.entries()) await markSubmitted(tl, r.id, clicks[i]);

  // Continue turns navy, scroll down to it, click
  await tl.at(10500);
  tl.setVar("holdContinue", false);
  tl.showCaption(CAPTIONS.continue);
  await tl.scrollPanelTo(PANEL, CONTINUE, 800, { margin: 110 });
  await tl.at(11500);
  await tl.moveCursorTo(CONTINUE, { ms: 700 });
  tl.highlight(CONTINUE);
  await tl.wait(300);
  await tl.click(CONTINUE);
  tl.clearHighlight();

  // Quick white fade-out
  await tl.at(14000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP7_DURATION_MS);
}
