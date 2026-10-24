import { DOC_TITLES } from "./doc-titles";
import type { Block } from "./editor-state";

/*
 * The sample document of Snaarp Doc steps 10 to 13 (sample text, not the recording's text). Edit the words here.
 * "Acme" appears in different cases on purpose, so "Match case" changes the number of matches.
 */

/** The header title of steps 10 to 13 (same as steps 8 and 9). */
export const SAMPLE_TITLE = DOC_TITLES.renamed;

export const SAMPLE_BLOCKS: Block[] = [
  { id: "h1", kind: "h1", text: "Acme Studio Website Redesign" },
  {
    id: "p1",
    kind: "p",
    text: "This brief describes the redesign of the Acme Studio website. The goal is a faster, clearer site that explains what Acme does and helps new clients get in touch.",
  },
  { id: "h2-goals", kind: "h2", text: "Goals" },
  {
    id: "p2",
    kind: "p",
    text: "Increase enquiries from the contact form by 30%. Make the services pages easier to scan. Keep the acme brand colors and tone.",
  },
  { id: "h2-timeline", kind: "h2", text: "Timeline" },
  {
    id: "p3",
    kind: "p",
    text: "Design starts in November. Content review with the ACME team happens in week two. Launch is planned for January.",
  },
  { id: "h2-contacts", kind: "h2", text: "Contacts" },
  { id: "p4", kind: "p", text: "Questions about the Acme project go to jane@acme-studio.com." },
];

/** Block ids used by the scripts. */
export const BLOCK_IDS = {
  /** The paragraph that gets copied in step 11. */
  copied: "p2",
  /** The last paragraph, where the copy is pasted under. */
  last: "p4",
};

/** Words per block, used for the footer word count. */
export const countWords = (blocks: Block[]) =>
  blocks.reduce((n, b) => n + (b.text.trim() ? b.text.trim().split(/\s+/).length : 0), 0);
