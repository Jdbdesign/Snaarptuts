import { formatGBP } from "@/lib/money";
import type { Cell } from "./sheets-data";

/*
 * Pure functions on the cells of one sheet (rows of cells, starting at A1). The Edit and View steps keep the sheet in the scene
 * variable `sheets`; the helpers in edit-timeline.ts call these and store the result. Nothing here touches the screen.
 */

export type Rows = Cell[][];
export type Range = { r1: number; c1: number; r2: number; c2: number };
export type CellObj = Exclude<Cell, string>;

export const single = (r: number, c: number): Range => ({ r1: r, c1: c, r2: r, c2: c });
export const sorted = (a: Range): Range => ({ r1: Math.min(a.r1, a.r2), c1: Math.min(a.c1, a.c2), r2: Math.max(a.r1, a.r2), c2: Math.max(a.c1, a.c2) });

export const colLabel = (i: number): string => (i < 26 ? String.fromCharCode(65 + i) : String.fromCharCode(64 + Math.floor(i / 26)) + String.fromCharCode(65 + (i % 26)));
export const refOf = (r: number, c: number) => `${colLabel(c)}${r + 1}`;
export const rangeRef = (a: Range) => {
  const s = sorted(a);
  return s.r1 === s.r2 && s.c1 === s.c2 ? refOf(s.r1, s.c1) : `${refOf(s.r1, s.c1)}:${refOf(s.r2, s.c2)}`;
};

/** "b3" -> [row 2, col 1]. */
export function parseRef(ref: string): [number, number] {
  const m = /^([a-z]+)(\d+)$/i.exec(ref)!;
  const letters = m[1].toUpperCase();
  const c = letters.length === 1 ? letters.charCodeAt(0) - 65 : (letters.charCodeAt(0) - 64) * 26 + letters.charCodeAt(1) - 65;
  return [Number(m[2]) - 1, c];
}

export const obj = (c: Cell | undefined): CellObj => (c === undefined ? { text: "" } : typeof c === "string" ? { text: c } : c);
export const textOf = (c: Cell | undefined) => obj(c).text;

const looksMoney = (t: string) => /^£\s?[\d,]+(\.\d+)?$/.test(t);
export const parseMoney = (t: string): number | null => (looksMoney(t) ? Number(t.replace(/[£,\s]/g, "")) : null);

/** A copy with room for (r, c): short rows are padded with empty cells. */
function grown(rows: Rows, r: number, c: number): Rows {
  const out = rows.map((row) => row.slice());
  while (out.length <= r) out.push([]);
  for (const row of out) while (row.length <= c) row.push("");
  return out;
}

/** =SUM(C2:C5) cells show the live total of their range (the one formula the sample sheet uses). */
export function recalc(rows: Rows): Rows {
  return rows.map((row) =>
    row.map((cell) => {
      const o = obj(cell);
      const m = o.formula ? /^=SUM\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/.exec(o.formula) : null;
      if (!m) return cell;
      const [r1, c1] = parseRef(m[1] + m[2]);
      const [r2, c2] = parseRef(m[3] + m[4]);
      let sum = 0;
      for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) sum += parseMoney(textOf(rows[r]?.[c])) ?? 0;
      return { ...o, text: formatGBP(sum, { whole: true }) };
    }),
  );
}

export function setCellText(rows: Rows, r: number, c: number, text: string): Rows {
  const out = grown(rows, r, c);
  const old = obj(out[r][c]);
  out[r][c] = { ...old, text, formula: undefined, align: looksMoney(text) ? "right" : undefined };
  return recalc(out);
}

/** Copy the cells of a range (deep, so later edits never reach the clipboard). */
export function copyCells(rows: Rows, rg: Range): Cell[][] {
  const s = sorted(rg);
  const out: Cell[][] = [];
  for (let r = s.r1; r <= s.r2; r++) {
    const line: Cell[] = [];
    for (let c = s.c1; c <= s.c2; c++) line.push({ ...obj(rows[r]?.[c]) });
    out.push(line);
  }
  return out;
}

export type PasteMode = "all" | "values" | "format" | "transposed";

