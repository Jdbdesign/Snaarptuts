import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { ring, pressOn } from "@/components/sheets/sheets-timeline";
import { beginInsert, chooseOption, clickCheck, getChart, openSection, patchChart, setChart, startChart } from "@/components/sheets/insert-timeline";
import { patchSeries } from "@/components/sheets/chart-state";

/** Snaarp Sheets, step 44 - Chart editor, Customize (2 of 2): Series, Legend, axes, gridlines, then Insert, select the chart and Update. */
export const STEP44_DURATION_MS = 40000;

export async function runStep44(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  startChart(tl, { type: "line", stacking: "none", seriesSel: "jul" }, "customize", "");

  await tl.at(800);
  tl.showCaption(CAPTIONS.series);
  await openSection(tl, "series");
  tl.showCaption(CAPTIONS.pick);
  await chooseOption(tl, "sersel", "aug", (c) => ({ ...c, seriesSel: "aug" }));
  tl.showCaption(CAPTIONS.fill);
  await chooseOption(tl, "fill", "9334E6", (c) => patchSeries(c, "aug", { fill: "#9334E6" }));
  tl.showCaption(CAPTIONS.thick);
  await chooseOption(tl, "thick", "4", (c) => patchSeries(c, "aug", { thickness: 4 }));
  tl.showCaption(CAPTIONS.axis);
  await chooseOption(tl, "axis", "right", (c) => patchSeries(c, "aug", { axis: "right" }));
  await tl.wait(500);
  tl.showCaption(CAPTIONS.checks);
  await clickCheck(tl, "dataLabels", (c) => patchSeries(c, "aug", { dataLabels: true }));
  await clickCheck(tl, "trendline", (c) => patchSeries(c, "aug", { trendline: true }));
  await tl.wait(600);

  tl.showCaption(CAPTIONS.legend);
  await openSection(tl, "legend");
  tl.showCaption(CAPTIONS.legendPick);
  await chooseOption(tl, "legend", "bottom", (c) => ({ ...c, legend: "bottom" }));
  await tl.wait(400);

  tl.showCaption(CAPTIONS.axes);
  await openSection(tl, "haxis");
  await tl.wait(900);
  await openSection(tl, "vaxis");
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.grid);
  await openSection(tl, "grid");
  await clickCheck(tl, "minor", (c) => ({ ...c, minorGrid: true }));
  await tl.wait(700);

  tl.showCaption(CAPTIONS.insert);
  await pressOn(tl, "[data-tl=chart-insert]", { ms: 800 });
  patchChart(tl, { placed: true, selected: false });
  tl.setVar("chartPanel", false);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, "[data-tl=chart-obj]", { ms: 800, ring: false });
  patchChart(tl, { selected: true });
  tl.setVar("chartTab", "setup");
  tl.setVar("chartPanel", true);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.update);
  await ring(tl, "[data-tl=chart-insert]", 1500);
  await pressOn(tl, "[data-tl=chart-insert]", { ms: 700, ring: false });
  setChart(tl, { ...getChart(tl), selected: false });
  tl.setVar("chartPanel", false);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.placed);
  await ring(tl, "[data-tl=chart-obj]", 1800);
  await finish(tl, 600);
}
