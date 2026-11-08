import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECURRING_BILLS, type RecurringBill } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP161_DURATION_MS = 31800;

export async function runStep161(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newRecurringBill, "new-recurring-bill", [0.5, 0.45], 161);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectItem);
  await pressOn(tl, "[data-tl=input-rec-bill-item-0]");
  tl.setVar("booksRecBillItemDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-rec-bill-item-rice]");
  tl.setVar("booksNewRecBillItemName", "Organic Rice 25kg");
  tl.setVar("booksNewRecBillRate", "200");
  tl.setVar("booksRecBillItemDropdownOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectAccount);
  await pressOn(tl, "[data-tl=select-rec-bill-account-0]");
  tl.setVar("booksRecBillAccountDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-account-cogs]");
  tl.setVar("booksNewRecBillAccount", "Cost of Goods Sold");
  tl.setVar("booksRecBillAccountDropdownOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.enterQuantity);
  await pressOn(tl, "[data-tl=input-rec-bill-qty-0]");
  await tl.typeText("2", "[data-tl=input-rec-bill-qty-0]");
  tl.setVar("booksNewRecBillQty", "2");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.enterRate);
  await pressOn(tl, "[data-tl=input-rec-bill-rate-0]");
  await tl.typeText("200", "[data-tl=input-rec-bill-rate-0]");
  tl.setVar("booksNewRecBillRate", "200");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectTax);
  await pressOn(tl, "[data-tl=select-rec-bill-tax-0]");
  tl.setVar("booksRecBillTaxDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-tax-20]");
  tl.setVar("booksNewRecBillTax", "20%");
  tl.setVar("booksRecBillTaxDropdownOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectCustomer);
  await pressOn(tl, "[data-tl=select-rec-bill-customer-0]");
  tl.setVar("booksRecBillCustomerDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-customer-none]");
  tl.setVar("booksNewRecBillCustomer", "None");
  tl.setVar("booksRecBillCustomerDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringTotals);
  await ring(tl, "[data-tl=recurring-bill-totals-box]", 1400);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.typeNotes);
  await pressOn(tl, "[data-tl=input-rec-bill-notes]");
  await tl.typeText("Monthly packaging supplies recurring bill", "[data-tl=input-rec-bill-notes]");
  tl.setVar("booksNewRecBillNotes", "Monthly packaging supplies recurring bill");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-recurring-bill]");

  // Update store with new bill
  const newBill: RecurringBill = {
    id: "rec-bill-2",
    profileName: "Monthly Packaging Supplies",
    vendorName: "Greenfield Packaging Ltd",
    frequency: "Monthly",
    status: "Active",
    startDate: "11/08/2026",
    neverExpires: true,
    paymentTerms: "Net 30",
    accountsPayable: "Accounts Payable",
    currency: "GBP",
    createdDate: "11/08/2026",
    taxMode: "Tax Exclusive",
    level: "At Transaction Level",
    lineItems: [
      {
        itemDetails: "Organic Rice 25kg",
        account: "Cost of Goods Sold",
        quantity: 2,
        rate: 200,
        tax: "20%",
        customerDetails: "None",
        amount: 400,
      },
    ],
    items: [
      {
        itemDetails: "Organic Rice 25kg",
        account: "Cost of Goods Sold",
        quantity: 2,
        rate: 200,
        tax: "20%",
        customerDetails: "None",
        amount: 400,
      },
    ],
    subTotal: 400,
    taxAmount: 80,
    total: 480,
  };
  tl.setVar("booksRecurringBills", [newBill, ...INITIAL_RECURRING_BILLS]);
  tl.setVar("booksToastText", "Recurring bill created successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "recurring-bills");
  tl.setUrl(BOOKS_URLS.recurringBills);
  await tl.wait(1200);

  await finishBooks(tl, STEP161_DURATION_MS);
}
