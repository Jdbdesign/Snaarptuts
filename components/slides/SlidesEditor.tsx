"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { SlideView } from "./SlideView";
import type { SlideViewState } from "./SlideElements";
import { SLIDES_NARROW_ZOOM } from "./SlidesLayout";
import { EDITOR, MENUS, RAIL, SHELL, TOOLBAR, TOOLBAR_SELECTS, type SlideData } from "./slides-data";

type Props = {
  /** The presentation's name shown in the header. */
  title: string;
  /** Rename: the title is an editable field showing `titleText` (selected or with a caret). */
  titleEditing?: boolean;
  titleText?: string;
  titleSelected?: boolean;
  starred?: boolean;
  /** Id of the menu that is open (it gets a grey fill), e.g. "file". */
  openMenu?: string | null;
  slides: SlideData[];
  /** Index of the selected slide (blue frame in the panel, shown on the canvas). */
  selected: number;
  /** Page shape: 16 / 9 or 4 / 3. */
  ratio: number;
  /** Replaces the "Select an element..." panel on the right (the Version history panel). */
  sidePanel?: ReactNode;
  /** Menus and dialogs. They sit inside the narrow-screen zoom, so they share the editor's coordinates. */
  overlay?: ReactNode;
  /** Edit, View and Insert dropdowns, hung under their menu label (keyed by menu id). */
  dropdowns?: Record<string, ReactNode>;
  /** The toolbar tool that has the blue "on" look (default: the pointer). */
  activeTool?: string;
  /** What the toolbar's zoom box reads (default "100%"). */
  zoomLabel?: string;
  /** Size of the page on the canvas: 1 fits the canvas, 1.5 is a half larger and the canvas scrolls. */
  zoom?: number;
  /** View > Show ruler: strips along the top and left of the page, with a tick where the cursor is (`rulerMark`, in cqw). */
  rulers?: boolean;
  rulerMark?: { x: number; y: number } | null;
  /** Selection, text editing, find marks and guides on the big page (steps 20-36). */
  view?: SlideViewState;
  /** The speaker-notes panel under the canvas, and the note's first words for the bar at the bottom. */
  notesPanel?: ReactNode;
  notesText?: string;
  /** Width of the right-hand panel when `sidePanel` is shown (default 290). */
  panelWidth?: number;
  /** Where a zoomed-in canvas is scrolled to, as 0-1 of the way along each direction (View > Zoom). */
  scroll?: { x: number; y: number };
};

/**
 * The Snaarp Slides editor: header (title, menu bar, toolbar), the slide panel on the left, the canvas, the properties panel
 * and icon rail on the right, and the speaker-notes bar. Edit, View and Insert hang their dropdowns under their menu label (`dropdowns`);
 * File and the dialogs sit in `overlay`.
 * Hooks for scripts: deck-title, deck-star, editor-menu-<id>, tool-<id>, slide-panel, thumb-<n>, new-slide, editor-canvas,
 * canvas-slide, editor-share, rail-<id>, notes-bar, ruler-top, ruler-left.
 */
