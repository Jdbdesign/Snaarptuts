import { clickEndOfBlock, initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertSub, clickInsertMenu, closeInsertMenu, hoverInsertItem, hoverInsertSub } from "@/components/docs/insert-menu-timeline";
import { leaveZones, typeInZone } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { BODY_BLOCK, CAPTIONS, HEADER_TEXT, URLS } from "./step25-data";

/** Snaarp Doc, step 25 - Add a header and footer. Times are active milliseconds from the start of the step. */
export const STEP25_DURATION_MS = 30000;

export async function runStep25(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Insert > Page elements: the submenu opens
  await tl.at(800);
  tl.showCaption(CAPTIONS.insertPageElements);
  await clickInsertMenu(tl);
  await hoverInsertItem(tl, "page-elements");

  // Header: the zone appears at the top of the page, with its dotted line and the caret inside
  await tl.at(3000);
  tl.showCaption(CAPTIONS.chooseHeader);
  await chooseInsertSub(tl, "header");

  // Type the header text
  await tl.at(6000);
  tl.showCaption(CAPTIONS.typeHeader);
  await typeInZone(tl, "header", HEADER_TEXT, { msPerChar: 110 });

  // Click in the page: the caret leaves the header, the text stays
  await tl.at(10000);
  tl.showCaption(CAPTIONS.leave);
  await clickEndOfBlock(tl, BODY_BLOCK);
  leaveZones(tl);

  // Footer: the menu opens again; the footer row is only hovered (the recording never fills it in)
  await tl.at(13000);
  tl.showCaption(CAPTIONS.footerInsert);
  await clickInsertMenu(tl);
  await hoverInsertItem(tl, "page-elements");
  await tl.at(16500);
  tl.showCaption(CAPTIONS.footer);
  await hoverInsertSub(tl, "footer");
  await tl.at(21000);
  closeInsertMenu(tl);

  // Hold, then the quick white fade
  await tl.at(24000);
  tl.hideCaption();
  await tl.at(29600);
  tl.setVar("fade", true);
  await tl.at(STEP25_DURATION_MS);
}
