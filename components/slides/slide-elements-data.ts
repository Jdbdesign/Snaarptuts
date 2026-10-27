import type { SlideData } from "./slides-data";
import type { ChartEl, ShapeKind, SlideEl, TableEl, TextEl } from "./slide-elements";
import { SAMPLE_IMAGES } from "./sample-images";

/*
 * Sample content and copy for the Edit, View and Insert menus (Snaarp Slides steps 20-36). Sample data only: the recording
 * shows a wedding deck and real files, none of which is used. Edit here, not in the components.
 */

export const BLUE = "#2B6FEB";

const title = (id: string, x: number, y: number, w: number, text: string, align: TextEl["align"] = "left"): TextEl => ({
  id,
  kind: "text",
  x,
  y,
  w,
  h: 8,
  paras: [text],
  style: "title",
  align,
});

/** The deck every step of the Edit, View and Insert menus starts with: slide 2 ("Our services") is selected. */
export const EIV_DECK: SlideData[] = [
  {
    id: "e1",
    kind: "elements",
    elements: [
      title("s1-title", 8, 17, 84, "Acme Studio", "center"),
      { id: "s1-bar", kind: "shape", shape: "rounded", fill: BLUE, x: 45, y: 31, w: 10, h: 0.9 },
      { id: "s1-sub", kind: "text", style: "subtitle", x: 8, y: 34.5, w: 84, h: 5, paras: ["Design and branding services"], align: "center" },
    ],
  },
  {
    id: "e2",
    kind: "elements",
    elements: [
      title("s2-title", 8, 6, 44, "Our services"),
      { id: "s2-bullets", kind: "text", style: "body", bullets: true, x: 8, y: 17, w: 48, h: 16, paras: ["Brand identity", "Product design", "Launch campaigns"] },
      { id: "s2-shape", kind: "shape", shape: "rounded", fill: BLUE, x: 66, y: 17, w: 24, h: 15 },
    ],
  },
  {
    id: "e3",
    kind: "elements",
    elements: [
      title("s3-title", 8, 17, 54, "Next steps", "center"),
      { id: "s3-bar", kind: "shape", shape: "rounded", fill: BLUE, x: 30, y: 31, w: 10, h: 0.9 },
      { id: "s3-sub", kind: "text", style: "subtitle", x: 8, y: 34.5, w: 54, h: 5, paras: ["hello@acme-studio.com"], align: "center" },
    ],
  },
];

/** Step 36 (Format your text): the same deck, but the slide 2 title starts in regular weight so Bold is visible when it is switched on. */
export const FORMAT_DECK: SlideData[] = EIV_DECK.map((s) =>
  s.id === "e2" ? { ...s, elements: s.elements?.map((e) => (e.id === "s2-title" && e.kind === "text" ? { ...e, fmt: { bold: false } } : e)) } : s,
);

/** The EIV deck with slide 2's elements replaced (or added to). */
const deckWith = (change: (els: SlideEl[]) => SlideEl[]): SlideData[] => EIV_DECK.map((s) => (s.id === "e2" ? { ...s, elements: change(s.elements ?? []) } : s));
const shape = (id: string, kind: ShapeKind, x: number, y: number, w: number, h: number, fill: string): SlideEl => ({ id, kind: "shape", shape: kind, x, y, w, h, fill });

/**
 * Step 51 (Meet the toolbar tools): slide 2 plus a grey rounded box under the blue one. Paint format copies the blue box's fill onto it.
 * TOOLBAR_SPOTS is where each tool puts its element, so a text box, an image, a star, a line and the box all fit under the bullets.
 */
export const PAINT_DECK: SlideData[] = deckWith((els) => [...els, shape("paint-b", "rounded", 66, 44, 24, 10, "#9AA3B2")]);
export const PAINT_SOURCE = "s2-shape";
export const PAINT_TARGET = "paint-b";
export const TOOLBAR_SPOTS = {
  textBox: { x: 55, y: 36, w: 36, h: 6 },
  insertAt: {
    image: { x: 6, y: 36, w: 26, h: 17 },
    shape: { x: 36, y: 36, w: 14, h: 14 },
    line: { x: 36, y: 53, w: 26, h: 0 },
  },
};

/** Step 52 (Pick a layout): the deck plus a fourth, new slide with a title slide's placeholders; the step starts on it (slide 4). */
export const LAYOUT_DECK: SlideData[] = [
  ...EIV_DECK,
  { id: "sn1", kind: "elements", elements: [
    { id: "ph-title", kind: "text", x: 8, y: 17, w: 84, h: 8, paras: ["Click to add title"], style: "title", align: "center", placeholder: true },
    { id: "ph-sub", kind: "text", x: 8, y: 34, w: 84, h: 5, paras: ["Click to add subtitle"], style: "subtitle", align: "center", placeholder: true },
  ] },
];
export const LAYOUT_SELECTED = 3;

/** Steps 48 and 50 (Spelling, Preferences): slide 2 with its title misspelt ("serivces"). */
export const SPELL_DECK: SlideData[] = deckWith((els) => els.map((e) => (e.id === "s2-title" && e.kind === "text" ? { ...e, paras: ["Our serivces"] } : e)));

/**
 * Step 44 (Change the stacking order): slide 2 plus three overlapping squares under the bullets, back to front A, B, C. Each one has a
 * strip no other square covers (A's left edge, B's top edge, C's right edge), so the cursor can always click the one it means.
 */
