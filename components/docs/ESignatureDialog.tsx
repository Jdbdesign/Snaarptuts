"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { InsertDialog } from "./InsertDialog";
import { ESIGN } from "./insert-data";
import { SIGNATURE } from "./stroke-data";

/**
 * The "eSignature" dialog (Insert > eSignature). Pass it in the editor's `overlay`; it is open while the scene variable
 * `insertDialog` is "esignature". Tabs: Draw (selected, blue underline), Type, Upload and Request (only Draw is real; the
 * others get a hover fill). The canvas shows the sample stroke up to the scene variable `esigProgress` (0 to 1), which
 * the script moves while the cursor follows the stroke (tl.followPath on [data-tl=esig-stroke]). Hooks: esig-tab-<id>,
 * esig-canvas, esig-stroke, esig-clear, esig-insert, esig-close. Copy in insert-data.ts (ESIGN), stroke in stroke-data.ts.
 */
export function ESignatureDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "insertDialog", "") === "esignature";
  const progress = useTimelineVar(tl, "esigProgress", 0);

  return (
    <InsertDialog open={open} width={380} title={ESIGN.title} closeHook="esig-close">
      <div className="mt-[14px] flex h-[30px] items-end gap-[4px] border-b border-[#EEEFF3] text-[11px]">
        {ESIGN.tabs.map((t) => (
          <span
            key={t.id}
            data-tl={`esig-tab-${t.id}`}
            className={`-mb-px flex h-[30px] items-center gap-[5px] rounded-t-[6px] border-b-2 px-[10px] transition-colors ${
              t.id === "draw"
                ? "border-[#2B6FEB] font-medium text-[#2B6FEB]"
                : "border-transparent text-[#6b7280] data-[hover=true]:bg-[#F3F4F7]"
            }`}
          >
            <Icon name={t.icon} size={12} />
            {t.label}
          </span>
        ))}
      </div>

      <p className="mt-[14px] text-[11px] text-[#6b7280]">{ESIGN.hint}</p>
      <div data-tl="esig-canvas" className="relative mt-[9px] h-[150px] overflow-hidden rounded-[8px] border border-[#E4E6EB] bg-white">
        <svg viewBox={SIGNATURE.viewBox} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full px-[22px] py-[14px]" aria-hidden>
          <path
            data-tl="esig-stroke"
            d={SIGNATURE.path}
            pathLength={1}
            fill="none"
            stroke="#111"
            strokeWidth={SIGNATURE.pen}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={1 - progress}
            style={{ opacity: progress > 0 ? 1 : 0 }}
          />
        </svg>
      </div>

      <div className="mt-[14px] flex items-center justify-between">
        <span data-tl="esig-clear" className="flex h-[28px] items-center rounded-[8px] border border-[#E4E6EB] px-[13px] text-[10.5px] font-medium">
          {ESIGN.clear}
        </span>
        <span
          data-tl="esig-insert"
          className="flex h-[30px] items-center rounded-[8px] bg-[#1A6BEF] px-[16px] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
        >
          {ESIGN.insert}
        </span>
      </div>
    </InsertDialog>
  );
}
