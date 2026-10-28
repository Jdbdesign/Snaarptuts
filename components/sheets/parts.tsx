"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/admin/Modal";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";

/** Small pieces shared by the Snaarp Sheets dialogs. Sizes follow the recording (about 1450 px wide), so text is 12-14 px. */

export const BLUE = "#2563EB";

/** A dialog on the dimmed editor: the shared Modal, capped so it fits narrow screens. The white card is `data-tl=<hook>`. */
export function ShDialog({ open, width, hook, children }: { open: boolean; width: number; hook: string; children: ReactNode }) {
  const narrow = useNarrow();
  return (
    <Modal open={open} width={narrow ? Math.min(width, 560) : width} hook={hook}>
      {children}
    </Modal>
  );
}

/** Round close button at the top right of a dialog (`<id>-close`). */
export function CloseX({ id }: { id: string }) {
  return (
    <span data-tl={`${id}-close`} className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#4b5060] transition-colors data-[hover=true]:bg-[#F1F3F4]">
      <Icon name="x" size={14} />
    </span>
  );
}

/** Solid blue button. `round` is the pill used by Done. */
export function BlueButton({ hook, children, disabled = false, round = false, className = "" }: { hook: string; children: ReactNode; disabled?: boolean; round?: boolean; className?: string }) {
  return (
    <span
      data-tl={hook}
      className={`flex h-[34px] items-center justify-center px-[18px] text-[13px] font-medium text-white transition-[transform,filter,background] duration-150 ${round ? "rounded-full" : "rounded-[7px]"} ${
        disabled ? "bg-[#A9C0F4]" : "bg-[#2563EB] data-[hover=true]:brightness-90 data-[pressed=true]:scale-95"
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function TextButton({ hook, children }: { hook: string; children: ReactNode }) {
  return (
    <span data-tl={hook} className="flex h-[34px] items-center rounded-[7px] px-[14px] text-[13px] font-medium text-[#3C4043] transition-colors data-[hover=true]:bg-[#F1F3F4] data-[pressed=true]:scale-95">
      {children}
    </span>
  );
}

/**
 * A text box the timeline types into: `field:<id>` holds the text and the scene variable `focus` equals `id` while it is active
 * (blue ring and a caret). `initial` is the text before the script sets the variable (a prefilled box). `selected` shows the text
 * highlighted (a rename). `floatLabel` is a small caption sitting on the top border. Hook: `field-<id>`.
 */
export function ShField({ tl, id, placeholder, initial = "", floatLabel, multi = false, tone = BLUE, selected = false, className = "" }: { tl: Timeline; id: string; placeholder: string; initial?: string; floatLabel?: string; multi?: boolean; tone?: string; selected?: boolean; className?: string }) {
  const value = useTimelineVar(tl, `field:${id}`, initial);
  const focus = useTimelineVar(tl, "focus", "") === id;
  return (
    <div
      data-tl={`field-${id}`}
      className={`relative flex rounded-[8px] border bg-white px-[11px] text-[13px] text-[#1f2430] transition-[border-color,box-shadow] duration-150 ${multi ? "items-start pt-[9px]" : "h-[36px] items-center"} ${focus ? "" : "border-[#DADCE0]"} ${className}`}
      style={focus ? { borderColor: tone, boxShadow: `0 0 0 1px ${tone}` } : undefined}
    >
      {floatLabel && <span className="pointer-events-none absolute left-[10px] top-[-7px] bg-white px-[3px] text-[10.5px] leading-[13px] text-[#80868B]">{floatLabel}</span>}
      <span className={multi ? "block w-full leading-[19px]" : "truncate"}>
        {value ? <span className={selected ? "rounded-[2px] bg-[#B4D5FE]" : ""}>{value}</span> : <span className="text-[#80868B]">{placeholder}</span>}
        {focus && value && !selected && <i className="ml-px inline-block h-[15px] w-px translate-y-[2px] bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
      </span>
      {focus && !value && <i className="-order-1 mr-px h-[16px] w-px shrink-0 bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <p className="mb-[5px] text-[12px] font-medium text-[#5F6368]">{children}</p>;
}

export function Tick({ on, disabled = false }: { on: boolean; disabled?: boolean }) {
  return (
    <span
      className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
        on ? "border-[#2563EB] bg-[#2563EB] text-white" : disabled ? "border-[#D5D8DD] bg-[#F6F7F9]" : "border-[#80868B] bg-white"
      }`}
    >
      {on && <Icon name="check" size={12} />}
    </span>
  );
}

export function Spinner({ size = 18 }: { size?: number }) {
  return <span className="inline-block shrink-0 animate-spin rounded-full border-2 border-[#D5DCEA] border-t-[#2563EB]" style={{ width: size, height: size }} />;
}

/** The pale file glyph used by empty states and file cards. */
export function SheetGlyph({ size = 40, tone = "#C9CFD8" }: { size?: number; tone?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: tone }}>
      <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12h6M9 15.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 12h.01M9 15.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** The small green sheet icon next to file names. */
export function GreenSheet({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#1E8E3E]">
      <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.2 12.2h5.6M9.2 15.6h5.6M12 10v7.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
