import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, hoverRow, openMenu, pressEsc } from "@/components/sheets/edit-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 36 - View > Full screen (simulated inside the frame), then Esc. The last step: the completion card follows. */
export const STEP36_DURATION_MS = 22000;

export async function runStep36(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 900 });
  await hoverRow(tl, "fullscreen", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.click);
  await chooseRow(tl, "fullscreen", { ms: 400 });
  await tl.wait(900);
  tl.showCaption(CAPTIONS.full);
  await tl.wait(3200);
  tl.showCaption(CAPTIONS.exit);
  await tl.wait(2800);
  await pressEsc(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.back);
  await finish(tl, 2200);
}
