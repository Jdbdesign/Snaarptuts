import { clickModeItem, clickViewMenu, hoverViewItem } from "@/components/docs/view-menu-timeline";
import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step14-data";

/** Snaarp Doc, step 14 - Change the editing mode. Times are active milliseconds from the start of the step. */
export const STEP14_DURATION_MS = 16000;

export async function runStep14(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // where step 13 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // View > Mode > Suggesting: the header toggle switches
  await tl.at(800);
  tl.showCaption(CAPTIONS.view);
  await clickViewMenu(tl);
  await tl.at(2200);
  tl.showCaption(CAPTIONS.mode);
  await hoverViewItem(tl, "mode");
  await tl.at(3600);
  tl.showCaption(CAPTIONS.suggesting);
  await clickModeItem(tl, "suggesting");

  // View > Mode > Viewing: the whole toolbar hides and neither pill is selected
  await tl.at(6500);
  await clickViewMenu(tl);
  await hoverViewItem(tl, "mode");
  await tl.at(8000);
  tl.showCaption(CAPTIONS.viewing);
  await clickModeItem(tl, "viewing");

  // View > Mode > Editing: back to writing
  await tl.at(10800);
  await clickViewMenu(tl);
  await hoverViewItem(tl, "mode");
  await tl.at(12200);
  tl.showCaption(CAPTIONS.editing);
  await clickModeItem(tl, "editing");

  // Hold, then the quick white fade
  await tl.at(15600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP14_DURATION_MS);
}
