import type { Timeline } from "@/lib/timeline";

/** Snaarp Mail, step 1 - Choose your plan. Times are active milliseconds from the start of the step. */
export const STEP1_DURATION_MS = 9300;

export async function runStep1(tl: Timeline) {
  tl.placeCursor(0.5, 0.55);

  await tl.at(0);
  tl.setVar("intro", 1); // page fades in, 360 tab selected
  await tl.at(450);
  tl.setVar("intro", 2); // tab bar fades up

  // Choose the Mail tab
  await tl.at(1000);
  tl.showCaption("Open the Snaarp pricing page and choose the Mail tab");
  await tl.moveCursorTo("[data-tl=tab-mail]", { ms: 900 });
  tl.highlight("[data-tl=tab-mail]");
  await tl.wait(300);
  await tl.click("[data-tl=tab-mail]"); // the pill moves to Mail and the cards swap
  await tl.at(3000);
  tl.clearHighlight();

  // Look over the plans, settle on Growth
  await tl.at(4000);
  tl.showCaption("Pick the plan that fits your team");
  await tl.moveCursorTo("[data-tl=plan-starter]", { dy: -70, ms: 500 });
  await tl.moveCursorTo("[data-tl=plan-growth]", { dy: -70, ms: 600 });
  tl.hover("[data-tl=plan-growth]");

  // Start the free trial
  await tl.at(6600);
  tl.showCaption("Click Start 14-day free trial");
  await tl.scrollTo("[data-tl=cta-growth]", 500, { margin: 40 }); // only moves if the button is off screen
  await tl.moveCursorTo("[data-tl=cta-growth]", { ms: 800 });
  tl.highlight("[data-tl=cta-growth]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-growth]");

  // White fade-out
  await tl.at(8600);
  tl.clearHighlight();
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP1_DURATION_MS);
}
