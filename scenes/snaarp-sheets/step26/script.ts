import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, chooseSub, clickCell, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, RANGE, TARGETS, URLS } from "./data";

/** Snaarp Sheets, step 26 - Edit > Paste special, all three ways. Starts on the sample budget; ends with the paste-transposed result at F5. */
export const STEP26_DURATION_MS = 40500;

const cell = (ref: string) => `[data-tl=cell-${ref}]`;

async function pasteSpecial(tl: Timeline, target: string, sub: string, text: { before: string; click: string; after: string }, beforeRef: string, afterRef: string) {
  tl.showCaption(text.before);
  await ring(tl, cell(beforeRef), 2000);
  tl.showCaption(CAPTIONS.pick);
  await clickCell(tl, target, { ms: 800 });
  tl.showCaption(CAPTIONS.special);
  await openMenu(tl, "edit", { ms: 700 });
  tl.showCaption(text.click);
  await chooseSub(tl, "pastespecial", sub, { ms: 500 });
  await tl.wait(500);
  tl.showCaption(text.after);
  await ring(tl, cell(afterRef), 2600);
}

export async function runStep26(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 700 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 700 });
  tl.showCaption(CAPTIONS.copy);
  await chooseRow(tl, "copy", { ms: 550 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(2200);

  await pasteSpecial(tl, TARGETS.values, "paste-values", { before: CAPTIONS.valuesBefore, click: CAPTIONS.valuesClick, after: CAPTIONS.valuesAfter }, "a1", TARGETS.values);
  await pasteSpecial(tl, TARGETS.format, "paste-format", { before: CAPTIONS.formatBefore, click: CAPTIONS.formatClick, after: CAPTIONS.formatAfter }, TARGETS.format, TARGETS.format);
  await pasteSpecial(tl, TARGETS.transposed, "paste-transposed", { before: CAPTIONS.transBefore, click: CAPTIONS.transClick, after: CAPTIONS.transAfter }, "a1", TARGETS.transposed);
  await finish(tl, 1200);
}
