"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { CANVAS_OVERLAY } from "./canvas-overlay-data";

const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End"]);

type Props = {
  paused: boolean;
  /** False once the completion card shows: the overlay still blocks the scene but no longer toggles. */
  interactive: boolean;
  onToggle: () => void;
};

/**
 * Transparent layer over the scene. It makes the canvas view-only (clicks, scroll, selection,
 * focus never reach the scene) and turns a click or tap into pause / play.
 */
export function CanvasOverlay({ paused, interactive, onToggle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const press = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const lastToggle = useRef(0);
  const wasPaused = useRef(paused);
  const [flash, setFlash] = useState(0);

  // Show the play icon briefly when resuming.
  useEffect(() => {
    if (wasPaused.current && !paused) setFlash((n) => n + 1);
    wasPaused.current = paused;
  }, [paused]);
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(0), CANVAS_OVERLAY.playFlashMs);
    return () => clearTimeout(t);
  }, [flash]);

  // Non-passive listeners so preventDefault can stop scrolling.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stop = (e: Event) => e.preventDefault();
    el.addEventListener("wheel", stop, { passive: false });
    el.addEventListener("touchmove", stop, { passive: false });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, []);

  const toggle = () => {
    if (!interactive) return;
    const now = performance.now();
    if (now - lastToggle.current < CANVAS_OVERLAY.debounceMs) return;
    lastToggle.current = now;
    onToggle();
  };

  return (
    <div
      ref={ref}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : -1}
      aria-label={interactive ? (paused ? CANVAS_OVERLAY.playLabel : CANVAS_OVERLAY.pauseLabel) : undefined}
      aria-pressed={interactive ? paused : undefined}
      aria-hidden={interactive ? undefined : true}
      className="absolute inset-0 z-[45] cursor-pointer select-none overflow-hidden outline-none [overscroll-behavior:none] [touch-action:none] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        press.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
      }}
      onPointerMove={(e) => {
        const p = press.current;
        if (p && p.id === e.pointerId && Math.hypot(e.clientX - p.x, e.clientY - p.y) > CANVAS_OVERLAY.dragThresholdPx) p.moved = true;
      }}
      onPointerUp={(e) => {
        const p = press.current;
        press.current = null;
        if (!p || p.id !== e.pointerId || p.moved) return;
        if (Math.hypot(e.clientX - p.x, e.clientY - p.y) > CANVAS_OVERLAY.dragThresholdPx) return;
        toggle();
      }}
      onPointerCancel={() => (press.current = null)}
      onMouseDown={(e) => {
        if (e.button === 1) e.preventDefault(); // middle-click autoscroll
      }}
      onAuxClick={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (SCROLL_KEYS.has(e.key)) e.preventDefault();
        if (e.key === "Enter" && !e.repeat) {
          e.preventDefault();
          toggle();
        }
      }}
    >
      {interactive && paused && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#111]/70 text-white shadow-lg">
            <Icon name="pause" size={28} />
          </span>
          <span className="rounded-full bg-[#111] px-4 py-1.5 text-[13px] font-medium text-white shadow-lg">
            {CANVAS_OVERLAY.pausedHint}
          </span>
        </div>
      )}
      {interactive && !paused && flash > 0 && (
        <div key={flash} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="player-play-flash flex h-16 w-16 items-center justify-center rounded-full bg-[#111]/70 text-white shadow-lg">
            <Icon name="play" size={28} />
          </span>
        </div>
      )}
    </div>
  );
}
