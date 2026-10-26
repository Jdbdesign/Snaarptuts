/*
 * Shared timeline helper. Scene scripts are plain async functions that call
 * wait / moveCursorTo / click / scrollTo / showCaption / highlight / clearHighlight.
 * All time is "active time": it stops while paused. cancel() rejects every pending call.
 */

export class CancelledError extends Error {
  constructor() {
    super("Timeline cancelled");
    this.name = "CancelledError";
  }
}

/** What the timeline needs from the player. Implemented by ScenePlayer. */
export type TimelineHost = {
  /** The (scaled) scrolling page element of the scene. */
  scroller: () => HTMLElement | null;
  /** Unscaled overlay area. Cursor coordinates are relative to it. */
  frame: () => HTMLElement | null;
  setCursor: (x: number, y: number) => void;
  showCursor: () => void;
  press: () => void;
  ripple: (x: number, y: number) => void;
  setCaption: (text: string | null) => void;
  /** Change the address shown in the browser URL pill (for scenes with several screens). */
  setUrl: (url: string) => void;
};

type Job = (dt: number) => boolean; // returns true when finished

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export class Timeline {
  /** Active (unpaused) milliseconds since the step started. */
  elapsed = 0;
  readonly reduced: boolean;

  private host: TimelineHost;
  private paused = false;
  private cancelled = false;
  private jobs = new Set<{ run: Job; reject: (e: Error) => void }>();
  private raf = 0;
  private last = 0;
  private cursor = { x: 0, y: 0 };
  private highlighted = new Set<HTMLElement>();
  private hovered: HTMLElement | null = null;
  private vars = new Map<string, unknown>();
  private toastId = 0;
  private listeners = new Set<() => void>();

  constructor(host: TimelineHost) {
    this.host = host;
    this.reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  // ---- state shared with the scene component -------------------------------

  setVar(key: string, value: unknown) {
    this.vars.set(key, value);
    this.listeners.forEach((l) => l());
  }
  getVar<T>(key: string, fallback: T): T {
    return (this.vars.has(key) ? this.vars.get(key) : fallback) as T;
  }
  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };

  // ---- control -------------------------------------------------------------

  setPaused(p: boolean) {
    this.paused = p;
    this.syncAnimations();
  }

  cancel() {
    if (this.cancelled) return;
    this.cancelled = true;
    cancelAnimationFrame(this.raf);
    this.clearHighlight();
    this.hover(null);
    const err = new CancelledError();
    this.jobs.forEach((j) => j.reject(err));
    this.jobs.clear();
  }

  private tick = (now: number) => {
    if (this.cancelled) return;
    const dt = Math.min(now - this.last, 100);
    this.last = now;
    if (this.paused) {
      this.syncAnimations(); // freeze CSS animations that started late
    } else {
      this.elapsed += dt;
      this.jobs.forEach((j) => {
        if (j.run(dt)) this.jobs.delete(j);
      });
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  private syncAnimations() {
    const root = this.host.frame();
    if (!root) return;
    for (const a of root.getAnimations({ subtree: true })) {
      if (this.paused) {
        if (a.playState === "running") a.pause();
      } else if (a.playState === "paused") {
        a.play();
      }
    }
  }

  private job(run: Job): Promise<void> {
    if (this.cancelled) return Promise.reject(new CancelledError());
    return new Promise<void>((resolve, reject) => {
      const entry = {
        run: (dt: number) => {
          if (!run(dt)) return false;
          resolve();
          return true;
        },
        reject,
      };
      this.jobs.add(entry);
    });
  }

  // ---- helpers for scene scripts ---------------------------------------------

  /** Pause-aware sleep. */
  wait(ms: number): Promise<void> {
    const target = this.elapsed + ms;
    return this.job(() => this.elapsed >= target);
  }

  /** Wait until the step has been playing for `ms` active milliseconds. */
  at(ms: number): Promise<void> {
    return this.job(() => this.elapsed >= ms);
  }

  private tween(ms: number, ease: (t: number) => number, step: (p: number) => void): Promise<void> {
    const dur = this.reduced ? Math.min(ms, 120) : ms;
    const start = this.elapsed;
    return this.job(() => {
      const t = dur <= 0 ? 1 : Math.min(1, (this.elapsed - start) / dur);
      step(this.reduced ? t : ease(t));
      return t >= 1;
    });
  }

  private query(selector: string): HTMLElement {
    const el = this.host.scroller()?.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`Timeline: no element matches "${selector}"`);
    return el;
  }

  /** Centre of an element in overlay-frame pixels. */
  private centreOf(el: HTMLElement) {
    const frame = this.host.frame()!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - frame.left + r.width / 2, y: r.top - frame.top + r.height / 2 };
  }

  /** Put the cursor somewhere instantly, as a fraction (0-1) of the frame. */
  placeCursor(fx: number, fy: number) {
    const f = this.host.frame()!.getBoundingClientRect();
    this.cursor = { x: f.width * fx, y: f.height * fy };
    this.host.setCursor(this.cursor.x, this.cursor.y);
    this.host.showCursor();
  }

  /** Put the cursor on the centre of an element instantly (to continue from the previous step). */
  placeCursorOn(selector: string, opts: { dx?: number; dy?: number } = {}) {
    const c = this.centreOf(this.query(selector));
    this.cursor = { x: c.x + (opts.dx ?? 0), y: c.y + (opts.dy ?? 0) };
    this.host.setCursor(this.cursor.x, this.cursor.y);
    this.host.showCursor();
  }

  /** Glide the cursor along an eased, slightly curved path to an element. `onMove` is called on every frame with the cursor's client position. */
  async moveCursorTo(selector: string, opts: { dx?: number; dy?: number; ms?: number; onMove?: (clientX: number, clientY: number) => void } = {}) {
    const { dx = 0, dy = 0, ms = 900, onMove } = opts;
    const el = this.query(selector);
    const c = this.centreOf(el);
    const from = { ...this.cursor };
    const to = { x: c.x + dx, y: c.y + dy };
    const len = Math.hypot(to.x - from.x, to.y - from.y);
    // Control point pushed sideways so the path bows a little instead of a straight line.
    const bow = this.reduced ? 0 : Math.min(60, len * 0.12);
    const nx = len ? -(to.y - from.y) / len : 0;
    const ny = len ? (to.x - from.x) / len : 0;
    const cp = { x: (from.x + to.x) / 2 + nx * bow, y: (from.y + to.y) / 2 + ny * bow };
    const origin = onMove ? this.host.frame()!.getBoundingClientRect() : null;
    await this.tween(ms, easeInOut, (p) => {
      const q = 1 - p;
      const x = q * q * from.x + 2 * q * p * cp.x + p * p * to.x;
      const y = q * q * from.y + 2 * q * p * cp.y + p * p * to.y;
      this.cursor = { x, y };
      this.host.setCursor(x, y);
      // Lets a scene drag something along with the cursor (client pixels, so it can be matched against any element).
      if (onMove && origin) onMove(x + origin.left, y + origin.top);
    });
  }

  /**
   * Draw along an SVG path with the cursor: it first glides to the start of the path, then follows the path at an even
   * speed for `ms`, calling `onProgress(0..1)` on every frame so the scene can reveal the stroke as the cursor passes
   * (e.g. stroke-dashoffset). The selector must match a <path> (or any SVG geometry element).
   */
  async followPath(selector: string, ms: number, onProgress: (p: number) => void, opts: { approachMs?: number } = {}) {
    const path = this.query(selector) as unknown as SVGGeometryElement;
    const len = path.getTotalLength();
    const frame = () => this.host.frame()!.getBoundingClientRect();
    const at = (p: number) => {
      const pt = path.getPointAtLength(p * len);
      const m = path.getScreenCTM()!;
      const f = frame();
      return { x: m.a * pt.x + m.c * pt.y + m.e - f.left, y: m.b * pt.x + m.d * pt.y + m.f - f.top };
    };
    const from = { ...this.cursor };
    const start = at(0);
    await this.tween(opts.approachMs ?? 500, easeInOut, (p) => {
      this.cursor = { x: from.x + (start.x - from.x) * p, y: from.y + (start.y - from.y) * p };
      this.host.setCursor(this.cursor.x, this.cursor.y);
    });
    await this.tween(ms, (t) => t, (p) => {
      this.cursor = at(p);
      this.host.setCursor(this.cursor.x, this.cursor.y);
      onProgress(p);
    });
  }

  /** Press the target (pressed state + ripple), then fire its real click handler. */
  async click(selector: string) {
    const el = this.query(selector);
    el.setAttribute("data-pressed", "true");
    this.host.press();
    this.host.ripple(this.cursor.x, this.cursor.y);
    await this.wait(120);
    el.click();
    await this.wait(140);
    el.removeAttribute("data-pressed");
  }

  /**
   * Scroll the page. A number is an absolute scrollTop in design pixels.
   * A selector scrolls the least needed to bring the element's bottom into view
   * (keeping its top below the sticky header of `topInset` px).
   */
  async scrollTo(target: number | string, ms = 1200, opts: { margin?: number; topInset?: number } = {}) {
    const scroller = this.host.scroller();
    if (!scroller) return;
    await this.scrollElement(scroller, target, ms, { topInset: 64, ...opts });
  }

  /** Same as scrollTo, for a scrolling panel inside the scene (e.g. a form column). */
  async scrollPanelTo(
    panelSelector: string,
    target: number | string,
    ms = 1200,
    opts: { margin?: number; topInset?: number } = {},
  ) {
    await this.scrollElement(this.query(panelSelector), target, ms, { topInset: 0, ...opts });
  }

  private async scrollElement(
    scroller: HTMLElement,
    target: number | string,
    ms: number,
    { margin = 24, topInset }: { margin?: number; topInset: number },
  ) {
    let to: number;
    if (typeof target === "number") {
      to = target;
    } else if (target === "top") {
      to = 0;
    } else if (target === "bottom") {
      to = scroller.scrollHeight - scroller.clientHeight;
    } else {
      const el = this.query(target);
      const s = scroller.getBoundingClientRect();
      const k = s.height / scroller.clientHeight || 1;
      const r = el.getBoundingClientRect();
      const top = (r.top - s.top) / k;
      const bottom = (r.bottom - s.top) / k;
      const need = bottom - (scroller.clientHeight - margin);
      const limit = top - topInset - margin;
      to = scroller.scrollTop + Math.max(0, Math.min(need, limit));
    }
    const from = scroller.scrollTop;
    await this.tween(ms, easeInOut, (p) => {
      scroller.scrollTop = from + (to - from) * p;
    });
  }

  /**
   * Type text into a scene field, one character at a time. The text is written to the
   * scene variable `field:<key>` (read it with useTimelineVar); `typing` holds the key
   * while typing and is cleared when done.
   */
  async typeText(key: string, text: string, opts: { msPerChar?: number } = {}) {
    const { msPerChar = 70 } = opts;
    this.setVar("typing", key);
    await this.tween(text.length * msPerChar, (t) => t, (p) => {
      this.setVar(`field:${key}`, text.slice(0, Math.min(text.length, Math.floor(p * text.length + 1e-6))));
    });
    this.setVar(`field:${key}`, text);
    this.setVar("typing", "");
  }

  /**
   * Paste a (long) value into a scene field instantly and flash the field for `ms`
   * (scenes style it with data-flash). Typing a long value would take too long.
   */
  paste(key: string, text: string, flashSelector: string, ms = 800) {
    this.setVar(`field:${key}`, text);
    this.flash(flashSelector, ms);
  }

  /** Glide to a field, click it and type into it. */
  async fill(selector: string, key: string, text: string, opts: { moveMs?: number; msPerChar?: number } = {}) {
    await this.moveCursorTo(selector, { ms: opts.moveMs ?? 550 });
    await this.click(selector);
    await this.typeText(key, text, { msPerChar: opts.msPerChar });
  }

  /**
   * Show a toast (the scene renders it with <ToastHost>). It dismisses itself after `ms`
   * of active time, so Pause freezes it too.
   */
  toast(text: string, ms = 3000) {
    const id = ++this.toastId;
    this.setVar("toast", { id, text, visible: true });
    this.wait(ms)
      .then(() => {
        if (this.toastId === id) this.setVar("toast", { id, text, visible: false });
      })
      .catch(() => {}); // cancelled with the step
  }

  /** Flash an element for `ms` (scenes style it with data-flash), e.g. a "Copied" tooltip. */
  flash(selector: string, ms = 1000) {
    const el = this.query(selector);
    el.setAttribute("data-flash", "true");
    this.wait(ms)
      .then(() => el.removeAttribute("data-flash"))
      .catch(() => {});
  }

  /** Mark a rule as satisfied (scenes style it with data-ticked), then pause briefly. */
  async tickRule(selector: string, holdMs = 250) {
    this.query(selector).setAttribute("data-ticked", "true");
    await this.wait(holdMs);
  }

  setUrl(url: string) {
    this.host.setUrl(url);
  }

  /** Ease a numeric scene variable from `from` to `to` (e.g. a count-up). */
  animateVar(key: string, from: number, to: number, ms: number): Promise<void> {
    return this.tween(ms, (t) => 1 - Math.pow(1 - t, 3), (p) => this.setVar(key, from + (to - from) * p));
  }

  showCaption(text: string) {
    this.host.setCaption(text);
  }
  hideCaption() {
    this.host.setCaption(null);
  }

  highlight(selector: string) {
    const el = this.query(selector);
    el.classList.add("tl-hl");
    this.highlighted.add(el);
  }
  clearHighlight() {
    this.highlighted.forEach((el) => el.classList.remove("tl-hl"));
    this.highlighted.clear();
  }

  /** Mark one element as hovered (scenes style it with data-hover). Pass null to clear. */
  hover(selector: string | null) {
    this.hovered?.removeAttribute("data-hover");
    this.hovered = null;
    if (selector) {
      this.hovered = this.query(selector);
      this.hovered.setAttribute("data-hover", "true");
    }
  }

  /** Wait for fonts and layout so the first frame doesn't jump, then restart the clock at 0. */
  async ready() {
    await document.fonts?.ready;
    await this.job(() => true);
    this.elapsed = 0;
  }
}
