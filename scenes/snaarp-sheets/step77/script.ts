import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { SPELL } from "@/components/sheets/fdt-data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, seedTypo, spellChange } from "@/components/sheets/fdt-timeline";
import { closeDialog, pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 77 - Tools > Spelling: A7 starts with "Quartrly review"; the panel suggests Quarterly, Change fixes it, Done. */
export const STEP77_DURATION_MS = 30000;

export async function runStep77(tl: Timeline) {
  beginFdt(tl, URLS.renamed);
  seedTypo(tl);

  await tl.at(600);
  tl.showCaption(CAPTIONS.typo);
  await ring(tl, `[data-tl=cell-${SPELL.cell}]`, 1800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 750 });
  await chooseRow(tl, "tls-spell", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=spell-suggestion]", 1700);
  tl.showCaption(CAPTIONS.change);
  await pressOn(tl, "[data-tl=spell-change]", { ms: 700 });
  spellChange(tl);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=spell-done]", { ms: 750 });
  closeDialog(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.fixed);
  await ring(tl, `[data-tl=cell-${SPELL.cell}]`, 1800);
  await finish(tl, 400);
}
