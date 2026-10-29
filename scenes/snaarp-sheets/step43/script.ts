import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { CHART } from "@/components/sheets/insert-data";
import { ring } from "@/components/sheets/sheets-timeline";
import { typeInto } from "@/components/sheets/sheets-timeline";
import { beginInsert, chooseOption, clickCheck, clickChartTab, openSection, startChart } from "@/components/sheets/insert-timeline";
import { pressOn } from "@/components/sheets/sheets-timeline";
import { getChart, setChart } from "@/components/sheets/insert-timeline";
import type { TitleKind } from "@/components/sheets/chart-state";

/** Snaarp Sheets, step 43 - Chart editor, Customize (1 of 2): Chart style and Chart & axis titles. Starts with a line chart and the editor on Setup. */
export const STEP43_DURATION_MS = 38800;

export async function runStep43(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  startChart(tl, { type: "line", stacking: "standard" });

  await tl.at(800);
  tl.showCaption(CAPTIONS.tab);
  await clickChartTab(tl, "customize");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.style);
  await ring(tl, "[data-tl=cs-sec-style]", 1600);

  tl.showCaption(CAPTIONS.bg);
  await chooseOption(tl, "bg", "E8F0FE", (c) => ({ ...c, bg: "#E8F0FE" }));
  tl.showCaption(CAPTIONS.font);
  await chooseOption(tl, "font", "Roboto", (c) => ({ ...c, font: "Roboto" }));
  tl.showCaption(CAPTIONS.palette);
  await pressOn(tl, "[data-tl=cs-palette-2]", { ms: 700, ring: false });
  setChart(tl, { ...getChart(tl), palette: 2 });
  await tl.wait(800);
  tl.showCaption(CAPTIONS.maximize);
  await clickCheck(tl, "maximize", (c) => ({ ...c, maximize: true }));
  await tl.wait(800);
  await clickCheck(tl, "maximize", (c) => ({ ...c, maximize: false }));

  tl.showCaption(CAPTIONS.titles);
  await openSection(tl, "titles");
  await tl.wait(300);
  tl.showCaption(CAPTIONS.kind);
  await ring(tl, "[data-tl=cs-titlekind]", 1200);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "ct-chart", CHART.typed.chart, { msPerChar: 70 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.format);
  await chooseOption(tl, "tfont", "Georgia", (c) => ({ ...c, titleFont: "Georgia" }));
  await chooseOption(tl, "tsize", "18", (c) => ({ ...c, titleSize: "18" }));
  await pressOn(tl, "[data-tl=cs-fmt-bold]", { ms: 600, ring: false });
  setChart(tl, { ...getChart(tl), titleBold: true });
  await tl.wait(400);
  await chooseOption(tl, "tcolor", "1C3F94", (c) => ({ ...c, titleColor: "#1C3F94" }));

  tl.showCaption(CAPTIONS.vkind);
  await chooseOption(tl, "titlekind", "v", (c) => ({ ...c, titleKind: "v" as TitleKind }));
  tl.showCaption(CAPTIONS.vtype);
  await typeInto(tl, "ct-v", CHART.typed.v, { msPerChar: 70 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=chart-obj]", 2000);
  await finish(tl, 600);
}
