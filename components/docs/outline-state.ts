import { OUTLINE } from "./comments-data";

/*
 * The tabs of the Document outline panel (Snaarp Doc step 17). Pure data: outline-timeline.ts changes it from the
 * scripts, OutlinePanel.tsx draws it. The page of each tab is kept as an editor state (see outline-timeline.ts).
 */

export type OutlineTab = { id: string; name: string };

export type OutlineTabs = {
  tabs: OutlineTab[];
  /** The id of the selected tab (light blue row, blue bar); its page is the one on screen. */
  active: string;
  /** The number the next new tab gets ("Tab 2", "Tab 3", ...). */
  nextNumber: number;
};

/** What the panel starts with: one tab. */
export const DEFAULT_OUTLINE_TABS: OutlineTabs = {
  tabs: [{ id: "tab-1", name: OUTLINE.tabName(1) }],
  active: "tab-1",
  nextNumber: 2,
};
