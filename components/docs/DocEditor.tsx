"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { EDITOR, HEADER_ICONS, MENUS, TOOLBAR, type EditorMode, type ToolItem } from "./editor-data";

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
  /** Overrides for a document with real text. Left out, the toolbar and footer show the blank-document values. */
  live?: {
    /** Toolbar font size box, e.g. "11" or "20". */
    size: string;
    /** The Undo and Redo buttons are active. */
    canUndo: boolean;
    canRedo: boolean;
    words: number;
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
}: Props) {
  const narrow = useNarrow();
  // Page position in the canvas (also drives the ruler). Side panels centre the page in the space that is left.
  const words = live ? `${live.words} ${EDITOR.wordsLabel}` : EDITOR.footerWords;
  const inset = narrow ? 0 : leftInset + rightInset;
  const pageBox = narrow
    ? { left: "7%", width: "86%" }
    : { left: inset ? `calc(${leftInset}px + (57.8% - ${inset}px) / 2)` : "28.9%", width: "42.2%" };

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#111]">
      <div className="flex h-full w-full flex-col" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
        <Header
          title={title}
          loading={loading}
          narrow={narrow}
          openMenu={openMenu}
          status={status}
          mode={mode}
          commentsOpen={commentsOpen}
          outlineOpen={outlineOpen}
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
                className="relative mx-auto min-h-[1300px] border-x border-[#D6DAE1] bg-white px-[6%] pt-[52px] transition-[margin-left] duration-300 motion-reduce:transition-none"
                style={{ width: pageBox.width, marginLeft: pageBox.left }}
              >
                {children}
              </div>
            </div>
            <button
              aria-label="Outline"
              data-tl="outline-button"
              className={`absolute left-[9px] top-[6px] flex h-[28px] w-[28px] items-center gap-[6px] overflow-hidden rounded-full border border-[#E1E4EA] bg-[#F3F4F7] px-[8px] text-[9px] text-[#6b7280] transition-[opacity,width] duration-200 motion-reduce:transition-none data-[hover=true]:w-[64px] ${
                outlineOpen ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <Icon name="listView" size={12} className="shrink-0" />
              <span className="whitespace-nowrap font-medium text-[#3d4350]">{EDITOR.outlineTab}</span>
            </button>
          </div>
          <div className="flex h-[19px] shrink-0 items-center justify-between border-t border-[#E3E5EA] bg-white px-[6px] text-[8.5px] text-[#8b909c]">
            <span className="flex gap-[10px]">
              <span>{EDITOR.footerPages}</span>
              <span>{words}</span>
            </span>
            <span>{EDITOR.footerZoom}</span>
          </div>
        </div>

        <div className={`flex h-[19px] shrink-0 items-center justify-between border-t border-[#EDEEF2] bg-[#F9FAFB] px-[6px] text-[8px] text-[#8b909c] transition-opacity duration-500 motion-reduce:transition-none ${loading ? "opacity-35" : "opacity-100"}`}>
          <span>{words}</span>
          <span>{EDITOR.footerVersion}</span>
        </div>
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
}: {
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
            {HEADER_ICONS.map((h) => (
              <span
                key={h.id}
                data-tl={`header-${h.id}`}
                className={`flex h-[24px] w-[24px] items-center justify-center rounded-[6px] text-[#1f2430] transition-colors ${
                  (h.id === "comments" && commentsOpen) || (h.id === "outline" && outlineOpen) ? "bg-[#ECEDF1]" : ""
                }`}
              >
                <Icon name={h.icon} size={13} />
              </span>
            ))}
            <span className="flex h-[24px] w-[38px] items-center justify-center gap-[2px] rounded-[7px] border border-[#EEEFF3] text-[#1f2430]">
              <Icon name="edCamera" size={13} />
              <Icon name="chevronDown" size={8} />
            </span>
            <span className="mx-[3px] h-[16px] w-px bg-[#E3E5EA]" />
            <span className="flex h-[24px] w-[24px] items-center justify-center text-[#9aa0ab]">
              <Icon name="grid4" size={14} />
            </span>
          </>
        )}
        <span
          data-tl="editor-share"
          className="flex h-[24px] items-center gap-[4px] rounded-full bg-[#2B6FEB] px-[11px] text-[9.5px] font-semibold text-white"
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
          <div key={g} className="flex shrink-0 items-center">
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

/** Toolbar items that follow the document: the size box and the Undo / Redo buttons. */
function liveItem(item: ToolItem, live?: Props["live"]): ToolItem {
  if (!live) return item;
  if (item.id === "size") return { ...item, label: live.size };
  if (item.id === "undo") return { ...item, disabled: !live.canUndo };
  if (item.id === "redo") return { ...item, disabled: !live.canRedo };
  return item;
}

function Tool({ item }: { item: ToolItem }) {
  const isSelect = !!item.width;
  return (
    <span
      data-tl={`tool-${item.id}`}
      className={`relative flex h-[22px] shrink-0 items-center rounded-[5px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5] ${
        item.disabled ? "opacity-35" : ""
      } ${isSelect ? "justify-between gap-[3px] px-[6px] text-[9px]" : "justify-center gap-[1px] px-[5px]"}`}
      style={isSelect ? { width: item.width } : undefined}
    >
      {item.icon && <Icon name={item.icon} size={13} />}
      {item.label && <span className="flex-1 truncate">{item.label}</span>}
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
