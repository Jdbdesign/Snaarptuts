import type { Timeline } from "@/lib/timeline";

/** Step 1 — Choose your plan. Times are active milliseconds from the start of the step. */
export const STEP1_DURATION_MS = 12300;

export async function runStep1(tl: Timeline) {
  tl.placeCursor(0.5, 0.52);

  await tl.at(0);
  tl.setVar("intro", 1); // page fades in
  await tl.at(450);
  tl.setVar("intro", 2); // hero and tabs fade up

  await tl.at(1200);
  tl.showCaption("Open the Snaarp pricing page");
  await tl.at(2500);
  tl.hideCaption();

  // Billing toggle
  await tl.at(2600);
  tl.showCaption("Pick how you want to be billed");
  await tl.moveCursorTo("[data-tl=toggle-monthly]", { ms: 900 });
  tl.highlight("[data-tl=toggle-monthly]");
  await tl.wait(300);
  await tl.click("[data-tl=toggle-monthly]");
  await tl.at(4450);
  tl.clearHighlight();

  // 360 tab
  await tl.at(4600);
  tl.showCaption("Select the Snaarp 360 tab");
  await tl.moveCursorTo("[data-tl=tab-360]", { ms: 850 });
  tl.highlight("[data-tl=tab-360]");
  await tl.wait(250);
  await tl.click("[data-tl=tab-360]");
  tl.setVar("cards", true); // plan cards slide up
  await tl.at(6300);
  tl.clearHighlight();
  tl.hideCaption();

  // Scroll the plan cards into view
  await tl.at(6400);
  await tl.scrollTo("[data-tl=plan-grid]", 1200, { margin: 84, topInset: 64 });

  // Compare plans, settle on Business
  await tl.at(7800);
  tl.showCaption("Compare plans. Business is the most popular");
  await tl.moveCursorTo("[data-tl=plan-team]", { dy: -70, ms: 450 });
  await tl.moveCursorTo("[data-tl=plan-scale]", { dy: -70, ms: 450 });
  await tl.moveCursorTo("[data-tl=plan-growth]", { dy: -70, ms: 400 });
  await tl.moveCursorTo("[data-tl=plan-business]", { dy: -70, ms: 600 });
  tl.hover("[data-tl=plan-business]");

  // Start the free trial
  await tl.at(10000);
  tl.showCaption("Click Start 14-day free trial");
  await tl.moveCursorTo("[data-tl=cta-business]", { ms: 800 });
  tl.highlight("[data-tl=cta-business]");
  await tl.wait(350);
  await tl.click("[data-tl=cta-business]");

  // White fade-out
  await tl.at(11800);
  tl.clearHighlight();
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP1_DURATION_MS);
}
