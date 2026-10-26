"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SPEAKER_NOTES } from "./slide-elements-data";

/**
 * View > Speaker notes: the panel under the canvas. The note is the scene variable `field:notes` (type into it with
 * `tl.typeText("notes", ...)`); the scene variable `focus` = "notes" gives it the caret. Clear really clears it.
 * Hooks: notes-panel, notes-field, notes-clear.
 */
export function SpeakerNotes({ tl }: { tl: Timeline }) {
  const note = useTimelineVar(tl, "field:notes", "");
  const focus = useTimelineVar<string>(tl, "focus", "") === "notes";
  return (
    <div data-tl="notes-panel" className="shrink-0 border-t border-[#E3E6EC] bg-white">
      <div className="flex h-[22px] items-center justify-between border-b border-[#F0F1F4] bg-[#FAFAFC] px-[11px] text-[8.5px] text-[#6b7280]">
        <span>{SPEAKER_NOTES.title}</span>
        <span
          data-tl="notes-clear"
          onClick={() => tl.setVar("field:notes", "")}
          className="rounded-[4px] px-[6px] py-[2px] transition-colors data-[hover=true]:bg-[#EEF0F4] data-[pressed=true]:scale-95"
        >
          {SPEAKER_NOTES.clear}
        </span>
      </div>
      <div data-tl="notes-field" className="h-[66px] px-[11px] pt-[8px] text-[10px] leading-[14px] text-[#1f2430]">
        {note ? note : <span className="text-[#9AA0A6]">{SPEAKER_NOTES.placeholder}</span>}
        {focus && <i className="ml-px inline-block h-[12px] w-px translate-y-[2px] bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
      </div>
    </div>
  );
}
