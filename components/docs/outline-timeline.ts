import type { Timeline } from "@/lib/timeline";
import { OUTLINE } from "./comments-data";
import { createEditor, type EditorState } from "./editor-state";
import { clickPanel, getEditor, setEditor } from "./editor-timeline";
import { DEFAULT_OUTLINE_TABS, type OutlineTabs } from "./outline-state";

/*
 * Timeline helpers that drive the Document outline panel's tabs (Snaarp Doc step 17). The scene variables are
 * `outlineOpen` (panel open), `outlineTabs` (the tab list, see outline-state.ts) and `tabDocs` (the saved page of every
 * tab that is not on screen). The page on screen is always the scene variable `editor`: switching tabs saves it into
 * `tabDocs` and loads the other page, so what was typed or highlighted comes back when you return. A new tab starts as a
 * blank page. Call initTabs first in every script that shows the panel (it also resets the extra tabs on replay).
 */

/** A blank page: no text, so the footer reads "0 words". */
export const BLANK_PAGE: EditorState = createEditor([]);

const TABS = "outlineTabs";
const DOCS = "tabDocs";

export const getTabs = (tl: Timeline) => tl.getVar<OutlineTabs>(TABS, DEFAULT_OUTLINE_TABS);
const getDocs = (tl: Timeline) => tl.getVar<Record<string, EditorState>>(DOCS, {});

/** Call first: one tab, the panel closed. */
export function initTabs(tl: Timeline) {
  tl.setVar(TABS, DEFAULT_OUTLINE_TABS);
  tl.setVar(DOCS, {});
  tl.setVar("outlineOpen", false);
}

/** Keep the page on screen with its tab, then show the page of `nextId`. */
function showTab(tl: Timeline, nextId: string, nextDoc: EditorState) {
  const { active } = getTabs(tl);
  tl.setVar(DOCS, { ...getDocs(tl), [active]: getEditor(tl) });
  setEditor(tl, nextDoc);
  tl.setVar(TABS, { ...getTabs(tl), active: nextId });
}

/** Add "Tab <n>" under the last tab, select it and show a blank page. */
export function addTab(tl: Timeline) {
  const s = getTabs(tl);
  const id = `tab-${s.nextNumber}`;
  tl.setVar(TABS, { ...s, tabs: [...s.tabs, { id, name: OUTLINE.tabName(s.nextNumber) }], nextNumber: s.nextNumber + 1 });
  showTab(tl, id, BLANK_PAGE);
}

/** Select a tab: its saved page comes back. */
export function selectTab(tl: Timeline, id: string) {
  if (getTabs(tl).active === id) return;
  showTab(tl, id, getDocs(tl)[id] ?? BLANK_PAGE);
}

/** Click the plus: the cursor goes there, rings it, clicks, and the new tab appears. */
export async function clickAddTab(tl: Timeline, opts: { ms?: number } = {}) {
  await clickPanel(tl, "[data-tl=outline-add]", { ms: opts.ms ?? 700 });
  addTab(tl);
}

/** Click a tab row: the cursor goes there, rings it, clicks, and that tab's page comes back. */
export async function clickTab(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  await clickPanel(tl, `[data-tl=outline-tab-${id}]`, { ms: opts.ms ?? 700 });
  selectTab(tl, id);
}
