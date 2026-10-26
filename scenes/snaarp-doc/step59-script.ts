import { initEditor } from "@/components/docs/editor-timeline";
import {
  chooseSymbolCategory,
  clickEndAndNewLine,
  clickSymbol,
  closeInsertDialog,
  deselectObjects,
  insertObject,
  openDrawing,
  openSymbols,
} from "@/components/docs/insert-timeline";
import { clickTool, initToolbar } from "@/components/docs/toolbar-timeline";
import { enterFullScreen, pressEscFromFullScreen } from "@/components/docs/view-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, EMOJI_INDEX, PRACTICE_ID, START_EDITOR, URLS } from "./step59-data";

/** Snaarp Doc, step 59 - Full screen, draw and emoji. Times are active milliseconds from the start of the step. */
export const STEP59_DURATION_MS = 41000;

export async function runStep59(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.setVar("fullScreen", false);
  tl.setVar("pageObjects", []);
  tl.setVar("insertDialog", "");
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Full screen, then Esc
  await tl.at(800);
  tl.showCaption(CAPTIONS.fullscreen);
  await clickTool(tl, "fullscreen", () => enterFullScreen(tl), { tipMs: 900 });
  await tl.at(4800);
  tl.showCaption(CAPTIONS.focus);
  await tl.at(8000);
  tl.showCaption(CAPTIONS.esc);
  await pressEscFromFullScreen(tl);

  // Drawing: a new line, the Drawing button, the pen
  await tl.at(11500);
  tl.showCaption(CAPTIONS.line);
  await clickEndAndNewLine(tl, PRACTICE_ID);
  await tl.at(14000);
  tl.showCaption(CAPTIONS.drawing);
  await clickTool(tl, "drawing", () => openDrawing(tl), { tipMs: 900 });
  await tl.at(17000);
  tl.showCaption(CAPTIONS.draw);
  await tl.followPath("[data-tl=draw-stroke]", 3000, (p) => tl.setVar("drawProgress", p));
  await tl.at(21000);
  tl.showCaption(CAPTIONS.insert);
  await tl.moveCursorTo("[data-tl=draw-insert]", { ms: 800 });
  tl.highlight("[data-tl=draw-insert]");
  await tl.wait(200);
  await tl.click("[data-tl=draw-insert]");
  tl.clearHighlight();
  const below = insertObject(tl, "drawing", { trailingLine: true });

  // Symbols & Emoji: the Emoji tab, one emoji
  await tl.at(24500);
  tl.showCaption(CAPTIONS.below);
  await tl.moveCursorTo(`[data-tl=doc-end-${below}]`, { ms: 800, dx: 3 });
  await tl.click(`[data-tl=doc-end-${below}]`);
  deselectObjects(tl);
  await tl.at(27000);
  tl.showCaption(CAPTIONS.emoji);
  await clickTool(tl, "emoji", () => openSymbols(tl), { tipMs: 900 });
  await tl.at(30000);
  tl.showCaption(CAPTIONS.tab);
  await chooseSymbolCategory(tl, "emoji");
  await tl.at(32500);
  tl.showCaption(CAPTIONS.pick);
  await clickSymbol(tl, EMOJI_INDEX);
  await tl.at(35000);
  tl.showCaption(CAPTIONS.close);
  await tl.moveCursorTo("[data-tl=sym-close]", { ms: 800 });
  tl.highlight("[data-tl=sym-close]");
  await tl.wait(200);
  await tl.click("[data-tl=sym-close]");
  tl.clearHighlight();
  closeInsertDialog(tl);

  await tl.at(37500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(39000);
  tl.hideCaption();
  await tl.at(40600);
  tl.setVar("fade", true);
  await tl.at(STEP59_DURATION_MS);
}