/** Paste the clipboard cells with their top-left corner at (r, c). */
export function pasteCells(rows: Rows, clip: Cell[][], r: number, c: number, mode: PasteMode): Rows {
  const cells = mode === "transposed" ? clip[0].map((_, j) => clip.map((row) => row[j])) : clip;
  let out = grown(rows, r + cells.length - 1, c + cells[0].length - 1);
  cells.forEach((line, i) =>
    line.forEach((src, j) => {
      const s = obj(src);
      const at = obj(out[r + i][c + j]);
      if (mode === "values") out[r + i][c + j] = s.text === "" ? "" : { text: s.text, align: looksMoney(s.text) ? "right" : undefined };
      else if (mode === "format") out[r + i][c + j] = { ...at, bold: s.bold, fill: s.fill };
      else out[r + i][c + j] = { ...s };
    }),
  );
  out = recalc(out);
  return out;
}

/** Clear what is in the cells but keep their look (Delete > Values). With `all`, remove the look too (a cut source). */
export function clearRange(rows: Rows, rg: Range, all = false): Rows {
  const s = sorted(rg);
  const out = rows.map((row) => row.slice());
  for (let r = s.r1; r <= s.r2; r++)
    for (let c = s.c1; c <= s.c2; c++)
      if (out[r]?.[c] !== undefined) out[r][c] = all ? "" : { ...obj(out[r][c]), text: "", formula: undefined };
  return recalc(out);
}

function shift(lo: number, hi: number, d1: number, d2: number): [number, number] {
  const n = d2 - d1 + 1;
  return [lo > d2 ? lo - n : lo >= d1 ? d1 : lo, hi > d2 ? hi - n : hi >= d1 ? d1 - 1 : hi];
}

function shiftFormulas(rows: Rows, axis: "row" | "col", d1: number, d2: number): Rows {
  return rows.map((line) =>
    line.map((cell) => {
      const o = obj(cell);
      const m = o.formula ? /^=SUM\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/.exec(o.formula) : null;
      if (!m) return cell;
      let [r1, c1] = parseRef(m[1] + m[2]);
      let [r2, c2] = parseRef(m[3] + m[4]);
      if (axis === "row") [r1, r2] = shift(r1, r2, d1, d2);
      else [c1, c2] = shift(c1, c2, d1, d2);
      return { ...o, formula: `=SUM(${refOf(r1, c1)}:${refOf(r2, c2)})` };
    }),
  );
}

/** Delete whole rows; the rows below move up. */
export function deleteRows(rows: Rows, r1: number, r2: number): Rows {
  const out = rows.filter((_, i) => i < r1 || i > r2);
  return recalc(shiftFormulas(out, "row", r1, r2));
}

/** Delete whole columns; the columns to the right move left. */
export function deleteCols(rows: Rows, c1: number, c2: number): Rows {
  const out = rows.map((row) => row.filter((_, i) => i < c1 || i > c2));
  return recalc(shiftFormulas(out, "col", c1, c2));
}

export type FindOptions = { matchCase?: boolean; entire?: boolean };

export function findCells(rows: Rows, query: string, opts: FindOptions = {}): [number, number][] {
  if (!query) return [];
  const q = opts.matchCase ? query : query.toLowerCase();
  const hits: [number, number][] = [];
  rows.forEach((row, r) =>
    row.forEach((cell, c) => {
      const t = opts.matchCase ? textOf(cell) : textOf(cell).toLowerCase();
      if (t && (opts.entire ? t === q : t.includes(q))) hits.push([r, c]);
    }),
  );
  return hits;
}

export function replaceAll(rows: Rows, query: string, to: string, opts: FindOptions = {}): { rows: Rows; count: number } {
  const hits = findCells(rows, query, opts);
  const out = rows.map((row) => row.slice());
  const esc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(opts.entire ? `^${esc}$` : esc, opts.matchCase ? "g" : "gi");
  for (const [r, c] of hits) out[r][c] = { ...obj(out[r][c]), text: textOf(out[r][c]).replace(re, to) };
  return { rows: out, count: hits.length };
}
