/*
 * Pure geometry for "make this element visible". Used by Timeline.ensureVisible.
 *
 * The scene is scaled with a CSS transform, so every measurement here is in screen pixels and a scroll
 * container's own ratio (rect height / clientHeight) turns screen pixels back into scrollTop units.
 */

export type Rect = { top: number; bottom: number; left: number; right: number };

/** One scroll move: `node[prop]` goes from its current value to `to`. */
export type ScrollMove = { node: HTMLElement; prop: "scrollTop" | "scrollLeft"; from: number; to: number; screen: number };

const SCROLLABLE = new Set(["auto", "scroll", "overlay"]);

/** Every ancestor of `el` (inside `root`) that can scroll, innermost first. */
export function scrollAncestors(el: HTMLElement, root: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (let n = el.parentElement; n && n !== root; n = n.parentElement) {
    const cs = getComputedStyle(n);
    const y = SCROLLABLE.has(cs.overflowY) && n.scrollHeight > n.clientHeight + 1;
    const x = SCROLLABLE.has(cs.overflowX) && n.scrollWidth > n.clientWidth + 1;
    if (y || x) out.push(n);
  }
  return out;
}

const intersect = (a: Rect, b: Rect): Rect => ({
  top: Math.max(a.top, b.top),
  bottom: Math.min(a.bottom, b.bottom),
  left: Math.max(a.left, b.left),
  right: Math.min(a.right, b.right),
});

/** Sticky or fixed bars that sit on the top or bottom edge of `win` and cover part of the scrolling content. */
function edgeCovers(root: HTMLElement, el: HTMLElement, win: Rect) {
  let top = 0;
  let bottom = 0;
  const width = win.right - win.left;
  const height = win.bottom - win.top;
  for (const c of root.querySelectorAll<HTMLElement>(".sticky, .fixed, [style*='sticky'], [style*='fixed']")) {
    if (c.contains(el) || el.contains(c)) continue;
    const r = c.getBoundingClientRect();
    const w = Math.min(r.right, win.right) - Math.max(r.left, win.left);
    if (w < width * 0.5 || r.height > height * 0.4 || r.height === 0) continue;
    if (Math.abs(r.top - win.top) < 2) top = Math.max(top, r.bottom - win.top);
    else if (Math.abs(r.bottom - win.bottom) < 2) bottom = Math.max(bottom, win.bottom - r.top);
  }
  return { top, bottom };
}

/**
 * Work out the scroll moves (innermost container first) that bring `el` fully inside the visible window of every
 * scroll container it lives in, with `margin` design pixels of air, clear of sticky bars and of the caption bubble.
 * An empty list means the element is already in view. When the element is taller than the window its top is shown.
 */
export function planScroll(el: HTMLElement, root: HTMLElement, margin: number, caption: DOMRect | null): ScrollMove[] {
  const first = el.getBoundingClientRect();
  if (first.width === 0 && first.height === 0) return []; // not displayed: nothing to reveal
  const r: Rect = { top: first.top, bottom: first.bottom, left: first.left, right: first.right };
  const rootRect = root.getBoundingClientRect();
  const moves: ScrollMove[] = [];

  for (const node of scrollAncestors(el, root)) {
    const nr = node.getBoundingClientRect();
    const win = intersect(nr, rootRect);
    const kY = node.clientHeight ? nr.height / node.clientHeight : 1;
    const kX = node.clientWidth ? nr.width / node.clientWidth : 1;
    const cs = getComputedStyle(node);
    const covers = edgeCovers(root, el, win);

    if (SCROLLABLE.has(cs.overflowY) && node.scrollHeight > node.clientHeight + 1) {
      const m = margin * kY;
      let top = win.top + covers.top + m;
      let bottom = win.bottom - covers.bottom - m;
      // The caption bubble hides whatever sits under it, so keep the target above it.
      if (caption && caption.top > win.top && caption.top < win.bottom && caption.left - 8 < r.right && r.left < caption.right + 8) {
        bottom = Math.min(bottom, caption.top - Math.max(8, m / 2));
      }
      if (bottom <= top) {
        top = win.top + covers.top;
        bottom = win.bottom - covers.bottom;
      }
      let delta = 0;
      if (r.top < top - 0.5 || r.bottom > bottom + 0.5) {
        delta = r.bottom - r.top <= bottom - top ? (r.top + r.bottom) / 2 - (top + bottom) / 2 : r.top - top;
      }
      if (delta) {
        const max = node.scrollHeight - node.clientHeight;
        const to = Math.max(0, Math.min(max, node.scrollTop + delta / kY));
        const screen = (to - node.scrollTop) * kY;
        if (Math.abs(screen) > 0.5) {
          moves.push({ node, prop: "scrollTop", from: node.scrollTop, to, screen });
          r.top -= screen;
          r.bottom -= screen;
        }
      }
    }

    if (SCROLLABLE.has(cs.overflowX) && node.scrollWidth > node.clientWidth + 1) {
      const m = margin * kX;
      const left = win.left + m;
      const right = win.right - m;
      let delta = 0;
      if (right > left && (r.left < left - 0.5 || r.right > right + 0.5)) {
        delta = r.right - r.left <= right - left ? (r.left + r.right) / 2 - (left + right) / 2 : r.left - left;
      }
      if (delta) {
        const max = node.scrollWidth - node.clientWidth;
        const to = Math.max(0, Math.min(max, node.scrollLeft + delta / kX));
        const screen = (to - node.scrollLeft) * kX;
        if (Math.abs(screen) > 0.5) {
          moves.push({ node, prop: "scrollLeft", from: node.scrollLeft, to, screen });
          r.left -= screen;
          r.right -= screen;
        }
      }
    }
  }
  return moves;
}
