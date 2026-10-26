/*
 * Copy and sample content of the things the Insert menu adds to the page (Snaarp Doc steps 20 to 26): the sample banner
 * image, the sample table, the sample link, the line and page break, the bookmark, the header and footer and the
 * watermark. Edit the words here, not in the layout code. The recording uses a real news image, real table text, a real
 * web address and real header text: the samples replace them.
 */

export const IMAGE = {
  /** The name of the "uploaded" file (shown only in the toast; the computer's file picker is left out). */
  fileName: "acme-banner.png",
  uploading: "Uploading acme-banner.png...",
  uploaded: "Image uploaded",
  /** The word drawn on the sample banner. */
  bannerText: "Acme Studio",
};

export const TABLE = {
  /** The table sits under the block with this id (the intro paragraph of the sample document). */
  after: "p1",
  /** Header row, then the body rows. */
  header: ["Task", "Owner", "Due"],
  rows: [
    ["Homepage design", "Jane Doe", "Nov 12"],
    ["Content review", "Alex Kim", "Nov 26"],
  ],
};

export const LINK = {
  /** The text that becomes the link (the sample document's heading) and its web address. */
  text: "Acme Studio Website Redesign",
  url: "www.acme-studio.com",
  dialog: {
    title: "Insert Link",
    description: "Enter the URL for the link. Optionally choose to open in a new tab.",
    urlLabel: "URL",
    placeholder: "https://example.com",
    newTab: "Open in new tab",
    cancel: "Cancel",
    insert: "Insert",
  },
};

/** Where the horizontal line and the page break go in the sample document (step 23): right before these blocks. */
export const BREAKS = {
  /** The line sits under the heading, before the intro paragraph. */
  ruleBefore: "p1",
  /** The page break sits before the "Goals" heading: it and everything after it moves to page 2. */
  pageBreakBefore: "h2-goals",
};

export const BOOKMARK = {
  /** The bookmark sits at the start of this block (the paragraph under "Goals"). */
  before: "p2",
  id: "bookmark1",
  name: "Work in progress",
  added: "Bookmark added",
  dialog: {
    title: "Add bookmark",
    label: "Bookmark name",
    cancel: "Cancel",
    ok: "OK",
  },
};

export const PAGE_NUMBERS = {
  /** What the dialog starts with (the frames show Bottom (footer) and Right selected before anything is clicked). */
  defaults: { position: "bottom", align: "right", start: 1 } as const,
  dialog: {
    title: "Page numbers",
    description: "Insert a dynamic page number field. The value is computed from the document's pages at render time.",
    position: "Position",
    positions: { top: "Top (header)", bottom: "Bottom (footer)" },
    alignment: "Alignment",
    alignments: { left: "Left", center: "Center", right: "Right" },
    start: "Start numbering at",
    hint: "Use 0 to skip a cover page, or a higher value to continue from another document.",
    remove: "Remove page numbers",
    cancel: "Cancel",
    apply: "Apply",
  },
};

export const BLOCK_TEXTS = {
  /** The checklist item and the code line typed in step 28. */
  checklistItem: "Send the brief to Alex",
  codeLine: "const client = 'Acme Studio';",
};

export const ESIGN = {
  title: "eSignature",
  /** The tabs; only Draw is real, the others are hover only. */
  tabs: [
    { id: "draw", label: "Draw", icon: "edPen" },
    { id: "type", label: "Type", icon: "edTextColor" },
    { id: "upload", label: "Upload", icon: "upload" },
    { id: "request", label: "Request", icon: "send" },
  ] as const,
  hint: "Draw your signature below:",
  clear: "Clear",
  insert: "Insert Signature",
  /** The Type tab (step 42): the name is shown under the input in the signature font. */
  type: { hint: "Type your name to generate a signature:", placeholder: "Your full name" },
  /** The Upload tab (step 43): clicking the box would open the computer's file picker, which is left out. */
  upload: { hint: "Upload an image of your signature.", drop: "Click to upload (PNG, JPG)" },
  /** The Request tab (step 44). */
  request: {
    hint: "Request a signature from someone else. They will receive an email with a link to sign this document.",
    emailPlaceholder: "Recipient email address",
    messagePlaceholder: "Optional message...",
    send: "Send Request",
    sent: "Signature request sent",
  },
};

/** The look of a typed signature (the frames show an italic serif): in the dialog's preview and in the page. */
export const TYPED_SIGNATURE_FONT = "Georgia, 'Times New Roman', serif";

export const DRAWING = {
  title: "Drawing",
  tools: ["Pen", "Eraser"],
  /** The colour dots, left to right (the first is selected). */
  colors: ["#000000", "#FF0000", "#0000FF", "#0A8A0A", "#FF8C00", "#800080", "#FFFFFF"],
  /** The pen sizes (dot diameters in px), left to right; the second is selected, as in the frames. */
  sizes: [2, 4, 6, 9, 13],
  selectedSize: 1,
  clear: "Clear",
  cancel: "Cancel",
  insert: "Insert",
};

export const SYMBOLS = {
  title: "Insert Symbol",
  placeholder: "Search symbols...",
  /** The frames open on Arrows, so it is the default category. */
  defaultCategory: "arrows",
  /**
   * The categories and their symbols, 10 to a row. Arrows and Math follow the frames; the rest are sensible choices (the
   * frames never open them).
   */
  categories: [
    {
      id: "arrows",
      label: "Arrows",
      symbols: "→ ← ↑ ↓ ↔ ↕ ⇒ ⇐ ⇑ ⇓ ⇔ ↗ ↘ ↙ ↖ ➔ ➡ ⬅ ⬆ ⬇".split(" "),
    },
    {
      id: "math",
      label: "Math",
      symbols: "± × ÷ ≠ ≈ ≤ ≥ ∞ √ ∑ ∫ ∂ ∆ ∇ π θ α β γ δ ε μ σ ω λ φ".split(" "),
    },
    { id: "currency", label: "Currency", symbols: "$ € £ ¥ ¢ ₹ ₩ ₽ ₺ ₦ ₿ ₫ ₪ ฿ ₴".split(" ") },
    { id: "punctuation", label: "Punctuation", symbols: "… — – ‘ ’ “ ” « » ¡ ¿ § ¶ † ‡ • · ‰ ′ ″ ※".split(" ") },
    { id: "shapes", label: "Shapes", symbols: "■ □ ▲ △ ▼ ▽ ◆ ◇ ● ○ ★ ☆ ♠ ♣ ♥ ♦ ✓ ✗ ◐ ◑".split(" ") },
    { id: "emoji", label: "Emoji", symbols: "😀 😊 😂 😍 😎 🤔 👍 👏 🎉 🔥 ✨ 💡 📌 📎 ✅ ❗ ❤ ⭐ 🚀 🙌".split(" ") },
  ],
};

export const HEADER_FOOTER = {
  header: "Acme Studio brief",
  footer: "Confidential",
};

export const WATERMARK = {
  text: "Draft",
  maxLength: 100,
  /** Size in design px of the watermark text on the page, and its angle. */
  fontSize: 76,
  angle: -38,
  panel: {
    title: "Watermark",
    tabs: { image: "Image", text: "Text" },
    placeholder: "Insert text",
    formatting: "Formatting",
    font: "Arial",
    size: "Auto",
    transparency: "Transparency",
    diagonal: "Diagonal",
    horizontal: "Horizontal",
    placement: "Placement",
    remove: "Remove watermark",
    imageHint: "Upload an image",
  },
};
