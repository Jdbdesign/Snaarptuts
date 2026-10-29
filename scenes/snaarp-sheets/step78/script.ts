import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, CELL, URLS } from "./data";
import { AUTOCOMPLETE } from "@/components/sheets/fdt-data";
import { chooseRow, commit, getRows, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, typeWithSuggestion } from "@/components/sheets/fdt-timeline";
import { parseRef, setCellText } from "@/components/sheets/grid-state";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 78 - Tools > Autocomplete: off (typing Pa suggests nothing), then on (a grey "id" appears and Tab takes it). */
export const STEP78_DURATION_MS = 42000;

export async function runStep78(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 750 });
  await chooseRow(tl, "tls-auto", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.off);
  await ring(tl, "[data-tl=sheet-notice]", 1500);

  tl.showCaption(CAPTIONS.type);
  await typeWithSuggestion(tl, CELL, AUTOCOMPLETE.typed, false);
  tl.showCaption(CAPTIONS.noGhost);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1500);
  const [r, c] = parseRef(CELL);
  commit(tl, setCellText(getRows(tl), r, c, ""));
  tl.setVar("history", { past: [], future: [] });

  tl.showCaption(CAPTIONS.on);
  await openMenu(tl, "tools", { ms: 650 });
  await chooseRow(tl, "tls-auto", { ms: 450 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.onDone);
  await ring(tl, "[data-tl=sheet-notice]", 1500);

  tl.showCaption(CAPTIONS.type2);
  await typeWithSuggestion(tl, CELL, AUTOCOMPLETE.typed, true);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${CELL}]`, 1800);
  await finish(tl, 400);
}
