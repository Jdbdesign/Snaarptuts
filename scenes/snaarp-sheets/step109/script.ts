import type { Timeline } from "@/lib/timeline";
import { FUNCTION_RUN } from "@/components/sheets/toolbar-data";
import { beginTb, chooseFn, clickCellTb, enterFormula, fillDown, hoverCategory, openTool } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 109 - Functions, the categories: browse six lists, then IF, TODAY and VLOOKUP with real results. Starts with A1 selected. */
export const STEP109_DURATION_MS = 80000;

const R = FUNCTION_RUN;

export async function runStep109(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "functions", { hold: 700 });
  tl.showCaption(CAPTIONS.cats);
  await ring(tl, "[data-tl=tm-functions-cats]", 1600);
  const tour: [string, string][] = [["array", CAPTIONS.array], ["datetime", CAPTIONS.datetime], ["financial", CAPTIONS.financial], ["web", CAPTIONS.web], ["logical", CAPTIONS.logical], ["lookup", CAPTIONS.lookup]];
  for (const [id, cap] of tour) {
    tl.showCaption(cap);
    await hoverCategory(tl, id, { wait: id === "lookup" ? 700 : 1100 });
  }
  await tl.scrollPanelTo("[data-tl=tm-fnlist]", 300, 1200);
  await tl.wait(500);

  // IF
  tl.showCaption(CAPTIONS.tryIf);
  await chooseFn(tl, "logical", "IF", async () => {
    await enterFormula(tl, "m2", R.logical.formula);
  });
  tl.showCaption(CAPTIONS.ifDone);
  await ring(tl, "[data-tl=cell-m2]", 1800);
  tl.showCaption(CAPTIONS.fill);
  fillDown(tl, 12, 1, 8);
  await ring(tl, "[data-tl=cell-m5]", 2000);

  // TODAY
  await clickCellTb(tl, `d${R.today.row + 1}`, 700);
  await openTool(tl, "functions", { hold: 200 });
  tl.showCaption(CAPTIONS.tryDate);
  await chooseFn(tl, "datetime", "TODAY", async () => {
    await enterFormula(tl, `d${R.today.row + 1}`, R.today.formula, { label: [`c${R.today.row + 1}`, R.today.label] });
  });
  tl.showCaption(CAPTIONS.dateDone);
  await ring(tl, `[data-tl=cell-d${R.today.row + 1}]`, 1800);

  // VLOOKUP
  await clickCellTb(tl, `d${R.lookup.row + 1}`, 700);
  await openTool(tl, "functions", { hold: 200 });
  tl.showCaption(CAPTIONS.tryLookup);
  await chooseFn(tl, "lookup", "VLOOKUP", async () => {
    await enterFormula(tl, `d${R.lookup.row + 1}`, R.lookup.formula, { label: [`c${R.lookup.row + 1}`, R.lookup.label] });
  });
  tl.showCaption(CAPTIONS.lookupDone);
  await ring(tl, `[data-tl=cell-d${R.lookup.row + 1}]`, 2000);
  tl.showCaption(CAPTIONS.end);
  await tl.wait(1400);
  await finish(tl, 600);
}
