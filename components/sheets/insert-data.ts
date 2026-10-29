import { formatGBP } from "@/lib/money";
import { BUDGET_HEADER, BUDGET_ROWS, SHEET } from "./sheets-data";
import type { MenuRow, SubRow } from "./edit-view-data";

/*
 * Copy, menus and sample content of the Snaarp Sheets Insert menu (steps 37-55).
 * Recording: ref/sheets/Snaarp_Sheets_insert.mp4 (git-ignored). Labels, order, groups and shortcut glyphs are read from it; the
 * recording's real data (domains, user names, e-mail addresses, S3 addresses, photos) is replaced by the Acme Studio budget and
 * the bundled illustrations in /public/sheets-sample. Edit here, not in the components.
 */

export const INSERT_MENU: MenuRow[][] = [
  [
    { id: "ins-cells", label: "Cells", icon: "shInsCells", sub: "ins-cells" },
    { id: "ins-rows", label: "Rows", icon: "shInsRows", sub: "ins-rows" },
    { id: "ins-cols", label: "Columns", icon: "shInsCols", sub: "ins-cols" },
    { id: "ins-sheet", label: "Sheet", icon: "shInsSheet", shortcut: "⇧F11", ctrl: "Shift+F11" },
  ],
  [
    { id: "ins-chart", label: "Chart", icon: "shChart" },
    { id: "ins-pivot", label: "Pivot table", icon: "shPivot" },
    { id: "ins-image", label: "Image", icon: "shImage", sub: "ins-image" },
    { id: "ins-drawing", label: "Drawing", icon: "shDrawing" },
  ],
  [
    { id: "ins-function", label: "Function", icon: "shSigma", sub: "ins-function" },
    { id: "ins-link", label: "Link", icon: "shLink", shortcut: "⌘K", ctrl: "Ctrl+K" },
  ],
  [
    { id: "ins-checkbox", label: "Checkbox", icon: "shCheckbox" },
    { id: "ins-dropdown", label: "Dropdown", icon: "shDropdown" },
    { id: "ins-emoji", label: "Emoji", icon: "shEmoji" },
    { id: "ins-chips", label: "Smart chips", icon: "shChip" },
  ],
  [
    { id: "ins-comment", label: "Comment", icon: "edComment", shortcut: "⌘⌥M", ctrl: "Ctrl+Alt+M" },
    { id: "ins-note", label: "Note", icon: "shNote", shortcut: "⇧F2", ctrl: "Shift+F2" },
  ],
];

export const FUNCTION_IDS = ["sum", "average", "count", "max", "min", "if"] as const;
export type FunctionId = (typeof FUNCTION_IDS)[number];

export const INSERT_SUBS: Record<string, SubRow[]> = {
  "ins-cells": [
    { id: "cells-down", label: "Insert cells and shift down" },
    { id: "cells-right", label: "Insert cells and shift right" },
  ],
  "ins-rows": [
    { id: "row-above", label: "Row above" },
    { id: "row-below", label: "Row below" },
  ],
  "ins-cols": [
    { id: "col-left", label: "Column left" },
    { id: "col-right", label: "Column right" },
  ],
  "ins-image": [
    { id: "img-cell", label: "Insert image in cell" },
    { id: "img-over", label: "Insert image over cells" },
  ],
  "ins-function": [
    ...FUNCTION_IDS.map((id) => ({ id: `fn-${id}`, label: id.toUpperCase() })),
    { id: "fn-more", label: "More functions…" },
  ],
};

/* ---------------- Sample sheet ---------------- */

/** The Insert steps' sheet: the budget (Item | Owner | Cost | Status) plus what each item cost in July, August and September. */
export const INSERT_SAMPLE = {
  months: ["Jul", "Aug", "Sep"],
  /** Pounds per month for the four items (each row adds up to the Cost column). */
  monthly: [
    [40, 40, 40],
    [100, 110, 130],
    [20, 30, 35],
    [70, 60, 80],
  ],
  headerFill: "#E7EDFB",
  totalLabel: "Total",
  /** The second tab, so the Link step has sheets to point at. The Sheet step adds the next one. */
  tabs: { budget: SHEET.tab, forecast: "Forecast", added: "Sheet 3" },
};

export const INSERT_HEADER = [...BUDGET_HEADER, ...INSERT_SAMPLE.months];
export const INSERT_BODY = BUDGET_ROWS.map((r, i) => ({ ...r, months: INSERT_SAMPLE.monthly[i] }));
export const money = (n: number) => formatGBP(n, { whole: true });
export const INSERT_FORECAST_ROWS = [
  ["Month", "Planned"],
  ["October", money(1200)],
  ["November", money(1350)],
];

/** Insert > Cells, Rows, Columns: where the demo selects. */
export const STRUCTURE = {
  cellsRange: ["b3", "b4"] as const,
  shiftRightRange: ["d3", "d4"] as const,
  row: "a3",
  column: "c1",
};

/* ---------------- Chart (steps 42-44) ---------------- */

const opt = (id: string, label = id) => ({ id, label });

