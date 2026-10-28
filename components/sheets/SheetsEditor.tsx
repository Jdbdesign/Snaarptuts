"use client";

import type { ReactNode } from "react";
import { Icon, ProductLogo, type IconName } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { cellText, type SheetModel } from "./sheets-sample";
import { COLUMN_COUNT, HEADER, ROW_COUNT, TOOLBAR } from "./sheets-data";

/** Narrow screens: the whole editor is enlarged so it stays readable once the scene is scaled down (same as Snaarp Doc and Slides). */
export const SHEETS_NARROW_ZOOM = 2.4;

const COL_W = 86;
const ROW_H = 21.5;
const HEAD_W = 36;
const letter = (i: number) => String.fromCharCode(65 + i);

type Props = {
  title: string;
  /** The sheet tabs and which one shows. */
  sheets: SheetModel[];
  activeSheet: string;
  /** "File" (or another menu id) gets the grey fill while its menu is open. */
  openMenu?: string | null;
  /** The right-hand column (File details). */
  sidePanel?: ReactNode;
  panelOpen?: boolean;
  /** "Make available offline" is on: the cloud beside the title gets a tick. */
  offline?: boolean;
  /** The sheet is in the trash: a small pill sits beside the title. */
  trashed?: boolean;
  /** Text of the green pill in the header ("Opened ...", "Imported ..."), empty = hidden. */
  notice?: string;
  /** Menus and dialogs. They sit inside the narrow-screen zoom, so they share the editor's coordinates. */
  overlay?: ReactNode;
};

/**
 * The Snaarp Sheets editor: header (title, star, folder, status, header icons, Share, avatar), menu bar, toolbar, name box and
 * formula bar, the grid with its row and column headers, and the sheet tabs. Sizes are the recording's (about 1450 px wide).
 * Hooks: sheet-title, sheet-star, editor-menu-<id>, sheet-toolbar, sheet-grid, cell-a1, sheet-tab-<id>, sheet-add-tab, editor-share, sheet-notice, sheet-side.
 */
