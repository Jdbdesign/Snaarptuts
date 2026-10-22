import type { Timeline } from "@/lib/timeline";
import { PASSWORD_RULES } from "./signup-data";

/** Step 2 — Create your account. Times are active milliseconds from the start of the step. */
export const STEP2_DURATION_MS = 17300;

// Sample data only. The password has upper, lower, number and special characters.
const SAMPLE = {
  first: "Jane",
  last: "Doe",
  email: "jane@acme-studio.com",
  org: "Acme Studio",
  phone: "801 234 5678",
  password: "Sample#Pass1",
};

export async function runStep2(tl: Timeline) {
  tl.placeCursor(0.5, 0.5);
  tl.setVar("intro", 1); // scene fades in, orbit is already turning

  // The plan is already chosen
  await tl.at(1000);
  tl.showCaption("Your plan is already selected: Business, £99/month");
  tl.highlight("[data-tl=plan-header]");
  await tl.at(2800);
  tl.clearHighlight();

  // Name
  await tl.at(3000);
  tl.showCaption("Enter your first and last name");
  await tl.fill("[data-tl=field-first]", "first", SAMPLE.first, { moveMs: 700 });
  await tl.fill("[data-tl=field-last]", "last", SAMPLE.last, { moveMs: 450 });

  // Email
  await tl.at(5200);
  tl.showCaption("Use your company email address");
  await tl.fill("[data-tl=field-email]", "email", SAMPLE.email, { msPerChar: 60 });

  // Organization
  await tl.at(7400);
  tl.showCaption("Enter your organization name");
  await tl.fill("[data-tl=field-org]", "org", SAMPLE.org);

  // Country and phone
  await tl.at(8800);
  tl.showCaption("Check your country and phone code");
  tl.highlight("[data-tl=country]");
  tl.highlight("[data-tl=dial]");
  await tl.moveCursorTo("[data-tl=country]", { ms: 400, dx: 120 });
  await tl.wait(350);
  tl.clearHighlight();
  await tl.fill("[data-tl=field-phone]", "phone", SAMPLE.phone, { moveMs: 380 });

  // Password, rules and scroll
  await tl.at(10800);
  tl.showCaption("Create a strong password");
  await tl.moveCursorTo("[data-tl=field-password]", { ms: 450 });
  await tl.click("[data-tl=field-password]");
  const typed = tl.typeText("password", SAMPLE.password, { msPerChar: 70 });
  await tl.wait(250);
  tl.setVar("rules", true);
  await tl.wait(60); // let the rules list render before measuring
  const scrolled = tl.scrollPanelTo("[data-tl=form-panel]", "[data-tl=signup-footer]", 1100, { margin: 96 });
  const ticked = (async () => {
    for (const r of PASSWORD_RULES) await tl.tickRule(`[data-tl=rule-${r.id}]`);
  })();
  await Promise.all([typed, scrolled, ticked]);

  // Sign up
  await tl.at(13600);
  tl.showCaption("Click Sign up to Snaarp 360");
  await tl.moveCursorTo("[data-tl=cta-signup]", { ms: 800 });
  tl.highlight("[data-tl=cta-signup]");
  await tl.wait(350);
  await tl.click("[data-tl=cta-signup]");

  // Loading state, then white fade-out
  tl.clearHighlight();
  tl.setVar("submitting", true);
  await tl.wait(1000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.wait(500);
}
