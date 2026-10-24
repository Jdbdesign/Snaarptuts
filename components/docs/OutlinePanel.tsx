"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { OUTLINE, PANEL_WIDTH } from "./comments-data";
import type { OutlineTabs } from "./outline-state";

/** Same enlargement as DocEditor on narrow screens, so the panel keeps its place under the header. */
const NARROW_ZOOM = 2.4;

/**
 * The left-hand Document outline panel ("Document tabs") under the editor header. Pass it in the editor's
 * `overlay` and give the editor `leftInset={PANEL_WIDTH.outline}` while it is open (on narrow screens it overlays
 * the page instead). `tabs` is the tab list (outline-state.ts; outline-timeline.ts adds and selects tabs). Hooks for
 * scripts: outline-panel, outline-panel-card, outline-close (the back chevron), outline-add (the plus), outline-tab-<id>.
 */
export function OutlinePanel({ open, tabs }: { open: boolean; tabs: OutlineTabs }) {
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="outline-panel"
      className={`absolute bottom-[38px] left-0 top-[105px] z-30 border-r border-[#E3E5EA] bg-[#F7F8FA] text-[#1f2430] transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? "translate-x-0" : "pointer-events-none -translate-x-full"
      }`}
      style={{ width: PANEL_WIDTH.outline, zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div data-tl="outline-panel-card" className="h-full">
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
        <div className="mt-[1px] flex flex-col gap-[2px]">
          {tabs.tabs.map((t) => {
            const selected = t.id === tabs.active;
            return (
              <div
                key={t.id}
                data-tl={`outline-tab-${t.id}`}
                data-selected={selected}
                className={`relative mx-[4px] flex h-[22px] items-center rounded-[5px] pl-[9px] text-[9.5px] transition-colors duration-200 motion-reduce:transition-none ${
                  selected ? "bg-[#E3EDFB] font-medium text-[#2B6FEB]" : "text-[#3d4350] data-[hover=true]:bg-[#EEF0F4]"
                }`}
              >
                <span
                  className={`absolute inset-y-[3px] left-0 w-[2px] rounded-full bg-[#2B6FEB] transition-opacity duration-200 motion-reduce:transition-none ${
                    selected ? "opacity-100" : "opacity-0"
                  }`}
                />
                {t.name}
              </div>
            );
          })}
        </div>
        <div className="mt-[8px] px-[14px] text-[8.5px] leading-[1.45] text-[#8b909c]">{OUTLINE.hint}</div>
      </div>
    </div>
  );
}
