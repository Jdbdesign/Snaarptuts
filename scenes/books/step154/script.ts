import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP154_DURATION_MS = 40000;

export async function runStep154(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.billDetails, "bill-detail", [0.5, 0.15], 154);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickSendBill);
  await pressOn(tl, "[data-tl=btn-send-bill]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.ringSendingToast);
  await ring(tl, "[data-tl=chip-bill-sending]", 1200);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.clickPreviewPdf);
  await pressOn(tl, "[data-tl=btn-preview-bill-pdf]");
  await tl.wait(800);
  await ring(tl, "[data-tl=pdf-document-paper]", 1200);

  tl.showCaption(CAPTIONS.closePreview);
  await pressOn(tl, "[data-tl=btn-close-bill-pdf-preview]");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickDownloadPdf);
  await pressOn(tl, "[data-tl=btn-download-bill-pdf]");
  await tl.wait(1500);

  await finishBooks(tl, STEP154_DURATION_MS);
}
