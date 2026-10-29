import type { Timeline } from "@/lib/timeline";
import { beginTb, closeHeaderMenu, hoverHeader, pressHeader } from "@/components/sheets/toolbar-timeline";
import { hoverOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 111 - the apps icon: the product switcher. Starts with A1 selected. */
export const STEP111_DURATION_MS = 26000;

export async function runStep111(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverHeader(tl, "apps", { hold: 1400 });
  tl.showCaption(CAPTIONS.open);
  await pressHeader(tl, "apps", "apps", { ms: 300 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=tm-apps]", 2000);
  tl.showCaption(CAPTIONS.point);
  for (const id of ["mail", "doc", "slides"]) {
    await hoverOn(tl, `[data-tl=tm-apps-${id}]`, { ms: 450 });
    await tl.wait(700);
  }
  tl.hover(null);
  tl.showCaption(CAPTIONS.current);
  await ring(tl, "[data-tl=tm-apps-sheets]", 2200);
  tl.showCaption(CAPTIONS.close);
  await pressHeader(tl, "apps", undefined, { ms: 700 });
  closeHeaderMenu(tl);
  await finish(tl, 900);
}
