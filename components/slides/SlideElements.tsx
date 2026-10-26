import type { ReactNode } from "react";
import { ChartGraphic } from "./ChartGraphic";
import { guideLines, type FindMatch, type ShapeEl, type SlideEl, type TableEl, type TextEl } from "./slide-elements";
import { IMAGE_BY_KEY } from "./slide-elements-data";

/** What the big canvas shows on top of the slide's elements. Thumbnails pass none of it. */
export type SlideViewState = {
  /** Ids of the selected elements (blue frame and handles). */
  selected: string[];
  /** A text box being typed into: its text so far is `typed`; "new" is a box that is not in the slide yet (it has `box`). */
  editing?: { id: string; mode: "append" | "replace" | "new"; typed: string; box?: { x: number; y: number; w: number; h: number } } | null;
  /** A table cell being typed into. */
  cell?: { id: string; row: number; col: number; typed: string } | null;
  find?: { query: string; matchCase: boolean; current: FindMatch | null };
  guides?: boolean;
  /** Guides an element has just snapped to (drawn solid and blue). */
  snap?: { v?: number; h?: number } | null;
  /** The dashed outline of a text box while it is being drawn. */
  draw?: { x: number; y: number; w: number; h: number } | null;
  /** An invisible spot the cursor can glide to (scripts move it: `[data-tl=slide-marker]`). */
  marker?: { x: number; y: number } | null;
  onSelect?: (id: string | null) => void;
};

const BLUE = "#2B6FEB";
const cq = (n: number) => `${n}cqw`;

export function SlideElements({ elements, view, ratio }: { elements: SlideEl[]; view?: SlideViewState; ratio: number }) {
  const sel = view?.selected ?? [];
  return (
    <>
      {elements.map((e) => (
        <ElementBox key={e.id} el={e} selected={sel.includes(e.id)} view={view} />
      ))}
      {view?.editing?.mode === "new" && view.editing.box && <NewTextBox view={view} />}
      {view?.draw && <div className="absolute border-[0.2cqw] border-dashed border-[#2B6FEB]" style={{ left: cq(view.draw.x), top: cq(view.draw.y), width: cq(view.draw.w), height: cq(view.draw.h) }} />}
      {view?.guides && <Guides ratio={ratio} snap={view.snap} />}
      {view?.marker && <i data-tl="slide-marker" className="absolute block h-px w-px" style={{ left: cq(view.marker.x), top: cq(view.marker.y) }} />}
    </>
  );
}

function ElementBox({ el, selected, view }: { el: SlideEl; selected: boolean; view?: SlideViewState }) {
  const onClick = view?.onSelect
    ? (ev: React.MouseEvent) => {
        ev.stopPropagation();
        view.onSelect?.(el.id);
      }
    : undefined;
  const isLine = el.kind === "line";
  return (
    <div
      data-tl={view ? `el-${el.id}` : undefined}
      onClick={onClick}
      className="absolute"
      style={{ left: cq(el.x), top: cq(el.y), width: cq(el.w), height: isLine ? cq(0.9) : cq(el.h), marginTop: isLine ? cq(-0.45) : 0 }}
    >
      <Body el={el} view={view} />
      {selected && <Frame el={el} />}
    </div>
  );
}

function Body({ el, view }: { el: SlideEl; view?: SlideViewState }) {
  switch (el.kind) {
    case "text":
      return <TextBody el={el} view={view} />;
    case "shape":
      return <ShapeBody el={el} />;
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={IMAGE_BY_KEY[el.src] ?? el.src} alt={el.alt} draggable={false} className="h-full w-full select-none object-cover" />
      );
    case "line":
      return <i className="absolute inset-x-0 top-1/2 block h-[0.35cqw] -translate-y-1/2 rounded-full bg-[#1f2430]" />;
    case "table":
      return <TableBody el={el} view={view} />;
    case "chart":
      return (
        <div className="h-full w-full rounded-[0.6cqw] border border-[#E3E6EC] bg-white">
          <ChartGraphic chart={el} />
        </div>
      );
  }
}

/* ------------------------------------------------------------------ text */

