import { INSERT_SAMPLE } from "./insert-data";
import { obj, parseMoney, type Rows } from "./grid-state";

/*
 * Pure state of the Insert > Chart step group (42-44). The chart lives in the scene variable `chart`; the SVG is drawn by
 * ChartGraphic.tsx straight from the sheet's cells, so the chart always matches the data. Nothing here touches the screen.
 */

export type ChartType = "column" | "line" | "pie" | "area" | "scatter";
export type Stacking = "none" | "standard" | "percent";
export type LegendPos = "auto" | "right" | "bottom" | "top" | "inside" | "none";
export type TitleKind = "chart" | "h" | "v";

export type ChartSeries = {
  id: string;
  label: string;
  /** Column index in the sheet. */
  col: number;
  on: boolean;
  /** Overrides the palette colour (hex). */
  fill?: string;
  fillOpacity: number;
  lineOpacity: number;
  /** Line thickness in px, 0 = auto. */
  thickness: number;
  axis: "left" | "right";
  errorBars: boolean;
  dataLabels: boolean;
  trendline: boolean;
};

export type ChartState = {
  type: ChartType;
  stacking: Stacking;
  /** Shown in the Data range box. */
  range: string;
  xAxis: string;
  /** In the order they are drawn and listed. */
  series: ChartSeries[];
  palette: number;
  bg: string;
  font: string;
  maximize: boolean;
  threeD: boolean;
  compare: boolean;
  titleKind: TitleKind;
  titles: Record<TitleKind, string>;
  titleFont: string;
  titleSize: string;
  titleBold: boolean;
  titleItalic: boolean;
  titleColor: string;
  seriesSel: string;
  legend: LegendPos;
  gridlines: boolean;
  minorGrid: boolean;
  /** The toolbar steps' chart reads its data rows (default 4) and takes its categories from this column (default A). */
  rowCount?: number;
  catCol?: number;
  /** Where the chart sits on the sheet (default: the Insert steps' spot). */
  at?: { row: number; col: number };
  /** Dashed preview (not inserted yet), or on the sheet. */
  placed: boolean;
  selected: boolean;
};

/** The four colour palettes of the Customize tab (six colours each, as in the recording). */
export const PALETTES: string[][] = [
  ["#4285F4", "#EA4335", "#FBBC04", "#34A853", "#FF6D01", "#46BDC6"],
  ["#2878B5", "#F28E2B", "#3B9B4A", "#D7332F", "#9467BD", "#8C564B"],
  ["#0B3C5D", "#4B3F8F", "#B5409B", "#F2605C", "#F5A623", "#5B9A3B"],
  ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#6B7A2A"],
];

export const BG_COLOURS = ["#FFFFFF", "#F1F3F4", "#E8F0FE", "#FEF7E0", "#E6F4EA", "#FCE8E6"];
export const SERIES_COLOURS = ["auto", "#4285F4", "#EA4335", "#FBBC04", "#34A853", "#9334E6", "#F538A0"];
export const TITLE_COLOURS = ["auto", "#202124", "#1C3F94", "#C5221F", "#137333"];

const monthCols: [string, number][] = [["Cost", 2], ...INSERT_SAMPLE.months.map((m, i): [string, number] => [m, 4 + i])];

export function makeSeries(label: string, col: number, on: boolean): ChartSeries {
  return { id: label.toLowerCase(), label, col, on, fillOpacity: 100, lineOpacity: 0, thickness: 0, axis: "left", errorBars: false, dataLabels: false, trendline: false };
}

/** The chart a fresh Insert > Chart makes: a column chart of the three months for each item (Cost is listed but off). */
export function defaultChart(): ChartState {
  return {
    type: "column",
    stacking: "none",
    range: "A1:G5",
    xAxis: "A2:A5",
    series: monthCols.map(([label, col]) => makeSeries(label, col, label !== "Cost")),
    palette: 0,
    bg: "#FFFFFF",
    font: "Theme Default",
    maximize: false,
    threeD: false,
    compare: false,
    titleKind: "chart",
    titles: { chart: "", h: "", v: "" },
    titleFont: "Theme Default",
    titleSize: "Auto",
    titleBold: false,
    titleItalic: false,
    titleColor: "auto",
    seriesSel: "jul",
    legend: "auto",
    gridlines: true,
    minorGrid: false,
    placed: false,
    selected: false,
  };
}

export const seriesColour = (c: ChartState, s: ChartSeries, i: number) => (s.fill && s.fill !== "auto" ? s.fill : PALETTES[c.palette][i % 6]);

export type ChartData = { cats: string[]; series: { s: ChartSeries; colour: string; values: number[] }[] };

/** Read the chart's categories (the X-axis column) and the values of every ticked series from the sheet. */
export function chartData(rows: Rows, c: ChartState): ChartData {
  const idx = Array.from({ length: c.rowCount ?? 4 }, (_, i) => i + 1);
  const cats = idx.map((r) => obj(rows[r]?.[c.catCol ?? 0]).text);
  const on = c.series.filter((s) => s.on);
  return {
    cats,
    series: on.map((s) => ({
      s,
      colour: seriesColour(c, s, c.series.indexOf(s)),
      values: idx.map((r) => obj(rows[r]?.[s.col]).num ?? parseMoney(obj(rows[r]?.[s.col]).text) ?? 0),
    })),
  };
}

export const patchSeries = (c: ChartState, id: string, patch: Partial<ChartSeries>): ChartState => ({ ...c, series: c.series.map((s) => (s.id === id ? { ...s, ...patch } : s)) });

/** Move one series up or down the list (the drag-reorder). */
export function moveSeries(c: ChartState, id: string, by: number): ChartState {
  const list = c.series.slice();
  const i = list.findIndex((s) => s.id === id);
  const j = Math.max(0, Math.min(list.length - 1, i + by));
  const [it] = list.splice(i, 1);
  list.splice(j, 0, it);
  return { ...c, series: list };
}

/** Least-squares line through the points (for the trendline). */
export function trend(values: number[]): { a: number; b: number } {
  const n = values.length;
  const mx = (n - 1) / 2;
  const my = values.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  values.forEach((v, i) => {
    num += (i - mx) * (v - my);
    den += (i - mx) ** 2;
  });
  const b = den ? num / den : 0;
  return { a: my - b * mx, b };
}
