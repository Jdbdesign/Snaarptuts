import type { SlideEl } from "./slide-elements";

/*
 * Sample content and copy for the Format, Slide, Arrange and Tools menus, the toolbar dropdowns and the header buttons
 * (Snaarp Slides steps 36-56). Labels and order were read from the recording (ref/slides/Snaarp_Slides_final.mp4); the colours
 * of the themes and the layout drawings are ours (the recording only shows swatches and names). Edit here, not in the components.
 */

export type ThemeId = "simple-light" | "simple-dark" | "modern-dark" | "ocean-blue" | "forest-green" | "purple-dream";
export type Theme = { id: ThemeId; label: string; swatch: string; bg: string; fg: string; muted: string; accent: string };

/** The six themes of the Theme list. A theme styles the whole deck: slide colour, text colours and the accent (blue) shapes. */
export const THEMES: Theme[] = [
  { id: "simple-light", label: "Simple Light", swatch: "#FFFFFF", bg: "#FFFFFF", fg: "#1F2430", muted: "#6B7280", accent: "#2B6FEB" },
  { id: "simple-dark", label: "Simple Dark", swatch: "#212226", bg: "#212226", fg: "#F4F5F7", muted: "#A6ABB6", accent: "#8AB4F8" },
  { id: "modern-dark", label: "Modern Dark", swatch: "#14161C", bg: "#0E1118", fg: "#E8EBF5", muted: "#9AA3BA", accent: "#7C6CF2" },
  { id: "ocean-blue", label: "Ocean Blue", swatch: "#1565C0", bg: "#1565C0", fg: "#FFFFFF", muted: "#CFE2FA", accent: "#FFC857" },
  { id: "forest-green", label: "Forest Green", swatch: "#1B5E20", bg: "#1B5E20", fg: "#FFFFFF", muted: "#CBE6CC", accent: "#F2C94C" },
  { id: "purple-dream", label: "Purple Dream", swatch: "#4A148C", bg: "#4A148C", fg: "#FFFFFF", muted: "#DCC7F2", accent: "#F4A6D7" },
];
export const DEFAULT_THEME: ThemeId = "simple-light";
export const themeOf = (id: string): Theme => THEMES.find((t) => t.id === id) ?? THEMES[0];

/** The Background swatches (two rows of four), for the current slide only. */
export const BACKGROUNDS: { id: string; label: string; color: string }[] = [
  { id: "white", label: "White", color: "#FFFFFF" },
  { id: "light-grey", label: "Light grey", color: "#E9ECF1" },
  { id: "black", label: "Black", color: "#111111" },
  { id: "navy", label: "Dark navy", color: "#14213D" },
  { id: "blue", label: "Blue", color: "#1A73E8" },
  { id: "green", label: "Green", color: "#1E7B3C" },
  { id: "purple", label: "Purple", color: "#5B2A9E" },
  { id: "orange", label: "Orange-red", color: "#D9480F" },
];

export const TRANSITIONS: { id: string; label: string }[] = [
  { id: "none", label: "None" },
  { id: "fade", label: "Fade" },
  { id: "slide-right", label: "Slide from right" },
  { id: "slide-left", label: "Slide from left" },
  { id: "flip", label: "Flip" },
  { id: "cube", label: "Cube" },
  { id: "dissolve", label: "Dissolve" },
];

export const LAYOUT_LIST: { id: string; label: string }[] = [
  { id: "blank", label: "Blank" },
  { id: "title", label: "Title slide" },
  { id: "title-content", label: "Title and content" },
  { id: "section", label: "Section header" },
  { id: "two-content", label: "Two content" },
  { id: "caption", label: "Caption" },
];

/** Zoom choices of the toolbar's zoom box (the same list as View > Zoom). */
export const TOOLBAR_ZOOMS = ["50", "75", "100", "125", "150", "200", "fit"];

const ph = (id: string, x: number, y: number, w: number, h: number, text: string, style: "title" | "subtitle" | "body", extra: Partial<SlideEl> = {}): SlideEl =>
  ({ id, kind: "text", x, y, w, h, paras: [text], style, placeholder: true, ...extra }) as SlideEl;

/** What each layout puts on a slide: grey "Click to add ..." placeholders. */
export const LAYOUT_ELEMENTS: Record<string, SlideEl[]> = {
  blank: [],
  title: [
    ph("ph-title", 8, 17, 84, 8, "Click to add title", "title", { align: "center" }),
    ph("ph-sub", 8, 34, 84, 5, "Click to add subtitle", "subtitle", { align: "center" }),
  ],
  "title-content": [
    ph("ph-title", 8, 6, 84, 8, "Click to add title", "title"),
    ph("ph-body", 8, 18, 84, 30, "Click to add text", "body"),
  ],
  section: [
    ph("ph-title", 8, 19, 70, 8, "Click to add section title", "title"),
    ph("ph-sub", 8, 31, 70, 5, "Click to add subtitle", "subtitle"),
  ],
  "two-content": [
    ph("ph-title", 8, 6, 84, 8, "Click to add title", "title"),
    ph("ph-left", 8, 18, 39, 28, "Click to add text", "body"),
    ph("ph-right", 53, 18, 39, 28, "Click to add text", "body"),
  ],
  caption: [
    ph("ph-body", 8, 6, 84, 34, "Click to add content", "body", { align: "center" }),
    ph("ph-caption", 8, 45, 84, 5, "Click to add caption", "subtitle", { align: "center" }),
  ],
};

export const SLIDE_COPY = {
  newSlideToast: "New slide added",
  duplicateToast: "Slide duplicated",
  deleteToast: (n: number) => `Slide ${n} deleted`,
  undo: "Undo",
  skipped: "Skipped",
};
