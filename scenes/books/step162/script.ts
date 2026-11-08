import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECURRING_BILLS, type RecurringBill } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP162_DURATION_MS = 13000;

export async function runStep162(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.recurringBills, "recurring-bills", [0.4, 0.3], 162);

  const monthlyPackagingBill: RecurringBill = {
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

  tl.setVar("booksRecurringBills", [monthlyPackagingBill, ...INITIAL_RECURRING_BILLS]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openMonthlyPackaging);
  await pressOn(tl, "[data-tl=row-rec-bill-monthly-packaging]");
  tl.setVar("booksActiveRecurringBill", monthlyPackagingBill);
  tl.setVar("booksView", "recurring-bill-detail");
  tl.setUrl(BOOKS_URLS.recurringBillDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringDetailsCard);
  await ring(tl, "[data-tl=recurring-bill-details-card]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-delete-recurring-bill]");
  tl.setVar("booksRecBillToDelete", monthlyPackagingBill);
  tl.setVar("booksRecBillConfirmOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.confirmDelete);
  await ring(tl, "[data-tl=modal-delete-recurring-bill-confirm]", 1000);
  await pressOn(tl, "[data-tl=btn-confirm-delete-recurring-bill]");

  tl.setVar("booksRecurringBills", INITIAL_RECURRING_BILLS);
  tl.setVar("booksRecBillConfirmOpen", false);
  tl.setVar("booksToastText", "Recurring bill deleted successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "recurring-bills");
  tl.setUrl(BOOKS_URLS.recurringBills);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.verifyDeleted);
  await tl.wait(1000);

  await finishBooks(tl, STEP162_DURATION_MS);
}
