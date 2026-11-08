import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_VENDOR_CREDITS, type VendorCredit } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP169_DURATION_MS = 14500;

export async function runStep169(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendorCredits, "vendor-credits", [0.4, 0.3], 169);

  const creditNoteVC001: VendorCredit = {
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

  tl.setVar("booksVendorCredits", [creditNoteVC001, ...INITIAL_VENDOR_CREDITS]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openCreditNoteVC001);
  await pressOn(tl, "[data-tl=row-vendor-credit-vc001]");
  tl.setVar("booksActiveVendorCredit", creditNoteVC001);
  tl.setVar("booksView", "vendor-credit-detail");
  tl.setUrl(BOOKS_URLS.vendorCreditDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringDetailsCard);
  await ring(tl, "[data-tl=vendor-credit-details-card]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.ringItemsTable);
  await ring(tl, "[data-tl=table-vendor-credit-items]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-delete-vendor-credit]");
  tl.setVar("booksVendorCreditToDelete", creditNoteVC001);
  tl.setVar("booksVendorCreditConfirmOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.confirmDelete);
  await ring(tl, "[data-tl=modal-delete-vendor-credit-confirm]", 1000);
  await pressOn(tl, "[data-tl=btn-confirm-delete-vendor-credit]");

  tl.setVar("booksVendorCredits", INITIAL_VENDOR_CREDITS);
  tl.setVar("booksVendorCreditConfirmOpen", false);
  tl.setVar("booksToastText", "Vendor credit deleted successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "vendor-credits");
  tl.setUrl(BOOKS_URLS.vendorCredits);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.verifyDeleted);
  await tl.wait(1000);

  await finishBooks(tl, STEP169_DURATION_MS);
}
