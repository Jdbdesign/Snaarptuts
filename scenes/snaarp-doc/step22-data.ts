import { LINK } from "@/components/docs/insert-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 22 - Insert a link. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (about 1:25-2:00). The sample heading and web address replace the
 * recording's text and address.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  select: "Select the text you want to link",
  insertLink: "Click Insert, then Link",
  type: "Type the web address",
  newTab: "Keep Open in new tab ticked so readers stay on your page",
  insert: "Click Insert",
  done: "The text is now a link",
};

/** The id of the link (hook doc-link-<id>) and the address typed into the dialog. */
export const LINK_ID = "link1";
export const ADDRESS = LINK.url;

export const TITLE = SAMPLE_TITLE;
