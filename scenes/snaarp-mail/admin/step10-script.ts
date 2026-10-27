import type { Timeline } from "@/lib/timeline";
import { press } from "@/scenes/snaarp-admin/script-helpers";
import { CAPTIONS, URL_ADMIN_USERS } from "./data";

/** Snaarp Mail admin, step 10 - Upload users in bulk. Times are active milliseconds from the start of the step. */
export const STEP10_DURATION_MS = 50000;

const MAIN = "[data-tl=admin-main]";

export async function runStep10(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.bulkOpen);
  await press(tl, "[data-tl=btn-bulk-upload]", { ms: 1100 });
  await tl.wait(1000);

  await tl.at(4500);
  tl.showCaption(CAPTIONS.template);
  await press(tl, "[data-tl=btn-bu-template]", { ms: 900 });
  await tl.wait(1800);

  await tl.at(9500);
  tl.showCaption(CAPTIONS.read);
  await tl.moveCursorTo("[data-tl=bu-scroll]", { ms: 700 });
  await tl.scrollPanelTo("[data-tl=bu-scroll]", "bottom", 3200);
  tl.highlight("[data-tl=bu-notes]");
  await tl.wait(2800);
  tl.clearHighlight();
  await tl.scrollPanelTo("[data-tl=bu-scroll]", "top", 900);

  await tl.at(20500);
  tl.showCaption(CAPTIONS.browse);
  await press(tl, "[data-tl=btn-bu-browse]", { ms: 900 });
  await tl.wait(1800);

  await tl.at(26500);
  tl.showCaption(CAPTIONS.upload);
  await press(tl, "[data-tl=btn-bu-upload]", { ms: 900 });
  await tl.wait(1500);

  await tl.at(32000);
  tl.showCaption(CAPTIONS.uploaded);
  await tl.scrollPanelTo(MAIN, "[data-tl=mu-row-felix]", 900, { margin: 120 });
  tl.highlight("[data-tl=mu-row-felix]");
  tl.highlight("[data-tl=mu-row-ines]");
  await tl.moveCursorTo("[data-tl=mu-row-felix]", { ms: 800, dx: 120 });
  await tl.wait(3500);
  tl.clearHighlight();
  await tl.scrollPanelTo(MAIN, "[data-tl=mu-row-tessa]", 1200, { margin: 100 });
  tl.highlight("[data-tl=mu-row-tessa]");
  await tl.moveCursorTo("[data-tl=mu-row-tessa]", { ms: 800, dx: 120 });
  await tl.wait(2500);
  tl.clearHighlight();
  await tl.at(STEP10_DURATION_MS);
}