const TEXT_STYLE: Record<TextEl["style"], string> = {
  title: "text-[6.4cqw] font-bold leading-none text-[#1f2430]",
  subtitle: "text-[3.6cqw] leading-none text-[#6b7280]",
  body: "text-[3.8cqw] leading-none text-[#1f2430]",
  box: "text-[3.4cqw] leading-[1.2] text-[#1f2430]",
};

function Para({ text, el, para, view }: { text: string; el: TextEl; para: number; view?: SlideViewState }) {
  const f = view?.find;
  if (!f?.query) return <>{text}</>;
  const q = f.matchCase ? f.query : f.query.toLowerCase();
  const hay = f.matchCase ? text : text.toLowerCase();
  const parts: ReactNode[] = [];
  let from = 0;
  for (let at = hay.indexOf(q); at !== -1; at = hay.indexOf(q, from)) {
    if (at > from) parts.push(text.slice(from, at));
    const current = f.current && f.current.el === el.id && f.current.para === para && f.current.start === at;
    parts.push(
      <mark key={at} data-tl={current ? "find-current" : undefined} className={`rounded-[0.3cqw] px-[0.2cqw] text-inherit ${current ? "bg-[#F5A623]" : "bg-[#FFE58A]"}`}>
        {text.slice(at, at + q.length)}
      </mark>,
    );
    from = at + q.length;
  }
  if (!parts.length) return <>{text}</>;
  if (from < text.length) parts.push(text.slice(from));
  return <>{parts}</>;
}

const Caret = () => <i className="ml-[0.2cqw] inline-block h-[1.05em] w-[0.22cqw] translate-y-[0.15em] bg-[#111]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />;

