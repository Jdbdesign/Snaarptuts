import type { Timeline } from "@/lib/timeline";
import { PRODUCT_TO_ADD } from "./admin-data";
import { CAPTIONS, SEARCH, URL } from "./step7-data";

/** Snaarp Admin, step 7 - Add the user to another product. Times are active milliseconds from the start of the step. */
export const STEP7_DURATION_MS = 32000;

const BODY = "[data-tl=manage-scroll]";
const LIST = "[data-tl=mp-list]";

export async function runStep7(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL);

  // Open the searchable list
  await tl.at(400);
  tl.showCaption(CAPTIONS.open);
  await tl.moveCursorTo("[data-tl=mp-select]", { ms: 1000 });
  tl.highlight("[data-tl=mp-select]");
  await tl.wait(350);
  await tl.click("[data-tl=mp-select]");
  tl.clearHighlight();
  await tl.wait(300);
  await tl.scrollPanelTo(BODY, "bottom", 700);

  // Scroll through every product the user does not have yet
  await tl.at(4200);
  tl.showCaption(CAPTIONS.scroll);
  await tl.moveCursorTo("[data-tl=mp-opt-crm]", { ms: 700 });
  await tl.scrollPanelTo(LIST, "bottom", 2200);
  await tl.wait(400);
  await tl.scrollPanelTo(LIST, "top", 1400);

  // Type to filter
  await tl.at(10800);
  tl.showCaption(CAPTIONS.search);
  await tl.fill("[data-tl=mp-search]", "mpsearch", SEARCH, { moveMs: 800, msPerChar: 200 });
  await tl.wait(600);

  // Choose Snaarp Books
  await tl.at(14800);
  tl.showCaption(CAPTIONS.choose);
  const option = `[data-tl=mp-opt-${PRODUCT_TO_ADD}]`;
  await tl.moveCursorTo(option, { ms: 700 });
  tl.hover(option);
  tl.highlight(option);
  await tl.wait(700);
  await tl.click(option); // closes the list, Add turns purple
  tl.hover(null);
  tl.clearHighlight();

  // Click Add
  await tl.at(19000);
  tl.showCaption(CAPTIONS.add);
  await tl.wait(400);
  await tl.scrollPanelTo(BODY, "bottom", 500);
  await tl.moveCursorTo("[data-tl=btn-mp-add]", { ms: 800 });
  tl.highlight("[data-tl=btn-mp-add]");
  await tl.wait(450);
  await tl.click("[data-tl=btn-mp-add]"); // toast "Added 1 product", Snaarp Books joins the list
  tl.clearHighlight();

  await tl.at(24000);
  await tl.scrollPanelTo(BODY, "top", 700);
  tl.showCaption(CAPTIONS.added);
  tl.highlight(`[data-tl=mp-row-${PRODUCT_TO_ADD}]`);
  await tl.at(28800);
  tl.clearHighlight();
  await tl.at(STEP7_DURATION_MS);
}
