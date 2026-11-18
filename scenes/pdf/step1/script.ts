import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP1_DURATION_MS = 15000;

export async function runStep1(tl: Timeline) {
  beginPdf(tl, "pdf-meet");

  await tl.at(400);
  tl.showCaption("Access Snaarp apps from the suite rail on the left.");
  await tl.moveCursorTo("[data-tl=pdf-suite-rail]", { ms: 600 });
  tl.highlight("[data-tl=pdf-suite-rail]");
  await tl.wait(1800);

  await tl.at(2800);
  tl.showCaption("Navigate your PDF library, uploads and tools.");
  await tl.moveCursorTo("[data-tl=pdf-sidebar]", { ms: 550 });
  tl.highlight("[data-tl=pdf-sidebar]");
  await tl.wait(1800);

  await tl.at(5200);
  tl.showCaption("Convert, edit, translate, or sign documents.");
  await tl.moveCursorTo("[data-tl=quick-cards-row]", { ms: 550 });
  tl.highlight("[data-tl=quick-cards-row]");
  await tl.wait(1800);

  await tl.at(7600);
  tl.showCaption("Browse and manage your uploaded files.");
  await tl.moveCursorTo("[data-tl=files-table-container]", { ms: 550 });
  tl.highlight("[data-tl=files-table-container]");
  await tl.wait(1800);

  await tl.at(10000);
  tl.showCaption("Search across your PDF files.");
  await tl.moveCursorTo("[data-tl=files-search-input]", { ms: 500 });
  tl.highlight("[data-tl=files-search-input]");
  await tl.wait(1600);

  await tl.at(12200);
  tl.showCaption("Upload documents directly to your library.");
  await tl.moveCursorTo("[data-tl=upload-file-btn]", { ms: 500 });
  tl.highlight("[data-tl=upload-file-btn]");
  await tl.wait(1500);

  await finishPdf(tl);
}
