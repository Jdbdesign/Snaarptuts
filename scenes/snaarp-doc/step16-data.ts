import { COMMENTED_PHRASE, SAMPLE_COMMENTS } from "@/components/docs/comments-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 16 - Manage comments. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_view.mp4 (about 0:52-1:34). The recording's text, commenter and photo are replaced by
 * sample data. The Resolve / Delete card and the Open / Resolved filter results are inferred (they are only hovered).
 */

export const URLS = {
  editor: "docs.snaarp.com/document/project-brief", // placeholder, shared by steps 14 to 18
};

export const CAPTIONS = {
  menu: "Click the three dots to manage a comment",
  filter: "Filter comments by status",
  select: "Select text in your document to comment on it",
  icon: "Click the comment icon",
  type: "Type your comment",
  submit: "Click Comment",
  highlight: "The commented text is highlighted in the document",
  close: "Click X to close the panel",
};

/** The phrase that gets selected and the comment typed on it. */
export const PHRASE = COMMENTED_PHRASE;
export const COMMENT_TEXT = SAMPLE_COMMENTS.second;

export const TITLE = SAMPLE_TITLE;
