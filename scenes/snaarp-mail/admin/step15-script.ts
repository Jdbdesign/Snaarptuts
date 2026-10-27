import type { Timeline } from "@/lib/timeline";
import { hoverOn, press } from "@/scenes/snaarp-admin/script-helpers";
import { CAPTIONS, GROUPS, URL_ADMIN_GROUPS, URL_ADMIN_USERS } from "./data";

/** Snaarp Mail admin, step 15 - Create a group (the three-step wizard, then the group page). */
export const STEP15_DURATION_MS = 62000;

export async function runStep15(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.groupsMenu);
  await press(tl, "[data-tl=menu-groups]", { ms: 1100 });
  tl.setUrl(URL_ADMIN_GROUPS);
  await tl.wait(1200);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.createGroup);
  await press(tl, "[data-tl=btn-create-group]", { ms: 1000 });
  await tl.wait(900);

  await tl.at(9000);
  tl.showCaption(CAPTIONS.groupName);
  await tl.fill("[data-tl=field-gname]", "gname", GROUPS.name, { moveMs: 900, msPerChar: 120 });
  await tl.fill("[data-tl=field-gdesc]", "gdesc", GROUPS.description, { moveMs: 600, msPerChar: 55 });
  tl.setVar("focus", "");
  await tl.wait(700);

  await tl.at(19000);
  tl.showCaption(CAPTIONS.next);
  await press(tl, "[data-tl=btn-wz-next]", { ms: 900 });
  await tl.wait(1200);

  await tl.at(23500);
  tl.showCaption(CAPTIONS.inbox);
  await press(tl, "[data-tl=gr-inbox-select]", { ms: 900 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=gr-inbox-hello]", { ms: 700, hold: 300 });
  await tl.scrollPanelTo("[data-tl=gr-inbox-list]", "bottom", 700);
  await hoverOn(tl, "[data-tl=gr-inbox-support]", { ms: 600, hold: 400 });
  await tl.click("[data-tl=gr-inbox-support]");
  tl.hover(null);
  tl.highlight("[data-tl=gr-inbox-help]");
  await tl.wait(2500);
  tl.clearHighlight();

  await tl.at(33500);
  tl.showCaption(CAPTIONS.next);
  await press(tl, "[data-tl=btn-wz-next]", { ms: 900 });
  await tl.wait(1200);

  await tl.at(38000);
  tl.showCaption(CAPTIONS.settings);
  await hoverOn(tl, "[data-tl=gr-type-shared-mailbox]", { ms: 900, hold: 500 });
  await press(tl, "[data-tl=gr-type-security-group]", { ms: 600 });
  await tl.wait(1500);

  await tl.at(45000);
  tl.showCaption(CAPTIONS.createIt);
  await press(tl, "[data-tl=btn-wz-next]", { ms: 900 });
  await tl.wait(1800);

  await tl.at(51500);
  tl.showCaption(CAPTIONS.openGroup);
  await tl.moveCursorTo("[data-tl=g-row-support]", { ms: 900 });
  tl.highlight("[data-tl=g-row-support]");
  await tl.wait(500);
  await tl.click("[data-tl=g-row-support]");
  tl.clearHighlight();
  await tl.wait(1500);
  tl.highlight("[data-tl=gd-info]");
  await tl.wait(3500);
  tl.clearHighlight();
  await tl.at(STEP15_DURATION_MS);
}
