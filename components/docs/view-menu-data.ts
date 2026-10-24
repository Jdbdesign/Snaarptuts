import type { IconName } from "@/components/icons";
import type { EditorMode } from "./editor-data";

/** Items, labels, shortcuts and greyed-out flags of the View menu. Edit here, not in ViewMenu.tsx. */

export type ViewItemId = "mode" | "comments" | "outline" | "print-layout" | "ruler" | "equation" | "non-printing" | "fullscreen";

export type ViewMenuItem = {
  id: ViewItemId;
  label: string;
  icon?: IconName;
  shortcut?: string;
  /** Greyed out: no hover, no click. */
  disabled?: boolean;
  /** Opens the Mode submenu (right chevron). */
  submenu?: boolean;
  /** A toggle: shows a check when it is on. */
  toggle?: boolean;
};

/** Groups are separated by a thin divider. */
export const VIEW_MENU: ViewMenuItem[][] = [
  [
    { id: "mode", label: "Mode", icon: "eye", submenu: true },
    { id: "comments", label: "Comments", icon: "edComment" },
    { id: "outline", label: "Document outline", icon: "vmOutline" },
  ],
  [
    { id: "print-layout", label: "Show print layout", toggle: true },
    { id: "ruler", label: "Show ruler", icon: "vmRuler", toggle: true },
    { id: "equation", label: "Show equation toolbar", disabled: true },
    { id: "non-printing", label: "Show non-printing characters", shortcut: "Ctrl+Shift+P", toggle: true },
  ],
  [{ id: "fullscreen", label: "Full screen", icon: "edFullscreen" }],
];

export const MODE_MENU: { id: EditorMode; label: string }[] = [
  { id: "editing", label: "Editing" },
  { id: "suggesting", label: "Suggesting" },
  { id: "viewing", label: "Viewing" },
];

/** Which toggles are on when a scene starts (full screen is a view state too: off). */
export const VIEW_DEFAULTS = { printLayout: true, ruler: true, nonPrinting: false, fullScreen: false };

/** Copy of the full-screen view (View > Full screen). It is simulated inside the browser frame. */
export const FULL_SCREEN = {
  hint: "Press Esc to exit full screen",
  key: "Esc",
  /** The hint fades out after this many ms of active time. */
  hintMs: 3000,
};
