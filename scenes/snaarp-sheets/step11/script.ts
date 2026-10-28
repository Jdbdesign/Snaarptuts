import type { Timeline } from "@/lib/timeline";
import { LOCATE } from "@/components/sheets/sheets-data";
import { runLocate } from "../locate";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 11 - File > Move. Starts on "Acme Studio – Q3 Budget". */
export const STEP11_DURATION_MS = 20700;

export async function runStep11(tl: Timeline) {
  begin(tl, URLS.renamed);
  await runLocate(tl, "move", "move", CAPTIONS, LOCATE.movedToast);
}
