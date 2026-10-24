/** Copy of the Find and replace panel. Edit here, not in FindReplacePanel.tsx. */

export const FIND_PANEL = {
  title: "Find and replace",
  findPlaceholder: "Find",
  replacePlaceholder: "Replace with",
  matchCase: "Match case",
  noResults: "No results",
  buttons: { replace: "Replace", replaceAll: "Replace all", previous: "Previous", next: "Next" },
  /** "1 of 7" */
  count: (current: number, total: number) => `${current} of ${total}`,
};
