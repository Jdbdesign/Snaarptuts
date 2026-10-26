/*
 * The state of the Snaarp Doc editor in steps 10 to 13: a document of blocks, a selection or caret, a clipboard,
 * undo/redo history and the Find and replace panel. Everything here is pure (no DOM, no timers): functions take a
 * state and return a new one. editor-timeline.ts drives it from the scripts; DocumentView draws it.
 */

export type BlockKind = "h1" | "h2" | "p" | "quote" | "todo" | "code";
/** Inline text styling (Format > Text, steps 31 and 32). */
export type TextFormat = "bold" | "italic" | "underline" | "strike" | "sup" | "sub" | "color" | "highlight";
/** `value`: the CSS colour of a "color" or "highlight" range. */
export type FormatRange = { from: number; to: number; format: TextFormat; value?: string };
/** Format > Bullets & numbering (a checklist is the block kind "todo"). */
export type ListKind = "bullet" | "number";
/** Format > Paragraph styles: Heading 1 to 6 (a block without `heading` is Normal text). */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Align = "left" | "center" | "right" | "justify";

export type Block = {
  id: string;
  kind: BlockKind;
  text: string;
  /** A ticked checklist item (kind "todo"). */
  checked?: boolean;
  /** Bold, italic, ... on parts of the text (Format > Text). */
  formats?: FormatRange[];
  /** A heading set from Format > Paragraph styles. It replaces the look of `kind`. */
  heading?: HeadingLevel;
  /** Format > Bullets & numbering > Bullet list or Numbered list. */
  list?: ListKind;
  /** Format > Align & indent. Left when missing. */
  align?: Align;
  /** Number of indent steps (Format > Align & indent). Each step moves the paragraph IN_DENT px. */
  indent?: number;
};

export type Pos = { block: number; offset: number };
/** `toolbar`: show the floating dark selection toolbar (a drag selection does, Select all does not). */
export type Selection = { start: Pos; end: Pos; toolbar: boolean; /** The floating toolbar hangs from the start of the selection (a word), not from the middle of a paragraph. */ compact?: boolean;
  /** The selection is a light, see-through blue, so colours and highlights under it stay visible (step 38). */
  soft?: boolean;
};

/** What was copied. `whole`: the copy covered whole paragraphs, so pasting makes new paragraphs. */
export type Clip = { text: string; whole: boolean };

export type FindState = {
  open: boolean;
  query: string;
  replacement: string;
  matchCase: boolean;
  /** Index of the current match. */
  current: number;
  /** Which input has the dark focus border and the blinking caret. */
  focus: "find" | "replace" | null;
};

/** A comment's yellow-orange highlight: a range of text in one block (Snaarp Doc steps 15 to 18). */
export type Anchor = { id: string; block: number; from: number; to: number };
/** An invisible marker at a text offset, so a script can point the cursor into the middle of a paragraph. */
export type Landmark = { id: string; block: number; offset: number };

export type EditorState = {
  blocks: Block[];
  sel: Selection | null;
  caret: Pos | null;
  clipboard: Clip | null;
  undo: Block[][];
  redo: Block[][];
  find: FindState;
  /** Id of the block that was just pasted (it gets a short soft highlight). */
  flash: string | null;
  /** Counter for the ids of new blocks. */
  nextId: number;
  /** Text that carries a comment. */
  anchors: Anchor[];
  /** Cursor targets inside the text (drawn as zero-width spans, hook doc-at-<id>). */
  landmarks: Landmark[];
  /** Text that is a link (blue and underlined, hook doc-link-<id>; step 22). Same shape as a comment anchor. */
  links: Anchor[];
};

export type Match = { block: number; from: number; to: number };
export type MarkKind = "sel" | "current" | "match" | "comment" | "link";
export type Mark = { from: number; to: number; kind: MarkKind; /** The comment anchor or link id, for kind "comment" and "link". */ id?: string };

export const initialFind: FindState = {
  open: false,
  query: "",
  replacement: "",
  matchCase: false,
  current: 0,
  focus: null,
};

export function createEditor(blocks: Block[]): EditorState {
  return { blocks, sel: null, caret: null, clipboard: null, undo: [], redo: [], find: initialFind, flash: null, nextId: 1, anchors: [], landmarks: [], links: [] };
}

// ---- reading -----------------------------------------------------------------

export const hasSelection = (s: EditorState) => !!s.sel && !isCollapsed(s.sel);
export const canUndo = (s: EditorState) => s.undo.length > 0;
export const canRedo = (s: EditorState) => s.redo.length > 0;

const isCollapsed = (sel: Selection) => sel.start.block === sel.end.block && sel.start.offset === sel.end.offset;

