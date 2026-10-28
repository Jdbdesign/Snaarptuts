import type { Timeline } from "@/lib/timeline";
import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export { begin, endFade } from "@/components/sheets/sheets-timeline";
export { SHEETS_URLS };

/** The quick white fade every step ends with: a short pause, the caption goes, then the page fades to white. */
export async function finish(tl: Timeline, holdMs = 900) {
  await tl.wait(holdMs);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.wait(450);
}
