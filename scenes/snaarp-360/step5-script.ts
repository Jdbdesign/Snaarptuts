import type { Timeline } from "@/lib/timeline";
import type { Step5Screen } from "./Step5Users";
import { NEW_USER } from "./step5/step5-data";

/** Step 5 — Add your first user. Times are active milliseconds from the start of the step. */
export const STEP5_DURATION_MS = 42000;

const MODAL = "[data-tl=user-modal-scroll]";

const URLS: Record<Step5Screen, string> = {
  owner: "admin.snaarp.com/admin/users",
  login: "login.snaarp.com/login?redirect=%2F",
  products: "login.snaarp.com/admin",
  loading: "login.snaarp.com/admin",
  panel: "login.snaarp.com/admin",
};

/** Quick white fade, swap the screen and the URL pill, fade back in. */
async function goTo(tl: Timeline, screen: Step5Screen) {
  tl.clearHighlight();
  tl.hover(null);
  tl.setVar("fade", true);
  await tl.wait(300);
  tl.setVar("screen", screen);
  tl.setUrl(URLS[screen]);
  tl.setVar("fade", false);
  await tl.wait(200);
}

export async function runStep5(tl: Timeline) {
  // Continue exactly where step 4 stopped: same screen, cursor where the "Verify Domain" click left it. No fade.
  tl.placeCursorOn("[data-tl=menu-item-verify]");
  tl.showCaption("Open User in the menu");

  await tl.at(300);
  await tl.moveCursorTo("[data-tl=menu-user]", { ms: 1000 });
  tl.hover("[data-tl=menu-user]");
  await tl.click("[data-tl=menu-user]"); // swaps in User Management (screen A)
  tl.hover(null);
  tl.setUrl(URLS.owner);

  // A: empty User Management
  await tl.at(2400);
  tl.showCaption("Click Add User");
  await tl.moveCursorTo("[data-tl=btn-add-user]", { ms: 800 });
  tl.highlight("[data-tl=btn-add-user]");
  await tl.wait(350);
  await tl.click("[data-tl=btn-add-user]"); // opens the modal
  tl.clearHighlight();

  // B: Add New User
  await tl.at(4000);
  tl.showCaption("Enter the new user's name");
  await tl.fill("[data-tl=field-first]", "first", NEW_USER.first, { moveMs: 600, msPerChar: 80 });
  await tl.fill("[data-tl=field-last]", "last", NEW_USER.last, { moveMs: 450, msPerChar: 80 });

  await tl.at(6600);
  tl.setVar("focus", "");
  tl.setVar("chips", true);
  tl.showCaption("Choose an email name. Your verified domain is already selected");
  await tl.wait(450);
  tl.highlight("[data-tl=select-domain]");
  await tl.wait(800);
  tl.clearHighlight();
  await tl.moveCursorTo("[data-tl=chip-2]", { ms: 600 }); // sam.lee
  await tl.click("[data-tl=chip-2]"); // fills the name part, shows the preview

  await tl.at(9400);
  tl.showCaption("Add a recovery email");
  await tl.fill("[data-tl=field-recovery]", "recovery", NEW_USER.recovery, { moveMs: 700, msPerChar: 40 });
  tl.setVar("focus", "");

  await tl.at(11600);
  tl.showCaption("Keep both welcome email options on");
  tl.highlight("[data-tl=welcome-options]");
  await tl.wait(900);
  tl.clearHighlight();
  await tl.scrollPanelTo(MODAL, "bottom", 1000);

  await tl.at(13800);
  tl.setVar("generated", true); // password fades in, Credentials box fills in
  tl.showCaption("Copy the generated password and keep it safe");
  await tl.wait(400);
  await tl.moveCursorTo("[data-tl=btn-copy-password]", { ms: 800 });
  await tl.click("[data-tl=btn-copy-password]"); // toast: Password copied to clipboard

  await tl.at(16000);
  tl.showCaption("These are the new user's sign-in details");
  tl.highlight("[data-tl=credentials]");
  await tl.wait(1200);
  tl.clearHighlight();

  await tl.at(18600);
  tl.showCaption("Click Create User");
  await tl.moveCursorTo("[data-tl=btn-create-user]", { ms: 700 });
  tl.highlight("[data-tl=btn-create-user]");
  await tl.wait(250);
  await tl.click("[data-tl=btn-create-user]");
  tl.setVar("creating", true); // "Creating..." for one second
  await tl.wait(1000);
  tl.clearHighlight();

  // C: the user now exists
  tl.setVar("modal", false);
  tl.setVar("creating", false);
  tl.setVar("created", true);
  tl.toast(`User inbox ${NEW_USER.email} created successfully!`, 3500);
  tl.showCaption("Your first user is created");

  await tl.at(23400);
  tl.showCaption("Copy the email address. Your user will sign in with it");
  await tl.moveCursorTo("[data-tl=user-email]", { dx: -80, ms: 600 });
  await Promise.all([
    tl.moveCursorTo("[data-tl=user-email]", { dx: 80, ms: 700 }),
    tl.animateVar("sel", 0, 1, 700), // the email text gets selected as the cursor drags over it
  ]);

  // D: sign in as the new user
  await tl.at(25600);
  await goTo(tl, "login");
  tl.showCaption("Now sign in as the new user");

  await tl.at(26700);
  await tl.fill("[data-tl=field-login-email]", "login-email", NEW_USER.email, { moveMs: 400, msPerChar: 26 });
  await tl.fill("[data-tl=field-login-password]", "login-password", NEW_USER.password, { moveMs: 250, msPerChar: 36 });
  tl.setVar("focus", "");
  tl.showCaption("Click Login");
  await tl.moveCursorTo("[data-tl=btn-login]", { ms: 300 });
  tl.highlight("[data-tl=btn-login]");
  await tl.wait(150);
  await tl.click("[data-tl=btn-login]");
  tl.clearHighlight();
  tl.setVar("loggingIn", true);
  tl.toast("Login successful", 2200);
  await tl.wait(900); // let the toast be read before the next screen

  // E: products home for the new user
  await tl.at(30400);
  tl.showCaption("Admins see a System Admin card. Click it");
  await goTo(tl, "products");
  tl.placeCursor(0.45, 0.62);
  await tl.wait(800);
  tl.setVar("loaded", true); // skeleton tiles, then only "Project"
  await tl.moveCursorTo("[data-tl=card-admin]", { ms: 900 });
  tl.hover("[data-tl=card-admin]");
  tl.highlight("[data-tl=card-admin]");
  await tl.wait(400);
  await tl.click("[data-tl=card-admin]");

  // F: Admin Panel dashboard
  await tl.at(33600);
  tl.clearHighlight();
  tl.hover(null);
  tl.hideCaption();
  await goTo(tl, "loading");
  await tl.wait(100);
  await goTo(tl, "panel");
  tl.showCaption("This is the Admin Panel for your new admin");
  for (const id of ["total", "active", "admins"]) {
    const sel = `[data-tl=pstat-${id}]`;
    await tl.moveCursorTo(sel, { ms: 450 });
    tl.highlight(sel);
    await tl.wait(350);
    tl.clearHighlight();
  }

  // G: Admin Panel, Users
  await tl.at(36400);
  await tl.moveCursorTo("[data-tl=panel-menu-users]", { ms: 600 });
  tl.hover("[data-tl=panel-menu-users]");
  await tl.click("[data-tl=panel-menu-users]");
  tl.hover(null);
  tl.setUrl("login.snaarp.com/admin/users");
  tl.showCaption("Both people now appear in Users");

  await tl.at(39400);
  tl.showCaption("Your team can now sign in with their own Snaarp email");
  for (const id of ["jane", "sam"]) {
    const sel = `[data-tl=prow-${id}]`;
    await tl.moveCursorTo(sel, { dx: -200, ms: 450 });
    tl.highlight(sel);
    await tl.wait(700);
    tl.clearHighlight();
  }
  await tl.at(42000);
}
