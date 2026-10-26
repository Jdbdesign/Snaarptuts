"use client";

import { Fragment } from "react";
import { Icon } from "@/components/icons";
import { FloatingToolbarIcons } from "./FloatingToolbar";
import { HorizontalRule } from "./HorizontalRule";
import { ImageBlock } from "./ImageBlock";
import { ObjectBlock } from "./ObjectBlock";
import { TableBlock } from "./TableBlock";
import { marksOf, matchesOf, type Block, type EditorState, type HeadingLevel, type Mark, type TextFormat } from "./editor-state";
import { INDENT_PX } from "./format-menu-data";
import { listNumber } from "./format-state";
import { NO_INSERTS, PAGE_BODY_MIN, PAGE_TOP_PAD, type PageInserts } from "./insert-state";

const BLOCK_STYLE: Record<Block["kind"], string> = {
  h1: "mb-[12px] text-[19.5px] font-bold leading-[1.3]",
  h2: "mb-[8px] mt-[16px] text-[19.5px] font-bold leading-[1.3]",
  p: "mb-[12px] text-[10.8px] leading-[1.5]",
  // Insert > Block quote: a thin grey bar on the left, an indent and slightly muted text (as in the recording).
  quote: "mb-[12px] ml-[3px] border-l border-[#CDD1D9] pl-[13px] text-[10.8px] leading-[1.5] text-[#555d6b]",
  // Insert > Checklist: the text is indented to make room for the box (drawn below, in the block).
  todo: "relative mb-[12px] pl-[28px] text-[10.8px] leading-[1.5]",
  // Insert > Code block: fixed-width text; the recording shows no box around it.
  code: "mb-[12px] font-[Consolas,'Courier_New',monospace] text-[11px] leading-[1.5]",
};

// Format > Paragraph styles. Heading 2 matches the sample "Goals" heading (h2 above).
const HEADING_STYLE: Record<HeadingLevel, string> = {
  1: "mb-[10px] mt-[14px] text-[24.5px] font-bold leading-[1.25]",
  2: "mb-[8px] mt-[16px] text-[19.5px] font-bold leading-[1.3]",
  3: "mb-[8px] mt-[14px] text-[15.7px] font-bold leading-[1.3]",
  4: "mb-[8px] mt-[12px] text-[13.7px] font-bold leading-[1.35]",
  5: "mb-[8px] mt-[12px] text-[11.8px] font-bold leading-[1.4]",
  6: "mb-[8px] mt-[12px] text-[10.8px] font-bold leading-[1.5] text-[#555d6b]",
};

// Format > Bullets & numbering: a hanging indent, the marker sits in the left gap.
const LIST_STYLE = "relative mb-[5px] pl-[30px] text-[10.8px] leading-[1.5]";

const MARK_STYLE: Record<Mark["kind"], string> = {
  sel: "bg-[#2F6BDB] text-white",
  current: "bg-[#8ED3A4]",
  match: "bg-[#D6F0DF]",
  comment: "bg-[#F9B208]",
  link: "text-[#1D63D9] underline decoration-[1.5px] underline-offset-2",
};

/** Pixels per point: the 11 pt body text is drawn 10.8 px high. Toolbar > Font size writes "size" marks in pt. */
const PT_PX = 10.8 / 11;
/** A word typed in Suggesting mode (step 60): green, underlined, a pale green back. */
const SUGGEST_COLOR = "#188038";
const SUGGEST_BG = "#E6F4EA";
/** Toolbar > Line & paragraph spacing: the option the menu shows, and the CSS line-height it makes (1.15 is the default look). */
const SPACING_LINE: Record<number, number> = { 1: 1.3, 1.15: 1.5, 1.5: 1.95, 2: 2.6 };

/** The selection when it must not hide colours: light see-through blue, text keeps its colour. */
const MARK_STYLE_SOFT = "bg-[rgba(47,107,219,0.28)]";

type Piece = { text: string; kind: Mark["kind"] | null; id?: string };

/** Split a block's text into pieces: plain text and highlighted ranges. */
function piecesOf(text: string, marks: Mark[]): Piece[] {
  const out: Piece[] = [];
  let at = 0;
  for (const m of marks) {
    if (m.from > at) out.push({ text: text.slice(at, m.from), kind: null });
    out.push({ text: text.slice(m.from, m.to), kind: m.kind, id: m.id });
    at = m.to;
  }
  if (at < text.length) out.push({ text: text.slice(at), kind: null });
  return out;
}

/** Cut the piece that contains offset `at` in two, so the caret can sit between pieces. */
function splitAt(pieces: Piece[], at: number): Piece[] {
  if (at < 0) return pieces;
  const out: Piece[] = [];
  let pos = 0;
  for (const p of pieces) {
    if (at > pos && at < pos + p.text.length) {
      out.push({ ...p, text: p.text.slice(0, at - pos) }, { ...p, text: p.text.slice(at - pos) });
    } else {
      out.push(p);
    }
    pos += p.text.length;
  }
  return out;
}

