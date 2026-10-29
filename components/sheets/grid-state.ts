import { formatGBP } from "@/lib/money";
import type { Cell } from "./sheets-data";
import { formatValue, todaySerial, weekdayOf } from "./number-format";

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

const RANGE_FN = /^=(SUM|AVERAGE|COUNT|MAX|MIN|MEDIAN)\(([A-Z]+\d+):([A-Z]+\d+)\)$/;
const IF_FN = /^=IF\(([A-Z]+\d+)([<>])(\d+(?:\.\d+)?),"([^"]*)","([^"]*)"\)$/;

function numberOf(c: Cell | undefined): number | null {
  const o = obj(c);
  if (o.num !== undefined) return o.num;
  const t = o.text.trim();
  const m = parseMoney(t);
  if (m !== null) return m;
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : null;
}

const median = (n: number[]) => {
  const a = n.slice().sort((x, y) => x - y);
  const h = Math.floor(a.length / 2);
  return a.length % 2 ? a[h] : (a[h - 1] + a[h]) / 2;
};

/** The value a formula shows (SUM, AVERAGE, COUNT, MAX, MIN over a range of pounds or numbers, and a one-condition IF), or null if it is not one we know. */
export function evalFormula(rows: Rows, formula: string, fmt?: (n: number) => string): string | null {
  const m = RANGE_FN.exec(formula);
  if (m) {
    const [r1, c1] = parseRef(m[2]);
    const [r2, c2] = parseRef(m[3]);
    const nums: number[] = [];
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++)
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
        const n = numberOf(rows[r]?.[c]);
        if (n !== null) nums.push(n);
      }
    const sum = nums.reduce((a, b) => a + b, 0);
    const v = m[1] === "SUM" ? sum : m[1] === "AVERAGE" ? (nums.length ? sum / nums.length : 0) : m[1] === "MAX" ? Math.max(...nums) : m[1] === "MIN" ? Math.min(...nums) : m[1] === "MEDIAN" ? median(nums) : nums.length;
    if (m[1] === "COUNT") return String(v);
    return fmt ? fmt(v) : formatGBP(v, { whole: Number.isInteger(v) });
  }
  const f = IF_FN.exec(formula);
  if (f) {
    const [r, c] = parseRef(f[1]);
    const n = numberOf(rows[r]?.[c]) ?? 0;
    const lim = Number(f[3]);
    return (f[2] === ">" ? n > lim : n < lim) ? f[4] : f[5];
  }
  return evalLookup(rows, formula);
}

const IF_TEXT = /^=IF\(([A-Z]+\d+)="([^"]*)","([^"]*)","([^"]*)"\)$/;
const VLOOKUP_FN = /^=VLOOKUP\("([^"]*)",([A-Z]+\d+):([A-Z]+\d+),(\d+),FALSE\)$/;
const INDEX_MATCH = /^=INDEX\(([A-Z]+\d+):([A-Z]+\d+),MATCH\("([^"]*)",([A-Z]+\d+):([A-Z]+\d+),0\)\)$/;

/** The toolbar steps' extra functions: IF on text, TODAY, WEEKDAY, VLOOKUP and INDEX / MATCH. A lookup shows the text of the cell it finds. */
function evalLookup(rows: Rows, formula: string): string | null {
  const t = IF_TEXT.exec(formula);
  if (t) {
    const [r, c] = parseRef(t[1]);
    return textOf(rows[r]?.[c]) === t[2] ? t[3] : t[4];
  }
  if (formula === "=TODAY()") return formatValue(todaySerial(), "date");
  const w = /^=WEEKDAY\(([A-Z]+\d+)\)$/.exec(formula);
  if (w) {
    const [r, c] = parseRef(w[1]);
    const n = numberOf(rows[r]?.[c]);
    return n === null ? "#VALUE!" : String(weekdayOf(n));
  }
  const v = VLOOKUP_FN.exec(formula);
  if (v) {
    const [r1, c1] = parseRef(v[2]);
    const [r2] = parseRef(v[3]);
    for (let r = r1; r <= r2; r++) if (textOf(rows[r]?.[c1]) === v[1]) return textOf(rows[r]?.[c1 + Number(v[4]) - 1]);
    return "#N/A";
  }
  const im = INDEX_MATCH.exec(formula);
  if (im) {
    const [ir1, ic] = parseRef(im[1]);
    const [mr1, mc] = parseRef(im[4]);
    const [mr2] = parseRef(im[5]);
    for (let r = mr1; r <= mr2; r++) if (textOf(rows[r]?.[mc]) === im[3]) return textOf(rows[ir1 + (r - mr1)]?.[ic]);
    return "#N/A";
  }
  return null;
}

