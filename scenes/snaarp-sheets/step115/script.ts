import type { Timeline } from "@/lib/timeline";
import { beginTb, closeHeaderMenu, hoverHeader, pressHeader } from "@/components/sheets/toolbar-timeline";
import { hoverOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 115 - the lock icon: its tooltip and the access card (Restricted, with a Change link). Starts with A1 selected. */
export const STEP115_DURATION_MS = 20000;

export async function runStep115(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverHeader(tl, "lock", { hold: 1600 });
  tl.showCaption(CAPTIONS.open);
  await pressHeader(tl, "lock", "lock", { ms: 300 });
  tl.showCaption(CAPTIONS.card);
  await ring(tl, "[data-tl=tm-lock]", 2200);
  tl.showCaption(CAPTIONS.change);
  await hoverOn(tl, "[data-tl=tm-lock-change]", { ms: 500 });
  await tl.wait(1400);
  tl.hover(null);
  tl.showCaption(CAPTIONS.close);
  await pressHeader(tl, "lock", undefined, { ms: 700 });
  closeHeaderMenu(tl);
  await finish(tl, 900);
}
