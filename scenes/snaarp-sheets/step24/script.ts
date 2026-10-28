import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { finish } from "../shared";
import { CAPTIONS, RANGE, URLS } from "./data";

/** Snaarp Sheets, step 24 - Edit > Copy. Starts on the sample budget; ends with Design tools to Cloud hosting (A2:B3) copied. */
export const STEP24_DURATION_MS = 17000;

export async function runStep24(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 800 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.click);
  await chooseRow(tl, "copy", { ms: 600 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ants);
  await tl.wait(2400);
  tl.showCaption(CAPTIONS.stay);
  await finish(tl, 2800);
}