/** The block the caret or the selection starts in (decides the font size shown in the toolbar). */
export function activeBlock(s: EditorState): Block | null {
  const pos = s.sel?.start ?? s.caret;
  return pos ? (s.blocks[pos.block] ?? null) : null;
}

/** Font size (pt) of each heading level, shown in the toolbar's size box. Heading 2 matches the sample "Goals" headings. */
export const HEADING_PT: Record<HeadingLevel, string> = { 1: "25", 2: "20", 3: "16", 4: "14", 5: "12", 6: "11" };

/** Font size (pt) shown in the toolbar's size box. */
export const fontSizeOf = (s: EditorState) => {
  const b = activeBlock(s);
  if (b?.heading) return HEADING_PT[b.heading];
  return b?.kind === "h1" || b?.kind === "h2" ? "20" : "11";
};

export function findMatches(blocks: Block[], query: string, matchCase: boolean): Match[] {
  if (!query) return [];
  const needle = matchCase ? query : query.toLowerCase();
  const out: Match[] = [];
  blocks.forEach((b, block) => {
    const hay = matchCase ? b.text : b.text.toLowerCase();
    let i = hay.indexOf(needle);
    while (i !== -1) {
      out.push({ block, from: i, to: i + needle.length });
      i = hay.indexOf(needle, i + needle.length);
    }
  });
  return out;
}

export const matchesOf = (s: EditorState) => (s.find.open ? findMatches(s.blocks, s.find.query, s.find.matchCase) : []);

/** The part of a selection that lies in block `i`, or null. */
function selectionIn(s: EditorState, i: number): { from: number; to: number } | null {
  if (!s.sel) return null;
  const { start, end } = s.sel;
  if (i < start.block || i > end.block) return null;
  const len = s.blocks[i].text.length;
  const from = i === start.block ? start.offset : 0;
  const to = i === end.block ? end.offset : len;
  return to > from ? { from, to } : null;
}

/** Highlight ranges of block `i`, non-overlapping and sorted. The selection wins over the current match, which wins over other matches. */
export function marksOf(s: EditorState, i: number, matches: Match[]): Mark[] {
  const raw: Mark[] = [];
  const cur = Math.min(s.find.current, matches.length - 1);
  matches.forEach((m, n) => {
    if (m.block === i) raw.push({ from: m.from, to: m.to, kind: n === cur ? "current" : "match" });
  });
  s.anchors.forEach((a) => {
    if (a.block === i) raw.push({ from: a.from, to: a.to, kind: "comment", id: a.id });
  });
  s.links.forEach((a) => {
    if (a.block === i) raw.push({ from: a.from, to: a.to, kind: "link", id: a.id });
  });
  const sel = selectionIn(s, i);
  if (sel) raw.push({ ...sel, kind: "sel" });
  if (!raw.length) return [];

  const rank: Record<MarkKind, number> = { sel: 4, current: 3, match: 2, comment: 1, link: 0 };
  const cuts = [...new Set(raw.flatMap((m) => [m.from, m.to]))].sort((a, b) => a - b);
  const out: Mark[] = [];
  for (let c = 0; c < cuts.length - 1; c++) {
    const from = cuts[c];
    const to = cuts[c + 1];
    const best = raw.filter((m) => m.from <= from && m.to >= to).sort((a, b) => rank[b.kind] - rank[a.kind])[0];
    if (best) out.push({ from, to, kind: best.kind, id: best.id });
  }
  return out;
}

// ---- selection ------------------------------------------------------------------

export const selectRange = (s: EditorState, start: Pos, end: Pos, toolbar = true): EditorState => ({
  ...s,
  sel: { start, end, toolbar },
  caret: null,
});

export function selectBlock(s: EditorState, block: number, toolbar = true): EditorState {
  return selectRange(s, { block, offset: 0 }, { block, offset: s.blocks[block].text.length }, toolbar);
}

export function selectAll(s: EditorState): EditorState {
  const last = s.blocks.length - 1;
  return selectRange(s, { block: 0, offset: 0 }, { block: last, offset: s.blocks[last].text.length }, false);
}

export const clearSelection = (s: EditorState): EditorState => ({ ...s, sel: null });
export const placeCaret = (s: EditorState, caret: Pos): EditorState => ({ ...s, sel: null, caret });

// ---- editing ----------------------------------------------------------------------

/** Replace the document, remembering the old one for Undo. */
export function commit(s: EditorState, blocks: Block[], patch: Partial<EditorState> = {}): EditorState {
  return { ...s, ...patch, blocks, undo: [...s.undo, s.blocks], redo: [] };
}

function textOfSelection(s: EditorState): Clip | null {
  if (!s.sel || isCollapsed(s.sel)) return null;
  const { start, end } = s.sel;
  const parts: string[] = [];
  let whole = true;
  for (let i = start.block; i <= end.block; i++) {
    const sel = selectionIn(s, i);
    if (!sel) continue;
    parts.push(s.blocks[i].text.slice(sel.from, sel.to));
    if (sel.from !== 0 || sel.to !== s.blocks[i].text.length) whole = false;
  }
  return { text: parts.join("\n"), whole };
}

