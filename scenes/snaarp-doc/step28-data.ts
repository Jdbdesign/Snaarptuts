import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 28 - Block quote, checklist and code block. All copy, captions and sample texts live here.
 * Recording: ref/docs/Snaarp_Doc_insert.mp4 (quote at about 4:15, checklist at about 4:40, code block at about 5:10).
 * The frames show the checklist box unticked (it is never ticked) and the code block as plain fixed-width text, so the
 * box is only hovered and the code block has no box around it.
 */

export { URLS } from "./step19-data";

export const CAPTIONS = {
  clickQuote: "Click in the paragraph you want to quote",
  insertQuote: "Click Insert, then Block quote",
  quote: "A block quote sets text apart",
  clickEnd: "Click at the end of the last line",
  insertChecklist: "Click Insert, then Checklist",
  typeItem: "Type the first item",
  box: "Click the box when it is done",
  insertCode: "Click Insert, then Code block",
  typeCode: "Type your code",
  code: "Code stays in a fixed-width font",
};

/** The block that becomes a quote (the intro paragraph) and the block the new lines go under (the Contacts paragraph). */
export const BLOCKS = { quote: "p1", last: "p4" };

/** What is typed into the checklist item and the code block. */
export const TEXTS = {
  item: "Send the brief to Alex",
  code: "const client = 'Acme Studio';",
};

export const TITLE = SAMPLE_TITLE;
