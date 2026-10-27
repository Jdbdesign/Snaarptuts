/*
 * The Edit, View and Insert menus of Snaarp Slides: labels, order, dividers, shortcut hints, arrows and greyed rows, read from the
 * recording (ref/slides/Snaarp_Slides_edit_view_insert.mp4, Edit 0:00-0:08, View 0:09-0:40, Insert 0:40-1:47). Edit here, not in the components.
 */

export type DropdownId = "edit" | "view" | "insert" | "format" | "slide" | "arrange" | "tools";

export type MenuRow = {
  id: string;
  label: string;
  shortcut?: string;
  /** Opens this submenu (shows a right arrow). */
  sub?: string;
  /** Greyed out all the time: it shows the "Coming soon" tooltip when hovered. */
  soon?: boolean;
  /** Greyed out until a condition holds (see `needs`): something selected, something copied, or three or more things selected. */
  needs?: "selection" | "clipboard" | "three";
  /** A tick shows in front of the label while this setting is on. */
  toggle?: boolean;
  /** The label while the setting `checks[id]` is on (Skip slide -> Unskip slide). */
  altLabel?: string;
};

/** A row of a submenu. `divider` draws a hairline above it. */
export type SubRow = { id: string; label: string; divider?: boolean };

/*
 * Format, Slide, Arrange and Tools (steps 36-50) were read from ref/slides/Snaarp_Slides_final.mp4 (Format 0-12 s, Slide 12-40 s,
 * Arrange 40-58 s, Tools 56-66 s). The recording greys Format and Arrange out because nothing is selected; the submenus of Align and
 * indent and Line spacing are not opened in it, so their rows are ours. Change layout and Transition (Slide menu), Group and Ungroup stay
 * greyed with the "Coming soon" tooltip.
 */
export const DROPDOWNS: Record<DropdownId, MenuRow[][]> = {
  edit: [
    [
      { id: "undo", label: "Undo", shortcut: "Ctrl+Z" },
      { id: "redo", label: "Redo", shortcut: "Ctrl+Y" },
    ],
    [
      { id: "cut", label: "Cut", shortcut: "Ctrl+X", needs: "selection" },
      { id: "copy", label: "Copy", shortcut: "Ctrl+C", needs: "selection" },
      { id: "paste", label: "Paste", shortcut: "Ctrl+V", needs: "clipboard" },
    ],
    [
      { id: "delete", label: "Delete", shortcut: "Delete", needs: "selection" },
      { id: "duplicate", label: "Duplicate", needs: "selection" },
    ],
    [
      { id: "find", label: "Find and replace" },
      { id: "selectall", label: "Select all", shortcut: "Ctrl+A" },
    ],
  ],
  view: [
    [
      { id: "notes", label: "Speaker notes", toggle: true },
      { id: "ruler", label: "Show ruler", toggle: true },
      { id: "guides", label: "Show guides", toggle: true },
    ],
    [{ id: "zoom", label: "Zoom", sub: "zoom" }],
    [
      { id: "fullscreen", label: "Full screen" },
      { id: "animations", label: "Animations panel", soon: true },
    ],
  ],
  insert: [
    [
      { id: "textbox", label: "Text box" },
      { id: "image", label: "Image" },
      { id: "shape", label: "Shape", sub: "shape" },
      { id: "line", label: "Line" },
    ],
    [
      { id: "table", label: "Table" },
      { id: "chart", label: "Chart", sub: "chart" },
    ],
    [
      { id: "video", label: "Video", soon: true },
      { id: "audio", label: "Audio", soon: true },
      { id: "wordart", label: "Word art", soon: true },
    ],
  ],
  format: [
    [
      { id: "bold", label: "Bold", shortcut: "Ctrl+B", needs: "selection", toggle: true },
      { id: "italic", label: "Italic", shortcut: "Ctrl+I", needs: "selection", toggle: true },
      { id: "underline", label: "Underline", shortcut: "Ctrl+U", needs: "selection", toggle: true },
      { id: "strike", label: "Strikethrough", needs: "selection", toggle: true },
    ],
    [
      { id: "align", label: "Align and indent", sub: "align", needs: "selection" },
      { id: "spacing", label: "Line spacing", sub: "spacing", needs: "selection" },
    ],
    [
      { id: "theme", label: "Theme" },
      { id: "background", label: "Slide background" },
    ],
  ],
  slide: [
    [
      { id: "new", label: "New slide" },
      { id: "duplicate", label: "Duplicate slide" },
      { id: "delete", label: "Delete slide" },
    ],
    [{ id: "skip", label: "Skip slide", altLabel: "Unskip slide" }],
    [
      { id: "layout", label: "Change layout", soon: true },
      { id: "transition", label: "Transition", soon: true },
    ],
  ],
  arrange: [
    [
      { id: "front", label: "Bring to front", needs: "selection" },
      { id: "forward", label: "Bring forward", needs: "selection" },
      { id: "backward", label: "Send backward", needs: "selection" },
      { id: "back", label: "Send to back", needs: "selection" },
    ],
    [
      { id: "alignh", label: "Align horizontally", sub: "alignh", needs: "selection" },
      { id: "alignv", label: "Align vertically", sub: "alignv", needs: "selection" },
    ],
    [
      { id: "disth", label: "Distribute horizontally", needs: "three" },
      { id: "distv", label: "Distribute vertically", needs: "three" },
    ],
    [
      { id: "group", label: "Group", soon: true },
      { id: "ungroup", label: "Ungroup", soon: true },
    ],
    [
      { id: "rotcw", label: "Rotate clockwise", needs: "selection" },
      { id: "rotccw", label: "Rotate counterclockwise", needs: "selection" },
    ],
  ],
  tools: [
    [
      { id: "spelling", label: "Spelling" },
      { id: "explore", label: "Explore" },
    ],
    [{ id: "prefs", label: "Preferences" }],
  ],
};

