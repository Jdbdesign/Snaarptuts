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

export const STEP25_DURATION_MS = 53700;

export async function runStep25(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.93, 0.16]);

  // Click + New Customer
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-customer]");
  tl.setVar("booksView", "new-customer");
  tl.setUrl(BOOKS_URLS.newCustomer);
  await tl.wait(600);

  // Primary Contact
  tl.showCaption(CAPTIONS.pickSalutation);
  await pressOn(tl, "[data-tl=select-primary-salutation]");
  tl.setVar("booksSalutationOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-salutation-mr]");
  tl.setVar("booksCustSalutation", "Mr.");
  tl.setVar("booksSalutationOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.typeContact);
  await pressOn(tl, "[data-tl=input-primary-first-name]");
  await tl.typeText("[data-tl=input-primary-first-name]", "Daniel", { msPerChar: 60 });
  tl.setVar("booksCustFirstName", "Daniel");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-primary-last-name]");
  await tl.typeText("[data-tl=input-primary-last-name]", "Green", { msPerChar: 60 });
  tl.setVar("booksCustLastName", "Green");
  await tl.wait(300);

  // Company Name & Display Name
  tl.showCaption(CAPTIONS.typeCompany);
  await pressOn(tl, "[data-tl=input-company-name]");
  await tl.typeText("[data-tl=input-company-name]", "Greenleaf Bakery", { msPerChar: 60 });
  tl.setVar("booksCustCompanyName", "Greenleaf Bakery");
  tl.setVar("booksCustDisplayName", "Greenleaf Bakery");
  await tl.wait(300);

  // Email
  tl.showCaption(CAPTIONS.typeEmail);
  await pressOn(tl, "[data-tl=input-customer-email]");
  await tl.typeText("[data-tl=input-customer-email]", "accounts@greenleafbakery.example", { msPerChar: 40 });
  tl.setVar("booksCustEmail", "accounts@greenleafbakery.example");
  await tl.wait(300);

  // Phone Country Code + Work Phone & Mobile
  tl.showCaption(CAPTIONS.pickCode);
  await pressOn(tl, "[data-tl=btn-work-phone-code]");
  tl.setVar("booksPhoneCodeOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=country-opt-gb]");
  tl.setVar("booksCustWorkPhoneCode", "+44");
  tl.setVar("booksPhoneCodeOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typePhones);
  await pressOn(tl, "[data-tl=input-work-phone]");
  await tl.typeText("[data-tl=input-work-phone]", "7700 900120", { msPerChar: 50 });
  tl.setVar("booksCustWorkPhone", "7700 900120");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-mobile-phone]");
  await tl.typeText("[data-tl=input-mobile-phone]", "7700 900121", { msPerChar: 50 });
  tl.setVar("booksCustMobilePhone", "7700 900121");
  await tl.wait(400);

  // Other Details: Tax Rate
  tl.showCaption(CAPTIONS.pickTax);
  await pressOn(tl, "[data-tl=select-tax-rate]");
  tl.setVar("booksTaxDropdownOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=tax-opt-standard]");
  tl.setVar("booksCustTaxRate", "VAT Standard (20%)");
  tl.setVar("booksTaxDropdownOpen", false);
  await tl.wait(300);

  // Other Details: Company ID, Opening Balance, Terms, Portal
  tl.showCaption(CAPTIONS.typeDetails);
  await pressOn(tl, "[data-tl=input-company-id]");
  await tl.typeText("[data-tl=input-company-id]", "08123456", { msPerChar: 50 });
  tl.setVar("booksCustCompanyId", "08123456");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=select-accounts-receivable]");
  tl.setVar("booksAccountsReceivableOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-ar-default]");
  tl.setVar("booksCustAccountsReceivable", "Accounts Receivable");
  tl.setVar("booksAccountsReceivableOpen", false);
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-opening-balance]");
  await tl.typeText("[data-tl=input-opening-balance]", "1000", { msPerChar: 50 });
  tl.setVar("booksCustOpeningBalance", "1000");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=select-payment-terms]");
  tl.setVar("booksPaymentTermsOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=pt-opt-net-30]");
  tl.setVar("booksCustPaymentTerms", "Net 30");
  tl.setVar("booksPaymentTermsOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickPortal);
  await pressOn(tl, "[data-tl=chk-portal-access]");
  tl.setVar("booksCustPortalAccess", true);
  await tl.wait(400);

  // Save
  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-customer]");
  await tl.wait(1000);

  // Verified in Customers List
  tl.showCaption(CAPTIONS.createdSuccess);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-customer-1]", 1600);
  await tl.wait(800);

  await finishBooks(tl, STEP25_DURATION_MS);
}
