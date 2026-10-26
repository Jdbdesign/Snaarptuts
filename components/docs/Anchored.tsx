"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  /** The data-tl name of the element this sits under, e.g. "tool-zoom" or "header-meet". */
  to: string;
  /** Which edge of the element lines up with the card: its left edge (default), its right edge, or its centre. */
  align?: "left" | "right" | "center";
  /** Visible. The card stays mounted and fades, so it is measured before it shows. */
  show: boolean;
  /** Anything that changes the card's size while it is the same element (a tooltip's text). */
  deps?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A card placed right under another element of the editor (a toolbar button, a header button). It lives in the editor's
 * `tool-layer` (DocEditor's `toolLayer`), which covers the editor inside the narrow-screen zoom. The position is worked out
 * in per cent of that layer from the two elements' on-screen boxes, so it holds under the scene's scaling and the zoom,
 * and the card is kept inside the editor's edges.
 */
export function Anchored({ to, align = "left", show, deps = "", className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const self = ref.current;
    const layer = self?.parentElement;
    if (!self || !layer || !show) return;
    const root = layer.closest("[data-scroller]") ?? document;
    const target = root.querySelector(`[data-tl="${to}"]`);
    if (!target) return;
    const l = layer.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const w = (self.getBoundingClientRect().width / l.width) * 100;
    const edge = (x: number) => ((x - l.left) / l.width) * 100;
    let left = align === "right" ? edge(t.right) - w : align === "center" ? edge(t.left + t.width / 2) - w / 2 : edge(t.left);
    left = Math.max(0.6, Math.min(left, 99.4 - w));
    setPos({ left, top: ((t.bottom - l.top) / l.height) * 100 });
  }, [to, show, align, deps]);

  return (
    <div
      ref={ref}
      aria-hidden={!show}
      className={`absolute w-max transition-opacity duration-150 motion-reduce:transition-none ${show ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ left: `${pos?.left ?? 0}%`, top: `${pos?.top ?? 0}%`, marginTop: 3 }}
    >
      {children}
    </div>
  );
}
