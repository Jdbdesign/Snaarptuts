import { closeFileMenu, hoverFileMenuItem, openFileMenu } from "@/components/docs/file-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step3-data";

/** Snaarp Doc, step 3 - Explore the editor and File menu. Times are active milliseconds from the start of the step. */
export const STEP3_DURATION_MS = 12400;

export async function runStep3(tl: Timeline) {
  const narrow = window.matchMedia("(max-width: 899px)").matches; // the header toggle and the far end of the toolbar are not on screen

  tl.placeCursor(0.5, 0.45); // where step 2 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The menus
  await tl.at(800);
  tl.showCaption(CAPTIONS.menus);
  tl.highlight("[data-tl=editor-menubar]");
  await tl.moveCursorTo("[data-tl=editor-menu-file]", { ms: 900, dy: 24 });

  // The toolbar: a slow sweep from left to right
  await tl.at(2800);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.toolbar);
  tl.highlight("[data-tl=editor-toolbar]");
  await tl.moveCursorTo("[data-tl=tool-search]", { ms: 400, dy: 8 });
  await tl.moveCursorTo(narrow ? "[data-tl=tool-underline]" : "[data-tl=tool-pen-menu]", { ms: 1500, dy: 8 });

  // Editing mode and Share
  await tl.at(5000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.top);
  tl.highlight("[data-tl=editor-share]");
  if (!narrow) tl.highlight("[data-tl=editor-mode]");
  await tl.moveCursorTo(narrow ? "[data-tl=editor-share]" : "[data-tl=editor-mode]", { ms: 800, dy: 6 });
  if (!narrow) await tl.moveCursorTo("[data-tl=editor-share]", { ms: 500, dy: 6 });

  // Click File
  await tl.at(7000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.clickFile);
  await tl.moveCursorTo("[data-tl=editor-menu-file]", { ms: 700 });
  tl.highlight("[data-tl=editor-menu-file]");
  await tl.wait(150);
  await tl.click("[data-tl=editor-menu-file]");
  tl.clearHighlight();
  openFileMenu(tl);

  // Look down the File menu
  await tl.at(8800);
  tl.showCaption(CAPTIONS.fileMenu);
  for (const id of ["new", "open", "copy"]) {
    await hoverFileMenuItem(tl, id, { ms: 300 });
    await tl.wait(500);
  }

  // Click an empty part of the canvas: the menu closes
  await tl.at(11200);
  await tl.moveCursorTo("[data-tl=editor-canvas]", { ms: 450, dx: narrow ? 0 : -330, dy: 120 });
  await tl.click("[data-tl=editor-canvas]");
  closeFileMenu(tl);

  // Quick white fade
  await tl.at(12000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP3_DURATION_MS);
}
