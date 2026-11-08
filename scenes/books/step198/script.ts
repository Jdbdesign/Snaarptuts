import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP198_DURATION_MS = 14500;

export async function runStep198(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.selfAssessment, "self-assessment", [0.4, 0.3], 198);

  tl.setVar("booksFilingExpanded", true);
  tl.setVar("booksMtdConfigured", false);
  tl.setVar("booksMtdSettingsModalOpen", false);
  tl.setVar("booksMtdEnabled", false);
  tl.setVar("booksMtdQuartersPrepared", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openMtd);
  await pressOn(tl, "[data-tl=nav-filing-mtd-income-tax]");
  tl.setVar("booksView", "mtd-income-tax");
  tl.setUrl(BOOKS_URLS.mtdIncomeTax);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickConfigureSettings);
  await pressOn(tl, "[data-tl=btn-configure-mtd-settings]");
  tl.setVar("booksMtdSettingsModalOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.toggleEnable);
  await pressOn(tl, "[data-tl=checkbox-enable-mtd]");
  tl.setVar("booksMtdEnabled", true);
  await tl.wait(350);

  tl.showCaption(CAPTIONS.enterNiNumber);
  await pressOn(tl, "[data-tl=input-mtd-ni-number]");
  await tl.typeText("booksMtdNiNumber", "QQ123456C", { msPerChar: 65 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterHmrcId);
  await pressOn(tl, "[data-tl=input-mtd-hmrc-id]");
  await tl.typeText("booksMtdHmrcId", "XAIT00000123456", { msPerChar: 65 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.saveMtdSettings);
  await pressOn(tl, "[data-tl=btn-modal-save-mtd]");
  tl.setVar("booksMtdConfigured", true);
  tl.setVar("booksMtdSettingsModalOpen", false);
  tl.toast("MTD settings saved");
  await tl.wait(1500);

  await finishBooks(tl, STEP198_DURATION_MS);
}
