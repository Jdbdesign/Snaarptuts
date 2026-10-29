import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, SEARCH, URLS } from "./data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { closeDialog, pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 83 - Help > Keyboard shortcuts: the grouped list (scrolls inside the dialog), a search for "bold", then Got it. */
export const STEP83_DURATION_MS = 34000;

export async function runStep83(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "help", { ms: 750 });
  await chooseRow(tl, "hlp-keys", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.groups);
  await ring(tl, "[data-tl=kb-group-0]", 1700);
  tl.showCaption(CAPTIONS.scroll);
  await ring(tl, "[data-tl=kb-group-1]", 1500);
  await ring(tl, "[data-tl=kb-group-2]", 1500);
  await ring(tl, "[data-tl=kb-group-3]", 1500);
  tl.showCaption(CAPTIONS.search);
  await typeInto(tl, "kb-q", SEARCH, { moveMs: 600, msPerChar: 160 });
  await tl.wait(1400);
  tl.showCaption(CAPTIONS.clear);
  tl.setVar("field:kb-q", "");
  tl.setVar("focus", "");
  await tl.wait(1100);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=kb-done]", { ms: 700 });
  closeDialog(tl);
  await finish(tl, 500);
}
