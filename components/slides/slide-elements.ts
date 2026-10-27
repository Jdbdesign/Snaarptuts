import type { SlideData } from "./slides-data";

/*
 * The element model behind the Edit, View and Insert menus (Snaarp Slides steps 20-36). A slide that has `elements` is drawn
 * from them instead of from its `kind`. Every size is in cqw: 100 = the slide's full width, so the same numbers serve the big
 * canvas and the thumbnails, and the height of a 16:9 page is 56.25.
 * Copy, sample text and sample numbers live in slide-elements-data.ts; this file is only the shapes and the pure editing functions.
 */

export type ShapeKind = "rect" | "rounded" | "ellipse" | "triangle" | "diamond" | "star" | "arrow";
export type ChartKind = "bar" | "line" | "pie";

type Base = { id: string; x: number; y: number; w: number; h: number; /** Degrees, clockwise (Arrange > Rotate). */ rotate?: number };

export type TextEl = Base & {
  kind: "text";
  /** One entry per paragraph (a bullet when `bullets`). */
  paras: string[];
  style: "title" | "subtitle" | "body" | "box";
  bullets?: boolean;
  align?: "left" | "center" | "right" | "justify";
  /** Format > Bold, Italic, Underline, Strikethrough. Bold falls back to the style (a title is bold unless this says false). */
  fmt?: TextFmt;
  /** Format > Align and indent: 0, 1, 2... steps of INDENT_STEP cqw. */
  indent?: number;
  /** Format > Line spacing: 1 = single. */
  spacing?: number;
  /** A layout placeholder ("Click to add title"): drawn grey. */
  placeholder?: boolean;
};
export type TextFmt = { bold?: boolean; italic?: boolean; underline?: boolean; strike?: boolean };
export const INDENT_STEP = 3;
export type ShapeEl = Base & { kind: "shape"; shape: ShapeKind; fill: string };
export type ImageEl = Base & { kind: "image"; src: string; alt: string };
/** A straight horizontal line: `h` is 0. */
export type LineEl = Base & { kind: "line" };
export type TableEl = Base & { kind: "table"; cells: string[][] };
export type ChartEl = Base & { kind: "chart"; chart: ChartKind; title: string; data: { label: string; value: number }[] };

export type SlideEl = TextEl | ShapeEl | ImageEl | LineEl | TableEl | ChartEl;

/** A slide that is drawn from elements. */
export type ElementSlide = SlideData & { elements: SlideEl[] };

export const elementsOf = (slides: SlideData[], idx: number): SlideEl[] => slides[idx]?.elements ?? [];

export function withElements(slides: SlideData[], idx: number, elements: SlideEl[]): SlideData[] {
  return slides.map((s, i) => (i === idx ? { ...s, elements } : s));
}

/** The next free id with this prefix across the whole deck ("shape-3"). */
export function newId(slides: SlideData[], prefix: string): string {
  let n = 0;
  for (const s of slides) {
    for (const e of s.elements ?? []) {
      const m = /^(.*)-(\d+)$/.exec(e.id);
      if (m && m[1] === prefix) n = Math.max(n, Number(m[2]));
    }
  }
  return `${prefix}-${n + 1}`;
}

/** A copy of an element with a new id, moved by (dx, dy). */
export function cloneEl(slides: SlideData[], el: SlideEl, dx = 0, dy = 0): SlideEl {
  const prefix = el.kind === "shape" ? "shape" : el.kind;
  return { ...structuredClone(el), id: newId(slides, `${prefix}c`), x: el.x + dx, y: el.y + dy };
}

/** Where a pasted or duplicated copy lands: the original spot, nudged while another element already sits exactly there. */
export function freeSpot(existing: SlideEl[], el: SlideEl, step = 3): { dx: number; dy: number } {
  let d = 0;
  while (existing.some((o) => o.kind === el.kind && Math.abs(o.x - (el.x + d)) < 0.01 && Math.abs(o.y - (el.y + d)) < 0.01)) d += step;
  return { dx: d, dy: d };
}

/* ------------------------------------------------------------------- find */

export type FindMatch = { slide: number; el: string; para: number; start: number };

/** Every match in the deck's text boxes, starting at slide `origin` and wrapping round, so "1 of N" is always on the slide you started on. */
export function findMatches(slides: SlideData[], origin: number, query: string, matchCase: boolean): FindMatch[] {
  if (!query) return [];
  const q = matchCase ? query : query.toLowerCase();
  const out: FindMatch[] = [];
  for (let k = 0; k < slides.length; k++) {
    const slide = (origin + k) % slides.length;
    for (const el of elementsOf(slides, slide)) {
      if (el.kind !== "text") continue;
      el.paras.forEach((p, para) => {
        const hay = matchCase ? p : p.toLowerCase();
        for (let at = hay.indexOf(q); at !== -1; at = hay.indexOf(q, at + q.length)) out.push({ slide, el: el.id, para, start: at });
      });
    }
  }
  return out;
}

function replaceIn(text: string, query: string, replacement: string, matchCase: boolean): string {
  const esc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(esc, matchCase ? "g" : "gi"), () => replacement);
}

/** Replace every match in the deck. */
export function replaceAll(slides: SlideData[], query: string, replacement: string, matchCase: boolean): SlideData[] {
  return slides.map((s) => ({
    ...s,
    elements: s.elements?.map((e) => (e.kind === "text" ? { ...e, paras: e.paras.map((p) => replaceIn(p, query, replacement, matchCase)) } : e)),
  }));
}

/** Replace one match. */
export function replaceOne(slides: SlideData[], m: FindMatch, query: string, replacement: string): SlideData[] {
  return slides.map((s, i) =>
    i !== m.slide
      ? s
      : {
          ...s,
          elements: s.elements?.map((e) =>
            e.kind === "text" && e.id === m.el
              ? { ...e, paras: e.paras.map((p, pi) => (pi === m.para ? p.slice(0, m.start) + replacement + p.slice(m.start + query.length) : p)) }
              : e,
          ),
        },
  );
}

/* ------------------------------------------------------------------- snap */

export const SNAP_DISTANCE = 2;

/** The guide positions (in cqw) for a page of this shape: centre and thirds, across and down. */
export function guideLines(ratio: number) {
  const h = 100 / ratio;
  return { v: [100 / 3, 50, 200 / 3], h: [h / 3, h / 2, (2 * h) / 3] };
}

/** Pull an element's centre onto a guide when it is within SNAP_DISTANCE. Returns the new top-left and which guides caught it. */
export function snapTo(el: { x: number; y: number; w: number; h: number }, ratio: number): { x: number; y: number; v?: number; h?: number } {
  const g = guideLines(ratio);
  const cx = el.x + el.w / 2;
  const cy = el.y + el.h / 2;
  const v = g.v.find((l) => Math.abs(l - cx) <= SNAP_DISTANCE);
  const h = g.h.find((l) => Math.abs(l - cy) <= SNAP_DISTANCE);
  return { x: v !== undefined ? v - el.w / 2 : el.x, y: h !== undefined ? h - el.h / 2 : el.y, v, h };
}
