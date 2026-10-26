"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/admin/Modal";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";

/** Small pieces shared by the Snaarp Slides dialogs. */

/** A dialog on the dimmed editor: the shared Modal, capped so it fits narrow screens. Hooks: the card is `data-tl=<hook>`. */
export function SDialog({ open, width, hook, children }: { open: boolean; width: number; hook: string; children: ReactNode }) {
  const narrow = useNarrow();
  return (
    <Modal open={open} width={narrow ? Math.min(width, 560) : width} hook={hook}>
      {children}
    </Modal>
  );
}

/** Dialog title row with the close button (`<id>-close`). */
export function DialogTitle({ id, children, pad = "px-[24px] pt-[20px]" }: { id: string; children: ReactNode; pad?: string }) {
  return (
    <div className={`flex items-center justify-between ${pad}`}>
      <h2 className="text-[14.5px] font-medium tracking-tight text-[#1f2430]">{children}</h2>
      <span data-tl={`${id}-close`} className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-[#4b5060] transition-colors data-[hover=true]:bg-[#F1F3F4]">
        <Icon name="x" size={12} />
      </span>
    </div>
  );
}

export function PrimaryButton({ hook, children, className = "" }: { hook: string; children: ReactNode; className?: string }) {
  return (
    <span data-tl={hook} className={`flex h-[30px] items-center rounded-[6px] bg-[#1A73E8] px-[18px] text-[10.5px] font-medium text-white transition-[transform,filter] duration-150 data-[hover=true]:brightness-95 data-[pressed=true]:scale-95 ${className}`}>
      {children}
    </span>
  );
}

export function GhostButton({ hook, children, className = "" }: { hook: string; children: ReactNode; className?: string }) {
  return (
    <span data-tl={hook} className={`flex h-[30px] items-center rounded-[6px] border border-[#DADCE0] px-[16px] text-[10.5px] font-medium text-[#1A73E8] transition-[transform,background] duration-150 data-[hover=true]:bg-[#F6FAFE] data-[pressed=true]:scale-95 ${className}`}>
      {children}
    </span>
  );
}

/**
 * A text box the timeline types into: `field:<id>` holds the text and the scene variable `focus` equals `id` while it is active
 * (blue ring and a caret). Hook: `field-<id>`.
 */
export function SField({ tl, id, placeholder, multi = false, className = "" }: { tl: Timeline; id: string; placeholder: string; multi?: boolean; className?: string }) {
  const value = useTimelineVar(tl, `field:${id}`, "");
  const focus = useTimelineVar(tl, "focus", "") === id;
  return (
    <div
      data-tl={`field-${id}`}
      className={`flex rounded-[7px] border px-[10px] text-[10.5px] text-[#1f2430] transition-[border-color,box-shadow] duration-150 ${multi ? "items-start pt-[8px]" : "h-[32px] items-center"} ${
        focus ? "border-[#1A73E8] shadow-[0_0_0_1px_#1A73E8]" : "border-[#DADCE0]"
      } ${className}`}
    >
      <span className={multi ? "leading-[15px]" : "truncate"}>
        {value ? value : <span className="text-[#80868B]">{placeholder}</span>}
        {focus && value && <i className="ml-px inline-block h-[13px] w-px translate-y-[2px] bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
      </span>
      {focus && !value && <i className="-order-1 mr-px h-[14px] w-px shrink-0 bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <p className="mb-[5px] text-[9.5px] font-medium text-[#5F6368]">{children}</p>;
}

export function Tick({ on }: { on: boolean }) {
  return (
    <span className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${on ? "border-[#1A73E8] bg-[#1A73E8] text-white" : "border-[#9AA0A6] bg-white"}`}>
      {on && <Icon name="check" size={10} />}
    </span>
  );
}

export function Spinner({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 animate-spin rounded-full border-2 border-[#C9DAF6] border-t-[#1A73E8] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
