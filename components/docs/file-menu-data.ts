import type { IconName } from "@/components/icons";

/** Items, labels, shortcuts and greyed-out flags of the File menu. Edit here, not in FileMenu.tsx. */

export type FileMenuItem = {
  id: string;
  label: string;
  icon: IconName;
  shortcut?: string;
  /** Greyed out: no hover, no click. */
  disabled?: boolean;
  /** Shows a right chevron and opens the Download submenu. */
  submenu?: boolean;
};

/** Groups are separated by a thin divider. */
export const FILE_MENU: FileMenuItem[][] = [
  [
    { id: "new", label: "New", icon: "fmNew" },
    { id: "open", label: "Open", icon: "fmOpen", shortcut: "Ctrl+O" },
    { id: "copy", label: "Make a copy", icon: "copy" },
  ],
  [
    { id: "share", label: "Share", icon: "edShare" },
    { id: "email", label: "Email", icon: "fmEmail" },
    { id: "download", label: "Download", icon: "download", submenu: true },
    { id: "drive", label: "Save to Drive", icon: "fmDrive" },
  ],
  [
    { id: "rename", label: "Rename", icon: "pencil" },
    { id: "move", label: "Move", icon: "fmMove", disabled: true },
    { id: "trash", label: "Move to trash", icon: "trash" },
  ],
  [{ id: "history", label: "Version history", icon: "edHistory" }],
  [
    { id: "details", label: "Details", icon: "fmInfo", disabled: true },
    { id: "language", label: "Language", icon: "globe", disabled: true },
  ],
  [{ id: "print", label: "Print", icon: "edPrint", shortcut: "Ctrl+P" }],
];

export const DOWNLOAD_MENU: { id: string; label: string; icon: IconName }[] = [
  { id: "docx", label: "Microsoft Word (.docx)", icon: "docFile" },
  { id: "pdf", label: "PDF Document (.pdf)", icon: "docFile" },
  { id: "html", label: "Web Page (.html)", icon: "globe" },
  { id: "md", label: "Markdown (.md)", icon: "docFile" },
  { id: "txt", label: "Plain Text (.txt)", icon: "docFile" },
];
