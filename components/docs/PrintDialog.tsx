"use client";

import { Icon } from "@/components/icons";
import { Modal } from "@/components/admin/Modal";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { PRINT } from "./print-data";

/** The copy of a print panel. Snaarp Slides passes its own (slides layout, ranges, a wide preview); Snaarp Doc uses PRINT. */
export type PrintCopy = {
  title: string;
  sheets: string;
  pageIndicator: string;
  settings: { id: string; label: string; value: string; options?: string[] }[];
  more: string;
  print: string;
  cancel: string;
};

/** Same enlargement as DocEditor on narrow screens. */
const NARROW_ZOOM = 2.4;

const NO_VALUES: Record<string, string> = {};

/**
 * The "Print" panel: a blank page preview on the left and the settings on the right (stacked on narrow
 * screens). Pass it in the editor's `overlay`. Scene variable `print` opens it. Hooks: print-settings,
 * print-setting-<id>, print-btn, print-cancel. Copy lives in print-data.ts.
 */
export function PrintDialog({ tl, copy = PRINT, landscape = false, ratio = 16 / 9 }: { tl: Timeline; copy?: PrintCopy; /** A wide page preview (slides). */ landscape?: boolean; ratio?: number }) {
  const open = useTimelineVar(tl, "print", false);
  // Optional (Snaarp Slides): values the script has chosen, and which setting's option list is open.
  const values = useTimelineVar<Record<string, string>>(tl, "printValues", NO_VALUES);
  const openSetting = useTimelineVar(tl, "printOpen", "");
  const narrow = useNarrow();
  const page = landscape
    ? narrow ? { w: 120, h: 120 / ratio } : { w: 250, h: 250 / ratio }
    : narrow ? { w: 93, h: 120 } : { w: 200, h: 260 };

  return (
    <div className="absolute inset-0 z-40 text-[#202124]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
      <Modal open={open} width={narrow ? 520 : 760}>
        <div className={`flex overflow-hidden rounded-[14px] ${narrow ? "flex-col" : "h-[440px]"}`}>
          <div className={`flex flex-col items-center justify-center bg-[#EEF0F4] ${narrow ? "h-[190px]" : "flex-1"}`}>
            <div className="border border-[#DADDE3] bg-white shadow-[0_2px_8px_-2px_rgba(17,24,39,0.15)]" style={{ width: page.w, height: page.h }} />
            <p className="mt-[10px] text-[10px] text-[#5F6368]">{copy.pageIndicator}</p>
          </div>
          <div className={`flex flex-col bg-white px-[24px] pb-[20px] pt-[22px] ${narrow ? "" : "w-[320px] shrink-0"}`}>
            <h2 className="text-[19px] font-normal leading-[24px] tracking-tight">{copy.title}</h2>
            <p className="mt-[2px] text-[11px] text-[#5F6368]">{copy.sheets}</p>
            <div data-tl="print-settings" className="mt-[16px] flex flex-col gap-[2px] rounded-[8px]">
              {copy.settings.map((s) => (
                <div
                  key={s.id}
                  data-tl={`print-setting-${s.id}`}
                  className="relative flex h-[40px] items-center justify-between rounded-[6px] px-[4px] transition-colors data-[hover=true]:bg-[#F6F7F9]"
                >
                  <span className="text-[11px] text-[#5F6368]">{s.label}</span>
                  <span className="flex h-[28px] w-[150px] items-center justify-between rounded-[6px] border border-[#DADCE0] px-[10px] text-[11px]">
                    {values[s.id] ?? s.value}
                    <Icon name="chevronDown" size={10} className="text-[#5F6368]" />
                  </span>
                  {s.options && (
                    <div
                      className={`absolute right-[4px] top-[36px] z-10 w-[150px] rounded-[8px] border border-[#E6E8EC] bg-white py-[4px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.25)] transition-[opacity,transform] duration-150 motion-reduce:transition-none ${
                        openSetting === s.id ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                      }`}
                    >
                      {s.options.map((o) => (
                        <div key={o} data-tl={`print-opt-${s.id}-${o.toLowerCase().replace(/\s+/g, "-")}`} className="mx-[4px] flex h-[26px] items-center rounded-[5px] px-[8px] text-[10.5px] transition-colors data-[hover=true]:bg-[#F1F3F4]">
                          {o}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-[8px] flex h-[34px] items-center justify-between border-t border-[#EEEFF2] px-[4px] text-[11px] text-[#5F6368]">
              {copy.more}
              <Icon name="chevronDown" size={10} />
            </div>
            <div className={`flex justify-end gap-[8px] ${narrow ? "mt-[18px]" : "mt-auto"}`}>
              <span
                data-tl="print-cancel"
                className="flex h-[30px] items-center rounded-full border border-[#DADCE0] px-[18px] text-[11px] font-medium text-[#1A73E8] transition-transform duration-150 data-[pressed=true]:scale-95"
              >
                {copy.cancel}
              </span>
              <span
                data-tl="print-btn"
                className="flex h-[30px] items-center rounded-full bg-[#1A73E8] px-[22px] text-[11px] font-medium text-white"
              >
                {copy.print}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