/** Formula cells show the live value of their formula (the Total row's =SUM, and the Function step's results). */
export function recalc(rows: Rows): Rows {
  return rows.map((row) =>
    row.map((cell) => {
      const o = obj(cell);
      const v = o.formula && !o.image ? evalFormula(rows, o.formula, o.nf ? (n) => formatValue(n, o.nf!, o.dp) : undefined) : null;
      return v === null ? cell : { ...o, text: v };
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

export type FindOptions = { matchCase?: boolean; entire?: boolean; regex?: boolean };

function matcher(query: string, opts: FindOptions): (t: string) => boolean {
  if (opts.regex) {
    try {
      const re = new RegExp(opts.entire ? `^(?:${query})$` : query, opts.matchCase ? "" : "i");
      return (t) => re.test(t);
    } catch {
      return () => false;
    }
  }
  const q = opts.matchCase ? query : query.toLowerCase();
  return (t) => {
    const x = opts.matchCase ? t : t.toLowerCase();
    return opts.entire ? x === q : x.includes(q);
  };
}

export function findCells(rows: Rows, query: string, opts: FindOptions = {}): [number, number][] {
  if (!query) return [];
  const test = matcher(query, opts);
  const hits: [number, number][] = [];
  rows.forEach((row, r) =>
    row.forEach((cell, c) => {
      const t = textOf(cell);
      if (t && test(t)) hits.push([r, c]);
    }),
  );
  return hits;
}

/** The pattern a replace works with: the text itself (escaped), or the regular expression. */
function replacer(query: string, opts: FindOptions, global: boolean): RegExp {
  const src = opts.regex ? query : query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(opts.entire ? `^(?:${src})$` : src, (opts.matchCase ? "" : "i") + (global ? "g" : ""));
}

export function replaceAll(rows: Rows, query: string, to: string, opts: FindOptions = {}): { rows: Rows; count: number } {
  const hits = findCells(rows, query, opts);
  const out = rows.map((row) => row.slice());
  const re = replacer(query, opts, true);
  for (const [r, c] of hits) out[r][c] = { ...obj(out[r][c]), text: textOf(out[r][c]).replace(re, to) };
  return { rows: out, count: hits.length };
}

/** Replace in one cell only (the Replace button): the first match inside it. */
export function replaceOne(rows: Rows, at: [number, number], query: string, to: string, opts: FindOptions = {}): Rows {
  const out = rows.map((row) => row.slice());
  out[at[0]][at[1]] = { ...obj(out[at[0]][at[1]]), text: textOf(out[at[0]][at[1]]).replace(replacer(query, opts, false), to) };
  return out;
}

/* ---------------- Insert: cells, rows, columns ---------------- */

/** Move every cell reference of a formula that sits at or beyond `at` (a row or column index) by `n`. */
export function shiftRefs(formula: string, axis: "row" | "col", at: number, n: number): string {
  return formula.replace(/([A-Z]+)(\d+)/g, (_, col: string, row: string) => {
    let [r, c] = parseRef(col + row);
    if (axis === "row" && r >= at) r += n;
    if (axis === "col" && c >= at) c += n;
    return refOf(r, c);
  });
}

function withShiftedFormulas(rows: Rows, axis: "row" | "col", at: number, n: number): Rows {
  return rows.map((line) =>
    line.map((cell) => {
      const o = obj(cell);
      return o.formula && !o.image ? { ...o, formula: shiftRefs(o.formula, axis, at, n) } : cell;
    }),
  );
}

/** A blank row at index `at`; the rows from there move down and formulas follow them. */
export function insertRows(rows: Rows, at: number, n = 1): Rows {
  const out = withShiftedFormulas(rows, "row", at, n);
  const width = Math.max(0, ...out.map((r) => r.length));
  out.splice(at, 0, ...Array.from({ length: n }, () => Array<Cell>(width).fill("")));
  return recalc(out);
}

/** A blank column at index `at`; the columns from there move right and formulas follow them. */
export function insertCols(rows: Rows, at: number, n = 1): Rows {
  const out = withShiftedFormulas(rows, "col", at, n).map((line) => {
    const row = line.slice();
    while (row.length < at) row.push("");
    row.splice(at, 0, ...Array<Cell>(n).fill(""));
    return row;
  });
  return recalc(out);
}

/** Insert blank cells over the range and push the cells below it (in the same columns) down. */
export function insertCellsDown(rows: Rows, rg: Range): Rows {
  const s = sorted(rg);
  const h = s.r2 - s.r1 + 1;
  const out = grown(rows, Math.max(rows.length - 1, s.r2) + h, s.c2);
  for (let c = s.c1; c <= s.c2; c++) {
    const col = out.map((row) => row[c]);
    col.splice(s.r1, 0, ...Array<Cell>(h).fill(""));
    out.forEach((row, r) => (row[c] = col[r] ?? ""));
  }
  return recalc(out);
}

/** Insert blank cells over the range and push the cells to its right (in the same rows) along. */
export function insertCellsRight(rows: Rows, rg: Range): Rows {
  const s = sorted(rg);
  const w = s.c2 - s.c1 + 1;
  const out = grown(rows, s.r2, 0);
  for (let r = s.r1; r <= s.r2; r++) {
    while (out[r].length < s.c1) out[r].push("");
    out[r].splice(s.c1, 0, ...Array<Cell>(w).fill(""));
  }
  return recalc(out);
}

/** Put a whole cell (text plus image, checkbox, chip...) into (r, c). */
export function setCell(rows: Rows, r: number, c: number, cell: Cell): Rows {
  const out = grown(rows, r, c);
  out[r][c] = cell;
  return recalc(out);
}
