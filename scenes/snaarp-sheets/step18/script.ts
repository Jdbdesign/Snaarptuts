import type { Timeline } from "@/lib/timeline";
import { closeFileMenu, hoverItem, openFileMenu } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 18 - File > Settings (greyed out). Starts on "Acme Studio – Q3 Budget". */
export const STEP18_DURATION_MS = 8600;

export async function runStep18(tl: Timeline) {
  begin(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await hoverItem(tl, "settings", { ms: 700 });
  tl.highlight("[data-tl=file-item-settings]");
  tl.showCaption(CAPTIONS.disabled);
  await tl.wait(1800);
  tl.showCaption(CAPTIONS.note);
  await tl.wait(2400);
  tl.clearHighlight();
  closeFileMenu(tl);
  await finish(tl, 500);
}
