import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 47 - Change the zoom (toolbar). All copy lives here. Recording: ref/docs/Snaarp_Doc_toolbar.mp4
 * (the Zoom box with its "Zoom" tooltip at about 0:10; the list is never opened, so the options are the usual ones).
 * Start state: the sample document at 100%.
 */

export { URLS } from "./step31-data";

export const START_EDITOR = SAMPLE_EDITOR;

export const CAPTIONS = {
  box: "Click the zoom box",
  big: "Choose 150%",
  bigger: "The page is bigger, so small text is easier to read",
  again: "Open the zoom box again",
  normal: "Choose 100% to go back to normal size",
  done: "The footer shows the zoom too",
};

export const TITLE = SAMPLE_TITLE;
