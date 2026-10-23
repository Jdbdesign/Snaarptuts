/**
 * The document title is shared state that changes across Snaarp Doc steps 3 to 8. Every step starts from the
 * title it expects (so it also works when opened alone from the rail) and passes it as `startTitle`.
 */
export const DOC_TITLES = {
  /** Steps 1 to 4. */
  original: "Untitled Document",
  /** Created by step 4; steps 5 to 7 start with it. */
  copy: "Untitled Document (Copy)",
  /** Set by step 7; step 8 starts with it. */
  renamed: "Project Brief",
};
