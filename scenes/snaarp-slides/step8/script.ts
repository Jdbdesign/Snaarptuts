import { SHARE_PEOPLE, SHARE_PUBLISH } from "@/components/slides/slides-data";
import { chooseSub, closeDialog, hoverItem, openFileMenu, pressOn, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, TOASTS, URLS } from "./data";

/** Snaarp Slides, step 8 - Share your presentation (File > Share). Starts in the editor with "Acme Studio Pitch". */
export const STEP8_DURATION_MS = 40000;

/** Move onto a small dropdown option (hover it), then click it. */
async function pick(tl: Timeline, sel: string, ms = 450) {
  await tl.moveCursorTo(sel, { ms });
  tl.hover(sel);
  await tl.wait(350);
  await tl.click(sel);
  tl.hover(null);
}

export async function runStep8(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Share > Share with others
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "share", { ms: 600 });
  await tl.at(3200);
  tl.showCaption(CAPTIONS.others);
  await chooseSub(tl, "share", "others", { ms: 300 });
  tl.setVar("share", true);
  tl.setVar("shareFocus", true);

  // Add a person
  await tl.at(5600);
  tl.showCaption(CAPTIONS.type);
  tl.highlight("[data-tl=share-input]");
  await tl.wait(500);
  await tl.typeText("share-input", SHARE_PEOPLE.email, { msPerChar: 55 });
  await tl.wait(500);
  tl.clearHighlight();
  tl.setVar("field:share-input", "");
  tl.setVar("shareFocus", false);
  tl.setVar("shareAdded", [{ name: SHARE_PEOPLE.addedName, email: SHARE_PEOPLE.email, initial: SHARE_PEOPLE.addedName[0], role: "Editor" }]);
  tl.showCaption(CAPTIONS.added);
  await tl.wait(100);
  tl.highlight("[data-tl=share-added]");

  // General access: Restricted -> Anyone with the link
  await tl.at(10300);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.access);
  await tl.moveCursorTo("[data-tl=share-access-trigger]", { ms: 700 });
  await tl.click("[data-tl=share-access-trigger]");
  tl.setVar("shareMenu", "access");
  await tl.wait(500);
  await pick(tl, "[data-tl=share-access-opt-link]");
  tl.setVar("shareAccess", "link");
  tl.setVar("shareMenu", "");

  // Role: Viewer -> Commenter
  await tl.at(13800);
  tl.showCaption(CAPTIONS.role);
  await tl.moveCursorTo("[data-tl=share-role-trigger]", { ms: 700 });
  await tl.click("[data-tl=share-role-trigger]");
  tl.setVar("shareMenu", "role");
  await tl.wait(400);
  await pick(tl, "[data-tl=share-role-opt-commenter]", 450);
  tl.setVar("shareRole", "commenter");
  tl.setVar("shareMenu", "");

  // Copy link
  await tl.at(17000);
  tl.showCaption(CAPTIONS.copy);
  await tl.moveCursorTo("[data-tl=share-copy]", { ms: 650 });
  tl.hover("[data-tl=share-copy]");
  tl.highlight("[data-tl=share-copy]");
  await tl.wait(250);
  await tl.click("[data-tl=share-copy]");
  tl.clearHighlight();
  tl.hover(null);
  toast(tl, TOASTS.linkCopied, 2400);

  // Done
  await tl.at(20200);
  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=share-done]", { ms: 650 });
  tl.setVar("share", false);

  // File > Share > Publish to web
  await tl.at(22800);
  tl.showCaption(CAPTIONS.publishOpen);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "share", { ms: 500 });

  await tl.at(25500);
  tl.showCaption(CAPTIONS.publish);
  await chooseSub(tl, "share", "publish", { ms: 300 });
  tl.setVar("dialog", "publish");

  await tl.at(28000);
  tl.showCaption(CAPTIONS.publishClick);
  await pressOn(tl, "[data-tl=publish-ok]", { ms: 800 });
  tl.setVar("publishState", "published");
  toast(tl, SHARE_PUBLISH.publishedToast, 2800);

  await tl.at(31500);
  tl.showCaption(CAPTIONS.live);
  await tl.wait(100);
  tl.highlight("[data-tl=publish-link]");

  await tl.at(34300);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.stop);
  await tl.moveCursorTo("[data-tl=publish-stop]", { ms: 700 });
  tl.hover("[data-tl=publish-stop]");

  await tl.at(36800);
  tl.hover(null);
  tl.showCaption(CAPTIONS.finish);
  await pressOn(tl, "[data-tl=publish-done]", { ms: 600 });
  closeDialog(tl);

  // Quick white fade
  await tl.at(38900);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP8_DURATION_MS);
}
