import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { finish } from "../shared";
import { CAPTIONS, RANGE, URLS } from "./data";

/** Snaarp Sheets, step 23 - Edit > Cut. Starts on the sample budget; ends with the Team lunch row cut (ants on it). */
export const STEP23_DURATION_MS = 17000;

export async function runStep23(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 800 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.click);
  await chooseRow(tl, "cut", { ms: 600 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ants);
  await tl.wait(2400);
  tl.showCaption(CAPTIONS.wait);
  await finish(tl, 2800);
}
