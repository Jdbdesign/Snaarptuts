import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { clickFormatMenu, closeFormatMenu, hoverFormatItem, initFormatMenu } from "@/components/docs/format-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step31-data";

/** Snaarp Doc, step 31 - Explore the Format menu. Times are active milliseconds from the start of the step. */
export const STEP31_DURATION_MS = 23000;

export async function runStep31(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Open the Format menu
  await tl.at(800);
  tl.showCaption(CAPTIONS.format);
  await clickFormatMenu(tl);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.menu);
  tl.highlight("[data-tl=format-menu-card]");

  // The four submenus
  await tl.at(4500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.text);
  await hoverFormatItem(tl, "text");
  await tl.at(7000);
  tl.showCaption(CAPTIONS.paragraph);
  await hoverFormatItem(tl, "paragraph");
  await tl.at(9500);
  tl.showCaption(CAPTIONS.align);
  await hoverFormatItem(tl, "align");
  await tl.at(12000);
  tl.showCaption(CAPTIONS.bullets);
  await hoverFormatItem(tl, "bullets");

  // The page options (hover only)
  await tl.at(14500);
  tl.showCaption(CAPTIONS.page);
  await hoverFormatItem(tl, "headers", { ms: 650 });
  await tl.wait(250);
  await hoverFormatItem(tl, "page-numbers", { ms: 450 });
  await tl.wait(250);
  await hoverFormatItem(tl, "orientation", { ms: 450 });

  // Columns stays greyed out
  await tl.at(17000);
  tl.showCaption(CAPTIONS.columns);
  await hoverFormatItem(tl, "columns", { ms: 600 });

  // Clear formatting, with its shortcut
  await tl.at(19000);
  tl.showCaption(CAPTIONS.clear);
  await hoverFormatItem(tl, "clear", { ms: 600 });

  // The menu closes, hold, then the quick white fade
  await tl.at(21000);
  closeFormatMenu(tl);
  tl.hideCaption();
  await tl.at(22600);
  tl.setVar("fade", true);
  await tl.at(STEP31_DURATION_MS);
}