/** Inline style of a piece of text that has Format > Text styling (bold, italic, ...). */
function formatStyle(b: Block, from: number, to: number, selected: boolean, soft: boolean): React.CSSProperties | undefined {
  const covering = (b.formats ?? []).filter((f) => f.from <= from && f.to >= to);
  const on = new Set<TextFormat>(covering.map((f) => f.format));
  if (!on.size) return undefined;
  const value = (format: TextFormat) => covering.find((f) => f.format === format)?.value;
  const suggested = on.has("suggest");
  const lines = [on.has("underline") || suggested ? "underline" : "", on.has("strike") ? "line-through" : ""].filter(Boolean).join(" ");
  const size = value("size");
  return {
    fontFamily: value("font"),
    fontWeight: on.has("bold") ? 700 : undefined,
    fontStyle: on.has("italic") ? "italic" : undefined,
    textDecorationLine: lines || undefined,
    fontSize: on.has("sup") || on.has("sub") ? "0.7em" : size ? `${Math.round(Number(size) * PT_PX * 100) / 100}px` : undefined,
    verticalAlign: on.has("sup") ? "super" : on.has("sub") ? "sub" : undefined,
    // A normal (solid blue) selection hides colour and highlight; a soft one lets them show through.
    color: on.has("color") && (soft || !selected) ? value("color") : suggested ? SUGGEST_COLOR : undefined,
    backgroundColor: on.has("highlight") && (soft || !selected) ? value("highlight") : suggested && !selected ? SUGGEST_BG : undefined,
  };
}

type Props = {
  editor: EditorState;
  /** Show the floating toolbar (hidden while a menu is open). */
  showToolbar: boolean;
  /** Show a paragraph mark at the end of every block (View > Show non-printing characters). */
  nonPrinting?: boolean;
  /** What the Insert menu has added to the page (steps 20 to 26): the banner image at the top, a table under a block, lines, a page break and bookmark markers. */
  inserts?: PageInserts;
};

/**
 * The text of the white page: headings and paragraphs from the editor state, with the blinking caret, the blue
 * selection, the green find highlights and the floating selection toolbar. Pure drawing: editor-timeline.ts
 * changes the state. Hooks for scripts: doc-block-<id>, doc-start-<id>, doc-end-<id>, doc-match-current,
 * doc-comment-<anchor id> (the yellow-orange comment highlight), doc-link-<link id>, doc-at-<landmark id>, selection-comment.
 */
