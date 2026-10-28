import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { DOWNLOAD, FILE_SUBS, SHEET } from "@/components/sheets/sheets-data";
import { closeFileMenu, hoverItem, hoverSub, openFileMenu } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, FORMATS, URLS } from "./data";

/** Snaarp Sheets, step 9 - File > Download. Starts on "Budget draft". No real file is downloaded. */
export const STEP9_DURATION_MS = 22500;

export async function runStep9(tl: Timeline) {
  begin(tl, URLS.budget);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await hoverItem(tl, "download", { ms: 650 });
  tl.highlight("[data-tl=file-item-download]");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(1500);
  tl.clearHighlight();

  // Every format, one short caption each
  for (const f of FILE_SUBS.download) {
    tl.showCaption(FORMATS[f.id]);
    await hoverSub(tl, f.id, { ms: f.id === "xlsx" ? 600 : 380 });
    await tl.wait(1400);
  }

  // Choose Excel
  tl.showCaption(CAPTIONS.click);
  await hoverSub(tl, "xlsx", { ms: 700 });
  tl.highlight("[data-tl=file-sub-xlsx]");
  await tl.wait(300);
  await tl.click("[data-tl=file-sub-xlsx]");
  tl.clearHighlight();
  closeFileMenu(tl);

  const ext = FILE_SUBS.download[0].ext;
  const label = FILE_SUBS.download[0].label;
  showDocToast(tl, DOWNLOAD.starting(label), "loading");
  await tl.wait(1600);
  showDocToast(tl, DOWNLOAD.done(`${SHEET.draft}.${ext}`), "success", 3000);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 2800);
}
