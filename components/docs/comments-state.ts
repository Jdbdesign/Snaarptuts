/*
 * The state of the Comments panel (Snaarp Doc steps 15 to 18). Pure data: comments-timeline.ts changes it from the
 * scripts, CommentsPanel.tsx draws it.
 */

export type Thread = {
  id: string;
  text: string;
  /** The id of the text highlight (editor anchor) the comment belongs to, if it was made on selected text. */
  anchorId?: string;
  resolved?: boolean;
};

export type FilterId = "all" | "open" | "resolved";

/** Where in the page the comment being written will attach: the selected text. */
export type PendingAnchor = { block: number; from: number; to: number };

export type CommentsState = {
  /** Newest first. */
  threads: Thread[];
  /** The "write a comment" card, or null. */
  composer: { text: string; anchor?: PendingAnchor } | null;
  /** The thread whose reply input has the blue border and the send icon. */
  replyFocus: string | null;
  /** The thread whose three-dot card (Resolve, Delete) is open. */
  menuFor: string | null;
  filter: FilterId;
  filterOpen: boolean;
};

export const EMPTY_COMMENTS: CommentsState = {
  threads: [],
  composer: null,
  replyFocus: null,
  menuFor: null,
  filter: "all",
  filterOpen: false,
};

export function visibleThreads(s: CommentsState): Thread[] {
  if (s.filter === "open") return s.threads.filter((t) => !t.resolved);
  if (s.filter === "resolved") return s.threads.filter((t) => t.resolved);
  return s.threads;
}
