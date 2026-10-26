import { INDENT_MAX, STYLE_LABELS } from "./format-menu-data";
import {
  activeBlock,
  commit,
  createEditor,
  selectRange,
  type Align,
  type Block,
  type EditorState,
  type FormatRange,
  type HeadingLevel,
  type ListKind,
  type TextFormat,
} from "./editor-state";
import { SAMPLE_BLOCKS } from "./sample-document";

/*
 * Pure state functions for Format > Text, Paragraph styles and Align & indent (Snaarp Doc steps 31 to 34).
 * They take an editor state and return a new one (see editor-state.ts); format-timeline.ts drives them from the scripts.
 */

// ---- start states --------------------------------------------------------------------------

/** The sample document plus practice paragraphs after the Contacts paragraph (steps 32 to 34). Ids are practice-1, practice-2... */
export function practiceEditor(texts: string[]): EditorState {
  const extra: Block[] = texts.map((text, n) => ({ id: practiceId(n), kind: "p", text }));
  return createEditor([...SAMPLE_BLOCKS, ...extra]);
}

export const practiceId = (n: number) => `practice-${n + 1}`;

// ---- which blocks a command applies to -------------------------------------------------------

function targetBlocks(s: EditorState): number[] {
  if (s.sel) return range(s.sel.start.block, s.sel.end.block);
  if (s.caret) return [s.caret.block];
  return [];
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, n) => from + n);

/** The part of the selection that lies in block `i`, or null. */
function selectedPart(s: EditorState, i: number): { from: number; to: number } | null {
  if (!s.sel) return null;
  const { start, end } = s.sel;
  if (i < start.block || i > end.block) return null;
  const len = s.blocks[i].text.length;
  const from = i === start.block ? start.offset : 0;
  const to = i === end.block ? end.offset : len;
  return to > from ? { from, to } : null;
}

const mapBlocks = (s: EditorState, indexes: number[], change: (b: Block, i: number) => Block) =>
  s.blocks.map((b, i) => (indexes.includes(i) ? change(b, i) : b));

// ---- text formats (bold, italic, ...) ----------------------------------------------------------

function covered(ranges: FormatRange[], format: TextFormat, from: number, to: number): boolean {
  const mine = ranges.filter((r) => r.format === format).sort((a, b) => a.from - b.from);
  let at = from;
  for (const r of mine) {
    if (r.to <= at) continue;
    if (r.from > at) return false;
    at = r.to;
    if (at >= to) return true;
  }
  return at >= to;
}

/** Remove `format` from [from, to), cutting ranges that stick out. */
function cut(ranges: FormatRange[], format: TextFormat, from: number, to: number): FormatRange[] {
  return ranges.flatMap((r) => {
    if (r.format !== format || r.to <= from || r.from >= to) return [r];
    const out: FormatRange[] = [];
    if (r.from < from) out.push({ ...r, to: from });
    if (r.to > to) out.push({ ...r, from: to });
    return out;
  });
}

/** Bold, italic, ... on the selection. If the whole selection already has it, it comes off; otherwise it goes on. Superscript and subscript replace each other. */
export function toggleFormat(s: EditorState, format: TextFormat): EditorState {
  if (!s.sel) return s;
  const parts = targetBlocks(s).flatMap((i) => {
    const p = selectedPart(s, i);
    return p ? [{ i, ...p }] : [];
  });
  if (!parts.length) return s;
  const on = parts.every((p) => covered(s.blocks[p.i].formats ?? [], format, p.from, p.to));
  const blocks = s.blocks.map((b, i) => {
    const p = parts.find((x) => x.i === i);
    if (!p) return b;
    let formats = b.formats ?? [];
    if (on) {
      formats = cut(formats, format, p.from, p.to);
    } else {
      const opposite: TextFormat | null = format === "sup" ? "sub" : format === "sub" ? "sup" : null;
      if (opposite) formats = cut(formats, opposite, p.from, p.to);
      formats = [...cut(formats, format, p.from, p.to), { from: p.from, to: p.to, format }];
    }
    return { ...b, formats };
  });
  return commit(s, blocks);
}

