import { chooseFileMenuItem, clickFileMenu } from "@/components/docs/file-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step5-data";

/** Snaarp Doc, step 5 - Share your document. Times are active milliseconds from the start of the step. */
export const STEP5_DURATION_MS = 20400;

/** Move onto a small dropdown option (hover it), then click it. */
async function pick(tl: Timeline, sel: string, ms = 450) {
  await tl.moveCursorTo(sel, { ms });
  tl.hover(sel);
  await tl.wait(350);
  await tl.click(sel);
  tl.hover(null);
}

export async function runStep5(tl: Timeline) {
  tl.placeCursor(0.5, 0.45); // where step 4 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // File > Share
  await tl.at(800);
  tl.showCaption(CAPTIONS.fileShare);
  await clickFileMenu(tl, { ms: 650 });
  await chooseFileMenuItem(tl, "share", { ms: 450 });

  // The dialog opens with the input focused
  await tl.at(3000);
  tl.setVar("share", true);
  tl.setVar("shareFocus", true);
  tl.showCaption(CAPTIONS.people);
  tl.highlight("[data-tl=share-input]");

  await tl.at(5500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.restricted);
  tl.highlight("[data-tl=share-access-row]");

  // General access: Restricted -> Anyone with the link
  await tl.at(8000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.anyone);
  tl.setVar("shareFocus", false);
  await tl.moveCursorTo("[data-tl=share-access-trigger]", { ms: 700 });
  await tl.click("[data-tl=share-access-trigger]");
  tl.setVar("shareMenu", "access");
  await tl.wait(500);
  await pick(tl, "[data-tl=share-access-opt-link]");
  tl.setVar("shareAccess", "link");
  tl.setVar("shareMenu", "");

  // Role: Viewer -> Commenter (hover) -> Editor
  await tl.at(11000);
  tl.showCaption(CAPTIONS.role);
  await tl.moveCursorTo("[data-tl=share-role-trigger]", { ms: 700 });
  await tl.click("[data-tl=share-role-trigger]");
  tl.setVar("shareMenu", "role");
  await tl.wait(300);
  await tl.moveCursorTo("[data-tl=share-role-opt-commenter]", { ms: 450 });
  tl.hover("[data-tl=share-role-opt-commenter]");

  await tl.at(13500);
  await pick(tl, "[data-tl=share-role-opt-editor]", 350);
  tl.setVar("shareRole", "editor");
  tl.setVar("shareMenu", "");

  // Copy link: hover only
  await tl.at(15500);
  tl.showCaption(CAPTIONS.copyLink);
  await tl.moveCursorTo("[data-tl=share-copy]", { ms: 650 });
  tl.hover("[data-tl=share-copy]");
  tl.highlight("[data-tl=share-copy]");

  // Done
  await tl.at(17000);
  tl.clearHighlight();
  tl.hover(null);
  tl.showCaption(CAPTIONS.done);
  await tl.moveCursorTo("[data-tl=share-done]", { ms: 650 });
  tl.highlight("[data-tl=share-done]");
  await tl.wait(200);
  await tl.click("[data-tl=share-done]");
  tl.clearHighlight();
  tl.setVar("share", false);

  // Hold, then quick white fade
  await tl.at(20000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP5_DURATION_MS);
}
