import type { Timeline } from "@/lib/timeline";
import { beginTb, doLook, dragSelect, hoverTool, openTool, pickRow } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS } from "./data";

/** Snaarp Sheets, step 103 - Text rotation on the narrow headers E1:I1: Tilt up, Tilt down, Vertical, Rotate up, None. Starts with A1 selected. */
export const STEP103_DURATION_MS = 41500;

type Turn = "tiltup" | "tiltdown" | "stack" | "up" | "none";

export async function runStep103(tl: Timeline) {
  beginTb(tl, "a1");

  await tl.at(600);
  tl.showCaption(CAPTIONS.start);
  await dragSelect(tl, "e1", "i1", { ms: 900 });
  tl.showCaption(CAPTIONS.hover);
  await hoverTool(tl, "rotate", { hold: 1200 });
  tl.showCaption(CAPTIONS.open);
  await openTool(tl, "rotate", { hold: 100 });
  tl.showCaption(CAPTIONS.list);
  await tl.wait(900);
  const steps: [Turn, string][] = [["tiltup", CAPTIONS.tiltUp], ["tiltdown", CAPTIONS.tiltDown], ["stack", CAPTIONS.vertical], ["up", CAPTIONS.rotateUp], ["none", CAPTIONS.none]];
  for (const [id, cap] of steps) {
    tl.showCaption(cap);
    await pickRow(tl, "rotate", id, () => doLook(tl, { rotate: id === "none" ? undefined : id }));
    if (id === "tiltup") {
      tl.showCaption(CAPTIONS.tiltUpDone);
    }
    await ring(tl, "[data-tl=cell-f1]", 1700);
    if (id !== "none") await openTool(tl, "rotate", { hold: 200 });
  }
  tl.showCaption(CAPTIONS.end);
  await finish(tl, 1200);
}
