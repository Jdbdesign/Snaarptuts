"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CHART_PANEL_W } from "./ChartEditor";
import { DROPDOWN, EMOJI } from "./insert-data";
import { BlueButton, CloseX, ShDialog, ShField, Tick } from "./parts";

export type DvItem = { id: string; tone: string };
export type DvState = { items: DvItem[]; pick: string };
export type DdPop = { r: number; c: number };
export type DdOption = { label: string; tone: string };

/**
 * Insert > Dropdown: the "Data validation rules" panel in the right-hand column. Scene variables: `dvPanel` (open, handled by SheetsApp),
 * `dv` (the items and their colours, and which item's colour picker is open), `field:dv-<item id>` (each item's text).
 * Hooks: dv-panel, dv-scroll, dv-close, dv-range, dv-item-<id>, field-dv-<id>, dv-dot-<id>, dv-color-<hex>, dv-del-<id>, dv-add, dv-multi,
 * dv-advanced, dv-remove, dv-done.
 */
export function ValidationPanel({ tl }: { tl: Timeline }) {
  const dv = useTimelineVar<DvState>(tl, "dv", DEFAULT_DV);
  const rangeText = useTimelineVar(tl, "dvRange", "") || DROPDOWN.rangeText;
  return (
    <div data-tl="dv-panel" className="flex h-full flex-col bg-white text-[#1f2430]" style={{ width: CHART_PANEL_W }}>
      <div className="flex shrink-0 items-center justify-between px-[16px] pb-[8px] pt-[14px]">
        <h2 data-tl="dv-title" className="text-[14px] font-medium">{DROPDOWN.title}</h2>
        <CloseX id="dv" />
      </div>
      <div data-tl="dv-scroll" className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[16px] pb-[12px]">
        <p className="mb-[4px] mt-[6px] text-[11px] text-[#5F6368]">{DROPDOWN.rangeLabel}</p>
        <div data-tl="dv-range" className="flex h-[32px] items-center justify-between rounded-[6px] border border-[#DADCE0] px-[10px] text-[12.5px]">
          {rangeText}
          <Icon name="shGrid" size={14} className="text-[#5F6368]" />
        </div>
        <p className="mb-[4px] mt-[12px] text-[11px] text-[#5F6368]">{DROPDOWN.criteria}</p>
        <div className="flex h-[32px] items-center justify-between rounded-[6px] border border-[#DADCE0] px-[10px] text-[12.5px]">
          {DROPDOWN.criteriaValue}
          <Icon name="chevronDown" size={9} />
        </div>

        <div className="mt-[12px] flex flex-col gap-[8px]">
          {dv.items.map((it, i) => (
            <div key={it.id} data-tl={`dv-item-${it.id}`} className="relative flex items-center gap-[6px]">
              <span className="text-[#9AA0A6]"><Icon name="shGrip" size={14} /></span>
              <span data-tl={`dv-dot-${it.id}`} className="flex h-[26px] w-[34px] items-center justify-center gap-[3px] rounded-[6px] border border-[#DADCE0] data-[hover=true]:bg-[#F1F3F4]">
                <i className="inline-block h-[12px] w-[12px] rounded-full border border-[#DADCE0]" style={{ background: it.tone }} />
                <Icon name="chevronDown" size={7} />
              </span>
              <div className="min-w-0 flex-1">
                <ShField tl={tl} id={`dv-${it.id}`} placeholder="" initial={DROPDOWN.start[i] ?? ""} className="!h-[30px] !text-[12.5px]" />
              </div>
              <span data-tl={`dv-del-${it.id}`} className="text-[#5F6368] data-[hover=true]:text-[#C5221F]"><Icon name="trash" size={14} /></span>
              {dv.pick === it.id && (
                <div data-tl="dv-colors" className="absolute left-[18px] top-[30px] z-30 w-[176px] rounded-[8px] border border-[#DADCE0] bg-white p-[10px] shadow-[0_8px_24px_-6px_rgba(17,24,39,0.35)]">
                  <p className="mb-[6px] text-[11px] text-[#5F6368]">{DROPDOWN.pick}</p>
                  <div className="grid grid-cols-4 gap-[6px]">
                    {DROPDOWN.swatches.map((c) => (
                      <i key={c} data-tl={`dv-color-${c.replace("#", "")}`} className={`h-[22px] w-[22px] rounded-full border transition-transform data-[hover=true]:scale-110 ${c === it.tone ? "border-[#2563EB] ring-2 ring-[#BFD3F8]" : "border-[#DADCE0]"}`} style={{ background: c }} />
                    ))}
                  </div>
                  <p className="mt-[8px] text-[11px] text-[#5F6368]">{DROPDOWN.custom}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p data-tl="dv-add" className="mt-[12px] flex items-center gap-[6px] text-[12.5px] text-[#2563EB] data-[hover=true]:underline">
          <Icon name="plus" size={13} />
          {DROPDOWN.add}
        </p>
        <span data-tl="dv-multi" className="mt-[14px] flex items-center gap-[8px] text-[12.5px]"><Tick on={false} />{DROPDOWN.multi}</span>
        <p data-tl="dv-advanced" className="mt-[16px] text-[12.5px] text-[#2563EB]">{DROPDOWN.advanced}</p>
      </div>
      <div className="flex shrink-0 items-center justify-between border-t border-[#E3E5EA] px-[16px] py-[12px]">
        <span data-tl="dv-remove" className="text-[12.5px] text-[#2563EB] data-[hover=true]:underline">{DROPDOWN.remove}</span>
        <BlueButton hook="dv-done" round className="!bg-[#6B21D6]">{DROPDOWN.done}</BlueButton>
      </div>
    </div>
  );
}

export const DEFAULT_DV: DvState = { items: [{ id: "i1", tone: "#E6E6E6" }, { id: "i2", tone: "#E6E6E6" }], pick: "" };

/** The list that opens under a dropdown cell: one chip per item. Hooks: dd-pop, dd-item-<label in lower case>. */
export function DropdownList({ options }: { options: DdOption[] }) {
  return (
    <div data-tl="dd-pop" className="w-[150px] rounded-[8px] border border-[#DADCE0] bg-white p-[6px] shadow-[0_8px_24px_-6px_rgba(17,24,39,0.35)]">
      {options.map((o) => (
        <div key={o.label} data-tl={`dd-item-${o.label.toLowerCase()}`} className="rounded-[6px] px-[4px] py-[3px] transition-colors data-[hover=true]:bg-[#F1F3F4]">
          <span className="inline-flex rounded-full px-[9px] py-[2px] text-[11.5px]" style={{ background: o.tone }}>{o.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Insert > Emoji: the Insert emoji picker (search, category tabs, grid). Scene variables: `dialog` = "emoji", `field:emoji-search`, `focus`,
 * `emojiTab`. Hooks: emoji-dialog, field-emoji-search, emoji-tab-<name>, emoji-<id>, emoji-close.
 */
export function EmojiDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "emoji";
  const q = useTimelineVar(tl, "field:emoji-search", "").trim().toLowerCase();
  const tab = useTimelineVar(tl, "emojiTab", EMOJI.tabs[0]);
  const shown = EMOJI.list.filter(([cat, , , name]) => (q ? name.includes(q) : cat === tab));
  return (
    <ShDialog open={open} width={340} hook="emoji-dialog">
      <div className="p-[16px] text-[#1f2430]">
        <div className="mb-[10px] flex items-center justify-between">
          <h2 className="flex items-center gap-[8px] text-[14px] font-medium"><Icon name="shEmoji" size={16} className="text-[#F4B400]" />{EMOJI.title}</h2>
          <CloseX id="emoji" />
        </div>
        <ShField tl={tl} id="emoji-search" placeholder={EMOJI.search} className="!h-[32px] !text-[12.5px]" />
        <div className="mt-[10px] flex flex-wrap gap-[2px] text-[11px]">
          {EMOJI.tabs.map((t) => (
            <span key={t} data-tl={`emoji-tab-${t.toLowerCase()}`} className={`rounded-[5px] px-[7px] py-[3px] ${!q && tab === t ? "bg-[#DDE7FB] font-medium text-[#1C3F94]" : "text-[#5F6368]"}`}>{t}</span>
          ))}
        </div>
        <div className="mt-[10px] grid h-[184px] grid-cols-8 content-start gap-[4px] overflow-y-auto">
          {shown.map(([, id, ch, name]) => (
            <span key={id} title={name} data-tl={`emoji-${id}`} className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] text-[18px] transition-colors data-[hover=true]:bg-[#E8F0FE]">{ch}</span>
          ))}
          {!shown.length && <p className="col-span-8 pt-[10px] text-center text-[12px] text-[#80868B]">{EMOJI.empty}</p>}
        </div>
      </div>
    </ShDialog>
  );
}