export function SlidesEditor({
  title,
  titleEditing = false,
  titleText = "",
  titleSelected = false,
  starred = false,
  openMenu = null,
  slides,
  selected,
  ratio,
  sidePanel,
  overlay,
  dropdowns,
  activeTool,
  zoomLabel,
  zoom = 1,
  rulers = false,
  rulerMark = null,
  view,
  notesPanel,
  notesText = "",
  panelWidth = 290,
  scroll,
}: Props) {
  const narrow = useNarrow();
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !scroll) return;
    el.scrollLeft = scroll.x * (el.scrollWidth - el.clientWidth);
    el.scrollTop = scroll.y * (el.scrollHeight - el.clientHeight);
  }, [scroll]);
  const current = slides[Math.min(selected, slides.length - 1)];

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#111]">
      <div className="relative flex h-full w-full flex-col" style={{ zoom: narrow ? SLIDES_NARROW_ZOOM : 1 }}>
        <header className="relative h-[36px] shrink-0 bg-white">
          <Icon name="arrowLeft" size={14} className="absolute left-[11px] top-[11px] text-[#374151]" />
          <ProductLogo name="presentation" size={20} className="absolute left-[34px] top-[8px] rounded-[5px]" />
          <div className="absolute left-[64px] top-[5px] flex h-[26px] items-center gap-[9px]">
            {titleEditing ? (
              <span
                data-tl="deck-title-field"
                className="flex h-[24px] w-[190px] items-center rounded-[4px] border border-[#2B6FEB] bg-white px-[5px] text-[12.5px] shadow-[0_0_0_1px_#2B6FEB]"
              >
                <span className={`whitespace-pre ${titleSelected ? "rounded-[2px] bg-[#2B6FEB] text-white" : ""}`}>{titleText}</span>
                {!titleSelected && <i className="h-[13px] w-px shrink-0 bg-[#111]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
              </span>
            ) : (
              <h1 data-tl="deck-title" className="rounded-[4px] px-[2px] text-[13px] leading-[26px] text-[#1f2430]">{title}</h1>
            )}
            <Icon name="star" size={14} className={starred ? "text-[#F5B400]" : "text-[#4b5060]"} />
          </div>
          <div className="absolute right-[8px] top-[5px] flex h-[26px] items-center gap-[12px]">
            {!narrow && (
              <>
                <Icon name="edComment" size={14} className="text-[#374151]" />
                <Icon name="edCamera" size={14} className="text-[#374151]" />
                <span data-tl="slideshow-button" className="flex h-[24px] items-center overflow-hidden rounded-[4px] border border-[#E3E5EA] text-[9.5px] font-medium text-[#1f2430]">
                  <span className="px-[9px]">{EDITOR.slideshow}</span>
                  <span className="flex h-full w-[17px] items-center justify-center border-l border-[#E3E5EA]"><Icon name="chevronDown" size={9} /></span>
                </span>
                <span className="flex h-[19px] items-center gap-[3px] rounded-full bg-[#EEF0F4] px-[7px] text-[9px] text-[#4b5060]">
                  <Icon name="users" size={10} />
                  {EDITOR.collaborators}
                </span>
              </>
            )}
            <span data-tl="editor-share" className="flex h-[25px] items-center gap-[4px] rounded-full bg-[#1A73E8] px-[12px] text-[9.5px] font-semibold text-white transition-[filter] data-[hover=true]:brightness-95">
              <Icon name="padlock" size={10} />
              {EDITOR.share}
              <Icon name="chevronDown" size={8} />
            </span>
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-brand text-[9.5px] font-semibold text-white">{SHELL.user.initials}</span>
          </div>
        </header>

        <nav data-tl="editor-menubar" className="flex h-[24px] shrink-0 items-center gap-[4px] bg-white px-[10px] text-[10px] text-[#1f2430]">
          {MENUS.map((m) => (
            <span
              key={m.id}
              data-tl={`editor-menu-${m.id}`}
              className={`relative flex h-[20px] items-center rounded-[4px] px-[7px] transition-colors data-[hover=true]:bg-[#F1F2F5] ${openMenu === m.id ? "bg-[#E9EAEE]" : ""}`}
            >
              {m.label}
              {dropdowns?.[m.id]}
            </span>
          ))}
        </nav>

        <div className="shrink-0 border-y border-[#E9EAEE] bg-white px-[6px] py-[2px]">
          <div data-tl="editor-toolbar" className="no-scrollbar flex h-[26px] items-center overflow-x-auto">
            {TOOLBAR.map((group, g) => (
              <div key={g} className="flex shrink-0 items-center">
                {g > 0 && <span className="mx-[5px] h-[16px] w-px shrink-0 bg-[#E3E5EA]" />}
                {group.map((t) => (
                  <span
                    key={t.id}
                    data-tl={`tool-${t.id}`}
                    className={`flex h-[24px] shrink-0 items-center justify-center rounded-[4px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5] ${
                      t.label ? "gap-[3px] px-[7px] text-[9px]" : "w-[26px]"
                    } ${(activeTool ? t.id === activeTool : t.active) ? "bg-[#DCE9FC] text-[#2B6FEB]" : ""}`}
                  >
                    {t.icon && <Icon name={t.icon} size={13} />}
                    {t.id === "zoom" && zoomLabel ? zoomLabel : t.label}
                    {t.label && <Icon name="chevronDown" size={8} />}
                  </span>
                ))}
              </div>
            ))}
            <span className="mx-[7px] h-[16px] w-px shrink-0 bg-[#E3E5EA]" />
            {TOOLBAR_SELECTS.map((s) => (
              <span key={s} className="flex h-[24px] shrink-0 items-center gap-[3px] px-[9px] text-[9px] text-[#1f2430]">
                {s}
                <Icon name="chevronDown" size={8} />
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <aside data-tl="slide-panel" className={`flex shrink-0 flex-col border-r border-[#E3E6EC] bg-[#F5F6F9] transition-[width] duration-300 ${narrow ? "w-[84px]" : "w-[205px]"}`}>
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[7px] pb-[8px] pt-[8px]">
              {slides.map((s, i) => (
                <div key={s.id} data-tl={`thumb-${i + 1}`} className="mb-[9px] flex items-start gap-[5px]">
                  <span className="w-[10px] shrink-0 pt-[1px] text-right text-[7.5px] text-[#4b6b4b]">{i + 1}</span>
                  <SlideView
                    slide={s}
                    ratio={ratio}
                    className={`min-w-0 flex-1 rounded-[3px] border-2 ${i === selected ? "border-[#2B6FEB]" : "border-[#E3E6EC]"}`}
                  />
                </div>
              ))}
            </div>
            <div data-tl="new-slide" className="flex h-[33px] shrink-0 items-center justify-center gap-[4px] border-t border-[#E3E6EC] bg-[#F5F6F9] text-[8.5px] text-[#4b5060] transition-colors data-[hover=true]:bg-[#ECEEF3]">
              <Icon name="plus" size={9} />
              {EDITOR.newSlide}
            </div>
          </aside>

          <div className="relative flex min-w-0 flex-1">
            {narrow && sidePanel && (
              <aside className="absolute inset-y-0 right-0 z-10 w-[270px] border-l border-[#E3E6EC] bg-white shadow-[-8px_0_24px_-12px_rgba(17,24,39,0.25)]">
                <div className="relative h-full">{sidePanel}</div>
              </aside>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <div ref={canvasRef} data-tl="editor-canvas" className="no-scrollbar relative flex min-h-0 min-w-0 flex-1 overflow-auto bg-[#EEF1F5] [container-type:size]">
                <div className="m-auto shrink-0 p-[18px]">
                  <div data-tl="canvas-slide" className="relative shadow-[0_1px_3px_rgba(17,24,39,0.08)]" style={{ width: `calc(min(73cqw, calc(71cqh * ${ratio})) * ${zoom})` }}>
                    <SlideView slide={current} ratio={ratio} view={view} />
                    {rulers && <Rulers ratio={ratio} mark={rulerMark} />}
                  </div>
                </div>
              </div>
              {notesPanel}
            </div>
            {!narrow && (
              <aside data-tl="right-panel" className="flex shrink-0 border-l border-[#E3E6EC] bg-white transition-[width] duration-300" style={{ width: sidePanel ? panelWidth : 253 }}>
                <div className="relative min-w-0 flex-1">
                  {sidePanel ?? (
                    <p className="absolute inset-x-0 top-[60px] mx-auto w-[150px] text-center text-[9.5px] leading-[13px] text-[#6b7280]">{EDITOR.properties}</p>
                  )}
                </div>
                <div className="flex w-[41px] shrink-0 flex-col items-center gap-[7px] pt-[8px]">
                  {RAIL.map((r) => (
                    <span key={r.id} data-tl={`rail-${r.id}`} className="flex h-[40px] w-[36px] flex-col items-center justify-center gap-[2px] rounded-[6px] text-[#374151] transition-colors data-[hover=true]:bg-[#F1F2F5]">
                      <Icon name={r.icon} size={14} />
                      <span className="text-[6.5px] leading-none text-[#6b7280]">{r.label}</span>
                    </span>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>

        <footer className="flex h-[24px] shrink-0 items-center border-t border-[#E3E6EC] bg-white text-[8.5px] text-[#6b7280]">
          <span className={`flex shrink-0 items-center gap-[7px] px-[7px] ${narrow ? "w-[84px]" : "w-[205px]"}`}>
            <Icon name="grid4" size={10} />
            <Icon name="chevronLeft" size={10} />
          </span>
          <span data-tl="notes-bar" className={`truncate pl-[11px] ${notesPanel ? "opacity-0" : notesText ? "text-[#1f2430]" : ""}`}>{notesText || EDITOR.notes}</span>
        </footer>

        {overlay}
      </div>
    </div>
  );
}

const RULER = 960; // the page is 960 units wide on the ruler

/** The strips along the top and left of the page (View > Show ruler). `mark` is the cursor's spot on the page in cqw. */
function Rulers({ ratio, mark }: { ratio: number; mark: { x: number; y: number } | null }) {
  const across = Array.from({ length: Math.floor(RULER / 50) + 1 }, (_, i) => i * 50);
  const down = Array.from({ length: Math.floor(RULER / ratio / 50) + 1 }, (_, i) => i * 50);
  const strip = "absolute bg-[#F7F8FA] text-[7px] leading-none text-[#6b7280]";
  return (
    <>
      <div data-tl="ruler-top" className={`${strip} bottom-full left-0 right-0 mb-[1px] h-[16px] border-b border-[#DADDE3]`}>
        {across.map((u) => (
          <span key={u} className="absolute bottom-0 flex flex-col items-start" style={{ left: `${(u / RULER) * 100}%` }}>
            {u % 100 === 0 && <span className="translate-x-[2px] pb-[1px]">{u}</span>}
            <i className={`block w-px bg-[#8E94A3] ${u % 100 === 0 ? "h-[6px]" : "h-[3.5px]"}`} />
          </span>
        ))}
        {mark && <i className="absolute inset-y-0 block w-[1.5px] bg-[#2B6FEB]" style={{ left: `${Math.min(100, Math.max(0, mark.x))}%` }} />}
      </div>
      <div data-tl="ruler-left" className={`${strip} bottom-0 right-full top-0 mr-[1px] w-[16px] border-r border-[#DADDE3]`}>
        {down.map((u) => (
          <span key={u} className="absolute right-0 flex items-center" style={{ top: `${(u / (RULER / ratio)) * 100}%` }}>
            {u % 100 === 0 && u > 0 && <span className="pr-[1px]">{u}</span>}
            <i className={`block h-px bg-[#8E94A3] ${u % 100 === 0 ? "w-[6px]" : "w-[3.5px]"}`} />
          </span>
        ))}
        {mark && <i className="absolute inset-x-0 block h-[1.5px] bg-[#2B6FEB]" style={{ top: `${Math.min(100, Math.max(0, (mark.y / (100 / ratio)) * 100))}%` }} />}
      </div>
    </>
  );
}
