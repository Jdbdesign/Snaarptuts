import { IMAGE } from "@/components/docs/insert-data";
import { practiceEditor, practiceId } from "@/components/docs/format-state";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 52 - Insert a link and an image (toolbar). All copy and the practice line live here.
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltips "Insert link (Ctrl+K)" and the image button at about 0:34-0:40). The link dialog is the
 * one of step 22 (it opens from the toolbar button too); the image uses the sample banner and no file picker, as in step 20.
 */

export { URLS } from "./step31-data";

export const PRACTICE = "Visit our site for the full brief.";
export const START_EDITOR = practiceEditor([PRACTICE]);
export const PRACTICE_ID = practiceId(0);

export const TARGET = { context: "our site", start: 0, end: 8 };
export const ADDRESS = "acme-studio.com";
export const LINK_ID = "link-toolbar";

export const CAPTIONS = {
  select: "Select the words you want to link",
  link: "Click Insert link",
  type: "Type the web address",
  insert: "Click Insert",
  linked: "The words are now a link",
  image: "Click Insert image to add a picture",
  uploading: "Choose a picture from your computer",
  done: "The picture is on the page",
};

/** The toast texts: uploading, then done (the same as step 20). */
export const TOASTS = { uploading: IMAGE.uploading, uploaded: IMAGE.uploaded };

export const TITLE = SAMPLE_TITLE;