/** The formats the whole selection has (or, for a caret, the text next to it): these buttons show as active in the toolbar. */
export function activeFormats(s: EditorState): TextFormat[] {
  const all: TextFormat[] = ["bold", "italic", "underline", "strike", "sup", "sub"];
  if (s.sel) {
    const parts = targetBlocks(s).flatMap((i) => {
      const p = selectedPart(s, i);
      return p ? [{ i, ...p }] : [];
    });
    if (!parts.length) return [];
    return all.filter((f) => parts.every((p) => covered(s.blocks[p.i].formats ?? [], f, p.from, p.to)));
  }
  if (s.caret) {
    const b = s.blocks[s.caret.block];
    const at = s.caret.offset;
    if (at === 0) return []; // nothing before the caret: an empty range would count as covered by every mark
    return all.filter((f) => covered(b.formats ?? [], f, Math.max(0, at - 1), at));
  }
  return [];
}

// ---- values: colour, highlight, font, size (the toolbar, steps 46 to 51) -------------------------------------

/** Parts of the selection grouped by block (the selected text only). */
function selectedParts(s: EditorState) {
  return targetBlocks(s).flatMap((i) => {
    const p = selectedPart(s, i);
    return p ? [{ i, ...p }] : [];
  });
}

/** Put a value on the selected text: text colour, highlight, font or size. It replaces an earlier value on the same text; `null` takes the mark off. */
export function setFormatValue(s: EditorState, format: "color" | "highlight" | "font" | "size", value: string | null): EditorState {
  const parts = selectedParts(s);
  if (!parts.length) return s;
  const blocks = s.blocks.map((b, i) => {
    const p = parts.find((x) => x.i === i);
    if (!p) return b;
    let formats = cut(b.formats ?? [], format, p.from, p.to);
    if (value !== null) formats = [...formats, { from: p.from, to: p.to, format, value }];
    return { ...b, formats };
  });
  return commit(s, blocks);
}

/** The value of a mark (font, size, colour, highlight) on the first selected character, or on the character before the caret. */
export function formatValueAt(s: EditorState, format: TextFormat): string | undefined {
  const pos = s.sel?.start ?? s.caret;
  if (!pos) return undefined;
  const at = s.sel ? pos.offset : Math.max(0, pos.offset - 1);
  return s.blocks[pos.block]?.formats?.find((f) => f.format === format && f.from <= at && f.to > at)?.value;
}

/** The size (pt) in the toolbar box and the next one up or down: it moves one point at a time (plus and minus buttons). */
export function bumpSize(s: EditorState, current: number, delta: 1 | -1): EditorState {
  return setFormatValue(s, "size", String(Math.min(96, Math.max(1, current + delta))));
}

/** The look of the first selected character, as marks a "paint format" can carry to other text. */
export function copyLook(s: EditorState): { format: TextFormat; value?: string }[] {
  const pos = s.sel?.start;
  if (!pos) return [];
  const b = s.blocks[pos.block];
  return (b.formats ?? []).filter((f) => f.from <= pos.offset && f.to > pos.offset).map((f) => ({ format: f.format, value: f.value }));
}

/** Paint format: give the selected text the copied look (the marks it had before go away). */
export function paintLook(s: EditorState, look: { format: TextFormat; value?: string }[]): EditorState {
  const parts = selectedParts(s);
  if (!parts.length) return s;
  const blocks = s.blocks.map((b, i) => {
    const p = parts.find((x) => x.i === i);
    if (!p) return b;
    let formats = b.formats ?? [];
    for (const f of ALL_FORMATS) formats = cut(formats, f, p.from, p.to);
    formats = [...formats, ...look.map((l) => ({ from: p.from, to: p.to, format: l.format, value: l.value }))];
    return { ...b, formats };
  });
  return commit(s, blocks);
}

/** Line & paragraph spacing for the block(s) the caret or selection touches. */
export function setSpacing(s: EditorState, spacing: number): EditorState {
  const idx = targetBlocks(s);
  if (!idx.length) return s;
  return commit(s, mapBlocks(s, idx, (b) => ({ ...b, spacing })));
}

/** Tick or untick a checklist item. */
export function toggleChecked(s: EditorState, blockId: string): EditorState {
  return commit(s, s.blocks.map((b) => (b.id === blockId && b.kind === "todo" ? { ...b, checked: !b.checked } : b)));
}

// ---- paragraph styles, alignment, indent ----------------------------------------------------------

/** Format > Paragraph styles: Normal text (0) or Heading 1 to 6 for the block(s) the caret or selection touches. */
export function setHeading(s: EditorState, level: HeadingLevel | 0): EditorState {
  const idx = targetBlocks(s);
  if (!idx.length) return s;
  return commit(
    s,
    mapBlocks(s, idx, (b) => ({ ...b, kind: "p", heading: level || undefined })),
  );
}

export function setAlign(s: EditorState, align: Align): EditorState {
  const idx = targetBlocks(s);
  if (!idx.length) return s;
  return commit(s, mapBlocks(s, idx, (b) => ({ ...b, align })));
}

