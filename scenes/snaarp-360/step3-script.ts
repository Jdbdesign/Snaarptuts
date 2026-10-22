import type { Timeline } from "@/lib/timeline";
import type { Step3Screen } from "./Step3Admin";

/** Step 3 — Sign in to Admin. Times are active milliseconds from the start of the step. */
export const STEP3_DURATION_MS = 21800;

const URLS: Record<Step3Screen, string> = {
  A: "login.snaarp.com/products",
  B: "admin.snaarp.com/admin",
  C: "admin.snaarp.com/admin/login",
  D: "admin.snaarp.com/admin",
};

// Sample data only.
const SAMPLE = { email: "jane@acme-studio.com", password: "Sample#Pass1" };

/** Quick white fade, swap the screen and the URL pill, fade back in. */
async function goTo(tl: Timeline, screen: Step3Screen) {
  tl.clearHighlight();
  tl.hover(null);
  tl.setVar("fade", true);
  await tl.wait(300);
  tl.setVar("screen", screen);
  tl.setUrl(URLS[screen]);
  tl.setVar("fade", false);
  await tl.wait(200);
}

export async function runStep3(tl: Timeline) {
  tl.placeCursor(0.55, 0.55);
  tl.setVar("intro", 1);

  // Screen A: products home. Skeleton first, then the icons pop in.
  await tl.at(900);
  tl.setVar("loaded", true);

  await tl.at(1600);
  tl.showCaption("Your account is ready. This is your Snaarp products home");
  tl.highlight("[data-tl=product-grid]");
  await tl.at(3600);
  tl.clearHighlight();

  await tl.at(3800);
  const glide = tl.moveCursorTo("[data-tl=card-emails]", { ms: 900 });
  tl.showCaption("Click Create/Configure Emails to open your admin area");
  await glide;
  tl.hover("[data-tl=card-emails]");
  tl.highlight("[data-tl=card-emails]");
  await tl.at(5400);
  await tl.click("[data-tl=card-emails]");

  // Screen B: loading
  await tl.at(5800);
  tl.hideCaption();
  await goTo(tl, "B");
  await tl.at(7400);

  // Screen C: admin sign-in
  await goTo(tl, "C");
  tl.showCaption("Sign in with the email and password you just created");
  await tl.at(9000);
  await tl.fill("[data-tl=field-admin-email]", "admin-email", SAMPLE.email, { moveMs: 700, msPerChar: 55 });
  await tl.fill("[data-tl=field-admin-password]", "admin-password", SAMPLE.password, { moveMs: 450 });

  await tl.at(12400);
  tl.showCaption("Click Sign in to Admin Portal");
  await tl.moveCursorTo("[data-tl=cta-admin-signin]", { ms: 700 });
  tl.highlight("[data-tl=cta-admin-signin]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-admin-signin]");

  // Screen D: dashboard
  await tl.at(13800);
  await goTo(tl, "D");
  tl.showCaption("This is your Admin Dashboard");
  await tl.animateVar("count", 0, 1, 600);

  await tl.at(15400);
  tl.showCaption("See your domains, users, inboxes and plan at a glance");
  for (const id of ["domains", "users", "inboxes", "plan"]) {
    const sel = `[data-tl=stat-${id}]`;
    await tl.moveCursorTo(sel, { ms: 450 });
    tl.highlight(sel);
    await tl.wait(350);
    tl.clearHighlight();
  }

  await tl.at(18600);
  tl.showCaption("Next, add your company domain");
  await tl.moveCursorTo("[data-tl=menu-domains]", { ms: 700 });
  tl.highlight("[data-tl=menu-domains]");
  await tl.at(21000); // rest on Domains, no click
}
