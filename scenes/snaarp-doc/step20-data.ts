import { IMAGE } from "@/components/docs/insert-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 20 - Insert an image. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 0:01-0:45). The computer's own file picker is left out, and the
 * sample banner (components/docs/ImageBlock.tsx) replaces the recording's news image.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  insertImage: "Click Insert, then Image",
  choose: "Choose a picture from your computer",
  select: "Click the image to select it",
  resize: "Drag a corner to resize it",
};

/** The toast texts: uploading, then done. */
export const TOASTS = { uploading: IMAGE.uploading, uploaded: IMAGE.uploaded };

export const TITLE = SAMPLE_TITLE;
