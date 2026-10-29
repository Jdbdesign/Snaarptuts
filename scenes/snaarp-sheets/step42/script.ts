import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { CHART } from "@/components/sheets/insert-data";
import { chooseRow, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { beginInsert, chooseOption, dragSeries, insertChart, toggleSeries } from "@/components/sheets/insert-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import type { ChartType } from "@/components/sheets/chart-state";

/** Snaarp Sheets, step 42 - Insert > Chart, the Setup tab: every chart type, stacking, data range, X-axis, series. */
export const STEP42_DURATION_MS = 40900;

export async function runStep42(tl: Timeline) {
  beginInsert(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, "a1", "g5", { ms: 800 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-chart", { ms: 500 });
  insertChart(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.inserted);
  await ring(tl, "[data-tl=chart-panel]", 2000);

  tl.showCaption(CAPTIONS.type);
  const order: ChartType[] = ["line", "pie", "area", "scatter", "line"];
  for (const t of order) {
    const label = CHART.types.find((x) => x.id === t)!.label;
    tl.showCaption(CAPTIONS.pick(label));
    await chooseOption(tl, "type", t, (c) => ({ ...c, type: t }));
    await tl.wait(500);
  }

  tl.showCaption(CAPTIONS.stacking);
  await chooseOption(tl, "stacking", "standard", (c) => ({ ...c, stacking: "standard" }));
  await tl.wait(500);

  tl.showCaption(CAPTIONS.range);
  await ring(tl, "[data-tl=chart-range]", 1600);
  tl.showCaption(CAPTIONS.xaxis);
  await ring(tl, "[data-tl=chart-xaxis]", 1600);

  tl.showCaption(CAPTIONS.series);
  await toggleSeries(tl, "aug");
  await tl.wait(500);
  await toggleSeries(tl, "aug");
  tl.showCaption(CAPTIONS.reorder);
  await dragSeries(tl, "sep", "jul");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.line);
  await ring(tl, "[data-tl=chart-obj]", 1800);
  await finish(tl, 600);
}
