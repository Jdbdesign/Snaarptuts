"use client";

import type { ReactNode } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { SlideView } from "./SlideView";
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
};

/**
 * The Snaarp Slides editor: header (title, menu bar, toolbar), the slide panel on the left, the canvas, the properties panel
 * and icon rail on the right, and the speaker-notes bar. Later menus (Edit, View, Insert...) hang their dropdowns in `overlay`.
 * Hooks for scripts: deck-title, deck-star, editor-menu-<id>, tool-<id>, slide-panel, thumb-<n>, new-slide, editor-canvas,
 * canvas-slide, editor-share, rail-<id>, notes-bar.
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
}: Props) {
  const narrow = useNarrow();
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
              className={`flex h-[20px] items-center rounded-[4px] px-[7px] transition-colors data-[hover=true]:bg-[#F1F2F5] ${openMenu === m.id ? "bg-[#E9EAEE]" : ""}`}
            >
              {m.label}
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
                    } ${t.active ? "bg-[#DCE9FC] text-[#2B6FEB]" : ""}`}
                  >
                    {t.icon && <Icon name={t.icon} size={13} />}
                    {t.label}
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

          <div className="flex min-w-0 flex-1">
            <div data-tl="editor-canvas" className="flex min-w-0 flex-1 items-center justify-center bg-[#EEF1F5] [container-type:size]">
              <div data-tl="canvas-slide" className="shadow-[0_1px_3px_rgba(17,24,39,0.08)]" style={{ width: `min(73cqw, calc(71cqh * ${ratio}))` }}>
                <SlideView slide={current} ratio={ratio} />
              </div>
            </div>
            {!narrow && (
              <aside data-tl="right-panel" className="flex shrink-0 border-l border-[#E3E6EC] bg-white transition-[width] duration-300" style={{ width: sidePanel ? 290 : 253 }}>
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
          <span data-tl="notes-bar" className="pl-[11px]">{EDITOR.notes}</span>
        </footer>

        {overlay}
      </div>
    </div>
  );
}
