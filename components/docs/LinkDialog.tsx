"use client";

import { Icon } from "@/components/icons";
import { Modal } from "@/components/admin/Modal";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { LINK } from "./insert-data";

/** Same enlargement as DocEditor on narrow screens. */
const NARROW_ZOOM = 2.4;

/**
 * The "Insert Link" dialog (Insert > Link, Ctrl+K). Pass it in the editor's `overlay`. Scene variables: `linkDialog`
 * (open), `linkFocus` (dark border and caret on the URL input), `field:link-url` (the typed address, write it with
 * tl.typeText("link-url", ...)) and `linkNewTab` (the checkbox, ticked by default). Hooks for scripts: link-input,
 * link-newtab, link-cancel, link-insert. Copy lives in insert-data.ts (LINK.dialog). The Insert button looks the same
 * empty or filled (the recording shows no disabled state).
 */
export function LinkDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar(tl, "linkDialog", false);
  const focus = useTimelineVar(tl, "linkFocus", false);
  const url = useTimelineVar(tl, "field:link-url", "");
  const newTab = useTimelineVar(tl, "linkNewTab", true);
  const narrow = useNarrow();
  const d = LINK.dialog;

  return (
    <div className="absolute inset-0 z-40 text-[#111]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
      <Modal open={open} width={340}>
        <div className="relative px-[20px] pb-[18px] pt-[18px]">
          <span className="absolute right-[16px] top-[16px] flex h-[16px] w-[16px] items-center justify-center text-[#6b7280]">
            <Icon name="x" size={12} />
          </span>
          <h2 className="text-[14px] font-semibold tracking-tight">{d.title}</h2>
          <p className="mt-[5px] pr-[8px] text-[10.5px] leading-[15px] text-[#8b909c]">{d.description}</p>

          <p className="mt-[18px] text-[11px] font-semibold">{d.urlLabel}</p>
          <div
            data-tl="link-input"
            className={`mt-[7px] flex h-[34px] items-center rounded-[8px] border px-[11px] text-[11.5px] transition-[border-color,box-shadow] duration-150 ${
              focus ? "border-[#111] shadow-[0_0_0_1px_#111]" : "border-[#D9DCE3]"
            }`}
          >
            {url ? <span>{url}</span> : null}
            {focus && <span className="doc-caret text-[#111]" />}
            {!url && <span className="text-[#9aa0ab]">{d.placeholder}</span>}
          </div>

          <span data-tl="link-newtab" className="mt-[13px] inline-flex items-center gap-[7px] text-[11px]">
            <span
              className={`flex h-[14px] w-[14px] items-center justify-center rounded-[3.5px] border transition-colors ${
                newTab ? "border-[#1A6BEF] bg-[#1A6BEF] text-white" : "border-[#C9CDD6] bg-white text-transparent"
              }`}
            >
              <Icon name="check" size={10} />
            </span>
            {d.newTab}
          </span>

          <div className="mt-[22px] flex justify-end gap-[8px]">
            <span
              data-tl="link-cancel"
              className="flex h-[30px] items-center rounded-[8px] border border-[#E4E6EB] px-[16px] text-[11px] font-medium"
            >
              {d.cancel}
            </span>
            <span
              data-tl="link-insert"
              className="flex h-[30px] items-center rounded-[8px] bg-[#16171B] px-[17px] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
            >
              {d.insert}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
