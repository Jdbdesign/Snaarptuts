/*
 * Copy and values of the PrintDialog: a neutral, Snaarp-styled print panel. The recording shows the browser's own
 * print window (with a real printer name); that is deliberately not copied. Edit here, not in PrintDialog.tsx.
 */

export const PRINT = {
  title: "Print",
  sheets: "1 sheet of paper",
  pageIndicator: "1 / 1",
  settings: [
    { id: "destination", label: "Destination", value: "Save as PDF" },
    { id: "pages", label: "Pages", value: "All" },
    { id: "layout", label: "Layout", value: "Portrait" },
    { id: "color", label: "Color", value: "Color" },
  ],
  more: "More settings",
  print: "Print",
  cancel: "Cancel",
};
