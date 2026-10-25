import { TABLE } from "@/components/docs/insert-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 21 - Insert a table. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 0:32-1:30). The recording's table (3 columns, a header row and two
 * rows, ready-made, no size picker) is kept; the sample cells below replace its text.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  insertTable: "Click Insert, then Table",
  cell: "Click a cell and type",
  firstRow: "Fill in the first row",
  nextRow: "Then the next row",
  ready: "Your table is ready",
};

/** Header row, then the body rows (from components/docs/insert-data.ts). */
export const CELLS = { header: TABLE.header, rows: TABLE.rows };

export const TITLE = SAMPLE_TITLE;
