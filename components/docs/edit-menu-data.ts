import type { IconName } from "@/components/icons";
import { canRedo, hasSelection, type EditorState } from "./editor-state";

/** Items, labels and shortcuts of the Edit menu. Edit here, not in EditMenu.tsx. */

export type EditItemId = "undo" | "redo" | "cut" | "copy" | "paste" | "paste-plain" | "select-all" | "delete" | "find";

export type EditMenuItem = { id: EditItemId; label: string; icon: IconName; shortcut: string };

/** Groups are separated by a thin divider. */
export const EDIT_MENU: EditMenuItem[][] = [
  [
    { id: "undo", label: "Undo", icon: "edUndo", shortcut: "Ctrl+Z" },
    { id: "redo", label: "Redo", icon: "edRedo", shortcut: "Ctrl+Y" },
  ],
  [
    { id: "cut", label: "Cut", icon: "emCut", shortcut: "Ctrl+X" },
    { id: "copy", label: "Copy", icon: "copy", shortcut: "Ctrl+C" },
    { id: "paste", label: "Paste", icon: "emPaste", shortcut: "Ctrl+V" },
    { id: "paste-plain", label: "Paste without formatting", icon: "emPastePlain", shortcut: "Ctrl+Shift+V" },
  ],
  [
    { id: "select-all", label: "Select all", icon: "emSelectAll", shortcut: "Ctrl+A" },
    { id: "delete", label: "Delete", icon: "trash", shortcut: "" },
  ],
  [{ id: "find", label: "Find and replace", icon: "search", shortcut: "Ctrl+H" }],
];

/** Greyed-out items depend on the editor: Redo needs something undone; Cut, Copy and Delete need a selection. */
export function editItemDisabled(id: EditItemId, editor: EditorState): boolean {
  if (id === "redo") return !canRedo(editor);
  if (id === "cut" || id === "copy" || id === "delete") return !hasSelection(editor);
  return false;
}
