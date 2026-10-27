import type { Timeline } from "@/lib/timeline";
import { hoverOn, press } from "@/scenes/snaarp-admin/script-helpers";
import { ALIASES, CAPTIONS, URL_ADMIN_USERS } from "./data";

/** Snaarp Mail admin, step 12 - Add an alias to one user (Alex Morgan gets hello@acme-studio.com). */
export const STEP12_DURATION_MS = 46000;

export async function runStep12(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.menuOpen);
  await press(tl, "[data-tl=mu-actions-alex]", { ms: 1100 });
  await tl.wait(1000);

  await tl.at(4500);
  tl.showCaption(CAPTIONS.aliasesItem);
  await hoverOn(tl, "[data-tl=mu-action-permissions]", { ms: 700, hold: 300 });
  await hoverOn(tl, "[data-tl=mu-action-aliases]", { ms: 500, hold: 500 });
  await tl.click("[data-tl=mu-action-aliases]");
  tl.hover(null);
  await tl.wait(1500);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.addFirst);
  await press(tl, "[data-tl=btn-al-first]", { ms: 1000 });
  await tl.wait(900);

  await tl.at(15500);
  tl.showCaption(CAPTIONS.aliasType);
  await tl.fill("[data-tl=field-alias-name]", "alias-name", ALIASES.sample, { moveMs: 900, msPerChar: 140 });
  tl.highlight("[data-tl=al-domain]");
  await tl.wait(1800);
  tl.clearHighlight();

  await tl.at(24500);
  tl.showCaption(CAPTIONS.aliasAdd);
  await press(tl, "[data-tl=btn-al-add]", { ms: 900 });
  await tl.wait(1200);

  await tl.at(31000);
  tl.showCaption(CAPTIONS.aliasDone);
  tl.highlight("[data-tl=al-tab-list]");
  tl.highlight("[data-tl=al-list]");
  await tl.moveCursorTo("[data-tl=al-list]", { ms: 900 });
  await tl.wait(4500);
  tl.clearHighlight();
  await tl.at(STEP12_DURATION_MS);
}
