"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { COLUMN_COUNT, ROW_COUNT } from "./sheets-data";
import { colLabel, obj, refOf, single, sorted, type Range, type Rows } from "./grid-state";

export const COL_W = 86;
export const ROW_H = 21.5;
const HEAD_W = 36;
const GUTTER_W = 16;
const BAND_H = 14;
const BLUE = "#2563EB";

/** An object floating over the cells (a chart, a picture): its top-left corner sits on cell (r, c). */
export type Floater = { id: string; r: number; c: number; w: number; h: number; node: ReactNode };

export type GroupSpan = { from: number; to: number; collapsed: boolean };
export type Groups = { rows: GroupSpan | null; cols: GroupSpan | null };

export type GridProps = {
  rows: Rows;
  widths?: number[];
  /** Selected range (default: A1 alone). */
  sel?: Range;
  /** Cut / copied range with the marching ants. */
  ants?: Range | null;
  /** The cells a formula points at: an orange outline (Insert > Function). */
  refRange?: Range | null;
  /** A cell being typed into. */
  edit?: { r: number; c: number; text: string } | null;
  /** Find matches, and which one is current. */
  hits?: [number, number][];
  hitNow?: number;
  /** Cells with a comment (a small orange corner). */
  commented?: string[];
  gridlines?: boolean;
  formulas?: boolean;
  frozenRows?: number;
  frozenCols?: number;
  /** How many unfrozen rows / columns the grid is scrolled by. */
  scrollRow?: number;
  scrollCol?: number;
  zoom?: number;
  groups?: Groups;
  /** Taller rows (a picture in a cell), by row index, in px. */
  rowHeights?: Record<number, number>;
  floaters?: Floater[];
};

const CHIP_ICONS = { dropdown: "shDropdown", people: "user", date: "shCalendar", place: "shPin", file: "shFile", finance: "shCoin", event: "shCalendar" } as const;

const within = (g: GroupSpan | null, i: number) => !!g && i >= g.from && i <= g.to;

/**
 * The cell grid with its column and row headers. Everything beyond the plain look is optional and off by default, so the File steps
 * draw exactly what they always did. Hooks: sheet-grid-inner, cell-<ref> (cell-b3), group-toggle-rows, group-toggle-cols.
 */
