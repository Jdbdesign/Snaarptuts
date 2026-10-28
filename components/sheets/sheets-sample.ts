import { formatGBP } from "@/lib/money";
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
export type SheetModel = { id: string; name: string; rows: Cell[][] };

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
export const CONTACTS_SHEET: SheetModel = { id: "s2", name: CONTACTS_FILE.tab, rows: contactsRows() };

export function cellText(c: Cell | undefined): string {
  return c === undefined ? "" : typeof c === "string" ? c : c.text;
}
