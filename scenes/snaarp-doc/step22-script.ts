import { dragSelectBlock, initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertItem, clickInsertMenu } from "@/components/docs/insert-menu-timeline";
import { applyLink, closeLinkDialog, openLinkDialog } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { ADDRESS, CAPTIONS, LINK_ID, URLS } from "./step22-data";

/** Snaarp Doc, step 22 - Insert a link. Times are active milliseconds from the start of the step. */
export const STEP22_DURATION_MS = 25000;

export async function runStep22(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Select the heading: it turns blue and the floating toolbar appears
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectBlock(tl, "h1");

  // Insert > Link (the Ctrl+K shortcut shows in the menu): the dialog opens with the URL input focused
  await tl.at(4000);
  tl.showCaption(CAPTIONS.insertLink);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "link");
  openLinkDialog(tl);

  // Type the web address
  await tl.at(7000);
  tl.showCaption(CAPTIONS.type);
  await tl.typeText("link-url", ADDRESS, { msPerChar: 90 });

  // Open in new tab stays ticked
  await tl.at(11500);
  tl.showCaption(CAPTIONS.newTab);
  await tl.moveCursorTo("[data-tl=link-newtab]", { ms: 700 });
  tl.highlight("[data-tl=link-newtab]");

  // Insert: the dialog closes and the heading becomes a link
  await tl.at(15000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.insert);
  await tl.moveCursorTo("[data-tl=link-insert]", { ms: 800 });
  tl.highlight("[data-tl=link-insert]");
  await tl.wait(200);
  await tl.click("[data-tl=link-insert]");
  tl.clearHighlight();
  closeLinkDialog(tl);
  applyLink(tl, LINK_ID);

  // The link
  await tl.at(18500);
  tl.showCaption(CAPTIONS.done);
  await tl.moveCursorTo(`[data-tl=doc-link-${LINK_ID}]`, { ms: 800 });
  tl.highlight(`[data-tl=doc-link-${LINK_ID}]`);

  // Hold, then the quick white fade
  await tl.at(22000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(24600);
  tl.setVar("fade", true);
  await tl.at(STEP22_DURATION_MS);
}