export function SheetsEditor({ title, sheets, activeSheet, openMenu = null, sidePanel, panelOpen = false, offline = false, trashed = false, notice = "", overlay }: Props) {
  const narrow = useNarrow();
  const current = sheets.find((s) => s.id === activeSheet) ?? sheets[0];
  const a1 = cellText(current?.rows[0]?.[0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#202124]">
      <div className="relative flex h-full w-full flex-col" style={{ zoom: narrow ? SHEETS_NARROW_ZOOM : 1 }}>
        {/* Title row */}
        <div className="relative h-[40px] shrink-0">
          <ProductLogo name="sheet" size={30} className="absolute left-[3px] top-[5px] rounded-[7px]" />
          <div className="absolute left-[44px] top-[8px] flex h-[24px] items-center gap-[10px] whitespace-nowrap">
            <h1 data-tl="sheet-title" className="rounded-[4px] text-[17px] font-normal leading-[24px] text-[#1f2430]">{title}</h1>
            <Icon name="star" size={17} className="text-[#4b5060]" data-tl="sheet-star" />
            <Icon name="shFolderOutline" size={17} className="text-[#4b5060]" />
            <span className="flex items-center gap-[6px] text-[12.5px] text-[#5F6368]">
              <Icon name={offline ? "shOffline" : "cloud"} size={16} className={offline ? "text-[#1E8E3E]" : "text-[#5F6368]"} />
              {!narrow && HEADER.lastEdit}
            </span>
            {trashed && <span data-tl="sheet-trashed" className="rounded-full bg-[#FCE8E6] px-[9px] py-[2px] text-[11.5px] font-medium text-[#C5221F]">{HEADER.trashed}</span>}
          </div>

          <div
            data-tl="sheet-notice"
            className={`absolute right-[440px] top-[6px] flex h-[28px] max-w-[330px] items-center gap-[7px] rounded-full border border-[#CDE9D4] bg-[#EAF6ED] px-[11px] text-[12px] text-[#137333] transition-opacity duration-300 motion-reduce:transition-none ${
              notice ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Icon name="circleCheck" size={14} className="shrink-0" />
            <span className="truncate">{notice}</span>
          </div>

          <div className="absolute right-[10px] top-[5px] flex h-[30px] items-center gap-[22px] text-[#4b5060]">
            {!narrow && (
              <>
                <Icon name="shGrid" size={18} />
                <Icon name="restore" size={18} />
                <Icon name="edComment" size={18} />
                <span className="flex items-center gap-[2px]"><Icon name="edCamera" size={19} /><Icon name="chevronDown" size={9} /></span>
                <Icon name="lock" size={17} />
              </>
            )}
            <span data-tl="editor-share" className="flex h-[30px] items-center gap-[7px] rounded-full bg-[#DDE7FB] px-[16px] text-[13px] font-medium text-[#1C3F94] transition-[filter] data-[hover=true]:brightness-95 data-[pressed=true]:scale-95">
              <Icon name="shShare" size={16} />
              {HEADER.share}
            </span>
            <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#7014D9] text-[11px] font-medium text-white">{HEADER.avatar}</span>
          </div>
        </div>

        {/* Menu bar */}
        <div className="flex h-[24px] shrink-0 items-center pl-[9px] text-[13px] text-[#202124]">
          {HEADER.menus.map((m) => (
            <span
              key={m.id}
              data-tl={`editor-menu-${m.id}`}
              className={`flex h-[24px] items-center rounded-[5px] px-[8px] transition-colors data-[hover=true]:bg-[#EDEFF2] ${openMenu === m.id ? "bg-[#E4E7EC]" : ""}`}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Toolbar */}
        <Toolbar />

        {/* Name box and formula bar */}
        <div className="flex h-[28px] shrink-0 items-center border-b border-[#E3E5EA] text-[13px]">
          <span className="ml-[3px] flex h-[22px] w-[66px] items-center justify-between rounded-[4px] bg-[#F1F3F4] pl-[8px] pr-[6px] text-[12.5px] text-[#202124]">
            A1
            <Icon name="chevronDown" size={9} className="text-[#5F6368]" />
          </span>
          <span className="ml-[10px] mr-[10px] text-[12px] italic text-[#80868B]" style={{ fontFamily: "Georgia, serif" }}>fx</span>
          <span className="truncate text-[13px] text-[#202124]">{a1}</span>
        </div>

        {/* Grid + side panel */}
        <div className="flex min-h-0 flex-1">
          <div className="relative min-w-0 flex-1 overflow-hidden" data-tl="sheet-grid">
            <GridView rows={current?.rows ?? []} />
            <div aria-hidden className="pointer-events-none absolute bottom-[4px] right-0 top-0 w-[15px] bg-white">
              <Icon name="chevronDown" size={9} className="absolute left-[3px] top-[4px] rotate-180 text-[#80868B]" />
              <i className="absolute left-[4px] top-[16px] h-[16px] w-[7px] rounded-full bg-[#8A8F98]" />
              <Icon name="chevronDown" size={9} className="absolute bottom-[0px] left-[3px] text-[#80868B]" />
            </div>
          </div>
          <div
            data-tl="sheet-side"
            aria-hidden={!panelOpen}
            className="relative shrink-0 overflow-hidden border-l border-[#E3E5EA] bg-white transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: panelOpen ? 272 : 0, borderLeftWidth: panelOpen ? 1 : 0 }}
          >
            <div className="w-[272px]">{sidePanel}</div>
          </div>
        </div>

        {/* Horizontal scrollbar and sheet tabs */}
        <div aria-hidden className="relative h-[14px] shrink-0">
          <Icon name="chevronLeft" size={10} className="absolute left-[2px] top-[2px] text-[#80868B]" />
          <i className="absolute left-[14px] top-[3px] h-[8px] w-[calc(62%)] rounded-full bg-[#9AA0A6]" />
          <Icon name="chevronRight" size={10} className="absolute right-[3px] top-[2px] text-[#80868B]" />
        </div>
        <div className="relative flex h-[30px] shrink-0 items-center border-t border-[#E3E5EA] bg-[#F8F9FA] text-[13px]">
          <Icon name="plus" size={14} className="ml-[5px] text-[#4b5060]" data-tl="sheet-add-tab" />
          <Icon name="menu" size={14} className="ml-[12px] text-[#4b5060]" />
          <Icon name="chevronLeft" size={10} className="ml-[12px] text-[#9AA0A6]" />
          <div className="ml-[14px] flex h-full items-center">
            {sheets.map((s) => (
              <span
                key={s.id}
                data-tl={`sheet-tab-${s.id}`}
                className={`flex h-[30px] items-center gap-[6px] px-[12px] transition-colors ${s.id === current?.id ? "bg-white font-medium text-[#1C3F94] shadow-[inset_0_-2px_0_#2563EB]" : "text-[#4b5060]"}`}
              >
                {s.name}
                <Icon name="chevronDown" size={8} className="text-[#80868B]" />
              </span>
            ))}
          </div>
        </div>

        {overlay}
      </div>
    </div>
  );
}

type Tool = { x: number; icon?: IconName; text?: string; caret?: boolean; box?: { w: number; label: string }; dim?: boolean; bold?: boolean; sep?: boolean };

const TOOLS: Tool[] = [
  { x: 12, icon: "shSearch" },
  { x: 46, icon: "edUndo", dim: true },
  { x: 72, icon: "edRedo", dim: true },
  { x: 97, icon: "edPrint" },
  { x: 123, icon: "edPaintFormat" },
  { x: 148, box: { w: 44, label: TOOLBAR.zoom } },
  { x: 215, text: "$", caret: true },
  { x: 248, text: "%" },
  { x: 272, text: ".0" },
  { x: 296, text: ".00" },
  { x: 313, box: { w: 42, label: TOOLBAR.format123 } },
  { x: 366, box: { w: 68, label: TOOLBAR.font } },
  { x: 455, text: "−" },
  { x: 466, box: { w: 26, label: TOOLBAR.size } },
  { x: 500, text: "+" },
  { x: 534, icon: "edBold" },
  { x: 560, icon: "edItalic" },
  { x: 586, icon: "edStrike" },
  { x: 611, icon: "edUnderline" },
  { x: 637, icon: "edTextColor" },
  { x: 663, icon: "edHighlight" },
  { x: 699, icon: "edTable", caret: true },
  { x: 733, icon: "shMerge", caret: true },
  { x: 773, icon: "edAlignL", caret: true },
  { x: 806, icon: "shAlignV", caret: true },
  { x: 840, icon: "shWrap", caret: true },
  { x: 872, icon: "shRotate", caret: true },
  { x: 911, icon: "edLink" },
  { x: 937, icon: "edComment" },
  { x: 963, icon: "shChart" },
  { x: 998, icon: "shFilter" },
  { x: 1032, icon: "shSigma", caret: true },
];

function Toolbar() {
  return (
    <div data-tl="sheet-toolbar" className="relative h-[36px] shrink-0 overflow-hidden border-t border-[#EEF0F3] bg-[#F9FBFD] text-[#444746]">
      {TOOLS.map((t, i) => (
        <span key={i} className={`absolute top-[6px] flex h-[24px] items-center justify-center ${t.dim ? "opacity-35" : ""}`} style={{ left: t.box ? t.x : t.x - 11 }}>
          {t.box ? (
            <span className="flex h-[24px] items-center justify-between rounded-[5px] bg-[#EDF1F8] px-[7px] text-[12px]" style={{ width: t.box.w }}>
              {t.box.label}
              <Icon name="chevronDown" size={8} />
            </span>
          ) : (
            <>
              {t.icon && <Icon name={t.icon} size={17} />}
              {t.text && <span className="text-[13px]">{t.text}</span>}
              {t.caret && <Icon name="chevronDown" size={8} className="ml-[1px]" />}
            </>
          )}
        </span>
      ))}
      <Icon name="dots" size={18} className="absolute right-[8px] top-[9px] rotate-90 text-[#444746]" />
    </div>
  );
}

function GridView({ rows }: { rows: SheetModel["rows"] }) {
  const cols = Array.from({ length: COLUMN_COUNT }, (_, i) => i);
  const lines = Array.from({ length: ROW_COUNT }, (_, i) => i);
  return (
    <div className="absolute inset-0 select-none text-[13px]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* column headers */}
      <div className="absolute left-0 right-0 top-0 flex h-[21.5px] border-b border-[#DADCE0] bg-[#F8F9FA] text-[12px] text-[#5F6368]">
        <span className="shrink-0 border-r border-[#DADCE0]" style={{ width: HEAD_W }} />
        {cols.map((c) => (
          <span key={c} className={`flex shrink-0 items-center justify-center border-r border-[#DADCE0] ${c === 0 ? "bg-[#E1E8F6] font-medium text-[#1f2430]" : ""}`} style={{ width: COL_W }}>
            {letter(c)}
          </span>
        ))}
      </div>
      {/* rows */}
      <div className="absolute inset-x-0 bottom-0 top-[21.5px] overflow-hidden">
        {lines.map((r) => (
          <div key={r} className="flex border-b border-[#E2E3E3]" style={{ height: ROW_H }}>
            <span className={`flex shrink-0 items-center justify-center border-r border-[#DADCE0] bg-[#F8F9FA] text-[11.5px] ${r === 0 ? "bg-[#E1E8F6] font-medium text-[#1f2430]" : "text-[#5F6368]"}`} style={{ width: HEAD_W }}>
              {r + 1}
            </span>
            {cols.map((c) => {
              const cell = rows[r]?.[c];
              const text = cellText(cell);
              const bold = typeof cell === "object" && cell.bold;
              const right = typeof cell === "object" && cell.align === "right";
              return (
                <span
                  key={c}
                  {...(r === 0 && c === 0 ? { "data-tl": "cell-a1" } : {})}
                  className={`relative block shrink-0 overflow-hidden whitespace-nowrap border-r border-[#E2E3E3] px-[4px] text-[#202124] ${bold ? "font-semibold" : ""} ${right ? "text-right" : ""}`}
                  style={{ width: COL_W, lineHeight: `${ROW_H - 1}px` }}
                >
                  {text}
                  {r === 0 && c === 0 && (
                    <>
                      <i className="pointer-events-none absolute -inset-px border-2 border-[#2563EB]" />
                      <i className="pointer-events-none absolute -bottom-[4px] -right-[4px] h-[6px] w-[6px] border border-white bg-[#2563EB]" />
                    </>
                  )}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
