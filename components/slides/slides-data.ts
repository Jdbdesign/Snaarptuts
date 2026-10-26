import type { IconName } from "@/components/icons";
import type { SlideEl } from "./slide-elements";

/*
 * Copy, menus and sample content of Snaarp Slides (the shell, the File menu and its dialogs).
 * Recording: ref/slides/Snaarp_Slides_file.mp4. The recording shows real files and a real person; sample data is used.
 * Edit here, not in the components.
 */

export const SLIDES_URLS = {
  home: "slides.snaarp.com/presentations", // placeholder, the address bar is not visible in the recording
  starred: "slides.snaarp.com/starred", // seen in a browser status tip in the recording
  trash: "slides.snaarp.com/trash", // placeholder
  editor: "slides.snaarp.com/presentation/acme-studio-pitch", // placeholder
  renamed: "slides.snaarp.com/presentation/acme-studio-pitch-2026", // placeholder
  untitled: "slides.snaarp.com/presentation/untitled", // placeholder
};

/** The deck every step from 3 on starts with (and its name after a rename). */
export const DECK = {
  title: "Acme Studio Pitch",
  renamed: "Acme Studio Pitch 2026",
  untitled: "Untitled Presentation",
  owner: "Jane Doe",
  ownerEmail: "jane@acme-studio.com",
};

export const SHELL = {
  appName: "Slides",
  navPresentations: "Presentations",
  navStarred: "Starred",
  navTrash: "Trash",
  foldersLabel: "FOLDERS",
  allPresentations: "All Presentations",
  reportBug: "Report a Bug",
  logout: "Logout",
  searchPlaceholder: "Search presentations",
  sort: "Recent",
  user: { name: DECK.owner, initials: "JD" },
};

export type NavId = "presentations" | "starred" | "trash";

/** The home's "Start a new presentation" row. `tone` picks the card colours. */
export type HomeTemplate = { id: string; name: string; bg: string; fg: string; accent: string; font?: "serif" };
export const HOME_TEMPLATES: HomeTemplate[] = [
  { id: "modern-dark", name: "Modern Dark", bg: "linear-gradient(135deg,#171B34,#232848)", fg: "#fff", accent: "#6C8CFF" },
  { id: "clean-white", name: "Clean White", bg: "#fff", fg: "#1f2430", accent: "#6C8CFF" },
  { id: "ocean-blue", name: "Ocean Blue", bg: "linear-gradient(135deg,#0F5FD0,#1E7BEA)", fg: "#fff", accent: "#BFD8FF" },
  { id: "sunset-warm", name: "Sunset Warm", bg: "linear-gradient(135deg,#F2570F,#F4773B)", fg: "#fff", accent: "#FFD9C2" },
  { id: "forest-green", name: "Forest Green", bg: "linear-gradient(135deg,#1B5E24,#237A2E)", fg: "#fff", accent: "#BFE5C4" },
];

export const HOME = {
  startTitle: "Start a new presentation",
  blank: "Blank",
  gallery: "Template gallery",
  recentTitle: "Recent presentations",
};

export type RecentPresentation = { name: string; opened: string };
export const RECENT: RecentPresentation[] = [
  { name: "Acme Studio Pitch", opened: "Opened 22/10/2026" },
  { name: "Q4 Business Review", opened: "Opened 14/10/2026" },
];

export const STARRED = {
  title: "Starred",
  intro: "Presentations you star appear here.",
  items: [{ name: "Q4 Business Review", opened: "Opened 14/10/2026" }],
};

export const TRASH = {
  title: "Trash",
  intro: "Items in Trash are permanently deleted after 30 days",
  deleted: "Deleted today",
  restore: "Restore",
  deleteForever: "Delete forever",
  empty: "Trash is empty",
  /** Shown on the Trash page in step 1 (two old items). */
  items: [
    { name: "Old Pitch Draft", meta: "Deleted today" },
    { name: "Untitled Presentation", meta: "Deleted today" },
  ],
};

export const LOADING = { presentation: "Loading presentation..." };