export const DROPDOWN_SUBS: Record<string, SubRow[]> = {
  zoom: [
    { id: "50", label: "50%" },
    { id: "75", label: "75%" },
    { id: "100", label: "100%" },
    { id: "125", label: "125%" },
    { id: "150", label: "150%" },
    { id: "200", label: "200%" },
    { id: "fit", label: "Fit" },
  ],
  shape: [
    { id: "rect", label: "Rectangle" },
    { id: "ellipse", label: "Ellipse" },
    { id: "triangle", label: "Triangle" },
    { id: "diamond", label: "Diamond" },
    { id: "star", label: "Star" },
    { id: "arrow", label: "Arrow" },
  ],
  align: [
    { id: "left", label: "Left" },
    { id: "center", label: "Center" },
    { id: "right", label: "Right" },
    { id: "justify", label: "Justify" },
    { id: "indent-more", label: "Increase indent", divider: true },
    { id: "indent-less", label: "Decrease indent" },
  ],
  spacing: [
    { id: "single", label: "Single" },
    { id: "s115", label: "1.15" },
    { id: "s15", label: "1.5" },
    { id: "double", label: "Double" },
  ],
  alignh: [
    { id: "left", label: "Left" },
    { id: "center", label: "Center" },
    { id: "right", label: "Right" },
  ],
  alignv: [
    { id: "top", label: "Top" },
    { id: "middle", label: "Middle" },
    { id: "bottom", label: "Bottom" },
  ],
  chart: [
    { id: "bar", label: "Bar chart" },
    { id: "line", label: "Line chart" },
    { id: "pie", label: "Pie chart" },
  ],
};

/** The zoom choices as page sizes: 1 = the page fits the canvas ("Fit" and "100%" both read as this size here). */
export const ZOOM_FACTOR: Record<string, number> = { "50": 0.5, "75": 0.75, "100": 1, "125": 1.25, "150": 1.5, "200": 2, fit: 1 };
export const ZOOM_LABEL: Record<string, string> = { "50": "50%", "75": "75%", "100": "100%", "125": "125%", "150": "150%", "200": "200%", fit: "Fit" };
