import { initDeck } from "@/components/slides/slides-edit";
import { SLIDES_URLS, type SlideData } from "@/components/slides/slides-data";
import type { Timeline } from "@/lib/timeline";
import { begin } from "./shared";

/* Shared by the Edit, View and Insert steps (20-36). */

export const EIV_URL = SLIDES_URLS.renamed;

/** Start of every step: the cursor, the address, the fade-in and the three-slide deck with slide 2 selected. */
export function beginEiv(tl: Timeline, cursor: [number, number] = [0.55, 0.55], deck?: SlideData[]) {
  begin(tl, EIV_URL, cursor);
  initDeck(tl, deck);
}

/** Click an empty spot on the page (clears the selection). */
export async function clickBlank(tl: Timeline) {
  const sel = "[data-tl=canvas-slide] > [data-slide]";
  await tl.moveCursorTo(sel, { ms: 600, dx: 120, dy: 90 });
  await tl.click(sel);
}
