import type { Timeline } from "@/lib/timeline";
import { SLIDES_URLS } from "@/components/slides/slides-data";

/** Start of every Snaarp Slides step: the cursor, the address and the fade-in of the first screen. */
export function begin(tl: Timeline, url: string, cursor: [number, number] = [0.5, 0.42]) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("intro", 1);
}

/** Quick fade of the content area only (the rail, sidebar and top bar never flicker), then show another home screen. */
export async function showScreen(tl: Timeline, screen: "presentations" | "starred" | "trash", url: string) {
  tl.setVar("swap", true);
  await tl.wait(150);
  tl.setVar("screen", screen);
  tl.setUrl(url);
  tl.setVar("swap", false);
}

export { SLIDES_URLS };
