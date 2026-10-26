import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 37 - Change page orientation (Format > Page orientation). All copy lives here, and the dialog's own
 * copy is in components/docs/format-menu-data.ts (PAGE_ORIENTATION). Recording: ref/docs/Snaarp_Doc_format.mp4
 * (Page orientation dialog at about 3:12). The recording only shows the dialog; the tutorial applies Landscape, then
 * switches back to Portrait so the page ends as it started.
 */

export { URLS } from "./step31-data";

export const CAPTIONS = {
  orientation: "Click Format, then Page orientation",
  applyTo: "Choose which pages to change",
  landscape: "Choose Landscape",
  ok: "Click OK",
  wide: "The page is now wider than it is tall",
  back: "Switch back whenever you like",
};

export const TITLE = SAMPLE_TITLE;
