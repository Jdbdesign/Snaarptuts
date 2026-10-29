import { BORDER_COLOR } from "./toolbar-data";
import { defaultDecimals, formatValue } from "./number-format";
import { mapRange } from "./fdt-state";
import { obj, parseMoney, recalc, sorted, type CellObj, type Range, type Rows } from "./grid-state";
import type { BorderLine, CellBorders } from "./sheets-data";

/* Pure state of the toolbar steps (85-116): number formats and decimals, colours, borders, merging, paint format. Nothing here touches the screen. */

const numeric = (o: CellObj): number | undefined => {
  if (o.num !== undefined) return o.num;
  const m = parseMoney(o.text) ?? (/^-?\d+(\.\d+)?$/.test(o.text.trim()) ? Number(o.text) : null);
  return m === null ? undefined : m;
};

/** The cell shown under a number format (`nf` is an id of NUMBER_FORMATS or "currency:CODE"; "automatic" shows the number as it is). */
function withFormat(o: CellObj, nf: string, dp?: number): CellObj {
  if (o.formula) return { ...o, nf: nf === "automatic" ? undefined : nf, dp };
  const n = numeric(o);
  if (nf === "plain") return { ...o, nf: "plain", dp: undefined, text: o.raw ?? o.text, num: o.num, align: "left" };
  if (n === undefined) return o;
  if (nf === "automatic") return { ...o, num: n, nf: undefined, dp: undefined, text: String(n), align: "right" };
  return { ...o, num: n, nf, dp, text: formatValue(n, nf, dp), align: "right" };
}

/** Format as currency / percent / number ... on a range. Cells that hold no number are left alone. */
export function setTbFormat(rows: Rows, rg: Range, nf: string, dp?: number): Rows {
  return recalc(mapRange(rows, rg, (o) => withFormat(o, nf, dp)));
}

/** Decrease / increase decimal places by one on every number of the range. A plain number becomes a Number format with its decimals. */
export function bumpDecimals(rows: Rows, rg: Range, delta: 1 | -1): Rows {
  return recalc(
    mapRange(rows, rg, (o) => {
      const n = numeric(o);
      if (n === undefined && !o.formula) return o;
      const nf = o.nf && o.nf !== "plain" && o.nf !== "date" && o.nf !== "time" ? o.nf : "number";
      const now = o.dp ?? (n === undefined ? 2 : defaultDecimals(n, nf));
      return withFormat(o, nf, Math.max(0, now + delta));
    }),
  );
}

/** Text colour or fill colour (undefined = reset). */
export function setColour(rows: Rows, rg: Range, key: "color" | "fill", hex: string | undefined): Rows {
  return mapRange(rows, rg, (o) => ({ ...o, [key]: hex }));
}

/** The borders dropdown: which sides of which cells get a line (`clear` removes them all). */
export function setBorders(rows: Rows, rg: Range, id: string, line: BorderLine = { style: "solid", color: BORDER_COLOR }): Rows {
  const s = sorted(rg);
  return rows.map((row, r) =>
    row.map((cell, c) => {
      if (r < s.r1 || r > s.r2 || c < s.c1 || c > s.c2) return cell;
      const o = obj(cell);
      if (id === "clear") return { ...o, borders: undefined };
      const top = r === s.r1;
      const bottom = r === s.r2;
      const left = c === s.c1;
      const right = c === s.c2;
      const add: CellBorders = {};
      if (id === "all") Object.assign(add, { top: line, bottom: line, left: line, right: line });
      if (id === "outer") Object.assign(add, { ...(top && { top: line }), ...(bottom && { bottom: line }), ...(left && { left: line }), ...(right && { right: line }) });
      if (id === "inner") Object.assign(add, { ...(!top && { top: line }), ...(!bottom && { bottom: line }), ...(!left && { left: line }), ...(!right && { right: line }) });
      if (id === "horizontal") Object.assign(add, { ...(!top && { top: line }), ...(!bottom && { bottom: line }) });
      if (id === "vertical") Object.assign(add, { ...(!left && { left: line }), ...(!right && { right: line }) });
      if (id === "top" && top) add.top = line;
      if (id === "bottom" && bottom) add.bottom = line;
      if (id === "left" && left) add.left = line;
      if (id === "right" && right) add.right = line;
      return { ...o, borders: { ...o.borders, ...add } };
    }),
  );
}

/** Merge all, vertically, horizontally, or Unmerge. The merged area keeps the top-left value (the others are emptied). */
export function mergeCells(rows: Rows, rg: Range, mode: "all" | "vertical" | "horizontal" | "unmerge"): Rows {
  const s = sorted(rg);
  const out = rows.map((r) => r.slice());
  if (mode === "unmerge") {
    for (let r = s.r1; r <= s.r2; r++) for (let c = s.c1; c <= s.c2; c++) if (obj(out[r]?.[c]).merge) out[r][c] = { ...obj(out[r][c]), merge: undefined };
    return out;
  }
  const blocks: Range[] = [];
  if (mode === "all") blocks.push(s);
  if (mode === "vertical") for (let c = s.c1; c <= s.c2; c++) blocks.push({ r1: s.r1, r2: s.r2, c1: c, c2: c });
  if (mode === "horizontal") for (let r = s.r1; r <= s.r2; r++) blocks.push({ r1: r, r2: r, c1: s.c1, c2: s.c2 });
  for (const b of blocks) {
    for (let r = b.r1; r <= b.r2; r++) for (let c = b.c1; c <= b.c2; c++) if ((r !== b.r1 || c !== b.c1) && out[r]) out[r][c] = "";
    out[b.r1][b.c1] = { ...obj(out[b.r1][b.c1]), merge: { rows: b.r2 - b.r1 + 1, cols: b.c2 - b.c1 + 1 } };
  }
  return out;
}

/* ---------------- Paint format ---------------- */

export type Look = Partial<Pick<CellObj, "bold" | "italic" | "underline" | "strike" | "size" | "color" | "font" | "fill" | "align" | "valign" | "wrap" | "rotate" | "nf" | "dp" | "borders">>;
const LOOK_KEYS = ["bold", "italic", "underline", "strike", "size", "color", "font", "fill", "align", "valign", "wrap", "rotate", "nf", "dp", "borders"] as const;

/** The look of a cell (no text), for the Paint format tool to carry. */
export function copyLook(c: CellObj): Look {
  const look: Look = {};
  for (const k of LOOK_KEYS) if (c[k] !== undefined) (look as Record<string, unknown>)[k] = c[k];
  return look;
}

/** Give every cell of the range that look (its own text stays). */
export function paintLook(rows: Rows, rg: Range, look: Look): Rows {
  return recalc(
    mapRange(rows, rg, (o) => {
      const clean = { ...o } as Record<string, unknown>;
      for (const k of LOOK_KEYS) delete clean[k];
      const painted = { ...clean, ...look } as CellObj;
      return look.nf ? withFormat(painted, look.nf, look.dp) : painted;
    }),
  );
}
