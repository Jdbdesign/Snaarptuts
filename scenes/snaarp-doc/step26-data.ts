import { WATERMARK } from "@/components/docs/insert-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 26 - Add a watermark. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 3:25-4:00). The recording's own watermark word is replaced by the
 * sample "Draft". The frames only show the panel opening, the text being typed and the watermark across the page; the
 * Diagonal / Horizontal radios and Remove watermark are hovered only (the frames never click them).
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  open: "Click Insert, then Page elements, then Watermark",
  text: "Choose Text to write your own watermark",
  type: "Type the watermark text",
  transparency: "Transparency controls how faint it is",
  layout: "Choose a diagonal or horizontal layout",
  remove: "Use Remove watermark to take it off",
  close: "Click X to close the panel",
};

export const WATERMARK_TEXT = WATERMARK.text;

export const TITLE = SAMPLE_TITLE;
