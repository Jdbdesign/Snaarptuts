import type { Timeline } from "@/lib/timeline";
import { hoverOn, press } from "@/scenes/snaarp-admin/script-helpers";
import { CAPTIONS, FORWARDING, URL_ADMIN_FORWARDING, URL_ADMIN_USERS } from "./data";

/** Snaarp Mail admin, step 17 - Forward emails to other users (the last Mail admin step). */
export const STEP17_DURATION_MS = 56000;

export async function runStep17(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.forwardingMenu);
  await press(tl, "[data-tl=menu-forwarding]", { ms: 1100 });
  tl.setUrl(URL_ADMIN_FORWARDING);
  await tl.wait(1200);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.about);
  await press(tl, "[data-tl=fw-about]", { ms: 900 });
  tl.highlight("[data-tl=fw-about-body]");
  await tl.wait(4500);
  tl.clearHighlight();
  await tl.click("[data-tl=fw-about]");
  await tl.wait(500);

  await tl.at(15500);
  tl.showCaption(CAPTIONS.tick);
  await tl.scrollPanelTo("[data-tl=fw-user-list]", "[data-tl=fw-user-noah]", 1200, { margin: 20 });
  for (const id of FORWARDING.pickUsers) {
    await press(tl, `[data-tl=fw-user-${id}]`, { ms: 800, ring: 150 });
    await tl.wait(500);
  }
  await tl.wait(800);

  await tl.at(26000);
  tl.showCaption(CAPTIONS.supervisor);
  await press(tl, "[data-tl=fw-supervisor]", { ms: 1000 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=fw-sup-chloe]", { ms: 700, hold: 300 });
  await tl.scrollPanelTo("[data-tl=fw-sup-list]", "bottom", 1200);
  await tl.scrollPanelTo("[data-tl=fw-sup-list]", "top", 700);
  await hoverOn(tl, "[data-tl=fw-sup-jane]", { ms: 600, hold: 400 });
  await tl.click("[data-tl=fw-sup-jane]");
  tl.hover(null);
  await tl.wait(1200);

  await tl.at(38500);
  tl.showCaption(CAPTIONS.enable);
  await press(tl, "[data-tl=btn-enable-forwarding]", { ms: 1000 });
  await tl.wait(1800);

  await tl.at(46000);
  tl.showCaption(CAPTIONS.status);
  tl.highlight("[data-tl=fw-status]");
  tl.highlight("[data-tl=fw-user-mia]");
  await tl.moveCursorTo("[data-tl=fw-status]", { ms: 900 });
  await tl.wait(4500);
  tl.clearHighlight();
  await tl.at(STEP17_DURATION_MS);
}
