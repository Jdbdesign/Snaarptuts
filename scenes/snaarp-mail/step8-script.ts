import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, NEW_USER, SAM, TOASTS } from "./users-data";

/** Snaarp Mail, step 8 - Add your team. Times are active milliseconds from the start of the step. */
export const STEP8_DURATION_MS = 32100;

const MODAL = "[data-tl=user-modal-scroll]";
const ADD_USER = "[data-tl=btn-add-user]";
const CREATE = "[data-tl=btn-create-user]";
const ROW_MENU = "[data-tl=row-menu-0]";
const CONTINUE = "[data-tl=btn-continue]";

export async function runStep8(tl: Timeline) {
  tl.placeCursor(0.6, 0.5);
  tl.setVar("intro", 1); // shell and card fade in, the table is empty

  // Choose Add Manually
  await tl.at(1000);
  tl.showCaption(CAPTIONS.manual);
  tl.highlight("[data-tl=opt-manual]");
  await tl.moveCursorTo("[data-tl=opt-manual]", { ms: 800 });

  // Click Add User
  await tl.at(3500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.addUser);
  await tl.moveCursorTo(ADD_USER, { ms: 800 });
  tl.highlight(ADD_USER);
  await tl.wait(300);
  await tl.click(ADD_USER); // opens the modal
  tl.clearHighlight();

  // The modal: name
  await tl.at(5000);
  tl.showCaption(CAPTIONS.name);
  await tl.fill("[data-tl=field-first]", "first", NEW_USER.first, { moveMs: 600, msPerChar: 90 });
  await tl.fill("[data-tl=field-last]", "last", NEW_USER.last, { moveMs: 450, msPerChar: 90 });

  // Email name on the verified domain
  await tl.at(7200);
  tl.setVar("focus", "");
  tl.setVar("chips", true);
  tl.showCaption(CAPTIONS.email);
  await tl.wait(400);
  tl.highlight("[data-tl=select-domain]");
  await tl.wait(700);
  tl.clearHighlight();
  await tl.moveCursorTo("[data-tl=chip-2]", { ms: 600 }); // sam.lee
  await tl.click("[data-tl=chip-2]"); // fills the name part and the Preview line

  // Recovery email
  await tl.at(10000);
  tl.showCaption(CAPTIONS.recovery);
  await tl.fill("[data-tl=field-recovery]", "recovery", NEW_USER.recovery, { moveMs: 700, msPerChar: 40 });
  tl.setVar("focus", "");

  // Welcome email options, scroll down
  await tl.at(12200);
  tl.showCaption(CAPTIONS.welcome);
  tl.highlight("[data-tl=welcome-options]");
  await tl.wait(900);
  tl.clearHighlight();
  await tl.scrollPanelTo(MODAL, "bottom", 1000);

  // Generated password
  await tl.at(14200);
  tl.setVar("generated", true);
  tl.showCaption(CAPTIONS.password);
  await tl.wait(400);
  await tl.moveCursorTo("[data-tl=btn-copy-password]", { ms: 800 });
  await tl.click("[data-tl=btn-copy-password]"); // toast: Password copied to clipboard

  // Create User
  await tl.at(18000);
  tl.showCaption(CAPTIONS.create);
  await tl.at(18900);
  await tl.moveCursorTo(CREATE, { ms: 700 });
  tl.highlight(CREATE);
  await tl.wait(250);
  await tl.click(CREATE);
  tl.setVar("creating", true); // "Creating..." for one second
  await tl.wait(1000);
  tl.clearHighlight();

  // The modal closes and the row slides in
  await tl.at(21000);
  tl.setVar("modal", false);
  tl.setVar("creating", false);
  tl.setVar("team", [SAM]);
  tl.toast(TOASTS.created(NEW_USER.email), 3500);
  tl.showCaption(CAPTIONS.added);

  // The row's actions menu
  await tl.at(24500);
  tl.showCaption(CAPTIONS.menu);
  await tl.moveCursorTo(ROW_MENU, { ms: 700 });
  await tl.click(ROW_MENU); // Copy link, Edit, Delete
  await tl.wait(300);
  await tl.moveCursorTo("[data-tl=menu-item-copy-link]", { ms: 500, dx: -10 });
  tl.hover("[data-tl=menu-item-copy-link]");
  await tl.at(28000);
  tl.hover(null);
  tl.setVar("menu", -1);

  // Continue
  await tl.at(29000);
  tl.showCaption(CAPTIONS.continue);
  await tl.moveCursorTo(CONTINUE, { ms: 800 });
  tl.highlight(CONTINUE);
  await tl.wait(300);
  await tl.click(CONTINUE);
  tl.clearHighlight();

  // Quick white fade-out
  await tl.at(31500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP8_DURATION_MS);
}
