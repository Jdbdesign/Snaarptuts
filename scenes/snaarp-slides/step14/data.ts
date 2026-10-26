import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 14 - Make it available offline. The recording shows the menu row but never clicks it; the tick, the toasts
 * and the on / off behaviour are ours (see docs/DECISIONS-AND-DEVIATIONS.md).
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File, then Make available offline",
  on: "Your presentation can now be opened without internet",
  again: "Open File again. A tick shows that offline access is on",
  off: "Click it again to turn offline access off",
  done: "The tick is gone: offline access is off",
};
