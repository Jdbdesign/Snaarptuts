import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf, pushPdfToast } from "@/components/pdf/pdf-timeline";
import { STEP15_DURATION_MS } from "./data";

export { STEP15_DURATION_MS };

export async function runStep15(tl: Timeline) {
  beginPdf(tl, "pdf-manage-pages", {
    view: "editor",
    editorPage: 1,
  });

  // 1. Click Manage Pages tool
  await tl.at(400);
  tl.showCaption("Click Manage Pages to organize your document pages.");
  await tl.moveCursorTo("[data-tl=tool-managePages]", { ms: 550 });
  await tl.click("[data-tl=tool-managePages]");
  tl.setVar("pdf:isManagePagesOpen", true);

  // 2. Click Select All
  await tl.at(2500);
  tl.showCaption("Click Select All to select every page.");
  await tl.moveCursorTo("[data-tl=mp-select-all-btn]", { ms: 500 });
  await tl.click("[data-tl=mp-select-all-btn]");

  // 3. Click Page 2 card
  await tl.at(5200);
  tl.showCaption("Click Page 2 to review or reorder individual pages.");
  await tl.moveCursorTo("[data-tl=mp-page-card-2]", { ms: 550 });
  await tl.click("[data-tl=mp-page-card-2]");
  await tl.wait(1200);

  // 4. Click Save button
  await tl.at(8000);
  tl.showCaption("Click Save to confirm your page arrangement.");
  await tl.moveCursorTo("[data-tl=mp-save-btn]", { ms: 600 });
  await tl.click("[data-tl=mp-save-btn]");
  tl.setVar("pdf:isManagePagesOpen", false);
  pushPdfToast(tl, "Pages saved");
  await tl.wait(2000);

  await finishPdf(tl);
}
