import { formatGBP } from "@/lib/money";
import { EDIT_SAMPLE } from "./edit-view-data";
import { INSERT_BODY, INSERT_FORECAST_ROWS, INSERT_HEADER, INSERT_SAMPLE, money } from "./insert-data";
import { recalc } from "./grid-state";
import {
  BUDGET_HEADER,
  BUDGET_ROWS,
  CONTACTS_HEADER,
  CONTACTS_ROWS,
  CONTACTS_FILE,
  SHEET,
  type Cell,
} from "./sheets-data";

/** One tab of the workbook: its name and the cells (row by row, starting at A1). */
export type SheetModel = { id: string; name: string; rows: Cell[][]; /** Column widths in px (default 86 each), for imported data with long values. */ widths?: number[] };

/** A whole workbook on screen: the title and its tabs. */
export type Workbook = { title: string; sheets: SheetModel[] };

/** Budget rows as cells. Costs are numbers formatted through formatGBP; pass `costs` to show other amounts (an earlier version). */
export function budgetRows(costs?: number[]): Cell[][] {
  const header: Cell[] = BUDGET_HEADER.map((text) => ({ text, bold: true }));
  const body: Cell[][] = BUDGET_ROWS.map((r, i) => [r.item, r.owner, { text: formatGBP(costs?.[i] ?? r.cost, { whole: true }), align: "right" }, r.status]);
  return [header, ...body];
}

export function contactsRows(): Cell[][] {
  return [CONTACTS_HEADER.map((text) => ({ text, bold: true })), ...CONTACTS_ROWS];
}

/** Which cells differ between the budget and an earlier version (row, column), for "Show changes". */
export function changedBudgetCells(costs: number[]): [number, number][] {
  return BUDGET_ROWS.flatMap((r, i) => (costs[i] !== r.cost ? [[i + 1, 2] as [number, number]] : []));
}

export const BLANK_BOOK: Workbook = { title: SHEET.untitled, sheets: [{ id: "s1", name: SHEET.tab, rows: [] }] };
export const BUDGET_BOOK: Workbook = { title: SHEET.draft, sheets: [{ id: "s1", name: SHEET.tab, rows: budgetRows() }] };
export const NAMED_BOOK: Workbook = { title: SHEET.budget, sheets: [{ id: "s1", name: SHEET.tab, rows: budgetRows() }] };
export const CONTACTS_SHEET: SheetModel = { id: "s2", name: CONTACTS_FILE.tab, rows: contactsRows(), widths: [110, 210, 150] };

export function cellText(c: Cell | undefined): string {
  return c === undefined ? "" : typeof c === "string" ? c : c.text;
}

/** The Edit and View steps' sheet: the budget with a styled header row and a live =SUM total row (see edit-view-data.ts). */
export function editRows(): Cell[][] {
  const header: Cell[] = BUDGET_HEADER.map((text) => ({ text, bold: true, fill: EDIT_SAMPLE.headerFill }));
  const body = budgetRows().slice(1);
  const total: Cell[] = [EDIT_SAMPLE.totalLabel, "", { text: "", align: "right", formula: `=SUM(C2:C${body.length + 1})` }, ""];
  return recalc([header, ...body, total]);
}
export const EDIT_BOOK: Workbook = { title: SHEET.budget, sheets: [{ id: "s1", name: SHEET.tab, rows: editRows() }] };

/** The Insert steps' first tab: the budget with the monthly costs beside it and a live =SUM total under the Cost column. */
export function insertRows(): Cell[][] {
  const header: Cell[] = INSERT_HEADER.map((text) => ({ text, bold: true, fill: INSERT_SAMPLE.headerFill }));
  const body: Cell[][] = INSERT_BODY.map((r) => [r.item, r.owner, { text: money(r.cost), align: "right" }, r.status, ...r.months.map((m): Cell => ({ text: money(m), align: "right" }))]);
  const total: Cell[] = [INSERT_SAMPLE.totalLabel, "", { text: "", align: "right", formula: `=SUM(C2:C${body.length + 1})` }, ""];
  return recalc([header, ...body, total]);
}
export const FORECAST_SHEET: SheetModel = { id: "s2", name: INSERT_SAMPLE.tabs.forecast, rows: INSERT_FORECAST_ROWS.map((r, i) => r.map((text, j) => (i === 0 ? { text, bold: true } : j === 1 ? { text, align: "right" as const } : text))) };
export const INSERT_BOOK: Workbook = { title: SHEET.budget, sheets: [{ id: "s1", name: SHEET.tab, rows: insertRows() }, FORECAST_SHEET] };
