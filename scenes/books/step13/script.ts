import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP13_DURATION_MS = 36200;

export async function runStep13(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newProduct, "new-item", [0.45, 0.25]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectService);
  await pressOn(tl, "[data-tl=radio-type-service]");
  tl.setVar("booksFormType", "service");
  await tl.wait(500);

  // Name
  tl.showCaption(CAPTIONS.nameInput);
  await pressOn(tl, "[data-tl=input-item-name]");
  await tl.typeText(
    "[data-tl=input-item-name]",
    "Business Setup Consulting",
    { msPerChar: 50 }
  );
  tl.setVar("booksFormName", "Business Setup Consulting");
  await tl.wait(500);

  // Unit hr
  tl.showCaption(CAPTIONS.unitSelect);
  await pressOn(tl, "[data-tl=select-unit]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=unit-opt-hr]");
  await tl.wait(500);

  // Sales Info: 120, 4001
  tl.showCaption(CAPTIONS.salesInfo);
  await pressOn(tl, "[data-tl=input-selling-price]");
  await tl.typeText("[data-tl=input-selling-price]", "120", { msPerChar: 70 });
  tl.setVar("booksFormSellingPrice", "120");
  await tl.wait(400);

  await pressOn(tl, "[data-tl=select-sales-account]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=sales-account-4001]");
  await tl.wait(500);

  // Purchase Info: 60, 5004
  tl.showCaption(CAPTIONS.purchaseInfo);
  await pressOn(tl, "[data-tl=input-cost-price]");
  await tl.typeText("[data-tl=input-cost-price]", "60", { msPerChar: 70 });
  tl.setVar("booksFormCostPrice", "60");
  await tl.wait(400);

  await pressOn(tl, "[data-tl=select-purchase-account]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=purchase-account-5004]");
  await tl.wait(500);

  // Vendor
  tl.showCaption(CAPTIONS.vendorSelect);
  await pressOn(tl, "[data-tl=select-preferred-vendor]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=vendor-opt-harvest-wholesale-ltd]");
  await tl.wait(600);

  // Save
  tl.showCaption(CAPTIONS.saveService);
  await pressOn(tl, "[data-tl=btn-save-item]");
  tl.setUrl(BOOKS_URLS.products);
  await tl.wait(1000);

  await hoverOn(tl, "[data-tl=row-item-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-item-1]", 1800);
  await tl.wait(1200);

  await finishBooks(tl, STEP13_DURATION_MS);
}
