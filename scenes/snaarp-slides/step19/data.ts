import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 19 - Move a presentation to Trash. The recording shows the Move to trash row and the Trash page (with
 * Restore and Delete); the confirm dialog and the "Moved to Trash" toast are ours. This is the last step of the File menu round:
 * the completion card follows the last step in tutorials/snaarp-slides.ts, so it moves when later menus are added.
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File, then Move to trash",
  confirm: "Confirm that you want to move it to Trash",
  click: "Click Move to trash",
  trash: "Your presentation is now in Trash",
  info: "Items in Trash are permanently deleted after 30 days",
  restore: "Click Restore to bring it back",
  restored: "It is back in your presentations",
};
