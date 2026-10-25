"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { PANEL_WIDTH } from "./comments-data";
import { WATERMARK } from "./insert-data";
import { DEFAULT_WATERMARK, type WatermarkState } from "./insert-state";

/** Same enlargement as DocEditor on narrow screens, so the panel keeps its place under the header. */
const NARROW_ZOOM = 2.4;

export type WatermarkTab = "image" | "text";

const LABEL = "text-[8.5px] font-medium uppercase tracking-[0.07em] text-[#6b7280]";
const BOX = "flex h-[24px] items-center justify-center rounded-[6px] border border-[#E3E5EA] bg-white text-[10px]";

/**
 * The right-hand Watermark panel under the editor header (Insert > Page elements > Watermark). Pass it in the editor's
 * `overlay` and give the editor `rightInset={PANEL_WIDTH.watermark}` while it is open (on narrow screens it overlays the
 * page instead). Scene variables: `watermarkOpen`, `watermark` (text, transparency, layout), `wmFocus` (the input has
 * the focus ring and caret) and `wmTab` ("image" | "text", default text). Hooks for scripts: watermark-panel,
 * wm-close, wm-tab-image, wm-tab-text, wm-input, wm-slider, wm-radio-diagonal, wm-radio-horizontal, wm-remove.
 * Copy lives in insert-data.ts (WATERMARK.panel). The Image tab only looks right (no real upload). Sliders, radios and
 * the remove button are drawn from `watermark`; the script decides what changes.
 */
