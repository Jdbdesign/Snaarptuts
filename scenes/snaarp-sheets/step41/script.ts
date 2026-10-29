import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { INSERT_SAMPLE } from "@/components/sheets/insert-data";
import { beginInsert } from "@/components/sheets/insert-timeline";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import type { SheetModel } from "@/components/sheets/sheets-sample";

/** Snaarp Sheets, step 41 - Insert > Sheet (Shift+F11): Sheet 3 is added and opens, then back to Sheet1. */
export const STEP41_DURATION_MS = 9300;

export async function runStep41(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  await tl.at(700);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  tl.showCaption(CAPTIONS.click);
  await chooseRow(tl, "ins-sheet", { ms: 500 });
  const sheets = tl.getVar<SheetModel[]>("sheets", []);
  tl.setVar("sheets", [...sheets, { id: "s3", name: INSERT_SAMPLE.tabs.added, rows: [] }]);
  tl.setVar("activeSheet", "s3");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.added);
  await ring(tl, "[data-tl=sheet-tab-s3]", 2400);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=sheet-tab-s1]", { ms: 800 });
  tl.setVar("activeSheet", "s1");
  await tl.wait(600);
  await finish(tl, 900);
}
