import type { Timeline } from "@/lib/timeline";
import { LOCATE } from "@/components/sheets/sheets-data";
import { runLocate } from "../locate";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 12 - File > Add shortcut to Drive. Starts on "Acme Studio – Q3 Budget". */
export const STEP12_DURATION_MS = 20800;

export async function runStep12(tl: Timeline) {
  begin(tl, URLS.renamed);
  await runLocate(tl, "shortcut", "shortcut", CAPTIONS, LOCATE.shortcutToast);
}
