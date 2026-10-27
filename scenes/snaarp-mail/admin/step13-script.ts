import type { Timeline } from "@/lib/timeline";
import { hoverOn, press } from "@/scenes/snaarp-admin/script-helpers";
import { CAPTIONS, URL_ADMIN_USERS } from "./data";

/** Snaarp Mail admin, step 13 - Add aliases in bulk (acme-aliases.csv gives three people an alias). */
export const STEP13_DURATION_MS = 50000;

const MAIN = "[data-tl=admin-main]";

export async function runStep13(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.menuOpen);
  await press(tl, "[data-tl=mu-actions-alex]", { ms: 1100 });
  await hoverOn(tl, "[data-tl=mu-action-aliases]", { ms: 800, hold: 400 });
  await tl.click("[data-tl=mu-action-aliases]");
  tl.hover(null);
  await tl.wait(1200);

  await tl.at(6500);
  tl.showCaption(CAPTIONS.bulkTab);
  await press(tl, "[data-tl=al-tab-bulk]", { ms: 900 });
  await tl.wait(800);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.howTo);
  tl.highlight("[data-tl=al-howto]");
  await tl.moveCursorTo("[data-tl=al-howto]", { ms: 800 });
  await tl.wait(3200);
  tl.clearHighlight();

  await tl.at(16500);
  tl.showCaption(CAPTIONS.aliasTemplate);
  await press(tl, "[data-tl=btn-al-template]", { ms: 900 });
  await tl.wait(1800);

  await tl.at(22000);
  tl.showCaption(CAPTIONS.aliasChoose);
  await press(tl, "[data-tl=btn-al-choose]", { ms: 900 });
  await tl.wait(1500);

  await tl.at(27500);
  tl.showCaption(CAPTIONS.aliasProcess);
  await press(tl, "[data-tl=btn-al-process]", { ms: 900 });
  await tl.wait(1800);

  await tl.at(33000);
  tl.showCaption(CAPTIONS.aliasesAdded);
  await tl.scrollPanelTo(MAIN, "[data-tl=mu-row-priya]", 900, { margin: 420 });
  await press(tl, "[data-tl=mu-actions-priya]", { ms: 900 });
  await hoverOn(tl, "[data-tl=mu-action-aliases]", { ms: 700, hold: 300 });
  await tl.click("[data-tl=mu-action-aliases]");
  tl.hover(null);
  await tl.wait(800);
  tl.highlight("[data-tl=al-list]");
  await tl.wait(4000);
  tl.clearHighlight();
  await tl.at(STEP13_DURATION_MS);
}
