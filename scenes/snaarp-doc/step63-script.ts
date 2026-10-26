import { initEditor } from "@/components/docs/editor-timeline";
import { closeMenu, initToolbar, openMenu, pointAt, pressButton } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, HOVER_TILES, START_EDITOR, URLS } from "./step63-data";

/** Snaarp Doc, step 63 - Open the Snaarp apps panel. Times are active milliseconds from the start of the step. */
export const STEP63_DURATION_MS = 28000;

export async function runStep63(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The grid button opens the panel
  await tl.at(800);
  tl.showCaption(CAPTIONS.button);
  await openMenu(tl, "apps", "header-apps", { tipMs: 1100 });

  // The tiles: the current product is tinted
  await tl.at(5000);
  tl.showCaption(CAPTIONS.panel);
  tl.highlight("[data-tl=menu-apps]");
  await tl.at(8500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.current);
  tl.highlight("[data-tl=app-docs]");
  await tl.at(11500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.hover);
  for (const id of HOVER_TILES) {
    await tl.moveCursorTo(`[data-tl=app-${id}]`, { ms: 600 });
    tl.hover(`[data-tl=app-${id}]`);
    await tl.wait(700);
  }
  tl.hover(null);

  // Scroll the panel for more apps, then back up
  await tl.at(16000);
  tl.showCaption(CAPTIONS.scroll);
  await tl.moveCursorTo("[data-tl=apps-scroll]", { ms: 500 });
  await tl.scrollPanelTo("[data-tl=apps-scroll]", "bottom", 1800);
  await tl.wait(900);
  await tl.scrollPanelTo("[data-tl=apps-scroll]", "top", 1200);

  // Close it with the same button
  await tl.at(22000);
  tl.showCaption(CAPTIONS.close);
  await pointAt(tl, "header-apps", { tipMs: 300 });
  await pressButton(tl, "header-apps");
  closeMenu(tl);

  await tl.at(25000);
  tl.hideCaption();
  await tl.at(27600);
  tl.setVar("fade", true);
  await tl.at(STEP63_DURATION_MS);
}