function TextBody({ el, view }: { el: TextEl; view?: SlideViewState }) {
  const ed = view?.editing && view.editing.id === el.id ? view.editing : null;
  const paras = ed ? (ed.mode === "append" ? [...el.paras, ed.typed] : [ed.typed]) : el.paras;
  const last = paras.length - 1;
  const cls = `${TEXT_STYLE[el.style]} ${el.align === "center" ? "text-center" : ""}`;
  if (el.bullets) {
    return (
      <ul className={`space-y-[2.2cqw] ${cls}`}>
        {paras.map((p, i) => (
          <li key={i} className="flex items-center gap-[1.8cqw] whitespace-nowrap">
            <i className="inline-block h-[1.2cqw] w-[1.2cqw] shrink-0 rounded-full bg-[#2B6FEB]" />
            <span>
              <Para text={p} el={el} para={i} view={view} />
              {ed && i === last && <Caret />}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={`${cls} ${el.style === "box" ? "" : "whitespace-nowrap"}`}>
      {paras.map((p, i) => (
        <p key={i}>
          <Para text={p} el={el} para={i} view={view} />
          {ed && i === last && <Caret />}
        </p>
      ))}
    </div>
  );
}

/** A text box that has just been drawn and is being typed into (it joins the slide when the typing is done). */
function NewTextBox({ view }: { view: SlideViewState }) {
  const ed = view.editing!;
  const b = ed.box!;
  return (
    <div data-tl="el-new-box" className="absolute" style={{ left: cq(b.x), top: cq(b.y), width: cq(b.w), height: cq(b.h) }}>
      <p className={TEXT_STYLE.box}>
        {ed.typed}
        <Caret />
      </p>
      <Frame el={{ id: "new", kind: "text", style: "box", paras: [], ...b }} />
    </div>
  );
}

/* ----------------------------------------------------------------- shapes */

const POLYGONS: Partial<Record<ShapeEl["shape"], string>> = {
  triangle: "50,2 98,98 2,98",
  diamond: "50,2 98,50 50,98 2,50",
  star: "50,2 61,38 98,38 68,60 79,96 50,74 21,96 32,60 2,38 39,38",
  arrow: "2,34 58,34 58,8 98,50 58,92 58,66 2,66",
};

function ShapeBody({ el }: { el: ShapeEl }) {
  if (el.shape === "rect" || el.shape === "rounded") {
    return <div className="h-full w-full" style={{ background: el.fill, borderRadius: el.shape === "rounded" ? cq(Math.min(1.4, el.h / 2)) : 0 }} />;
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      {el.shape === "ellipse" ? <ellipse cx="50" cy="50" rx="49" ry="49" fill={el.fill} /> : <polygon points={POLYGONS[el.shape]} fill={el.fill} strokeLinejoin="round" />}
    </svg>
  );
}

/* ------------------------------------------------------------------ table */

function TableBody({ el, view }: { el: TableEl; view?: SlideViewState }) {
  const rows = el.cells.length;
  const cols = el.cells[0]?.length ?? 0;
  const cell = view?.cell && view.cell.id === el.id ? view.cell : null;
  return (
    <div className="grid h-full w-full border border-[#D5D8E0] bg-white text-[2.3cqw] text-[#1f2430]" style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {el.cells.map((row, r) =>
        row.map((text, c) => {
          const editing = cell && cell.row === r && cell.col === c;
          return (
            <div
              key={`${r}-${c}`}
              data-tl={view ? `cell-${el.id}-${r}-${c}` : undefined}
              className={`relative flex items-center overflow-hidden whitespace-nowrap border-[#D5D8E0] px-[1.2cqw] ${r > 0 ? "border-t" : ""} ${c > 0 ? "border-l" : ""} ${r === 0 ? "bg-[#EEF0F4] font-semibold" : ""} ${
                editing ? "z-10 shadow-[inset_0_0_0_0.22cqw_#2B6FEB]" : ""
              }`}
            >
              {editing ? view!.cell!.typed : text}
              {editing && <Caret />}
            </div>
          );
        }),
      )}
    </div>
  );
}

/* ------------------------------------------------------- selection frame */

const HANDLES: [string, string][] = [
  ["nw", "left-0 top-0"],
  ["n", "left-1/2 top-0"],
  ["ne", "left-full top-0"],
  ["e", "left-full top-1/2"],
  ["se", "left-full top-full"],
  ["s", "left-1/2 top-full"],
  ["sw", "left-0 top-full"],
  ["w", "left-0 top-1/2"],
];

function Frame({ el }: { el: SlideEl }) {
  const handle = (id: string, pos: string) => (
    <i key={id} data-tl={`handle-${el.id}-${id}`} className={`absolute block h-[1.3cqw] w-[1.3cqw] -translate-x-1/2 -translate-y-1/2 rounded-[0.25cqw] border-[0.18cqw] bg-white ${pos}`} style={{ borderColor: BLUE }} />
  );
  if (el.kind === "line") {
    return (
      <div className="pointer-events-none absolute inset-0">
        {handle("w", "left-0 top-1/2")}
        {handle("e", "left-full top-1/2")}
      </div>
    );
  }
  return (
    <div data-tl={`frame-${el.id}`} className="pointer-events-none absolute inset-[-0.3cqw] border-[0.18cqw]" style={{ borderColor: BLUE }}>
      <div className="absolute inset-[0.3cqw]">{HANDLES.map(([id, pos]) => handle(id, pos))}</div>
    </div>
  );
}

/* ----------------------------------------------------------------- guides */

function Guides({ ratio, snap }: { ratio: number; snap?: { v?: number; h?: number } | null }) {
  const g = guideLines(ratio);
  const style = (on: boolean, centre: boolean) => ({
    borderColor: on ? BLUE : centre ? "#7A8194" : "#B7BCC9",
    borderStyle: on ? "solid" : "dashed",
  });
  return (
    <div data-tl="slide-guides" className="pointer-events-none absolute inset-0">
      {g.v.map((x, i) => (
        <i key={`v${i}`} className="absolute inset-y-0 block border-l-[0.15cqw]" style={{ left: cq(x), ...style(snap?.v === x, i === 1) }} />
      ))}
      {g.h.map((y, i) => (
        <i key={`h${i}`} className="absolute inset-x-0 block border-t-[0.15cqw]" style={{ top: cq(y), ...style(snap?.h === y, i === 1) }} />
      ))}
    </div>
  );
}
