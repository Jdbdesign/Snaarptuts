import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, RANGE, URLS } from "./data";
import { chooseRow, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt } from "@/components/sheets/fdt-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 58 - Format > Bold, Italic, Underline and Strikethrough on A2:A4, then each one off again. */
export const STEP58_DURATION_MS = 32000;

async function style(tl: Timeline, id: string, caption: string) {
  await openMenu(tl, "format", { ms: 500 });
  tl.showCaption(caption);
  await chooseRow(tl, id, { ms: 380 });
  await tl.wait(150);
  await ring(tl, `[data-tl=cell-${RANGE.from}]`, 750);
}

export async function runStep58(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, RANGE.from, RANGE.to, { ms: 700 });
  await tl.wait(250);
  await style(tl, "fmt-bold", CAPTIONS.bold);
  await style(tl, "fmt-italic", CAPTIONS.italic);
  await style(tl, "fmt-underline", CAPTIONS.underline);
  await style(tl, "fmt-strike", CAPTIONS.strike);

  tl.showCaption(CAPTIONS.off);
  await tl.wait(500);
  for (const id of ["fmt-bold", "fmt-italic", "fmt-underline", "fmt-strike"]) {
    await openMenu(tl, "format", { ms: 420 });
    await chooseRow(tl, id, { ms: 320 });
    await tl.wait(500);
  }
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${RANGE.from}]`, 1100);
  await finish(tl, 400);
}
