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
