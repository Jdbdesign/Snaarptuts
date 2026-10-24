import { SAMPLE_COMMENTS } from "@/components/docs/comments-data";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";

/*
 * Snaarp Doc, step 15 - Open Comments and add a comment. All copy and captions live here.
 * Recording: ref/docs/Snaarp_Doc_view.mp4 (about 0:18-0:54). The commenter is "Jane Doe" and the comment is sample text.
 */

export const URLS = {
  editor: "docs.snaarp.com/document/project-brief", // placeholder, shared by steps 14 to 18
};

export const CAPTIONS = {
  open: "Click View, then Comments",
  panel: "Comments from everyone appear in this panel",
  add: "Click Add comment",
  type: "Type your comment",
  submit: "Click Comment",
  saved: "Your comment is saved",
  reply: "Others can reply under your comment",
};

/** The comment that is typed. */
export const COMMENT_TEXT = SAMPLE_COMMENTS.first;

export const TITLE = SAMPLE_TITLE;
