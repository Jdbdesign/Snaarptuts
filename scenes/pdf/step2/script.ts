import type { Timeline } from "@/lib/timeline";
import { beginPdf, finishPdf } from "@/components/pdf/pdf-timeline";

export const STEP2_DURATION_MS = 17500;

export async function runStep2(tl: Timeline) {
  beginPdf(tl, "pdf-browse-files");

  // Beat 1: Switch to grid view
  await tl.at(400);
  tl.showCaption("Switch to grid view to preview documents as cards.");
  await tl.moveCursorTo("[data-tl=view-toggle-grid]", { ms: 600 });
  await tl.click("[data-tl=view-toggle-grid]");
  tl.setVar("pdf:viewMode", "grid");
  await tl.wait(1800);

  // Beat 2: Switch back to list view
  await tl.at(2800);
  tl.showCaption("Switch back to list view for detailed file information.");
  await tl.moveCursorTo("[data-tl=view-toggle-list]", { ms: 500 });
  await tl.click("[data-tl=view-toggle-list]");
  tl.setVar("pdf:viewMode", "list");
  await tl.wait(1500);

  // Beat 3: Filter by PDF tab
  await tl.at(4900);
  tl.showCaption("Filter by PDF documents.");
  await tl.moveCursorTo("[data-tl=tab-pdf]", { ms: 500 });
  await tl.click("[data-tl=tab-pdf]");
  tl.setVar("pdf:filterTab", "pdf");
  await tl.wait(1500);

  // Beat 4: All tab
  await tl.at(7000);
  tl.showCaption("View all documents.");
  await tl.moveCursorTo("[data-tl=tab-all]", { ms: 500 });
  await tl.click("[data-tl=tab-all]");
  tl.setVar("pdf:filterTab", "all");
  await tl.wait(1500);

  // Beat 5: Search
  await tl.at(9100);
  tl.showCaption("Type a keyword to find files.");
  await tl.moveCursorTo("[data-tl=files-search-input]", { ms: 500 });
  await tl.click("[data-tl=files-search-input]");
  await tl.typeText("[data-tl=files-search-input]", "logos", { msPerChar: 60 });
  tl.setVar("field:files-search-input", "logos");
  tl.setVar("pdf:searchQuery", "logos");
  await tl.wait(1600);

  // Beat 6: Clear search
  await tl.at(12200);
  tl.showCaption("Clear search to show all files.");
  await tl.moveCursorTo("[data-tl=files-search-input]", { ms: 400 });
  await tl.click("[data-tl=files-search-input]");
  tl.setVar("field:files-search-input", "");
  tl.setVar("pdf:searchQuery", "");
  await tl.wait(1200);

  // Beat 7: Hover download
  await tl.at(14000);
  tl.showCaption("Hover the download icon.");
  await tl.moveCursorTo("[data-tl=action-download-row-1]", { ms: 500 });
  await tl.wait(1400);

  // Beat 8: Hover more
  await tl.at(15800);
  tl.showCaption("Hover more options for additional actions.");
  await tl.moveCursorTo("[data-tl=action-more-row-1]", { ms: 500 });
  await tl.wait(1400);

  await finishPdf(tl);
}
