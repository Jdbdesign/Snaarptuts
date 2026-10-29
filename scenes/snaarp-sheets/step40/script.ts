import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { beginInsert, clickColHead } from "@/components/sheets/insert-timeline";
import { chooseSub, openMenu } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 40 - Insert > Columns: Column left on C, then Column right on E. */
export const STEP40_DURATION_MS = 17000;

export async function runStep40(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await clickColHead(tl, "C");
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.left);
  await chooseSub(tl, "ins-cols", "col-left", { ms: 450, hold: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.leftDone);
  await ring(tl, "[data-tl=colhead-c]", 2400);

  await tl.wait(400);
  tl.showCaption(CAPTIONS.right);
  await clickColHead(tl, "E");
  await openMenu(tl, "insert", { ms: 800 });
  await chooseSub(tl, "ins-cols", "col-right", { ms: 450, hold: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.rightDone);
  await ring(tl, "[data-tl=colhead-f]", 2400);
  await finish(tl, 900);
}
