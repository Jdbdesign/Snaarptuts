"use client";

import { FULL_SCREEN } from "@/components/docs/view-menu-data";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SlideView } from "./SlideView";
import type { SlideData } from "./slides-data";

type Props = { tl: Timeline; slides: SlideData[]; ratio: number };

/**
 * View > Full screen, simulated INSIDE the browser frame (never the browser's own Fullscreen API): a dark overlay that covers the
 * editor with the slide filling it. Same look and the same scene variables as Snaarp Doc's full screen: `fullScreen`, `fsHint`
 * (the "Press Esc..." pill), `fsKey` / `fsPressed` (the Esc key chip, see pressEscFromFullScreen); plus `fsSlide` (the slide on
 * show) and `fsArrow` ("" | "next" | "previous": an arrow key chip, pressed with `fsPressed`). Hooks: slides-fullscreen,
 * fullscreen-slide, fullscreen-hint, fullscreen-key, fullscreen-arrow.
 */
export function SlidesFullScreen({ tl, slides, ratio }: Props) {
  const open = useTimelineVar(tl, "fullScreen", false);
  const hint = useTimelineVar(tl, "fsHint", false);
  const key = useTimelineVar(tl, "fsKey", false);
  const pressed = useTimelineVar(tl, "fsPressed", false);
  const arrow = useTimelineVar<string>(tl, "fsArrow", "");
  const idx = useTimelineVar(tl, "fsSlide", 1);
  const slide = slides[Math.min(idx, slides.length - 1)];
  const chip = (shown: boolean) =>
    `absolute left-1/2 -translate-x-1/2 rounded-[7px] border px-[12px] py-[5px] text-[12px] font-medium text-white shadow-[0_2px_0_rgba(0,0,0,0.5)] transition-[opacity,transform,background-color] duration-150 motion-reduce:transition-none ${
      shown ? "opacity-100" : "opacity-0"
    } ${pressed && shown ? "translate-y-[2px] scale-95 border-white/60 bg-white/30" : "border-white/30 bg-white/10"}`;
  return (
    <div
      aria-hidden={!open}
      data-tl="slides-fullscreen"
      className={`pointer-events-none absolute inset-0 z-[45] flex items-center justify-center bg-[#26272B] [container-type:size] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div data-tl="fullscreen-slide" className="shadow-[0_0_40px_rgba(0,0,0,0.35)]" style={{ width: `min(94cqw, calc(88cqh * ${ratio}))` }}>
        <SlideView slide={slide} ratio={ratio} />
      </div>
      <div
        data-tl="fullscreen-hint"
        className={`absolute left-1/2 top-[10px] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#111] px-[14px] py-[6px] text-[12px] text-white shadow-lg transition-opacity duration-500 motion-reduce:transition-none ${
          hint ? "opacity-100" : "opacity-0"
        }`}
      >
        {FULL_SCREEN.hint}
      </div>
      <div data-tl="fullscreen-key" className={`${chip(key)} top-[8px]`}>
        {FULL_SCREEN.key}
      </div>
      <div data-tl="fullscreen-arrow" className={`${chip(arrow !== "")} bottom-[10px]`}>
        {arrow === "previous" ? "←" : "→"}
      </div>
    </div>
  );
}
