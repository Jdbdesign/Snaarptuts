"use client";

import type { CSSProperties } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SlideView } from "./SlideView";
import type { SlideData } from "./slides-data";
import { TRANSITIONS } from "./slides-toolbar-data";

export type TransitionRun = { id: string; phase: "start" | "run" | "hold" };

type Props = { tl: Timeline; slides: SlideData[]; selected: number; ratio: number };

const MS = 700;

/** How the two slides look at the start (`from`) and the end (`to`) of each transition. The new slide is drawn above the old one. */
function looks(id: string, phase: TransitionRun["phase"]): { old: CSSProperties; next: CSSProperties; box?: CSSProperties } {
  const end = phase !== "start";
  switch (id) {
    case "fade":
      return { old: {}, next: { opacity: end ? 1 : 0 } };
    case "dissolve":
      return { old: { opacity: end ? 0 : 1, filter: end ? "blur(8px)" : "blur(0)" }, next: { opacity: end ? 1 : 0, filter: end ? "blur(0)" : "blur(8px)" } };
    case "slide-right":
      return { old: { transform: end ? "translateX(-30%)" : "none" }, next: { transform: end ? "none" : "translateX(100%)" } };
    case "slide-left":
      return { old: { transform: end ? "translateX(30%)" : "none" }, next: { transform: end ? "none" : "translateX(-100%)" } };
    case "flip":
      return {
        old: { transform: end ? "rotateY(-180deg)" : "rotateY(0)", backfaceVisibility: "hidden" },
        next: { transform: end ? "rotateY(0)" : "rotateY(180deg)", backfaceVisibility: "hidden" },
        box: { perspective: "160cqw" },
      };
    case "cube":
      return {
        old: { transform: "rotateY(0) translateZ(50cqw)", backfaceVisibility: "hidden" },
        next: { transform: "rotateY(90deg) translateZ(50cqw)", backfaceVisibility: "hidden" },
        box: { perspective: "200cqw" },
      };
    default:
      return { old: {}, next: { opacity: end ? 1 : 0 } };
  }
}

/**
 * Plays the toolbar Transition choice on the canvas: slide `selected` hands over to the next slide in 0.7 s. The script drives it with the
 * scene variable `tpreview` ({ id, phase }: "start" puts the new slide in its starting spot, "run" lets it move, "hold" keeps the end for a
 * moment), see playTransition in toolbar-timeline.ts. Hook: transition-preview.
 */
export function TransitionPreview({ tl, slides, selected, ratio }: Props) {
  const run = useTimelineVar<TransitionRun | null>(tl, "tpreview", null);
  if (!run) return null;
  const from = slides[selected];
  const to = slides[(selected + 1) % slides.length];
  const label = TRANSITIONS.find((t) => t.id === run.id)?.label ?? "";
  const l = looks(run.id, run.phase);
  const ease = run.phase === "start" ? "none" : `all ${MS}ms ease-in-out`;
  const cube = run.id === "cube";
  const cubeBox: CSSProperties = cube
    ? { transformStyle: "preserve-3d", transform: run.phase === "start" ? "translateZ(-50cqw) rotateY(0)" : "translateZ(-50cqw) rotateY(-90deg)", transition: ease }
    : {};
  const face: CSSProperties = { transition: cube ? "none" : ease, position: "absolute", inset: 0 };
  return (
    <div data-tl="transition-preview" className="pointer-events-none absolute inset-0 z-20 [container-type:inline-size]" style={{ ...l.box }}>
      <div className={`absolute inset-0 ${run.id === "cube" || run.id === "flip" ? "" : "overflow-hidden"}`} style={{ transformStyle: cube ? "preserve-3d" : undefined, ...cubeBox }}>
        <div style={{ ...face, ...l.old }}>
          <SlideView slide={from} ratio={ratio} className="h-full w-full" />
        </div>
        <div style={{ ...face, ...l.next }}>
          <SlideView slide={to} ratio={ratio} className="h-full w-full" />
        </div>
      </div>
      <span className="absolute left-[2cqw] top-[2cqw] rounded-full bg-[#111] px-[1.6cqw] py-[0.7cqw] text-[1.9cqw] font-medium leading-none text-white">{label}</span>
    </div>
  );
}
