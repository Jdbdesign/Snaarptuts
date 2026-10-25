"use client";

import { FloatingToolbarIcons } from "./FloatingToolbar";
import { ImageBlock } from "./ImageBlock";
import { marksOf, matchesOf, type Block, type EditorState, type Mark } from "./editor-state";
import { NO_INSERTS, type PageInserts } from "./insert-state";

const BLOCK_STYLE: Record<Block["kind"], string> = {
  h1: "mb-[12px] text-[19.5px] font-bold leading-[1.3]",
  h2: "mb-[8px] mt-[16px] text-[19.5px] font-bold leading-[1.3]",
  p: "mb-[12px] text-[10.8px] leading-[1.5]",
};

const MARK_STYLE: Record<Mark["kind"], string> = {
  sel: "bg-[#2F6BDB] text-white",
  current: "bg-[#8ED3A4]",
  match: "bg-[#D6F0DF]",
  comment: "bg-[#F9B208]",
};

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

type Props = {
  editor: EditorState;
  /** Show the floating toolbar (hidden while a menu is open). */
  showToolbar: boolean;
  /** Show a paragraph mark at the end of every block (View > Show non-printing characters). */
  nonPrinting?: boolean;
  /** What the Insert menu has added to the page (steps 20 to 22): the banner image at the top, a table under a block. */
  inserts?: PageInserts;
};

/**
 * The text of the white page: headings and paragraphs from the editor state, with the blinking caret, the blue
 * selection, the green find highlights and the floating selection toolbar. Pure drawing: editor-timeline.ts
 * changes the state. Hooks for scripts: doc-block-<id>, doc-start-<id>, doc-end-<id>, doc-match-current,
 * doc-comment-<anchor id> (the yellow-orange comment highlight), doc-at-<landmark id>, selection-comment.
 */
export function DocumentView({ editor, showToolbar, nonPrinting = false, inserts = NO_INSERTS }: Props) {
  const matches = matchesOf(editor);
  const toolbarBlock = editor.sel?.toolbar ? editor.sel.start.block : -1;

  return (
    <div className="select-none font-[Arial,Helvetica,sans-serif]">
      {inserts.image && <ImageBlock {...inserts.image} showToolbar={showToolbar} />}
      {editor.blocks.map((b, i) => {
        const caretAt = editor.caret?.block === i ? editor.caret.offset : -1;
        const landmarks = editor.landmarks.filter((l) => l.block === i);
        let pieces = splitAt(piecesOf(b.text, marksOf(editor, i, matches)), caretAt);
        for (const l of landmarks) pieces = splitAt(pieces, l.offset);
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
              className={`${p.kind ? `${MARK_STYLE[p.kind]} rounded-[1px]` : ""} ${n === firstSel ? "relative" : ""}`}
              {...(p.kind === "current" ? { "data-tl": "doc-match-current" } : {})}
              {...(p.kind === "comment" && p.id ? { "data-tl": `doc-comment-${p.id}` } : {})}
            >
              {nonPrinting ? withSpaceMarks(p.text) : p.text}
              {n === firstSel && <SelectionToolbar visible={showToolbar} partial={(editor.sel?.start.offset ?? 0) > 0} />}
            </span>,
          );
          pos += p.text.length;
        });
        markersAt(pos, "end");

        return (
          <div
            key={b.id}
            data-tl={`doc-block-${b.id}`}
            className={`${BLOCK_STYLE[b.kind]} min-h-[1.5em] rounded-[2px] ${editor.flash === b.id ? "doc-pasted" : ""}`}
          >
            <span data-tl={`doc-start-${b.id}`} className="inline-block h-[1em] w-0 align-text-bottom" />
            {nodes}
            <span data-tl={`doc-end-${b.id}`} className="inline-block h-[1em] w-0 align-text-bottom" />
            {nonPrinting && <span aria-hidden className="ml-[3px] select-none text-[#8CA0C7]">¶</span>}
          </div>
        );
      })}
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
function SelectionToolbar({ visible, partial }: { visible: boolean; partial: boolean }) {
  return (
    <span
      data-tl="selection-toolbar"
      aria-hidden
      className={`pointer-events-none absolute ${partial ? "left-[24px]" : "left-[110px]"} top-[-6px] z-10 flex h-[28px] -translate-y-full items-center gap-[1px] whitespace-nowrap rounded-[8px] bg-[#16171B] px-[7px] text-white shadow-[0_6px_18px_-4px_rgba(0,0,0,0.35)] transition-opacity duration-150 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <FloatingToolbarIcons />
    </span>
  );
}
