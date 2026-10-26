import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URL } from "./step6-data";

/** Snaarp Admin, step 6 - Open Manage products. Times are active milliseconds from the start of the step. */
export const STEP6_DURATION_MS = 30000;

export async function runStep6(tl: Timeline) {
  tl.placeCursor(0.55, 0.62);
  tl.setUrl(URL);

  // Open the row's Actions menu
  await tl.at(400);
  tl.showCaption(CAPTIONS.actions);
  await tl.moveCursorTo("[data-tl=actions-sam]", { ms: 1000 });
  tl.highlight("[data-tl=actions-sam]");
  await tl.wait(350);
  await tl.click("[data-tl=actions-sam]");
  tl.clearHighlight();

  // Look down the menu
  await tl.at(3200);
  tl.showCaption(CAPTIONS.menu);
  for (const id of ["edit", "products", "password", "deactivate", "delete"]) {
    const sel = `[data-tl=action-${id}]`;
    await tl.moveCursorTo(sel, { ms: 450 });
    tl.hover(sel);
    await tl.wait(650);
  }

  // Click Manage Products
  await tl.at(8000);
  tl.showCaption(CAPTIONS.manage);
  await tl.moveCursorTo("[data-tl=action-products]", { ms: 600 });
  tl.hover("[data-tl=action-products]");
  tl.highlight("[data-tl=action-products]");
  await tl.wait(500);
  await tl.click("[data-tl=action-products]");
  tl.hover(null);
  tl.clearHighlight();

  // The dialog: what Sam has
  await tl.at(11200);
  tl.showCaption(CAPTIONS.products);
  tl.highlight("[data-tl=mp-owned]");
  await tl.at(14000);
  tl.clearHighlight();

  // Make admin: hover only
  tl.showCaption(CAPTIONS.makeAdmin);
  await tl.moveCursorTo("[data-tl=mp-admin-mail]", { ms: 900 });
  tl.hover("[data-tl=mp-admin-mail]");
  await tl.at(18200);

  // Remove: hover only
  tl.showCaption(CAPTIONS.remove);
  await tl.moveCursorTo("[data-tl=mp-remove-mail]", { ms: 600 });
  tl.hover("[data-tl=mp-remove-mail]");
  await tl.at(22000);
  tl.hover(null);

  // The note under the list
  tl.showCaption(CAPTIONS.note);
  await tl.moveCursorTo("[data-tl=mp-note]", { dx: 180, ms: 800 });
  tl.highlight("[data-tl=mp-note]");
  await tl.at(27400);
  tl.clearHighlight();
  await tl.at(STEP6_DURATION_MS);
}
