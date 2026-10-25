"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { InsertDialog } from "./InsertDialog";
import { PAGE_NUMBERS } from "./insert-data";
import type { PageNumbersState } from "./insert-state";

const OPTION = "flex h-[32px] flex-1 items-center justify-center rounded-[8px] border text-[11px] transition-colors";
const CHOSEN = "border-[#16171B] bg-[#F1F2F5] shadow-[0_0_0_0.5px_#16171B]";
const PLAIN = "border-[#E4E6EB] bg-white data-[hover=true]:bg-[#F6F7F9]";

/**
 * The "Page numbers" dialog (Insert > Page elements > Page numbers). Pass it in the editor's `overlay`. Scene variables:
 * `insertDialog` = "pagenumbers" (open), `pnPosition`, `pnAlign`, `pnStart` (the number in the input) and `pnFocus` (dark border on the
 * input). The page shows the result through `pageNumbers` (PageDecor). Hooks: pn-pos-top, pn-pos-bottom,
 * pn-align-left, pn-align-center, pn-align-right, pn-start, pn-remove, pn-cancel, pn-apply, pn-close.
 * Copy and the defaults live in insert-data.ts (PAGE_NUMBERS).
 */
export function PageNumbersDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "insertDialog", "") === "pagenumbers";
  const position = useTimelineVar<PageNumbersState["position"]>(tl, "pnPosition", PAGE_NUMBERS.defaults.position);
  const align = useTimelineVar<PageNumbersState["align"]>(tl, "pnAlign", PAGE_NUMBERS.defaults.align);
  const start = useTimelineVar(tl, "pnStart", PAGE_NUMBERS.defaults.start);
  const focus = useTimelineVar(tl, "pnFocus", false);
  const d = PAGE_NUMBERS.dialog;

  return (
    <InsertDialog open={open} width={344} title={d.title} closeHook="pn-close">
      <p className="mt-[5px] pr-[10px] text-[10.5px] leading-[15px] text-[#8b909c]">{d.description}</p>

      <p className="mt-[16px] text-[11px] font-semibold">{d.position}</p>
      <div className="mt-[7px] flex gap-[8px]">
        {(["top", "bottom"] as const).map((v) => (
          <span key={v} data-tl={`pn-pos-${v}`} className={`${OPTION} ${position === v ? CHOSEN : PLAIN}`}>
            {d.positions[v]}
          </span>
        ))}
      </div>

      <p className="mt-[14px] text-[11px] font-semibold">{d.alignment}</p>
      <div className="mt-[7px] flex gap-[8px]">
        {(["left", "center", "right"] as const).map((v) => (
          <span key={v} data-tl={`pn-align-${v}`} className={`${OPTION} ${align === v ? CHOSEN : PLAIN}`}>
            {d.alignments[v]}
          </span>
        ))}
      </div>

      <p className="mt-[14px] text-[11px] font-semibold">{d.start}</p>
      <div
        data-tl="pn-start"
        className={`mt-[7px] flex h-[34px] items-center justify-between rounded-[8px] border px-[11px] text-[11.5px] transition-[border-color,box-shadow] duration-150 ${
          focus ? "border-[#16171B] shadow-[0_0_0_1px_#16171B]" : "border-[#E4E6EB]"
        }`}
      >
        <span className="flex items-center">
          {start}
          {focus && <span className="doc-caret text-[#111]" />}
        </span>
        <span className="flex flex-col text-[#6b7280]">
          <Icon name="chevronDown" size={8} className="rotate-180" />
          <Icon name="chevronDown" size={8} />
        </span>
      </div>
      <p className="mt-[6px] pr-[10px] text-[9.5px] leading-[13px] text-[#8b909c]">{d.hint}</p>

      <div className="mt-[18px] flex items-center justify-between">
        <span data-tl="pn-remove" className="px-[2px] text-[11px] font-medium transition-colors data-[hover=true]:text-[#6b7280]">
          {d.remove}
        </span>
        <span className="flex gap-[8px]">
          <span data-tl="pn-cancel" className="flex h-[30px] items-center rounded-[8px] border border-[#E4E6EB] px-[14px] text-[11px] font-medium">
            {d.cancel}
          </span>
          <span
            data-tl="pn-apply"
            className="flex h-[30px] items-center rounded-[8px] bg-[#16171B] px-[18px] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
          >
            {d.apply}
          </span>
        </span>
      </div>
    </InsertDialog>
  );
}
