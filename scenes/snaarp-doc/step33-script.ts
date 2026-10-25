import { initEditor } from "@/components/docs/editor-timeline";
import type { FormatSubItemId } from "@/components/docs/format-menu-data";
import { chooseFormatSub, clickFormatMenu, clickInBlock, hoverFormatItem, hoverFormatSub, initFormatMenu } from "@/components/docs/format-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, CLICK_OFFSET, HEADING_ID, START_EDITOR, URLS } from "./step33-data";

/** Snaarp Doc, step 33 - Use paragraph styles. Times are active milliseconds from the start of the step. */
export const STEP33_DURATION_MS = 30000;

/** Format > Paragraph styles > one style. */
async function chooseStyle(tl: Timeline, id: FormatSubItemId) {
  await clickFormatMenu(tl);
  await chooseFormatSub(tl, "paragraph", id);
}

export async function runStep33(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click in the first practice line: the caret shows and the style box says "Normal text"
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickInBlock(tl, HEADING_ID, CLICK_OFFSET);

  // Open Format > Paragraph styles and look down the list
  await tl.at(2800);
  tl.showCaption(CAPTIONS.menu);
  await clickFormatMenu(tl);
  await hoverFormatItem(tl, "paragraph");
  await tl.at(5000);
  tl.showCaption(CAPTIONS.smaller);
  await hoverFormatSub(tl, "style-h1", { ms: 500 });
  await tl.wait(500);
  await hoverFormatSub(tl, "style-h2", { ms: 450 });
  await tl.wait(500);
  await hoverFormatSub(tl, "style-h3", { ms: 450 });

  // Heading 1
  await tl.at(8000);
  tl.showCaption(CAPTIONS.h1);
  await chooseFormatSub(tl, "paragraph", "style-h1", { stay: true });

  // Heading 2, Heading 3, back to Normal text, then Heading 2 for good
  await tl.at(12000);
  tl.showCaption(CAPTIONS.h2);
  await chooseStyle(tl, "style-h2");
  await tl.at(16000);
  tl.showCaption(CAPTIONS.h3);
  await chooseStyle(tl, "style-h3");
  await tl.at(20000);
  tl.showCaption(CAPTIONS.normal);
  await chooseStyle(tl, "style-normal");
  await tl.at(24000);
  tl.showCaption(CAPTIONS.keep);
  await chooseStyle(tl, "style-h2");

  // Hold, then the quick white fade
  await tl.at(27000);
  tl.hideCaption();
  await tl.at(29600);
  tl.setVar("fade", true);
  await tl.at(STEP33_DURATION_MS);
}
