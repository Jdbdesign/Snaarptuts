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

export const STEP12_DURATION_MS = 22000;

export async function runStep12(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.85, 0.12]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-item]");
  tl.setUrl(BOOKS_URLS.newProduct);
  await tl.wait(600);

  // Name
  tl.showCaption(CAPTIONS.nameInput);
  await pressOn(tl, "[data-tl=input-item-name]");
  await tl.typeText("[data-tl=input-item-name]", "Food Farm", 70);
  tl.setVar("booksFormName", "Food Farm");
  await tl.wait(500);

  // Unit
  tl.showCaption(CAPTIONS.unitSelect);
  await pressOn(tl, "[data-tl=select-unit]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=unit-opt-kg]");
  await tl.wait(500);

  // Image
  tl.showCaption(CAPTIONS.imageUpload);
  await pressOn(tl, "[data-tl=box-image-upload]");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.imagePick);
  await pressOn(tl, "[data-tl=sample-image-produce]");
  tl.setVar("booksSelectedImage", "/drive-photos/photo-01.jpg");
  await tl.wait(600);

  // Selling Price
  tl.showCaption(CAPTIONS.salesInfo);
  await pressOn(tl, "[data-tl=input-selling-price]");
  await tl.typeText("[data-tl=input-selling-price]", "200", 70);
  tl.setVar("booksFormSellingPrice", "200");
  await tl.wait(400);

  // Sales Account
  await pressOn(tl, "[data-tl=select-sales-account]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=sales-account-4000]");
  await tl.wait(500);

  // Sales description
  tl.showCaption(CAPTIONS.salesDesc);
  await pressOn(tl, "[data-tl=textarea-sales-desc]");
  await tl.typeText(
    "[data-tl=textarea-sales-desc]",
    "Farm food for local industries",
    40
  );
  tl.setVar("booksFormSalesDesc", "Farm food for local industries");
  await tl.wait(500);

  // Cost Price
  tl.showCaption(CAPTIONS.purchaseInfo);
  await pressOn(tl, "[data-tl=input-cost-price]");
  await tl.typeText("[data-tl=input-cost-price]", "200", 70);
  tl.setVar("booksFormCostPrice", "200");
  await tl.wait(500);

  // Click Save ONCE with empty purchase account -> Validation error!
  tl.showCaption(CAPTIONS.validationError);
  await pressOn(tl, "[data-tl=btn-save-item]");
  await tl.wait(400);
  await ring(tl, "[data-tl=error-purchase-account]", 1400);

  // Now pick purchase account
  tl.showCaption(CAPTIONS.pickPurchaseAccount);
  await pressOn(tl, "[data-tl=select-purchase-account]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=purchase-account-5000]");
  await tl.wait(500);

  // Purchase description & Vendor
  tl.showCaption(CAPTIONS.purchaseDesc);
  await pressOn(tl, "[data-tl=textarea-purchase-desc]");
  await tl.typeText("[data-tl=textarea-purchase-desc]", "Price of items", 40);
  tl.setVar("booksFormPurchaseDesc", "Price of items");
  await tl.wait(400);

  await pressOn(tl, "[data-tl=select-preferred-vendor]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=vendor-opt-green-fields-supplies-ltd]");
  await tl.wait(600);

  // Final Save
  tl.showCaption(CAPTIONS.saveSuccess);
  await pressOn(tl, "[data-tl=btn-save-item]");
  tl.setUrl(BOOKS_URLS.products);
  await tl.wait(1000);

  await hoverOn(tl, "[data-tl=row-item-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-item-1]", 1800);
  await tl.wait(1200);

  await finishBooks(tl, STEP12_DURATION_MS);
}
