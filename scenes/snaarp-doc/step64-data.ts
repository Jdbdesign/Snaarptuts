import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 64 - Share your document (header Share button): the last step. All copy lives here; the dialog's own copy is in
 * components/docs/share-data.ts. Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (about 1:15-1:25): the blue Share button ("Share document" tooltip)
 * opens "Share "Project Brief"" with the owner under "People with access", General access set to "Anyone with the link" as Editor, a Role list
 * (Viewer, Commenter, Editor ticked), Copy link and Done. Step 5 shows the same dialog from File > Share; this is the short header-button version,
 * and it starts with Anyone with the link / Editor already chosen, as the recording does.
 */

export { URLS } from "./step31-data";

export const START_EDITOR = SAMPLE_EDITOR;
export const COPIED = "Link copied";

export const CAPTIONS = {
  share: "Click Share to give people access",
  dialog: "Add people by name or email, or share a link",
  access: "Anyone with the link can open the document",
  role: "Choose what they can do",
  copy: "Click Copy link",
  copied: "The link is on your clipboard",
  done: "Click Done",
};

export const TITLE = SAMPLE_TITLE;
