import { SHARE_PEOPLE } from "@/components/slides/slides-data";
import { SHARE_STEP } from "@/components/slides/slides-tools-data";
import { pressOn, ring, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 56 - Share and set permissions. Starts in the editor on slide 2. The last step: the completion card follows. */
export const STEP56_DURATION_MS = 38000;

/** Move onto a small dropdown option (hover it), then click it. */
async function pick(tl: Timeline, sel: string, ms = 450) {
  await tl.moveCursorTo(sel, { ms });
  tl.hover(sel);
  await tl.wait(350);
  await tl.click(sel);
  tl.hover(null);
}

export async function runStep56(tl: Timeline) {
  beginEiv(tl);
  for (const [k, v] of [["share", false], ["shareAccess", "restricted"], ["shareRole", "viewer"], ["shareMenu", ""], ["shareAdded", []], ["collab", "1"], ["collabOn", false]] as const) tl.setVar(k, v);

  // Open Share, add a person
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await pressOn(tl, "[data-tl=editor-share]", { ms: 900 });
  tl.setVar("share", true);
  tl.setVar("shareFocus", true);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.add);
  tl.highlight("[data-tl=share-input]");
  await tl.wait(400);
  await tl.typeText("share-input", SHARE_PEOPLE.email, { msPerChar: 55 });
  await tl.wait(500);
  tl.clearHighlight();
  tl.setVar("field:share-input", "");
  tl.setVar("shareFocus", false);
  tl.setVar("shareAdded", [{ name: SHARE_PEOPLE.addedName, email: SHARE_PEOPLE.email, initial: SHARE_PEOPLE.addedName[0], role: "Editor" }]);
  tl.showCaption(CAPTIONS.added);
  await tl.wait(100);
  tl.highlight("[data-tl=share-added]");
  await tl.wait(1400);
  tl.clearHighlight();

  // General access: Restricted -> Anyone with the link
  await tl.at(10000);
  tl.showCaption(CAPTIONS.access);
  await tl.moveCursorTo("[data-tl=share-access-trigger]", { ms: 700 });
  await tl.click("[data-tl=share-access-trigger]");
  tl.setVar("shareMenu", "access");
  await tl.wait(500);
  await pick(tl, "[data-tl=share-access-opt-link]");
  tl.setVar("shareAccess", "link");
  tl.setVar("shareMenu", "");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.link);
  await tl.wait(1400);

  // Role: Viewer -> Commenter -> Editor
  await tl.at(15500);
  tl.showCaption(CAPTIONS.role);
  await tl.moveCursorTo("[data-tl=share-role-trigger]", { ms: 700 });
  await tl.click("[data-tl=share-role-trigger]");
  tl.setVar("shareMenu", "role");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.commenter);
  await pick(tl, "[data-tl=share-role-opt-commenter]", 450);
  tl.setVar("shareRole", "commenter");
  tl.setVar("shareMenu", "");
  await tl.wait(1300);
  await tl.moveCursorTo("[data-tl=share-role-trigger]", { ms: 500 });
  await tl.click("[data-tl=share-role-trigger]");
  tl.setVar("shareMenu", "role");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.editor);
  await pick(tl, "[data-tl=share-role-opt-editor]", 450);
  tl.setVar("shareRole", "editor");
  tl.setVar("shareMenu", "");
  await tl.wait(1300);

  // Copy link
  await tl.at(25000);
  tl.showCaption(CAPTIONS.copy);
  await tl.moveCursorTo("[data-tl=share-copy]", { ms: 650 });
  tl.hover("[data-tl=share-copy]");
  tl.highlight("[data-tl=share-copy]");
  await tl.wait(250);
  await tl.click("[data-tl=share-copy]");
  tl.clearHighlight();
  tl.hover(null);
  toast(tl, SHARE_STEP.linkToast, 2400);

  // Done: the header count updates
  await tl.at(28500);
  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=share-done]", { ms: 650 });
  tl.setVar("share", false);
  await tl.wait(500);
  tl.setVar("collab", SHARE_STEP.collaboratorsAfter);
  tl.setVar("collabOn", true);
  tl.showCaption(CAPTIONS.count);
  await ring(tl, "[data-tl=header-collab]", 2200);
  tl.showCaption(CAPTIONS.finish);

  await tl.at(36300);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP56_DURATION_MS);
}