export const copy = (s: EditorState): EditorState => ({ ...s, clipboard: textOfSelection(s) ?? s.clipboard });

/** Remove the selected text. Blocks the selection spans are merged; an emptied document keeps one empty paragraph. */
function removeSelection(s: EditorState): EditorState {
  if (!s.sel || isCollapsed(s.sel)) return s;
  const { start, end } = s.sel;
  const head = s.blocks[start.block].text.slice(0, start.offset);
  const tail = s.blocks[end.block].text.slice(end.offset);
  const text = head + tail;
  const first = s.blocks[start.block];
  const merged: Block = { ...first, text, kind: text ? first.kind : "p" };
  const blocks = [...s.blocks.slice(0, start.block), merged, ...s.blocks.slice(end.block + 1)];
  return commit(s, blocks, { sel: null, caret: { block: start.block, offset: start.offset } });
}

export const deleteSelection = removeSelection;

export function cut(s: EditorState): EditorState {
  const clip = textOfSelection(s);
  if (!clip) return s;
  return removeSelection({ ...s, clipboard: clip });
}

/** Paste the clipboard at the caret. Whole paragraphs become new paragraphs under the caret's block; text goes inline. */
export function paste(s: EditorState): EditorState {
  const clip = s.clipboard;
  if (!clip) return s;
  let base = s;
  if (hasSelection(s)) base = removeSelection(s);
  const caret = base.caret ?? { block: base.blocks.length - 1, offset: base.blocks[base.blocks.length - 1].text.length };

  if (clip.whole) {
    const lines = clip.text.split("\n");
    const added: Block[] = lines.map((text, n) => ({ id: `pasted-${base.nextId + n}`, kind: "p", text }));
    const blocks = [...base.blocks.slice(0, caret.block + 1), ...added, ...base.blocks.slice(caret.block + 1)];
    const lastNew = caret.block + added.length;
    return commit(base, blocks, {
      sel: null,
      caret: { block: lastNew, offset: added[added.length - 1].text.length },
      flash: added[0].id,
      nextId: base.nextId + added.length,
    });
  }

  const target = base.blocks[caret.block];
  const flat = clip.text.replace(/\n/g, " ");
  const text = target.text.slice(0, caret.offset) + flat + target.text.slice(caret.offset);
  const blocks = base.blocks.map((b, i) => (i === caret.block ? { ...b, text } : b));
  return commit(base, blocks, { sel: null, caret: { block: caret.block, offset: caret.offset + flat.length }, flash: target.id });
}

export function undo(s: EditorState): EditorState {
  const prev = s.undo[s.undo.length - 1];
  if (!prev) return s;
  return { ...s, blocks: prev, undo: s.undo.slice(0, -1), redo: [...s.redo, s.blocks], sel: null, caret: null, flash: null };
}

export function redo(s: EditorState): EditorState {
  const next = s.redo[s.redo.length - 1];
  if (!next) return s;
  return { ...s, blocks: next, redo: s.redo.slice(0, -1), undo: [...s.undo, s.blocks], sel: null, caret: null, flash: null };
}

// ---- find and replace -------------------------------------------------------------

export const patchFind = (s: EditorState, patch: Partial<FindState>): EditorState => ({ ...s, find: { ...s.find, ...patch } });

/** Move to the next (+1) or previous (-1) match, wrapping around. */
export function stepMatch(s: EditorState, dir: 1 | -1): EditorState {
  const n = matchesOf(s).length;
  if (!n) return s;
  const cur = Math.min(s.find.current, n - 1);
  return patchFind(s, { current: (cur + dir + n) % n });
}

function replaceIn(blocks: Block[], matches: Match[], replacement: string): Block[] {
  return blocks.map((b, i) => {
    const mine = matches.filter((m) => m.block === i).sort((a, c) => c.from - a.from); // back to front keeps offsets valid
    if (!mine.length) return b;
    let text = b.text;
    for (const m of mine) text = text.slice(0, m.from) + replacement + text.slice(m.to);
    return { ...b, text };
  });
}

export function replaceAll(s: EditorState): EditorState {
  const matches = matchesOf(s);
  if (!matches.length) return s;
  return commit(patchFind(s, { current: 0 }), replaceIn(s.blocks, matches, s.find.replacement));
}

export function replaceCurrent(s: EditorState): EditorState {
  const matches = matchesOf(s);
  if (!matches.length) return s;
  const cur = Math.min(s.find.current, matches.length - 1);
  return commit(s, replaceIn(s.blocks, [matches[cur]], s.find.replacement));
}
