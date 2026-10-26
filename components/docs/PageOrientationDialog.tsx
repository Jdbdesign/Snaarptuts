"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { InsertDialog } from "./InsertDialog";
import { PAGE_ORIENTATION, type Orientation } from "./format-menu-data";

/**
 * The "Page orientation" dialog (Format > Page orientation). Rendered by InsertDialogs. Scene variables:
 * `insertDialog` = "orientation" (open), `poChoice` (the radio in the dialog) and `pageOrientation` (what the page
 * has been set to; EditorStage reads it). Hooks: po-apply-to, po-portrait, po-landscape, po-cancel, po-ok, po-close.
 * Copy in format-menu-data.ts (PAGE_ORIENTATION).
 */
export function PageOrientationDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "insertDialog", "") === "orientation";
  const choice = useTimelineVar<Orientation>(tl, "poChoice", "portrait");
  const d = PAGE_ORIENTATION;

  return (
    <InsertDialog open={open} width={340} title={d.title} closeHook="po-close">
      <p className="mt-[18px] text-[11px] font-medium">{d.applyTo}</p>
      <div
        data-tl="po-apply-to"
        className="mt-[7px] flex h-[34px] items-center justify-between rounded-[8px] border border-[#16171B] px-[11px] text-[11.5px]"
      >
        <span>{d.applyOptions[0]}</span>
        <Icon name="chevronDown" size={9} className="text-[#111]" />
      </div>

      <p className="mt-[16px] text-[11px] font-medium">{d.orientation}</p>
      <div className="mt-[8px] flex flex-col gap-[9px]">
        {(["portrait", "landscape"] as const).map((v) => (
          <span key={v} data-tl={`po-${v}`} className="flex w-fit items-center gap-[8px] text-[11.5px]">
            <span
              className={`flex h-[14px] w-[14px] items-center justify-center rounded-full border transition-colors ${
                choice === v ? "border-[#16171B]" : "border-[#B4B9C4]"
              }`}
            >
              <span className={`h-[8px] w-[8px] rounded-full bg-[#16171B] transition-opacity duration-150 ${choice === v ? "opacity-100" : "opacity-0"}`} />
            </span>
            {d[v]}
          </span>
        ))}
      </div>

      <div className="mt-[20px] flex justify-end gap-[8px]">
        <span data-tl="po-cancel" className="flex h-[30px] items-center rounded-[8px] border border-[#E4E6EB] px-[14px] text-[11px] font-medium">
          {d.cancel}
        </span>
        <span
          data-tl="po-ok"
          className="flex h-[30px] items-center rounded-[8px] bg-[#16171B] px-[20px] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
        >
          {d.ok}
        </span>
      </div>
    </InsertDialog>
  );
}