export function DocumentView({ editor, showToolbar, nonPrinting = false, inserts = NO_INSERTS }: Props) {
  const matches = matchesOf(editor);
  const toolbarBlock = editor.sel?.toolbar ? editor.sel.start.block : -1;

  const items = editor.blocks.map((b, i) => {
        const caretAt = editor.caret?.block === i ? editor.caret.offset : -1;
        const landmarks = editor.landmarks.filter((l) => l.block === i);
        let pieces = splitAt(piecesOf(b.text, marksOf(editor, i, matches)), caretAt);
        for (const l of landmarks) pieces = splitAt(pieces, l.offset);
        for (const f of b.formats ?? []) pieces = splitAt(splitAt(pieces, f.from), f.to);
        const firstSel = i === toolbarBlock ? pieces.findIndex((p) => p.kind === "sel") : -1;

        const nodes: React.ReactNode[] = [];
        let pos = 0;
        const markersAt = (at: number, key: string) => {
          if (caretAt === at) nodes.push(<Caret key={`c${key}`} />);
          landmarks
            .filter((l) => l.offset === at)
            .forEach((l) => nodes.push(<span key={`l${key}${l.id}`} data-tl={`doc-at-${l.id}`} className="inline-block h-[1em] w-0 align-text-bottom" />));
        };
        pieces.forEach((p, n) => {
          markersAt(pos, String(n));
          nodes.push(
            <span
              key={n}
              className={`${p.kind ? `${p.kind === "sel" && editor.sel?.soft ? MARK_STYLE_SOFT : MARK_STYLE[p.kind]} rounded-[1px]` : ""} ${n === firstSel ? "relative" : ""}`}
              style={b.formats?.length ? formatStyle(b, pos, pos + p.text.length, p.kind === "sel", !!editor.sel?.soft) : undefined}
              {...(p.kind === "current" ? { "data-tl": "doc-match-current" } : {})}
              {...(p.kind === "comment" && p.id ? { "data-tl": `doc-comment-${p.id}` } : {})}
              {...(p.kind === "link" && p.id ? { "data-tl": `doc-link-${p.id}` } : {})}
            >
              {nonPrinting ? withSpaceMarks(p.text) : p.text}
              {n === firstSel && <SelectionToolbar visible={showToolbar} partial={(editor.sel?.start.offset ?? 0) > 0} compact={!!editor.sel?.compact} />}
            </span>,
          );
          pos += p.text.length;
        });
        markersAt(pos, "end");

        return (
          <Fragment key={b.id}>
            {inserts.rules.includes(b.id) && <HorizontalRule />}
            <div
              data-tl={`doc-block-${b.id}`}
              className={`${b.list ? LIST_STYLE : b.heading ? HEADING_STYLE[b.heading] : BLOCK_STYLE[b.kind]} min-h-[1.5em] rounded-[2px] ${editor.flash === b.id ? "doc-pasted" : ""} ${
                b.checked ? "text-[#9aa0ab] line-through" : ""
              } ${b.indent !== undefined ? "transition-[margin-left] duration-300 motion-reduce:transition-none" : ""}`}
              style={
                b.align || b.indent || b.spacing
                  ? { textAlign: b.align, marginLeft: b.indent ? b.indent * INDENT_PX : undefined, lineHeight: b.spacing ? SPACING_LINE[b.spacing] : undefined }
                  : undefined
              }
            >
              {b.list && (
                <span
                  data-tl={`doc-marker-${b.id}`}
                  className="absolute left-[8px] top-[1px] flex h-[16px] w-[17px] items-center justify-end text-[10.8px] leading-[1.5]"
                >
                  {b.list === "bullet" ? <span className="mr-[4px] h-[5px] w-[5px] rounded-full bg-[#111]" /> : `${listNumber(editor.blocks, i)}.`}
                </span>
              )}
              {b.kind === "todo" && (
                <span className="absolute left-[8px] top-[1px] flex h-[16px] w-[16px] items-center justify-center">
                  <span
                    data-tl={`doc-check-${b.id}`}
                    className={`flex h-[14px] w-[14px] items-center justify-center rounded-[3.5px] border transition-colors ${
                      b.checked ? "border-[#2B6FEB] bg-[#2B6FEB] text-white" : "border-[#B4B9C4] bg-white text-transparent"
                    }`}
                  >
                    <Icon name="check" size={10} />
                  </span>
                </span>
              )}
              <span data-tl={`doc-start-${b.id}`} className="inline-block h-[1em] w-0 align-text-bottom" />
              {inserts.bookmarks
                .filter((m) => m.before === b.id)
                .map((m) => (
                  <span
                    key={m.id}
                    data-tl={`doc-bookmark-${m.id}`}
                    title={m.name}
                    className="doc-image-in mr-[5px] inline-flex h-[17px] w-[17px] items-center justify-center rounded-[4px] bg-[#E3EAF7] align-[-3px] text-[#5F78AB]"
                  >
                    <Icon name="imBookmark" size={12} />
                  </span>
                ))}
              {nodes}
              <span data-tl={`doc-end-${b.id}`} className="inline-block h-[1em] w-0 align-text-bottom" />
              {nonPrinting && <span aria-hidden className="ml-[3px] select-none text-[#8CA0C7]">¶</span>}
            </div>
            {inserts.table?.after === b.id && <TableBlock cells={inserts.table.cells} focus={inserts.table.focus} />}
            {inserts.objects
              .filter((o) => o.after === b.id)
              .map((o) => (
                <ObjectBlock key={o.id} object={o} showToolbar={showToolbar} />
              ))}
          </Fragment>
        );
  });

  // A page break splits the text in two: page 1 is padded down to a full page, a thin grey band, then page 2.
  const breakAt = inserts.pageBreakBefore ? editor.blocks.findIndex((b) => b.id === inserts.pageBreakBefore) : -1;

  return (
    <div className="select-none font-[Arial,Helvetica,sans-serif]">
      {inserts.image && <ImageBlock {...inserts.image} showToolbar={showToolbar} />}
      {breakAt > 0 ? (
        <>
          <div className="flex flex-col" style={{ minHeight: PAGE_BODY_MIN }}>
            <div>{items.slice(0, breakAt)}</div>
            <div className="flex-1" />
          </div>
          {/* The grey band between the pages is drawn by PageDecor at the same height; this spacer keeps the room. */}
          <div className="h-[4px]" />
          <div style={{ paddingTop: PAGE_TOP_PAD }}>{items.slice(breakAt)}</div>
        </>
      ) : (
        items
      )}
    </div>
  );
}

/** View > Show non-printing characters: every space becomes a small dot (a line may still break after it). */
function withSpaceMarks(text: string): React.ReactNode[] {
  return text.split(" ").flatMap((word, i) =>
    i === 0
      ? [word]
      : [
          <span key={`d${i}`} aria-hidden className="inline-block w-[0.3em] select-none text-center text-[#8CA0C7]">
            ·
          </span>,
          <wbr key={`w${i}`} />,
          word,
        ],
  );
}

function Caret() {
  return <span className="doc-caret text-[#111]" />;
}

/** The dark bar above the selected text. It hangs off the first selected piece, so it follows the text. */
function SelectionToolbar({ visible, partial, compact }: { visible: boolean; partial: boolean; compact: boolean }) {
  return (
    <span
      data-tl="selection-toolbar"
      aria-hidden
      className={`pointer-events-none absolute ${compact ? "left-[-8px]" : partial ? "left-[24px]" : "left-[110px]"} top-[-6px] z-10 flex h-[28px] -translate-y-full items-center gap-[1px] whitespace-nowrap rounded-[8px] bg-[#16171B] px-[7px] text-white shadow-[0_6px_18px_-4px_rgba(0,0,0,0.35)] transition-opacity duration-150 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <FloatingToolbarIcons />
    </span>
  );
}
