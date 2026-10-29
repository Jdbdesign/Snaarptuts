import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { EMOJI } from "@/components/sheets/insert-data";
import { chooseRow, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { beginInsert, insertEmoji } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 51 - Insert > Emoji: search "smile" and add one to D2. */
export const STEP51_DURATION_MS = 13800;

export async function runStep51(tl: Timeline) {
  beginInsert(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, EMOJI.cell, { ms: 800 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-emoji", { ms: 500 });
  tl.setVar("dialog", "emoji");
  await tl.wait(700);
  tl.showCaption(CAPTIONS.picker);
  await ring(tl, "[data-tl=emoji-tab-gestures]", 1700);
  tl.showCaption(CAPTIONS.search);
  await typeInto(tl, "emoji-search", EMOJI.query, { msPerChar: 130 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, `[data-tl=emoji-${EMOJI.pick}]`, { ms: 800 });
  insertEmoji(tl, EMOJI.cell, EMOJI.pick);
  await tl.wait(800);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${EMOJI.cell}]`, 1800);
  await finish(tl, 600);
}