export function SheetGrid({
  rows,
  widths,
  sel,
  ants = null,
  refRange = null,
  edit = null,
  hits = [],
  hitNow = -1,
  commented = [],
  gridlines = true,
  formulas = false,
  frozenRows = 0,
  frozenCols = 0,
  scrollRow = 0,
  scrollCol = 0,
  zoom = 100,
  groups = { rows: null, cols: null },
  rowHeights,
  floaters = [],
}: GridProps) {
  const z = zoom / 100;
  const rowCount = z < 1 ? 100 : ROW_COUNT;
  const colCount = z < 1 ? 40 : COLUMN_COUNT;
  const s = sorted(sel ?? single(0, 0));
  const a = ants ? sorted(ants) : null;
  const rr = refRange ? sorted(refRange) : null;
  const w = (c: number) => widths?.[c] ?? COL_W;
  const line = gridlines ? "#E2E3E3" : "transparent";
  const headLine = "#DADCE0";

  const hiddenRow = (r: number) => !!groups.rows?.collapsed && within(groups.rows, r);
  const hiddenCol = (c: number) => !!groups.cols?.collapsed && within(groups.cols, c);
  const rowIdx: number[] = [];
  for (let r = 0; r < rowCount; r++) if (!hiddenRow(r) && (r < frozenRows || r >= frozenRows + scrollRow)) rowIdx.push(r);
  const colIdx: number[] = [];
  for (let c = 0; c < colCount; c++) if (!hiddenCol(c) && (c < frozenCols || c >= frozenCols + scrollCol)) colIdx.push(c);

  const hitSet = new Map(hits.map(([r, c], i) => [`${r},${c}`, i]));
  const hasRowGroup = !!groups.rows;
  const hasColGroup = !!groups.cols;
  const gut = hasRowGroup ? GUTTER_W : 0;
  const rh = (r: number) => rowHeights?.[r] ?? ROW_H;

  return (
    <div
      data-tl="sheet-grid-inner"
      className="absolute left-0 top-0 select-none text-[13px]"
      style={{ fontFamily: "Arial, Helvetica, sans-serif", zoom: z, width: `${100 / z}%`, height: `${100 / z}%` }}
    >
      {/* column group band */}
      {hasColGroup && (
        <div className="absolute left-0 right-0 top-0 flex bg-white" style={{ height: BAND_H }}>
          <span className="shrink-0" style={{ width: HEAD_W + gut }} />
          {colIdx.map((c) => {
            const g = groups.cols!;
            return (
              <span key={c} className="relative shrink-0" style={{ width: w(c) }}>
                {within(g, c) && !g.collapsed && <i className="absolute left-0 right-0 top-[7px] h-px bg-[#5F6368]" />}
                {within(g, c) && !g.collapsed && c === g.from && <i className="absolute left-0 top-[7px] h-[6px] w-px bg-[#5F6368]" />}
                {within(g, c) && !g.collapsed && c === g.to && <i className="absolute right-0 top-[7px] h-[6px] w-px bg-[#5F6368]" />}
                {c === g.to + 1 && (
                  <span data-tl="group-toggle-cols" className="absolute left-[3px] top-[1px] flex h-[11px] w-[11px] items-center justify-center border border-[#5F6368] bg-white text-[#5F6368]">
                    <Icon name={g.collapsed ? "plus" : "shMinusBox"} size={9} />
                  </span>
                )}
              </span>
            );
          })}
        </div>
      )}

      {/* column headers */}
      <div className="absolute left-0 right-0 flex h-[21.5px] border-b bg-[#F8F9FA] text-[12px] text-[#5F6368]" style={{ top: hasColGroup ? BAND_H : 0, borderColor: headLine }}>
        <span className="shrink-0 border-r" style={{ width: HEAD_W + gut, borderColor: headLine }} />
        {colIdx.map((c) => (
          <span key={c} data-tl={`colhead-${colLabel(c).toLowerCase()}`} className={`flex shrink-0 items-center justify-center border-r ${c >= s.c1 && c <= s.c2 ? "bg-[#E1E8F6] font-medium text-[#1f2430]" : ""}`} style={{ width: w(c), borderColor: headLine }}>
            {colLabel(c)}
          </span>
        ))}
      </div>

      {/* rows */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ top: (hasColGroup ? BAND_H : 0) + ROW_H }}>
        {rowIdx.map((r) => (
          <div
            key={r}
            className="flex border-b"
            style={{ height: rh(r), borderColor: frozenRows > 0 && r === frozenRows - 1 ? BLUE : line, borderBottomWidth: frozenRows > 0 && r === frozenRows - 1 ? 2 : 1 }}
          >
            {hasRowGroup && <GroupGutter span={groups.rows!} r={r} />}
            <span
              data-tl={`rowhead-${r + 1}`}
              className={`flex shrink-0 items-center justify-center border-r bg-[#F8F9FA] text-[11.5px] ${r >= s.r1 && r <= s.r2 ? "bg-[#E1E8F6] font-medium text-[#1f2430]" : "text-[#5F6368]"}`}
              style={{ width: HEAD_W, borderColor: headLine }}
            >
              {r + 1}
            </span>
            {colIdx.map((c) => {
              const o = obj(rows[r]?.[c]);
              const text = formulas && o.formula ? o.formula : o.text;
              const inSel = r >= s.r1 && r <= s.r2 && c >= s.c1 && c <= s.c2;
              const active = r === s.r1 && c === s.c1;
              const multi = s.r1 !== s.r2 || s.c1 !== s.c2;
              const editing = edit && edit.r === r && edit.c === c;
              const hit = hitSet.get(`${r},${c}`);
              const inRef = !!rr && r >= rr.r1 && r <= rr.r2 && c >= rr.c1 && c <= rr.c2;
              const inAnts = !!a && r >= a.r1 && r <= a.r2 && c >= a.c1 && c <= a.c2;
              const frozenEdge = frozenCols > 0 && c === frozenCols - 1;
              return (
                <span
                  key={c}
                  data-tl={`cell-${refOf(r, c).toLowerCase()}`}
                  className={`relative block shrink-0 overflow-hidden whitespace-nowrap border-r px-[4px] text-[#202124] ${o.bold ? "font-semibold" : ""} ${o.align === "right" ? "text-right" : ""} ${o.link ? "text-[#1155CC] underline" : ""}`}
                  style={{
                    width: w(c),
                    lineHeight: `${rh(r) - 1}px`,
                    borderColor: frozenEdge ? BLUE : line,
                    borderRightWidth: frozenEdge ? 2 : 1,
                    backgroundColor: editing ? "#fff" : hit !== undefined ? (hit === hitNow ? "#F9C74F" : "#FFF0A8") : o.fill,
                  }}
                >
                  {editing ? (
                    <span className="relative z-10 text-left">
                      {edit.text}
                      <i className="ml-px inline-block h-[14px] w-px translate-y-[2px] bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />
                    </span>
                  ) : o.box ? (
                    <span className="flex h-full items-center justify-center">
                      <i className={`flex h-[14px] w-[14px] items-center justify-center rounded-[3px] border ${o.box === "on" ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#80868B] bg-white"}`}>{o.box === "on" && <Icon name="check" size={11} />}</i>
                    </span>
                  ) : o.chip ? (
                    <span className="absolute inset-y-[3px] left-[3px] right-[3px] flex items-center justify-between rounded-full px-[7px] text-[11.5px] leading-none text-[#1f2430]" style={{ background: o.chip.tone ?? "#E8F0FE" }}>
                      <span className="flex min-w-0 items-center gap-[4px]">
                        {o.chip.kind !== "dropdown" && <Icon name={CHIP_ICONS[o.chip.kind]} size={11} className="shrink-0 text-[#5F6368]" />}
                        <span className="truncate">{o.chip.label}</span>
                        {o.chip.sub && <span className="shrink-0 text-[#137333]">{o.chip.sub}</span>}
                      </span>
                      {o.chip.kind === "dropdown" && <Icon name="chevronDown" size={8} className="ml-[3px] shrink-0 text-[#5F6368]" />}
                    </span>
                  ) : o.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.image} alt="" className="absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] object-contain" />
                  ) : (
                    text
                  )}
                  {inSel && multi && !active && <i className="pointer-events-none absolute inset-0" style={{ backgroundColor: "rgba(37,99,235,0.13)" }} />}
                  {inSel && (
                    <i
                      className="pointer-events-none absolute -inset-px border-solid"
                      style={{
                        borderColor: BLUE,
                        borderTopWidth: r === s.r1 ? 2 : 0,
                        borderBottomWidth: r === s.r2 ? 2 : 0,
                        borderLeftWidth: c === s.c1 ? 2 : 0,
                        borderRightWidth: c === s.c2 ? 2 : 0,
                      }}
                    />
                  )}
                  {inSel && r === s.r2 && c === s.c2 && !editing && <i className="pointer-events-none absolute -bottom-[4px] -right-[4px] z-10 h-[6px] w-[6px] border border-white" style={{ backgroundColor: BLUE }} />}
                  {inRef && (
                    <i
                      className="pointer-events-none absolute -inset-px border-dashed"
                      style={{ borderColor: "#E8710A", borderTopWidth: r === rr!.r1 ? 2 : 0, borderBottomWidth: r === rr!.r2 ? 2 : 0, borderLeftWidth: c === rr!.c1 ? 2 : 0, borderRightWidth: c === rr!.c2 ? 2 : 0, backgroundColor: "rgba(232,113,10,0.07)" }}
                    />
                  )}
                  {inAnts && <Ants top={r === a!.r1} bottom={r === a!.r2} left={c === a!.c1} right={c === a!.c2} />}
                  {commented.includes(refOf(r, c)) && <i className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[8px] border-t-[8px] border-l-transparent border-t-[#F4B400]" />}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {floaters.map((f) => {
        let left = HEAD_W + gut;
        for (let c = 0; c < f.c; c++) left += w(c);
        let top = (hasColGroup ? BAND_H : 0) + ROW_H;
        for (let r = 0; r < f.r; r++) top += rh(r);
        return (
          <div key={f.id} data-tl={`floater-${f.id}`} className="absolute z-[6]" style={{ left, top, width: f.w, height: f.h }}>
            {f.node}
          </div>
        );
      })}
    </div>
  );
}

/** The left gutter of a row group: a bracket along the grouped rows and the − / + button on the row after them. */
function GroupGutter({ span, r }: { span: GroupSpan; r: number }) {
  const inside = within(span, r) && !span.collapsed;
  return (
    <span className="relative shrink-0 bg-white" style={{ width: GUTTER_W }}>
      {inside && <i className="absolute bottom-0 left-[8px] top-0 w-px bg-[#5F6368]" />}
      {inside && r === span.from && <i className="absolute left-[8px] top-[10px] h-px w-[6px] bg-[#5F6368]" />}
      {inside && r === span.to && <i className="absolute bottom-[10px] left-[8px] h-px w-[6px] bg-[#5F6368]" />}
      {r === span.to + 1 && (
        <span data-tl="group-toggle-rows" className="absolute left-[2px] top-[5px] z-10 flex h-[11px] w-[11px] items-center justify-center border border-[#5F6368] bg-white text-[#5F6368]">
          <Icon name={span.collapsed ? "plus" : "shMinusBox"} size={9} />
        </span>
      )}
    </span>
  );
}

/** Marching ants along the outer edges of the cut / copied range (a white line under the dashes keeps them clear of the selection). */
function Ants({ top, bottom, left, right }: { top: boolean; bottom: boolean; left: boolean; right: boolean }) {
  const edges: [boolean, string, string, string, string][] = [
    [top, "0", "0.5", "100%", "0.5"],
    [bottom, "0", "100%", "100%", "100%"],
    [left, "0.5", "0", "0.5", "100%"],
    [right, "100%", "0", "100%", "100%"],
  ];
  return (
    <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible" aria-hidden="true">
      {edges.map(([on, x1, y1, x2, y2], i) =>
        on ? (
          <g key={i}>
            <line className="sheet-ant-bg" x1={x1} y1={y1} x2={x2} y2={y2} />
            <line className="sheet-ant" x1={x1} y1={y1} x2={x2} y2={y2} />
          </g>
        ) : null,
      )}
    </svg>
  );
}
