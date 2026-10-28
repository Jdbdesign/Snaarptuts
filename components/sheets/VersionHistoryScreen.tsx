"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { EARLIER_COSTS, VERSIONS } from "./sheets-data";
import { Tick } from "./parts";
import { SHEETS_NARROW_ZOOM } from "./SheetsEditor";
import { budgetRows, cellText, changedBudgetCells } from "./sheets-sample";

const COLS = 10;
const colW = (c: number) => (c < 4 ? 104 : 70);
const ROWS = 20;

/**
 * File > Version history > See version history: a full-screen page with the sheet as it was on the left and the "Version history"
 * list on the right. Scene variables: `screen` ("versions" shows it), `versionSel` (v1 | v2), `showChanges` (tick, on by default),
 * `field:version-name` (the name given to the current version). Hooks: versions-screen, versions-back, versions-sheet, version-<id>,
 * versions-show-changes, versions-count.
 */
export function VersionHistoryScreen({ tl, title }: { tl: Timeline; title: string }) {
  const narrow = useNarrow();
  const open = useTimelineVar<string>(tl, "screen", "editor") === "versions";
  const sel = useTimelineVar(tl, "versionSel", "v1");
  const show = useTimelineVar(tl, "showChanges", true);
  const named = useTimelineVar(tl, "field:version-name", "");
  const V = VERSIONS;
  const row = V.rows.find((v) => v.id === sel) ?? V.rows[0];
  const earlier = !!row.earlier;
  const rows = budgetRows(earlier ? EARLIER_COSTS : undefined);
  const changed = earlier ? changedBudgetCells(EARLIER_COSTS) : [];
  const isChanged = (r: number, c: number) => changed.some(([cr, cc]) => cr === r && cc === c);

  return (
    <div aria-hidden={!open} className={`absolute inset-0 z-[35] overflow-hidden bg-white transition-opacity duration-300 motion-reduce:transition-none ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} data-tl="versions-screen">
      <div className="flex h-full w-full" style={{ zoom: narrow ? SHEETS_NARROW_ZOOM : 1 }}>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[46px] shrink-0 items-center gap-[18px] px-[12px]">
            <span data-tl="versions-back" className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] text-[#202124] data-[hover=true]:bg-[#F1F3F4]"><Icon name="arrowLeft" size={18} /></span>
            <span className="text-[16px] text-[#202124]">{row.time}</span>
            <span className="truncate text-[13px] text-[#80868B]">{title}</span>
          </div>
          <p data-tl="versions-count" className="h-[34px] border-b border-[#EEF0F3] px-[8px] pt-[8px] text-[13px] text-[#5F6368]">{V.changes(changed.length)}</p>
          <div data-tl="versions-sheet" className="relative ml-[6px] mt-[14px] w-[780px] max-w-full overflow-hidden border border-[#DADCE0] text-[11.5px]">
            <div className="flex h-[19px] border-b border-[#DADCE0] bg-[#F8F9FA] text-[#5F6368]">
              <span className="w-[34px] shrink-0 border-r border-[#DADCE0]" />
              {Array.from({ length: COLS }, (_, c) => <span key={c} className="flex shrink-0 items-center justify-center border-r border-[#DADCE0]" style={{ width: colW(c) }}>{String.fromCharCode(65 + c)}</span>)}
            </div>
            {Array.from({ length: ROWS }, (_, r) => (
              <div key={r} className="flex h-[18px] border-b border-[#E7E8EA]">
                <span className="flex w-[34px] shrink-0 items-center justify-center border-r border-[#DADCE0] bg-[#F8F9FA] text-[10.5px] text-[#5F6368]">{r + 1}</span>
                {Array.from({ length: COLS }, (_, c) => (
                  <span
                    key={c}
                    style={{ width: colW(c) }}
                    className={`block shrink-0 truncate border-r border-[#E7E8EA] px-[4px] leading-[17px] transition-colors duration-300 ${show && isChanged(r, c) ? "bg-[#FFF1B8]" : ""}`}
                  >
                    {cellText(rows[r]?.[c])}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <aside className="flex w-[272px] shrink-0 flex-col border-l border-[#EEF0F3] bg-white">
          <div className="flex h-[46px] shrink-0 items-center justify-between px-[14px] pt-[8px]">
            <span className="text-[15px] font-medium text-[#202124]">{V.panelTitle}</span>
            <Icon name="dots" size={16} className="rotate-90 text-[#5F6368]" />
          </div>
          <div className="min-h-0 flex-1 px-[8px]">
            <p className="px-[6px] pb-[6px] pt-[10px] text-[12px] text-[#5F6368]">Today</p>
            {V.rows.map((v) => {
              const name = v.current ? named || v.name : v.name;
              return (
                <div
                  key={v.id}
                  data-tl={`version-${v.id}`}
                  className={`mb-[4px] rounded-r-[8px] border-l-[3px] px-[10px] py-[8px] transition-colors data-[hover=true]:bg-[#F1F3F4] ${sel === v.id ? "border-[#2563EB] bg-[#E8F0FE]" : "border-transparent"}`}
                >
                  <p className="text-[13px] leading-[17px] text-[#202124]">{name ?? v.time}</p>
                  <p className="text-[11.5px] leading-[16px] text-[#5F6368]">{name ? `${v.time} · ` : ""}{v.current ? V.currentLabel : ""}</p>
                  <p className="flex items-center gap-[5px] text-[11.5px] leading-[16px] text-[#5F6368]"><i className="h-[7px] w-[7px] rounded-full bg-[#F28B30]" />{v.author}</p>
                </div>
              );
            })}
          </div>
          <span data-tl="versions-show-changes" className="flex h-[40px] shrink-0 items-center gap-[10px] border-t border-[#EEF0F3] px-[14px] text-[13px] text-[#202124]">
            <Tick on={show} />
            {V.showChanges}
          </span>
        </aside>
      </div>
    </div>
  );
}
