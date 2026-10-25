/*
 * Copy and sample content of the things the Insert menu adds to the page (Snaarp Doc steps 20 to 22): the sample
 * banner image, the sample table and the sample link. Edit the words here, not in the layout code.
 * The recording uses a real news image, real table text and a real web address: the sample replaces them.
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
