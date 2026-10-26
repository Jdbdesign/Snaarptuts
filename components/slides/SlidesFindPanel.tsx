"use client";

import { Icon } from "@/components/icons";
import { FIND_PANEL } from "@/components/docs/find-replace-data";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";

type Props = {
  tl: Timeline;
  /** How many matches the deck has for what is typed in Find, and which one is current (0-based). */
  total: number;
  current: number;
};

/**
 * Edit > Find and replace: the Snaarp Doc card adapted to slides. It floats at the top right of the canvas. Scene variables:
 * `findOpen`, `field:find`, `field:replace`, `findMatchCase`; `focus` = "find" | "replace" gives a box the caret. The matches
 * are marked on the slide itself (yellow, the current one orange). Hooks: slides-find-panel, find-input, replace-input,
 * find-match-case, find-btn-replace / -replace-all / -previous / -next, find-close, find-result.
 */
export function SlidesFindPanel({ tl, total, current }: Props) {
  const narrow = useNarrow();
  const open = useTimelineVar(tl, "findOpen", false);
  const query = useTimelineVar(tl, "field:find", "");
  const replacement = useTimelineVar(tl, "field:replace", "");
  const matchCase = useTimelineVar(tl, "findMatchCase", false);
  const focus = useTimelineVar<string>(tl, "focus", "");
  const result = !query ? "" : total ? FIND_PANEL.count(Math.min(current, total - 1) + 1, total) : FIND_PANEL.noResults;

  return (
    <div
      aria-hidden={!open}
      data-tl="slides-find-panel"
      className={`pointer-events-none absolute top-[92px] z-30 w-[270px] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
        narrow ? "right-[12px]" : "right-[310px]"
      } ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
    >
      <div className="rounded-[12px] border border-[#EAEBEF] bg-white px-[13px] pb-[11px] pt-[11px] shadow-[0_10px_30px_-8px_rgba(17,24,39,0.22)]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#111]">{FIND_PANEL.title}</span>
          <span data-tl="find-close" onClick={() => tl.setVar("findOpen", false)} className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[#1f2430]">
            <Icon name="x" size={11} />
          </span>
        </div>

        <Field hook="find-input" value={query} placeholder={FIND_PANEL.findPlaceholder} focused={focus === "find"} className="mt-[9px]" />
        <Field hook="replace-input" value={replacement} placeholder={FIND_PANEL.replacePlaceholder} focused={focus === "replace"} className="mt-[6px]" />

        <div data-tl="find-match-case" className="mt-[9px] flex w-fit items-center gap-[6px] text-[9.5px] text-[#3d4350]">
          <span className={`flex h-[12px] w-[12px] items-center justify-center rounded-[3px] border ${matchCase ? "border-[#111] bg-[#111] text-white" : "border-[#B9BDC7] bg-white text-transparent"}`}>
            <Icon name="check" size={8} />
          </span>
          {FIND_PANEL.matchCase}
        </div>

        <div data-tl="find-result" className="mt-[7px] h-[12px] text-[9px] text-[#8b909c]">
          {result}
        </div>

        <div className="mt-[5px] flex gap-[5px]">
          {(
            [
              ["replace", FIND_PANEL.buttons.replace],
              ["replace-all", FIND_PANEL.buttons.replaceAll],
              ["previous", FIND_PANEL.buttons.previous],
              ["next", FIND_PANEL.buttons.next],
            ] as const
          ).map(([id, label]) => (
            <span
              key={id}
              data-tl={`find-btn-${id}`}
              className={`flex h-[23px] items-center rounded-[6px] border border-[#E3E5EA] bg-white px-[8px] text-[9px] transition-[background,transform] data-[hover=true]:bg-[#F1F2F5] data-[pressed=true]:scale-95 ${
                total ? "text-[#1f2430]" : "text-[#B5B9C3]"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ hook, value, placeholder, focused, className }: { hook: string; value: string; placeholder: string; focused: boolean; className: string }) {
  return (
    <div
      data-tl={hook}
      className={`flex h-[27px] items-center rounded-[8px] border bg-white px-[9px] text-[10px] transition-colors ${focused ? "border-[#1f2430] shadow-[0_0_0_1px_#1f2430]" : "border-[#E3E5EA]"} ${className}`}
    >
      {focused && !value && <i className="mr-px h-[13px] w-px bg-[#111]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
      {value ? <span className="text-[#111]">{value}</span> : <span className="text-[#A3A8B3]">{placeholder}</span>}
      {focused && value && <i className="ml-px h-[13px] w-px bg-[#111]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
    </div>
  );
}