/** The editor's header, menu bar, toolbar and side panels. */
export const EDITOR = {
  slideshow: "Slideshow",
  share: "Share",
  collaborators: "1",
  newSlide: "New slide",
  notes: "Click to add speaker notes",
  properties: "Select an element to edit its properties.",
  titlePlaceholder: "Click to add title",
  subtitlePlaceholder: "Click to add subtitle",
};

export const MENUS: { id: string; label: string }[] = [
  { id: "file", label: "File" },
  { id: "edit", label: "Edit" },
  { id: "view", label: "View" },
  { id: "insert", label: "Insert" },
  { id: "format", label: "Format" },
  { id: "slide", label: "Slide" },
  { id: "arrange", label: "Arrange" },
  { id: "tools", label: "Tools" },
];

export type ToolId = "undo" | "redo" | "print" | "paint" | "zoom" | "select" | "text" | "image" | "shape" | "line";
export const TOOLBAR: { id: ToolId; icon?: IconName; label?: string; active?: boolean }[][] = [
  [
    { id: "undo", icon: "edUndo" },
    { id: "redo", icon: "edRedo" },
  ],
  [
    { id: "print", icon: "edPrint" },
    { id: "paint", icon: "edPaintFormat" },
  ],
  [{ id: "zoom", label: "100%" }],
  [
    { id: "select", icon: "slSelect", active: true },
    { id: "text", icon: "slText" },
    { id: "image", icon: "edImage" },
    { id: "shape", icon: "slShape" },
    { id: "line", icon: "slLine" },
  ],
];
export const TOOLBAR_SELECTS = ["Background", "Layout", "Theme", "Transition"];

/** The right-hand icon rail. */
export const RAIL: { id: string; icon: IconName; label: string }[] = [
  { id: "image", icon: "slRailImage", label: "Image" },
  { id: "templates", icon: "slRailTemplates", label: "Templates" },
  { id: "blocks", icon: "slRailBlocks", label: "Blocks" },
  { id: "media", icon: "slRailMedia", label: "Media" },
  { id: "uploads", icon: "slRailUpload", label: "Uploads" },
  { id: "convert", icon: "slRailConvert", label: "Convert" },
];

/* ---------------------------------------------------------------- File menu */

export type FileSubId = "new" | "copy" | "share" | "email" | "download" | "history";

export type FileItem = {
  id: string;
  label: string;
  shortcut?: string;
  /** Greyed out: no hover, no click. */
  disabled?: boolean;
  /** Opens this submenu (shows a right chevron). */
  sub?: FileSubId;
  /** A tick shows beside the label while this setting is on (Make available offline). */
  toggle?: boolean;
};

/** Groups are separated by a thin divider. Labels, order, greyed rows and shortcut hints are read from the recording. */
export const FILE_MENU: FileItem[][] = [
  [
    { id: "new", label: "New", sub: "new" },
    { id: "open", label: "Open", shortcut: "Ctrl+O" },
    { id: "import", label: "Import slides" },
    { id: "copy", label: "Make a copy", sub: "copy" },
  ],
  [
    { id: "share", label: "Share", sub: "share" },
    { id: "email", label: "Email", sub: "email" },
    { id: "download", label: "Download", sub: "download" },
    { id: "video", label: "Convert to video", disabled: true },
  ],
  [
    { id: "rename", label: "Rename" },
    { id: "move", label: "Move" },
    { id: "shortcut", label: "Add shortcut to Drive", disabled: true },
    { id: "trash", label: "Move to trash" },
  ],
  [
    { id: "history", label: "Version history", sub: "history" },
    { id: "offline", label: "Make available offline", toggle: true },
  ],
  [
    { id: "details", label: "Details" },
    { id: "security", label: "Security limitations", disabled: true },
    { id: "language", label: "Language", disabled: true },
  ],
  [
    { id: "pagesetup", label: "Page setup" },
    { id: "print", label: "Print", shortcut: "Ctrl+P" },
  ],
];

/** Language shows a chevron in the recording although it is greyed out. */
export const FILE_ARROW_WHEN_DISABLED = ["language"];

