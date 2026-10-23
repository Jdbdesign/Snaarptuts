"use client";

import { Modal } from "@/components/admin/Modal";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";

/** Same enlargement as DocEditor on narrow screens. */
const NARROW_ZOOM = 2.4;

const COPY = { title: "Rename document", cancel: "Cancel", ok: "OK" };

type Props = {
  tl: Timeline;
  /** Document title shown until the script types something (`tl.typeText("rename", ...)`). */
  title: string;
};

/**
 * The "Rename document" dialog, in the same style as ShareDialog. Pass it in the editor's `overlay`.
 * Scene variables: `rename` (open), `renameSelected` (the text is highlighted), `renameFocus` (blue border,
 * caret) and `field:rename` (the typed text; when unset the current document title is shown).
 * Hooks: rename-input, rename-cancel, rename-ok.
 */
export function RenameDialog({ tl, title }: Props) {
  const open = useTimelineVar(tl, "rename", false);
  const selected = useTimelineVar(tl, "renameSelected", false);
  const focus = useTimelineVar(tl, "renameFocus", false);
  const typed = useTimelineVar<string | null>(tl, "field:rename", null);
  const docTitle = useTimelineVar(tl, "title", title);
  const narrow = useNarrow();
  const value = typed ?? docTitle;

  return (
    <div className="absolute inset-0 z-40 text-[#202124]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
      <Modal open={open} width={380}>
        <div className="px-[20px] pb-[16px] pt-[16px]">
          <h2 className="flex h-[28px] items-center text-[15px] font-normal tracking-tight">{COPY.title}</h2>
          <div
            data-tl="rename-input"
            className={`mt-[10px] flex h-[36px] items-center rounded-[8px] border px-[11px] text-[11.5px] transition-[border-color,box-shadow] duration-150 ${
              focus ? "border-[#1A73E8] shadow-[0_0_0_1px_#1A73E8]" : "border-[#DADCE0]"
            }`}
          >
            <span className={`whitespace-pre ${selected ? "rounded-[2px] bg-[#B4D5FE]" : ""}`}>{value}</span>
            {focus && !selected && (
              <i className="h-[15px] w-px shrink-0 bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />
            )}
          </div>
          <div className="mt-[22px] flex justify-end gap-[8px]">
            <span
              data-tl="rename-cancel"
              className="flex h-[29px] items-center rounded-full border border-[#DADCE0] px-[17px] text-[10.5px] font-medium text-[#1A73E8]"
            >
              {COPY.cancel}
            </span>
            <span
              data-tl="rename-ok"
              className="flex h-[29px] items-center rounded-full bg-[#1A73E8] px-[22px] text-[10.5px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
            >
              {COPY.ok}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
