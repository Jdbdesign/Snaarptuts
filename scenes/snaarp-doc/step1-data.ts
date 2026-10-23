/*
 * Snaarp Doc, step 1 - Explore Snaarp Doc. All copy, sample values and captions live here.
 * Recording: ref/docs/Snaarp_Doc_flow.mp4 (0:00-0:16). The recording shows real names and files; sample data is used instead.
 */

export const URLS = {
  documents: "docs.snaarp.com/documents", // placeholder, the address bar is not visible in the recording
  templates: "docs.snaarp.com/templates", // placeholder
  trash: "docs.snaarp.com/trash", // seen in the recording
};

export const CAPTIONS = {
  home: "This is your Snaarp Doc home",
  recent: "Your recent documents are listed here",
  gallery: "Click Template gallery",
  browse: "Browse ready-made templates by category",
  trash: "Click Trash",
  trashInfo: "Deleted documents stay in Trash for 30 days. You can restore them",
  back: "Click Documents to go back",
};

export type Template = { name: string; category: string; kind: string };

/** Screen A: the row of "Start a new document" cards (after the Blank document card). */
export const START_CARDS: Template[] = [
  { name: "Professional Resume", category: "Resumes", kind: "resume" },
  { name: "Formal Letter", category: "Letters", kind: "letter" },
  { name: "Project Proposal", category: "Papers and Reports", kind: "proposal" },
  { name: "Event Flyer", category: "Flyers", kind: "flyer" },
  { name: "Business Report", category: "Papers and Reports", kind: "report" },
  { name: "Executive Resume", category: "Resumes", kind: "resume" },
];

export const HOME = {
  startTitle: "Start a new document",
  blank: "Blank document",
  gallery: "Template gallery",
  recentTitle: "Recent documents",
  sort: "Last modified",
};

export type RecentDoc = { name: string; date: string };

export const RECENT_DOCS: RecentDoc[] = [
  { name: "Product Roadmap", date: "10/16/2026" },
  { name: "Untitled Document", date: "10/16/2026" },
  { name: "Project Proposal", date: "10/10/2026" },
  { name: "Untitled Document", date: "09/20/2026" },
];

/** Screen B: the gallery. Rows of 7; the third row is only partly visible. */
export const GALLERY = {
  title: "Create with templates",
  search: "Search templates",
  upload: "Upload template",
  filters: ["Recommended", "Resumes", "Invoices", "Papers and Reports", "Flyers", "Meeting Notes", "Letters"],
  selectedFilter: "Recommended",
  templates: [
    { name: "Professional Resume", category: "Resumes", kind: "resume" },
    { name: "Formal Letter", category: "Letters", kind: "letter" },
    { name: "Project Proposal", category: "Papers and Reports", kind: "proposal" },
    { name: "Event Flyer", category: "Flyers", kind: "flyer" },
    { name: "Business Report", category: "Papers and Reports", kind: "report" },
    { name: "Executive Resume", category: "Resumes", kind: "resume" },
    { name: "Modern Resume", category: "Resumes", kind: "resume" },
    { name: "Academic CV", category: "Resumes", kind: "resume" },
    { name: "Cover Letter", category: "Letters", kind: "letter" },
    { name: "Meeting Notes", category: "Meeting Notes", kind: "notes" },
    { name: "Standard Invoice", category: "Invoices", kind: "invoice" },
    { name: "Employment Contract", category: "Business", kind: "report" },
    { name: "Event Planning", category: "Personal", kind: "notes" },
    { name: "API Documentation", category: "Technical", kind: "notes" },
    { name: "Newsletter", category: "Business", kind: "flyer" },
    { name: "Creative Resume", category: "Resumes", kind: "resume" },
    { name: "Thank You Letter", category: "Letters", kind: "letter" },
    { name: "Weekly Report", category: "Papers and Reports", kind: "report" },
    { name: "Project Plan", category: "Business", kind: "proposal" },
    { name: "Class Notes", category: "Personal", kind: "notes" },
    { name: "Price Quote", category: "Invoices", kind: "invoice" },
    { name: "Press Release", category: "Business", kind: "letter" },
  ] as Template[],
};

/** Screen C: Trash. */
export const TRASH = {
  title: "Trash",
  intro: "Items in trash are automatically deleted after 30 days",
  selectAll: "Select all",
  item: { name: "Untitled Document", meta: "Deleted Today · 30 days until permanent deletion" },
  restore: "Restore",
  delete: "Delete",
};
