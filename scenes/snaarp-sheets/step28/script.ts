import type { Timeline } from "@/lib/timeline";
import { FIND } from "@/components/sheets/edit-view-data";
import { beginEdit, chooseRow, closeFind, hoverRow, openMenu, runFind, runReplaceAll } from "@/components/sheets/edit-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 28 - Edit > Find and replace: find Paid, highlight, replace all with Settled. Ends with the box closed. */
export const STEP28_DURATION_MS = 23500;

export async function runStep28(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await hoverRow(tl, "find", { ms: 600 });
  await tl.wait(500);
  await chooseRow(tl, "find", { ms: 400 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.card);
  await ring(tl, "[data-tl=find-card]", 1800);

  tl.showCaption(CAPTIONS.find);
  await typeInto(tl, "find", FIND.query, { msPerChar: 90 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.findClick);
  await pressOn(tl, "[data-tl=find-btn]", { ms: 700 });
  runFind(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.found);
  await ring(tl, "[data-tl=find-count]", 2600);

  tl.showCaption(CAPTIONS.replace);
  await typeInto(tl, "replace", FIND.replacement, { msPerChar: 80 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.replaceClick);
  await pressOn(tl, "[data-tl=find-replace-all]", { ms: 700 });
  runReplaceAll(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-d2]", 2200);

  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=find-done]", { ms: 700 });
  closeFind(tl);
  await tl.wait(600);
  await finish(tl, 1200);
}
