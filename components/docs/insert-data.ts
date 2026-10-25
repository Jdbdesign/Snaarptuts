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