export const CHART = {
  title: "Chart editor",
  tabs: [opt("setup", "Setup"), opt("customize", "Customize")],
  type: "Chart type",
  types: [opt("column", "Column chart"), opt("line", "Line chart"), opt("pie", "Pie chart"), opt("area", "Area chart"), opt("scatter", "Scatter chart")],
  stacking: "Stacking",
  stackings: [opt("none", "None"), opt("standard", "Standard"), opt("percent", "100%")],
  dataRange: "Data range",
  xAxis: "X-axis",
  xAdd: "Add X-axis",
  series: "Series",
  cancel: "Cancel",
  insert: "Insert",
  update: "Update",
  sections: [opt("style", "Chart style"), opt("titles", "Chart & axis titles"), opt("series", "Series"), opt("legend", "Legend"), opt("haxis", "Horizontal axis"), opt("vaxis", "Vertical axis"), opt("grid", "Gridlines and ticks")],
  bgColor: "Background color",
  font: "Font",
  fonts: ["Theme Default", "Arial", "Roboto", "Times New Roman", "Courier New", "Georgia"].map((f) => opt(f)),
  border: "Chart border color",
  reset: "Reset layout",
  flags: [opt("maximize", "Maximize"), opt("threeD", "3D"), opt("compare", "Compare mode")],
  palette: "Color palette",
  titleKinds: [opt("chart", "Chart title"), opt("h", "Horizontal axis title"), opt("v", "Vertical axis title")],
  titleText: "Title text",
  titlePlaceholders: { chart: "Chart title", h: "Horizontal axis title", v: "Vertical axis title" },
  titleFont: "Title font",
  titleSize: "Title font size",
  sizes: ["Auto", "10", "12", "14", "18", "24"].map((f) => opt(f)),
  titleFormat: "Title format",
  titleColor: "Title text color",
  colourAuto: "Auto",
  format: "Format",
  fillColor: "Fill color",
  fillOpacity: "Fill opacity",
  lineColor: "Line color",
  lineOpacity: "Line opacity",
  opacities: ["100%", "75%", "50%", "25%", "0%"].map((f) => opt(f.replace("%", ""), f)),
  dash: "Line dash type",
  thickness: "Line thickness",
  thicknesses: [opt("0", "Auto"), opt("1", "1px"), opt("2", "2px"), opt("4", "4px")],
  axis: "Axis",
  axes: [opt("left", "Left axis"), opt("right", "Right axis")],
  dataPoint: "Format data point",
  add: "Add",
  checks: [opt("errorBars", "Error bars"), opt("dataLabels", "Data labels"), opt("trendline", "Trendline")],
  legendPos: "Position",
  legends: [opt("auto", "Auto"), opt("right", "Right"), opt("bottom", "Bottom"), opt("top", "Top"), opt("inside", "Inside"), opt("none", "None")],
  labelFont: "Label font",
  labelSize: "Label font size",
  labelFormat: "Label format",
  textColor: "Text color",
  showLine: "Show axis line",
  min: "Min",
  max: "Max",
  minPlaceholder: "Minimum value",
  maxPlaceholder: "Maximum value",
  scale: "Scale factor",
  scaleValue: "Default",
  log: "Log scale",
  numberFormat: "Number format",
  numberValue: "From source data",
  major: "Major gridlines",
  minor: "Minor gridlines",
  /** What the steps type and pick. */
  typed: { chart: "Q3 spend by item", h: "Item", v: "Spend (GBP)" },
  where: { row: 8, col: 0 },
};

/* ---------------- Images (steps 45-46) ---------------- */

export const IMAGE = {
  title: "Insert image",
  tabs: [opt("upload", "Upload"), opt("url", "By URL")],
  drop: "Click to upload an image",
  types: "PNG, JPG, GIF, SVG up to 5MB",
  chooser: "Choose an image",
  alt: "Alt text (optional)",
  altPlaceholder: "Describe the image",
  preview: "Preview",
  urlLabel: "Image URL",
  urlPlaceholder: "https://example.com/picture.png",
  urlHint: "Paste a link to a picture on the web",
  cancel: "Cancel",
  insert: "Insert",
  files: [
    { id: "desk", name: "studio-desk.svg", src: "/sheets-sample/studio-desk.svg", alt: "Acme Studio desk" },
    { id: "skyline", name: "acme-skyline.svg", src: "/sheets-sample/acme-skyline.svg", alt: "Acme skyline" },
    { id: "logo", name: "acme-logo.svg", src: "/sheets-sample/acme-logo.svg", alt: "Acme logo" },
  ],
  /** The cell the picture goes in, and the formula the formula bar keeps showing (the picture itself is drawn in the cell). */
  cell: "e8",
  cellFormula: '=IMAGE("https://example.com/sample.png","image")',
  tallRow: { row: 7, px: 64 },
  over: { r: 8, c: 0, w: 300, h: 200 },
  overResized: { w: 360, h: 240 },
  toastCell: "Image inserted in cell",
  toastOver: "Image inserted over cells",
};
