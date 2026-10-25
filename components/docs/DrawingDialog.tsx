"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { InsertDialog } from "./InsertDialog";
import { DRAWING } from "./insert-data";
import { DOODLE } from "./stroke-data";

/**
 * The "Drawing" dialog (Insert > Drawing). Pass it in the editor's `overlay`; it is open while the scene variable
 * `insertDialog` is "drawing". Pen is selected, black is ringed and the second size is selected, as in the frames (they
 * only change by hover here). The canvas shows the sample doodle up to the scene variable `drawProgress` (0 to 1),
 * which the script moves while the cursor follows the stroke (tl.followPath on [data-tl=draw-stroke]). Hooks:
 * draw-tool-pen, draw-tool-eraser, draw-color-<n>, draw-size-<n>, draw-canvas, draw-stroke, draw-clear, draw-cancel,
 * draw-insert, draw-close. Copy, colours and sizes in insert-data.ts (DRAWING), stroke in stroke-data.ts.
 */
export function DrawingDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "insertDialog", "") === "drawing";
  const progress = useTimelineVar(tl, "drawProgress", 0);

  return (
    <InsertDialog open={open} width={420} title={DRAWING.title} closeHook="draw-close">
      <div className="mt-[14px] flex items-center gap-[10px] border-b border-[#EEEFF3] pb-[10px]">
        <span className="flex gap-[4px] text-[10.5px]">
          {DRAWING.tools.map((t, i) => (
            <span
              key={t}
              data-tl={`draw-tool-${t.toLowerCase()}`}
              className={`flex h-[24px] items-center rounded-[6px] px-[9px] transition-colors ${
                i === 0 ? "bg-[#F1F2F5] font-medium" : "text-[#4b5060] data-[hover=true]:bg-[#F6F7F9]"
              }`}
            >
              {t}
            </span>
          ))}
        </span>
        <span className="h-[16px] w-px bg-[#E4E6EB]" />
        <span className="flex items-center gap-[7px]">
          {DRAWING.colors.map((c, i) => (
            <span
              key={c}
              data-tl={`draw-color-${i}`}
              className={`block h-[15px] w-[15px] rounded-full transition-transform data-[hover=true]:scale-110 ${
                i === 0 ? "ring-2 ring-[#2B6FEB] ring-offset-1" : ""
              } ${c === "#FFFFFF" ? "border border-[#E4E6EB]" : ""}`}
              style={{ background: c }}
            />
          ))}
        </span>
        <span className="h-[16px] w-px bg-[#E4E6EB]" />
        <span className="flex items-center gap-[3px]">
          {DRAWING.sizes.map((d, i) => (
            <span
              key={d}
              data-tl={`draw-size-${i}`}
              className={`flex h-[22px] w-[22px] items-center justify-center rounded-[6px] transition-colors data-[hover=true]:bg-[#F6F7F9] ${
                i === DRAWING.selectedSize ? "bg-[#F1F2F5]" : ""
              }`}
            >
              <span className="block rounded-full bg-[#111]" style={{ width: d, height: d }} />
            </span>
          ))}
        </span>
      </div>

      <div
        data-tl="draw-canvas"
        className="relative mt-[12px] h-[200px] cursor-crosshair overflow-hidden rounded-[8px] border border-[#E4E6EB] bg-[#FAFAFA]"
      >
        <svg viewBox={DOODLE.viewBox} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full p-[14px]" aria-hidden>
          <path
            data-tl="draw-stroke"
            d={DOODLE.path}
            pathLength={1}
            fill="none"
            stroke="#111"
            strokeWidth={DOODLE.pen}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={1 - progress}
            style={{ opacity: progress > 0 ? 1 : 0 }}
          />
        </svg>
      </div>

      <div className="mt-[14px] flex items-center justify-between">
        <span data-tl="draw-clear" className="flex h-[28px] items-center rounded-[8px] border border-[#E4E6EB] px-[13px] text-[10.5px] font-medium">
          {DRAWING.clear}
        </span>
        <span className="flex gap-[8px]">
          <span data-tl="draw-cancel" className="flex h-[30px] items-center rounded-[8px] border border-[#E4E6EB] px-[14px] text-[11px] font-medium">
            {DRAWING.cancel}
          </span>
          <span
            data-tl="draw-insert"
            className="flex h-[30px] items-center rounded-[8px] bg-[#1A6BEF] px-[18px] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
          >
            {DRAWING.insert}
          </span>
        </span>
      </div>
    </InsertDialog>
  );
}
