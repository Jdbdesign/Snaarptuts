import type { Timeline } from "@/lib/timeline";

/** Glide to an element, ring it, click it and clear the ring. The one move every Admin step repeats. */
export async function press(tl: Timeline, selector: string, { ms = 850, ring = 320 }: { ms?: number; ring?: number } = {}) {
  await tl.moveCursorTo(selector, { ms });
  tl.highlight(selector);
  await tl.wait(ring);
  await tl.click(selector);
  tl.clearHighlight();
}

/** Glide to an element and hover it (rows in a list), without clicking. */
export async function hoverOn(tl: Timeline, selector: string, { ms = 650, hold = 500 }: { ms?: number; hold?: number } = {}) {
  await tl.moveCursorTo(selector, { ms });
  tl.hover(selector);
  await tl.wait(hold);
}

/** Click on a blank part of the page heading, which closes any open dropdown. */
export async function clickAway(tl: Timeline, selector = "[data-tl=users-heading]") {
  tl.hover(null);
  await tl.moveCursorTo(selector, { ms: 600, dx: 220 });
  await tl.click(selector);
}
