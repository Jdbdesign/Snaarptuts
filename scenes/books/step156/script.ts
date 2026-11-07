import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, type BillItemRow } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP156_DURATION_MS = 62000;

export async function runStep156(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newBill, "new-bill", [0.35, 0.38], 156);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectRow0Item);
  await pressOn(tl, "[data-tl=input-bill-item-0]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-bill-item-rice]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectRow0Account);
  await pressOn(tl, "[data-tl=select-bill-account-0]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-account-cogs-0]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.setRow0QtyRate);
  await pressOn(tl, "[data-tl=input-bill-qty-0]");
  await tl.typeText("20", "[data-tl=input-bill-qty-0]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=input-bill-rate-0]");
  await tl.typeText("200", "[data-tl=input-bill-rate-0]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectRow0Tax);
  await pressOn(tl, "[data-tl=select-bill-tax-0]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-tax-vat20-0]");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.addNewRow);
  await pressOn(tl, "[data-tl=btn-add-bill-row]");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectRow1Details);
  await pressOn(tl, "[data-tl=input-bill-item-1]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-bill-item-palm]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=select-bill-account-1]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-account-cogs-1]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.setRow1QtyRateTax);
  await pressOn(tl, "[data-tl=input-bill-qty-1]");
  await tl.typeText("5", "[data-tl=input-bill-qty-1]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=input-bill-rate-1]");
  await tl.typeText("40", "[data-tl=input-bill-rate-1]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=select-bill-tax-1]");
  await tl.wait(300);
  const updatedItems: BillItemRow[] = [
    {
      id: "row-0",
      name: "Organic Rice 25kg",
      account: "Cost of Goods Sold",
      quantity: 20,
      rate: 200,
      tax: "VAT Standard (20%)",
      amount: 4000,
    },
    {
      id: "row-1",
      name: "Palm Oil 5L",
      account: "Cost of Goods Sold",
      quantity: 5,
      rate: 40,
      tax: "VAT Standard (20%)",
      amount: 200,
    },
  ];
  await pressOn(tl, "[data-tl=opt-tax-vat20-1]");
  tl.setVar("booksNewBillItems", updatedItems);
  await tl.wait(600);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.ringTotals);
  await ring(tl, "[data-tl=bill-subtotal]", 900);
  await ring(tl, "[data-tl=bill-tax-total]", 900);
  await ring(tl, "[data-tl=bill-grand-total]", 1100);
  await tl.wait(1000);

  await finishBooks(tl, STEP156_DURATION_MS);
}