/** One step more (+1) or less (-1) indent. It stops at 0. */
export function changeIndent(s: EditorState, delta: 1 | -1): EditorState {
  const idx = targetBlocks(s);
  if (!idx.length) return s;
  return commit(
    s,
    mapBlocks(s, idx, (b) => ({ ...b, indent: Math.min(INDENT_MAX, Math.max(0, (b.indent ?? 0) + delta)) })),
  );
}

// ---- lists (Format > Bullets & numbering) --------------------------------------------------------

/** Bullet list, Numbered list or Checklist for the block(s) the selection touches. Another list type replaces the old one; the text stays. */
export function setList(s: EditorState, list: ListKind | "check"): EditorState {
  const idx = targetBlocks(s);
  if (!idx.length) return s;
  return commit(
    s,
    mapBlocks(s, idx, (b) => ({
      ...b,
      kind: list === "check" ? "todo" : "p",
      list: list === "check" ? undefined : list,
      heading: undefined,
      checked: list === "check" ? false : undefined,
    })),
  );
}

/** The number a numbered list item shows: its place among the numbered items right above it. */
export function listNumber(blocks: Block[], i: number): number {
  let n = 1;
  for (let k = i - 1; k >= 0 && blocks[k].list === "number"; k--) n++;
  return n;
}

// ---- Clear formatting -----------------------------------------------------------------------------------

/** Format > Clear formatting: every inline mark (bold, italic, underline, strikethrough, superscript, subscript, colour, highlight) comes off the selection. The words stay. */
export function clearFormats(s: EditorState): EditorState {
  if (!s.sel) return s;
  const parts = targetBlocks(s).flatMap((i) => {
    const p = selectedPart(s, i);
    return p ? [{ i, ...p }] : [];
  });
  if (!parts.length) return s;
  const blocks = s.blocks.map((b, i) => {
    const p = parts.find((x) => x.i === i);
    if (!p || !b.formats?.length) return b;
    let formats = b.formats;
    for (const f of ALL_FORMATS) formats = cut(formats, f, p.from, p.to);
    return { ...b, formats };
  });
  return commit(s, blocks);
}

const ALL_FORMATS: TextFormat[] = ["bold", "italic", "underline", "strike", "sup", "sub", "color", "highlight", "font", "size"];

/** A start state with marks already on some text: each mark names the text it sits on (`context`, found in the block) and the mark. */
export type PreMark = { context: string; format: TextFormat; value?: string };

export function preformat(s: EditorState, blockId: string, marks: PreMark[]): EditorState {
  return {
    ...s,
    blocks: s.blocks.map((b) => {
      if (b.id !== blockId) return b;
      const formats: FormatRange[] = marks.map((m) => {
        const from = b.text.indexOf(m.context);
        if (from < 0) throw new Error(`preformat: "${m.context}" is not in block "${blockId}"`);
        return { from, to: from + m.context.length, format: m.format, value: m.value };
      });
      return { ...b, formats };
    }),
  };
}

// ---- what the toolbar shows ----------------------------------------------------------------

/** The text of the toolbar's style box ("Normal text", "Heading 1" ...). */
export function styleLabelOf(s: EditorState): string {
  const b = activeBlock(s);
  return STYLE_LABELS[b?.heading ?? 0];
}

/** Toolbar button ids that show the active (light grey) look. Alignment shows Left when the paragraph has no explicit alignment. */
export function activeToolsOf(s: EditorState): string[] {
  const out: string[] = activeFormats(s).map((f) => TOOL_OF_FORMAT[f]);
  const b = activeBlock(s);
  if (b) out.push(`align-${b.align ?? "left"}`);
  if (b?.list === "bullet") out.push("bullets");
  if (b?.list === "number") out.push("numbers");
  return out;
}

const TOOL_OF_FORMAT: Record<TextFormat, string> = {
  bold: "bold",
  italic: "italic",
  underline: "underline",
  strike: "strike",
  sup: "sup",
  sub: "sub",
  color: "color",
  highlight: "highlight",
  font: "font",
  size: "size",
  suggest: "suggest",
};

// ---- selecting a part of a paragraph -----------------------------------------------------------

/** Select [from, to) of a block with the floating toolbar over the start of the selection. */
export const selectText = (s: EditorState, block: number, from: number, to: number): EditorState => {
  const next = selectRange(s, { block, offset: from }, { block, offset: to }, true);
  return { ...next, sel: next.sel && { ...next.sel, compact: true } };
};
