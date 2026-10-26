"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { EDITOR, HEADER_ICONS, MENUS, TOOLBAR, type EditorMode, type ToolItem } from "./editor-data";
import { PAGE_ORIENTATION } from "./format-menu-data";

/** Narrow screens: the whole editor is enlarged so it stays readable once the scene is scaled down. */
const NARROW_ZOOM = 2.4;

type Props = {
  /** The document title shown in the header. */
  title: string;
  /** The content of the white page. Empty for a blank document. */
  children?: ReactNode;
  /** Loading state: the header faded to 35%, the rest hidden, a pulsing logo mark in the centre. */
  loading?: boolean;
  /** Rendered above everything (menus, dialogs). */
  overlay?: ReactNode;
  /** Id of the header menu that is open (it gets a light grey fill), e.g. "file". */
  openMenu?: string | null;
  /** Header status: "saved" (default) or the orange "Unsaved changes". */
  status?: "saved" | "unsaved";
  /** Editing (default), Suggesting or Viewing. Viewing hides the whole toolbar and un-selects both header pills. */
  mode?: EditorMode;
  /** The ruler row under the toolbar (View > Show ruler). Default on. */
  showRuler?: boolean;
  /** Width in px of a side panel that squeezes the page: the Document tabs panel (left) and the Comments panel (right). Ignored on narrow screens, where panels overlay the page. */
  leftInset?: number;
  rightInset?: number;
  /** The Comments / Document outline panels are open: their header icon gets a light grey fill, and the round outline button hides. */
  commentsOpen?: boolean;
  outlineOpen?: boolean;
  /**
   * Layers drawn on the white page itself (steps 23 to 26): `text` sits inside the text margins (header, footer),
   * `full` spans the whole page (the page-break band, the watermark). Both ignore the mouse.
   */
  decor?: { text?: ReactNode; full?: ReactNode };
  /** Format > Page orientation > Landscape: a wide page (11 : 8.5) instead of the tall portrait one. */
  landscape?: boolean;
  /** Toolbar > Zoom (step 47): the page is drawn this many times larger (1 = 100%). On narrow screens the growth is capped so the page stays on screen. */
  zoom?: number;
  /**
   * Tooltips and dropdown cards of the toolbar and header buttons (steps 45 to 64). Drawn in a layer that covers the
   * editor, inside the narrow-screen zoom, so ToolbarLayer's cards can sit under any button.
   */
  toolLayer?: ReactNode;
  /** Narrow screens normally hide the header buttons; steps 61 to 63 need Version history, Meet and the apps grid, so they stay (the mode pills and the other icons still go). */
  narrowHeaderTools?: boolean;
  /** Overrides for a document with real text. Left out, the toolbar and footer show the blank-document values. */
  live?: {
    /** Toolbar font size box, e.g. "11" or "20". */
    size: string;
    /** The Undo and Redo buttons are active. */
    canUndo: boolean;
    canRedo: boolean;
    words: number;
    /** Number of pages (default 1): a page break makes it 2. */
    pages?: number;
    /** The style box text ("Normal text", "Heading 1"...). Left out, it says "Normal text". */
    style?: string;
    /** Toolbar button ids that show the active (light grey) look, e.g. "bold", "align-center". */
    active?: string[];
    /** The font box text (default "Arial"). */
    font?: string;
    /** Colour of the bar under the text colour and highlight buttons (the last colours picked). */
    bars?: { color?: string; highlight?: string };
    /** The size box is being typed into: it shows this text with a caret and a focus ring instead of the size. */
    sizeBox?: string | null;
    /** Zoom shown in the toolbar and the footer, in per cent (default 100). */
    zoomPct?: number;
  };
};

/**
 * The Snaarp Doc editor: its own full-width chrome (header, menus, toolbar, ruler, canvas, footer).
 * It does not use DocsLayout. The page is a plain container, so later steps can put real text in it.
 */
