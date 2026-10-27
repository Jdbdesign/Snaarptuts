import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { elementsOf, withElements, type ElementSlide, type SlideEl, type TextEl, type TextFmt } from "./slide-elements";
import { commit, getRatio, getSel, getSlideIndex, getSlides, setSel, sweepTo, undo } from "./slides-edit";
import type { SlideData } from "./slides-data";
import { LAYOUT_ELEMENTS, SLIDE_COPY, type ThemeId } from "./slides-toolbar-data";

/*
 * What the Format, Slide and Arrange menus and the toolbar's Theme, Background, Layout and Transition DO to the deck (Snaarp Slides
 * steps 36-53). Same pattern as slides-edit.ts: every function reads and writes scene variables (`slides`, `selected`, `sel`,
 * `theme`...), and the ones that change the deck go through `commit`, so Undo takes them back.
 */

export const selectedEls = (tl: Timeline): SlideEl[] => {
  const ids = getSel(tl);
  return elementsOf(getSlides(tl), getSlideIndex(tl)).filter((e) => ids.includes(e.id));
};

/** Replace the elements of the current slide (one step in the history). */
function setEls(tl: Timeline, els: SlideEl[]) {
  const slides = getSlides(tl);
  commit(tl, withElements(slides, getSlideIndex(tl), els), slides);
}

/** Change every selected element. */
function mapSelected(tl: Timeline, fn: (e: SlideEl) => SlideEl) {
  const ids = getSel(tl);
  if (!ids.length) return;
  setEls(tl, elementsOf(getSlides(tl), getSlideIndex(tl)).map((e) => (ids.includes(e.id) ? fn(e) : e)));
}

const mapText = (tl: Timeline, fn: (e: TextEl) => TextEl) => mapSelected(tl, (e) => (e.kind === "text" ? fn(e) : e));

/* ------------------------------------------------------------ Format menu */

/** Is this style on for a text box? Bold falls back to the box's style (a title is bold unless it says false). */
export function isFmtOn(e: SlideEl, key: keyof TextFmt): boolean {
  if (e.kind !== "text") return false;
  return key === "bold" ? (e.fmt?.bold ?? e.style === "title") : !!e.fmt?.[key];
}

/** Bold, Italic, Underline or Strikethrough: off if every selected text box already has it, on otherwise. */
export function toggleFormat(tl: Timeline, key: keyof TextFmt) {
  const texts = selectedEls(tl).filter((e) => e.kind === "text");
  if (!texts.length) return;
  const on = texts.every((e) => isFmtOn(e, key));
  mapText(tl, (e) => ({ ...e, fmt: { ...e.fmt, [key]: !on } }));
}

export const setAlign = (tl: Timeline, align: NonNullable<TextEl["align"]>) => mapText(tl, (e) => ({ ...e, align }));

export const MAX_INDENT = 4;
export function changeIndent(tl: Timeline, delta: 1 | -1) {
  mapText(tl, (e) => ({ ...e, indent: Math.max(0, Math.min(MAX_INDENT, (e.indent ?? 0) + delta)) }));
}

/** Line spacing; a bullet list grows with it, so the selection frame still wraps the text. */
export const setSpacing = (tl: Timeline, spacing: number) => mapText(tl, (e) => ({ ...e, spacing, h: e.bullets ? (e.h * spacing) / (e.spacing ?? 1) : e.h }));

export const applyTheme = (tl: Timeline, id: ThemeId) => tl.setVar("theme", id);

/** Slide background: the current slide only. `null` puts the theme's own colour back. */
export function setSlideBg(tl: Timeline, color: string | null) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(tl, slides.map((s, i) => (i === idx ? { ...s, bg: color ?? undefined } : s)), slides);
}

/* ------------------------------------------------------------- Slide menu */

const freshId = (slides: SlideData[]) => {
  let n = 0;
  for (const s of slides) {
    const m = /^sn(\d+)$/.exec(s.id);
    if (m) n = Math.max(n, Number(m[1]));
  }
  return `sn${n + 1}`;
};

/** A new slide after the selected one: a title slide's grey placeholders, and it becomes the selected slide. */
export function newSlide(tl: Timeline) {
  const slides = getSlides(tl);
  const at = getSlideIndex(tl) + 1;
  const slide: ElementSlide = { id: freshId(slides), kind: "elements", elements: structuredClone(LAYOUT_ELEMENTS.title) };
  commit(tl, [...slides.slice(0, at), slide, ...slides.slice(at)], slides);
  tl.setVar("selected", at);
  setSel(tl, []);
  showDocToast(tl, SLIDE_COPY.newSlideToast, "success", 2200);
}

/** A copy right after the selected slide (the copy becomes the selected slide). */
export function duplicateSlide(tl: Timeline) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  const copy: SlideData = { ...structuredClone(slides[idx]), id: freshId(slides) };
  commit(tl, [...slides.slice(0, idx + 1), copy, ...slides.slice(idx + 1)], slides);
  tl.setVar("selected", idx + 1);
  setSel(tl, []);
  showDocToast(tl, SLIDE_COPY.duplicateToast, "success", 2200);
}