export function WatermarkPanel({ tl }: { tl: Timeline }) {
  const open = useTimelineVar(tl, "watermarkOpen", false);
  const wm = useTimelineVar<WatermarkState>(tl, "watermark", DEFAULT_WATERMARK);
  const focus = useTimelineVar(tl, "wmFocus", false);
  const tab = useTimelineVar<WatermarkTab>(tl, "wmTab", "text");
  const narrow = useNarrow();
  const p = WATERMARK.panel;

  return (
    <div
      aria-hidden={!open}
      data-tl="watermark-panel"
      className={`absolute bottom-[19px] right-0 top-[55px] z-30 border-l border-[#E3E5EA] bg-white text-[#1f2430] transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      }`}
      style={{ width: PANEL_WIDTH.watermark, zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div data-tl="watermark-panel-card" className="flex h-full flex-col">
        <div className="flex h-[38px] shrink-0 items-center justify-between px-[14px]">
          <span className="flex items-center gap-[6px] text-[11px] font-semibold">
            <Icon name="shield" size={13} className="text-[#3d4350]" />
            {p.title}
          </span>
          <span data-tl="wm-close" className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[#4b5060]">
            <Icon name="x" size={11} />
          </span>
        </div>

        <div className="flex h-[32px] shrink-0 border-y border-[#EEEFF3] text-[10px]">
          {(["image", "text"] as const).map((t) => (
            <span
              key={t}
              data-tl={`wm-tab-${t}`}
              className={`flex flex-1 items-center justify-center ${
                tab === t ? "border-b-2 border-[#2B6FEB] font-medium text-[#2B6FEB]" : "text-[#6b7280]"
              }`}
            >
              {p.tabs[t]}
            </span>
          ))}
        </div>

        {tab === "text" ? (
          <div className="min-h-0 flex-1 overflow-hidden px-[14px] pt-[13px]">
            <div
              data-tl="wm-input"
              className={`flex h-[30px] items-center rounded-[6px] border px-[10px] text-[11px] transition-[border-color,box-shadow] duration-150 ${
                focus ? "border-[#2B6FEB] shadow-[0_0_0_2px_rgba(43,111,235,0.15)]" : "border-[#BFD0EE]"
              }`}
            >
              {wm.text ? <span className="truncate">{wm.text}</span> : null}
              {focus && <span className="doc-caret text-[#111]" />}
              {!wm.text && <span className="text-[#8a93a6]">{p.placeholder}</span>}
            </div>
            <p className="mt-[3px] text-right text-[8.5px] text-[#8b909c]">
              {wm.text.length}/{WATERMARK.maxLength}
            </p>

            <p className={`mt-[14px] ${LABEL}`}>{p.formatting}</p>
            <div className="mt-[6px] flex h-[25px] items-center justify-between rounded-[6px] border border-[#E3E5EA] px-[9px] text-[10.5px]">
              {p.font}
              <Icon name="chevronDown" size={9} />
            </div>
            <div className="mt-[7px] flex gap-[4px]">
              <span className={`${BOX} w-[24px]`}>–</span>
              <span className={`${BOX} flex-1`}>{p.size}</span>
              <span className={`${BOX} w-[24px]`}>+</span>
              <span className={`${BOX} w-[24px] font-bold`}>B</span>
              <span className={`${BOX} w-[24px] italic`}>I</span>
              <span className={`${BOX} w-[24px] font-medium`}>A</span>
            </div>

            <p className={`mt-[16px] ${LABEL}`}>{p.transparency}</p>
            <div className="mt-[9px] flex items-center gap-[8px]">
              <div data-tl="wm-slider" className="relative flex h-[16px] flex-1 items-center">
                <span className="absolute inset-x-0 h-[3px] rounded-full bg-[#DDE0E6]" />
                <span className="absolute left-0 h-[3px] rounded-full bg-[#2B6FEB]" style={{ width: `${wm.transparency}%` }} />
                <span
                  className="absolute h-[12px] w-[12px] -translate-x-1/2 rounded-full bg-[#2B6FEB] shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
                  style={{ left: `${wm.transparency}%` }}
                />
              </div>
              <span className="flex h-[22px] w-[34px] items-center rounded-[5px] border border-[#E3E5EA] px-[7px] text-[10px]">
                {wm.transparency}
              </span>
              <span className="text-[9px] text-[#8b909c]">%</span>
            </div>

            <div className="mt-[13px] flex items-center gap-[14px] text-[10px]">
              {(["diagonal", "horizontal"] as const).map((l) => (
                <span
                  key={l}
                  data-tl={`wm-radio-${l}`}
                  className="flex items-center gap-[5px] rounded-[4px] transition-colors data-[hover=true]:bg-[#F1F2F5]"
                >
                  <span
                    className={`flex h-[11px] w-[11px] items-center justify-center rounded-full border ${
                      wm.layout === l ? "border-[#2B6FEB]" : "border-[#B8BDC8]"
                    }`}
                  >
                    {wm.layout === l && <span className="h-[5px] w-[5px] rounded-full bg-[#2B6FEB]" />}
                  </span>
                  {p[l]}
                </span>
              ))}
            </div>

            <p className={`mt-[16px] ${LABEL}`}>{p.placement}</p>
            <div className="mt-[7px] flex h-[61px] w-[47px] flex-col gap-[3px] rounded-[4px] border border-[#E3E5EA] bg-[#FAFAFB] px-[6px] pt-[7px]">
              <span className="h-[2px] w-full rounded-full bg-[#E3E5EA]" />
              <span className="h-[2px] w-2/3 rounded-full bg-[#E3E5EA]" />
              <span className="mt-[8px] flex h-[10px] items-center justify-center text-[#C4C9D3]">
                <Icon name="edPen" size={9} />
              </span>
            </div>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-hidden px-[14px] pt-[13px]">
            <div className="flex h-[96px] flex-col items-center justify-center gap-[6px] rounded-[8px] border border-dashed border-[#C9D3E6] bg-[#F7F9FD] text-[10px] text-[#6b7280]">
              <Icon name="upload" size={16} />
              {p.imageHint}
            </div>
          </div>
        )}

        <div className="shrink-0 border-t border-[#EEEFF3] p-[10px]">
          <span
            data-tl="wm-remove"
            className="flex h-[27px] items-center justify-center gap-[6px] rounded-[6px] border border-[#E3E5EA] text-[10.5px] font-medium transition-colors data-[hover=true]:bg-[#F6F7F9]"
          >
            <Icon name="trash" size={12} />
            {p.remove}
          </span>
        </div>
      </div>
    </div>
  );
}
