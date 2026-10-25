"use client";

import { Modal } from "@/components/admin/Modal";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKMARK } from "./insert-data";

/** Same enlargement as DocEditor on narrow screens. */
const NARROW_ZOOM = 2.4;

/**
 * The "Add bookmark" dialog (Insert > Bookmark): our own white dialog, in the same style as the Rename and Insert Link
 * dialogs (the recording shows the browser's dark pop-up, which is not drawn). Pass it in the editor's `overlay`.
 * Scene variables: `bookmarkDialog` (open), `bookmarkFocus` (blue border and caret on the input) and
 * `field:bookmark-name` (the typed name, write it with tl.typeText("bookmark-name", ...)). Hooks for scripts:
 * bookmark-input, bookmark-cancel, bookmark-ok. Copy lives in insert-data.ts (BOOKMARK.dialog).
 */
export function BookmarkDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar(tl, "bookmarkDialog", false);
  const focus = useTimelineVar(tl, "bookmarkFocus", false);
  const name = useTimelineVar(tl, "field:bookmark-name", "");
  const narrow = useNarrow();
  const d = BOOKMARK.dialog;

  return (
    <div className="absolute inset-0 z-40 text-[#111]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
      <Modal open={open} width={360}>
        <div className="px-[20px] pb-[18px] pt-[18px]">
          <h2 className="text-[14px] font-semibold tracking-tight">{d.title}</h2>
          <p className="mt-[16px] text-[11px] font-semibold">{d.label}</p>
          <div
            data-tl="bookmark-input"
            className={`mt-[7px] flex h-[34px] items-center rounded-[8px] border px-[11px] text-[11.5px] transition-[border-color,box-shadow] duration-150 ${
              focus ? "border-[#1A6BEF] shadow-[0_0_0_1px_#1A6BEF]" : "border-[#D9DCE3]"
            }`}
          >
            {name ? <span className="whitespace-pre">{name}</span> : null}
            {focus && <span className="doc-caret text-[#111]" />}
          </div>

          <div className="mt-[22px] flex justify-end gap-[8px]">
            <span
              data-tl="bookmark-cancel"
              className="flex h-[30px] items-center rounded-[8px] border border-[#E4E6EB] px-[16px] text-[11px] font-medium"
            >
              {d.cancel}
            </span>
            <span
              data-tl="bookmark-ok"
              className="flex h-[30px] items-center rounded-[8px] bg-[#16171B] px-[20px] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
            >
              {d.ok}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
