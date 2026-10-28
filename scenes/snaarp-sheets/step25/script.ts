import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, clickCell, openMenu, quickClip } from "@/components/sheets/edit-timeline";
import { finish } from "../shared";
import { CAPTIONS, COPIED, TARGET, URLS } from "./data";

/** Snaarp Sheets, step 25 - Edit > Paste. Starts with Design tools to Cloud hosting (A2:B3) copied; ends with them also at F2. */
export const STEP25_DURATION_MS = 17000;

export async function runStep25(tl: Timeline) {
  beginEdit(tl, URLS.renamed);
  quickClip(tl, COPIED.from, COPIED.to);

  await tl.at(800);
  tl.showCaption(CAPTIONS.start);
  await tl.wait(2200);
  tl.showCaption(CAPTIONS.click);
  await clickCell(tl, TARGET, { ms: 900 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.paste);
  await chooseRow(tl, "paste", { ms: 600 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.done);
  await finish(tl, 3000);
}
