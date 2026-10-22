import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, SAMPLE } from "./signup-data";

/** Snaarp Mail, step 2 - Create your account. Times are active milliseconds from the start of the step. */
export const STEP2_DURATION_MS = 21000;

export async function runStep2(tl: Timeline) {
  tl.placeCursor(0.78, 0.45);
  tl.setVar("intro", 1); // page fades in; Growth is already selected

  // The plan is already chosen
  await tl.at(1000);
  tl.showCaption(CAPTIONS.plan);
  tl.highlight("[data-tl=plan-box]");
  await tl.at(2800);
  tl.clearHighlight();

  // Name
  await tl.at(3000);
  tl.showCaption(CAPTIONS.name);
  await tl.fill("[data-tl=field-first]", "first", SAMPLE.first, { moveMs: 700 });
  await tl.fill("[data-tl=field-last]", "last", SAMPLE.last, { moveMs: 450 });

  // Email
  await tl.at(5200);
  tl.showCaption(CAPTIONS.email);
  await tl.fill("[data-tl=field-email]", "email", SAMPLE.email, { msPerChar: 60 });

  // Organization
  await tl.at(7000);
  await tl.fill("[data-tl=field-org]", "org", SAMPLE.org, { msPerChar: 55 });

  // Country and phone
  await tl.at(8400);
  tl.showCaption(CAPTIONS.country);
  tl.highlight("[data-tl=country]");
  tl.highlight("[data-tl=dial]");
  await tl.moveCursorTo("[data-tl=country]", { ms: 400, dx: 120 });
  await tl.wait(350);
  tl.clearHighlight();
  await tl.fill("[data-tl=field-phone]", "phone", SAMPLE.phone, { moveMs: 380 });

  // Password: the strength bar grows as it is typed, then the form scrolls to the checkbox and button
  await tl.at(10800);
  tl.showCaption(CAPTIONS.password);
  await tl.fill("[data-tl=field-password]", "password", SAMPLE.password, { moveMs: 450 });
  await tl.wait(250);
  await tl.scrollPanelTo("[data-tl=form-panel]", "[data-tl=signup-footer]", 1000, { margin: 40 });

  // Terms
  await tl.at(15000);
  tl.showCaption(CAPTIONS.terms);
  await tl.moveCursorTo("[data-tl=terms]", { ms: 700, dx: -150 });
  await tl.click("[data-tl=terms]");

  // Create Account
  await tl.at(17600);
  tl.showCaption(CAPTIONS.submit);
  await tl.moveCursorTo("[data-tl=cta-signup]", { ms: 700 });
  tl.highlight("[data-tl=cta-signup]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-signup]");

  // Loading state, then white fade-out
  tl.clearHighlight();
  tl.setVar("submitting", true);
  await tl.wait(1200);
  await tl.at(20400);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP2_DURATION_MS);
}
