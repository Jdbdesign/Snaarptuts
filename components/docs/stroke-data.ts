/*
 * The two sample strokes of Snaarp Doc steps 29 and 30: an original loopy signature and a wave-with-loop doodle (not the
 * recording's scribbles). Each is ONE SVG path. The dialogs draw it progressively (stroke-dashoffset) while the cursor
 * follows it (tl.followPath), and the page shows the same path once it is inserted. Edit the paths here.
 */

export type Stroke = {
  /** The coordinate box of the path. */
  viewBox: string;
  /** Width / height of the box, to size the drawing. */
  width: number;
  height: number;
  path: string;
  /** Pen width in the box's own units. */
  pen: number;
};

export const SIGNATURE: Stroke = {
  viewBox: "0 0 300 120",
  width: 300,
  height: 120,
  pen: 3.2,
  path:
    "M14 88 C24 48 40 14 54 26 C68 40 42 88 36 100 C33 106 48 92 60 72 C70 56 80 50 82 66 C84 80 70 94 84 90 " +
    "C98 86 106 60 114 62 C122 64 114 86 126 86 C142 86 148 52 158 54 C168 56 152 94 168 90 C188 84 192 58 204 62 " +
    "C216 66 202 96 222 88 C238 82 248 68 264 76 C276 82 282 94 294 86 M26 106 C96 96 186 102 278 98",
};

export const DOODLE: Stroke = {
  viewBox: "0 0 360 200",
  width: 360,
  height: 200,
  pen: 3,
  path:
    "M20 132 C50 42 92 42 112 102 C128 148 164 162 184 112 C202 68 162 42 148 82 C138 118 180 142 212 110 " +
    "C242 80 270 66 292 100 C308 124 328 130 346 98",
};

/**
 * The uploaded signature of step 43 (a second original signature, different from SIGNATURE): a neat black stroke on a
 * transparent background, as a small signature image would be. In the page it is drawn like an image.
 */
export const UPLOADED_SIGNATURE: Stroke = {
  viewBox: "0 0 260 110",
  width: 260,
  height: 110,
  pen: 3,
  path:
    "M16 78 C22 44 32 14 44 16 C56 18 42 62 40 80 M32 58 C48 50 62 48 72 54 C84 62 70 78 84 72 " +
    "C98 66 100 44 112 48 C122 52 112 76 126 70 C140 64 144 42 156 46 C166 50 158 74 172 70 " +
    "C190 64 206 54 240 60 M58 94 C108 86 168 92 244 82",
};
