"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

type TextProps = { tl: Timeline; id: string; placeholder: string; mask?: boolean; mono?: boolean };

/** The text inside a field the timeline types into: value, blinking caret and placeholder. */
export function FieldText({ tl, id, placeholder, mask, mono }: TextProps) {
  const value = useTimelineVar(tl, `field:${id}`, "");
  const focused = useTimelineVar(tl, "focus", "") === id;
  const shown = mask ? "•".repeat(value.length) : value;

  return (
    <span className={`flex min-w-0 flex-1 items-center ${mono ? "font-mono" : ""}`}>
      {value ? <span className={`truncate ${mask ? "tracking-[1.5px]" : ""}`}>{shown}</span> : null}
      {focused && (
        <i className="h-[18px] w-px shrink-0 bg-ink" style={{ animation: "caret-blink 1s steps(1) infinite" }} />
      )}
      {!value && <span className="truncate text-[#9aa0ab]">{placeholder}</span>}
    </span>
  );
}

const FOCUS = {
  blue: "data-[focus=true]:border-[#2F5BE0] data-[focus=true]:shadow-[0_0_0_0.5px_#2F5BE0,0_0_0_4px_rgba(47,91,224,0.14)]",
  purple: "data-[focus=true]:border-[#7C39ED] data-[focus=true]:shadow-[0_0_0_0.5px_#7C39ED,0_0_0_3px_rgba(124,57,237,0.14)]",
  dark: "data-[focus=true]:border-[#111] data-[focus=true]:shadow-[0_0_0_0.5px_#111,0_0_0_4px_rgba(17,17,17,0.1)]",
};

type Props = TextProps & {
  right?: ReactNode;
  /** Colour of the focus ring: the admin portals use blue, the user login uses black, Snaarp Mail onboarding uses purple. */
  tone?: keyof typeof FOCUS;
  /** Light blue fill once something has been typed. */
  tintWhenFilled?: boolean;
  className?: string;
};

/**
 * A text input driven by the timeline: tl.fill() clicks it and types into the scene variable
 * `field:<id>`. Focus lives in the scene variable `focus`.
 */
export function TypedField({ right, tone = "blue", tintWhenFilled, className = "", ...text }: Props) {
  const { tl, id } = text;
  const value = useTimelineVar(tl, `field:${id}`, "");
  const focused = useTimelineVar(tl, "focus", "") === id;

  return (
    <div
      data-tl={`field-${id}`}
      data-focus={focused}
      onClick={() => tl.setVar("focus", id)}
      className={`flex items-center gap-2 rounded-lg border border-[#E1E4EE] px-3.5 text-[14px] text-ink transition-[border-color,box-shadow,background] duration-150 ${FOCUS[tone]} ${
        tintWhenFilled && value && !focused ? "bg-[#EAF1FE]" : "bg-white"
      } ${className}`}
    >
      <FieldText {...text} />
      {right}
    </div>
  );
}
