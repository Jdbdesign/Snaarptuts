import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { FUNCTIONS } from "@/components/sheets/insert-data";
import { chooseSub, dragSelect, openMenu } from "@/components/sheets/edit-timeline";
import { applyFunction, beginInsert } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 47 - Insert > Function: SUM, AVERAGE, COUNT, MAX, MIN and IF on the Cost column, then More functions (MEDIAN). */
export const STEP47_DURATION_MS = 44800;

export async function runStep47(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  const [a, b] = ["c2", "c5"];

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await dragSelect(tl, a, b, { ms: 750 });
  await tl.wait(300);

  const six = [
    ["sum", CAPTIONS.sum],
    ["average", CAPTIONS.average],
    ["count", CAPTIONS.count],
    ["max", CAPTIONS.max],
    ["min", CAPTIONS.min],
    ["if", CAPTIONS.if],
  ] as const;
  for (let i = 0; i < six.length; i++) {
    const [id, caption] = six[i];
    tl.showCaption(i === 0 ? CAPTIONS.open : caption);
    await openMenu(tl, "insert", { ms: i === 0 ? 800 : 650 });
    tl.showCaption(caption);
    await chooseSub(tl, "ins-function", `fn-${id}`, { ms: 420, hold: 300 });
    await applyFunction(tl, id, i);
    if (i === 0) {
      tl.showCaption(CAPTIONS.bar);
      await ring(tl, "[data-tl=formula-bar]", 1700);
    }
    await ring(tl, `[data-tl=cell-i${2 + i}]`, 900);
    tl.setVar("refRange", null);
  }

  tl.showCaption(CAPTIONS.more);
  await openMenu(tl, "insert", { ms: 650 });
  await chooseSub(tl, "ins-function", "fn-more", { ms: 420, hold: 300 });
  tl.setVar("fnOpen", true);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.search);
  await typeInto(tl, "fn-search", FUNCTIONS.moreQuery, { msPerChar: 140 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, "[data-tl=fn-row-MEDIAN]", { ms: 700 });
  tl.setVar("fnOpen", false);
  tl.setVar("focus", "");
  await tl.wait(400);
  await applyFunction(tl, "median", 6);
  await ring(tl, "[data-tl=cell-i8]", 1600);
  tl.setVar("refRange", null);
  await finish(tl, 600);
}
