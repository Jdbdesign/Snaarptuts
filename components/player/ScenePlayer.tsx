"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CursorArrow } from "@/components/icons";
import { CancelledError, Timeline, type TimelineHost } from "@/lib/timeline";
import type { Scene } from "@/tutorials/types";

const DESIGN_WIDTH = 1440;
const GAP_AFTER_STEP_MS = 500;

type Props = {
  scene: Scene;
  paused: boolean;
  onDone: () => void;
  onAdvance: () => void;
  onUrlChange: (url: string) => void;
};

/**
 * Runs one scene. The scene is laid out at a fixed 1440px design width and scaled
 * to the frame width; design height = frame height / scale, so it always fills the frame.
 */
export function ScenePlayer({ scene, paused, onDone, onAdvance, onUrlChange }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [tl, setTl] = useState<Timeline | null>(null);
  const [caption, setCaption] = useState<{ text: string; visible: boolean }>({ text: "", visible: false });

  const latest = useRef({ onDone, onAdvance, onUrlChange });
  useEffect(() => {
    latest.current = { onDone, onAdvance, onUrlChange };
  });

  // Measure the frame (layout effect: the first frame is painted with the scene already in place).
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Create the timeline.
  useLayoutEffect(() => {
    const host: TimelineHost = {
      scroller: () => sceneRef.current?.querySelector<HTMLElement>("[data-scroller]") ?? null,
      frame: () => frameRef.current,
      setCursor: (x, y) => {
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      },
      showCursor: () => {
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
      },
      press: () => {
        cursorRef.current?.firstElementChild?.animate(
          [{ transform: "scale(1)" }, { transform: "scale(0.82)" }, { transform: "scale(1)" }],
          { duration: 260, easing: "ease-out" },
        );
      },
      ripple: (x, y) => {
        const r = rippleRef.current;
        if (!r) return;
        r.style.left = `${x}px`;
        r.style.top = `${y}px`;
        r.animate(
          [
            { transform: "translate(-50%, -50%) scale(0.2)", opacity: 0.55 },
            { transform: "translate(-50%, -50%) scale(1.5)", opacity: 0 },
          ],
          { duration: 520, easing: "ease-out" },
        );
      },
      setUrl: (url) => latest.current.onUrlChange(url),
      setCaption: (text) =>
        setCaption((c) => ({ text: text ?? c.text, visible: text !== null })),
    };
    const t = new Timeline(host);
    setTl(t);
    return () => t.cancel();
  }, []);

  // Pause / resume.
  useEffect(() => {
    tl?.setPaused(paused);
  }, [tl, paused]);

  // Run the script once the frame is measured.
  const ready = size !== null && tl !== null;
  useEffect(() => {
    if (!tl || !ready) return;
    (async () => {
      try {
        await tl.ready();
        await scene.run(tl);
        latest.current.onDone();
        await tl.wait(GAP_AFTER_STEP_MS);
        latest.current.onAdvance();
      } catch (e) {
        if (!(e instanceof CancelledError)) console.error(e);
      }
    })();
  }, [tl, ready, scene]);

  // Progress line along the bottom edge.
  useEffect(() => {
    if (!tl) return;
    let raf = 0;
    const loop = () => {
      const p = Math.min(1, tl.elapsed / scene.durationMs);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tl, scene]);

  const scale = size ? size.w / DESIGN_WIDTH : 1;

  return (
    <div ref={frameRef} data-scene className="absolute inset-0 overflow-hidden bg-white">
      {size && tl && (
        <div
          ref={sceneRef}
          inert
          style={{
            width: DESIGN_WIDTH,
            height: size.h / scale,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          <scene.Component tl={tl} />
        </div>
      )}

      <div
        ref={rippleRef}
        aria-hidden
        className="pointer-events-none absolute z-30 h-11 w-11 rounded-full bg-brand/40 opacity-0"
      />
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-40 opacity-0"
        style={{ willChange: "transform" }}
      >
        <div style={{ transformOrigin: "2px 2px" }}>
          <CursorArrow size={22} />
        </div>
      </div>

      <div
        aria-live="polite"
        className={`pointer-events-none absolute bottom-6 left-1/2 z-40 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full bg-[#111] px-5 py-2.5 text-center text-[14px] font-medium leading-5 text-white shadow-lg transition-all duration-300 ${
          caption.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {caption.text}
      </div>

      <div
        ref={progressRef}
        className="pointer-events-none absolute bottom-0 left-0 z-40 h-[3px] w-full origin-left bg-brand"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
