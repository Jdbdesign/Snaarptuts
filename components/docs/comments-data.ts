/*
 * Copy, sample comments and sizes of the Comments panel and the Document outline panel (Snaarp Doc steps 15 to 18).
 * Edit the words here, not in the layout code. The recording shows a real username and photo: the sample uses
 * "Jane Doe" and an initial instead.
 */

export const COMMENTS = {
  title: "Comments",
  tabs: { all: "All comments", forYou: "For you" },
  filter: {
    all: "All types",
    open: "Open",
    resolved: "Resolved",
  },
  empty: "Start a discussion",
  addComment: "Add comment",
  composerPlaceholder: "Comment or tag with @",
  cancel: "Cancel",
  submit: "Comment",
  replyPlaceholder: "Reply or add others with @",
  threadLabel: "Project Brief",
  when: "Just now",
  menu: { resolve: "Resolve", delete: "Delete" },
  footerTitle: "Who sees comments?",
  footerText: "Your comments are visible to anyone who can comment on or edit this document.",
  author: { name: "Jane Doe", initial: "J" },
};

/** The comment texts typed or shown in steps 15 to 18. */
export const SAMPLE_COMMENTS = {
  first: "Please review this section",
  second: "This needs more detail",
};

/** The phrase that carries the second comment (it must appear exactly once in the sample document). */
export const COMMENTED_PHRASE = "Make the services pages easier to scan";

export const OUTLINE = {
  title: "Document tabs",
  /** The name of the n-th tab: "Tab 1", "Tab 2", ... */
  tabName: (n: number) => `Tab ${n}`,
  hint: "Headings will appear here as you add them",
};

/** Panel widths in design px (the page is centred in the space that is left). */
export const PANEL_WIDTH = { comments: 245, outline: 180 };
