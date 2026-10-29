import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { beginInsert, clickRowHead } from "@/components/sheets/insert-timeline";
import { chooseSub, openMenu } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 39 - Insert > Rows: Row above on row 3, then Row below on row 5. */
export const STEP39_DURATION_MS = 17000;

export async function runStep39(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await clickRowHead(tl, 3);
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.above);
  await chooseSub(tl, "ins-rows", "row-above", { ms: 450, hold: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.aboveDone);
  await ring(tl, "[data-tl=rowhead-3]", 2400);

  await tl.wait(400);
  tl.showCaption(CAPTIONS.below);
  await clickRowHead(tl, 5);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseSub(tl, "ins-rows", "row-below", { ms: 450, hold: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.belowDone);
  await ring(tl, "[data-tl=rowhead-6]", 2400);
  await finish(tl, 900);
}
