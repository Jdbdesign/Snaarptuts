"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

type Props = {
  tl: Timeline;
  id: string;
  /** A tall box that wraps long text (the TXT content), instead of a single line. */
  multiline?: boolean;
  className?: string;
};

/**
 * A Cloudflare-style text box the timeline types or pastes into: the text is the scene variable `field:<id>`,
 * the focus ring follows the scene variable `focus`, and tl.paste()/tl.flash() tint it (data-flash).
 */
export function CfField({ tl, id, multiline, className = "" }: Props) {
  const value = useTimelineVar(tl, `field:${id}`, "");
  const focused = useTimelineVar(tl, "focus", "") === id;

  return (
    <div
      data-tl={`field-${id}`}
      data-focus={focused}
      onClick={() => tl.setVar("focus", id)}
      className={`rounded-[4px] border border-[#CFCFCF] bg-white px-3 text-[14px] text-[#333] transition-[border-color,box-shadow,background-color] duration-200 data-[flash=true]:border-[#0051C3] data-[flash=true]:bg-[#E6EEFB] data-[focus=true]:border-[#0051C3] data-[focus=true]:shadow-[0_0_0_3px_rgba(0,81,195,0.15)] ${
        multiline ? "h-[76px] overflow-hidden py-2 leading-[22px]" : "flex h-[38px] items-center"
      } ${className}`}
    >
      <span className={multiline ? "break-all" : "min-w-0 truncate"}>
        {value}
        {focused && <i className="ml-px inline-block h-[18px] w-px translate-y-[3px] bg-[#333]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
      </span>
    </div>
  );
}
