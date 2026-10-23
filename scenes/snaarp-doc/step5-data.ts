import { DOC_TITLES } from "@/components/docs/doc-titles";

/*
 * Snaarp Doc, step 5 - Share your document. All copy and captions live here (the dialog's own copy is in
 * components/docs/share-data.ts). Recording: ref/docs/Snaarp_Doc_flow.mp4 (about 0:54-1:20).
 */

export const URLS = {
  editor: "docs.snaarp.com/document/untitled-copy", // placeholder
};

export const CAPTIONS = {
  fileShare: "Click File, then Share",
  people: "Add people by name or email",
  restricted: "Restricted means only people you add can open the document",
  anyone: "Choose who can open it. Here, anyone with the link",
  role: "Choose what people with the link can do",
  copyLink: "Use Copy link to share it",
  done: "Click Done",
};

export const TITLES = { start: DOC_TITLES.copy };
