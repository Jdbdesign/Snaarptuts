import { clickEndOfBlock, dragSelectBlock, initEditor } from "@/components/docs/editor-timeline";
import { clickInBlock } from "@/components/docs/format-timeline";
import { setFormatValue, setHeading } from "@/components/docs/format-state";
import { chooseRow, edit, initToolbar, openMenu } from "@/components/docs/toolbar-timeline";
import { fontSlug } from "@/components/docs/ToolbarLayer";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, FONT, START_EDITOR, TEXT_ID, TITLE_ID, URLS } from "./step48-data";

/** Snaarp Doc, step 48 - Paragraph styles and fonts. Times are active milliseconds from the start of the step. */
export const STEP48_DURATION_MS = 33000;

export async function runStep48(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click in the title line, open the style box, choose Heading 2
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickInBlock(tl, TITLE_ID, 6);
  await tl.at(3000);
  tl.showCaption(CAPTIONS.style);
  await openMenu(tl, "style", "tool-style", { tipMs: 700 });
  await tl.at(5500);
  tl.showCaption(CAPTIONS.h2);
  await chooseRow(tl, "tm-style-h2", () => edit(tl, (s) => setHeading(s, 2)));
  await tl.at(8500);
  tl.showCaption(CAPTIONS.heading);
  tl.highlight(`[data-tl=doc-block-${TITLE_ID}]`);

  // Select the sentence, open the font box, choose Georgia
  await tl.at(11000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.select);
  await dragSelectBlock(tl, TEXT_ID, { dragMs: 1200 });
  await tl.at(14500);
  tl.showCaption(CAPTIONS.font);
  await openMenu(tl, "font", "tool-font", { tipMs: 700 });
  await tl.at(18000);
  tl.showCaption(CAPTIONS.georgia);
  await chooseRow(tl, `tm-font-${fontSlug(FONT)}`, () => edit(tl, (s) => setFormatValue(s, "font", FONT)), { holdMs: 600 });

  // The result: click away so the selection clears
  await tl.at(22500);
  await clickEndOfBlock(tl, TEXT_ID);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${TEXT_ID}]`);
  await tl.at(28500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(32600);
  tl.setVar("fade", true);
  await tl.at(STEP48_DURATION_MS);
}