export type SubItem = { id: string; label: string };

export const FILE_SUBS: Record<FileSubId, SubItem[]> = {
  // The recording does not open this submenu; the labels are the owner's brief (see DECISIONS-AND-DEVIATIONS.md).
  new: [
    { id: "presentation", label: "Presentation" },
    { id: "template", label: "From template" },
  ],
  copy: [
    { id: "entire", label: "Entire presentation" },
    { id: "selected", label: "Selected slides" },
  ],
  share: [
    { id: "others", label: "Share with others" },
    { id: "publish", label: "Publish to web" },
  ],
  email: [
    { id: "file", label: "Email this file" },
    { id: "collaborators", label: "Email collaborators" },
  ],
  download: [
    { id: "pptx", label: "Microsoft PowerPoint (.pptx)" },
    { id: "odp", label: "ODP Document (.odp)" },
    { id: "pdf", label: "PDF Document (.pdf)" },
    { id: "txt", label: "Plain Text (.txt)" },
    { id: "jpeg", label: "JPEG image (.jpeg, current slide)" },
    { id: "png", label: "PNG image (.png, current slide)" },
    { id: "svg", label: "SVG image (.svg, current slide)" },
  ],
  history: [
    { id: "name", label: "Name current version" },
    { id: "see", label: "See version history" },
  ],
};

/** Tooltips for the greyed-out File items (the recording shows none; wording is ours). */
export const UNAVAILABLE: Record<string, string> = {
  video: "Convert to video isn't available yet. Use the Convert panel on the right once it launches.",
  shortcut: "Add shortcut to Drive isn't available yet. It will be switched on in a later update.",
  security: "Security limitations aren't available yet. They will show up here once they launch.",
  language: "Language isn't available yet. Snaarp Slides is in English for now.",
};

/* ----------------------------------------------------------------- Dialogs */

export const START_DIALOG = {
  brand: "Slides",
  hello: `Hello, ${DECK.owner.split(" ")[0]}.`,
  lead: "Let's start creating.",
  /** The first three cards are faded in the recording (not ready yet). */
  cards: [
    { id: "slides", title: "Slides", badge: "Beta", text: "Create polished slides from simple text prompts", faded: true },
    { id: "images", title: "Images", text: "Create unique, studio-quality visuals in seconds", faded: true },
    { id: "infographics", title: "Infographics", badge: "Beta", text: "Turn complex data into clear, compelling visuals", faded: true },
    { id: "templates", title: "Templates", text: "Jumpstart your presentation with a beautiful template" },
    { id: "import", title: "Import", text: "Add an existing presentation to use its look and feel for this one" },
    { id: "blank", title: "Blank slide", text: "" },
  ],
};

export const TEMPLATES_DIALOG = {
  title: "Choose a template",
  intro: "Pick a look for your presentation. You can change it later in Theme.",
  cancel: "Cancel",
};

export const OPEN_DIALOG = {
  title: "Open a file",
  tabs: [
    { id: "recent", label: "Recent", icon: "clock" },
    { id: "drive", label: "My Drive", icon: "slDrive" },
    { id: "shared", label: "Shared with me", icon: "users" },
    { id: "starred", label: "Starred", icon: "star" },
    { id: "computer", label: "Computers", icon: "slMonitor" },
    { id: "upload", label: "Upload", icon: "upload" },
  ] as { id: string; label: string; icon: IconName }[],
  loading: "Loading",
  files: [
    { name: "Q4 Business Review", opened: "Last opened: 14/10/2026" },
    { name: "Acme Studio Pitch", opened: "Last opened: 1 minute ago" },
    { name: "Team Offsite Plan", opened: "Last opened: 02/10/2026" },
  ],
  drive: {
    heading: "Connect to Google Drive to access your files",
    button: "Connect Google Drive",
    note: "Your Drive presentations will appear here once connected",
  },
  shared: { heading: "Nothing has been shared with you yet", note: "Presentations other people share with you will appear here" },
  starred: { heading: "No starred presentations", note: "Star a presentation on the home page to find it here" },
  computer: { heading: "Browse files from your computer", button: "Select a file from your device" },
  upload: { drag: "Drag a file here", or: "or", browse: "Browse" },
};

