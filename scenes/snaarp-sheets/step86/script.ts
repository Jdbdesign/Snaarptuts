import type { Timeline } from "@/lib/timeline";
import { runFind, runReplaceAll, runReplaceOne, closeFind } from "@/components/sheets/edit-timeline";
import { beginTb, hoverTool, pressTool } from "@/components/sheets/toolbar-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, FIND86 } from "./data";

/** Snaarp Sheets, step 86 - the Search tool: the shared Find and replace card. Starts on the sample budget with A1 selected. */
export const STEP86_DURATION_MS = 40500;

export async function runStep86(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "search", { hold: 1400 });
  tl.showCaption(CAPTIONS.open);
  await pressTool(tl, "search");
  tl.setVar("findOpen", true);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.card);
  await ring(tl, "[data-tl=find-card]", 2000);

  tl.showCaption(CAPTIONS.find);
  await typeInto(tl, "find", FIND86.first, { msPerChar: 100 });
  await tl.wait(300);
  tl.showCaption(CAPTIONS.click);
  await pressOn(tl, "[data-tl=find-btn]", { ms: 650 });
  runFind(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.found);
  await ring(tl, "[data-tl=find-count]", 2200);
  tl.showCaption(CAPTIONS.next);
  await pressOn(tl, "[data-tl=find-btn]", { ms: 600 });
  runFind(tl);
  await ring(tl, "[data-tl=find-count]", 1800);

  tl.showCaption(CAPTIONS.replace);
  await typeInto(tl, "replace", FIND86.replacement, { msPerChar: 90 });
  await pressOn(tl, "[data-tl=find-replace]", { ms: 650 });
  runReplaceOne(tl);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.replaced);
  await ring(tl, "[data-tl=cell-a5]", 2200);

  tl.showCaption(CAPTIONS.scope);
  await pressOn(tl, "[data-tl=find-scope]", { ms: 650, ring: false });
  tl.setVar("findScopeOpen", true);
  await tl.wait(500);
  await pressOn(tl, "[data-tl=find-scope-this]", { ms: 500, ring: false });
  tl.setVar("findScope", "This sheet");
  tl.setVar("findScopeOpen", false);
  await tl.wait(400);
  tl.showCaption(CAPTIONS.options);
  await ring(tl, "[data-tl=find-regex]", 2200);

  tl.showCaption(CAPTIONS.all);
  tl.setVar("field:find", "");
  tl.setVar("field:replace", "");
  tl.setVar("findHits", null);
  tl.setVar("findNow", -1);
  await typeInto(tl, "find", FIND86.second, { msPerChar: 100 });
  await typeInto(tl, "replace", FIND86.secondTo, { msPerChar: 90 });
  await pressOn(tl, "[data-tl=find-btn]", { ms: 500 });
  runFind(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.replaceAll);
  await pressOn(tl, "[data-tl=find-replace-all]", { ms: 650 });
  runReplaceAll(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-f2]", 2200);

  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=find-done]", { ms: 650 });
  closeFind(tl);
  await finish(tl, 700);
}
