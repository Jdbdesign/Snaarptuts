"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SlideView } from "./SlideView";
import type { SlideData } from "./slides-data";
import { playableSlides } from "./slides-format";
import { PRESENTER } from "./slides-tools-data";

type Props = { tl: Timeline; slides: SlideData[]; ratio: number };

const clock = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Slideshow > Presenter view: a dark screen over the editor (simulated inside the browser frame, like the full screen) with the slide on show,
 * a preview of the next one, its speaker notes, a timer and Previous / Next / End. Scene variables: `presenter` (open), `presenterSlide`
 * (the slide on show, an index) and `presenterSeconds` (the timer). Skipped slides are left out. The recording shows only the menu row, so
 * this screen is built from the brief. Hooks: presenter-view, presenter-slide, presenter-next-slide, presenter-notes, presenter-timer,
 * presenter-prev, presenter-next, presenter-end.
 */
export function PresenterView({ tl, slides, ratio }: Props) {
  const open = useTimelineVar(tl, "presenter", false);
  const at = useTimelineVar(tl, "presenterSlide", 0);
  const seconds = useTimelineVar(tl, "presenterSeconds", 0);
  const play = playableSlides(slides);
  const slide = slides[Math.min(at, slides.length - 1)];
  const nextIndex = play.find((i) => i > at);
  const next = nextIndex === undefined ? null : slides[nextIndex];
  const move = (dir: 1 | -1) => {
    const to = dir === 1 ? play.find((i) => i > at) : [...play].reverse().find((i) => i < at);
    if (to !== undefined) tl.setVar("presenterSlide", to);
  };
  const btn = "flex h-[28px] w-[28px] items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-[background,transform] duration-150 data-[hover=true]:bg-white/20 data-[pressed=true]:scale-90";
  return (
    <div
      aria-hidden={!open}
      data-tl="presenter-view"
      className={`absolute inset-0 z-[46] flex flex-col bg-[#26272B] text-white transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="flex h-[40px] shrink-0 items-center justify-between border-b border-white/10 px-[16px]">
        <span className="text-[12px] font-medium">{PRESENTER.title}</span>
        <div className="flex items-center gap-[14px]">
          <span className="flex items-center gap-[6px] text-[11px] text-white/70">
            <Icon name="clock" size={12} />
            <span data-tl="presenter-timer" className="tabular-nums text-white">{clock(seconds)}</span>
          </span>
          <span data-tl="presenter-end" onClick={() => tl.setVar("presenter", false)} className="rounded-[6px] bg-[#D93025] px-[12px] py-[5px] text-[10.5px] font-medium transition-[filter,transform] duration-150 data-[hover=true]:brightness-110 data-[pressed=true]:scale-95">
            {PRESENTER.end}
          </span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 gap-[16px] p-[16px]">
        <div className="flex min-w-0 flex-[1.7] flex-col items-center justify-center gap-[12px]">
          <div data-tl="presenter-slide" className="w-full max-w-[90%] shadow-[0_0_30px_rgba(0,0,0,0.4)]" style={{ maxHeight: "78%" }}>
            <SlideView slide={slide} ratio={ratio} />
          </div>
          <div className="flex items-center gap-[10px]">
            <span data-tl="presenter-prev" onClick={() => move(-1)} className={btn}>
              <Icon name="chevronLeft" size={13} />
            </span>
            <span className="min-w-[70px] text-center text-[10.5px] text-white/70">
              {at + 1} / {slides.length}
            </span>
            <span data-tl="presenter-next" onClick={() => move(1)} className={btn}>
              <Icon name="chevronRight" size={13} />
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[14px]">
          <div>
            <p className="mb-[6px] text-[9.5px] font-medium uppercase tracking-[0.06em] text-white/55">{PRESENTER.next}</p>
            <div data-tl="presenter-next-slide" className="overflow-hidden rounded-[4px] border border-white/15">
              {next ? <SlideView slide={next} ratio={ratio} /> : <div className="flex items-center justify-center bg-white/5 text-[10px] text-white/55" style={{ aspectRatio: String(ratio) }}>{PRESENTER.noNext}</div>}
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <p className="mb-[6px] text-[9.5px] font-medium uppercase tracking-[0.06em] text-white/55">{PRESENTER.notes}</p>
            <div data-tl="presenter-notes" className="rounded-[6px] border border-white/15 bg-white/5 p-[10px] text-[11px] leading-[16px] text-white/90">
              {PRESENTER.notesBySlide[at % PRESENTER.notesBySlide.length]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
