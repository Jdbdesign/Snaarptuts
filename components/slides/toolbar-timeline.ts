import type { Timeline } from "@/lib/timeline";
import { insertLine, insertShape, redo, undo } from "./slides-edit";
import { applyLayout, applyTheme, setSlideBg, setTransition, startPaint } from "./slides-format";
import type { ShapeKind } from "./slide-elements";
import { BACKGROUNDS, type ThemeId } from "./slides-toolbar-data";
import { pressOn } from "./slides-timeline";

/*
 * Timeline helpers for the toolbar dropdowns (Theme, Background, Layout, Transition, zoom, shape) of Snaarp Slides (steps 38-53). Same
 * pattern as menu-timeline.ts: move, ring, click, then do what the click does. The open card is the scene variable `toolMenu`.
 */

export type ToolbarMenu = "background" | "layout" | "theme" | "transition" | "zoom" | "shape";

/** The toolbar element each card hangs under. */
const BUTTON: Record<ToolbarMenu, string> = {
  background: "tb-background",
  layout: "tb-layout",
  theme: "tb-theme",
  transition: "tb-transition",
  zoom: "tool-zoom",
  shape: "tool-shape",
};

const option = (menu: ToolbarMenu, id: string) => `[data-tl=tbo-${menu}-${id}]`;

/** What a plain toolbar button does when it is clicked. (Text, zoom and shape need more than one move: see the step 51 script.) */
const TOOL_ACTIONS: Record<string, (tl: Timeline) => void> = {
  undo,
  redo,
  print: (tl) => tl.setVar("print", true),
  paint: startPaint,
  select: (tl) => tl.setVar("tool", "select"),
  text: (tl) => tl.setVar("tool", "text"),
  image: (tl) => tl.setVar("dialog", "insertImage"),
  line: insertLine,
};

/** Move to a toolbar button, ring it, click it and do what it does. */
export async function clickTool(tl: Timeline, id: keyof typeof TOOL_ACTIONS, opts: { ms?: number } = {}) {
  await pressOn(tl, `[data-tl=tool-${id}]`, { ms: opts.ms ?? 700 });
  TOOL_ACTIONS[id](tl);
}

/** Click the toolbar button and open its card. */
export async function openToolbar(tl: Timeline, menu: ToolbarMenu, opts: { ms?: number } = {}) {
  await pressOn(tl, `[data-tl=${BUTTON[menu]}]`, { ms: opts.ms ?? 700 });
  tl.setVar("toolMenu", menu);
  await tl.wait(120);
}

export function closeToolbar(tl: Timeline) {
  tl.hover(null);
  tl.setVar("toolMenu", "");
}

/** Move onto an option and hover it. */
export async function hoverOption(tl: Timeline, menu: ToolbarMenu, id: string, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(option(menu, id), { ms: opts.ms ?? 320, dx: -10 });
  tl.hover(option(menu, id));
}

/** What choosing an option does. */
const TOOLBAR_ACTIONS: Record<ToolbarMenu, (tl: Timeline, id: string) => void> = {
  theme: (tl, id) => applyTheme(tl, id as ThemeId),
  background: (tl, id) => setSlideBg(tl, BACKGROUNDS.find((b) => b.id === id)?.color ?? null),
  layout: (tl, id) => applyLayout(tl, id),
  transition: (tl, id) => setTransition(tl, id),
  zoom: (tl, id) => tl.setVar("zoom", id),
  shape: (tl, id) => insertShape(tl, id as ShapeKind),
};

/** Move onto an option, ring it, click it, close the card and do what the option does. */
export async function chooseOption(tl: Timeline, menu: ToolbarMenu, id: string, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(option(menu, id), { ms: opts.ms ?? 420, dx: -10 });
  tl.hover(option(menu, id));
  tl.highlight(option(menu, id));
  await tl.wait(150);
  await tl.click(option(menu, id));
  tl.clearHighlight();
  closeToolbar(tl);
  TOOLBAR_ACTIONS[menu](tl, id);
}
