import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_VENDOR_CREDITS, type VendorCredit } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP168_DURATION_MS = 35200;

export async function runStep168(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendorCredit, "new-vendor-credit", [0.5, 0.45], 168);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectItem);
  await pressOn(tl, "[data-tl=input-vendor-credit-item-0]");
  tl.setVar("booksVcItemDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-vc-item-cassava]");
  tl.setVar("booksNewVendorCreditItemName", "Cassava Flour 10kg");
  tl.setVar("booksNewVendorCreditRate", "200");
  tl.setVar("booksVcItemDropdownOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectAccount);
  await pressOn(tl, "[data-tl=select-vendor-credit-account-0]");
  tl.setVar("booksVcAccountDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-account-cogs]");
  tl.setVar("booksNewVendorCreditAccount", "Cost of Goods Sold");
  tl.setVar("booksVcAccountDropdownOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.enterQuantity);
  await pressOn(tl, "[data-tl=input-vendor-credit-qty-0]");
  await tl.typeText("1", "[data-tl=input-vendor-credit-qty-0]");
  tl.setVar("booksNewVendorCreditQty", "1");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.enterRate);
  await pressOn(tl, "[data-tl=input-vendor-credit-rate-0]");
  await tl.typeText("200", "[data-tl=input-vendor-credit-rate-0]");
  tl.setVar("booksNewVendorCreditRate", "200");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectTax);
  await pressOn(tl, "[data-tl=select-vendor-credit-tax-0]");
  tl.setVar("booksVcTaxDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-tax-20]");
  tl.setVar("booksNewVendorCreditTax", "20%");
  tl.setVar("booksVcTaxDropdownOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.ringTotals);
  await ring(tl, "[data-tl=vendor-credit-totals-box]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.applyDiscount);
  await pressOn(tl, "[data-tl=input-vendor-credit-discount]");
  await tl.typeText("10", "[data-tl=input-vendor-credit-discount]");
  tl.setVar("booksNewVendorCreditDiscount", "10");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.ringAdjustedTotals);
  await ring(tl, "[data-tl=vendor-credit-totals-box]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.typeNotes);
  await pressOn(tl, "[data-tl=input-vendor-credit-notes]");
  await tl.typeText("Credit for damaged cassava flour bags", "[data-tl=input-vendor-credit-notes]");
  tl.setVar("booksNewVendorCreditNotes", "Credit for damaged cassava flour bags");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickSaveAsOpen);
  await pressOn(tl, "[data-tl=btn-save-as-open-vendor-credit]");

  // Update store with new credit note
  const newCredit: VendorCredit = {
    id: "vc-1",
    date: "11/08/2026",
    creditNoteNumber: "VC-001",
    vendorName: "Greenfield Packaging Ltd",
    orderNumber: "PO-7781",
    status: "OPEN",
    amount: 220,
    balance: 220,
    balanceRemaining: 220,
    subject: "Returned packaging",
    accountsPayable: "Accounts Payable",
    taxMode: "Tax Inclusive",
    level: "At Transaction Level",
    items: [
      {
        itemDetails: "Cassava Flour 10kg",
        quantity: 1,
        rate: 200,
        amount: 200,
      },
    ],
    subTotal: 200,
    discountPercent: 10,
    discountAmount: 20,
    taxInclusiveAmount: 40,
    total: 220,
    notes: "Credit for damaged cassava flour bags",
  };

  tl.setVar("booksVendorCredits", [newCredit, ...INITIAL_VENDOR_CREDITS]);
  tl.setVar("booksToastText", "Vendor credit created successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "vendor-credits");
  tl.setUrl(BOOKS_URLS.vendorCredits);
  await tl.wait(1200);

  await finishBooks(tl, STEP168_DURATION_MS);
}
