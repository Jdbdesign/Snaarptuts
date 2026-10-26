import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 18 - Options that are not available yet. The four greyed-out rows are read from the recording
 * (Convert to video, Add shortcut to Drive, Security limitations, Language). The recording shows no tooltip for them; the wording
 * of the tooltips is in components/slides/slides-data.ts (UNAVAILABLE) and is ours.
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File. Some options are greyed out",
  grey: "Greyed-out options are not available yet",
  video: "Convert to video is not available yet",
  shortcut: "Add shortcut to Drive is not available yet",
  security: "Security limitations are not available yet",
  language: "Language is not available yet",
  done: "They will switch on in a later update. Everything else works today",
};