/** The sample file the Import dialog "uploads" and the three slides it brings in. */
export const IMPORT_DIALOG = {
  title: "Import slides",
  tabs: [
    { id: "from", label: "From presentations" },
    { id: "upload", label: "Upload file" },
  ],
  noneFound: "No other presentations found",
  selectOne: "Select a presentation to view its slides",
  dropHere: "Drag and drop a file here, or click to browse",
  supports: "Supports PowerPoint files (.pptx, .ppt)",
  file: { name: "acme-pitch.pptx", size: "412 KB" },
  uploading: (name: string) => `Uploading “${name}”...`,
  processing: "Server is processing your file...",
  processingNote: "This may take a few seconds depending on file size",
  importing: "Importing your slides...",
  almost: "Almost there.",
  complete: "Import complete! Loading your slides...",
  toast: "3 slides imported",
};

export type SlideKind = "blank" | "title" | "bullets" | "closing" | "elements";
/** A slide with `elements` (steps 20-36) is drawn from them; the other kinds are drawn from title, subtitle and bullets. */
export type SlideData = { id: string; kind: SlideKind; title?: string; subtitle?: string; bullets?: string[]; elements?: SlideEl[] };

export const BLANK_SLIDE: SlideData = { id: "s1", kind: "blank" };

/** The three slides in acme-pitch.pptx. */
export const IMPORTED_SLIDES: SlideData[] = [
  { id: "s2", kind: "title", title: "Acme Studio", subtitle: "Pitch deck 2026" },
  { id: "s3", kind: "bullets", title: "Our services", bullets: ["Brand identity", "Product design", "Launch campaigns"] },
  { id: "s4", kind: "closing", title: "Next steps", subtitle: "hello@acme-studio.com" },
];

export const COPY_DIALOGS = {
  entireToast: (title: string) => `Copy created: Copy of ${title}`,
  selectedToast: (title: string, n: number) => `Copy created: Copy of ${title} (${n} slide${n === 1 ? "" : "s"})`,
};

export const SHARE_PUBLISH = {
  title: "Publish to web",
  intro: "Make a read-only copy of your presentation visible to anyone with the link.",
  note: "Anyone on the internet can open it. Changes you make are published automatically.",
  publish: "Publish",
  cancel: "Cancel",
  publishedTitle: "Published to the web",
  publishedIntro: "Your presentation is live. Share this link:",
  link: "acme-studio.com/p/acme-pitch",
  copy: "Copy",
  stop: "Stop publishing",
  done: "Done",
  publishedToast: "Published to the web",
  stoppedToast: "Publishing stopped",
};

export const SHARE_PEOPLE = {
  /** Typed into the share dialog's "Add people" box. */
  email: "alex@acme-studio.com",
  addedName: "Alex Morgan",
};

export const EMAIL = {
  fileTitle: "Email this file",
  collabTitle: "Email collaborators",
  to: "To",
  subject: "Subject",
  message: "Message",
  attachAs: "Attach as",
  formats: ["PDF", "PPTX"],
  collaborators: "Collaborators",
  send: "Send",
  cancel: "Cancel",
  sample: {
    to: "alex@acme-studio.com",
    subject: (title: string) => title,
    message: "Hi Alex, here is the latest version of our pitch deck. Let me know what you think.",
    collabMessage: "Hi team, the pitch deck is ready for a last look before Friday.",
  },
  people: [
    { id: "alex", name: "Alex Morgan", email: "alex@acme-studio.com" },
    { id: "sam", name: "Sam Carter", email: "sam@acme-studio.com" },
    { id: "priya", name: "Priya Shah", email: "priya@acme-studio.com" },
  ],
  sentToast: "Email sent to alex@acme-studio.com",
  sentCollabToast: (n: number) => `Email sent to ${n} collaborators`,
};

