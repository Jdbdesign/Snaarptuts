import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 29 - Add an eSignature. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 5:15-5:35). The recording's own scribble is replaced by an original
 * sample stroke (components/docs/stroke-data.ts). The button reads "Insert Signature" in the frames.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  click: "Click where the signature should go",
  insert: "Click Insert, then eSignature",
  draw: "Draw your signature with your mouse",
  tabs: "You can also type, upload or request a signature",
  button: "Click Insert signature",
  done: "Your signature is in the document",
};

/** The block the signature goes under (the Contacts paragraph). */
export const LAST_BLOCK = "p4";

/** The tabs that are only hovered, in order. */
export const HOVER_TABS = ["type", "upload", "request"] as const;

export const TITLE = SAMPLE_TITLE;