/** Delete the selected slide. The toast offers Undo (a script clicks `toast-action`, then calls `undoDelete`). */
export function deleteSlide(tl: Timeline) {
  const slides = getSlides(tl);
  if (slides.length < 2) return;
  const idx = getSlideIndex(tl);
  commit(tl, slides.filter((_, i) => i !== idx), slides);
  tl.setVar("selected", Math.min(idx, slides.length - 2));
  setSel(tl, []);
  showDocToast(tl, SLIDE_COPY.deleteToast, "success", 12000, SLIDE_COPY.undo);
}
export const undoDelete = (tl: Timeline) => undo(tl);

export function toggleSkip(tl: Timeline) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(tl, slides.map((s, i) => (i === idx ? { ...s, skipped: !s.skipped } : s)), slides);
}

/** The slides a slideshow plays: every slide that is not skipped, as indexes. */
export const playableSlides = (slides: SlideData[]) => slides.map((_, i) => i).filter((i) => !slides[i].skipped);

/** Toolbar Layout: swap the current slide's elements for the layout's placeholders. */
export function applyLayout(tl: Timeline, id: string) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(tl, slides.map((s, i) => (i === idx ? ({ ...s, kind: "elements", elements: structuredClone(LAYOUT_ELEMENTS[id] ?? []) } as SlideData) : s)), slides);
  setSel(tl, []);
}

/** Toolbar Transition: remember the choice on the current slide (the preview is played by the script). */
export function setTransition(tl: Timeline, id: string) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(tl, slides.map((s, i) => (i === idx ? { ...s, transition: id } : s)), slides);
}

/* ----------------------------------------------------------- Arrange menu */

/** Stacking order: the order of the list is the order on the page (last = in front). */
export function restack(tl: Timeline, how: "front" | "forward" | "backward" | "back") {
  const ids = getSel(tl);
  const els = elementsOf(getSlides(tl), getSlideIndex(tl));
  const picked = els.filter((e) => ids.includes(e.id));
  if (!picked.length) return;
  let out: SlideEl[];
  if (how === "front") out = [...els.filter((e) => !ids.includes(e.id)), ...picked];
  else if (how === "back") out = [...picked, ...els.filter((e) => !ids.includes(e.id))];
  else {
    out = [...els];
    const order = how === "forward" ? [...out.keys()].reverse() : [...out.keys()];
    for (const i of order) {
      const j = how === "forward" ? i + 1 : i - 1;
      if (ids.includes(out[i].id) && out[j] && !ids.includes(out[j].id)) [out[i], out[j]] = [out[j], out[i]];
    }
  }
  setEls(tl, out);
}

type Box = { x: number; y: number; w: number; h: number };
const bounds = (els: Box[]): Box => {
  const x = Math.min(...els.map((e) => e.x));
  const y = Math.min(...els.map((e) => e.y));
  return { x, y, w: Math.max(...els.map((e) => e.x + e.w)) - x, h: Math.max(...els.map((e) => e.y + e.h)) - y };
};

/** Align the selection: one element to the slide, several to the box around them. */
export function alignSel(tl: Timeline, axis: "h" | "v", where: "start" | "middle" | "end") {
  const els = selectedEls(tl);
  if (!els.length) return;
  const page: Box = { x: 0, y: 0, w: 100, h: 100 / getRatio(tl) };
  const frame = els.length === 1 ? page : bounds(els);
  mapSelected(tl, (e) => {
    if (axis === "h") return { ...e, x: where === "start" ? frame.x : where === "end" ? frame.x + frame.w - e.w : frame.x + (frame.w - e.w) / 2 };
    return { ...e, y: where === "start" ? frame.y : where === "end" ? frame.y + frame.h - e.h : frame.y + (frame.h - e.h) / 2 };
  });
}

/** Even out the gaps between three or more selected elements (the outer two stay where they are). */
export function distribute(tl: Timeline, axis: "h" | "v") {
  const els = selectedEls(tl);
  if (els.length < 3) return;
  const pos = axis === "h" ? "x" : "y";
  const size = axis === "h" ? "w" : "h";
  const sorted = [...els].sort((a, b) => a[pos] - b[pos]);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const total = last[pos] + last[size] - first[pos];
  const gap = (total - sorted.reduce((n, e) => n + e[size], 0)) / (sorted.length - 1);
  const place = new Map<string, number>();
  let at = first[pos];
  for (const e of sorted) {
    place.set(e.id, at);
    at += e[size] + gap;
  }
  mapSelected(tl, (e) => ({ ...e, [pos]: place.get(e.id) ?? e[pos] }));
}

/** Glide to a spot on the slide (cqw) and click the element that sits there. Pick a spot only that element covers. */
export async function pickAt(tl: Timeline, id: string, spot: { x: number; y: number }, ms = 800) {
  await sweepTo(tl, spot.x, spot.y, ms);
  await tl.click(`[data-tl=el-${id}]`);
  await tl.wait(250);
}

/** Select several elements the way Shift-click does: click the first, then click each of the others while Shift is held. */
export async function shiftSelect(tl: Timeline, picks: { id: string; x: number; y: number }[], ms = 800) {
  const chosen: string[] = [];
  for (const p of picks) {
    await pickAt(tl, p.id, p, chosen.length ? Math.round(ms * 0.8) : ms);
    chosen.push(p.id);
    setSel(tl, [...chosen]);
  }
}

/** Turn the selection a quarter turn. */
export const rotateSel = (tl: Timeline, dir: 1 | -1) => mapSelected(tl, (e) => ({ ...e, rotate: ((((e.rotate ?? 0) + 90 * dir) % 360) + 360) % 360 }));
