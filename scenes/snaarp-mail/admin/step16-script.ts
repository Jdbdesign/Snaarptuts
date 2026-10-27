import type { Timeline } from "@/lib/timeline";
import { hoverOn, press } from "@/scenes/snaarp-admin/script-helpers";
import { CAPTIONS, GROUP_PAGE, MAILBOX, URL_ADMIN_GROUPS, URL_MAILBOX } from "./data";

/** Snaarp Mail admin, step 16 - Add members and use the group email (the mailbox part is the simplest accurate version). */
export const STEP16_DURATION_MS = 56000;

export async function runStep16(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_GROUPS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.addMembers);
  await press(tl, "[data-tl=btn-add-members]", { ms: 1100 });
  await tl.wait(1000);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.pickMembers);
  for (const id of GROUP_PAGE.pick) {
    await press(tl, `[data-tl=am-user-${id}]`, { ms: 650, ring: 120 });
    await tl.wait(350);
  }
  await tl.wait(700);

  await tl.at(14500);
  tl.showCaption(CAPTIONS.confirmAdd);
  await press(tl, "[data-tl=btn-am-add]", { ms: 900 });
  await tl.wait(1500);

  await tl.at(20500);
  tl.showCaption(CAPTIONS.recent);
  tl.highlight("[data-tl=gd-recent]");
  await tl.moveCursorTo("[data-tl=gd-member-jane]", { ms: 900 });
  await tl.wait(4200);
  tl.clearHighlight();

  await tl.at(29500);
  tl.showCaption(CAPTIONS.mailbox);
  tl.setVar("page", "mailbox");
  tl.setUrl(URL_MAILBOX);
  await tl.wait(1800);
  await press(tl, "[data-tl=mb-compose]", { ms: 1000 });
  await tl.wait(900);

  await tl.at(37500);
  tl.showCaption(CAPTIONS.composeFrom);
  await press(tl, "[data-tl=mb-from]", { ms: 1000 });
  await tl.wait(800);
  await hoverOn(tl, "[data-tl=mb-from-own]", { ms: 600, hold: 400 });
  await hoverOn(tl, "[data-tl=mb-from-group]", { ms: 500, hold: 500 });
  await tl.click("[data-tl=mb-from-group]");
  tl.hover(null);
  await tl.wait(800);
  await tl.fill("[data-tl=field-mb-subject]", "mb-subject", MAILBOX.subjectSample, { moveMs: 800, msPerChar: 55 });
  tl.setVar("focus", "");
  tl.highlight("[data-tl=mb-from]");
  await tl.wait(2500);
  tl.clearHighlight();
  await tl.at(STEP16_DURATION_MS);
}
