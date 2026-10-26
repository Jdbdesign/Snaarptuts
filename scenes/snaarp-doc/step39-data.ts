import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 39 - Explore the Tools menu. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_tools.mp4 (Tools menu at about 0:02, Word count at about 0:05, Document outline at about 0:13).
 * The sample document replaces the recording's text; the Comments panel and the small round pop-up near the end are left out.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  tools: "Click Tools",
  menu: "The Tools menu has helpers for your document",
  greyed: "Some tools are greyed out until they are available",
  wordCount: "Word count counts your words and pages",
  outline: "Document outline shows your tabs and headings",
  opened: "The outline opens right away",
  again: "Click Tools again",
  unavailable: "Dictionary, notifications, preferences and accessibility are not available yet",
  close: "Click the back arrow to close the outline",
};

/** The greyed-out items that are only hovered (the first one at 4.5 s, the rest at the end). */
export const HOVER_FIRST = "spelling" as const;
export const HOVER_LAST = ["dictionary", "notifications", "preferences", "accessibility"] as const;

export const TITLE = SAMPLE_TITLE;
