import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 43 - Upload a signature image. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_esignature.mp4 (about 0:54-1:14). The computer's own file picker is left out: the cursor rests on
 * the drop zone and the sample signature image (components/docs/stroke-data.ts, UPLOADED_SIGNATURE) appears in the page.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  sign: "Click eSignature, then Sign document",
  upload: "Click Upload",
  drop: "Click the box and choose your signature image",
  done: "Your uploaded signature is in the document",
};

/** How long the cursor rests on the drop zone while the (left out) file picker would be open. */
export const PICKER_REST_MS = 1100;

export const TITLE = SAMPLE_TITLE;
