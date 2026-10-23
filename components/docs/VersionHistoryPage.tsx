"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { VERSION_HISTORY as COPY } from "./version-history-data";

/** Same enlargement as DocEditor on narrow screens. */
const NARROW_ZOOM = 2.4;

/**
 * Full-screen Version history page (own chrome, replaces the editor): back arrow and title, a thin row with
 * print and zoom, the grey "Empty document" area and the right panel. Hooks: vh-back, vh-panel.
 */
export function VersionHistoryPage() {
  const narrow = useNarrow();

  return (
    <div className="h-full w-full overflow-hidden bg-white text-[#202124]">
      <div className="flex h-full w-full flex-col" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
        <header className="flex h-[40px] shrink-0 items-center gap-[12px] border-b border-[#E3E5EA] px-[12px]">
          <span data-tl="vh-back" className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#444746]">
            <Icon name="arrowLeft" size={15} />
          </span>
          <h1 className="text-[13px] font-normal">{COPY.title}</h1>
        </header>
        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-[34px] shrink-0 items-center gap-[10px] px-[14px] text-[10px] text-[#80868B]">
              <Icon name="edPrint" size={13} />
              {COPY.zoom}
            </div>
            <div className="flex flex-1 items-center justify-center bg-[#E9EBF0] text-[11px] text-[#5F6368]">{COPY.empty}</div>
          </div>
          <aside className="flex w-[17%] min-w-[200px] shrink-0 flex-col border-l border-[#E3E5EA] bg-white p-[8px]">
            <div data-tl="vh-panel" className="flex min-h-0 flex-1 flex-col rounded-[8px] p-[10px]">
              <div className="flex h-[22px] items-center justify-between text-[11px] font-medium">
                {COPY.title}
                <Icon name="dots" size={13} className="text-[#5F6368]" />
              </div>
              <span className="mt-[8px] flex h-[27px] w-fit items-center gap-[4px] rounded-full border border-[#DADCE0] px-[12px] text-[10px]">
                {COPY.filter}
                <Icon name="chevronDown" size={9} />
              </span>
              <p className="mt-[22px] text-[9.5px] leading-[14px] text-[#5F6368]">{COPY.none}</p>
              <label className="mt-auto flex items-center gap-[6px] text-[10px]">
                <span className="flex h-[13px] w-[13px] items-center justify-center rounded-[3px] bg-[#1A73E8] text-white">
                  <Icon name="check" size={9} />
                </span>
                {COPY.showChanges}
              </label>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