export const STACK_DECK: SlideData[] = deckWith((els) => [
  ...els,
  shape("stack-a", "rect", 8, 39, 20, 14, "#E8590C"),
  shape("stack-b", "rect", 16, 34, 20, 14, "#1E7B3C"),
  shape("stack-c", "rect", 24, 39, 20, 14, "#7C3AED"),
]);
/** Where to point at each square so it is the one the cursor is visibly on (cqw). */
export const STACK_SPOTS = { "stack-a": { x: 11, y: 46 }, "stack-b": { x: 26, y: 36.5 }, "stack-c": { x: 41, y: 46 } };

/** Steps 45-47 (Align, Distribute, Rotate): slide 2 cut down to a centred title, so a shape moved to an edge has nothing to land on. */
const titleOnly = (els: SlideEl[]): SlideEl[] =>
  els.filter((e) => e.id === "s2-title").map((e) => (e.kind === "text" ? { ...e, x: 8, w: 84, align: "center" as const } : e));

/** Step 45: one circle, off-centre. */
export const ALIGN_DECK: SlideData[] = deckWith((els) => [...titleOnly(els), shape("align-dot", "ellipse", 56, 26, 14, 14, BLUE)]);
export const ALIGN_ID = "align-dot";

/** Step 46: three squares spread unevenly in both directions. */
export const DISTRIBUTE_DECK: SlideData[] = deckWith((els) => [
  ...titleOnly(els),
  shape("dist-a", "rounded", 8, 18, 9, 9, "#E8590C"),
  shape("dist-b", "rounded", 24, 24, 9, 9, "#1E7B3C"),
  shape("dist-c", "rounded", 70, 46, 9, 9, "#7C3AED"),
]);
export const DISTRIBUTE_IDS = ["dist-a", "dist-b", "dist-c"];

/** Step 47: one arrow, so the turn is easy to see. */
export const ROTATE_DECK: SlideData[] = deckWith((els) => [...titleOnly(els), shape("rot-arrow", "arrow", 38, 24, 24, 12, BLUE)]);
export const ROTATE_ID = "rot-arrow";

export const EIV_SELECTED = 1;
export const EIV_TITLE_ID = "s2-title";
export const EIV_BULLETS_ID = "s2-bullets";
export const EIV_SHAPE_ID = "s2-shape";

/** What Insert drops onto the slide, and where. Everything lands in the empty band under the bullets (y 35 and down). */
export const INSERTS = {
  textBox: { x: 8, y: 41, w: 62, h: 7 },
  image: { x: 8, y: 35, w: 30, h: 20, key: "desk" as const, alt: "Studio desk" },
  shapes: {
    rect: { x: 10, y: 38, w: 18, h: 13 },
    rounded: { x: 10, y: 38, w: 18, h: 13 },
    ellipse: { x: 10, y: 38, w: 18, h: 13 },
    triangle: { x: 10, y: 37, w: 16, h: 15 },
    diamond: { x: 10, y: 37, w: 16, h: 15 },
    star: { x: 34, y: 36, w: 16, h: 16 },
    arrow: { x: 10, y: 40, w: 24, h: 11 },
  } satisfies Record<ShapeKind, { x: number; y: number; w: number; h: number }>,
  line: { x: 8, y: 38, w: 40, h: 0 },
  table: { x: 8, y: 36, w: 60, h: 17 },
  chart: { x: 8, y: 35, w: 56, h: 20.5 },
};

export const NEW_TABLE: Pick<TableEl, "cells"> = { cells: [["", "", ""], ["", "", ""], ["", "", ""]] };

/** What the table step types: a header row and two priced rows (amounts are pounds, data only). */
export const TABLE_SAMPLE = [
  ["Service", "Price", "Time"],
  ["Logo design", "£450", "1 week"],
  ["Website", "£1,200", "4 weeks"],
];

export const CHART_SAMPLE: Pick<ChartEl, "title" | "data"> = {
  title: "Website visits by month",
  data: [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1800 },
    { label: "Mar", value: 2400 },
    { label: "Apr", value: 3100 },
    { label: "May", value: 3600 },
    { label: "Jun", value: 4200 },
  ],
};

export const CHART_PANEL = {
  title: "Chart properties",
  titleLabel: "Chart title",
  typeLabel: "Chart type",
  types: [
    { id: "bar", label: "Bar" },
    { id: "line", label: "Line" },
    { id: "pie", label: "Pie" },
  ],
  dataLabel: "Data",
  columns: ["Month", "Visits"],
};

export const PIE_COLORS = ["#2B6FEB", "#6C8CFF", "#9DB7FF", "#F5B400", "#F59E0B", "#8B93A7"];

/** The Insert > Image picker (our own: the recording shows the computer's file window, which is left out). */
export const IMAGE_PICKER = {
  title: "Insert an image",
  intro: "Choose one of the sample images.",
  images: [
    { id: "desk", name: "Studio desk", src: SAMPLE_IMAGES.desk },
    { id: "moodboard", name: "Moodboard", src: SAMPLE_IMAGES.moodboard },
    { id: "sketchbook", name: "Sketchbook", src: SAMPLE_IMAGES.sketchbook },
  ],
  insert: "Insert",
  cancel: "Cancel",
};

export const IMAGE_BY_KEY: Record<string, string> = SAMPLE_IMAGES;

export const SPEAKER_NOTES = {
  title: "Speaker notes",
  clear: "Clear",
  placeholder: "Type speaker notes here...",
  sample: "Welcome everyone and introduce Acme Studio.",
};

export const FIND_SLIDES = {
  query: "services",
  replacement: "solutions",
  doneToast: (n: number) => `${n} replacement${n === 1 ? "" : "s"} made`,
};

/** The lines the text-editing steps type. */
export const TYPED = {
  undoLine: "Book a free consultation",
  textBox: "Book a call: jane@acme-studio.com",
};

export const SOON = "Coming soon";

export const FULL_SCREEN_SLIDES = { next: "→", previous: "←" };
