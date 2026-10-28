import type { Timeline } from "@/lib/timeline";
import { BLANK_BOOK } from "@/components/sheets/sheets-sample";
import { chooseItem, hoverItem, openFileMenu, swapWorkbook } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 2 - File > New. Starts on "Budget draft" (the sample budget); ends on a new, blank "Untitled spreadsheet". */
export const STEP2_DURATION_MS = 11500;

export async function runStep2(tl: Timeline) {
  begin(tl, URLS.budget);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });

  await tl.at(3200);
  tl.showCaption(CAPTIONS.hover);
  await hoverItem(tl, "new", { ms: 600 });
  tl.highlight("[data-tl=file-item-new]");
  await tl.wait(1600);
  tl.clearHighlight();

  tl.showCaption(CAPTIONS.click);
  await chooseItem(tl, "new", { ms: 300 });

  // A brand-new spreadsheet opens.
  await tl.wait(300);
  await swapWorkbook(tl, BLANK_BOOK.title, BLANK_BOOK.sheets, URLS.blank);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 2600);
}
