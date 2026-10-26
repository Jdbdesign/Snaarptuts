import type { IconName } from "@/components/icons";

/** Items, groups, shortcuts and greyed-out flags of the Tools menu. Edit here, not in ToolsMenu.tsx. */

export type ToolsItemId = "spelling" | "word-count" | "outline" | "dictionary" | "notifications" | "preferences" | "accessibility";

export type ToolsMenuItem = {
  id: ToolsItemId;
  label: string;
  icon: IconName;
  shortcut?: string;
  /** Greyed out: no hover, no click. */
  disabled?: boolean;
};

/** Copy of the Word count dialog (Tools > Word count). The numbers are computed live from the document (word-count.ts). */
export const WORD_COUNT = {
  title: "Word count",
  subtitle: "Counts for the current document.",
  words: "Words",
  characters: "Characters",
  charactersNoSpaces: "Characters (no spaces)",
  pages: "Pages",
  done: "Done",
};

/** Groups are separated by a thin divider. Only Word count and Document outline are active (as in the recording). */
export const TOOLS_MENU: ToolsMenuItem[][] = [
  [
    { id: "spelling", label: "Spelling and grammar", icon: "tlSpell", disabled: true },
    { id: "word-count", label: "Word count", icon: "tlWordCount", shortcut: "Ctrl+Shift+C" },
    { id: "outline", label: "Document outline", icon: "vmOutline", shortcut: "Ctrl+Alt+H" },
  ],
  [{ id: "dictionary", label: "Dictionary", icon: "tlDictionary", shortcut: "Ctrl+Shift+Y", disabled: true }],
  [
    { id: "notifications", label: "Notification settings", icon: "bell", disabled: true },
    { id: "preferences", label: "Preferences", icon: "gear", disabled: true },
    { id: "accessibility", label: "Accessibility", icon: "tlAccess", disabled: true },
  ],
];
