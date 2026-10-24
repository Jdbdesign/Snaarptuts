"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { OUTLINE, PANEL_WIDTH } from "./comments-data";

/** Same enlargement as DocEditor on narrow screens, so the panel keeps its place under the header. */
const NARROW_ZOOM = 2.4;

/**
 * The left-hand Document outline panel ("Document tabs") under the editor header. Pass it in the editor's
 * `overlay` and give the editor `leftInset={PANEL_WIDTH.outline}` while it is open (on narrow screens it overlays
 * the page instead). Hooks for scripts: outline-panel, outline-close (the back chevron), outline-add (the plus).
 */
export function OutlinePanel({ open }: { open: boolean }) {
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="outline-panel"
      className={`absolute bottom-[19px] left-0 top-[55px] z-30 border-r border-[#E3E5EA] bg-[#F7F8FA] text-[#1f2430] transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? "translate-x-0" : "pointer-events-none -translate-x-full"
      }`}
      style={{ width: PANEL_WIDTH.outline, zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div className="flex h-[34px] items-center gap-[7px] px-[10px]">
        <span
          data-tl="outline-close"
          className="flex h-[16px] w-[16px] items-center justify-center rounded-full text-[#4b5060] transition-colors data-[hover=true]:bg-[#E6E8EC]"
        >
          <Icon name="chevronLeft" size={10} />
        </span>
        <span className="flex-1 text-[10px] font-medium">{OUTLINE.title}</span>
        <span
          data-tl="outline-add"
          className="flex h-[16px] w-[16px] items-center justify-center rounded-full text-[#4b5060] transition-colors data-[hover=true]:bg-[#E6E8EC]"
        >
          <Icon name="plus" size={10} />
        </span>
      </div>
      <div className="relative mx-[4px] mt-[1px] flex h-[22px] items-center rounded-[5px] bg-[#E3EDFB] pl-[9px] text-[9.5px] font-medium text-[#2B6FEB]">
        <span className="absolute inset-y-[3px] left-0 w-[2px] rounded-full bg-[#2B6FEB]" />
        {OUTLINE.tab}
      </div>
      <div className="mt-[8px] px-[14px] text-[8.5px] leading-[1.45] text-[#8b909c]">{OUTLINE.hint}</div>
    </div>
  );
}