export function DocEditor({
  title,
  children,
  loading = false,
  overlay,
  openMenu = null,
  status = "saved",
  live,
  mode = "editing",
  showRuler = true,
  leftInset = 0,
  rightInset = 0,
  commentsOpen = false,
  outlineOpen = false,
  decor,
  landscape = false,
  zoom = 1,
  toolLayer,
  narrowHeaderTools = false,
}: Props) {
  const narrow = useNarrow();
  // Page position in the canvas (also drives the ruler). Side panels centre the page in the space that is left.
  const words = live ? `${live.words} ${EDITOR.wordsLabel}` : EDITOR.footerWords;
  const zoomText = live?.zoomPct && live.zoomPct !== 100 ? `Zoom: ${live.zoomPct}%` : EDITOR.footerZoom;
  const pages = live?.pages && live.pages > 1 ? EDITOR.footerPagesMany(live.pages) : EDITOR.footerPages;
  const inset = narrow ? 0 : leftInset + rightInset;
  const wide = landscape ? (narrow ? PAGE_ORIENTATION.landscapeNarrowWidth : PAGE_ORIENTATION.landscapeWidth) : narrow ? 86 : 42.2;
  // Zoom: the page grows around its centre. A narrow screen has no room for a bigger page, so it grows by at most a seventh.
  const z = narrow ? Math.min(zoom, 1.14) : zoom;
  const zWide = Math.min(wide * z, 98);
  const pageBox = z !== 1
    ? { left: `${(100 - zWide) / 2}%`, width: `${zWide}%` }
    : landscape
    ? { left: `${(100 - wide) / 2}%`, width: `${wide}%` }
    : narrow
      ? { left: "7%", width: "86%" }
      : { left: inset ? `calc(${leftInset}px + (57.8% - ${inset}px) / 2)` : "28.9%", width: "42.2%" };

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#111]">
      <div className="relative flex h-full w-full flex-col" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
        <Header
          title={title}
          loading={loading}
          narrow={narrow}
          openMenu={openMenu}
          status={status}
          mode={mode}
          commentsOpen={commentsOpen}
          outlineOpen={outlineOpen}
          narrowTools={narrowHeaderTools}
        />

        <div className={`flex min-h-0 flex-1 flex-col transition-opacity duration-500 motion-reduce:transition-none ${loading ? "opacity-0" : "opacity-100"}`}>
          <div
            data-tl="editor-toolbar-row"
            className="shrink-0 overflow-hidden transition-[height] duration-300 motion-reduce:transition-none"
            style={{ height: mode === "viewing" ? 0 : 31 }}
          >
            <Toolbar live={live} />
          </div>
          <div
            data-tl="editor-ruler-row"
            className="shrink-0 overflow-hidden transition-[height] duration-300 motion-reduce:transition-none"
            style={{ height: showRuler ? 19 : 0 }}
          >
            <Ruler left={pageBox.left} width={pageBox.width} />
          </div>
          <div className="relative min-h-0 flex-1 bg-[#EDF0F5]">
            <div data-tl="editor-canvas" className="no-scrollbar absolute inset-0 overflow-y-auto">
              <div
                data-tl="editor-page"
                className={`relative mx-auto border-[#D6DAE1] bg-white px-[6%] pt-[52px] transition-[margin-left] duration-300 motion-reduce:transition-none ${
                  landscape ? "mt-[14px] border shadow-[0_2px_10px_-4px_rgba(17,24,39,0.18)]" : "min-h-[1300px] border-x"
                }`}
                style={{
                  width: pageBox.width,
                  marginLeft: pageBox.left,
                  aspectRatio: landscape ? PAGE_ORIENTATION.landscapeRatio : undefined,
                  ...(z !== 1 ? { paddingLeft: `${6 * z}%`, paddingRight: `${6 * z}%`, paddingTop: 52 * z, minHeight: landscape ? undefined : 1300 * z } : {}),
                }}
              >
                {z !== 1 ? <div style={{ zoom: z }}>{children}</div> : children}
                {decor && (
                  <>
                    <div className="pointer-events-none absolute inset-0">{decor.full}</div>
                    {/* The page text margin is 6% of the canvas width: that is 14.2% of the page (6/86 = 7% on narrow screens). */}
                    <div
                      className="pointer-events-none absolute inset-y-0"
                      style={{ left: `${landscape ? 6 / (wide / 100) : narrow ? 6 / 0.86 : 6 / 0.422}%`, right: `${landscape ? 6 / (wide / 100) : narrow ? 6 / 0.86 : 6 / 0.422}%` }}
                    >
                      {decor.text}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="absolute left-[9px] top-[6px] h-[28px] w-[28px]">
              <button
                aria-label="Outline"
                data-tl="outline-button"
                className={`flex h-[28px] w-[28px] items-center gap-[6px] overflow-hidden rounded-full border border-[#E1E4EA] bg-[#F3F4F7] px-[8px] text-[9px] text-[#6b7280] transition-[opacity,width] duration-200 motion-reduce:transition-none data-[hover=true]:w-[64px] ${
                  outlineOpen ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <Icon name="listView" size={12} className="shrink-0" />
                <span className="whitespace-nowrap font-medium text-[#3d4350]">{EDITOR.outlineTab}</span>
              </button>
            </div>
          </div>
          <div className="flex h-[19px] shrink-0 items-center justify-between border-t border-[#E3E5EA] bg-white px-[6px] text-[8.5px] text-[#8b909c]">
            <span className="flex gap-[10px]">
              <span>{pages}</span>
              <span>{words}</span>
            </span>
            <span>{zoomText}</span>
          </div>
        </div>

        <div className={`flex h-[19px] shrink-0 items-center justify-between border-t border-[#EDEEF2] bg-[#F9FAFB] px-[6px] text-[8px] text-[#8b909c] transition-opacity duration-500 motion-reduce:transition-none ${loading ? "opacity-35" : "opacity-100"}`}>
          <span>{words}</span>
          <span>{EDITOR.footerVersion}</span>
        </div>
        {toolLayer && <div data-tl="tool-layer" className="pointer-events-none absolute inset-0 z-30">{toolLayer}</div>}
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 motion-reduce:transition-none ${loading ? "opacity-100" : "opacity-0"}`}
      >
        <Icon name="hexMark" size={48} className="doc-hex" />
      </div>
      {overlay}
    </div>
  );
}

function Header({
  title,
  loading,
  narrow,
  openMenu,
  status,
  mode,
  commentsOpen,
  outlineOpen,
  narrowTools,
}: {
  narrowTools: boolean;
  title: string;
  loading: boolean;
  narrow: boolean;
  openMenu: string | null;
  status: "saved" | "unsaved";
  mode: EditorMode;
  commentsOpen: boolean;
  outlineOpen: boolean;
}) {
  const pill = (on: boolean) => (on ? "bg-[#111] font-medium text-white" : "bg-white text-[#8b909c]");
  const meet = (
    <span data-tl="header-meet" className="flex h-[24px] w-[38px] items-center justify-center gap-[2px] rounded-[7px] border border-[#EEEFF3] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]">
      <Icon name="edCamera" size={13} />
      <Icon name="chevronDown" size={8} />
    </span>
  );
  const apps = (
    <span data-tl="header-apps" className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] text-[#9aa0ab] transition-colors data-[hover=true]:bg-[#F1F2F5]">
      <Icon name="grid4" size={14} />
    </span>
  );
  const historyIcon = (h: (typeof HEADER_ICONS)[number]) => (
    <span
      key={h.id}
      data-tl={`header-${h.id}`}
      className={`flex h-[24px] w-[24px] items-center justify-center rounded-[6px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5] ${
        (h.id === "comments" && commentsOpen) || (h.id === "outline" && outlineOpen) ? "bg-[#ECEDF1]" : ""
      }`}
    >
      <Icon name={h.icon} size={13} />
    </span>
  );
  return (
    <header className={`relative h-[55px] shrink-0 bg-white transition-opacity duration-500 motion-reduce:transition-none ${loading ? "opacity-35" : "opacity-100"}`}>
      <Icon name="hexMark" size={16} className="absolute left-[13px] top-[18px]" />
      <div className="absolute left-[47px] top-[6px] flex h-[20px] items-center gap-[7px]">
        <h1 data-tl="editor-title" className="text-[13px] font-semibold leading-5 tracking-tight">{title}</h1>
        <span className="rounded-[3px] bg-[#2B6FEB] px-[6px] py-[1px] text-[8px] font-semibold leading-[13px] text-white">{EDITOR.badge}</span>
        <span
          data-tl="editor-status"
          className={`flex items-center gap-[3px] text-[8.5px] transition-colors ${status === "unsaved" ? "text-[#E8803A]" : "text-[#8b909c]"}`}
        >
          <Icon name={status === "unsaved" ? "clock" : "check"} size={9} />
          {status === "unsaved" ? EDITOR.unsaved : EDITOR.saved}
        </span>
        {!narrow && (
          <span className="flex items-center gap-[3px] text-[8.5px] text-[#8b909c]">
            <Icon name="edSave" size={10} />
            {EDITOR.save}
          </span>
        )}
      </div>
      <div className="absolute left-[45px] top-[29px]">
        <nav data-tl="editor-menubar" className="flex h-[20px] items-center gap-[15px] rounded-[5px] px-[6px] text-[10px]">
          {MENUS.map((m) => (
            <span
              key={m.id}
              data-tl={`editor-menu-${m.id}`}
              className={`rounded-[4px] transition-colors data-[hover=true]:bg-[#F1F2F5] ${
                openMenu === m.id ? "bg-[#ECEDF1]" : ""
              } ${!m.early && loading ? "opacity-0" : ""}`}
            >
              {m.label}
            </span>
          ))}
        </nav>
      </div>

      <div className="absolute right-[6px] top-[12px] flex h-[29px] items-center gap-[7px]">
        {!narrow && (
          <>
            <div data-tl="editor-mode" className="flex h-[19px] items-stretch overflow-hidden rounded-[5px] border border-[#E3E5EA] text-[8.5px]">
              <span data-tl="mode-editing" className={`flex w-[55px] items-center justify-center gap-[4px] transition-colors duration-200 motion-reduce:transition-none ${pill(mode === "editing")}`}>
                <Icon name="pencil" size={9} />
                {EDITOR.editing}
              </span>
              <span data-tl="mode-suggesting" className={`flex w-[71px] items-center justify-center gap-[4px] transition-colors duration-200 motion-reduce:transition-none ${pill(mode === "suggesting")}`}>
                <Icon name="edSuggest" size={9} />
                {EDITOR.suggesting}
              </span>
            </div>
            <span className="mx-[3px] h-[16px] w-px bg-[#E3E5EA]" />
            {HEADER_ICONS.map(historyIcon)}
            {meet}
            <span className="mx-[3px] h-[16px] w-px bg-[#E3E5EA]" />
            {apps}
          </>
        )}
        {narrow && narrowTools && (
          <>
            {HEADER_ICONS.filter((h) => h.id === "history").map(historyIcon)}
            {meet}
            {apps}
          </>
        )}
        <span
          data-tl="editor-share"
          className="flex h-[24px] transition-[filter] data-[hover=true]:brightness-95 items-center gap-[4px] rounded-full bg-[#2B6FEB] px-[11px] text-[9.5px] font-semibold text-white"
        >
          <Icon name="edShare" size={11} />
          {EDITOR.share}
        </span>
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-brand text-[9.5px] font-semibold text-white">
          {EDITOR.user.initials}
        </span>
      </div>
    </header>
  );
}

function Toolbar({ live }: { live?: Props["live"] }) {
  return (
    <div className="h-[31px] shrink-0 border-y border-[#E9EAEE] bg-white px-[4px] py-[3px]">
      <div data-tl="editor-toolbar" className="no-scrollbar flex h-full items-center overflow-x-auto rounded-[5px] px-[4px]">
        {TOOLBAR.map((group, g) => (
          <div key={g} data-tl={`toolbar-group-${group[0].id}`} className="flex shrink-0 items-center rounded-[5px] [&.tl-hl]:outline-offset-[-2px]! [&.tl-hl]:after:inset-0!">
            {g > 0 && <span className="mx-[4px] h-[16px] w-px shrink-0 bg-[#E3E5EA]" />}
            {group.map((t) => (
              <Tool key={t.id} item={liveItem(t, live)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Toolbar items that follow the document: the size, font and zoom boxes, the colour bars and the Undo / Redo buttons. */
function liveItem(item: ToolItem, live?: Props["live"]): ToolItem {
  if (!live) return item;
  let out = item;
  if (item.id === "style" && live.style) out = { ...out, label: live.style };
  if (live.active?.includes(item.id)) out = { ...out, active: true };
  if (item.id === "size") out = { ...out, label: live.sizeBox ?? live.size, editing: live.sizeBox != null };
  if (item.id === "font" && live.font) out = { ...out, label: live.font };
  if (item.id === "zoom" && live.zoomPct) out = { ...out, label: `${live.zoomPct}%` };
  if (item.id === "color" && live.bars?.color) out = { ...out, bar: live.bars.color };
  if (item.id === "highlight" && live.bars?.highlight) out = { ...out, bar: live.bars.highlight };
  if (item.id === "undo") out = { ...out, disabled: !live.canUndo };
  if (item.id === "redo") out = { ...out, disabled: !live.canRedo };
  return out;
}

function Tool({ item }: { item: ToolItem }) {
  const isSelect = !!item.width;
  return (
    <span
      data-tl={`tool-${item.id}`}
      className={`relative flex h-[22px] shrink-0 items-center rounded-[5px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5] ${
        item.disabled ? "opacity-35" : ""
      } ${item.active ? "bg-[#ECEDF1]" : ""} ${item.editing ? "outline outline-[1.5px] -outline-offset-1 outline-[#2B6FEB]" : ""} ${isSelect ? "justify-between gap-[3px] px-[6px] text-[9px]" : "justify-center gap-[1px] px-[5px]"}`}
      style={isSelect ? { width: item.width } : undefined}
    >
      {item.icon && <Icon name={item.icon} size={13} />}
      {item.label && <span className="flex-1 truncate">{item.label}{item.editing && <i className="ml-px inline-block h-[10px] w-px translate-y-[1px] bg-[#111]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}</span>}
      {item.chevron && <Icon name="chevronDown" size={8} className="text-[#6b7280]" />}
      {item.bar && <span className="absolute bottom-[2px] left-[5px] h-[2px] w-[13px] rounded-full" style={{ background: item.bar }} />}
    </span>
  );
}

function Ruler({ left, width }: { left: string; width: string }) {
  return (
    <div className="relative h-[19px] shrink-0 border-b border-[#E3E5EA] bg-white">
      <div className="absolute inset-y-0" style={{ left, width }}>
        <span className="absolute inset-y-0 left-0 w-[6%] bg-[#E6E8EC]" />
        <span className="absolute inset-y-0 right-0 w-[6%] bg-[#E6E8EC]" />
        <Marker at="6%" />
        <Marker at="94%" />
      </div>
    </div>
  );
}

function Marker({ at }: { at: string }) {
  return (
    <span className="absolute top-0 -translate-x-1/2" style={{ left: at }}>
      <span className="block h-0 w-0 border-x-[3px] border-t-[5px] border-x-transparent border-t-[#2B6FEB]" />
      <span className="mx-auto block h-[11px] w-px bg-[#2B6FEB]" />
    </span>
  );
}
