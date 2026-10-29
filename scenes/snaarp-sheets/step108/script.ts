import type { Timeline } from "@/lib/timeline";
import { setCell } from "@/components/sheets/grid-state";
import { FUNCTION_RUN } from "@/components/sheets/toolbar-data";
import { beginTb, closeToolMenu, dragSelect, enterFormula, hoverTool, openTool, pickRow, seed } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, FN108 } from "./data";

/** Snaarp Sheets, step 108 - Functions, the quick list: SUM, AVERAGE, COUNT, MAX, MIN on the Cost column. Starts with the Total cell empty. */
export const STEP108_DURATION_MS = 61400;

const R = FUNCTION_RUN;

export async function runStep108(tl: Timeline) {
  beginTb(tl, "a1");
  seed(tl, (rows) => setCell(rows, 9, 3, { text: "", align: "right", bold: true, nf: "currency:GBP" }));

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "d2", "d9", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "functions", { hold: 1300 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "functions", { hold: 100 });
  tl.showCaption(CAPTIONS.quick);
  await ring(tl, "[data-tl=tm-functions]", 1800);

  tl.showCaption(CAPTIONS.sum);
  await pickRow(tl, "functions", "SUM", () => {});
  await enterFormula(tl, FN108.totalRef, `=SUM(${R.range})`, { nf: "currency:GBP", refRange: FN108.range });
  tl.showCaption(CAPTIONS.sumDone);
  await ring(tl, "[data-tl=formula-bar]", 2200);

  const rest: [string, string, string, string?][] = [["AVERAGE", CAPTIONS.average, "average"], ["COUNT", CAPTIONS.count, "count"], ["MAX", CAPTIONS.max, "max"], ["MIN", CAPTIONS.min, "min"]];
  let row = R.firstRow + 1;
  for (const [fn, cap] of rest) {
    tl.showCaption(cap);
    await dragSelect(tl, "d2", "d9", { ms: 600 });
    await openTool(tl, "functions", { hold: 200 });
    await pickRow(tl, "functions", fn, () => {});
    await enterFormula(tl, `d${row}`, `=${fn}(${R.range})`, { label: [`c${row}`, R.quick[fn]], nf: fn === "COUNT" ? undefined : "currency:GBP", refRange: FN108.range });
    await tl.wait(500);
    row++;
  }
  closeToolMenu(tl);
  tl.showCaption(CAPTIONS.end);
  await ring(tl, "[data-tl=cell-d13]", 2400);
  await finish(tl, 600);
}
