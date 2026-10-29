import { formatGBP } from "@/lib/money";
import { FDT } from "./fdt-data";
import { obj, parseMoney, recalc, setCell, sorted, type CellObj, type Range, type Rows } from "./grid-state";

/* Pure state for the Format and Data menus: number formats, text looks, sorting, filters, row heights. */

const num2 = (n: number, d = 2, group = true) => n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: group });

/** A serial day count (days since 30/12/1899) as a UTC date. */
const serialDate = (n: number) => new Date(Date.UTC(1899, 11, 30) + Math.floor(n) * 86400000);
const p2 = (n: number) => String(n).padStart(2, "0");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function clock(frac: number) {
  const secs = Math.round((frac - Math.floor(frac)) * 86400);
  return [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60];
}

/** Apply a custom pattern: "£#,##0.00", "0.000", "dd mmmm yyyy", "hh:mm" ... */
export function applyPattern(n: number, pattern: string): string {
  if (/yyyy|mmmm|dd|hh/.test(pattern)) {
    const d = serialDate(n);
    const [h, m, s] = clock(n);
    let afterHour = false;
    return pattern.replace(/yyyy|mmmm|dd|hh|mm|ss/g, (t) => {
      if (t === "yyyy") return String(d.getUTCFullYear());
      if (t === "mmmm") return MONTHS[d.getUTCMonth()];
      if (t === "dd") return p2(d.getUTCDate());
      if (t === "hh") {
        afterHour = true;
        return p2(h);
      }
      if (t === "ss") return p2(s);
      return afterHour ? p2(m) : p2(d.getUTCMonth() + 1);
    });
  }
  const m = /^([^#0,.]*)([#0,]*)(?:\.(0+))?(.*)$/.exec(pattern);
  if (!m) return String(n);
  const decimals = m[3]?.length ?? 0;
  const pad = m[2].replace(/,/g, "").length;
  let text = num2(n, decimals, m[2].includes(","));
  if (pad > 1 && !m[2].includes(",")) text = text.padStart(pad + (decimals ? decimals + 1 : 0), "0");
  return `${m[1]}${text}${m[4]}`;
}

/** How a number shows under a Format > Number choice. */
export function formatNum(n: number, nf: string, custom = ""): string {
  switch (nf) {
    case "plain":
    case "automatic":
      return String(n);
    case "number":
      return num2(n);
    case "percent":
      return `${num2(n * 100, Number.isInteger(n * 100) ? 0 : 2, false)}%`;
    case "scientific": {
      const [mant, exp] = n.toExponential(2).split("e");
      const e = Number(exp);
      return `${mant}E${e < 0 ? "-" : "+"}${p2(Math.abs(e))}`;
    }
    case "accounting":
      return `£ ${num2(n)}`;
    case "financial":
      return n < 0 ? `(${num2(-n)})` : num2(n);
    case "currency":
      return formatGBP(n);
    case "currencyround":
      return formatGBP(n, { whole: true });
    case "date": {
      const d = serialDate(n);
      return `${p2(d.getUTCDate())}/${p2(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
    }
    case "time": {
      const [h, m, s] = clock(n);
      return `${p2(h)}:${p2(m)}:${p2(s)}`;
    }
    case "datetime":
      return `${formatNum(n, "date")} ${formatNum(n, "time")}`;
    case "duration": {
      const [h, m, s] = clock(n);
      return `${Math.floor(n) * 24 + h}:${p2(m)}:${p2(s)}`;
    }
    default:
      return custom ? applyPattern(n, custom) : String(n);
  }
}

/** Walk the cells of a range, giving the callback each cell as an object; it returns the new cell. */
export function mapRange(rows: Rows, rg: Range, fn: (c: CellObj) => CellObj): Rows {
  const s = sorted(rg);
  let out = rows;
  for (let r = s.r1; r <= s.r2; r++) for (let c = s.c1; c <= s.c2; c++) out = setCell(out, r, c, fn(obj(out[r]?.[c])));
  return out;
}

/** Bold, italic, underline, strikethrough: on for the whole range, or off when every cell already has it. */
export function toggleFlag(rows: Rows, rg: Range, key: "bold" | "italic" | "underline" | "strike"): Rows {
  const s = sorted(rg);
  let all = true;
  for (let r = s.r1; r <= s.r2; r++) for (let c = s.c1; c <= s.c2; c++) if (!obj(rows[r]?.[c])[key]) all = false;
  return mapRange(rows, rg, (o) => ({ ...o, [key]: !all }));
}

export const setLook = (rows: Rows, rg: Range, look: Partial<CellObj>): Rows => mapRange(rows, rg, (o) => ({ ...o, ...look }));

/** Format > Number on a range. Cells that hold no number are left as they are. */
export function setNumberFormat(rows: Rows, rg: Range, nf: string, custom = ""): Rows {
  return mapRange(rows, rg, (o) => {
    const n = o.num ?? parseMoney(o.text) ?? (o.text !== "" && !Number.isNaN(Number(o.text)) ? Number(o.text) : undefined);
    if (n === undefined) return o;
    return { ...o, num: n, nf, nfCustom: custom || undefined, text: formatNum(n, nf, custom), align: nf === "plain" ? "left" : "right" };
  });
}

/** Format > Clear formatting: every look goes, the content stays (a number shows as typed). */
export function clearFormatting(rows: Rows, rg: Range): Rows {
  return mapRange(rows, rg, (o) => {
    if (o.num !== undefined) return { text: String(o.num), num: o.num, align: "right" };
    return { text: o.text, formula: o.formula, align: o.align === "right" ? "right" : undefined };
  });
}

/* ---------------- Sorting ---------------- */

const key = (c: CellObj): number | string => c.num ?? parseMoney(c.text) ?? (c.text !== "" && !Number.isNaN(Number(c.text)) ? Number(c.text) : c.text.toLowerCase());
const cmp = (a: CellObj, b: CellObj) => {
  const x = key(a);
  const y = key(b);
  if (typeof x === "number" && typeof y === "number") return x - y;
  if (typeof x === "number") return -1;
  if (typeof y === "number") return 1;
  return x < y ? -1 : x > y ? 1 : 0;
};

/** The last row that holds anything. */
export const lastRow = (rows: Rows) => rows.reduce((last, row, i) => (row.some((c) => obj(c).text !== "") ? i : last), 0);

/** Sort whole rows r1..r2 by one column. The rows above r1 (the header) stay where they are. */
export function sortRows(rows: Rows, r1: number, r2: number, col: number, asc: boolean): Rows {
  const body = rows.slice(r1, r2 + 1).map((r, i) => ({ r, i }));
  body.sort((p, q) => (asc ? 1 : -1) * cmp(obj(p.r[col]), obj(q.r[col])) || p.i - q.i);
  return recalc([...rows.slice(0, r1), ...body.map((b) => b.r), ...rows.slice(r2 + 1)]);
}

/** Sort only the cells inside a range, by the range's first column. Rows outside the range do not move. */
export function sortRange(rows: Rows, rg: Range, asc: boolean): Rows {
  const s = sorted(rg);
  const body = rows.slice(s.r1, s.r2 + 1).map((r, i) => ({ part: r.slice(s.c1, s.c2 + 1), i }));
  body.sort((p, q) => (asc ? 1 : -1) * cmp(obj(p.part[0]), obj(q.part[0])) || p.i - q.i);
  return rows.map((row, r) => {
    if (r < s.r1 || r > s.r2) return row;
    const copy = row.slice();
    body[r - s.r1].part.forEach((cell, j) => (copy[s.c1 + j] = cell));
    return copy;
  });
}

/* ---------------- Filters ---------------- */

export type FilterState = { on: boolean; hidden: Record<number, string[]> };
export const NO_FILTER: FilterState = { on: false, hidden: {} };

/** The distinct values of a column below the header, in order of first appearance. */
export function columnValues(rows: Rows, col: number): string[] {
  const out: string[] = [];
  for (let r = 1; r <= lastRow(rows); r++) {
    const t = obj(rows[r]?.[col]).text;
    if (t !== "" && !out.includes(t)) out.push(t);
  }
  return out;
}

/** Rows the filter hides. */
export function hiddenRows(rows: Rows, f: FilterState): Set<number> {
  const out = new Set<number>();
  if (!f.on) return out;
  for (let r = 1; r <= lastRow(rows); r++) for (const [col, off] of Object.entries(f.hidden)) if (off.includes(obj(rows[r]?.[Number(col)]).text)) out.add(r);
  return out;
}

/* ---------------- Row heights ---------------- */

const CHAR_W = 6.6;

/** Heights for rows whose cells wrap, rotate or use a bigger font (px by row index). */
export function autoRowHeights(rows: Rows, widths: number[] = FDT.widths): Record<number, number> {
  const out: Record<number, number> = {};
  rows.forEach((row, r) => {
    let h = 0;
    row.forEach((cell, c) => {
      const o = obj(cell);
      const size = o.size ?? 10;
      const line = Math.max(16, size * 1.55);
      if (o.size && o.size > 10) h = Math.max(h, line + 6);
      if (o.wrap === "wrap") {
        const w = (widths[c] ?? 86) - 10;
        const lines = Math.max(1, Math.ceil((o.text.length * CHAR_W * (size / 10)) / w));
        h = Math.max(h, lines * line + 6);
      }
      if (o.rotate === "tiltup" || o.rotate === "tiltdown") h = Math.max(h, 18 + o.text.length * 5.2);
      if (o.rotate === "up") h = Math.max(h, 14 + o.text.length * 7);
      if (o.rotate === "stack") h = Math.max(h, 10 + o.text.length * 14);
    });
    if (h > 22) out[r] = Math.round(h);
  });
  return out;
}

/** What Autocomplete suggests while typing in a column: the rest of the first value in that column that starts with the typed text. */
export function suggestion(rows: Rows, col: number, typed: string): string {
  if (!typed) return "";
  const hit = columnValues(rows, col).find((v) => v.toLowerCase().startsWith(typed.toLowerCase()) && v.length > typed.length);
  return hit ? hit.slice(typed.length) : "";
}
