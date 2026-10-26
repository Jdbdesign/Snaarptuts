import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URL } from "./step5-data";

/** Snaarp Admin, step 5 - Check the user's access. Times are active milliseconds from the start of the step. */
export const STEP5_DURATION_MS = 22000;

/** Click the page heading: it closes any open row dropdown. */
async function clickAway(tl: Timeline) {
  await tl.moveCursorTo("[data-tl=users-heading]", { dx: 160, ms: 600 });
  await tl.click("[data-tl=users-heading]");
}

export async function runStep5(tl: Timeline) {
  tl.placeCursor(0.55, 0.62);
  tl.setUrl(URL);

  await tl.at(400);
  tl.showCaption(CAPTIONS.row);
  tl.highlight("[data-tl=row-sam]");
  await tl.at(2400);
  tl.clearHighlight();

  // Role dropdown
  tl.showCaption(CAPTIONS.role);
  await tl.moveCursorTo("[data-tl=role-sam]", { ms: 900 });
  await tl.click("[data-tl=role-sam]");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.roleOptions);
  for (const id of ["user", "administrator", "super-administrator"]) {
    const sel = `[data-tl=role-opt-${id}]`;
    await tl.moveCursorTo(sel, { ms: 500 });
    tl.hover(sel);
    await tl.wait(700);
  }
  tl.hover(null);
  await tl.at(8400);
  await clickAway(tl);

  // Products dropdown
  await tl.at(9600);
  tl.showCaption(CAPTIONS.products);
  await tl.moveCursorTo("[data-tl=products-sam]", { ms: 800 });
  await tl.click("[data-tl=products-sam]");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.productList);
  tl.highlight("[data-tl=products-list]");
  for (const id of ["mail", "pdf", "drive", "key"]) {
    const sel = `[data-tl=products-item-${id}]`;
    await tl.moveCursorTo(sel, { ms: 450 });
    await tl.wait(450);
  }
  tl.clearHighlight();
  await tl.at(16000);
  await clickAway(tl);

  await tl.at(18000);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=actions-sam]");
  await tl.at(20600);
  tl.clearHighlight();
  await tl.at(STEP5_DURATION_MS);
}