export const DOWNLOAD = {
  preparing: "Preparing download...",
  done: (file: string) => `Downloaded ${file}`,
  imageNote: "Image formats save the current slide only",
  file: (title: string, ext: string) => `${title}.${ext}`,
};

export const MOVE_DIALOG = {
  title: (t: string) => `Move “${t}”`,
  current: "Current location",
  folders: [
    { id: "all", label: "All Presentations" },
    { id: "client", label: "Client work" },
    { id: "archive", label: "Archive" },
  ],
  newFolder: "New folder",
  move: "Move here",
  cancel: "Cancel",
  toast: (folder: string) => `Moved to ${folder}`,
};

export const VERSIONS = {
  nameDialog: { title: "Name current version", label: "Version name", placeholder: "Name this version", save: "Save", cancel: "Cancel", sample: "Final draft" },
  nameToast: (name: string) => `Version saved: ${name}`,
  panelTitle: "Version history",
  restore: "Restore this version",
  restoredToast: "Version restored",
  currentLabel: "Current version",
  groups: [
    {
      group: "Today",
      items: [
        { id: "v1", name: "", time: "14:20", author: "Jane Doe", current: true },
        { id: "v2", name: "", time: "11:05", author: "Jane Doe" },
      ],
    },
    {
      group: "Yesterday",
      items: [{ id: "v3", name: "", time: "17:40", author: "Alex Morgan" }],
    },
    {
      group: "21/10/2026",
      items: [{ id: "v4", name: "First version", time: "09:15", author: "Jane Doe" }],
    },
  ],
};

export const OFFLINE = { onToast: "Available offline", offToast: "Offline access turned off" };

export const DETAILS_DIALOG = {
  title: "Presentation details",
  close: "Close",
  rows: (title: string, slides: number) => [
    { label: "Title", value: title },
    { label: "Owner", value: DECK.owner },
    { label: "Created", value: "21/10/2026, 09:15" },
    { label: "Last modified", value: "24/10/2026, 14:20" },
    { label: "Slides", value: String(slides) },
    { label: "Size", value: "48 KB" },
    { label: "Location", value: "All Presentations" },
  ],
};

export type AspectId = "16:9" | "4:3" | "custom";
export const PAGE_SETUP = {
  title: "Page setup",
  options: [
    { id: "16:9" as AspectId, label: "Widescreen 16:9", size: "1920 x 1080 px", ratio: 16 / 9 },
    { id: "4:3" as AspectId, label: "Standard 4:3", size: "1440 x 1080 px", ratio: 4 / 3 },
    { id: "custom" as AspectId, label: "Custom", size: "", ratio: 16 / 9 },
  ],
  width: "Width",
  height: "Height",
  unit: "px",
  customSample: { width: "1600", height: "900" },
  apply: "Apply",
  cancel: "Cancel",
};

export const PRINT_SLIDES = {
  title: "Print",
  sheets: "1 sheet of paper",
  pageIndicator: "1 / 1",
  settings: [
    { id: "layout", label: "Layout", value: "Slides", options: ["Slides", "Handouts"] },
    { id: "range", label: "Range", value: "All slides", options: ["All slides", "Current slide", "Custom range"] },
    { id: "color", label: "Color", value: "Color" },
    { id: "perpage", label: "Slides per page", value: "1" },
  ],
  more: "More settings",
  print: "Print",
  cancel: "Cancel",
  toast: "Sent to print",
};

export const TRASH_DIALOG = {
  title: (t: string) => `Move “${t}” to Trash?`,
  text: "You can restore it from Trash within 30 days.",
  confirm: "Move to trash",
  cancel: "Cancel",
  toast: "Moved to Trash",
  restoredToast: (t: string) => `Restored: ${t}`,
};

export const NEW_PRESENTATION = { toast: "New presentation created" };
export const OPENED_TOAST = (t: string) => `Opened ${t}`;

/** What a slide shows when it has no content yet. */
export const SLIDE_PLACEHOLDERS = { title: EDITOR.titlePlaceholder, subtitle: EDITOR.subtitlePlaceholder };
